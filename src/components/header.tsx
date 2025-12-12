'use client'
import React from 'react'
import CircleWidget from './headerWidgets/circleWidget'
import DarkModeToggle from './headerWidgets/darkModeToggle'
import MobileMenuToggle from './headerWidgets/mobileMenuToggle'
import DesktopNavigationMenu from './headerWidgets/desktopNavigationMenu/desktopNavigationMenu'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import Marquee from './headerWidgets/desktopNavigationMenu/marquee'
import { useCartStore } from '@/store/cartStore'
import TopBar from './headerWidgets/desktopNavigationMenu/tobar'
import Logo from './headerWidgets/logo'
import LanguageToggleButton from './headerWidgets/languageToggler'
import HeaderSearch from './headerWidgets/headerSearch'
import { useTranslations } from 'next-intl'
import { useWishlistStore } from '@/store/wishlistStore'
function Header({menuData}: {menuData: any}) {
    const user = useUserStore((state) => state.user)
    const pathname = usePathname()
    const { cartData } = useCartStore()
    const t = useTranslations('header')
    const { count } = useWishlistStore()
  return (
    <header id="header" className="te-header flex-shrink-0 sticky top-0 z-50 transition-transform duration-300 sticky-scroll" role="banner" style={{transform: 'translateY(0px)'}}>
  <Marquee />
  {/* <!-- Topbar --> */}
  <TopBar />
  {/* <!-- Header Style (2) --> */}
  <nav className="te-navbar whitespace-nowrap mx-auto shadow-sm w-full relative bg-white dark:bg-gray-800" role="navigation" aria-label="Main Navigation">
  
  <div className="te-navbar-container container">
  
  <div className="te-navbar-content flex justify-between items-center min-h-20 relative">
  
      {/* <!-- Logo/Brand Section --> */}
     <Logo />
  
      {/* <!-- Header Search --> */}
    <HeaderSearch />
      {/* <!-- Header Actions --> */}
      <div className="header-actions flex items-center gap-1 lg:gap-6 w-auto shrink-0">
          <div className="items-center hidden lg:flex gap-2">
              {/* <!-- Notification --> */}
        {user&&  <CircleWidget icon="notification" badge={5} type="notification" link="/dashboard/notifications" />}
         {user && <CircleWidget icon="wishlist" badge={count} type="wishlist" link="/wishlist" />}
         {!user && (pathname !=='/auth/login')&&(pathname !=='/auth/register') && <CircleWidget icon="account" badge={null} type="account" link="/auth/login"  />}

          {user && <CircleWidget icon="account" badge={null} type="dropdown" link={null} accountGrid={true} accountGridTitle={t("My Account")} accountGridSubtitle={`${t('Hi')}, ${user?.first_name}`} />}
         { user && <CircleWidget icon="cart" badge={cartData?.data?.cart_count} type="dropdown" link={null} accountGrid={true} accountGridTitle={t("My Cart")} accountGridSubtitle={ cartData?.data?.amount_to_pay ? `${cartData?.data?.amount_to_pay}` : '0' } />}


            
          
          </div>
  
          {/* <!-- Dark Mode Toggle Button --> */}
          <LanguageToggleButton />
          <DarkModeToggle />
          <MobileMenuToggle menuData={menuData?.data?.main_menu} />
      </div>
      {/* <!-- header-actions --> */}
  
  </div>
  {/* <!-- te-navbar-content --> */}
  
  {/* <!-- Desktop Navigation Menu --> */}
  <DesktopNavigationMenu menuData={menuData} />
  </div>
  </nav>
  </header>
  )
}

export default Header
