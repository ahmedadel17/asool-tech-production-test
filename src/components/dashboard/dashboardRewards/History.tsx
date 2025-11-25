import { useTranslations } from 'next-intl';
import React from 'react'
type Transaction = {
  type: string;
  description: string;
  amount: number;
  date?: string;
  created_at?: string;
  balance_after?: number;
  points?: number;
}
function History({recent_transactions, walletLoading}: {recent_transactions: Transaction[], walletLoading: boolean}) {
  const t = useTranslations();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {t("Recent Activity")}
      </h2>
      <a href="#" className="text-sm text-primary-600 hover:underline">
        {t("View All")}
      </a>
    </div>
    <div className="p-6 space-y-4">
      {walletLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">{t("Loading transactions")}...</p>
        </div>
      ) : recent_transactions.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t("No transactions yet")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t("Your recent transactions will appear here")}
          </p>
        </div>
      ) : (
        recent_transactions.map((transaction, i) => (
          <div
            key={i}
            className="flex justify-between p-4 border rounded-lg dark:border-gray-700"
          >
            <div>
           
              <p className="font-medium text-gray-900 dark:text-white">
                {transaction.description}
              </p>
              <p className="text-sm text-gray-500">{transaction.created_at || transaction.date}</p>
            </div>
            <div className="text-right">
              <div
                className={`font-semibold ${
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "earned" ? "+" : ""}
                {transaction.points} {t("points")}
              </div>
              <div className="text-xs text-gray-500">
                {t("Balance")}: {transaction.amount}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  )
}

export default History
