import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CheckoutState {
  user_address_id: string | number | null
  shipping_slug: string | null
  paymentMethod: string | null
  payment_method_id: string | null
  setUserAddressId: (user_address_id: string | number | null) => void
  setShippingSlug: (shipping_slug: string | null) => void
  setPaymentMethod: (paymentMethod: string | null) => void
  setPaymentMethodId: (payment_method_id: string | null) => void
  clearCheckout: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      user_address_id: null,
      shipping_slug: null,
      paymentMethod: null,
      payment_method_id: null,
      setUserAddressId: (user_address_id) => set({ user_address_id }),
      setShippingSlug: (shipping_slug) => set({ shipping_slug }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      setPaymentMethodId: (payment_method_id) => set({ payment_method_id }),
      clearCheckout: () => set({ 
        user_address_id: null, 
        shipping_slug: null, 
        paymentMethod: null,
        payment_method_id: null
      }),
    }),
    {
      name: 'checkout-storage', // unique name for localStorage key
      partialize: (state) => ({
        user_address_id: state.user_address_id,
        shipping_slug: state.shipping_slug,
        paymentMethod: state.paymentMethod,
        payment_method_id: state.payment_method_id,
      }),
    }
  )
)

