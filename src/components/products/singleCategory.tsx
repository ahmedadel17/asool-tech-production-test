import React from 'react'
//@ts-ignore
function SingleCategory({ category }: { category: any }) {
    type Category = {
        id: number
        name: string
        children: Category[]
    }
  return (
 
    <div className="category-group">
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer " data-toggle="sports">
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">{category?.name}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">22</span>
                                </div>
    </div>

                </div>
  )
}

export default SingleCategory
