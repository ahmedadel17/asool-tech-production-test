import MainSlider from '@/components/Home/mainSlider'
import GridItem from '@/components/Home/gridItem'
import RecentlyAdded from '@/components/Home/recentlyAdded'
import Banner from '@/components/Home/banner'
import ProductSlider from '@/components/Home/productSlider'
import Features from '@/components/Home/features'
import getRequest from '../../helpers/get'
import  {getLocale} from 'next-intl/server'
import CustomerOpinions from '@/components/Home/customerOpinions'
import React from 'react'

interface SectionData {
  meta?: {
    order?: number
  }
  [key: string]: unknown
}

interface SectionWithMeta {
  key: string
  data: SectionData | null | undefined
  meta?: {
    order?: number
  }
}

async function Page() {
  const locale = await getLocale();



  const homeData = await getRequest('/home-v2', {}, null, locale);
  
  // Get all sections and convert to array with their keys
  const sections = (homeData?.data?.sections || {}) as Record<string, SectionData>
  const sectionsArray: SectionWithMeta[] = Object.entries(sections).map(([key, value]) => ({
    key,
    data: value,
    meta: value?.meta
  }))

  // Sort sections by meta.order (default to 999 if no order is specified)
  const sortedSections = sectionsArray.sort((a, b) => {
    const orderA = a.meta?.order ?? 999
    const orderB = b.meta?.order ?? 999
    return orderA - orderB
  })

  // Check if section has data
  const hasData = (section: SectionWithMeta): boolean => {
    if (!section.data) return false
    
    switch (section.key) {
      case 'sliders': {
        const slidersData = section.data as { data?: unknown[] }
        return !!(slidersData?.data && Array.isArray(slidersData.data) && slidersData.data.length > 0)
      }
      case 'new_arrivals': {
        const productsData = section.data as { data?: unknown[] }
        return !!(productsData?.data && Array.isArray(productsData.data) && productsData.data.length > 0)
      }
      case 'featured_products': {
        const productsData = section.data as { data?: unknown[] }
        return !!(productsData?.data && Array.isArray(productsData.data) && productsData.data.length > 0)
      }
      default:
        return false
    }
  }

  // Render section component based on section key
  const renderSection = (section: SectionWithMeta): React.ReactNode => {
    if (!hasData(section)) return null
    
    switch (section.key) {
      case 'sliders':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <MainSlider key={section.key} sliders={section.data as any} />
      case 'new_arrivals':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <RecentlyAdded key={section.key} products={section.data as any} />
      case 'featured_products':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <ProductSlider key={section.key} products={section.data as any} />
      default:
        return null
    }
  }

  return (
    <div>
      {sortedSections.map((section) => renderSection(section))}
      <GridItem />
      <Banner />
      <CustomerOpinions />
      <Features />
    </div>
  )
}

export default Page
