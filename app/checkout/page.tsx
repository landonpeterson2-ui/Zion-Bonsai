'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cartStore'
import { getProductById } from '@/lib/data/products'
import { getWorkshopById } from '@/lib/data/workshops'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  })

  const cartItemsWithDetails = items.map((item) => {
    if (item.type === 'product') {
      const product = getProductById(item.productId)
      return { ...item, details: product }
    } else {
      const workshop = getWorkshopById(item.productId)
      return { ...item, details: workshop }
    }
  })

  const total = cartItemsWithDetails.reduce((sum, item) => {
    const price = item.details?.price || 0
    return sum + price * item.quantity
  }, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Implement Stripe checkout
    // This would create a Stripe checkout session and redirect to Stripe
    alert('Stripe integration coming soon! This would redirect to secure payment.')

    // Example of what this would do:
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ items, customerInfo: formData }),
    // })
    // const { sessionId } = await response.json()
    // // Redirect to Stripe checkout
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <Link href="/shop" className="btn-primary">
            Shop Plants
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary text-lg py-4">
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItemsWithDetails.map((item) => (
                <div
                  key={`${item.productId}-${item.workshopDateId || ''}`}
                  className="flex justify-between text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {item.details?.name || item.details?.title}
                    </p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900">
                    ${(item.details?.price || 0) * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-sage">TBD</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2">
                <span>Total</span>
                <span className="text-coral">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-xs text-gray-500">
                🔒 Payments securely processed by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
