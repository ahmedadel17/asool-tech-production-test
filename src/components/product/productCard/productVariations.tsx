'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'

type VariationValue = {
  id: number
  value: string
  color?: string
}

type Attribute = {
  attribute_id: number
  attribute_name: string
  attribute_type: string
  values: VariationValue[]
}

type ProductVariationsProps = {
  variations?: Attribute[]
  onSelectionChange?: (selections: Record<number, number>) => void
  onVariationFetch?: (selections: Record<number, number>) => void
}

function ProductVariations({ variations = [], onSelectionChange, onVariationFetch }: ProductVariationsProps) {
  const [selections, setSelections] = useState<Record<number, number>>({})
  const [userHasSelected, setUserHasSelected] = useState(false) // Track user interaction
  const lastFetchedSelections = useRef<string>('')

  const sortedVariations = useMemo(() => {
    const colorAttrs = variations.filter(v => 
      v.attribute_name?.toLowerCase().includes('color') || 
      v.attribute_type === 'color'
    )
    const otherAttrs = variations.filter(v => 
      !v.attribute_name?.toLowerCase().includes('color') && 
      v.attribute_type !== 'color'
    )
    return [...colorAttrs, ...otherAttrs]
  }, [variations])

  // fetch effect - only fire if user has interacted
  useEffect(() => {
    if (!onVariationFetch || sortedVariations.length === 0) return
    if (!userHasSelected) return // Don't fetch until user selects

    const allSelected = sortedVariations.every(attr => selections[attr.attribute_id])
    if (!allSelected) return

    const selectionsKey = JSON.stringify(selections)
    if (selectionsKey !== lastFetchedSelections.current) {
      lastFetchedSelections.current = selectionsKey
      onVariationFetch(selections)
    }
  }, [selections, sortedVariations, onVariationFetch, userHasSelected])

  // handleSelect - mark that user has interacted
  const handleSelect = (attributeId: number, valueId: number) => {
    const newSelections = { ...selections, [attributeId]: valueId }
    setSelections(newSelections)
    setUserHasSelected(true)
    onSelectionChange?.(newSelections)
  }

  const renderAttribute = (attribute: Attribute) => {
    const selectedValueId = selections[attribute.attribute_id]
    const isColorAttribute = attribute.attribute_name?.toLowerCase().includes('color') || attribute.attribute_type === 'color'

    if (attribute.attribute_type === 'multi' || attribute.attribute_type === 'color') {
      return (
        <div key={attribute.attribute_id} className="product-attribute mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {attribute.attribute_name}
          </label>

          {isColorAttribute ? (
            <div className="flex flex-wrap gap-1 items-center">
              {attribute.values.map((value) => {
                const isSelected = selectedValueId === value.id
                return (
                  <button
                    key={value.id}
                    type="button"
                    className={`color-option ${isSelected ? 'active' : ''}`}
                    style={{ backgroundColor: value.color || value.value }}
                    title={value.value}
                    onClick={() => handleSelect(attribute.attribute_id, value.id)}
                  >
                    <span className="sr-only">{value.value}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {attribute.values.map((value) => {
                const isSelected = selectedValueId === value.id
                return (
                  <button
                    key={value.id}
                    type="button"
                    className={`size-option ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelect(attribute.attribute_id, value.id)}
                  >
                    {value.value}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )
    }

    return (
      <div key={attribute.attribute_id} className="product-attribute mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {attribute.attribute_name}
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          value={selectedValueId || ''}
          onChange={(e) => handleSelect(attribute.attribute_id, Number(e.target.value))}
        >
          {attribute.values.map((value) => (
            <option key={value.id} value={value.id}>
              {value.value}
            </option>
          ))}
        </select>
      </div>
    )
  }

  if (!variations || variations.length === 0) return null

  return (
    <div className="product-options space-y-3 mt-4">
      {sortedVariations.map((attr) => renderAttribute(attr))}
    </div>
  )
}

export default ProductVariations
