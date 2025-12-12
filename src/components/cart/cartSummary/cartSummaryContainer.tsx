import React from 'react'

function CartSummaryContainer({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
        {children}
    </div>
  )
}

export default CartSummaryContainer
