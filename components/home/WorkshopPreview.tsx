import Link from 'next/link'

const workshopTypes = [
  {
    title: 'One-Time Workshops',
    description: 'Perfect introduction to bonsai. Learn the basics and take home your creation.',
    duration: 'Under 2 hours',
    price: '$50-75',
    slug: 'one-time',
  },
  {
    title: 'Workshop Series',
    description: 'Multi-week journey deepening your skills and understanding.',
    duration: '4-6 weeks',
    price: '$200-350',
    slug: 'series',
  },
  {
    title: 'Private Sessions',
    description: 'Personalized one-on-one instruction tailored to your goals.',
    duration: 'Flexible',
    price: 'Custom',
    slug: 'private',
  },
]

export default function WorkshopPreview() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-sage-50 to-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hands-On <span className="text-coral">Workshops</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Cultivate mindfulness, creativity, and connection through the ancient art of bonsai.
          </p>
          <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-coral">The Problem:</span> Constant digital connectivity,
              limited creative opportunities, lack of community
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {workshopTypes.map((workshop) => (
            <div key={workshop.slug} className="card">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {workshop.title}
                </h3>
                <p className="text-gray-600 mb-4">{workshop.description}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Duration:</span> {workshop.duration}
                  </p>
                  <p className="text-lg font-semibold text-sage">{workshop.price}</p>
                </div>
                <Link
                  href={`/workshops/${workshop.slug}`}
                  className="block w-full text-center btn-outline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/workshops" className="btn-primary">
            View All Workshops
          </Link>
        </div>
      </div>
    </section>
  )
}
