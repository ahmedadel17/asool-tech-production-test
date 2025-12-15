
import React from 'react'
import { useTranslations } from 'next-intl'
function AccountGrid({title,subtitle,onClick }: {title: string, subtitle: string, onClick?: () => void}) {
  const t = useTranslations('header')
  return (
       <div className="grid cursor-pointer"  onClick={onClick}>
      <span className="text-gray-600 dark:text-gray-400 text-sm">{(title)}</span>
      <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">{subtitle}</span>
  </div>
  )
}

export default AccountGrid
