'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

function LinkButton({href, text, type='link', disabled=false, onClick}: {href?: string, text: string, type: 'link' | 'button', disabled?: boolean, onClick?: () => void}) {
  const router = useRouter()
  
  const handleButtonClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      router.push(href)
    }
  }
  
  return (
   <>
   
   {type === 'link' && (
    <a href={href} className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block">
    {text}
</a>
   )}
   {type === 'button' && (
    <button onClick={handleButtonClick} disabled={disabled} className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block disabled:opacity-50 disabled:cursor-not-allowed">
    {text}
</button>
   )}   
   </>
   )
}

export default LinkButton
