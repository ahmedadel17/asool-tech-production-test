import { create } from 'zustand'

interface Variation {
  attribute_id: string
  attribute_name: string
  attribute_type: string
  type?: string
  values: Array<{ id: string | number; value?: string; color?: string }>
}

export interface QuickViewProduct {
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

interface QuickViewState {
  isOpen: boolean
  product: QuickViewProduct | null
  openQuickView: (product: QuickViewProduct) => void
  closeQuickView: () => void
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  isOpen: false,
  product: null,
  openQuickView: (product) => set({ isOpen: true, product }),
  closeQuickView: () => set({ isOpen: false, product: null }),
}))

