import React from 'react'

function OrderItem({item}: {item: any}) {
  return (
    <div className="space-y-4 mb-6">

      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <img src={item?.image} alt={item?.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item?.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item?.variations?.map((variation: any) => variation?.name).join(', ')}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item?.qty}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">
                                <span className="icon-riyal-symbol text-xs"></span>
                                <span>{item?.price}</span>
                            </p>
                        </div>
                    </div>
    </div>

  )
}

export default OrderItem
