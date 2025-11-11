'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MegaMenu from './Megamenu';

function HeaderDesktopMenu({ menuData }: { menuData: any }) {
    const pathname = usePathname();
//   console.log('mega menu data ✅✅',menuData);

  return (
    <div className="te-navbar-nav te-navbar-nav-desktop border-t border-gray-100 dark:border-gray-700 justify-center hidden lg:flex">

  
    {menuData?.items?.map((item: any) => {
        const isActive = item?.url === '/' 
          ? pathname === '/' 
          : pathname.startsWith(item?.url) && (pathname === item?.url || pathname[item?.url.length] === '/');
        
        return item?.is_mega_menu ? <MegaMenu key={item?.id} data={item} /> : 
        <Link key={item?.id} href={item?.url} prefetch={false} className={`te-navbar-link ${isActive ? 'te-navbar-link-active' : ''}`}>{item?.label}</Link>
    })}
  
</div>
  )
}

export default HeaderDesktopMenu
