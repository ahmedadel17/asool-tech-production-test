import React from 'react'

function ProductDescription({description}: {description: string}) {
  return (
    <div className="product-desc">
                    <p dangerouslySetInnerHTML={{ __html: description }} className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    </p>
                </div>
  )
}

export default ProductDescription
