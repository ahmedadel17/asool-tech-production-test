'use client'

import React, { useState, useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { useWishlistStore, type WishlistProduct } from '@/store/wishlistStore'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'

interface Product {
  id: string | number
  name?: string
  price?: string | number
  price_after_discount?: string | number
  default_variation_id?: string | number
  thumbnail?: string
  slug?: string
  category?: string
  variations?: unknown[]
  [key: string]: unknown
}

interface FavoriteButtonProps {
  product: Product
  initialIsFavorite?: boolean
  onFavoriteChange?: (isFavorite: boolean) => void
}

function FavoriteButton({ 
  product, 
  initialIsFavorite = false,
  onFavoriteChange 
}: FavoriteButtonProps) {
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const { token } = useUserStore()
  const { isProductInWishlist, toggleProduct, addProduct } = useWishlistStore()
  const locale = useLocale()
  const t = useTranslations('favoriteButton')
  
  // Check if product is in wishlist from store, or use initialIsFavorite prop
  const isInWishlist = isProductInWishlist(product.id) || initialIsFavorite
  const [isFavorite, setIsFavorite] = useState(isInWishlist)

  // Sync with store when it changes
  useEffect(() => {
    const inWishlist = isProductInWishlist(product.id)
    setIsFavorite(inWishlist || initialIsFavorite)
  }, [product.id, isProductInWishlist, initialIsFavorite])

  const handleFavoriteToggle = async () => {
    // Check if user is authenticated
    if (!token) {
      toast.error(t('Please login to add products to favorites'))
      return
    }

    setIsFavoriteLoading(true)
    
    try {
      const success = await toggleProduct(product.id, token, locale)
      
      if (success) {
        const newFavoriteState = !isFavorite
        setIsFavorite(newFavoriteState)
        
        // If adding to wishlist and product data is available, add it to store
        if (newFavoriteState && product) {
          const wishlistProduct: WishlistProduct = {
            id: product.id,
            name: product.name as string,
            slug: product.slug,
            thumbnail: product.thumbnail,
            min_price: typeof product.price === 'number' ? product.price : undefined,
            price_after_discount: typeof product.price_after_discount === 'number' ? product.price_after_discount : undefined,
            default_variation_id: product.default_variation_id,
            variations: product.variations as WishlistProduct['variations'],
            is_favourite: true
          }
          addProduct(wishlistProduct)
        }
        
        // Call callback if provided
        if (onFavoriteChange) {
          onFavoriteChange(newFavoriteState)
        }
        
        toast.success(
          newFavoriteState 
            ? t('Product added to favorites successfully') + '!' 
            : t('Product removed from favorites') + '!'
        )
      } else {
        toast.error(t('Failed to update favorites'))
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error(t('Failed to update favorites'))
    } finally {
      setIsFavoriteLoading(false)
    }
  }

  return (
    <button
      className={`product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out w-10 ${
        isFavorite ? 'active' : ''
      } ${isFavoriteLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={isFavorite ? t('Remove from Favorites') : t('Add to Favorites')}
      onClick={handleFavoriteToggle}
      disabled={isFavoriteLoading}
      title={isFavoriteLoading ? t('Loading') : isFavorite ? t('Remove from Favorites') : t('Add to Favorites')}
    >
      {isFavoriteLoading ? (
        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg
          className={`w-5 h-5 ${isFavorite ? 'wishlist-active' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
      )}
    </button>
  )
}

export default FavoriteButton
