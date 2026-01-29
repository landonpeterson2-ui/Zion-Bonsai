import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  // Fetch user's recent orders and workshop registrations
  const [recentOrders, upcomingWorkshops] = await Promise.all([
    prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { items: true },
    }),
    prisma.workshopRegistration.findMany({
      where: {
        userId: session.user.id,
        status: 'registered',
      },
      include: {
        workshopDate: {
          include: {
            workshop: true,
          },
        },
      },
      orderBy: {
        workshopDate: {
          date: 'asc',
        },
      },
      take: 5,
    }),
  ])

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session.user.name || 'there'}!
        </h1>
        <p className="text-gray-600">
          Manage your orders, workshops, and account settings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Orders"
          value={recentOrders.length}
          link="/dashboard/orders"
          linkText="View all"
        />
        <StatCard
          title="Upcoming Workshops"
          value={upcomingWorkshops.length}
          link="/dashboard/workshops"
          linkText="View schedule"
        />
        <StatCard
          title="Account Status"
          value="Active"
          link="/dashboard/profile"
          linkText="Manage"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
            <Link
              href="/shop"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Order #{order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.length} item(s) · ${Number(order.total).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Workshops */}
      {upcomingWorkshops.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Workshops</h2>
            <Link
              href="/dashboard/workshops"
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingWorkshops.map((registration) => (
              <div
                key={registration.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <p className="font-semibold text-gray-900">
                  {registration.workshopDate.workshop.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(registration.workshopDate.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  at {registration.workshopDate.startTime}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {registration.workshopDate.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({
  title,
  value,
  link,
  linkText,
}: {
  title: string
  value: string | number
  link: string
  linkText: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-4">{value}</p>
      <Link
        href={link}
        className="text-sm text-green-600 hover:text-green-700 font-medium"
      >
        {linkText} →
      </Link>
    </div>
  )
}
