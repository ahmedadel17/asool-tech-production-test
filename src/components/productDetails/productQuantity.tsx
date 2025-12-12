'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

function ProductQuantity({ quantity, onQuantityChange }: { quantity: number; onQuantityChange: (qty: number) => void }) {
  const t = useTranslations('productDetails')
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < 10) {
      onQuantityChange(quantity + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    const clampedValue = Math.max(1, Math.min(10, value))
    onQuantityChange(clampedValue)
  }

  return (
    <div className="product-quantity">
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('Quantity')}</h3>
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex items-center rtl:flex-row-reverse border border-gray-300 dark:border-gray-600 rounded-md">
            <button 
              type="button"
              onClick={handleDecrease}
              className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" 
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
            </button>

            <input 
              id="quantity" 
              type="number" 
              value={quantity} 
              onChange={handleInputChange}
              min="1" 
              max="10" 
              className="w-16 !rounded-none border-0 focus:outline-none" 
            />

            <button 
              type="button"
              onClick={handleIncrease}
              className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" 
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </button>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">{t('Only')} 5 {t('left in stock')}</span>
    </div>
</div>
  )
}

export default ProductQuantity
