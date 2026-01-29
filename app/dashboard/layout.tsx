import Link from 'next/link'
import { auth } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">My Account</h2>
              <nav className="space-y-2">
                <DashboardLink href="/dashboard" label="Overview" />
                <DashboardLink href="/dashboard/orders" label="My Orders" />
                <DashboardLink href="/dashboard/workshops" label="My Workshops" />
                <DashboardLink href="/dashboard/addresses" label="Addresses" />
                <DashboardLink href="/dashboard/favorites" label="Favorites" />
                <DashboardLink href="/dashboard/profile" label="Profile" />
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

function DashboardLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
    >
      {label}
    </Link>
  )
}
