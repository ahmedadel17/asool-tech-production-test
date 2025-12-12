
import React from 'react'
import MegaMenu from './megaMenu'
import SingleMenu from './singleMenu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function DesktopNavigationMenu({menuData}: {menuData: any}) {
  const pathname = usePathname()
  return (
    <div className="te-navbar-nav te-navbar-nav-desktop border-t border-gray-100 dark:border-gray-700 justify-center hidden lg:flex">
  
    {menuData?.data?.main_menu.items?.map((item: any, index: number) => (
      item?.is_mega_menu ? <MegaMenu key={index} menu={item} /> : item?.children?.length > 0 && !item?.is_mega_menu ? <SingleMenu key={index} menu={item} />:
      <Link key={index} href={item.url} className={`te-navbar-link ${pathname === item.url ? 'te-navbar-link-active' : ''}`}>{item.label}</Link>
    ))}
   {/* <MegaMenu  /> */}
    
    
  {/* <SingleMenu /> */}
    
    {/* <Link href="/products" className="te-navbar-link">Products</Link>
    <a href="cotton.php" className="te-navbar-link">Cotton</a>
    <a href="blog.php" className="te-navbar-link">Blog</a>
    <a href="contact.php" className="te-navbar-link">Contact Us</a> */}
    
    </div>
  )
}

export default DesktopNavigationMenu
