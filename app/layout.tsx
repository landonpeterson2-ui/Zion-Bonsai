import type { Metadata } from 'next'
import { Montserrat, Economica, Great_Vibes } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Main font - Montserrat
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans'
})

// Headline font - Economica
const economica = Economica({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading'
})

// Script font - Using Great Vibes as placeholder for Sweetbelly Script
// Great Vibes is a similar elegant script font from Google Fonts
// To use your actual Sweetbelly Script font, see instructions in README
const scriptFont = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script'
})

export const metadata: Metadata = {
  title: 'Zion Bonsai | Nurturing bonsai Nurtures the soul',
  description: 'Unplug, create and grow together. Hands-on bonsai workshops and living art for wellness-focused individuals. Portulacaria afra (Dwarf Jade) bonsai at every stage.',
  keywords: 'bonsai, dwarf jade, portulacaria afra, workshops, mindfulness, creativity, wellness, plant care',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${economica.variable} ${scriptFont.variable} font-sans antialiased bg-cream`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
