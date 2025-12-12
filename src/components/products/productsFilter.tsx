import React from 'react'
import PriceWidget from './priceWidget'
import CategoriesWidget from './categoriesWidget'
import VariableWidget from './variableWidget'
import getRequest from '../../../helpers/get'
import { getLocale } from 'next-intl/server'
async function ProductsFilter() {
  const locale = await getLocale()
  const filterData =  await getRequest(`/catalog/filter-data?`, {}, '', locale)
  console.log('filterData', filterData)
  return (
    <>
      <PriceWidget priceRange={filterData?.data?.price_range} />
      <CategoriesWidget categories={filterData?.data?.categories} />
      <VariableWidget />
    </>
  )
}

export default ProductsFilter
