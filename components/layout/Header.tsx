'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShopifyCart } from '@/components/shopify'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-sage shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/ZB Logo.PNG"
              alt="Zion Bonsai"
              width={80}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link href="/shop" className="text-white hover:text-cream font-semibold transition-colors">
              Shop
            </Link> */}
            <Link href="/workshops" className="text-white hover:text-cream font-semibold transition-colors">
              Workshops
            </Link>
            <Link href="/gallery" className="text-white hover:text-cream font-semibold transition-colors">
              Gallery
            </Link>
            <Link href="/care-guide" className="text-white hover:text-cream font-semibold transition-colors">
              Care Guide
            </Link>
            <Link href="/about" className="text-white hover:text-cream font-semibold transition-colors">
              About
            </Link>
            <ShopifyCart />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-sage-600 pt-4">
            {/* <Link href="/shop" className="block text-white hover:text-cream font-semibold transition-colors">
              Shop
            </Link> */}
            <Link href="/workshops" className="block text-white hover:text-cream font-semibold transition-colors">
              Workshops
            </Link>
            <Link href="/gallery" className="block text-white hover:text-cream font-semibold transition-colors">
              Gallery
            </Link>
            <Link href="/care-guide" className="block text-white hover:text-cream font-semibold transition-colors">
              Care Guide
            </Link>
            <Link href="/about" className="block text-white hover:text-cream font-semibold transition-colors">
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
