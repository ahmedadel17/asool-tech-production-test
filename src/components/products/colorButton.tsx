'use client'

import React from 'react'

interface ColorButtonProps {
  color: { id: string | number, value: string, color?: string }
  isSelected?: boolean
  onClick?: () => void
}

function ColorButton({ color, isSelected = false, onClick }: ColorButtonProps) {
  return (
    <button 
      className={`color-option ${isSelected ? 'active' : ''}`}
      style={{backgroundColor: color?.color || '#000000'}} 
      data-color={color?.color || '#000000'} 
      title={color?.value} 
      aria-label={`Select color ${color?.value}`}
      onClick={onClick}
    >
      <span className="sr-only">{color?.value}</span>
    </button>
  )
}

export default ColorButton
