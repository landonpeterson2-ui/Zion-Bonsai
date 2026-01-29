'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cartStore'
import { getProductById } from '@/lib/data/products'
import { getWorkshopById } from '@/lib/data/workshops'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
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
        {/* Checkout Info */}
        <div className="space-y-6">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Secure Checkout</h2>
            <p className="text-gray-600 mb-6">
              Click below to proceed to our secure Stripe checkout. You'll be able to enter your shipping and payment information safely.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-sage mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">PCI-compliant encryption by Stripe</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-sage mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">All Major Cards Accepted</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard, Amex, and more</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-sage mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Email Confirmation</p>
                  <p className="text-sm text-gray-600">Instant order confirmation sent to your inbox</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Proceed to Secure Checkout'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              You will be redirected to Stripe's secure checkout page
            </p>
          </div>

          <Link href="/cart" className="block text-center text-coral hover:text-coral-600">
            ← Back to Cart
          </Link>
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
