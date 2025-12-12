'use client'
import Link from 'next/link'
import React, { useState } from 'react'

function MegaMenu({menu}: {menu: any}) {
    const [isOpen, setIsOpen] = useState(false)
    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }
  return (
    <div className="te-navbar-mega-dropdown">
        <a onMouseEnter={open} onMouseLeave={close} className="te-navbar-link te-navbar-link-has-mega-menu">{menu?.label}</a>
    <div onMouseEnter={open} onMouseLeave={close} className={`te-navbar-mega-menu te-navbar-mega-menu-${menu?.mega_menu_columns}-col${isOpen ? ' te-mega-menu-show' : ''}`}>   
        <div className="te-navbar-mega-menu-grid">
            {menu?.mega_menu_children_columns?.map((item: any, index: number) => (
                <div key={index} className="te-navbar-mega-menu-column">
                    <h6 className="te-navbar-mega-menu-title">{item?.label}</h6>
                {item?.items?.map((item: any)=>{
                    return (
                        <Link key={item?.id} href={item?.url} className="te-navbar-mega-menu-link">{item?.label}</Link>
                    )
                })}
            </div>
            ))}
           
            
        </div>
    </div>
    </div>
  )
}

export default MegaMenu
