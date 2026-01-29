'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getWorkshopById } from '@/lib/data/workshops'
import { useCartStore } from '@/lib/store/cartStore'
import { format } from 'date-fns'

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
  const workshop = getWorkshopById(params.id)
  const addItem = useCartStore((state) => state.addItem)
  const [selectedDate, setSelectedDate] = useState('')
  const [added, setAdded] = useState(false)

  if (!workshop) {
    return (
      <div className="container-custom py-12">
        <p>Workshop not found</p>
        <Link href="/workshops" className="text-coral hover:text-coral-600">
          ← Back to Workshops
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (workshop.type !== 'private' && !selectedDate) {
      alert('Please select a date')
      return
    }

    addItem({
      productId: workshop.id,
      quantity: 1,
      type: 'workshop',
      workshopDateId: selectedDate || undefined,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container-custom py-12">
      <Link href="/workshops" className="text-coral hover:text-coral-600 mb-6 inline-block">
        ← Back to Workshops
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <span className="inline-block bg-sage-100 text-sage-800 px-3 py-1 rounded text-sm font-medium capitalize mb-4">
              {workshop.type.replace('-', ' ')}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{workshop.title}</h1>
            <p className="text-xl text-gray-700">{workshop.description}</p>
          </div>

          {/* Workshop Details */}
          <div className="bg-cream rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Workshop Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="font-semibold text-gray-700">Duration</p>
                  <p className="text-gray-600">{workshop.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="font-semibold text-gray-700">Class Size</p>
                  <p className="text-gray-600">Maximum {workshop.capacity} participants</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-semibold text-gray-700">Investment</p>
                  <p className="text-2xl font-bold text-sage">${workshop.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
            <ul className="space-y-2">
              {workshop.skills.map((skill, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-coral mt-1">✓</span>
                  <span className="text-gray-700">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What's Included</h3>
            <ul className="space-y-2">
              {workshop.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-sage mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Book Your Spot</h3>

            {workshop.type === 'private' ? (
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Private sessions are scheduled individually based on your availability.
                </p>
                <p className="text-sm text-gray-600">
                  After booking, we'll contact you to schedule your personalized session.
                </p>
              </div>
            ) : workshop.dates.length > 0 ? (
              <div className="mb-6">
                <label className="block font-semibold text-gray-700 mb-3">
                  Select a Date:
                </label>
                <div className="space-y-2">
                  {workshop.dates.map((date) => (
                    <label
                      key={date.id}
                      className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:border-coral transition-colors"
                    >
                      <input
                        type="radio"
                        name="workshop-date"
                        value={date.id}
                        checked={selectedDate === date.id}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {format(date.date, 'EEEE, MMMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {date.startTime} - {date.endTime}
                        </p>
                        <p className="text-sm text-gray-600">{date.location}</p>
                        <p className="text-sm text-sage font-medium mt-1">
                          {date.spotsAvailable} {date.spotsAvailable === 1 ? 'spot' : 'spots'} available
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600 mb-6">
                No dates currently scheduled. Check back soon!
              </p>
            )}

            <button
              onClick={handleAddToCart}
              disabled={workshop.type !== 'private' && workshop.dates.length > 0 && !selectedDate}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
