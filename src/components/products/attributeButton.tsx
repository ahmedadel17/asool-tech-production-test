'use client'

import React from 'react'

interface AttributeButtonProps {
  attribute: { id: string | number, value: string }
  isSelected?: boolean
  onClick?: () => void
}

function AttributeButton({ attribute, isSelected = false, onClick }: AttributeButtonProps) {
  return (
    <button 
      className={`size-option ${isSelected ? 'active' : ''}`}
      data-size={attribute?.value} 
      aria-label={`Select size ${attribute?.value}`}
      onClick={onClick}
    >
      {attribute?.value}
    </button>
  )
}

export default AttributeButton
