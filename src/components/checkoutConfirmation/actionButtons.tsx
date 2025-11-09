import React from 'react'
import { useTranslations } from 'next-intl';
import Link from 'next/link';
function ActionButtons() {
  const t = useTranslations();
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Link href="/dashboard/orders" className="te-btn te-btn-primary">
        {t('Track Your Order')}
    </Link>
    <Link href="/products" className="te-btn te-btn-default">
        {t('Continue Shopping')}
    </Link>
</div>
  )
}

export default ActionButtons
