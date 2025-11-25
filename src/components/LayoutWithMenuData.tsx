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

// Helper function to fetch menu data with caching
async function getCachedMenus(locale: string) {
  const getRequest = (await import('../../helpers/get')).default;
  
  return unstable_cache(
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
      revalidate: 10800, // Cache for 3 hours (3 * 60 * 60 seconds)
      tags: ['menus', `menus-${locale}`]
    }
  )(locale);
}

// Separate async components for each section to enable Suspense
async function HeaderTopBarWithData() {
  const { getLocale } = await import('next-intl/server');
  const locale = await getLocale();
  const menuData = await getCachedMenus(locale);
  return <HeaderTopBar menuData={menuData?.data?.top_menu} />;
}

async function HeaderWithData() {
  const { getLocale } = await import('next-intl/server');
  const locale = await getLocale();
  const menuData = await getCachedMenus(locale);
  return <HeaderStyle1 menuData={menuData?.data?.main_menu} />;
}

async function FooterWithData() {
  const { getLocale } = await import('next-intl/server');
  const locale = await getLocale();
  const menuData = await getCachedMenus(locale);
  return <FooterStyle1 menuData={menuData?.data} />;
}

// Server component that provides menu data
async function MenuDataProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<MarqueeSkeleton />}>
        <Marquee />
      </Suspense>
      <Suspense fallback={<HeaderTopBarSkeleton />}>
        <HeaderTopBarWithData />
      </Suspense>
      <Suspense fallback={<HeaderSkeleton />}>
        <HeaderWithData />
      </Suspense>
      {children}
      <Suspense fallback={<FooterSkeleton />}>
        <FooterWithData />
      </Suspense>
    </>
  );
}



// Main component with Suspense boundary
export default function LayoutWithMenuData({ children }: { children: React.ReactNode }) {
  return (
      <MenuDataProvider>
        {children}
      </MenuDataProvider>
  );
}

