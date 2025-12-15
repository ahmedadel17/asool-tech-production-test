'use client'
import Link from 'next/link'
import React from 'react'
import AccountGrid from './accountGrid'
import AccountDropDown from './accountDropDown'
import CartDropDown from './cartDropDown'

function CircleWidget({icon, badge,type,link,accountGrid=false,accountGridTitle,accountGridSubtitle, isOpen, onToggle}: {icon: string, badge: number | null | undefined, type: string, link: string | null, accountGrid?:boolean, accountGridTitle?:string, accountGridSubtitle?:string, isOpen?: boolean, onToggle?: () => void}) {
    const icons={
        notification:   <svg className="w-5 h-5 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
    </svg>,
    wishlist:   
    <svg className="w-5 h-5 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
</svg>,
account:
<svg className="w-5 h-5 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="5"></circle>
              <path d="M20 21a8 8 0 0 0-16 0"></path>
          </svg>,
          cart:<svg className="w-5 h-5 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
          <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
      </svg>
    }
    // Use external state if provided, otherwise use local state (for backward compatibility)
    const hasExternalState = isOpen !== undefined && onToggle !== undefined
    const [localIsOpen, setLocalIsOpen] = React.useState({
        account: false,
        cart: false
    })
    
    const currentIsOpen = hasExternalState 
        ? (icon === 'account' ? isOpen : icon === 'cart' ? isOpen : false)
        : (icon === 'account' ? localIsOpen.account : icon === 'cart' ? localIsOpen.cart : false)
    
    const open = (type: string) => {
        if (hasExternalState && onToggle) {
            onToggle()
        } else {
            // Fallback to local state for backward compatibility
            if(type=='account'){
                setLocalIsOpen({
                    account: !localIsOpen.account,
                    cart: false
                })
            }
            if(type=='cart'){
                setLocalIsOpen({
                    account: false,
                    cart: !localIsOpen.cart
                })
            }
        }
    }
   
  return (
   <>
    <div className="te-navbar-dropdown">
        <div className={`${accountGrid ? 'header-cart relative flex items-center gap-3 cursor-pointer' : ''}`}>

    {link && <Link href={`${link}`} className="header-notification relative flex items-center gap-3 cursor-pointer">
    <div className="cart-icon">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
           {icons[icon as keyof typeof icons]}
    
            {/* <!-- Badge --> */}
            {badge !== null && badge !== undefined && badge > 0 && (
                <span className="header-notification-item absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {badge}
                </span>
            )}
        </div>
    </div>
    </Link>}
    {type=='dropdown' && <div onClick={()=>open(icon)} className="header-notification relative flex items-center gap-3 cursor-pointer">
    <div className="cart-icon">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
           {icons[icon as keyof typeof icons]}
    
            {/* <!-- Badge --> */}
            {badge !== null && badge !== undefined && badge > 0 && (
                <span className="header-notification-item absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {badge}
                </span>
            )}
        </div>
    </div>
    </div>}


    {accountGrid && <AccountGrid title={accountGridTitle || ''} subtitle={accountGridSubtitle || ''} onClick={()=>open(icon)} />}
    {type=='dropdown' && icon=='account' && <AccountDropDown isOpen={currentIsOpen}  />}
    {type=='dropdown' && icon=='cart' && <CartDropDown isOpen={currentIsOpen}  />}
    </div>
   
    </div>

   
   </>
  )
}

export default CircleWidget
