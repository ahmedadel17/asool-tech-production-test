import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Logo() {
  return (
    <div className="te-navbar-brand">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <Image 
          src="https://ecommerce.demo.asol-tec.com/frontend/assets/svg/cotton-logo.svg" 
          alt="logo" 
          width={100} 
          height={100}
          style={{ width: 'auto', height: 'auto' }}
          className="dark:hidden"
        />
        <Image 
          src="https://ecommerce.demo.asol-tec.com/frontend/assets/svg/cotton-logo-light.svg" 
          alt="logo" 
          width={100} 
          height={100}
          style={{ width: 'auto', height: 'auto' }}
          className="hidden dark:block"
        />
      </Link>
    </div>
  )
}

export default Logo
