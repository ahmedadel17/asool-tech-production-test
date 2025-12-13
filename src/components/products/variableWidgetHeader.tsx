'use client'

import { useTranslations } from 'next-intl'

interface VariableWidgetHeaderProps {
  onClear?: () => void
}

function VariableWidgetHeader({ onClear }: VariableWidgetHeaderProps) {
  const t = useTranslations('variableWidget')
  return (
    <>
     {/* <!-- Widget Header --> */}
     <div className="flex items-center justify-between mb-6">
     <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> {t('Attributes')} </h3>
     <button 
       id="clearSizeColor" 
       className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors" 
       aria-label="Clear all size and color filters"
       onClick={onClear}
     >
         {t('Clear')}    
     </button>
 </div>
 </>
  )
}

export default VariableWidgetHeader
