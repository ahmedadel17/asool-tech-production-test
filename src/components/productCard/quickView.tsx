'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useQuickViewStore } from '@/store/quickViewStore'

function QuickViewModal() {
  const t = useTranslations('productsCard')
  const { isOpen, product, closeQuickView } = useQuickViewStore()

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeQuickView()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeQuickView])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeQuickView()
    }
  }

  if (!isOpen || !product) return null

  const displayPrice = product.price_after_discount || product.min_price || 0
  const originalPrice = product.min_price && product.price_after_discount && product.min_price > product.price_after_discount 
    ? product.min_price 
    : null

  return (
    <div 
      className="quickViewModal animate-fade-in fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="quickViewTitle text-xl font-semibold text-gray-900 dark:text-white">
            {product.name || ''}
          </h2>
          <button 
            onClick={closeQuickView}
            className="closeQuickView text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-3xl leading-none w-8 h-8 flex items-center justify-center transition-colors" 
            type="button"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="quickViewContent p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="product-image">
              <img 
                src={product.thumbnail as string || '/placeholder-image.jpg'} 
                alt={product.name as string || 'Product'} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="product-details">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {product.name || ''}
              </h3>
              {product.short_description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {product.short_description}
                </p>
              )}
              <div className="mb-4">
                {originalPrice && (
                  <p className="text-lg text-gray-500 line-through mb-1">
                    <span className="icon-riyal-symbol"></span>
                    {originalPrice}
                  </p>
                )}
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  <span className="icon-riyal-symbol"></span>
                  {displayPrice}
                </p>
              </div>
              <div className="space-y-4">
                <Link 
                  href={`/products/${product.slug || ''}`}
                  className="w-full  te-btn te-btn-default block text-center"
                  onClick={closeQuickView}
                >
                  {t('View Details') }
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
