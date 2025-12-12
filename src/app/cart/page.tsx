'use client'
import BreadCrumb from '@/components/breadCrumb'
import CartHeader from '@/components/cart/cartHeader'
import CartItem from '@/components/cart/cartItem'
import CartSummary from '@/components/cart/cartSummary'
import EmptyCart from '@/components/cart/emptyCart'
import React, { useEffect, useCallback } from 'react'
import Link from 'next/link'
import getRequest from '../../../helpers/get'
import { useUserStore } from '@/store/userStore'
import { useCartStore } from '@/store/cartStore'
import { useCheckoutStore } from '@/store/checkoutStore'
import { useLocale, useTranslations } from 'next-intl'

function Cart() {
  const { token } = useUserStore()
  const { setCartData, cartData } = useCartStore()
  const { clearCheckout } = useCheckoutStore()
  const t = useTranslations('cart')
  const locale=useLocale()
  const fetchCartItems = useCallback(async () => {
    try {
      const response = await getRequest('/marketplace/cart/my-cart', {}, token, locale)
      
      // Save cart data to Zustand store (which will persist to localStorage)
      if (response) {
        setCartData(response)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }, [token, setCartData, locale])
  
  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  // Check if cart is empty
  const isCartEmpty = 
    !cartData || 
    cartData.status === false || 
    cartData.message === "Cart Is Empty" ||
    !cartData.data ||
    !cartData.data.products ||
    cartData.data.products.length === 0

  // Clear checkout data when cart is empty
  useEffect(() => {
    if (isCartEmpty) {
      clearCheckout()
    }
  }, [isCartEmpty, clearCheckout])

  return (
    <div id="content" className="flex-1 mt-8 mb-8 site-content dark:bg-gray-900" role="main">
      <div id="primary" className="container">
        <main id="main" role="main">
          <BreadCrumb title={t('Home')} link="/" secondPage={t('Cart')} />
          <CartHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {isCartEmpty ? (
              <div className="lg:col-span-2 space-y-4">

            <EmptyCart />
            </div>
          ) : (
            <>
              <div className="lg:col-span-2 space-y-4">
                {cartData?.data?.products?.map((product) => (
                  <CartItem key={product.id || product.cart_item_id || product.lineId} product={product} />
                ))}
                <div className="pt-4">
                  <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    {t('Continue Shopping')}
                  </Link>
                </div>
              </div>
              <div className='lg:col-span-1'>
                <CartSummary link="/checkout" text={t('Proceed to checkout')} role={true} />
              </div>
            </>

          )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Cart
