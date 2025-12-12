import React from 'react'
import { useTranslations } from 'next-intl'

function CartSummaryTotal({total}: {total: number}) {
  const t = useTranslations('cart')
  return (
    <div className="border-t  border-gray-200 dark:border-gray-600 pt-3">
    <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">{t('Total')}</span>
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
            <span className="icon-riyal-symbol"></span>
            <span>{total}</span>
        </span>
    </div>
</div>
  )
}

export default CartSummaryTotal
