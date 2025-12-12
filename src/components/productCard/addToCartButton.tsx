'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
function AddToCartButton({
  disabled,
  onClick,
  isLoading: externalLoading
}: {
  disabled?: boolean
  onClick?: () => void | Promise<void>
  isLoading?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations('productsCard')
  // Use external loading state (for variation fetching) or internal loading state (for add to cart)
  const isButtonLoading = externalLoading || isLoading

  const handleClick = async () => {
    if (disabled || isButtonLoading || !onClick) return
    
    setIsLoading(true)
    try {
      await onClick()
    } catch (error) {
      console.error('Error in add to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isButtonLoading}
      className={`product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 px-0 ${disabled || isButtonLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label="Add to Cart"
    >
      {isButtonLoading ? (
        <>
          <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="hidden lg:block">{externalLoading ? t('Loading') : t('Adding')}</span>
        </>
      ) : (
        <>
          {/* <!-- Cart Icon --> */}
          <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
            <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
          </svg>
          <span className="hidden lg:block">{t('Add to Cart')}</span>
        </>
      )}
    </button>
  )
}

export default AddToCartButton
