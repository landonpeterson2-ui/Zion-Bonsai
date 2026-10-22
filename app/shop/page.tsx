import type { Metadata } from 'next'
import { ShopifyBuyButton } from '@/components/shopify'

export const metadata: Metadata = {
  title: 'Shop Dwarf Jade Bonsai',
  description: 'Shop Portulacaria afra (Dwarf Jade) bonsai from seedlings to mature specimens, hand-cultivated in Central Utah.',
}

const stages = [
  { name: 'Seedlings & Cuttings', slug: 'seedlings', icon: '🌱' },
  { name: 'Pre-Bonsai Starters', slug: 'starters', icon: '🪴' },
  { name: 'Intermediate Trained', slug: 'intermediate', icon: '🌿' },
  { name: 'Mature Specimens', slug: 'mature', icon: '🌳' },
]

// Add your Shopify product handles here
// Find the handle in Shopify Admin > Products > [Product] > URL handle
// Example: If URL is cifsza-29.myshopify.com/products/dwarf-jade, handle is "dwarf-jade"
const productHandles: string[] = [
  // 'dwarf-jade-seedling',
  // 'pre-bonsai-starter',
  // Add more product handles here
]

export default function ShopPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <span className="eyebrow text-coral">Shop</span>
        <h1 className="text-4xl md:text-5xl text-charcoal mt-3 mb-4">
          Shop <span className="text-coral font-semibold">Bonsai</span>
        </h1>
        <p className="text-xl text-charcoal/70 max-w-3xl">
          Every Portulacaria afra (Dwarf Jade) in our collection is carefully cultivated
          and ready to become part of your journey. Choose your starting point.
        </p>
      </div>

      {/* Quick Stage Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stages.map((stage) => (
          <div
            key={stage.slug}
            className="card text-center p-6 group cursor-pointer"
          >
            <div className="text-4xl mb-2">{stage.icon}</div>
            <h3 className="text-base font-sans font-semibold text-charcoal group-hover:text-coral transition-colors">
              {stage.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Products */}
      <div>
        <h2 className="text-3xl text-charcoal mb-8">All Plants</h2>

        {productHandles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productHandles.map((handle) => (
              <div key={handle} className="card p-4">
                <ShopifyBuyButton productHandle={handle} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-cream-dark rounded-lg border border-sage-200">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-charcoal/80 mb-2 font-medium">
              Products coming soon!
            </p>
            <p className="text-sm text-charcoal/60">
              Add product handles to display your Shopify products here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
