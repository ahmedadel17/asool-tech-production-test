'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ProductsNotFoundProps {
  searchQuery?: string;
}

export default function ProductsNotFound({ searchQuery }: ProductsNotFoundProps) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading for a brief moment before showing "not found" message
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms delay to show loading state

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('Loading products')}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="text-gray-500 dark:text-gray-400">
        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {searchQuery ? t('No products found for your search') : t('No products found')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {searchQuery 
            ? `${t('No products found for keyword')} "${searchQuery}". ${t('Try different keywords or browse all products')}.` 
            : t('Try adjusting your search or filter criteria')
          }
        </p>
        {searchQuery && (
          <a 
            href="/products"
            className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            {t('Browse All Products')}
          </a>
        )}
      </div>
    </div>
  );
}

