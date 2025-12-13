'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

function ClearFiltersButton() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClearFilters = () => {
    // Dispatch custom event to trigger loading immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('productsFilterApplied'))
    }

    // Create new params with only page and per_page (preserve pagination settings)
    const params = new URLSearchParams()
    const perPage = searchParams.get('per_page')
    if (perPage) {
      params.set('per_page', perPage)
    }
    params.set('page', '1')
    
    // Clear all filter parameters: min_price, max_price, categories[], attributes[], keyword
    // (These are not included in the new params, so they're effectively cleared)
    
    router.push(`?${params.toString()}`)
  }
 const t = useTranslations('productsGrid')
  return (
    <button 
      onClick={handleClearFilters}
      className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium"
    >
      {t('Clear Filters')}
    </button>
  )
}

export default ClearFiltersButton



