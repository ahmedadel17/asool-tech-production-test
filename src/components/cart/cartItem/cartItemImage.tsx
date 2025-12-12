import React from 'react'

function CartItemImage({image}: {image: string | undefined}) {
  return (
    <img src={image} alt="Tutu Dress with Sparkles" className="w-full h-full object-cover rounded-md"/>

  )
}

export default CartItemImage
