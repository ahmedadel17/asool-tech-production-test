import React from 'react'
import Link from 'next/link'
function ProductName({name,link}: {name?: string,link?: string}) {
  return (
    <h3 className="product-title font-semibold text-sm lg:text-base">
        <Link href={link || '#'} className="line-clamp-2">
            {name || ''}                </Link>
    </h3>
  )
}

export default ProductName
