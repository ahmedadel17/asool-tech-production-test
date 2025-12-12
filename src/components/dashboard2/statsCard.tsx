import React from 'react'

function StatsCard({title, value, children, money}: {title: string, value: string, children: React.ReactNode, money: boolean}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                    {children}
                    <div className="ms-4">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white"><span>
                       {money&& <span className="icon-riyal-symbol"></span>}</span><span>{value}</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
                    </div>
                </div>
            </div>
  )
}

export default StatsCard
