import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'

export default async function WorkshopsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const registrations = await prisma.workshopRegistration.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      workshopDate: {
        include: {
          workshop: true,
        },
      },
      order: true,
    },
    orderBy: {
      workshopDate: {
        date: 'asc',
      },
    },
  })

  const now = new Date()
  const upcomingRegistrations = registrations.filter(
    (r) => new Date(r.workshopDate.date) >= now
  )
  const pastRegistrations = registrations.filter(
    (r) => new Date(r.workshopDate.date) < now
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Workshops</h1>
        <p className="text-gray-600">
          View your workshop registrations and schedules
        </p>
      </div>

      {/* Browse More Workshops */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">
              Explore More Workshops
            </h3>
            <p className="text-sm text-gray-600">
              Learn new bonsai techniques and connect with the community
            </p>
          </div>
          <Link
            href="/workshops"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Browse
          </Link>
        </div>
      </div>

      {/* Upcoming Workshops */}
      {upcomingRegistrations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Upcoming Workshops ({upcomingRegistrations.length})
          </h2>
          <div className="space-y-4">
            {upcomingRegistrations.map((registration) => (
              <WorkshopCard key={registration.id} registration={registration} />
            ))}
          </div>
        </div>
      )}

      {/* Past Workshops */}
      {pastRegistrations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Past Workshops ({pastRegistrations.length})
          </h2>
          <div className="space-y-4">
            {pastRegistrations.map((registration) => (
              <WorkshopCard
                key={registration.id}
                registration={registration}
                isPast
              />
            ))}
          </div>
        </div>
      )}

      {/* No Workshops */}
      {registrations.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No workshop registrations yet
            </h3>
            <p className="text-gray-600 mb-6">
              Sign up for a workshop to start your bonsai journey
            </p>
            <Link
              href="/workshops"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Browse Workshops
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function WorkshopCard({
  registration,
  isPast = false,
}: {
  registration: any
  isPast?: boolean
}) {
  const { workshopDate, order, status } = registration
  const { workshop } = workshopDate

  return (
    <div
      className={`border rounded-lg p-6 ${
        isPast ? 'border-gray-200 opacity-75' : 'border-green-200 bg-green-50'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{workshop.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{workshop.type} workshop</p>
        </div>
        <StatusBadge status={status} isPast={isPast} />
      </div>

      <div className="space-y-3">
        {/* Date and Time */}
        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="font-medium">
              {new Date(workshopDate.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-sm text-gray-600">
              {workshopDate.startTime} - {workshopDate.endTime}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{workshopDate.location}</span>
        </div>

        {/* Order Link */}
        {order && (
          <div className="pt-3 border-t border-gray-200">
            <Link
              href={`/dashboard/orders/${order.id}`}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              View Order #{order.orderNumber} →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status, isPast }: { status: string; isPast: boolean }) {
  if (isPast) {
    return (
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
        Completed
      </span>
    )
  }

  const statusStyles = {
    registered: 'bg-green-100 text-green-800',
    attended: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.registered

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${style}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
