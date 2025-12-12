import { create } from 'zustand'

interface ProductVariation {
  variation_id?: string | number
  name?: string
  price?: number
  min_price?: number
  after_discount_price?: number
  price_before_discount?: number
  [key: string]: unknown
}

interface ProductState {
  variations: Record<string | number, ProductVariation | null>
  setVariation: (productId: string | number, variation: ProductVariation | null) => void
  getVariation: (productId: string | number) => ProductVariation | null
  clearVariation: (productId: string | number) => void
  clearAllVariations: () => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  variations: {},
  setVariation: (productId, variation) => set((state) => ({
    variations: {
      ...state.variations,
      [productId]: variation
    }
  })),
  getVariation: (productId) => get().variations[productId] || null,
  clearVariation: (productId) => set((state) => {
    const newVariations = { ...state.variations }
    delete newVariations[productId]
    return { variations: newVariations }
  }),
  clearAllVariations: () => set({ variations: {} }),
}))

