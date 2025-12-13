import React from 'react'
import { useTranslations } from 'next-intl';
import ProductItem from '../checkoutConfirmation/productItem';
function ProductItems({orderData}: {orderData: any}) {
  const t = useTranslations('order');
  return (
   
    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t("Order Items")}</h3>
    <div className="space-y-4">
    {orderData?.data?.products?.map((item:any)=>(    
<ProductItem key={item.id} item={item} />
))}
    </div>
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
            <span>{t('Total')}:</span>
            <span>
                <span className="icon-riyal-symbol"></span>
                {orderData?.data?.amount_to_pay}
            </span>
        </div>
    </div>
</div>
  )
}

export default ProductItems
