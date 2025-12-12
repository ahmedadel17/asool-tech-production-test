'use client'
import Link from 'next/link'
import React, { useState } from 'react'

function SingleMenu({menu}: {menu: any}) {
    const [isOpen, setIsOpen] = useState(false)
    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }
  return (
    <div className="te-navbar-dropdown">
    <a href="#" onMouseEnter={open} onMouseLeave={close} className="te-navbar-link te-navbar-link-has-submenu">{menu?.label}</a>
    <div onMouseEnter={open} onMouseLeave={close} className={`te-navbar-submenu-content te-navbar-submenu-content ${isOpen ? 'te-submenu-show' : ''}`}>
        {menu?.children?.map((item: any)=>{
            return (
                <Link key={item?.id} href={item?.url} className="te-navbar-submenu-link">{item?.label}</Link>
            )
        })}
    </div>
    </div>
  )
}

export default SingleMenu
