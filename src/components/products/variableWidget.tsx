'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import VariableWidgetSection from './VariableWidgetSection'
import AttributeButton from './attributeButton'
import ColorButton from './colorButton'
import ResultsCount from './resultsCount'
import SelectedAttributes from './selectedAttributes'
import VariableWidgetHeader from './variableWidgetHeader'

interface AttributeValue {
  id: string | number
  value: string
  color?: string
}

interface Attribute {
  id: string | number
  name: string
  type: string
  values: AttributeValue[]
}

interface SelectedAttributesState {
  [attributeId: string]: string[]
}

function VariableWidget({ attributes, totalProducts }: { attributes: Attribute[], totalProducts: number }) {
  const t = useTranslations('productsFilter')
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State to track selected attribute values: { attributeId: [valueId1, valueId2, ...] }
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributesState>({})

  // Initialize selected attributes from URL parameters on mount
  useEffect(() => {
    if (attributes && attributes.length > 0) {
      const initialSelected: SelectedAttributesState = {}
      
      // Read attributes[attributeId]=valueId format from URL
      attributes.forEach((attribute) => {
        const attrId = String(attribute.id)
        const attributeParam = searchParams.get(`attributes[${attrId}]`)
        
        if (attributeParam) {
          // Split by comma if multiple values, otherwise single value
          const valueIds = attributeParam.split(',').filter(v => v.trim() !== '')
          if (valueIds.length > 0) {
            initialSelected[attrId] = valueIds
          }
        }
      })
      
      if (Object.keys(initialSelected).length > 0) {
        setSelectedAttributes(initialSelected)
      }
    }
  }, [searchParams, attributes])

  // Toggle attribute value selection
  const toggleAttributeValue = useCallback((attributeId: string | number, valueId: string | number) => {
    setSelectedAttributes((prev) => {
      const attrId = String(attributeId)
      const valId = String(valueId)
      const currentValues = prev[attrId] || []
      
      if (currentValues.includes(valId)) {
        // Remove if already selected
        const newValues = currentValues.filter((id) => id !== valId)
        if (newValues.length === 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [attrId]: _, ...rest } = prev
          return rest
        }
        return { ...prev, [attrId]: newValues }
      } else {
        // Add if not selected
        return { ...prev, [attrId]: [...currentValues, valId] }
      }
    })
  }, [])

  // Check if an attribute value is selected
  const isValueSelected = useCallback((attributeId: string | number, valueId: string | number) => {
    const attrId = String(attributeId)
    const valId = String(valueId)
    return selectedAttributes[attrId]?.includes(valId) || false
  }, [selectedAttributes])

  // Apply filters to URL
  const handleApplyFilter = useCallback(() => {
    // Dispatch custom event to trigger loading
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('productsFilterApplied'))
    }

    // Create new URLSearchParams with existing params
    const params = new URLSearchParams(searchParams.toString())
    
    // Remove all existing attributes[attributeId] parameters
    // Get all keys and remove those that start with 'attributes['
    const keysToDelete: string[] = []
    params.forEach((_, key) => {
      if (key.startsWith('attributes[')) {
        keysToDelete.push(key)
      }
    })
    keysToDelete.forEach(key => params.delete(key))
    
    // Also remove old format attributes[]
    params.delete('attributes[]')
    
    // Add selected attribute values in format: attributes[attributeId]=valueId
    Object.entries(selectedAttributes).forEach(([attributeId, valueIds]) => {
      if (valueIds.length > 0) {
        // Join multiple values with comma, or use single value
        const valueParam = valueIds.join(',')
        params.set(`attributes[${attributeId}]`, valueParam)
      }
    })
    
    // Reset to page 1 when applying filters
    params.set('page', '1')
    
    router.push(`?${params.toString()}`)
  }, [selectedAttributes, searchParams, router])

  // Get all selected values for display
  const getAllSelectedValues = useCallback(() => {
    const selected: Array<{ attributeId: string, attributeName: string, valueId: string, valueName: string, valueColor?: string }> = []
    
    attributes?.forEach((attribute) => {
      const attrId = String(attribute.id)
      const selectedValueIds = selectedAttributes[attrId] || []
      
      selectedValueIds.forEach((valueId) => {
        const value = attribute.values.find((v) => String(v.id) === valueId)
        if (value) {
          selected.push({
            attributeId: attrId,
            attributeName: attribute.name,
            valueId: valueId,
            valueName: value.value,
            valueColor: value.color
          })
        }
      })
    })
    
    return selected
  }, [selectedAttributes, attributes])

  // Remove a specific attribute value
  const removeAttributeValue = useCallback((attributeId: string, valueId: string) => {
    setSelectedAttributes((prev) => {
      const attrId = String(attributeId)
      const currentValues = prev[attrId] || []
      const newValues = currentValues.filter((id) => id !== valueId)
      
      if (newValues.length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [attrId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [attrId]: newValues }
    })
  }, [])

  // Clear all selected attributes
  const handleClearAll = useCallback(() => {
    // Dispatch custom event to trigger loading
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('productsFilterApplied'))
    }

    // Clear local state
    setSelectedAttributes({})

    // Create new URLSearchParams with existing params
    const params = new URLSearchParams(searchParams.toString())
    
    // Remove all attributes[attributeId] parameters
    const keysToDelete: string[] = []
    params.forEach((_, key) => {
      if (key.startsWith('attributes[')) {
        keysToDelete.push(key)
      }
    })
    keysToDelete.forEach(key => params.delete(key))
    
    // Also remove old format attributes[]
    params.delete('attributes[]')
    
    // Reset to page 1
    params.set('page', '1')
    
    router.push(`?${params.toString()}`)
  }, [searchParams, router])

  return (
    <div className="variable-widget w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <VariableWidgetHeader onClear={handleClearAll} />

      {/* Attribute Filters */}
      {attributes?.map((attribute) => {
        return (
          attribute?.type === 'color' ? (
            <VariableWidgetSection key={attribute?.id} attributeName={attribute?.name}>
              {attribute?.values?.map((value) => {
                return (
                  <ColorButton 
                    key={value?.id} 
                    color={value}
                    isSelected={isValueSelected(attribute.id, value.id)}
                    onClick={() => toggleAttributeValue(attribute.id, value.id)}
                  />
                )
              })}
            </VariableWidgetSection>
          ) : (
            <VariableWidgetSection key={attribute?.id} attributeName={attribute?.name}>
              {attribute?.values?.map((value) => {
                return (
                  <AttributeButton 
                    key={value?.id} 
                    attribute={value}
                    isSelected={isValueSelected(attribute.id, value.id)}
                    onClick={() => toggleAttributeValue(attribute.id, value.id)}
                  />
                )
              })}
            </VariableWidgetSection>
          )
        )
      })}

      {/* Selected Attributes Display */}
      <SelectedAttributes 
        selectedValues={getAllSelectedValues()}
        onRemove={removeAttributeValue}
      />

      {/* Apply Button */}
      <button 
        onClick={handleApplyFilter}
        className="w-full te-btn te-btn-default" 
        aria-label="Apply size and color filters"
      >
        {t('Apply Filter')}
      </button>

      {/* Results Count */}
      <ResultsCount totalProducts={totalProducts} />
    </div>
  )
}

export default VariableWidget
