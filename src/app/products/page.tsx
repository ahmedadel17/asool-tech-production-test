import React from 'react'
import SideBarFilter from '@/components/products/productsFilter'
import ProductsGridWithLoading from '@/components/products/productsGridWithLoading'
import BreadCrumb from '@/components/breadCrumb'
import getRequest from '../../../helpers/get'
import { getLocale, getTranslations } from 'next-intl/server'

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function Products({ searchParams }: ProductsPageProps) {
  const locale = await getLocale()
  const t = await getTranslations('productsGrid')
  const params = await searchParams
  const page = params?.page ? parseInt(params.page as string, 10) : 1
  const perPage = params?.per_page ? parseInt(params.per_page as string, 10) : 9
  const minPrice = params?.min_price as string | undefined
  const maxPrice = params?.max_price as string | undefined
  const keyword = params?.keyword as string | undefined
  // Handle categories[] parameter (Next.js parses it as 'categories[]' key)
  const categoriesParam = params?.['categories[]'] || params?.categories
  const categories = categoriesParam 
    ? (Array.isArray(categoriesParam) ? categoriesParam : [categoriesParam])
    : []
  // Handle attributes[attributeId]=valueId format
  // Extract all attributes[attributeId] parameters from URL
  const attributeFilters: Record<string, string> = {}
  Object.keys(params).forEach((key) => {
    if (key.startsWith('attributes[') && key.endsWith(']')) {
      const attributeId = key.slice(11, -1) // Extract ID from 'attributes[ID]'
      const value = params[key]
      if (value && typeof value === 'string') {
        attributeFilters[attributeId] = value
      }
    }
  })
  
  // Also handle legacy attributes[] format for backward compatibility
  const legacyAttributesParam = params?.['attributes[]'] || params?.attributes
  const legacyAttributes = legacyAttributesParam 
    ? (Array.isArray(legacyAttributesParam) ? legacyAttributesParam : [legacyAttributesParam])
    : []
  
  // Build query string for API
  const queryParams = new URLSearchParams()
  queryParams.set('page', page.toString())
  queryParams.set('per_page', perPage.toString())
  
  // Add keyword search if it exists
  if (keyword) {
    queryParams.set('keyword', keyword)
  }
  
  // Add price filters if they exist
  if (minPrice) {
    queryParams.set('min_price', minPrice)
  }
  if (maxPrice) {
    queryParams.set('max_price', maxPrice)
  }
  
  // Add category filters if they exist
  categories.forEach((categoryId: string) => {
    queryParams.append('categories[]', categoryId)
  })
  
  // Add attribute filters in format: attributes[attributeId]=valueId
  Object.entries(attributeFilters).forEach(([attributeId, value]) => {
    queryParams.set(`attributes[${attributeId}]`, value)
  })
  
  // Also add legacy format for backward compatibility
  legacyAttributes.forEach((attributeId: string) => {
    queryParams.append('attributes[]', attributeId)
  })
  
  const products = await getRequest(`/catalog/products?${queryParams.toString()}`, {}, null, locale)
  
  const paginationData = products?.data?.paginate || {}
  const productsList = products?.data?.items || []

  return (
    <div id="content" className="flex-1 mt-8 mb-8 site-content dark:bg-gray-900" role="main">
        <div id="primary" className="container">
            <main id="main" role="main">
<BreadCrumb title={t('Home')} link="/" secondPage={t('Products')} />
<div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-8'>
    <div className="lg:col-span-1 hidden xl:block">

    <div className="sticky top-8 space-y-6">

<SideBarFilter />
    </div>
    </div>
    <ProductsGridWithLoading 
      products={productsList} 
      paginationData={paginationData}
      currentPage={page}
    />

</div>
            </main>

        </div>
      
    </div>
  )
}

export default Products
