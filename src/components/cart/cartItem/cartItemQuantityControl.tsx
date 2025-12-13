'use client'

import React, { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import postRequest from '../../../../helpers/post'
import { useLocale } from 'next-intl'

function CartItemQuantityControl({
  quantity: initialQuantity,
  cartItemId
}: {
  quantity?: number  | string | undefined
  cartItemId?: string | number
}) {
  const { setCartData, cartData } = useCartStore()
  const { token } = useUserStore()
  const [quantity, setQuantity] = useState(initialQuantity as number)
  const [isLoading, setIsLoading] = useState(false)
  const locale = useLocale();
  // Update local state when prop changes
  useEffect(() => {
    setQuantity(initialQuantity as number)
  }, [initialQuantity])

  const updateQuantity = async (newQuantity: number) => {
    if (!cartItemId || !token || !cartData?.data?.id) {
      console.error('Missing required data for quantity update')
      return
    }

    if (newQuantity < 1 || newQuantity > 10) {
      return
    }

    setIsLoading(true)
    try {
      const response = await postRequest(
        '/marketplace/cart/update-quantity-cart',
        {
          order_id: cartData.data.id,
          cart_item_id: cartItemId,
          qty: newQuantity,
          type: 'product',
        },
        {},
        token,
        locale
      )
      
      if (response?.data) {
        setCartData(response.data)
        setQuantity(newQuantity)
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
      // Revert to previous quantity on error
      setQuantity(initialQuantity as number)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < 10) {
      updateQuantity(quantity + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    const clampedValue = Math.max(1, Math.min(10, value))
    setQuantity(clampedValue)
  }

  const handleInputBlur = () => {
    if (quantity !== initialQuantity) {
      updateQuantity(quantity)
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 dark:text-gray-400">Qty:</span>
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={isLoading || quantity <= 1}
            className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min="1"
            max="10"
            disabled={isLoading}
            className="w-16 !rounded-none border-0 focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleIncrease}
            disabled={isLoading || quantity >= 10}
            className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItemQuantityControl
