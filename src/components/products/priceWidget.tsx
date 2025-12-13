'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface PriceWidgetProps {
  priceRange?: { min: number, max: number }
}

function PriceWidget({ priceRange }: PriceWidgetProps) {
  const t = useTranslations('productsFilter')
  const router = useRouter()
  const searchParams = useSearchParams()
  const minRangeRef = useRef<HTMLInputElement>(null)
  const maxRangeRef = useRef<HTMLInputElement>(null)
  const rangeTrackRef = useRef<HTMLDivElement>(null)

  const minLimit = priceRange?.min ?? 0
  const maxLimit = priceRange?.max ?? 1000

  // Initialize with defaults to avoid hydration mismatch
  // We'll sync with URL params in useEffect after mount
  const [minPrice, setMinPrice] = useState(minLimit)
  const [maxPrice, setMaxPrice] = useState(maxLimit)
  const [selectedQuickBtn, setSelectedQuickBtn] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Calculate dynamic quick select ranges based on minLimit and maxLimit
  const calculateQuickRanges = () => {
    const range = maxLimit - minLimit
    const segment = range / 5 // Divide into 5 segments
    
    return [
      { 
        min: minLimit, 
        max: minLimit + segment, 
        label: 'Under',
        maxValue: minLimit + segment,
        id: 'range-1' 
      },
      { 
        min: minLimit + segment, 
        max: minLimit + segment * 2, 
        label: 'range',
        minValue: minLimit + segment,
        maxValue: minLimit + segment * 2,
        id: 'range-2' 
      },
      { 
        min: minLimit + segment * 2, 
        max: minLimit + segment * 3, 
        label: 'range',
        minValue: minLimit + segment * 2,
        maxValue: minLimit + segment * 3,
        id: 'range-3' 
      },
      { 
        min: minLimit + segment * 3, 
        max: minLimit + segment * 4, 
        label: 'range',
        minValue: minLimit + segment * 3,
        maxValue: minLimit + segment * 4,
        id: 'range-4' 
      },
      { 
        min: minLimit + segment * 4, 
        max: maxLimit, 
        label: 'plus',
        minValue: minLimit + segment * 4,
        id: 'range-5' 
      },
    ]
  }

  // Format price for display (remove decimals if whole number)
  const formatPrice = (price: number) => {
    return price % 1 === 0 ? price.toString() : price.toFixed(2)
  }

  const quickRanges = calculateQuickRanges()

  // Initialize from URL params and priceRange after mount (client-side only)
  // This prevents hydration mismatch by ensuring server and client render the same initial HTML
  useEffect(() => {
    setIsMounted(true)
    
    const urlMin = searchParams.get('min_price')
    const urlMax = searchParams.get('max_price')
    
    // Set initial values from URL params if they exist, otherwise use priceRange
    if (urlMin) {
      const parsedMin = parseFloat(urlMin)
      if (!isNaN(parsedMin)) {
        setMinPrice(parsedMin)
      }
    } else if (priceRange?.min !== undefined) {
      setMinPrice(priceRange.min)
    }
    
    if (urlMax) {
      const parsedMax = parseFloat(urlMax)
      if (!isNaN(parsedMax)) {
        setMaxPrice(parsedMax)
      }
    } else if (priceRange?.max !== undefined) {
      setMaxPrice(priceRange.max)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount to prevent hydration issues

  // Update state when priceRange prop changes (after initial mount)
  useEffect(() => {
    if (isMounted && priceRange) {
      const urlMin = searchParams.get('min_price')
      const urlMax = searchParams.get('max_price')
      
      // Only update if URL params don't exist
      if (!urlMin && priceRange.min !== undefined) {
        setMinPrice(priceRange.min)
      }
      if (!urlMax && priceRange.max !== undefined) {
        setMaxPrice(priceRange.max)
      }
    }
  }, [priceRange, searchParams, isMounted])

  // Update range track position
  useEffect(() => {
    if (rangeTrackRef.current && maxLimit > minLimit) {
      const range = maxLimit - minLimit
      const minPercent = ((minPrice - minLimit) / range) * 100
      const maxPercent = ((maxPrice - minLimit) / range) * 100
      
      rangeTrackRef.current.style.left = `${Math.max(0, Math.min(100, minPercent))}%`
      rangeTrackRef.current.style.width = `${Math.max(0, Math.min(100, maxPercent - minPercent))}%`
    }
  }, [minPrice, maxPrice, minLimit, maxLimit])

  // Handle min range slider change
  const handleMinRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || minLimit
    if (value <= maxPrice) {
      setMinPrice(value)
      setSelectedQuickBtn(null)
    }
  }

  // Handle min range slider mouse down
  const handleMinRangeMouseDown = () => {
    if (minRangeRef.current) {
      minRangeRef.current.classList.add('higher')
    }
  }

  // Handle max range slider change
  const handleMaxRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || maxLimit
    if (value >= minPrice) {
      setMaxPrice(value)
      setSelectedQuickBtn(null)
    }
  }

  // Handle max range slider mouse down
  const handleMaxRangeMouseDown = () => {
    if (minRangeRef.current) {
      minRangeRef.current.classList.remove('higher')
    }
  }

  // Reset active slider on mouse up
  useEffect(() => {
    const handleMouseUp = () => {
      if (minRangeRef.current) {
        minRangeRef.current.classList.remove('higher')
      }
    }
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  // Handle min input change
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (isNaN(value)) return
    
    const clampedValue = Math.max(minLimit, Math.min(value, maxPrice))
    setMinPrice(clampedValue)
    setSelectedQuickBtn(null)
    if (minRangeRef.current) {
      minRangeRef.current.value = clampedValue.toString()
    }
  }

  // Handle max input change
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (isNaN(value)) return
    
    const clampedValue = Math.max(minPrice, Math.min(value, maxLimit))
    setMaxPrice(clampedValue)
    setSelectedQuickBtn(null)
    if (maxRangeRef.current) {
      maxRangeRef.current.value = clampedValue.toString()
    }
  }

  // Handle quick select button click
  const handleQuickSelect = (min: number, max: number, btnId: string) => {
    setMinPrice(min)
    setMaxPrice(max)
    setSelectedQuickBtn(btnId)
    if (minRangeRef.current) minRangeRef.current.value = min.toString()
    if (maxRangeRef.current) maxRangeRef.current.value = max.toString()
  }

  // Apply filter - update URL params
  const handleApplyFilter = () => {
    // Dispatch custom event to trigger loading immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('productsFilterApplied'))
    }
    
    const params = new URLSearchParams(searchParams.toString())
    
    // Set min_price if it's different from the minimum limit
    if (minPrice > minLimit) {
      params.set('min_price', minPrice.toString())
    } else {
      params.delete('min_price')
    }
    
    // Set max_price if it's different from the maximum limit
    if (maxPrice < maxLimit) {
      params.set('max_price', maxPrice.toString())
    } else {
      params.delete('max_price')
    }
    
    // Reset to page 1 when applying filters
    params.set('page', '1')
    
    router.push(`?${params.toString()}`)
  }

  // Clear filters
  const handleClearFilters = () => {
    setMinPrice(minLimit)
    setMaxPrice(maxLimit)
    setSelectedQuickBtn(null)
    
    if (minRangeRef.current) minRangeRef.current.value = minLimit.toString()
    if (maxRangeRef.current) maxRangeRef.current.value = maxLimit.toString()
    
    const params = new URLSearchParams(searchParams.toString())
    params.delete('min_price')
    params.delete('max_price')
    params.set('page', '1')
    
    router.push(`?${params.toString()}`)
  }

  // Sync slider values with state and initialize on mount
  useEffect(() => {
    if (minRangeRef.current) {
      minRangeRef.current.value = minPrice.toString()
      minRangeRef.current.min = minLimit.toString()
      // Constrain min slider to not exceed maxPrice
      minRangeRef.current.max = maxPrice.toString()
    }
    if (maxRangeRef.current) {
      maxRangeRef.current.value = maxPrice.toString()
      // Constrain max slider to not go below minPrice
      maxRangeRef.current.min = minPrice.toString()
      maxRangeRef.current.max = maxLimit.toString()
    }
  }, [minPrice, maxPrice, minLimit, maxLimit])

  return (
    <div className="price-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Filter by Price')}</h3>
        <button 
          onClick={handleClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300 font-medium transition-colors"
        >
          {t('Clear')}
        </button>
      </div>

      {/* Price Range Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('Price Range')}</span>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
            <span>
              <span className="icon-riyal-symbol text-xs me-1"></span>
              {minPrice % 1 === 0 ? minPrice : minPrice.toFixed(2)}
            </span>
            <span className="text-gray-400">-</span>
            <span>
              <span className="icon-riyal-symbol text-xs me-1"></span>
              {maxPrice % 1 === 0 ? maxPrice : maxPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Range Slider Container */}
        <div className="relative mb-4 py-2">
          {/* Background Track */}
          <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
            {/* Active Track */}
            <div 
              ref={rangeTrackRef}
              className="absolute h-full bg-primary-500 rounded-full dark:bg-primary-300 transition-all duration-150"
            ></div>
          </div>

          {/* Range Inputs Container */}
          <div className="slider-container">
            {/* Min Range Input */}
            <input 
              ref={minRangeRef}
              type="range" 
              min={minLimit} 
              max={maxPrice} 
              value={minPrice} 
              step={maxLimit > minLimit ? (maxLimit - minLimit) / 1000 : 0.01}
              onChange={handleMinRangeChange}
              onMouseDown={handleMinRangeMouseDown}
              className="range-input range-input-min"
            />

            {/* Max Range Input */}
            <input 
              ref={maxRangeRef}
              type="range" 
              min={minPrice} 
              max={maxLimit} 
              value={maxPrice} 
              step={maxLimit > minLimit ? (maxLimit - minLimit) / 1000 : 0.01}
              onChange={handleMaxRangeChange}
              onMouseDown={handleMaxRangeMouseDown}
              className="range-input range-input-max"
            />
          </div>
        </div>

        {/* Manual Input */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label htmlFor="minInput" className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{t('Min')}    </label>
            <input 
              type="number" 
              id="minInput" 
              min={minLimit} 
              max={maxPrice} 
              step="0.01"
              value={minPrice} 
              onChange={handleMinInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
            />
          </div>
          <div className="flex-1">
            <label htmlFor="maxInput" className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{t('Max')}</label>
            <input 
              type="number" 
              id="maxInput" 
              min={minPrice} 
              max={maxLimit} 
              step="0.01"
              value={maxPrice} 
              onChange={handleMaxInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
            />
          </div>
        </div>
      </div>

      {/* Quick Price Ranges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t('Quick Select')}</h4>
        <div className="grid grid-cols-2 gap-2">
          {quickRanges.map((range, index) => {
            const isLast = index === quickRanges.length - 1
            return (
              <button 
                key={range.id}
                onClick={() => handleQuickSelect(range.min, range.max, range.id)}
                className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                  isLast ? 'col-span-2' : ''
                } ${
                  selectedQuickBtn === range.id
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 dark:hover:bg-primary-200 dark:hover:border-primary-300'
                }`}
              >
                {range.label === 'Under' && range.maxValue !== undefined && (
                  <>
                    {t('Under')}     <span className="icon-riyal-symbol text-xs me-1"></span>{formatPrice(range.maxValue)}
                  </>
                )}
                {range.label === 'range' && range.minValue !== undefined && range.maxValue !== undefined && (
                  <>
                    <span className="icon-riyal-symbol text-xs me-1"></span>{formatPrice(range.minValue)} - <span className="icon-riyal-symbol text-xs me-1"></span>{formatPrice(range.maxValue)}
                  </>
                )}
                {range.label === 'plus' && range.minValue !== undefined && (
                  <>
                    <span className="icon-riyal-symbol text-xs me-1"></span>{formatPrice(range.minValue)}+
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Apply Button */}
      <button 
        onClick={handleApplyFilter}
        className="w-full te-btn te-btn-default"
      >
        {t('Apply Filter')}
      </button>

      {/* Results Count - This can be updated when you have the actual count */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {/* Results count can be passed as prop or fetched */}
        </span>
      </div>
    </div>
  )
}

export default PriceWidget
