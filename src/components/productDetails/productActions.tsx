'use client'

import React, { useState } from 'react'
import postRequest from '../../../helpers/post'
import { useProductStore } from '../../store/productStore'
import { useUserStore } from '../../store/userStore'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
interface Variation {
  attribute_id: string
  attribute_name: string
  attribute_type: string
  type?: string
  values: Array<{ id: string | number; value?: string; color?: string }>
}

interface ProductData {
  id?: string | number
  default_variation_id?: string | number
  variations?: Variation[]
  [key: string]: unknown
}

function ProductActions({ 
  product, 
  quantity, 
  customerNote,
  selectedAttributes,
  allVariationsSelected,
  isFetchingVariations
}: { 
  product?: ProductData
  quantity?: number
  customerNote?: string
  selectedAttributes?: Record<string, string | number>
  allVariationsSelected?: boolean
  isFetchingVariations?: boolean
}) {
  const { getVariation } = useProductStore()
  const { token } = useUserStore()
  const { setCartData } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const logout = useUserStore((state) => state.logout)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)
  const t = useTranslations('productDetails')
  const locale=useLocale()
  const router = useRouter()
  
  // Get variation to check if variation_id is loaded
  const variation = product?.id ? getVariation(product.id) : null
  const variationId = variation?.variation_id || product?.default_variation_id
  
  // Show loading if variations are being fetched and variation_id is not yet available
  // Only show loading if product has variations and all are selected
  const isWaitingForVariation = product?.variations && product.variations.length > 0 && 
    allVariationsSelected && 
    isFetchingVariations && 
    !variationId  
  const addToCart = async () => {
    // Check if product has variations and if all are selected
    if (product?.variations && product.variations.length > 0 && !allVariationsSelected) {
      // Get missing variation names
      const missingVariations = product.variations
        .filter((variation: Variation) => !selectedAttributes?.[variation.attribute_id])
        .map((variation: Variation) => {
          // Get variation name from attribute_name, attribute_type, or type
          return variation.attribute_name || variation.attribute_type || variation.type || t('Variation')
        })
      
      const missingVariationsText = missingVariations.join(', ')
      toast.error(`${t('Please select variations first')}: ${missingVariationsText}`)
      return
    }

    setIsLoading(true)
    // Use variation_id from store if available (for this specific product), otherwise use product.default_variation_id
    const variation = product?.id ? getVariation(product.id) : null
    const itemId = variation?.variation_id || product?.default_variation_id
    
    if (!itemId) {
      toast.error(t('No variation_id or default_variation_id available'))
      setIsLoading(false)
      return
    }

    const payload = {
      item_id: itemId,
      qty: quantity || 1,
      customer_note: customerNote || '',
      type: 'product'
    }

    try {
      const response = await postRequest(
        '/marketplace/cart/add-to-cart',
        payload,
        {

        },
        token,
        locale
      )
      toast.success(response.data.message)
      setCartData(response.data)
    } catch (error: unknown) {
        const err = error as { status?: boolean; response?: { message?: string } }
        if(err?.status === false && err?.response?.message === 'Unauthenticated') {
            toast.error(t('Please login to add to cart'))
            router.push('/auth/login')
        }
        toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || t('Failed to add to cart'))
        if((error as { response?: { status?: number } }).response?.status==401){
          if(token){
            clearWishlist()
            localStorage.removeItem('wishlist-storage')
            logout()
          }
          router.push('/auth/login')
        }
    } finally {
      setIsLoading(false)
    }
  }
    
  return (
    <div className="product-actions space-y-3">

    <button 
      id="addToCart" 
      onClick={addToCart}
      disabled={isLoading || isWaitingForVariation}
      className={`w-full py-1 product-add-to-cart flex-1 te-btn te-btn-primary flex gap-2 items-center justify-center ${isLoading || isWaitingForVariation ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {isLoading || isWaitingForVariation ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{isWaitingForVariation ? t('Loading') : t('Adding')}</span>
          </>
        ) : (
          <>
            {/* <!-- Cart Icon --> */}
            <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
            </svg>
            <span>{t('Add to Cart')}</span>
          </>
        )}
    </button>

    {/* <a href="checkout.php" className="w-full py-1 te-btn flex gap-2 bg-gray-800 text-white hover:bg-gray-600 text-center">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
        <span>Buy Now</span>
    </a> */}

    {/* <!-- WhatsApp Button --> */}
    {/* <button id="whatsappBtn" className="w-full py-3 bg-[#075E54] hover:bg-green-600 text-white font-medium rounded-md flex gap-2 items-center justify-center transition-colors" >
        <svg className="w-4 h-4" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"></path>
        </svg>
        Contact via WhatsApp
    </button> */}

</div>
  )
}

export default ProductActions
