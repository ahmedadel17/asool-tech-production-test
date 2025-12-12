import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import getRequest from '../../helpers/get'
import postRequest from '../../helpers/post'

interface Variation {
  attribute_id: string
  attribute_name: string
  attribute_type: string
  type?: string
  values: Array<{ id: string | number; value?: string; color?: string }>
}

export interface WishlistProduct {
  id?: string | number
  slug?: string
  name?: string
  min_price?: number
  price_after_discount?: number
  short_description?: string
  thumbnail?: string
  variations?: Variation[]
  default_variation_id?: string | number
  is_favourite?: boolean
  [key: string]: unknown
}

interface WishlistState {
  products: WishlistProduct[]
  count: number
  isLoading: boolean
  error: string | null
  lastFetched: number | null
  setProducts: (products: WishlistProduct[]) => void
  addProduct: (product: WishlistProduct) => void
  removeProduct: (productId: string | number) => void
  clearWishlist: () => void
  fetchWishlist: (token: string | null, locale: string) => Promise<void>
  toggleProduct: (productId: string | number, token: string | null, locale: string) => Promise<boolean>
  isProductInWishlist: (productId: string | number) => boolean
  getProductCount: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      products: [],
      count: 0,
      isLoading: false,
      error: null,
      lastFetched: null,

      setProducts: (products) => set({ 
        products, 
        count: products.length,
        lastFetched: Date.now() 
      }),

      addProduct: (product) => {
        const currentProducts = get().products
        const exists = currentProducts.some(p => p.id === product.id)
        if (!exists) {
          const newProducts = [...currentProducts, { ...product, is_favourite: true }]
          set({ 
            products: newProducts,
            count: newProducts.length
          })
        }
      },

      removeProduct: (productId) => {
        set((state) => {
          const newProducts = state.products.filter(p => p.id !== productId)
          return {
            products: newProducts,
            count: newProducts.length
          }
        })
      },

      clearWishlist: () => set({ products: [], count: 0, lastFetched: null }),

      fetchWishlist: async (token, locale) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await getRequest(
            '/catalog/favorites/products',
            { 'Content-Type': 'application/json' },
            token,
            locale
          )
          
          if (response?.data?.items) {
            const items = response.data.items
            set({ 
              products: items,
              count: items.length,
              lastFetched: Date.now(),
              isLoading: false 
            })
          } else if (response?.data) {
            // Handle case where data is directly an array
            const items = Array.isArray(response.data) ? response.data : []
            set({ 
              products: items,
              count: items.length,
              lastFetched: Date.now(),
              isLoading: false 
            })
          } else {
            set({ products: [], count: 0, lastFetched: Date.now(), isLoading: false })
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error)
          set({ 
            error: 'Failed to load wishlist',
            isLoading: false 
          })
        }
      },

      toggleProduct: async (productId, token, locale) => {
        if (!token) {
          return false
        }

        try {
          const response = await postRequest(
            `/catalog/favorites/products/${productId}/toggle`,
            {},
            {},
            token,
            locale
          )
          
          if (response?.data?.status) {
            const isInWishlist = get().isProductInWishlist(productId)
            
            // Remove from store if it was in wishlist, otherwise it will be added via addProduct
            if (isInWishlist) {
              get().removeProduct(productId)
            }
            
            return true
          }
          return false
        } catch (error) {
          console.error('Error toggling favorite:', error)
          return false
        }
      },

      isProductInWishlist: (productId) => {
        return get().products.some(p => p.id === productId)
      },

      getProductCount: () => {
        return get().count
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({
        products: state.products,
        count: state.count,
        lastFetched: state.lastFetched,
      }),
    }
  )
)

