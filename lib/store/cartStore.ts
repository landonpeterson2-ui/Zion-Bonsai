import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, workshopDateId?: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) =>
              i.productId === item.productId &&
              i.workshopDateId === item.workshopDateId
          )

          if (existingItemIndex > -1) {
            const newItems = [...state.items]
            newItems[existingItemIndex].quantity += item.quantity
            return { items: newItems }
          }

          return { items: [...state.items, item] }
        }),

      removeItem: (productId, workshopDateId) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.workshopDateId === workshopDateId
              )
          ),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'zion-bonsai-cart',
    }
  )
)
