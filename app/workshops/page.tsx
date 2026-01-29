import Link from 'next/link'
import { getAllWorkshops } from '@/lib/data/workshops'
import { format } from 'date-fns'

export default function WorkshopsPage() {
  const workshops = getAllWorkshops()

  const workshopTypes = [
    { title: 'One-Time Workshops', slug: 'one-time', icon: '✨' },
    { title: 'Workshop Series', slug: 'series', icon: '📚' },
    { title: 'Private Sessions', slug: 'private', icon: '👤' },
  ]

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Bonsai <span className="text-coral">Workshops</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Unplug, create, and grow together. Our hands-on workshops cultivate mindfulness,
          creativity, and connection through the ancient art of bonsai.
        </p>
        <div className="inline-block bg-sage-50 px-6 py-3 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-coral">Wellness-focused</span> experiences for
            individuals ages 25-45 seeking creative community connections
          </p>
        </div>
      </div>

      {/* Workshop Type Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {workshopTypes.map((type) => (
          <Link
            key={type.slug}
            href={`/workshops/${type.slug}`}
            className="card text-center p-8 group"
          >
            <div className="text-5xl mb-3">{type.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-coral transition-colors">
              {type.title}
            </h3>
          </Link>
        ))}
      </div>

      {/* All Workshops */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Workshops</h2>
        <div className="space-y-6">
          {workshops.map((workshop) => (
            <Link
              key={workshop.id}
              href={`/workshops/${workshop.id}`}
              className="card flex flex-col md:flex-row group"
            >
              <div className="md:w-1/3 aspect-video md:aspect-square bg-gradient-to-br from-coral-50 to-sage-50 flex items-center justify-center">
                <div className="text-6xl">
                  {workshop.type === 'one-time' ? '✨' : workshop.type === 'series' ? '📚' : '👤'}
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-coral transition-colors mb-2">
                      {workshop.title}
                    </h3>
                    <span className="inline-block bg-sage-100 text-sage-800 px-3 py-1 rounded text-sm font-medium capitalize">
                      {workshop.type.replace('-', ' ')}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-sage">${workshop.price}</span>
                </div>
                <p className="text-gray-700 mb-4">{workshop.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>⏱️ {workshop.duration}</span>
                  <span>👥 Max {workshop.capacity} participants</span>
                  {workshop.dates.length > 0 && (
                    <span>
                      📅 Next: {format(workshop.dates[0].date, 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
