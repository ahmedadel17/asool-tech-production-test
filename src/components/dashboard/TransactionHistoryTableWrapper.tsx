  import { useTranslations } from 'next-intl';
import React from 'react'

function TransactionHistoryTableWrapper({currentPage, totalPages, perPage ,children}: {currentPage: number, totalPages: number, perPage: number, children: React.ReactNode}) {
  const t = useTranslations("Wallet History");
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("Transaction History")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {t("Page")} {currentPage} {t("of")} {totalPages} ({perPage} {t("transactions")})
        </p>
    </div>
    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                     
             
                    {children}
                            </div>
            </div>
  )
}

export default TransactionHistoryTableWrapper
