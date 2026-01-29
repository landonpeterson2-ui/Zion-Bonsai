// Product Types
export type PlantStage = 'seedlings' | 'starters' | 'intermediate' | 'mature'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stage: PlantStage
  images: string[]
  inStock: boolean
  stockQuantity: number
  careLevel: 'Beginner' | 'Intermediate' | 'Advanced'
  size: string
  ageYears?: number
}

// Workshop Types
export type WorkshopType = 'one-time' | 'series' | 'private'

export interface Workshop {
  id: string
  title: string
  type: WorkshopType
  description: string
  price: number
  duration: string
  capacity: number
  dates: WorkshopDate[]
  skills: string[]
  includes: string[]
  image?: string
}

export interface WorkshopDate {
  id: string
  workshopId: string
  date: Date
  startTime: string
  endTime: string
  spotsAvailable: number
  location: string
}

// Cart Types
export interface CartItem {
  productId: string
  quantity: number
  type: 'product' | 'workshop'
  workshopDateId?: string
}

export interface Cart {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, workshopDateId?: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

// Order Types
export interface Order {
  id: string
  customerEmail: string
  customerName: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: Date
  stripePaymentIntentId?: string
}

// Email Types
export interface EmailData {
  to: string
  subject: string
  type: 'order-confirmation' | 'workshop-confirmation' | 'shipping-notification'
  data: Record<string, any>
}
