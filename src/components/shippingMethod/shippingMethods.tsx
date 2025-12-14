'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ShippingMethodRadioButton from './ShippingMethodRadioButton';
import { useCartStore } from '@/store/cartStore';
import {useUserStore} from '@/store/userStore';
import postRequest from '../../../helpers/post';
import { toast } from 'react-hot-toast';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useLocale, useTranslations } from 'next-intl';
interface ShippingMethod {
  id: number;
  name: string;
  slug: string;
  price: string;
  image?: string;
  description?: string;
}

const ShippingMethod = () => {
  const { cartData, setCartData } = useCartStore();
  const { token } = useUserStore();
  const { user_address_id, shipping_slug, setShippingSlug } = useCheckoutStore();
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingSlug, setSelectedShippingSlug] = useState<string>(shipping_slug || '');
  const hasFetchedRates = useRef(false);
  const locale = useLocale();
  // Helper function to extract cart data for updateShippingMethod
  const t = useTranslations('shippingMethod')

  useEffect(() => {
    // Fetch shipping rates only once when required data is available
    if (hasFetchedRates.current) {
      return;
    }

    // Wait for required data to be available
    if (!cartData?.data?.id || !user_address_id || !token) {
      return;
    }

    const fetchShippingRates = async () => {
      hasFetchedRates.current = true;

      try {
        const response = await postRequest(
          `/marketplace/cart/shipping-rates`, 
          { 
            order_id: cartData?.data?.id,
            user_address_id: user_address_id
          },
          {},
          token,
          locale
        );
        const methods = response.data.data.shipping_methods || [];
        setShippingMethods(methods);
        
        // Use existing shipping_slug from store, or auto-select the first shipping method if available
        if (methods.length > 0) {
          const slugToUse = shipping_slug || methods[0].slug;
          
          // Only update if we don't have a selected slug or if it's different
          if (!selectedShippingSlug || selectedShippingSlug !== slugToUse) {
            setSelectedShippingSlug(slugToUse);
            setShippingSlug(slugToUse);
            
            // Make API request to update cart details with the shipping method
            const cartId = cartData?.data?.id;
            if (cartId && token) {
              try {
                const updateResponse = await postRequest(
                  `/marketplace/cart/cart-details/${cartId}`,
                  { shipping_slug: slugToUse, user_address_id: user_address_id },
                  {},
                  token,
                  locale
                );
                
                if (updateResponse?.data) {
                  setCartData(updateResponse.data);

                }
              } catch (error) {
                toast.error(t('Failed to update cart details'));
              }
            }
          }
        }
      } catch (error) {
        toast.error(t('Failed to fetch shipping rates'));
        hasFetchedRates.current = false; // Reset on error so it can retry
      }
    };

    fetchShippingRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData?.data?.id, user_address_id, token]); // Wait for required data, but ref ensures only one fetch


  // Auto-select first shipping method when methods are loaded
 

  const validationSchema = Yup.object({
    shipping: Yup.string().required(t('Please select a shipping method'))
  });

  const initialValues = {
    shipping:  ''
  }
  
  const handleShippingMethodChange = async (shippingSlug: string) => {
    setSelectedShippingSlug(shippingSlug);
    
    // Save the shipping slug to the checkout store
    setShippingSlug(shippingSlug);
    
    // Make API request to update cart details with the selected shipping method
    const cartId = cartData?.data?.id;
    if (cartId && token) {
      try {
        const response = await postRequest(
          `/marketplace/cart/cart-details/${cartId}`,
          { shipping_slug: shippingSlug },
          {},
          token,
          locale
        );
        console.log('response', response);
        if (response?.data) {
          setCartData(response?.data);
          toast.success(t('Shipping method selected successfully'));
        }
      } catch (error) {
        toast.error(t('Failed to update cart details'));
      }
    }
  }

  const onSubmit = () => {
    // Form submission handled by handleShippingMethodChange
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Method')}</h2>

      <Formik
        key={shippingMethods.length > 0 ? shippingMethods[0].slug : 'default'}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="space-y-3">
          
              {shippingMethods?.map((shippingMethod: ShippingMethod,index: number) => {
                // Transform ShippingRate to ShippingOption format
                const option = {
                  slug: shippingMethod.slug,
                  name: shippingMethod.name,
                  price: shippingMethod?.price?.toString(),
                  description: `${t('Estimated delivery')}: ${shippingMethod.description}`,
                  image: shippingMethod?.image || '', // Default image
                  value: shippingMethod.id.toString(),
                  label: shippingMethod.name
                };
                
                return (
                <ShippingMethodRadioButton
                  key={index}
                  option={option}
                  name="shipping"
                  onChange={async (value: string) => {
                    setFieldValue('shipping', value);
                    await handleShippingMethodChange(value);
                  }}
                  checked={selectedShippingSlug === option.slug}
                />
                );
              })}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShippingMethod;