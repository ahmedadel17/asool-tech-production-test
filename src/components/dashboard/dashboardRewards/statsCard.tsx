import React from 'react'

function StatsCard({number, label}: {number: number | string, label: string}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {number}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {label}
          </div>
        </div>
  )
}

export default StatsCard
