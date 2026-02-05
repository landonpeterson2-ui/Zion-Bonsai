import Link from 'next/link'

const stages = [
  {
    name: 'Seedlings & Cuttings',
    description: 'Begin your bonsai journey from the very start',
    price: 'From $15',
    slug: 'seedlings',
    icon: '🌱',
  },
  {
    name: 'Pre-Bonsai Starters',
    description: 'Young plants ready for your creative touch',
    price: 'From $30',
    slug: 'starters',
    icon: '🪴',
  },
  {
    name: 'Intermediate Trained',
    description: 'Partially styled plants with character',
    price: 'From $60',
    slug: 'intermediate',
    icon: '🌿',
  },
  {
    name: 'Mature Specimens',
    description: 'Show-quality bonsai with years of care',
    price: 'From $100',
    slug: 'mature',
    icon: '🌳',
  },
]

export default function ShopByStage() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-coral">Stage</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every bonsai is a journey. Choose where you'd like to begin yours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <Link
              key={stage.slug}
              href="/shop"
              className="card group"
            >
              <div className="p-6">
                <div className="text-5xl mb-4 text-center">{stage.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-coral transition-colors">
                  {stage.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{stage.description}</p>
                <p className="text-sage font-semibold">{stage.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
