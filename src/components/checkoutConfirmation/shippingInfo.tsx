import { useTranslations } from 'next-intl'
function ShippingInfo({address}: {address: {name?: string; street?: string; house?: string; address?: string; country?: string; contact_phone?: string}}) {
  const t = useTranslations('checkoutConfirmation')
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Address')}</h3>
        <div className="text-gray-600 dark:text-gray-400 space-y-2">
            <p className="font-medium text-gray-900 dark:text-white">{address?.name}</p>
            <p>{address?.street}</p>
            <p>{address?.house}</p>

            <p>{address?.address}</p>
            <p>{address?.country}</p>
        </div>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{address?.name}</h3>
        <div className="text-gray-600 dark:text-gray-400 space-y-2">
            <p>{address?.contact_phone}</p>
        </div>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">{t('Shipping Method')}</h4>
        <p className="text-gray-600 dark:text-gray-400">{t('Standard Shipping')}</p>
    </div>
</div>
  )
}

export default ShippingInfo
