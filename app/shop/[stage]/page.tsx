import Link from 'next/link'
import { getProductsByStage } from '@/lib/data/products'
import type { PlantStage } from '@/types'

const stageInfo = {
  seedlings: {
    title: 'Seedlings & Cuttings',
    description: 'Begin your bonsai journey from the very start. Perfect for those who want to witness every stage of growth.',
    icon: '🌱',
  },
  starters: {
    title: 'Pre-Bonsai Starters',
    description: 'Young plants ready for your creative vision. Ideal for learning fundamental styling techniques.',
    icon: '🪴',
  },
  intermediate: {
    title: 'Intermediate Trained',
    description: 'Partially styled plants with established character. Continue the journey of an already beautiful tree.',
    icon: '🌿',
  },
  mature: {
    title: 'Mature Specimens',
    description: 'Show-quality bonsai with years of careful cultivation. Display-ready pieces of living art.',
    icon: '🌳',
  },
}

export default function StagePage({ params }: { params: { stage: string } }) {
  const stage = params.stage as PlantStage
  const info = stageInfo[stage]
  const products = getProductsByStage(stage)

  if (!info) {
    return <div>Stage not found</div>
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-12">
        <Link href="/shop" className="text-coral hover:text-coral-600 mb-4 inline-block">
          ← Back to Shop
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-6xl">{info.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {info.title}
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">{info.description}</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
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
              {product.ageYears && (
                <div className="mt-2 text-xs text-gray-500">
                  Age: {product.ageYears} {product.ageYears === 1 ? 'year' : 'years'}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available in this category yet.</p>
          <Link href="/shop" className="btn-primary mt-4 inline-block">
            Browse All Plants
          </Link>
        </div>
      )}
    </div>
  )
}
