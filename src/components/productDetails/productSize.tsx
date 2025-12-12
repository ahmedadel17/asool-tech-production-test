import React from 'react'

interface SizeValue {
  id: string | number
  value?: string
}

function ProductSize({
  attribute_name,
  value,
  selectedValueId,
  onSelect
}: {
  attribute_name: string
  value: SizeValue[]
  attribute_id: string
  selectedValueId?: string | number
  onSelect: (valueId: string | number) => void
}) {
  const handleClick = (item: SizeValue) => {
    onSelect(item.id)
  }

  return (
    <div className="product-size">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{attribute_name}</h4>
      <div className="grid grid-cols-4 gap-2">
        {value.map((item: SizeValue) => (
          <button
            key={item.id}
            className={`size-option ${selectedValueId === item.id ? 'active' : ''}`}
            data-size={item.value || String(item.id)}
            aria-label={`Select size ${item.value || item.id}`}
            onClick={() => handleClick(item)}
          >
            {item.value || item.id}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductSize
