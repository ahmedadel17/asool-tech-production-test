import React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'
import MainSlider from '@/components/Home/mainSlider'
import GridItem from '@/components/Home/gridItem'
import RecentlyAdded from '@/components/Home/recentlyAdded'
import Banner from '@/components/Home/banner'
import ProductSlider from '@/components/Home/productSlider'
import CustomerOpinions from '@/components/Home/customerOpinions'
import Features from '@/components/Home/features'
import getRequest from '../../helpers/get'
import  {getLocale} from 'next-intl/server'
async function Page() {
  const locale = await getLocale();

  const homeData = await getRequest('/home-v2', {}, null, locale);
  console.log('homeData',homeData.data.sections)
  return (
    <div>
      {homeData?.data?.sections?.sliders && <MainSlider sliders={homeData?.data?.sections?.sliders} />}
      <GridItem />
      {homeData?.data?.sections?.new_arrivals && <RecentlyAdded products={homeData?.data?.sections?.new_arrivals} />}
      <Banner />
     {homeData?.data?.sections?.featured_products && <ProductSlider products={homeData?.data?.sections?.featured_products} />}
      {/* <CustomerOpinions /> */}
      <Features />
    </div>
  )
}

export default Page
