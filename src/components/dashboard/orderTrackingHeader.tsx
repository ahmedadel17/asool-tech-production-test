import React from 'react'
import { useTranslations } from 'next-intl';
function OrderTrackingHeader({orderData}: {orderData: any}) {
  const t = useTranslations('order');
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 id="orderNumber" className="text-xl font-bold text-gray-900 dark:text-white">{t("Order")} #ORD-{orderData?.data?.order_num}</h2>
            <p id="orderDate" className="text-sm text-gray-600 dark:text-gray-400"> {orderData?.data?.reservation_time}</p>
        </div>
        <div className="flex items-center gap-3">
        {orderData?.data?.status?.key=='order_finished' && <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full order-status">
                    { orderData?.data?.status_value}
                                 
                    </span>}
                    {orderData?.data?.status?.key=='processing' && <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full order-status">
                    { orderData?.data?.status_value}
                                 
                    </span>}
                    {orderData?.data?.status?.key=='pending' && <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-green-200 text-xs font-medium rounded-full order-status">
                    { orderData?.data?.status_value}
                                 
                    </span>}
                    {orderData?.data?.status?.key=='shipped' && <span className="px-3 py-1 bg-blue-100 dark:bg-green-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full order-status">
                    { orderData?.data?.status_value}
                                 
                    </span>}
                    {orderData?.data?.status?.key=='ready_for_pickup' && <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-medium rounded-full order-status">
                    { orderData?.data?.status_value}
                                 
                    </span>}
                    {orderData?.data?.status?.key=='canceled' && <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-medium rounded-full order-status">
                    { orderData?.data?.status_value}
                                 
                    </span>}
                    {orderData?.data?.status?.key=='in_transit' && <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-full order-status">
                    { orderData?.data?.status_value}
                                 
                    </span>}
          
            {/* <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Expected Delivery</p>
                <p id="expectedDelivery" className="text-sm text-gray-600 dark:text-gray-400">September 5, 2025</p>
            </div> */}
        </div>
    </div>
</div>
  )
}

export default OrderTrackingHeader
