'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import ProductCard from '@/components/productCard'
import { useUserStore } from '@/store/userStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { toast } from 'react-hot-toast'

function WishListPage() {
  const t = useTranslations('wishlist')
  const locale = useLocale()
  const [removingIds, setRemovingIds] = useState<Set<string | number>>(new Set())
  const { token } = useUserStore()
  
  const {
    products,
    count,
    isLoading,
    error,
    fetchWishlist,
    toggleProduct
  } = useWishlistStore()

  useEffect(() => {
    fetchWishlist(token, locale)
  }, [token, locale, fetchWishlist])

  const handleRemove = async (productId: string | number) => {
    if (!token) {
      toast.error(t('Please login to manage favorites'))
      return
    }

    setRemovingIds(prev => new Set(prev).add(productId))
    
    try {
      const success = await toggleProduct(productId, token, locale)
      
      if (success) {
        toast.success(t('Product removed from favorites'))
      } else {
        toast.error(t('Failed to remove from favorites'))
      }
    } catch (error) {
      console.error('Error removing from favorites:', error)
      toast.error(t('Failed to remove from favorites'))
    } finally {
      setRemovingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
    }
  }

  // Show error if there's one
  useEffect(() => {
    if (error) {
      toast.error(t('Failed to load wishlist'))
    }
  }, [error, t])

  return (
    <>
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('My Wishlist')}</h1>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                  <span className="mt-4 text-gray-600 dark:text-gray-400">
                    {t('Loading wishlist')}...
                  </span>
                </div>
              </div>
            ) : count > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  if (!product.id) return null
                  return (
                    <div key={product.id} className="relative group">
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(product.id!)}
                        disabled={removingIds.has(product.id)}
                        className={`absolute top-2 end-2 z-30 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center shadow-lg ${
                          removingIds.has(product.id) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        title={t('Remove from wishlist')}
                        aria-label={t('Remove from wishlist')}
                      >
                        {removingIds.has(product.id) ? (
                          <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        )}
                      </button>
                      <ProductCard 
                        product={product}
                      />
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('Your wishlist is empty')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  {t('Save items you love by clicking the heart icon on any product')}. {t('We will keep them safe here for you')}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default WishListPage
