'use client'

import { useTranslations } from 'next-intl'

interface SelectedValue {
  attributeId: string
  attributeName: string
  valueId: string
  valueName: string
  valueColor?: string
}

interface SelectedAttributesProps {
  selectedValues: SelectedValue[]
  onRemove: (attributeId: string, valueId: string) => void
}

function SelectedAttributes({ selectedValues, onRemove }: SelectedAttributesProps) {
  const t = useTranslations('variableWidget')
  if (selectedValues.length === 0) {
    return null
  }

  // Group selected values by attribute
  const groupedByAttribute: { [key: string]: SelectedValue[] } = {}
  selectedValues.forEach((value) => {
    if (!groupedByAttribute[value.attributeId]) {
      groupedByAttribute[value.attributeId] = []
    }
    groupedByAttribute[value.attributeId].push(value)
  })

  return (
    <div id="selectedFilters" className="mb-6">
      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('Selected')}:</div>
      <div className="space-y-2">
        {Object.entries(groupedByAttribute).map(([attributeId, values]) => (
          <div key={attributeId}>
            <span className="text-xs text-gray-500 dark:text-gray-400">{values[0]?.attributeName}:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {values.map((value) => (
                <span 
                  key={`${value.attributeId}-${value.valueId}`}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100"
                >
                  {value.valueName}
                  <button 
                    className="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700" 
                    aria-label={`Remove ${value.attributeName} ${value.valueName}`}
                    onClick={() => onRemove(value.attributeId, value.valueId)}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectedAttributes
