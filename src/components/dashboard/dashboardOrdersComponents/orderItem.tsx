import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl';
function OrderItem({order}: {order: any}) {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  // console.log('order', order);
  return (
    <>
             <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">ORD-2024-{order?.order_num}</td>
                    <td className="px-6 py-4">{order?.created_at}</td>
                    <td className="px-6 py-4"  >
                    {order?.status=='order_finished' && <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full order-status">
                    {order?.status_value}
                                 
                    </span>}
                    {order?.status=='processing' && <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full order-status">
                    {order?.status_value}
                                 
                    </span>}
                    {order?.status=='pending' && <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-green-200 text-xs font-medium rounded-full order-status">
                    {order?.status_value}
                                 
                    </span>}
                    {order?.status=='shipped' && <span className="px-3 py-1 bg-blue-100 dark:bg-green-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full order-status">
                    {order?.status_value}
                                 
                    </span>}
                    {order?.status=='ready_for_pickup' && <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-medium rounded-full order-status">
                    {order?.status_value}
                                 
                    </span>}
                    {order?.status=='canceled' && <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-medium rounded-full order-status">
                    {order?.status_value}
                                 
                    </span>}
                    {order?.status=='in_transit' && <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-full order-status">
                    {order?.status_value}
                                 
                    </span>}
                     
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs">
                        
                        {
                          locale=='ar' ?
                          <span className="icon-riyal-symbol"></span> :
                          'SAR'
                          }

                        </span> {order?.total_amount}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/order/${order?.id}`} className="font-medium text-primary-600 dark:text-primary-100 hover:underline">
                        {t('View')}
                      </Link>
                    </td>
                  </tr>
    </>
  )
}

export default OrderItem
