'use client'

import { useCartStore } from '@/store/cartStore'
import React, { useState } from 'react'
import postRequest from '../../../../helpers/post'
import { useUserStore } from '@/store/userStore'
import { toast } from 'react-hot-toast'
import { useLocale } from 'next-intl'

function CartItemRemoveButton({id}: {id?: string | number}) {
    const { setCartData, cartData } = useCartStore()
    const { token } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    const locale = useLocale()
    const removeItem = async () => {
   
        setIsLoading(true)
        try {
            const response = await postRequest('/marketplace/cart/delete-item-from-cart', {
                order_id: cartData?.data?.id,
                cart_item_id: id,
                type: 'product',
              }, {}, token, locale)
            if (response) {
                setCartData(response.data)
                toast.success(response.data.message)
            }
        } catch (error: unknown) {
            toast.error((error as { message?: string })?.message || 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }
    
  return (
    <button 
        onClick={removeItem}
        disabled={isLoading || !id}
        className={`text-gray-400 hover:text-red-500 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Remove item from cart"
    >
        {isLoading ? (
            <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
        )}
    </button>
  )
}

export default CartItemRemoveButton
