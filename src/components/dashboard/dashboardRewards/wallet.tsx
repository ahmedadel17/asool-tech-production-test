import React from 'react'
import { useTranslations } from 'next-intl'
function Wallet({balance,isLoadingWallet}: {balance: number,isLoadingWallet: boolean}) {
  const t = useTranslations();
  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg shadow-sm border border-purple-200 dark:border-purple-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 flex justify-center items-center bg-purple-100 dark:bg-purple-800 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>
            </div>
            <span className="text-xs font-medium text-purple-600 dark:text-purple-300 bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded-full">
              Available
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t("Wallet Balance")}
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {/* Match dashboard formatting */}
            <span className="text-lg mr-1">$</span>
            {isLoadingWallet ? 'Loading' : `${balance || 0}`}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-300">
            {t("Ready to spend")}
          </p>
        </div>
  )
}

export default Wallet
