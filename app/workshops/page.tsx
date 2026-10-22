import type { Metadata } from 'next'
import { ShopifyBuyButton } from '@/components/shopify'

export const metadata: Metadata = {
  title: 'Bonsai Workshops',
  description: 'Hands-on bonsai workshops in Central Utah. One-time classes, multi-week series, and private sessions — no experience needed.',
}

const workshopTypes = [
  { title: 'One-Time Workshops', slug: 'one-time', icon: '✨', description: 'Perfect introduction to bonsai' },
  { title: 'Workshop Series', slug: 'series', icon: '📚', description: 'Multi-week learning journey' },
  { title: 'Private Sessions', slug: 'private', icon: '👤', description: 'Personalized instruction' },
]

// Add your Shopify workshop product handles here
// Find the handle in Shopify Admin > Products > [Product] > URL handle
const workshopHandles = [
  'beginner-bonsai-workshop',
  // Add more workshop handles here
]

export default function WorkshopsPage() {
  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="eyebrow text-coral">Workshops</span>
        <h1 className="text-5xl md:text-6xl text-charcoal mt-3 mb-4">
          Bonsai <span className="text-coral font-semibold">Workshops</span>
        </h1>
        <p className="text-xl text-charcoal/70 max-w-3xl mx-auto mb-6">
          Our hands-on workshops cultivate mindfulness,
          creativity, and connection through the ancient art of bonsai.
        </p>
        <div className="inline-block bg-sage-50 px-6 py-3 rounded-lg">
          <p className="text-sm text-charcoal/80">
            <span className="font-semibold text-coral">Wellness-focused</span> experiences for
            individuals ages 25-45 seeking creative community connections
          </p>
        </div>
      </div>

      {/* Workshop Type Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {workshopTypes.map((type) => (
          <div
            key={type.slug}
            className="card text-center p-8 group"
          >
            <div className="text-5xl mb-3">{type.icon}</div>
            <h3 className="text-xl text-charcoal mb-2">
              {type.title}
            </h3>
            <p className="text-charcoal/70 text-sm">{type.description}</p>
          </div>
        ))}
      </div>

      {/* Workshops Grid */}
      <div>
        <h2 className="text-3xl text-charcoal mb-8">Available Workshops</h2>

        {workshopHandles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshopHandles.map((handle) => (
              <div key={handle} className="card p-4">
                <ShopifyBuyButton productHandle={handle} buttonText="Book Now" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-cream-dark rounded-lg border border-sage-200">
            <div className="text-5xl mb-4">✨</div>
            <p className="text-charcoal/80 mb-2 font-medium">
              Workshop schedule coming soon!
            </p>
            <p className="text-sm text-charcoal/60">
              Check back shortly for upcoming workshop dates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
