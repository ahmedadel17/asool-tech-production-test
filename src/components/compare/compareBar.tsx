'use client'
import { useTranslations } from 'next-intl'
import { useCompareStore } from '@/store/compareStore'
import Link from 'next/link'

function CompareBar() {
  const t = useTranslations('compare')
  const { count, clearCompare } = useCompareStore()
  const isVisible = count > 0

  const handleClearAll = () => {
    clearCompare()
  }

  // Don't render at all if no products
  if (!isVisible) {
    return null
  }

  return (
    <div 
      id="compareBar" 
      className={`fixed left-0 right-0 bg-white border-t shadow-lg p-4 transition-transform duration-300 z-[60] dark:bg-gray-800 dark:border-gray-700 bottom-16 lg:bottom-0`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold">{t('Compare Products')}:</span>
          <span id="compareCount" className="text-sm text-gray-600 dark:text-gray-300">
            {count} {t('selected')}
          </span>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/compare"
            className="bg-primary-500 text-white font-semibold px-4 py-2 rounded hover:bg-primary-600 dark:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('Compare Now')}
          </Link>
          <button 
            onClick={handleClearAll}
            className="border border-gray-300 dark:border-gray-200 text-gray-800 dark:text-gray-100 font-semibold px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:border-gray-500 transition-colors"
          >
            {t('Clear All')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompareBar
