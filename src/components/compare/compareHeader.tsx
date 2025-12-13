import { useTranslations } from 'next-intl'
function CompareHeader() {
  const t = useTranslations('compare')
  return (
    <div className="mb-12 text-center">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('Compare Products')}</h1>
<p className="text-gray-600 dark:text-gray-400 mt-2">{t('Compare up to 4 products side by side')}</p>
    </div>
  );
}

export default CompareHeader;
