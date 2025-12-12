'use client'
import BreadCrumb from '@/components/breadCrumb'
import CartSummary from '@/components/cart/cartSummary'
import PageHeader from '@/components/pageHeader'
import ShippingMethods from '@/components/shippingMethod/shippingMethods'
import { useCheckoutStore } from '@/store/checkoutStore'
import { useTranslations } from 'next-intl'
import React from 'react'

function ShippingMethod() {
  const { shipping_slug } = useCheckoutStore()
  const t = useTranslations('shippingMethod')
  return (

    <div className='flex-1 mt-8 mb-8 site-content'>
    <div className='container'>
        <main id='main' role='main'>

            <BreadCrumb title={t('Shipping Address')} link='/checkout' secondPage={t('Shipping Method')} />
            <PageHeader title={t('Shipping Method')} subtitle={t('Select your shipping method')} />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                <div className='lg:col-span-2 space-y-8'>
                    <ShippingMethods />
                </div>
                <div className='lg:col-span-1'>
                    <CartSummary link="/checkout/paymentMethod" text={t('Proceed to payment method')} role={ shipping_slug ? true : false} />
                </div>
            </div>
        </main>
    </div>
  
</div>
  )
}

export default ShippingMethod
