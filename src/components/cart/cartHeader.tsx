import React from 'react'
import { useCartStore } from '@/store/cartStore'
import { useTranslations } from 'next-intl'
function CartHeader() {
  const t = useTranslations('cart')
  const { cartData } = useCartStore()
  const cartCount = cartData?.data?.cart_count || 0
  const isCartEmpty = 
    !cartData || 
    cartData.status === false || 
    cartData.message === "Cart Is Empty" ||
    !cartData.data ||
    !cartData.data.products ||
    cartData.data.products.length === 0

  return (
    <div className="flex justify-between items-center mb-8">
    <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('Shopping Cart')}</h1>
        {!isCartEmpty && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{cartCount} {cartCount === 1 ? t('item') : t('items')} {t('in your cart')}</p>
        )}
    </div>
    {!isCartEmpty && (
      <button className="text-gray-500 hover:text-red-500 transition-colors text-sm" >
          {t('Clear Cart')}
      </button>
    )}
</div>
  )
}

export default CartHeader
