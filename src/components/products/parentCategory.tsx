'use client'
import React, { useState } from 'react'
import SubCategoriesItem from './subCategoriesItem'
import { useTranslations } from 'next-intl'
type Category = {
    id: number
    name: string
    children: Category[]
}
function ParentCategory({ category, subCategories }: { category: string, subCategories: Category[] }) {
    const t = useTranslations('productsFilter')
    const [open, setOpen] = useState(false)
    const handleToggle = () => {
        setOpen(!open)
    }
  return (
    <div className="category-group">
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer " data-toggle="men" onClick={handleToggle}>
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">{category}</span>
        </div>
        <div className="flex items-center gap-2">
         { subCategories?.length > 0 && <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{subCategories?.length}</span>}
                                        <svg style={{transform: open ? 'rotate(90deg)' : 'rotate(0deg)'}} className="w-4 h-4 text-gray-400 transition-transform duration-200 transform rtl:scale-x-[-1] expand-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                                </div>
    </div>

                            <div className={`subcategories pl-6 space-y-1 overflow-hidden transition-all duration-300 ${open ? 'max-h-[128px]' : 'max-h-0'}`} id="sub-men" >
                         {subCategories?.map((subCategory: Category, index: number) => (
                            <SubCategoriesItem key={index} name={subCategory?.name} id={subCategory?.id} count={''} />
                         ))}
                                </div>
                </div>
  )
}

export default ParentCategory
