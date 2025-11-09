import { Suspense } from 'react';
import { getLocale } from 'next-intl/server';
import getRequest from '../../helpers/get';
import dynamic from 'next/dynamic';
import HomePageSkeleton from '@/components/skeleton/HomePageSkeleton';
import { unstable_cache } from 'next/cache';

// Enable caching for this page (revalidate every 60 seconds)
export const revalidate = 60;

// Dynamically import heavy components to reduce initial bundle size
const ProductSlider = dynamic(() => import('@/components/Home/productSlider'), {
  loading: () => <div className="py-16"><div className="container"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded hidden lg:block"></div><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded hidden lg:block"></div></div></div></div></div>,
  ssr: true,
});

const SliderComponent = dynamic(() => import('@/components/Home/sliderComponent').then(mod => ({ default: mod.SliderComponent })), {
  loading: () => <div className="h-[500px] bg-gray-200 dark:bg-gray-800 animate-pulse"></div>,
  ssr: true,
});

// Fetch home data with Next.js caching
async function getHomeData(locale: string) {
  const getCachedHomeData = unstable_cache(
    async (locale: string) => {
      try {
        const home = await getRequest('/home-v2', {}, null, locale);
        return home;
      } catch (error) {
        console.error('Error fetching home data:', error);
        return null;
      }
    },
    ['home-data', locale], // Include locale in cache key
    {
      revalidate: 60, // Cache for 60 seconds
      tags: ['home', `home-${locale}`]
    }
  );
  
  return getCachedHomeData(locale);
}

// Separate component for home content to use Suspense
async function HomeContent() {
  const locale = await getLocale();
  const home = await getHomeData(locale);
  
  if (!home || !home.data) {
    return (
      <div className="flex flex-col min-h-screen">
        <div id="content" className="flex-1 site-content" role="main">
          <div className="primary">
            <div className="main">
              <div className="container py-16 text-center">
                <p className="text-gray-600 dark:text-gray-400">Failed to load content. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add is_favourite property to featured products
  interface Product {
    id: string | number;
    name: string;
    price: number;
    is_favourite?: boolean;
    [key: string]: unknown;
  }
  
  const featuredProducts = home.data.sections?.featured_products?.data?.map((product: Product) => ({
    ...product,
    is_favourite: product.is_favourite || false
  })) || [];

  const slides = home.data.sections?.sliders?.data || [];

  return (
    <div className='flex flex-col min-h-screen'>
      <div id="content" className="flex-1 site-content" role="main">
        <div className='primary'>
          <div className="main">
            {slides.length > 0 && (
              <Suspense fallback={<div className="h-[500px] bg-gray-200 dark:bg-gray-800 animate-pulse"></div>}>
                <SliderComponent slides={slides} />
              </Suspense>
            )}
            {featuredProducts.length > 0 && (
              <Suspense fallback={<div className="py-16"><div className="container"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded hidden lg:block"></div><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded hidden lg:block"></div></div></div></div></div>}>
                <ProductSlider products={featuredProducts} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
