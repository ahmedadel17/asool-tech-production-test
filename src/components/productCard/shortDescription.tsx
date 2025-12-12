import React from 'react'

function ShortDescription({short_description}: {short_description?: string}) {
  return (
    <p className="product-category text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
    {short_description || ''}
                   </p>
  )
}

export default ShortDescription
