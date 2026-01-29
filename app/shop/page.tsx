import Link from 'next/link'
import { sampleProducts } from '@/lib/data/products'

const stages = [
  { name: 'Seedlings & Cuttings', slug: 'seedlings', icon: '🌱' },
  { name: 'Pre-Bonsai Starters', slug: 'starters', icon: '🪴' },
  { name: 'Intermediate Trained', slug: 'intermediate', icon: '🌿' },
  { name: 'Mature Specimens', slug: 'mature', icon: '🌳' },
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
          <Link
            key={stage.slug}
            href={`/shop/${stage.slug}`}
            className="card text-center p-6 group"
          >
            <div className="text-4xl mb-2">{stage.icon}</div>
            <h3 className="font-semibold text-gray-900 group-hover:text-coral transition-colors">
              {stage.name}
            </h3>
          </Link>
        ))}
      </div>

      {/* All Products */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Plants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/product/${product.id}`}
              className="card group"
            >
              <div className="aspect-square bg-gradient-to-br from-sage-50 to-cream flex items-center justify-center">
                <div className="text-6xl">🌿</div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-coral transition-colors flex-1">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-sage ml-2">
                    ${product.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-sage-50 px-2 py-1 rounded">
                    {product.careLevel}
                  </span>
                  <span>{product.size}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
