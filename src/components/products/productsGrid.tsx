'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductsPagination from './productsPagination'
import ProductCard from '../productCard'
import ClearFiltersButton from './clearFiltersButton'
import { useTranslations } from 'next-intl'
interface Product {
  id?: string | number
  [key: string]: unknown
}

interface ProductsGridProps {
  products: Product[]
  paginationData?: {
    current_page?: number
    total_pages?: number
    total?: number
    per_page?: number
  }
  currentPage?: number
}

function ProductsGrid({ products, paginationData, currentPage = 1 }: ProductsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const perPage = paginationData?.per_page || parseInt(searchParams.get('per_page') || '9', 10)
  const t = useTranslations('productsGrid')
  // Determine grid columns based on per_page
  const getGridColumns = () => {
    switch (perPage) {
      case 6:
        return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-2'
      case 9:
        return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
      case 12:
        return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = e.target.value
    
    // Dispatch custom event to trigger loading immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('productsFilterApplied'))
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set('per_page', newPerPage)
    params.set('page', '1') // Reset to page 1 when changing columns
    
    router.push(`?${params.toString()}`)
  }
  return (
    <div className="xl:col-span-3">
    <div className="space-y-6">

        {/* <!-- Product Header --> */}
        <div className="flex items-end justify-between mb-6 space-x-4 rtl:space-x-reverse">
            {/* <!-- Title --> */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("Our Products")}
            </h2>

            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {/* <!-- Order Select --> */}
                <form method="GET" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <label htmlFor="order" className="sr-only">{t('Sort by')}:</label>
                    <select id="order" name="order" style={{ paddingLeft: '0px' }}>
                        <option value="default">{t("Default")}</option>
                        <option value="price_asc">{t('Price')}: {t('Low to High')}</option>
                        <option value="price_desc">{t('Price')}: {t('High to Low')}</option>
                        <option value="newest">{t("Newest")}</option>
                    </select>
                </form>

                {/* <!-- Products Per Page / Grid Columns Select --> */}
                <div className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
                    <label htmlFor="per_page" className="sr-only">{t('Products per page')} / {t('grid columns')}:</label>
                    <select 
                      id="per_page" 
                      name="per_page" 
                      value={perPage}
                      onChange={handlePerPageChange}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value="6">{t('2 Columns')}</option>
                        <option value="9">{t('3 Columns')}  </option>
                        <option value="12">{t('4 Columns')}  </option>
                    </select>
                </div>

            </div>
        </div>

        {products.length === 0 ? (
          /* <!-- Empty State --> */
          <div className="te-products">
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="mb-6">
                <svg 
                  className="w-24 h-24 text-gray-300 dark:text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("No Products Found")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
                {t("We could not find any products matching your filters Try adjusting your search criteria or clear the filters to see all products")}
              </p>
              <ClearFiltersButton />
            </div>
          </div>
        ) : (
          <>
            <div className="te-products">
              <div id="products-grid" className={`grid gap-3 ${getGridColumns()} lg:gap-6`}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* <!-- Pagination --> */}
            <ProductsPagination 
              currentPage={paginationData?.current_page || currentPage}
              totalPages={paginationData?.total_pages || 1}
              totalItems={paginationData?.total || products.length}
              itemsPerPage={paginationData?.per_page || 9}
            />
          </>
        )}
    </div>
</div>
  )
}

export default ProductsGrid
