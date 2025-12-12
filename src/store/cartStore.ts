import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartData {
 status?: boolean
 message?: string
 data?: {
  id: string | number,
  cart_count: number,
  products: CartProduct[],
  amount_to_pay: number | string
  order_attributes: CartOrderAttribute[]
  shipping_address_id: string | number
  payment_method_id?: string
  use_wallet?: boolean
  user_balance?: number | string
  voucher?: {
    code: string
    message: string
  }
 }
}

interface CartProduct {
  id?: string | number
  lineId?: string | number
  cart_item_id?: string | number
  name?: string
  image?: string
  variation?: unknown
  qty?: number
  price?: number | string
  [key: string]: unknown
}

 export interface CartOrderAttribute {
  id?: string | number
  label?: string
  value?: string
  show_currency?: boolean
}

interface CartState {
  cartData: CartData | null
  setCartData: (cartData: CartData | null) => void
  clearCart: () => void
}

// Helper function to check if cart is empty
const isCartEmpty = (cartData: CartData | null): boolean => {
  if (!cartData) return true
  if (cartData.status === false) return true
  if (cartData.message === "Cart Is Empty") return true
  if (!cartData.data) return true
  if (!cartData.data.products) return true
  if (cartData.data.products.length === 0) return true
  return false
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartData: null,
      setCartData: (cartData) => {
        set({ cartData })
        
        // Clear checkout data if cart is empty
        if (isCartEmpty(cartData)) {
          // Dynamically import to avoid circular dependency
          import('./checkoutStore').then(({ useCheckoutStore }) => {
            useCheckoutStore.getState().clearCheckout()
          }).catch((error) => {
            console.error('Error clearing checkout:', error)
          })
        }
      },
      clearCart: () => {
        set({ cartData: null })
        // Clear checkout data when cart is cleared
        import('./checkoutStore').then(({ useCheckoutStore }) => {
          useCheckoutStore.getState().clearCheckout()
        }).catch((error) => {
          console.error('Error clearing checkout:', error)
        })
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      partialize: (state) => ({
        cartData: state.cartData,
      }),
    }
  )
)

