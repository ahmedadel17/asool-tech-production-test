'use client'
import React, {  useEffect, useState, useCallback, useRef } from 'react';
import AddressRadioButton from './AddressRadioButton';
import { useUserStore } from '@/store/userStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import axios from 'axios';
import postRequest from '../../../helpers/post';
// import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

interface Address {
  id: number;
  label: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  street: string;
  contact_phone: string;
  notes: string;
  is_default?: boolean;
}

interface ChooseExistingAddressFormProps {
  onAddressSelected?: (addressId: string) => void;
  onAddressDeleted?: () => void;
}

const ChooseExistingAddressForm: React.FC<ChooseExistingAddressFormProps> = ({ 
  onAddressSelected, 
  onAddressDeleted 
}) => {
  const [existingAddresses, setExistingAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const { token } = useUserStore();
  const { setUserAddressId } = useCheckoutStore();
  const { cartData, setCartData } = useCartStore();
  // const dispatch = useDispatch();
  const t = useTranslations('Checkout');
  const locale = useLocale();
  
  // Use refs to store callbacks to avoid dependency issues
  const onAddressSelectedRef = useRef(onAddressSelected);
  const onAddressDeletedRef = useRef(onAddressDeleted);
  
  // Update refs when callbacks change
  useEffect(() => {
    onAddressSelectedRef.current = onAddressSelected;
    onAddressDeletedRef.current = onAddressDeleted;
  }, [onAddressSelected, onAddressDeleted]);
  
  // Track if we've already auto-selected the default address to prevent re-selection
  const hasAutoSelectedRef = useRef(false);
  // Track if request is in progress to prevent multiple simultaneous requests
  const isFetchingRef = useRef(false);
  
  const getExistingAddresses = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (isFetchingRef.current) {
      return;
    }
    
    if (!token) {
      setLoading(false);
      return;
    }
    
    isFetchingRef.current = true;
    setLoading(true);
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/addresses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if(response.data.status){
        const addresses = response.data.data;
        setExistingAddresses(addresses);
        setLoading(false);
        
        // Auto-select the default address if one exists and we haven't already done so
        if (!hasAutoSelectedRef.current) {
          const defaultAddress = addresses.find((addr: Address) => addr.is_default === true);
          if (defaultAddress) {
            const addressIdStr = defaultAddress.id.toString();
            setSelectedAddressId(addressIdStr);
            setUserAddressId(addressIdStr);
            hasAutoSelectedRef.current = true;
            
            // Make API request to update cart details with the default address
            // Access cart data directly from store to avoid dependency issues
            const currentCartData = useCartStore.getState().cartData;
            const cartId = currentCartData?.data?.id;
            if (cartId && token) {
              try {
                await postRequest(
                  `/marketplace/cart/cart-details/${cartId}`,
                  { user_address_id: addressIdStr },
                  {},
                  token,
                  locale
                );
              } catch (error) {
                console.error('Error updating cart details with default address:', error);
              }
            }
            
            onAddressSelectedRef.current?.(addressIdStr);
          }
        }
      }
      else{
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setLoading(false);
      toast.error('Failed to load addresses');
    } finally {
      isFetchingRef.current = false;
    }
  }, [token, locale, setUserAddressId])

  useEffect(() => {
    // Reset auto-selection flag when component mounts or token changes
    hasAutoSelectedRef.current = false;
    getExistingAddresses();
  }, [token, getExistingAddresses])

  const handleDeleteAddress = async (addressId: number) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/delete-address/${addressId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.status) {
        // If deleted address was selected, clear selection
        if (selectedAddressId === addressId.toString()) {
          setSelectedAddressId(undefined);
          setUserAddressId('');
        }
        
        // Refresh the addresses list
        hasAutoSelectedRef.current = false; // Reset to allow auto-selection of new default
        await getExistingAddresses();
        onAddressDeletedRef.current?.();
      }
    } catch (error) {
      console.error('Failed to delete address:', error);
      toast.error('Failed to delete address');
    }
  };

  const handleAddressChange = async (addressId: string) => {
    setSelectedAddressId(addressId);
    
    // Save the address ID to the checkout store
    setUserAddressId(addressId);
    
    // Make API request to update cart details with the selected address
    const cartId = cartData?.data?.id;
    if (cartId && token) {
      try {
        const response = await postRequest(
          `/marketplace/cart/cart-details/${cartId}`,
          { user_address_id: addressId },
          {},
          token,
          locale
        );
        
        if (response?.data) {
          // console.log('Cart details updated successfully:', response.data);
          setCartData(response.data);
          toast.success('Address selected successfully');
        }
      } catch (error) {
        console.error('Error updating cart details:', error);
        toast.error('Failed to update cart details');
      }
    }
    
    // Call the parent callback
    onAddressSelectedRef.current?.(addressId);
  };

 

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Choose Existing Address')}</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (existingAddresses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800   border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Choose Existing Address')}</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t('No saved addresses found')} {t('Please create a new address first')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 p-2">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Choose Existing Address')}</h2>

      <div className="space-y-3">
        {existingAddresses.map((addr) => (
          <AddressRadioButton
            key={addr.id}
            address={addr}
            name="selected_address"
            value={addr.id.toString()}
            showDeleteButton={true}
            onChange={handleAddressChange}
            onDelete={handleDeleteAddress}
            checked={selectedAddressId === addr.id.toString()}
          />
        ))}
      </div>

      {selectedAddressId && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 dark:text-green-200 font-medium">
              {t('Address selected successfully')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseExistingAddressForm;
