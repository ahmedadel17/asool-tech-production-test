import CartItemRemoveButton from "@/components/cart/cartItem/cartItemRemoveButton"

function CartItem({product}: {product: any}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0">
                                <img src={product?.image} alt="Straight-leg jeans" className="w-full h-full object-cover rounded-md"/>
                        </div>
    <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
            <a href="#" className="hover:text-primary-400">{product?.name}</a>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Qty: {product?.qty} ×
            <span className="icon-riyal-symbol text-xs"></span>
            <span>{product?.price}</span>
        </div>
    </div>
    <CartItemRemoveButton id={product?.id} />
   
</div>
  )
}

export default CartItem
