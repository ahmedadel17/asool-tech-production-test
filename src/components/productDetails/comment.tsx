'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

function Comment({ customerNote, onCustomerNoteChange }: { customerNote: string; onCustomerNoteChange: (note: string) => void }) {
  const t = useTranslations('productDetails')
  return (
    <div className="space-y-2">
      <label htmlFor="comment" className="block text-sm font-medium text-gray-900 dark:text-white">{t('Do you have another comment')}</label>
      <textarea 
        id="comment" 
        name="comment" 
        rows={3}
        value={customerNote}
        onChange={(e) => onCustomerNoteChange(e.target.value)}
        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500" 
        placeholder={t('Enter your comment here')}
      />
    </div>
  )
}

export default Comment
