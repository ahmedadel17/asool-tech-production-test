import React from 'react'
import CartItem from './cart/cartItem'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useTranslations } from 'next-intl'
function CartDropDown({isOpen,}: {isOpen: boolean, }) {
  const { cartData } = useCartStore()
  const t = useTranslations('header')
  const tCart = useTranslations('cart')
  
  // Check if cart is empty
  const isCartEmpty = 
    !cartData || 
    cartData.status === false || 
    cartData.message === "Cart Is Empty" ||
    !cartData.data ||
    !cartData.data.products ||
    cartData.data.products.length === 0

  return (
    <div className={`cart-drop-down te-navbar-dropdown-content px-4 py-4 bg-white dark:bg-gray-800 max-w-[200px] ${isOpen ? 'te-dropdown-show' : ''}`}>
  
    <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t('Shopping Cart')}</div>
    
    {isCartEmpty ? (
      // Empty Cart State
      <div className="text-center py-8">
        <div className="text-gray-400 dark:text-gray-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{tCart("Your cart is empty")}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">{tCart("Add some items to get started")}!</p>
        <Link
          href="/products"
          className="inline-flex items-center px-3 py-1.5 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          {tCart("Start Shopping")}
        </Link>
      </div>
    ) : (
      <>
        {cartData?.data?.products?.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
        
        {/* <!-- Cart Total --> */}
        <div className="mt-6">
          <div className="flex justify-between items-center font-medium mb-3 text-gray-900 dark:text-white">
            <span>{t('Total')}:</span>
            <span><span className="icon-riyal-symbol mr-1"></span>{cartData?.data?.amount_to_pay}</span>
          </div>  
      
          <div className="grid gap-2">
            <Link href="/cart" className="w-full te-btn te-btn-default text-center block">
              {t('View Cart')}
            </Link>
            <Link href="/checkout" className="w-full te-btn te-btn-primary text-center block">
              {t('Checkout')}
            </Link>
          </div>
        </div>
      </>
    )}
    </div>
  )
}

export default CartDropDown
