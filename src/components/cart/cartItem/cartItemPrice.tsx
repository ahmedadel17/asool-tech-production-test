import React from 'react'

function CartItemPrice({price}: {price: number | undefined | string}) {
  return (
    <div className="text-right">
                    <div className="flex items-center space-x-2">
                                                                {/* <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                                <span className="icon-riyal-symbol"></span>
                                <span>{price}</span>
                            </span> */}
                                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            <span className="icon-riyal-symbol"></span>
                            {price}                                    </span>
                    </div>
                                                </div>
  )
}

export default CartItemPrice
