'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function SubCategoriesItem({ name, id, count }: { name: string, id: number, count: number | string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryClick = () => {
    // Dispatch custom event to trigger loading immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('productsFilterApplied'))
    }

    const params = new URLSearchParams(searchParams.toString())
    
    // Get existing categories array from URL
    const existingCategories = params.getAll('categories[]')
    
    // Check if this category is already selected
    const categoryIdStr = id.toString()
    const isSelected = existingCategories.includes(categoryIdStr)
    
    if (isSelected) {
      // Remove category if already selected (toggle off)
      const newCategories = existingCategories.filter(cat => cat !== categoryIdStr)
      params.delete('categories[]')
      newCategories.forEach(cat => params.append('categories[]', cat))
    } else {
      // Add category if not selected
      params.append('categories[]', categoryIdStr)
    }
    
    // Reset to page 1 when applying filters
    params.set('page', '1')
    
    router.push(`?${params.toString()}`)
  }

  // Check if this category is currently selected
  const existingCategories = searchParams.getAll('categories[]')
  const isSelected = existingCategories.includes(id.toString())

  return (
    <div 
      className={`flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors ${
        isSelected ? 'bg-gray-50 dark:bg-gray-700' : ''
      }`}
      onClick={handleCategoryClick}
      data-category={name}
    >
      <div className="flex items-center gap-3">
        <span className={`text-sm cursor-pointer ${
          isSelected 
            ? 'text-primary-700 dark:text-primary-300 font-medium' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {name}
        </span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{count}</span>
    </div>
  )
}

export default SubCategoriesItem
