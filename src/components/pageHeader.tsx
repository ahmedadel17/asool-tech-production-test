import React from 'react'

function PageHeader({title, subtitle}: {title: string, subtitle: string}) {
  return (
          <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
    <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
</div>
  )
}

export default PageHeader
