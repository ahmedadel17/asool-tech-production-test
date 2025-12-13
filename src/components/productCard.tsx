'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import ShortDescription from './productCard/shortDescription'
import ProductName from './productCard/productName'
import ProductPrice from './productCard/productPrice'
import ProductColorVariation from './productCard/productColorVariation'
import ProductAttributeVariation from './productCard/productAttributeVariation'
// import ProductCardBadge from './productCard/productCardBadge'
import ProductThumbnail from './productCard/productThumbnail'
import CompareButton from './productCard/compareButton'
import QuickViewButton from './productCard/quickViewButton'
import AddToCartButton from './productCard/addToCartButton'
import FavoriteButton from './productCard/favoriteButton'
import Link from 'next/link'
import postRequest from '../../helpers/post'
import { useProductStore } from '@/store/productStore'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { useLocale } from 'next-intl'
import { WishlistProduct } from '@/store/wishlistStore'
import { useRouter } from 'next/navigation'
import QuickViewModal from './productCard/quickView'

interface Variation {
  attribute_id: string
  attribute_name: string
  attribute_type: string
  type?: string
  values: Array<{ id: string | number; value?: string; color?: string }>
}

interface Product {
  id?: string | number
  slug?: string
  name?: string
  min_price?: number
  price_after_discount?: number
  short_description?: string
  thumbnail?: string
  variations?: Variation[]
  default_variation_id?: string | number
  [key: string]: unknown
}

function ProductCard({ product }: { product: Product }) {
  // State to track selected values for each attribute_id
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string | number>>({})
  
  // State to track loading when fetching variations
  const [isFetchingVariations, setIsFetchingVariations] = useState(false)
  
  // State for QuickView modal
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  
  // Ref to track if we've already fetched for the current selection
  const lastFetchedSelection = useRef<string>('')
  const logout = useUserStore((state) => state.logout)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)
  // Zustand stores
  const { setVariation, getVariation, clearVariation } = useProductStore()
  const { setCartData } = useCartStore()
  const { token } = useUserStore()
  const t = useTranslations('productsCard')
  const locale=useLocale()
  const router = useRouter()

  // Get variation specific to this product
  const variation = product?.id ? getVariation(product.id) : null
  
  // Use variation data from store if available, otherwise use product props
  const displayName = variation?.name || product?.name || ''
  const displayMinPrice = (variation?.price_before_discount ?? product?.min_price ?? 0) as number
  const displayAfterDiscountPrice = (variation?.after_discount_price ?? product?.price_after_discount ?? 0) as number
  
  // Handle attribute selection
  const handleAttributeSelect = (attributeId: string, valueId: string | number) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: valueId
    }))
  }

  // Check if all variations are selected
  const allVariationsSelected = ((product?.variations?.length ?? 0) > 0) && 
    (product?.variations?.every((variation: Variation) => selectedAttributes[variation.attribute_id] !== undefined) ?? false)

  // Fetch product variations when all are selected
  const fetchProductVariations = useCallback(async () => {
   

    const payload = {
      product_id: product.id,
      attributes: selectedAttributes
    }

    setIsFetchingVariations(true)
    try {
      const response = await postRequest(
        '/catalog/products/get-variation-by-attribute',
        payload,
        {},
        null,
        locale
      )
      
      const variationData = response?.data?.data || response?.data || response
      
      if (variationData && product.id) {
        setVariation(product.id, {
          variation_id: variationData.id || variationData.variation_id,
          name: variationData.name || variationData.product_name,
          price: variationData.price || variationData.min_price,
          min_price: variationData.min_price || variationData.price,
          after_discount_price: variationData.after_discount_price || variationData.price_after_discount || variationData.compare_at_price,
          price_before_discount: variationData.price_before_discount,
          ...variationData
        })
      }
    } catch (error) {
      // console.log(error)
      toast.error(t('Failed to fetch product variations'))
      if (product.id) {
        setVariation(product.id, null)
      }
    } finally {
      setIsFetchingVariations(false)
    }
  }, [product?.id, selectedAttributes, setVariation])

  // Fetch product variations when all variations are selected
  useEffect(() => {
    if (allVariationsSelected && product?.id) {
      const selectionKey = JSON.stringify(selectedAttributes)
      
      if (lastFetchedSelection.current !== selectionKey) {
        lastFetchedSelection.current = selectionKey
        fetchProductVariations()
      }
    } else {
      lastFetchedSelection.current = ''
    }
  }, [allVariationsSelected, selectedAttributes, product?.id, fetchProductVariations])

  // Clear variation when component unmounts or product changes
  useEffect(() => {
    return () => {
      if (product?.id) {
        clearVariation(product.id)
      }
    }
  }, [product?.id, clearVariation])

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!token) {
      toast.error(t('Please login to add to cart'))
      router.push('/auth/login')
      return
    }

    // Use variation_id from store if available (for this specific product), otherwise use product.default_variation_id
    const currentVariation = product?.id ? getVariation(product.id) : null
    const itemId = currentVariation?.variation_id || product?.default_variation_id
    
    if (!itemId) {
      toast.error(t('No variation_id or default_variation_id available'))
      return
    }

    const payload = {
      item_id: itemId,
      qty: 1,
      customer_note: '',
      type: 'product'
    }

    try {
      const response = await postRequest(
        '/marketplace/cart/add-to-cart',
        payload,
        {},
        token,
        locale
      )
      toast.success(response.data.message)
      setCartData(response.data)
    } catch (error) {

      toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || t('Failed to add to cart'))
      if((error as { response?: { status?: number } }).response?.status==401){
        if(token){
          clearWishlist()
          localStorage.removeItem('wishlist-storage')
          logout()
        }
        router.push('/auth/login')
      }

    }
  }

  return (
    <>
    <div className="product-item w-full h-full lg:bg-white dark:lg:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col" data-product-id="1" data-product-title="رداء قطني مطرز بالأكمام الطويلة" data-product-price="720.00" data-product-image="assets/images/cotton/cotton-pro-1.jpg">

    <Link href={`/products/${product?.slug}`} className="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group">

    {/* <!-- Product Badges --> */}
   {/* <ProductCardBadge /> */}
                            {/* <!-- .product-badges --> */}
    
    {/* <!-- Hover Buttons - Center of Image --> */}
    <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-30 z-20 flex gap-1">

        {/* <!-- Compare Button --> */}
       <CompareButton product={product} />
        {/* <!-- .compare-btn --> */}

        {/* <!-- Quick View Button --> */}
        <QuickViewButton onClick={() => setIsQuickViewOpen(true)} />
        {/* <!-- .quick-view-btn --> */}

    </div>
    {/* <!-- .product-hover-btns --> */}

    {/* <!-- Thumbanil Main Image --> */}
    <ProductThumbnail thumnail={product?.thumbnail} thumbnail_flip={product?.thumbnail} />
</Link>

<div className="mt-3 lg:mt-0 lg:p-3 flex flex-col flex-1">

<div className="product-body space-y-2 mb-5">

   <ShortDescription short_description={product?.short_description} />
            {/* <!-- .product-category --> */}
    
   <ProductName name={displayName || ''} link={`/products/${product?.slug || ''}`} />
    {/* <!-- .product-title --> */}

   <ProductPrice price={displayMinPrice} price_after_discount={displayAfterDiscountPrice} />
    {/* <!-- .product-price --> */}

    {/* <!-- Colors & Sizes --> */}
    <div className="product-options space-y-4 !mt-4">
{
    // Sort variations: Color variations first, then others
    product?.variations
      ?.slice()
      .sort((a: Variation, b: Variation) => {
        // Check if variation type is 'Color' (check type field, attribute_name, or attribute_type)
        const aIsColor = a.type?.toLowerCase() === 'color' || 
                        a.attribute_name?.toLowerCase() === 'color' || 
                        a.attribute_type?.toLowerCase() === 'color'
        const bIsColor = b.type?.toLowerCase() === 'color' || 
                        b.attribute_name?.toLowerCase() === 'color' || 
                        b.attribute_type?.toLowerCase() === 'color'
        
        // Color variations come first
        if (aIsColor && !bIsColor) return -1
        if (!aIsColor && bIsColor) return 1
        return 0
      })
      .map((variation: Variation) => (
        variation?.attribute_type === "multi"?
        <ProductAttributeVariation 
          key={variation?.attribute_id}  
          values={variation?.values}
          attribute_id={variation?.attribute_id}
          selectedValueId={selectedAttributes[variation?.attribute_id]}
          onSelect={(valueId) => handleAttributeSelect(variation?.attribute_id, valueId)}
        />:
        <ProductColorVariation 
          key={variation?.attribute_id} 
          color_variations={variation?.values}
          attribute_id={variation?.attribute_id}
          selectedValueId={selectedAttributes[variation?.attribute_id]}
          onSelect={(valueId) => handleAttributeSelect(variation?.attribute_id, valueId)}
        />
    ))
}
    {/* <ProductColorVariation color_variations={product?.color_variations} />
    <ProductAttributeVariation  /> */}
    </div>
</div>
{/* <!-- .product-body --> */}

<div className="product-footer mt-auto flex gap-1 lg:gap-2 items-stretch justify-between">

    {/* <!-- Add to Cart --> */}
   <AddToCartButton 
     disabled={product?.variations && product.variations.length > 0 ? !allVariationsSelected : false}
     onClick={handleAddToCart}
     isLoading={isFetchingVariations}
   />
    {/* <!-- .product-add-to-cart --> */}

    {/* <!-- Add to Wishlist --> */}
    {/* @ts-ignore */}
    <FavoriteButton product={product as unknown as Product as WishlistProduct} />
    {/* <WishListButton /> */}
    {/* <!-- .product-add-to-wishlist --> */}

</div>
{/* <!-- .product-footer --> */}

</div>
</div>

{/* Quick View Modal */}
{isQuickViewOpen && (
  <QuickViewModal 
    isOpen={isQuickViewOpen}
    onClose={() => setIsQuickViewOpen(false)}
    product={product}
  />
)}
    </>
  )
}

export default ProductCard
