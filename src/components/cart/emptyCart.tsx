'use client'
import React from 'react'
import Link from 'next/link'

function EmptyCart() {
  return (
    <div className="text-center py-12 w-100 ">
    <div className="text-gray-400 dark:text-gray-600 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{("Your cart is empty")}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">{("Add some items to get started")}!</p>
    <Link
      href="/products"
      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      {("Start Shopping")}
    </Link>
  </div>
  )
}

export default EmptyCart



