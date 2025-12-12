'use client'
import React from 'react'
import MobileMenuLink from './mobileMenuLink'
import { useUserStore } from '@/store/userStore'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useTranslations } from 'next-intl'
function MobileMenuFooter() {
  const user = useUserStore((state) => state.user)
 const token = useUserStore((state) => state.token)
 const { cartData } = useCartStore()
 const { count: wishlistCount } = useWishlistStore()
 const t = useTranslations('footerNav')
 
 // Get cart count
 const cartCount = cartData?.data?.cart_count || 0
  return (
    <div className="fixed block lg:hidden bottom-0 start-0 z-50 w-full h-16 bg-white/70 backdrop-blur-md border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium" style={{ gridTemplateColumns: `repeat(${user ? 4 : 3}, 1fr)` }}>
        <MobileMenuLink icon={<svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>} label={t('Home')} link="/" />
          { token && <MobileMenuLink 
            icon={
               <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
               <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
           </svg>
            } 
            label={t('Cart')} 
            link={user ? '/cart' : '/auth/login'}
            badge={cartCount}
          />}
           { <MobileMenuLink 
            icon={
                  <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
              </svg>
            } 
            label={t('Wishlist')} 
            link={user ? '/wishlist' : '/auth/login'}
            badge={wishlistCount}
          />}
         
                  <MobileMenuLink icon={
                   <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="12" cy="8" r="5"></circle>
                   <path d="M20 21a8 8 0 0 0-16 0"></path>
               </svg>
            } label={t('Profile')}  link={user ? '/dashboard' : '/auth/login'}/>
    </div>
</div>
  )
}

export default MobileMenuFooter
