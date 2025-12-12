import React from 'react'

function DashboardHeader({title, description}: {title: string, description: string}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{description}</p>
                </div>
                {/* <div className="mt-4 md:mt-0">
                    <button className="te-btn te-btn-outline flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Export History
                    </button>
                </div> */}
            </div>
        </div>
  )
}

export default DashboardHeader
