'use client'
import React, { useState } from 'react'
import DropDownSubMenu from '../MobileMenuSubmenu/DropDownSubMenu'
import Link from 'next/link'

function MobileMenuToggle({menuData}: {menuData: any}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }
    const icons={
        menu:
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
, close:<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

    }
  return (
    <>
           <button onClick={toggleMobileMenu} className={`te-navbar-toggle te-navbar-icon-button ${isMobileMenuOpen ? 'te-navbar-icon-button-active' : ''} lg:hidden`} aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-navigation">
  {isMobileMenuOpen ? icons.close : icons.menu}
  </button>
  
  {/* <!-- Mobile Navigation Menu --> */}
  <div className={`te-navbar-nav-mobile ${isMobileMenuOpen ? 'te-navbar-nav-mobile-show' : ''}`} id="mobile-navigation" aria-label="Mobile Navigation">
  <div className="flex flex-col">
  
  
  {
      menuData?.items.map((item: any, index: number) => (
        item?.is_mega_menu ? (
          <DropDownSubMenu key={index} label={item.label} items={item?.mega_menu_children_columns} onNavigate={() => setIsMobileMenuOpen(false)} />
        ) : item?.children?.length > 0 ? (
          <DropDownSubMenu key={index} label={item.label} items={item?.children} onNavigate={() => setIsMobileMenuOpen(false)} />

        ) : (
          <Link key={index} href={item?.url} prefetch={false} className="te-navbar-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>{item?.label}</Link>
        )
      ))
  }

  
 
  </div>
  </div>
    </>
  )
}

export default MobileMenuToggle
