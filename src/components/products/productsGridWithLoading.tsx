'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import ProductsGrid from './productsGrid'
import { useTranslations } from 'next-intl' 
interface ProductsGridWithLoadingProps {
  products: any[]
  paginationData?: {
    current_page?: number
    total_pages?: number
    total?: number
    per_page?: number
  }
  currentPage?: number
}

function ProductsGridWithLoading({ products, paginationData, currentPage }: ProductsGridWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevSearchParamsRef = useRef<string>(searchParams.toString())
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const t = useTranslations('productsGridWithLoading')   
  useEffect(() => {
    // Listen for custom event when filter is applied
    const handleFilterApplied = () => {
      setIsLoading(true)
    }

    window.addEventListener('productsFilterApplied', handleFilterApplied)

    const currentParams = searchParams.toString()
    
    // Show loading if search params changed
    if (prevSearchParamsRef.current !== currentParams) {
      setIsLoading(true)
      prevSearchParamsRef.current = currentParams
      
      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
      
      // Hide loading after products are loaded (with delay for smooth transition)
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }

    return () => {
      window.removeEventListener('productsFilterApplied', handleFilterApplied)
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [searchParams, pathname])

  return (
    <div className="xl:col-span-3 relative min-h-[400px]">
      {isLoading && (
        <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-500 dark:border-t-primary-400 rounded-full animate-spin"></div>
            </div>
            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
            {t('Loading products')}...
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
            {t('Please wait')}...
            </span>
          </div>
        </div>
      )}
      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        <ProductsGrid 
          products={products} 
          paginationData={paginationData}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default ProductsGridWithLoading

