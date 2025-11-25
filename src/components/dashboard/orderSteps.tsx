import React from 'react'
import OrderStep from './orderStep';
import { useTranslations } from 'next-intl';
function OrderSteps({orderData}: {orderData: any}) {
  const t = useTranslations();
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t("Tracking Progress")}</h3>
                {orderData?.data?.steps?.map((step:any)=>(
                    <OrderStep key={step.key} label={step.label} date={step.date} isCurrent={step.is_current} isActive={step.active} />
                ))}
            </div>
  )
}

export default OrderSteps
