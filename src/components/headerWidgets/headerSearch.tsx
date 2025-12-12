'use client'

import React, { useState, FormEvent, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
function HeaderSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const t = useTranslations('header')
  // Update search input when keyword changes in URL (e.g., when on products page)
  useEffect(() => {
    const keyword = searchParams.get('keyword')
    if (keyword) {
      setSearchQuery(keyword)
    } else if (pathname !== '/products') {
      // Clear search if not on products page and no keyword
      setSearchQuery('')
    }
  }, [searchParams, pathname])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (searchQuery.trim()) {
      // Navigate to products page with keyword parameter
      router.push(`/products?keyword=${encodeURIComponent(searchQuery.trim())}&page=1`)
    } else {
      // If empty, just go to products page without keyword
      router.push('/products?page=1')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="hidden lg:block w-96">
      <form onSubmit={handleSearch} className="relative">
        {/* <svg className="absolute start-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21 21-4.34-4.34"></path>
          <circle cx="11" cy="11" r="8"></circle>
        </svg> */}
        
        <input 
          type="text" 
          id="navbar-search-ecommerce" 
          name="product_search" 
          className="ps-10 pe-12 text-sm rounded-lg w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
          placeholder={t('Search products')} 
          autoComplete="off" 
          aria-label="Search products"
          value={searchQuery}
          onChange={handleInputChange}
        />
        
        <button 
          type="submit"
          className="hs-btn absolute end-1 top-1/2 transform -translate-y-1/2 p-2 bg-primary-200 hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300 text-white rounded-lg transition-colors duration-200" 
          aria-label="Search"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default HeaderSearch
