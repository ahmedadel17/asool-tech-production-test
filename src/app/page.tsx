import { Suspense } from 'react';
import { getLocale } from 'next-intl/server';
import getRequest from '../../helpers/get';
import HomePageSkeleton from '@/components/skeleton/HomePageSkeleton';
import { unstable_cache } from 'next/cache';
import { SliderComponent } from '@/components/Home/sliderComponent';
import ProductSlider from '@/components/Home/productSlider';

// Enable caching for this page (revalidate every 60 seconds)
export const revalidate = 60;

// Type definitions for page data
type Slide = {
  id: string | number;
  image: string;
  title: string;
  description: string;
  button_text?: string;
  hasGap?: boolean;
};

type Product = {
  id: string | number;
  name: string;
  price: number;
  is_favourite?: boolean;
  [key: string]: unknown;
};

// Dynamically import heavy components to reduce initial bundle size


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
  const isRTL = locale === 'ar';
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
                <SliderComponent slides={slides} initialIsRTL={isRTL} />
            )}
            {featuredProducts.length > 0 && (
                <ProductSlider products={featuredProducts} initialIsRTL={isRTL} />
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
