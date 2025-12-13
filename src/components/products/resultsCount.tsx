import { useTranslations } from 'next-intl'
import React from 'react'

function ResultsCount({ totalProducts }: { totalProducts: number }) {
  const t = useTranslations('variableWidget')
  return (
    <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400" id="sizeColorResults">{t('Showing')} {totalProducts} {t('products')}</span>
    </div>
  )
}

export default ResultsCount
