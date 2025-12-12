import React from 'react'

function ProductThumbnail({thumnail,thumbnail_flip}:{thumnail?:string,thumbnail_flip?:string}) {
  return (
    <>
      <img src={thumnail || ''} alt="رداء قطني مطرز بالأكمام الطويلة"  decoding="async" width="300" height="320" className="w-full h-full object-cover transition-all duration-500 ease-in-out transform"/>

{/* <!-- Thumbanil Flip Image --> */}
<img src={thumbnail_flip || ''} alt="رداء قطني مطرز بالأكمام الطويلة hover image" className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"/>

    </>
  )
}

export default ProductThumbnail
