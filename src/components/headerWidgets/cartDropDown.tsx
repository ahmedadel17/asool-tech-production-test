import React from 'react'
import CartItem from './cart/cartItem'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useTranslations } from 'next-intl'
function CartDropDown({isOpen,}: {isOpen: boolean, }) {
  const { cartData } = useCartStore()
  const t = useTranslations('header')
  return (
    <div className={`cart-drop-down te-navbar-dropdown-content px-4 py-4 bg-white dark:bg-gray-800 max-w-[200px] ${isOpen ? 'te-dropdown-show' : ''}`}>
  
    <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t('Shopping Cart')}</div>
    
          {cartData?.data?.products?.map((product: any) => (
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
    </div>
  )
}

export default CartDropDown
