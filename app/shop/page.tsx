'use client'

import { ShopifyBuyButton } from '@/components/shopify'

const stages = [
  { name: 'Seedlings & Cuttings', slug: 'seedlings', icon: '🌱' },
  { name: 'Pre-Bonsai Starters', slug: 'starters', icon: '🪴' },
  { name: 'Intermediate Trained', slug: 'intermediate', icon: '🌿' },
  { name: 'Mature Specimens', slug: 'mature', icon: '🌳' },
]

// Add your Shopify product handles here
// Find the handle in Shopify Admin > Products > [Product] > URL handle
// Example: If URL is cifsza-29.myshopify.com/products/dwarf-jade, handle is "dwarf-jade"
const productHandles = [
  // 'dwarf-jade-seedling',
  // 'pre-bonsai-starter',
  // Add more product handles here
]

export default function ShopPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Shop <span className="text-coral">Bonsai</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Every Portulacaria afra (Dwarf Jade) in our collection is carefully cultivated
          and ready to become part of your journey. Choose your starting point.
        </p>
      </div>

      {/* Quick Stage Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stages.map((stage) => (
          <div
            key={stage.slug}
            className="card text-center p-6 group cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-2">{stage.icon}</div>
            <h3 className="font-semibold text-gray-900 group-hover:text-coral transition-colors">
              {stage.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Products */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Plants</h2>

        {productHandles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productHandles.map((handle) => (
              <div key={handle} className="card p-4">
                <ShopifyBuyButton productHandle={handle} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-cream rounded-lg border border-sage-200">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-gray-700 mb-2 font-medium">
              Products coming soon!
            </p>
            <p className="text-sm text-gray-500">
              Add product handles to display your Shopify products here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
