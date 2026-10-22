'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShopifyCart } from '@/components/shopify'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-sage sticky top-0 z-50">
      <nav className="container-custom py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/ZB Logo Transparent.png"
              alt="Zion Bonsai"
              width={112}
              height={112}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link href="/shop" className="text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              Shop
            </Link> */}
            <Link href="/workshops" className="text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              Workshops
            </Link>
            <Link href="/gallery" className="text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              Gallery
            </Link>
            <Link href="/care-guide" className="text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              Care Guide
            </Link>
            <Link href="/about" className="text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              About
            </Link>
            <ShopifyCart />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-charcoal/20 pt-4">
            {/* <Link href="/shop" className="block text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              Shop
            </Link> */}
            <Link href="/workshops" className="block text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              Workshops
            </Link>
            <Link href="/gallery" className="block text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              Gallery
            </Link>
            <Link href="/care-guide" className="block text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              Care Guide
            </Link>
            <Link href="/about" className="block text-charcoal hover:text-cream-light text-sm font-semibold uppercase tracking-wider transition-colors">
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
