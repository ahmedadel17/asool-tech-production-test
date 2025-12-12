import ParentCategory from './parentCategory'
import { useTranslations } from 'next-intl'
type Category = {
    id: number
    name: string
    children: Category[]
}
function CategoriesWidget({ categories }: { categories: Category[] }) {
    const t = useTranslations('productsFilter')
  return (
    <div className="category-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Categories')}</h3>
    </div>

    <div className="space-y-1">
        {categories?.map((category: Category, index: number) => (
            <ParentCategory key={index} category={category?.name} subCategories={category?.children} />
        ))}
                  
            </div>
</div>
  )
}

export default CategoriesWidget
