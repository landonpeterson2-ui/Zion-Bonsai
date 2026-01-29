'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cartStore'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCartStore()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Clear the cart after successful purchase
    if (sessionId) {
      clearCart()

      // Optional: Fetch session details from Stripe to show customer email
      // This would require an API route that retrieves the session
      // For now, we'll just show a success message
    }
  }, [sessionId, clearCart])

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600">Your order has been confirmed</p>
        </div>

        {/* Order Details Card */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Next?</h2>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Order Confirmation Email</p>
                <p className="text-sm text-gray-600">
                  Check your email for your order details and receipt
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Processing Your Order</p>
                <p className="text-sm text-gray-600">
                  We'll prepare your plants/workshop materials with care
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Shipping & Updates</p>
                <p className="text-sm text-gray-600">
                  You'll receive tracking information once your order ships. Workshop confirmations include date, time, and location details.
                </p>
              </div>
            </div>
          </div>

          {sessionId && (
            <div className="bg-sage-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Order ID:</strong> {sessionId.substring(0, 20)}...
              </p>
            </div>
          )}

          <div className="bg-cream rounded-lg p-6 border border-sage-200">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Questions about your order?</strong>
            </p>
            <p className="text-sm text-gray-600">
              Contact us at{' '}
              <a href="mailto:zionbonsaiplants@gmail.com" className="text-coral hover:text-coral-600">
                zionbonsaiplants@gmail.com
              </a>
              {' '}or call{' '}
              <a href="tel:435-201-0336" className="text-coral hover:text-coral-600">
                435-201-0336
              </a>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary text-center">
            Continue Shopping
          </Link>
          <Link href="/workshops" className="btn-secondary text-center">
            Browse Workshops
          </Link>
        </div>

        {/* Social Sharing */}
        <div className="mt-12 text-center border-t pt-8">
          <p className="text-gray-600 mb-4">Share your bonsai journey with us!</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://instagram.com/zionbonsai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-coral transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/zionbonsai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-coral transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
