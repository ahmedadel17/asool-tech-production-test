import React from 'react'

function OrderStep({label, date,isCurrent,isActive}: {label: string, date: string, isCurrent: boolean, isActive: boolean}) {
  return (
    <>
    <div className="relative">
    <div id="progressLine" className="absolute left-4 top-0 h-0.5 bg-primary-600 transition-all duration-500" style={{height: '96px'}}></div>

    <div id="trackingSteps" className="space-y-8"><div className="relative flex items-start">
   
</div>
<div className="relative flex items-start">
    <div className={`flex-shrink-0 w-8 h-8 ${isActive && isCurrent ? 'bg-primary-600': isActive  ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'} rounded-full flex items-center justify-center`}>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    </div>
    <div className="ms-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
            </div>
        </div>
    </div>
</div>

</div>
</div>
    </>
    )
}

export default OrderStep
