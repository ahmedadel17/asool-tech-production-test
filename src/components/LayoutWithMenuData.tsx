import React, { Suspense } from 'react';
import HeaderTopBar from './header/headerTopBar';
import HeaderStyle1 from './header/styles/headerStyle1';
import FooterStyle1 from './footer/styles/footerStyle1';
import Marquee from './marquee';
import HeaderTopBarSkeleton from './skeleton/HeaderTopBarSkeleton';
import HeaderSkeleton from './skeleton/HeaderSkeleton';
import FooterSkeleton from './skeleton/FooterSkeleton';
import MarqueeSkeleton from './skeleton/MarqueeSkeleton';
import { unstable_cache } from 'next/cache';

// Server component that fetches menu data with caching
async function MenuDataProvider({ children }: { children: React.ReactNode }) {
  const { getLocale } = await import('next-intl/server');
  const getRequest = (await import('../../helpers/get')).default;
  
  const locale = await getLocale();
  
  // Fetch menus server-side with caching
  const getCachedMenus = unstable_cache(
    async (locale: string) => {
      try {
        const menuData = await getRequest('/core/menus', {}, null, locale);
        return menuData;
      } catch (error) {
        console.error('❌ Failed to fetch menus server-side:', error);
        return null;
      }
    },
    ['menus', locale],
    {
      revalidate: 300, // Cache for 5 minutes
      tags: ['menus', `menus-${locale}`]
    }
  );
  
  const menuData = await getCachedMenus(locale);
  
  return (
    <>
      <Marquee />
      <HeaderTopBar menuData={menuData?.data?.top_menu} />
      <HeaderStyle1 menuData={menuData?.data?.main_menu} />
      {children}
      <FooterStyle1 menuData={menuData?.data?.footer_menus} />
    </>
  );
}

// Loading fallback component
function LoadingFallback({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarqueeSkeleton />
      {/* <HeaderTopBarSkeleton /> */}
      <HeaderSkeleton />
      {children}
      <FooterSkeleton />
    </>
  );
}

// Main component with Suspense boundary
export default function LayoutWithMenuData({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingFallback>{children}</LoadingFallback>}>
      <MenuDataProvider>
        {children}
      </MenuDataProvider>
    </Suspense>
  );
}

