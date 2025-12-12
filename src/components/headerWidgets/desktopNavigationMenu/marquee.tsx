'use client'

import React from 'react'

const marqueeItems = [
  'Free Shipping on Orders Over $50',
  '30-Day Return Policy',
  '24/7 Customer Support',
  'New Collection Available Now',
  'Subscribe for 10% Off',
  'Limited Time Offer'
]

function Marquee() {
  return (
    <div className="marquee-container overflow-hidden bg-primary-500 py-2 relative">
      <div className="marquee-track flex">
        {/* First set of items */}
        <div className="marquee-content flex whitespace-nowrap">
          {marqueeItems.map((item, index) => (
            <a 
              key={`first-${index}`}
              href="#" 
              className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out"
            >
              {item}
            </a>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="marquee-content flex whitespace-nowrap" aria-hidden="true">
          {marqueeItems.map((item, index) => (
            <a 
              key={`second-${index}`}
              href="#" 
              className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Marquee
