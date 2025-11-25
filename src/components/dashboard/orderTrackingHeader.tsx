import React from 'react'
import { useTranslations } from 'next-intl';
function OrderTrackingHeader({orderData}: {orderData: any}) {
  const t = useTranslations();
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 id="orderNumber" className="text-xl font-bold text-gray-900 dark:text-white">{t("Order")} #ORD-{orderData?.data?.order_num}</h2>
            <p id="orderDate" className="text-sm text-gray-600 dark:text-gray-400"> {orderData?.data?.reservation_time}</p>
        </div>
        <div className="flex items-center gap-3">
            <span id="orderStatus" style={{color: orderData?.data?.status?.color}} className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-sm font-medium rounded-full">{
                
                orderData?.data?.status_value
                }</span>
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
