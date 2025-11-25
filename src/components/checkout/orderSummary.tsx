'use client'
import React, { useEffect, useState } from 'react'
import OrderAttribute from './orderAttribute';
import Image from 'next/image';
import { useCart } from '@/app/hooks/useCart';
import { useOrder } from '@/app/hooks/useOrder';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/app/hooks/useAuth';
import getRequest from '../../../helpers/get';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';
import postRequest from '../../../helpers/post';
function OrderSummary() {
  const { cartData,setCartData } = useCart();
  const { order, updateOrderStatus, updateOrderData } = useOrder();
  const { token } = useAuth();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const locale = useLocale(); 
  // Prevent hydration mismatch by only rendering after client mount

  // Restore order state from localStorage on refresh
  useEffect(() => {
    const shippingAddressId = localStorage.getItem('shippingAddressId');
    const shippingMethodSlug = localStorage.getItem('shippingMethodSlug');
    
    if (shippingAddressId || shippingMethodSlug) {
      const updates: Partial<typeof order> = {};
      let hasUpdates = false;
      
      if (shippingAddressId && !order.shipping_address_id) {
        updates.shipping_address_id = shippingAddressId;
        hasUpdates = true;
      }
      
      if (shippingMethodSlug && !order.shipping_method_slug) {
        updates.shipping_method_slug = shippingMethodSlug;
        hasUpdates = true;
      }
      
      // Determine status based on what's available
      if (hasUpdates) {
        if (shippingAddressId && shippingMethodSlug) {
          // Both are set, check if payment is needed
          const amount_to_pay = parseFloat(cartData?.amount_to_pay || '0');
          if (amount_to_pay === 0) {
            updates.status = 'PlaceOrder';
          } else {
            updates.status = 'shippingMethod';
          }
        } else if (shippingAddressId) {
          // Only address is set
          updates.status = 'shippingAddress';
        } else if (shippingMethodSlug) {
          // Only shipping method is set (shouldn't happen normally, but handle it)
          updates.status = 'shippingMethod';
        }
        
        if (Object.keys(updates).length > 0) {
          updateOrderData(updates);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount to restore from localStorage

  // Update order status when navigating to shipping method page
  useEffect(() => {
    if (pathname === '/checkout/shippingMethod' && order.shipping_address_id && order.status !== 'shippingMethod') {
      updateOrderData({ status: 'shippingMethod' });
    }
  }, [pathname, order.shipping_address_id, order.status, updateOrderData]);

  // Redirect to checkout if status is shippingAddress and user is on shipping method or payment method pages
 

  const settingShippingMethod = async () => {
    const response = await postRequest('/marketplace/cart/cart-details/' + cartData?.id, { shipping_slug: order.shipping_method_slug,user_address_id: order.shipping_address_id }, {}, token, locale);

    if(response.status){
      toast.success(response.data.message);
      setCartData(response.data.data);
    }
  }
 const  placeOrder = async () => {
    setIsPlacingOrder(true);
    try {
      if ( parseFloat(cartData?.amount_to_pay||'0')==0){
        const response = await postRequest(`/order/orders/change-cart-to-order/ ${cartData?.id}`,{},{},token,locale);
        if(response.status){
          localStorage.removeItem('shippingAddressId');
          localStorage.removeItem('shippingMethodSlug');
          localStorage.removeItem('paymentMethodId');
          router.push('/checkoutConfirmation?orderId='+cartData?.id );
        } else {
          setIsPlacingOrder(false);
        }
      }
      else{
        const response = await getRequest('/payment/cash-on-delivery/' + cartData?.id, { 'Content-Type': 'application/json' }, token, locale);
        if(response.status){
          // Update order status to confirmation
          updateOrderStatus('PlaceOrder');
          toast.success(response.data.message);
          // Navigate to confirmation page
          router.push('/checkoutConfirmation?orderId='+cartData?.id );
        } else {
          setIsPlacingOrder(false);
        }
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setIsPlacingOrder(false);
      toast.error(t('Failed to place order'));
    }
 }
  // Show loading state during hydration  

  return (
    <div className="lg:col-span-1">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Order Summary')}</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {cartData?.products && cartData.products.length > 0 ? cartData.products.map((item: any, index: number) => (
          <div key={item.id || `product-${index}`} className="flex items-center space-x-4 rtl:space-x-reverse">
            <Image 
              src={item.image || '/placeholder.jpg'} 
              alt={item.name || 'Product'} 
              width={100} 
              height={100} 
              className="w-16 h-16 objectCover rounded-md" 
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {typeof item.variations === 'string' ? item.variations : ''}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('Qty')}: {item.qty}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">
                <span className="icon-riyal-symbol text-xs"></span>
                <span>{item.price}</span>
              </p>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            {t('No items in cart')}
          </div>
        )}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{t('Subtotal')}</span>
            <span className="text-gray-900 dark:text-white">
              <span className="icon-riyal-symbol text-xs"></span>
              <span>{(cartData as { sub_total?: string })?.sub_total || '0'}</span>
            </span>
        </div>
      {cartData?.order_attributes && cartData.order_attributes.length > 0 && cartData.order_attributes.map((item: any, index: number) => (
        <OrderAttribute key={item.id || `attribute-${index}`} {...item} />
      ))}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">{t('Total')}</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              <span className="icon-riyal-symbol"></span>
              <span>{(cartData as { total_amount?: string })?.total_amount || '0'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Order State Debug */}
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">
        <div className="font-semibold mb-2">Order State:</div>
        <div>Address ID: {order.shipping_address_id || 'Not selected'}</div>
        <div>Shipping: {order.shipping_method_slug || 'Not selected'}</div>
        <div>Payment: {order.payment_method_id || 'Not selected'}</div>
        <div>Status: {order.status || 'Not selected'}</div>
        <div className="mt-2 font-semibold">
          Status: {order.status == 'PlaceOrder' ? '✅ Complete' : '❌ Incomplete'}
        </div>
      </div>

      {/* Conditional Buttons */}
      
      {/* 1. If amount is 0.00, show Place Order button */}
     

      {/* Show buttons based on current page */}
      
      {/* 1. Checkout page - Show Go to Shipping Method button */}
      {(order.status === 'shippingAddress' ) && (
        <button
          onClick={() => {
            router.push('/checkout/shippingMethod');
            updateOrderStatus('ShippingMethod');
          }}
          disabled={!order.shipping_address_id}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Go to Shipping Method')}
        </button>
      )}
      
      {/* 2. Shipping Method page - Show Go to Payment button */}
      {order.status == 'shippingMethod' && pathname !== '/checkout/paymentMethod' && (
        <button
            onClick={() => {
              settingShippingMethod();
              router.push('/checkout/paymentMethod');
              updateOrderStatus('Payment');
            }}
          disabled={!order.shipping_method_slug}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Go to Payment')}
        </button>
      )}
      
      {/* 3. Payment page - Show Place Order button */}
      {pathname === '/checkout/paymentMethod' && (order.status === 'PlaceOrder' || order.payment_method_id === 'cod') && (
        <button
          onClick={placeOrder}
          disabled={!order.shipping_address_id || !order.shipping_method_slug || isPlacingOrder}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPlacingOrder && (
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          {isPlacingOrder ? t('Placing Order') : t('Place Order')}
        </button>
      )}

      {/* 2. Shipping Method page - Show Proceed to Payment button */}
      {/* {isOnShippingMethodPage() && (
        <button
          onClick={() => router.push('/checkout/payment')}
          disabled={!orderState.user_address_id || !orderState.shipping_slug}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Proceed to Payment')}
        </button>
      )} */}

      {/* 3. Payment page - Show Place Order button only for COD */}
      {/* {isOnPaymentPage() && orderState.payment_method === 'cod' && (
        <button
          onClick={handlePayment}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Place Order')}
        </button>
      )} */}
     
      {/* Security Notice */}
      <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <svg className="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        {t('Secure SSL encrypted checkout')}
      </div>
    </div>
  </div>
  )
}

export default OrderSummary
