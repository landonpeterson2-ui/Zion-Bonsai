'use client'

import Link from 'next/link'
import { useState } from 'react'
import Cart from '@/components/cart/CartIcon'
import AuthButton from '@/components/auth/AuthButton'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">ZB</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold text-gray-900">ZION</div>
              <div className="text-sm font-script text-coral -mt-1">bonsai</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-coral transition-colors">
              Shop
            </Link>
            <Link href="/workshops" className="text-gray-700 hover:text-coral transition-colors">
              Workshops
            </Link>
            <Link href="/care-guide" className="text-gray-700 hover:text-coral transition-colors">
              Care Guide
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-coral transition-colors">
              About
            </Link>
            <AuthButton />
            <Cart />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link href="/shop" className="block text-gray-700 hover:text-coral transition-colors">
              Shop
            </Link>
            <Link href="/workshops" className="block text-gray-700 hover:text-coral transition-colors">
              Workshops
            </Link>
            <Link href="/care-guide" className="block text-gray-700 hover:text-coral transition-colors">
              Care Guide
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-coral transition-colors">
              About
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <AuthButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
