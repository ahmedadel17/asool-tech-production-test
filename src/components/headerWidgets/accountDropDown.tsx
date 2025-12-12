'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { useCartStore } from '@/store/cartStore'
import { useCheckoutStore } from '@/store/checkoutStore'
import Link from 'next/link'
import { useTranslations } from 'next-intl' 

function AccountDropDown({isOpen}: {isOpen: boolean}) {
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const clearCart = useCartStore((state) => state.clearCart)
  const clearCheckout = useCheckoutStore((state) => state.clearCheckout)
  const router = useRouter()
  const t = useTranslations('header')
  const handleLogout = () => {
    // Clear cart data from localStorage
    clearCart()
    // Clear checkout data from localStorage
    clearCheckout()
    // Logout user
    logout()
    // Redirect to login page
    router.push('/auth/login')
  }

  const icons={
    dashboard:                   
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>                        </svg>,
    rewards:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"></path>
    <circle cx="12" cy="12" r="10"></circle>
</svg>                        </svg>,
orders:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>                        </svg>,
                    wishlist: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>                        </svg>,

    addresses:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>    
                        </svg>,
    settings:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>    
                        </svg>,
    logout:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
</svg>

  }
  return (
    <div className={`account-drop-down te-navbar-dropdown-content ${isOpen ? 'te-dropdown-show' : ''}`}>
  
    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-2 bg-white dark:bg-gray-800">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.first_name} {user?.last_name}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</div>
    </div>

    
    <div className="grid gap-1">
    <Link href="/dashboard" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">

       
                {icons.dashboard}     {t('Dashboard')}               </Link>
                            <Link href="/dashboard/myRewards" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                {icons.rewards}    
                {t('My Rewards')}                    </Link>
                            <Link href="/dashboard/myOrders" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
               {icons.orders}    
                {t('My Orders')}                    </Link>
                     
                            
                            <Link href="/dashboard/myWishlist" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
               {icons.wishlist}    
                {t('Wishlist')}                    </Link>
                            <Link href="/dashboard/myAddresses" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
               {icons.addresses}    
                {t('Addresses')}                    </Link>
                            <Link href="/dashboard/settings" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
               {icons.settings}    
                {t('Account Settings')}                    </Link>
                             <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
               {icons.logout}    
                {t('Logout')}                    </a>
        
    </div>
</div>
  )
}

export default AccountDropDown
