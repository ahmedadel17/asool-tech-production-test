import { useTranslations } from 'next-intl';
import React from 'react'

function PointsStatsCard({description, amount, created_at,type, cardType}: {description: string, amount: number, created_at: string, type: string, cardType: string}) {
  const t = useTranslations();
  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
            {/* <!-- Transaction Icon --> */}
            <div className="flex-shrink-0">
                                                       {type=="deposit" ? <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                        </svg>
                                                            </div>:
                                                            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
                                                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"></path>
                                                </svg>
                                                            </div>}
            </div>
            
            {/* <!-- Transaction Details --> */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {description}                                            </p>
                                                            </div>
                
                <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                    <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {created_at}                                            </span>
                    
                  
                    
                                                                
                                                            </div>
            </div>
        </div>
        
        {/* <!-- Transaction Amount --> */}
        <div className="flex flex-col items-end text-right" >
            <div className="flex items-center space-x-2">
                <span className={`text-lg font-semibold ${type=="deposit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {cardType!=="wallet" ? amount : amount}
                </span>
            </div>
            
                                                
            
        </div>
    </div>
</div>
  )
}

export default PointsStatsCard
