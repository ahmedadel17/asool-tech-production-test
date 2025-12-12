import React from 'react'
import { useTranslations } from 'next-intl'
function ConversionGridCard({points, value, available, onClick}: {points: number, value: number, available: boolean, onClick?: () => void}) {
  const t = useTranslations("Rewards");
  return (
    <div 
      className="conversion-option border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md border-gray-200 dark:border-gray-600 hover:border-primary-300" 
      data-points={points} 
      data-value={value}
      onClick={onClick}
    >
    <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 dark:text-white">{points} {t('Points')}</h3>
                                </div>
    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        <span className="icon-riyal-symbol text-sm"></span>{value}                        </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {available ? t('Available') : t('Not Available')}                        
        </div>
</div>
  )
}

export default ConversionGridCard
