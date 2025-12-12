'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl' 
interface ProductsPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

function ProductsPagination({ currentPage, totalPages, totalItems, itemsPerPage }: ProductsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)
  const t = useTranslations('productsPagination')
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination-wrapper">
      <div className="te-table-pagination flex justify-between items-center flex-wrap gap-4 max-md:justify-center max-md:text-center">
        <div className="te-pagination-info flex items-center max-md:order-2 max-md:w-full max-md:justify-center">
          <span className="te-pagination-info-text text-sm text-gray-600 dark:text-gray-400">
            {t('Showing')}
            <span className="te-pagination-info-number font-semibold text-gray-900 dark:text-gray-100 mx-1">{startItem}</span>
            {t('to')} <span className="te-pagination-info-number font-semibold text-gray-900 dark:text-gray-100 mx-1">{endItem}</span>
            {t('of')} <span className="te-pagination-info-number font-semibold text-gray-900 dark:text-gray-100 mx-1">{totalItems}</span>
            {t('results')}{totalItems !== 1 ? t('s') : t('')}
          </span>
        </div>

        <nav className="te-pagination te-pagination-responsive flex justify-center items-center">
          <ul className="te-pagination-list flex items-center gap-1 list-none m-0 p-0">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`te-pagination-nav flex items-center justify-center gap-2 min-w-10 h-10 px-2 py-2 text-sm font-medium border rounded-md transition-all duration-200 ease-in-out ${
                  currentPage === 1
                    ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-600 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500'
                }`}
              >
                <svg className="w-4 h-4 rtl:rotate-180" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span className="te-pagination-nav-text inline max-sm:hidden">{t('Previous')}</span>
              </button>
            </li>

            {/* Desktop page numbers */}
            {pageNumbers.map((page, index) => {
              if (page === '...') {
                return (
                  <li key={`ellipsis-${index}`} className="te-pagination-mobile-hide hidden sm:block">
                    <span className="flex items-center justify-center min-w-10 h-10 px-2 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  </li>
                )
              }

              const pageNum = page as number
              const isActive = pageNum === currentPage

              return (
                <li key={pageNum} className="te-pagination-mobile-hide hidden sm:block">
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className={`te-pagination-link flex items-center justify-center min-w-10 h-10 px-2 py-3 text-sm font-medium border rounded-md transition-all duration-200 ease-in-out ${
                      isActive
                        ? 'text-white bg-primary-500 border-primary-500'
                        : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 cursor-pointer'
                    }`}
                  >
                    {pageNum}
                  </button>
                </li>
              )
            })}

            {/* Mobile current page display */}
            <li className="te-pagination-mobile-show hidden max-sm:block">
              <span className="te-pagination-current flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md">
                {currentPage} / {totalPages}
              </span>
            </li>

            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`te-pagination-nav flex items-center justify-center gap-2 min-w-10 h-10 px-2 py-2 text-sm font-medium border rounded-md transition-all duration-200 ease-in-out ${
                  currentPage === totalPages
                    ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-600 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500'
                }`}
                aria-label="Next"
              >
                <span className="te-pagination-nav-text inline max-sm:hidden">{t('Next')}</span>
                <svg className="w-4 h-4 rtl:rotate-180" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ProductsPagination
