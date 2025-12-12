import BreadCrumb from '@/components/breadCrumb'
import LeftSide from '@/components/productDetails/leftSide'
import ProductTabs from '@/components/productDetails/productTabs'
import RightSide from '@/components/productDetails/rightSide'
import React from 'react'
import getRequest from '../../../../helpers/get'
import { getLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'

async function ProductDetails({params}: {params: {slug: string}}) {
  const locale = await getLocale()
  const product = await getRequest(`/catalog/products/details-by-slug/${params.slug}`, {}, null, locale)
  const t = await getTranslations('productDetails')
  return (
    <div id="content" className="flex-1 mt-8 mb-8 site-content dark:bg-gray-900" role="main">
        <div id="primary" className="container">
            <main id="main" role="main">
              <BreadCrumb title={t('Products')} link="/products" secondPage={product?.data?.name} />
<div className='space-y-16'>
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
    <div>
      {/* ---left sidebar--- */}
      <LeftSide product={product?.data} />
    </div>
    <div>
      <RightSide product={product?.data} />
    </div>

  </div>
  {/* <ProductTabs />  */}

</div>

      </main>
    </div>
    </div>
  )
}

export default ProductDetails
