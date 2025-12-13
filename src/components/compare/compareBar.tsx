'use client'
import { useTranslations } from 'next-intl'
import { useCompareStore } from '@/store/compareStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function CompareBar() {
  const pathname = usePathname()
  const t = useTranslations('compare')
  const { count, clearCompare } = useCompareStore()
  const isVisible = count > 0

  const handleClearAll = () => {
    clearCompare()
  }

  // Don't render at all if no products or on auth pages
  if (!isVisible || pathname?.startsWith('/auth')) {
    return null
  }

  return (
    <div 
      id="compareBar" 
      className={`fixed left-0 right-0 bg-white border-t shadow-lg p-3 sm:p-4 transition-transform duration-300 z-[60] dark:bg-gray-800 dark:border-gray-700 bottom-16 lg:bottom-0`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="font-semibold text-sm sm:text-base">{t('Compare Products')}:</span>
          <span id="compareCount" className="text-sm text-gray-600 dark:text-gray-300">
            {count} {t('selected')}
          </span>
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <Link 
            href="/compare"
            className="bg-primary-500 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-primary-600 dark:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-1 lg:flex-initial text-center"
          >
            {t('Compare Now')}
          </Link>
          <button 
            onClick={handleClearAll}
            className="border border-gray-300 dark:border-gray-200 text-gray-800 dark:text-gray-100 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:border-gray-500 transition-colors whitespace-nowrap flex-1 lg:flex-initial"
          >
            {t('Clear All')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompareBar
