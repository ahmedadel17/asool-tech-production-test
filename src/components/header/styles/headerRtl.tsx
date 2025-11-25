'use client'
import React, { useState, useEffect } from 'react'
import Logo from '../logo'
import HeaderSearch from '../headerSearch'
import HeaderWishList from '../headerWishlist'
import HeaderAccount from '../headerAccount'
import HeaderCart from '../headerCart'
import HeaderDarkMode from '../headerDarkMode'
import HeaderMobileMenu from '../headerMobileMenu'
import HeaderDesktopMenu from '../headerDesktopMenu'
import { useAuth } from '@/app/hooks/useAuth'
import LanguageToggleButton from '../LanguageToggleButton'
import HeaderNotification from '../headerNotification'
import {usePathname} from 'next/navigation'

interface MenuData {
  items?: Array<{
    label: string;
    url: string;
    is_mega_menu?: boolean;
    mega_menu_children_columns?: unknown;
  }>;
}

function HeaderRtl( { menuData }: { menuData: MenuData | null } ) {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <nav className="te-navbar flex whitespace-nowrap mx-auto shadow-sm w-full relative bg-white dark:bg-gray-800" role="navigation" aria-label="Main Navigation">
        <div className="te-navbar-container container">
          <div className="te-navbar-content grid grid-cols-[auto,1fr,auto] items-center min-h-20 relative gap-4">
            {/* <!-- Logo/Brand Section --> */}
            <div className="flex justify-start">
              <Logo />
            </div>

            {/* <!-- Header Search - Centered --> */}
            <div className="flex justify-center">
              <HeaderSearch />
            </div>

            {/* <!-- Header Actions --> */}
            <div className="header-actions flex items-center gap-1 lg:gap-6 w-auto shrink-0 justify-end">
              {/* <!-- Dark Mode Toggle Button --> */}
              <HeaderDarkMode />

              {/* <!-- Mobile Menu Toggle Button --> */}
              <HeaderMobileMenu menuData={menuData} />

              {/* <!-- Language Toggle Button --> */}
              <LanguageToggleButton />

              {/* <!-- Authenticated User Actions (Desktop only) --> */}
              {mounted && isAuthenticated && (
                <div className="items-center hidden lg:flex gap-2">
                  <HeaderNotification />
                  <HeaderWishList />
                  <HeaderAccount />
                  <HeaderCart />
                </div>
              )}

              {/* <!-- Login Icon (when not authenticated, Desktop only) --> */}
              {mounted && !isAuthenticated && pathname !== '/auth/login' && (
                <a 
                  href="/auth/login" 
                  className="te-navbar-icon-button hidden lg:flex"
                  aria-label="Login"
                  title="Login"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                    />
                  </svg>
                </a>
              )}
            </div>
            {/* <!-- header-actions --> */}
          </div>
          {/* <!-- te-navbar-content --> */}

          {/* <!-- Desktop Navigation Menu --> */}
          <HeaderDesktopMenu menuData={menuData} />
        </div>
      </nav>
    </div>
  )
}

export default HeaderRtl
