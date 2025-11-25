import React from 'react'
import { useTranslations } from 'next-intl'
function Points({current_points}: {current_points: number}) {
  const t = useTranslations();
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg shadow-sm border border-green-200 dark:border-green-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 flex justify-center items-center bg-green-100 dark:bg-green-800 rounded-full">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-300 bg-green-200 dark:bg-green-800 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t("Reward Points")}
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {current_points.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 dark:text-green-300">
            Worth <span className="text-xs">﷼</span>
            {(current_points / 10).toFixed(2)}
          </p>
        </div>
  )
}

export default Points
