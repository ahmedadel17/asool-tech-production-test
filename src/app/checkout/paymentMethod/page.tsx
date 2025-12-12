'use client'
import BreadCrumb from '@/components/breadCrumb'
import CartSummary from '@/components/cart/cartSummary'
import PageHeader from '@/components/pageHeader'
import PaymentMethods from '@/components/paymentMethod/paymentMethods'
import React from 'react'
import { useCheckoutStore } from '@/store/checkoutStore'
import getRequest from '../../../../helpers/get'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import postRequest from '../../../../helpers/post'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
function PaymentMethod() {
    const { payment_method_id } = useCheckoutStore()
    const { cartData } = useCartStore()
    const { token } = useUserStore()
    const router = useRouter()
    const t = useTranslations('paymentMethod')
    const locale = useLocale()
    const  placeOrder = async () => {
        try {
          if ( parseFloat(cartData?.data?.amount_to_pay as string)==0 && cartData?.data?.use_wallet == true){
            const response = await postRequest(`/order/orders/change-cart-to-order/ ${cartData?.data?.id}`,{},{},token,locale);
            if(response){
       
              router.push('/checkoutConfirmation?orderId='+cartData?.data?.id );
            } else {
            }
          }
          else{
            const response = await getRequest('/payment/cash-on-delivery/' + cartData?.data?.id, { 'Content-Type': 'application/json' }, token, locale);
            if(response.status){
          
              router.push('/checkoutConfirmation?orderId='+cartData?.data?.id );
            } else {
            }
          }
        } catch (error) {
          toast.error(t('Failed to place order'));
      
        }
     }
  return (
    <div className='flex-1 mt-8 mb-8 site-content'>
    <div className='container'>
        <main id='main' role='main'>

            <BreadCrumb title={t('Shipping Method')} link='/checkout/shippingMethod' secondPage={t('Payment Method')} />
            <PageHeader title={t('Payment Method')} subtitle={t('Select your payment method')} />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                <div className='lg:col-span-2 space-y-8'>
                    <PaymentMethods />
                </div>
                <div className='lg:col-span-1'>
                    <CartSummary link="/checkout/paymentMethod" text={t('Proceed to Pay')} type="button" role={cartData?.data?.amount_to_pay==0&& cartData?.data?.use_wallet==true ? true : payment_method_id ? true : false} disabled={false} onClick={placeOrder} />
                </div>
            </div>
        </main>
    </div>
  
</div>
  )
}

export default PaymentMethod
