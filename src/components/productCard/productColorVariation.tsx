'use client'

import React from 'react'

interface Color {
  id: string | number
  value?: string
  color?: string
}

function ProductColorVariation({
  color_variations,
  selectedValueId,
  onSelect
}: {
  color_variations: Color[]
  attribute_id: string
  selectedValueId?: string | number
  onSelect: (valueId: string | number) => void
}) {
  const handleClick = (color: Color) => {
    onSelect(color.id)
  }

  return (
    <div className="product-colors">
      <div className="flex flex-wrap gap-1">
        {color_variations?.map((color: Color) => (
          <button
            key={color.id}
            className={`color-option ${selectedValueId === color.id ? 'active' : ''}`}
            style={{ backgroundColor: color.color || '#000' }}
            data-color={color.color || '#000'}
            title={color.color || color.value || 'Color'}
            aria-label={`Select color ${color.color || color.value || 'Color'}`}
            onClick={() => handleClick(color)}
          >
            <span className="sr-only">{color?.value || color.color || 'Color'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductColorVariation
