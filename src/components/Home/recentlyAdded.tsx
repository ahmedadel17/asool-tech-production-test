import React from 'react'
import ProductCard from '../productCard'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
async function RecentlyAdded({products}: {products: any}) {
    const t = await getTranslations('recentlyAdded')
  return (
    <section className="te-section dark:bg-gray-900">
    <div className="container">
        {/* <!-- Product Header --> */}
      { products?.data?.length > 0 && <div className="flex items-end justify-between mb-6 space-x-4 rtl:space-x-reverse">
            {/* <!-- Title --> */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('Recently Added')}
            </h2>

            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Link href="/products" className="text-secondary-600 hover:text-secondary-800 hover:underline hover:underline-offset-2 transition-all duration-200">
                    {t('View More')}
                </Link>
            </div>
        </div>}

        <div className="te-products">
            <div id="products-grid" className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4">
               
               {products?.data?.map((product: any, index: number) => (
                <ProductCard key={index} product={product} />
               ))}
              

                </div>
        </div>
    </div>
</section>
  )
}

export default RecentlyAdded
