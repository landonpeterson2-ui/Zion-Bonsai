'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store/cartStore'

export default function CartIcon() {
  const items = useCartStore((state) => state.items)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <Link href="/cart" className="relative">
      <svg
        className="w-6 h-6 text-gray-700 hover:text-coral transition-colors"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-coral text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
