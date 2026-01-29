import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
      userId: session.user.id, // Ensure user can only see their own orders
    },
    include: {
      items: true,
    },
  })

  if (!order) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Orders
      </Link>

      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.orderNumber}
            </h1>
            <p className="text-gray-600 mt-1">
              Placed on{' '}
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <StatusBadge status={order.status} paymentStatus={order.paymentStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start py-4 border-b border-gray-200 last:border-0"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-900">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-500">
                        ${(Number(item.price) * item.quantity).toFixed(2)} total
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingName && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="text-gray-700">
                <p className="font-medium">{order.shippingName}</p>
                <p className="mt-2">{order.shippingLine1}</p>
                {order.shippingLine2 && <p>{order.shippingLine2}</p>}
                <p>
                  {order.shippingCity}, {order.shippingState} {order.shippingPostal}
                </p>
                <p>{order.shippingCountry}</p>
                {order.shippingPhone && (
                  <p className="mt-2">Phone: {order.shippingPhone}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${Number(order.subtotal).toFixed(2)}</span>
              </div>

              {Number(order.shippingCost) > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>${Number(order.shippingCost).toFixed(2)}</span>
                </div>
              )}

              {Number(order.tax) > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>${Number(order.tax).toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${Number(order.total).toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Status</h3>
              <p className="text-sm text-gray-600">
                {order.paymentStatus === 'paid'
                  ? '✓ Payment confirmed'
                  : order.paymentStatus.charAt(0).toUpperCase() +
                    order.paymentStatus.slice(1)}
              </p>
            </div>

            {/* Contact Support */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Need help with your order?</p>
              <a
                href="mailto:support@zionbonsai.com"
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({
  status,
  paymentStatus,
}: {
  status: string
  paymentStatus: string
}) {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.pending

  return (
    <div className="flex flex-col gap-2">
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${style}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
      {paymentStatus === 'paid' && (
        <span className="text-xs text-green-600">✓ Paid</span>
      )}
    </div>
  )
}
