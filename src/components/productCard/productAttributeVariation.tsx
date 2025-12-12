'use client'

import React from 'react'

interface SizeValue {
  id: string | number
  value?: string
}

function ProductAttributeVariation({
  values,
  selectedValueId,
  onSelect
}: {
  values: SizeValue[]
  attribute_id: string
  selectedValueId?: string | number
  onSelect: (valueId: string | number) => void
}) {
  const handleClick = (item: SizeValue) => {
    onSelect(item.id)
  }

  return (
    <div className="product-sizes">
      <div className="flex flex-wrap gap-1 items-end">
        {values?.map((value: SizeValue) => (
          <button
            key={value.id}
            className={`size-option ${selectedValueId === value.id ? 'active' : ''}`}
            data-size={value.value || String(value.id)}
            aria-label={`Select size ${value.value || value.id}`}
            onClick={() => handleClick(value)}
          >
            {value.value || value.id}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductAttributeVariation
