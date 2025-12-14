'use client'

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import ProductTitle from './productTitle'
import ProductPrice from './productPrice'
import ProductDescription from './productDescription'
import ProductQuantity from './productQuantity'
import ProductSize from './productSize'
import ProductColor from './productColor'
import Comment from './comment'
import ProductActions from './productActions'
import postRequest from '../../../helpers/post'
import { useProductStore } from '../../store/productStore'
import { useLocale } from 'next-intl'
interface Variation {
  attribute_id: string
  attribute_name: string
  attribute_type: string
  values: Array<{ id: string | number; value?: string; color?: string }>
}

interface Product {
  id?: string | number
  name?: string
  min_price?: number
  after_discount_price?: number
  description?: string
  variations?: Variation[]
  default_variation_id?: string | number
  [key: string]: unknown
}

interface SelectedVariation {
  attribute_id: string
  value_id: string | number
}

function RightSide({
  product,
  onVariationsChange
}: {
  product: Product
  onVariationsChange?: (selectedVariations: SelectedVariation[], allSelected: boolean) => void
}) {
  // State to track selected values for each attribute_id
  // Format: { [attribute_id]: value_id }
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string | number>>({})
  
  // Ref to track if we've already fetched for the current selection
  const lastFetchedSelection = useRef<string>('')
  
  // State to track if variations are being fetched
  const [isFetchingVariations, setIsFetchingVariations] = useState(false)
  
  // Zustand store for product variation data
  const { setVariation, getVariation, clearVariation } = useProductStore()
  
  // State for quantity and customer note
  const [quantity, setQuantity] = useState<number>(1)
  const [customerNote, setCustomerNote] = useState<string>('')
  
  // Get variation specific to this product
  const variation = product?.id ? getVariation(product.id) : null
  
  // Use variation data from store if available, otherwise use product props
  const displayName = variation?.name || product?.name || ''
  const displayMinPrice = variation?.min_price ?? product?.min_price ?? 0
  const displayAfterDiscountPrice = variation?.after_discount_price ?? product?.min_price ?? 0
  const displayPriceBeforeDiscount = variation?.price_befor_discount ?? 0
  const locale = useLocale()
  // Clear variation when product changes or component unmounts
  useEffect(() => {
    return () => {
      if (product?.id) {
        clearVariation(product.id)
      }
    }
  }, [product?.id, clearVariation])

  // Handle attribute selection
  const handleAttributeSelect = (attributeId: string, valueId: string | number) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: valueId
    }))
  }

  // Get array of selected values for each attribute
  // Returns array in format: [{ attribute_id: string, value_id: string | number }]
  const selectedVariations = useMemo(() => {
    return Object.entries(selectedAttributes).map(([attributeId, valueId]) => ({
      attribute_id: attributeId,
      value_id: valueId
    }))
  }, [selectedAttributes])

  // Check if all variations are selected
  const allVariationsSelected = ((product?.variations?.length ?? 0) > 0) && 
    (product?.variations?.every((variation: Variation) => selectedAttributes[variation.attribute_id] !== undefined) ?? false)

  // Notify parent component of selection changes
  useEffect(() => {
    if (onVariationsChange) {
      onVariationsChange(selectedVariations, allVariationsSelected)
    }
    // Log selected variations when all are selected (for debugging)
    if (allVariationsSelected) {
      // console.log('All variations selected:', selectedVariations)
    }
  }, [selectedVariations, allVariationsSelected, onVariationsChange])

  const fetchProductVariations = useCallback(async () => {
    if (!product?.id) {
      console.error('Product ID is missing')

      return
    }

    setIsFetchingVariations(true)

    // Format payload: { product_id, attributes: { [attribute_id]: value_id } }
    const payload = {
      product_id: product.id,
      attributes: selectedAttributes
    }

    try {
      const response = await postRequest(
        '/catalog/products/get-variation-by-attribute',
        payload,
        {},
        null,
        locale
      )
      
      // Extract variation data from response and store in Zustand
      // Assuming response structure: response.data or response.data.data
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
      
      return response
    } catch (error) {
      console.error('Error fetching product variations:', error)
      // Clear variation on error
      if (product.id) {
        setVariation(product.id, null)
      }
      throw error
    } finally {
      setIsFetchingVariations(false)
    }
  }, [product?.id, selectedAttributes, setVariation, locale])

  // Fetch product variations when all variations are selected
  useEffect(() => {
    if (allVariationsSelected && product?.id) {
      // Create a unique key for the current selection to avoid duplicate calls
      const selectionKey = JSON.stringify(selectedAttributes)
      
      // Only fetch if this is a new selection
      if (lastFetchedSelection.current !== selectionKey) {
        lastFetchedSelection.current = selectionKey
        fetchProductVariations()
      }
    } else {
      // Reset the ref when not all variations are selected
      lastFetchedSelection.current = ''
    }
  }, [allVariationsSelected, selectedAttributes, product?.id, fetchProductVariations])
  return (
    <div 
      className='space-y-6'
      data-selected-variations={JSON.stringify(selectedVariations)}
      data-all-selected={allVariationsSelected}
    >
        {/* <!-- Product Title and Rating --> */}
     <ProductTitle name={displayName} />
     <ProductPrice min_price={displayMinPrice as number} price_after_discount={displayAfterDiscountPrice as number} price_before_discount={displayPriceBeforeDiscount as number} />
     <ProductDescription description={product?.description || ''} />
     <hr className="border-gray-300 dark:border-gray-800"/>
     <ProductQuantity quantity={quantity} onQuantityChange={setQuantity} />
     {
      product?.variations?.map((variation: Variation) => (
        variation?.attribute_type !=="multi"?
        <ProductColor 
          key={variation?.attribute_id}  
          colors={variation?.values} 
          attribute_id={variation?.attribute_id}
          selectedValueId={selectedAttributes[variation?.attribute_id]}
          onSelect={(valueId) => handleAttributeSelect(variation?.attribute_id, valueId)}
        />:
        <ProductSize 
          key={variation?.attribute_id} 
          attribute_name={variation?.attribute_name} 
          value={variation?.values} 
          attribute_id={variation?.attribute_id}
          selectedValueId={selectedAttributes[variation?.attribute_id]}
          onSelect={(valueId) => handleAttributeSelect(variation?.attribute_id, valueId)}
        />
      ))
     }
     {/* <ProductSize />
     <ProductColor /> */}
     <Comment customerNote={customerNote} onCustomerNoteChange={setCustomerNote} />
     <ProductActions 
       product={product}
       quantity={quantity}
       customerNote={customerNote}
       selectedAttributes={selectedAttributes}
       allVariationsSelected={allVariationsSelected}
       isFetchingVariations={isFetchingVariations}
     />
     
    </div>
  )
}

export default RightSide
