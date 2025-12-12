import React from 'react'
import CartItemName from './cartItem/cartItemName'
import CartItemRemoveButton from './cartItem/cartItemRemoveButton'
import CartItemVariations from './cartItem/cartItemVariations'
import CartItemQuantityControl from './cartItem/cartItemQuantityControl'
import CartItemPrice from './cartItem/cartItemPrice'
import CartItemImage from './cartItem/cartItemImage'

interface CartProduct {
  id?: string | number
  lineId?: string | number
  cart_item_id?: string | number
  name?: string
  image?: string
  variation?: unknown
  quantity?: number
  price?: number | string
  [key: string]: unknown
}

function CartItem({product}: {product: CartProduct}) {
  // Debug: Log product structure to identify the correct ID field
 

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-32 md:h-32 w-full h-48">
        <CartItemImage image={product?.image} />
        </div>

        <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
                <CartItemName name={product?.name} />
                <CartItemRemoveButton id={product?.id} />
            </div>

            <CartItemVariations variations={product?.variation as string} />

            <div className="flex items-center justify-between">
                {/* <!-- Quantity Controls --> */}
                <CartItemQuantityControl quantity={product?.qty as number} cartItemId={product?.id as string | number} />

                {/* <!-- Price --> */}
                <CartItemPrice price={product?.price}  />
            </div>
        </div>
    </div>
</div>
  )
}

export default CartItem
