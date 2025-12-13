import { useTranslations } from 'next-intl';
import ShippingInformation from './shippingInformation';
import OrderSteps from './orderSteps';
import ProductItems from './productItems';
import OrderTrackingHeader from './orderTrackingHeader';
function OrderStatus({orderData}: {orderData: any}) {
  const t = useTranslations('order');
  return (
    <>
    <div id="trackingResults" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <OrderTrackingHeader orderData={orderData} />
            <ProductItems orderData={orderData} />

            <OrderSteps orderData={orderData} />

            <ShippingInformation orderData={orderData} />
        </div>
    </>
  )
}

export default OrderStatus
