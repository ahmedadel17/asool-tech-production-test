'use client'
import BreadCrumb from '@/components/breadCrumb'
import CompareHeader from '@/components/compare/compareHeader'
import { useTranslations } from 'next-intl'
import { useCompareStore } from '@/store/compareStore'
import Link from 'next/link'

function Compare() {
  const t = useTranslations('compare')
  const { products, removeProduct, clearCompare } = useCompareStore()
  
  // Get all unique variation types from all products
  const getAllVariationTypes = () => {
    const variationMap = new Map<string, { attribute_id: string; attribute_name: string; attribute_type: string; type?: string }>()
    
    products.forEach(product => {
      product.variations?.forEach(variation => {
        // Create a unique key from attribute_id, attribute_name, or attribute_type
        // Prefer attribute_id as it's most specific, then attribute_name, then attribute_type
        const key = variation.attribute_id || 
                   variation.attribute_name || 
                   variation.attribute_type || 
                   `variation-${variationMap.size}`
        
        if (key && !variationMap.has(key)) {
          variationMap.set(key, {
            attribute_id: variation.attribute_id,
            attribute_name: variation.attribute_name,
            attribute_type: variation.attribute_type,
            type: variation.type
          })
        }
      })
    })
    
    return Array.from(variationMap.values())
  }
  
  const variationTypes = getAllVariationTypes()
  
  // Helper to check if a variation is a color type
  const isColorVariation = (variation: { type?: string; attribute_name?: string; attribute_type?: string }) => {
    return variation.type?.toLowerCase() === 'color' || 
           variation.attribute_name?.toLowerCase() === 'color' || 
           variation.attribute_type?.toLowerCase() === 'color'
  }
  
  // Get variation display name
  const getVariationDisplayName = (variation: { attribute_name?: string; attribute_type?: string; type?: string }) => {
    return variation.attribute_name || variation.attribute_type || variation.type || t('Variation')
  }
  
  return (
    <div id="content" className="flex-1 mt-8 mb-8 site-content" role="main">
    <div id="primary" className="container">
        <main id="main" role="main">
            {/* <!-- Breadcrumb --> */}
        <BreadCrumb title={t('Home')} link="/" secondPage={t('Compare')} />                       
{/* <!-- Page Title --> */}
<CompareHeader />

{/* <!-- Compare Table --> */}
{products.length === 0 ? (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{t('No products to compare')}</p>
    <Link href="/products" className="te-btn te-btn-primary">
      {t('Continue Shopping')}
    </Link>
  </div>
) : (
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full">
<thead className="bg-gray-50 dark:bg-gray-700">
<tr>
<th className="px-6 py-4 text-left text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase tracking-wider w-48">
    {t('Features')}
</th>
{products.map((product, index) => (
  <th key={product.id || index} className="px-6 py-4 text-center text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-64">
    {t('Product')} {index + 1}
  </th>
))}
</tr>
</thead>
<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">

{/* <!-- Product Images --> */}
<tr>
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
    {t('Product Image')}
</td>
{products.map((product, index) => (
  <td key={product.id || index} className="px-6 py-4 text-center">
    <div className="flex justify-center">
      {product.thumbnail ? (
        <img 
          src={product.thumbnail} 
          alt={product.name || `Product ${index + 1}`} 
          className="w-32 h-32 object-cover rounded-lg" 
        />
      ) : (
        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">{t('No Image')}</span>
        </div>
      )}
    </div>
  </td>
))}
</tr>

{/* <!-- Product Names --> */}
<tr className="bg-gray-50 dark:bg-gray-700">
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
    {t('Product Name')}
</td>
{products.map((product, index) => (
  <td key={product.id || index} className="px-6 py-4 text-center">
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
      {product.name || t('Unnamed Product')}
    </h3>
  </td>
))}
</tr>

{/* <!-- Short Description --> */}
<tr>
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
    {t('Description')}
</td>
{products.map((product, index) => (
  <td key={product.id || index} className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
    {product.short_description || '-'}
  </td>
))}
</tr>

{/* <!-- Price --> */}
<tr className="bg-gray-50 dark:bg-gray-700">
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
    {t('Price')}
</td>
{products.map((product, index) => {
  const price = product.price_after_discount || product.min_price || 0
  const originalPrice = product.min_price
  const hasDiscount = product.price_after_discount && product.price_after_discount < (product.min_price || 0)
  
  return (
    <td key={product.id || index} className="px-6 py-4 text-center">
      <div className="space-y-1">
        <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
          {price.toFixed(2)} {t('SAR') || 'SAR'}
        </p>
        {hasDiscount && originalPrice && (
          <p className="text-sm text-gray-500 line-through">
            {originalPrice.toFixed(2)} {t('SAR') || 'SAR'}
          </p>
        )}
      </div>
    </td>
  )
})}
</tr>

{/* <!-- Dynamic Variations --> */}
{variationTypes.map((variationType, variationIndex) => {
  const isColor = isColorVariation(variationType)
  const displayName = getVariationDisplayName(variationType)
  const isEvenRow = variationIndex % 2 === 0
  
  return (
    <tr key={variationType.attribute_id || variationIndex} className={isEvenRow ? '' : 'bg-gray-50 dark:bg-gray-700'}>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white ${isEvenRow ? 'bg-gray-50 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-600'}`}>
        {displayName}
      </td>
      {products.map((product, productIndex) => {
        // Find matching variation for this product
        // Match by attribute_id first, then by attribute_name, then by attribute_type
        const productVariation = product.variations?.find(v => {
          if (variationType.attribute_id && v.attribute_id === variationType.attribute_id) return true
          if (variationType.attribute_name && v.attribute_name === variationType.attribute_name) return true
          if (variationType.attribute_type && v.attribute_type === variationType.attribute_type) return true
          return false
        })
        
        const values = productVariation?.values || []
        
        return (
          <td key={product.id || productIndex} className="px-6 py-4 text-center">
            {values.length > 0 ? (
              <>
                {isColor ? (
                  // Color variations - show as color swatches
                  <>
                    <div className="flex justify-center gap-1 flex-wrap">
                      {values.map((value, valueIndex) => (
                        <div 
                          key={valueIndex}
                          className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" 
                          style={{backgroundColor: value.color || '#ccc'}} 
                          title={value.value || value.color || ''}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {values.length} {values.length === 1 ? t('option') : t('options')}
                    </p>
                  </>
                ) : (
                  // Other variations - show as badges/text
                  <>
                    <div className="flex justify-center gap-1 flex-wrap">
                      {values.map((value, valueIndex) => (
                        <span 
                          key={valueIndex}
                          className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {value.value || value.id}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {values.length} {values.length === 1 ? t('option') : t('options')}
                    </p>
                  </>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-400">-</span>
            )}
          </td>
        )
      })}
    </tr>
  )
})}

{/* <!-- Short Description --> */}
<tr>
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
    {t('Short Description')}
</td>
{products.map((product, index) => (
  <td key={product.id || index} className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
    {product.short_description ? (
      <p className="line-clamp-2">{product.short_description}</p>
    ) : (
      <span className="text-gray-400">-</span>
    )}
  </td>
))}
</tr>

{/* <!-- Actions --> */}
<tr className="bg-gray-50 dark:bg-gray-700">
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
    {t('Actions')}
</td>
{products.map((product, index) => (
  <td key={product.id || index} className="px-6 py-4 text-center">
  <div className="space-y-2">
                                {/* <button className="product-add-to-cart te-btn te-btn-primary te-btn-sm">
                                    {t('Add to Cart')}
                                </button> */}
                                <Link href={`/products/${product.slug}`} className="te-btn te-btn-default te-btn-sm">
                                    {t('View Details')}
                                </Link>
                            </div>
  </td>
))}
</tr>

{/* <!-- Remove from Compare --> */}
<tr>
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
    {t('Remove')}
</td>
{products.map((product, index) => (
  <td key={product.id || index} className="px-6 py-4 text-center">
    <button 
      onClick={() => product.id && removeProduct(product.id)}
      className="remove-product text-red-600 hover:text-red-800 transition-colors" 
      title={t('Remove from comparison')}
    >
      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
      </svg>
    </button>
  </td>
))}
</tr>

</tbody>
</table>
</div>
</div>
)}

{/* <!-- Action Buttons --> */}
{products.length > 0 && (
  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
    <button 
      onClick={clearCompare}
      className="te-btn te-btn-default"
    >
      {t('Clear All')}
    </button>
    <Link href="/products" className="te-btn te-btn-primary">
      {t('Continue Shopping')}
    </Link>
  </div>
)}


</main>
</div>
</div>
  )
}

export default Compare
