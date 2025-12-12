import Link from 'next/link'
import React from 'react'
function BreadCrumb({title,link,secondPage}: {title: string,link: string,secondPage: string}) {
  return (
    <nav className="mb-8">
    <div className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
        <Link href={link} className="hover:text-primary-600 dark:hover:text-primary-400">{title}</Link>
        <svg className="w-4 h-4 rtl:scale-x-[-1]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
        </svg>
        <span className="text-gray-900 dark:text-white font-medium">{secondPage}</span>
    </div>
</nav>
  )
}

export default BreadCrumb
