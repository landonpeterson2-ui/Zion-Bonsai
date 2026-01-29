'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getProductById } from '@/lib/data/products'
import { useCartStore } from '@/lib/store/cartStore'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="container-custom py-12">
        <p>Product not found</p>
        <Link href="/shop" className="text-coral hover:text-coral-600">
          ← Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      type: 'product',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container-custom py-12">
      <Link href="/shop" className="text-coral hover:text-coral-600 mb-6 inline-block">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square bg-gradient-to-br from-sage-50 to-cream rounded-lg flex items-center justify-center">
          <div className="text-9xl">🌿</div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-sage mb-6">${product.price}</p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Details Grid */}
          <div className="bg-sage-50 rounded-lg p-6 mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Care Level:</span>
              <span className="text-gray-900">{product.careLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Size:</span>
              <span className="text-gray-900">{product.size}</span>
            </div>
            {product.ageYears && (
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Age:</span>
                <span className="text-gray-900">
                  {product.ageYears} {product.ageYears === 1 ? 'year' : 'years'}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Stage:</span>
              <span className="text-gray-900 capitalize">{product.stage}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Stock:</span>
              <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                {product.inStock ? `${product.stockQuantity} available` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-700">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border-2 border-gray-300 rounded-lg px-4 py-2"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary"
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          )}

          {/* Care Info */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Care Guide</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong className="text-coral">☀️ Sunlight:</strong> Bright to medium light, 6+ hours/day</p>
              <p><strong className="text-coral">💧 Water:</strong> Once weekly in winter, 2-3x weekly in summer</p>
              <p><strong className="text-coral">🌡️ Temperature:</strong> 55°F - 95°F ideal range</p>
              <p><strong className="text-coral">🌱 Fertilizer:</strong> Every other month during growing season</p>
            </div>
            <Link href="/care-guide" className="text-coral hover:text-coral-600 mt-4 inline-block">
              View Full Care Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
