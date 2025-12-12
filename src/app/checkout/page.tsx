'use client'
import BreadCrumb from '@/components/breadCrumb'
import CartSummary from '@/components/cart/cartSummary'
import PageHeader from '@/components/pageHeader'
import ShippingAddress from '@/components/shippingAddress/shippingAddress'
import { useCheckoutStore } from '@/store/checkoutStore'
import React from 'react'
import { useTranslations } from 'next-intl'

function Checkout() {
  const { user_address_id } = useCheckoutStore()
  const t = useTranslations('Checkout')
  return (
    <div className='flex-1 mt-8 mb-8 site-content'>
        <div className='container'>
            <main id='main' role='main'>

                <BreadCrumb title={t('Cart')} link='/cart' secondPage={t('Checkout')} />
                <PageHeader title={t('Checkout')} subtitle={t('Complete your purchase')} />
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                    <div className='lg:col-span-2'>
                        <ShippingAddress />
                    </div>
                    <div className='lg:col-span-1'>
                        <CartSummary link="/checkout/shippingMethod" text={t('Proceed to shipping method')} role={user_address_id ? true : false} />
                    </div>
                </div>
            </main>
        </div>
      
    </div>
  )
}

export default Checkout
