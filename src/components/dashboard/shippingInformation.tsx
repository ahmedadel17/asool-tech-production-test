'use client'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import postRequest from '../../../helpers/post';
import toast from 'react-hot-toast';
import { useUserStore } from '@/store/userStore';
function ShippingInformation({orderData}: {orderData: any}) {
  const t = useTranslations();
  const { token } = useUserStore();
  const locale = useLocale();
  const cancelOrder = async () => {
    const response = await postRequest(`/order/orders/change-status/${orderData?.data?.id}`, {
        status:'canceled'
    }, {}, token, locale);
    if(response.status){
      toast.success(response.data.message);
    }
  }
  return (
    <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t("Shipping Information")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t("Shipping Address")}</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>{orderData?.data?.address?.name}</p>
                            <p>{orderData?.data?.address?.address}</p>
                            <p>{orderData?.data?.address?.street}</p>
                            <p>{orderData?.data?.address?.contact_phone}</p>



                           
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t("Shipping Method")}</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {/* <p>{orderData?.data?.shipping_method?.name}</p>
                            <p>{orderData?.data?.shipping_method?.description}</p>
                            <p>{orderData?.data?.shipping_method?.tracking_number}</p> */}
                        </div>
                    </div>
                 
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button onClick={
        cancelOrder
    } disabled={!orderData?.data?.can_cancel} className="te-btn bg-red-500 text-white">
        {t('Cancel Order')}
    </button>
    <Link href="/products" className="te-btn te-btn-default">
        {t('Continue Shopping')}
    </Link>
</div>
            </div>
  )
}

export default ShippingInformation
