import React from 'react'

function CompareButton() {
  return (
    <button className="compare-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-all duration-200 flex items-center justify-center [&amp;.active]:bg-primary-300 [&amp;.active]:text-white" data-product-id="1" title="Add to Compare">
    <svg className="w-4 h-4 lg:w-5 lg:h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"></circle>
        <circle cx="6" cy="6" r="3"></circle>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
        <path d="M11 18H8a2 2 0 0 1-2-2V9"></path>
    </svg>
</button>
  )
}

export default CompareButton
