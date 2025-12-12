import React from 'react'

function ProductPrice({price,price_after_discount}: {price?: number,price_after_discount?: number}) {
  return (
    <div className="product-price flex items-center gap-1">
   {price!=price_after_discount &&  <p className="text-gray-500 dark:text-gray-300 line-through text-sm flex items-center gap-1">
<span className="icon-riyal-symbol"></span>
{price}                   </p>}
<p className="text-sm lg:text-base font-semibold text-secondary-600 flex items-center gap-1">
<span className="icon-riyal-symbol"></span>
{price_after_discount}                </p>
</div>
  )
}

export default ProductPrice
