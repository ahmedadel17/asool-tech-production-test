'use client'
import React from 'react'
import { useLocale } from 'next-intl'
function ProductPrice({min_price,price_after_discount,price_before_discount}: {min_price: number,price_after_discount: number,price_before_discount: number}) {
  const locale = useLocale()
  return (
    <div className="product-price flex items-baseline gap-2">
                   {(price_after_discount) &&  <span className="text-3xl font-bold text-secondary-600">
                        {locale=='ar' ? <span className="icon-riyal-symbol"></span> : <span>
                          SAR
                        </span>}
                        <span className='ml-1'>{price_after_discount }</span>
                    </span>}

                     {/* { price_after_discount != price_before_discount  &&  <span className="text-3xl font-bold text-secondary-600">
                        {locale=='ar' ? <span className="icon-riyal-symbol"></span> : <span>
                          SAR
                        </span>}
                        <span>{price_after_discount}</span>
                    </span>} */}
                    {( price_before_discount !==price_after_discount) && price_before_discount !==0 && <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        {locale=='ar' ? <span className="icon-riyal-symbol"></span> : <span>
                          SAR
                        </span>}
                        <span className='ml-1'>{ price_before_discount}</span>
                    </span>}
                </div>
  )
}

export default ProductPrice
