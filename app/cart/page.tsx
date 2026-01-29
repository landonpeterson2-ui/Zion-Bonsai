'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store/cartStore'
import { getProductById } from '@/lib/data/products'
import { getWorkshopById } from '@/lib/data/workshops'
import { format } from 'date-fns'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()

  const cartItemsWithDetails = items.map((item) => {
    if (item.type === 'product') {
      const product = getProductById(item.productId)
      return { ...item, details: product }
    } else {
      const workshop = getWorkshopById(item.productId)
      const workshopDate = workshop?.dates.find((d) => d.id === item.workshopDateId)
      return { ...item, details: workshop, workshopDate }
    }
  })

  const total = cartItemsWithDetails.reduce((sum, item) => {
    const price = item.details?.price || 0
    return sum + price * item.quantity
  }, 0)

  if (items.length === 0) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="btn-primary">
              Shop Plants
            </Link>
            <Link href="/workshops" className="btn-secondary">
              View Workshops
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItemsWithDetails.map((item) => (
            <div key={`${item.productId}-${item.workshopDateId || ''}`} className="card p-6">
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-sage-50 to-cream rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{item.type === 'product' ? '🌿' : '✨'}</span>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.details?.name || item.details?.title}
                  </h3>

                  {item.type === 'workshop' && item.workshopDate && (
                    <p className="text-sm text-gray-600 mb-2">
                      {format(item.workshopDate.date, 'MMMM d, yyyy')} at {item.workshopDate.startTime}
                    </p>
                  )}

                  {item.type === 'product' && (
                    <div className="mb-3">
                      <label className="text-sm text-gray-600 mr-2">Quantity:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-sage">
                      ${(item.details?.price || 0) * item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId, item.workshopDateId)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-sage">Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-coral">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full btn-primary text-center mb-3">
              Proceed to Checkout
            </Link>

            <Link
              href="/shop"
              className="block text-center text-coral hover:text-coral-600 text-sm"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500 text-center">
                🔒 Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
