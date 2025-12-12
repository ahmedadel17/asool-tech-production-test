import React from 'react'

function QuickViewButton() {
  return (
    <button className="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center" title="Quick View">
            <svg className="w-4 h-4 lg:w-5 lg:h-5" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
        </button>
  )
}

export default QuickViewButton
