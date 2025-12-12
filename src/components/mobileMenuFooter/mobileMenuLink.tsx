import React from 'react'
import Link from 'next/link'

function MobileMenuLink({ 
  icon, 
  label, 
  link, 
  badge 
}: { 
  icon: React.ReactNode
  label: string
  link: string
  badge?: number | null | undefined
}) {
  return (
    <Link href={link} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group relative">
      <div className="relative">
        {icon}
        {/* Badge */}
        {badge !== null && badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {badge}
          </span>
        )}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{label}</span>
    </Link>
  )
}

export default MobileMenuLink
