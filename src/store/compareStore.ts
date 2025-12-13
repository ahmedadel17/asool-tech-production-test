import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Variation {
  attribute_id: string
  attribute_name: string
  attribute_type: string
  type?: string
  values: Array<{ id: string | number; value?: string; color?: string }>
}

export interface CompareProduct {
  id?: string | number
  slug?: string
  name?: string
  min_price?: number
  price_after_discount?: number
  short_description?: string
  thumbnail?: string
  variations?: Variation[]
  default_variation_id?: string | number
  [key: string]: unknown
}

interface CompareState {
  products: CompareProduct[]
  count: number
  addProduct: (product: CompareProduct) => void
  removeProduct: (productId: string | number) => void
  clearCompare: () => void
  isProductInCompare: (productId: string | number) => boolean
  getProductCount: () => number
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      products: [],
      count: 0,

      addProduct: (product) => {
        const currentProducts = get().products
        const exists = currentProducts.some(p => p.id === product.id)
        
        // Limit to 4 products for comparison
        if (currentProducts.length >= 4) {
          return
        }
        
        if (!exists && product.id) {
          const newProducts = [...currentProducts, product]
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

      clearCompare: () => set({ products: [], count: 0 }),

      isProductInCompare: (productId) => {
        return get().products.some(p => p.id === productId)
      },

      getProductCount: () => {
        return get().count
      },
    }),
    {
      name: 'compare-storage',
      partialize: (state) => ({
        products: state.products,
        count: state.count,
      }),
    }
  )
)

