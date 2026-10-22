import type { Metadata } from 'next'
import { Montserrat, Open_Sans, Satisfy } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-heading',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-sans',
})

const satisfy = Satisfy({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-script',
})

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const title = 'Zion Bonsai | Nurturing bonsai Nurtures the soul'
const description = 'Unplug, create and grow together. Hands-on bonsai workshops and living art for wellness-focused individuals in Central Utah. Portulacaria afra (Dwarf Jade) bonsai at every stage.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Zion Bonsai',
  },
  description,
  keywords: 'bonsai, dwarf jade, portulacaria afra, workshops, mindfulness, creativity, wellness, plant care, Central Utah',
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Zion Bonsai',
    images: [{ url: '/gallery/1.jpeg', width: 1200, height: 1200 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/gallery/1.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} ${satisfy.variable} font-sans antialiased bg-paper text-forest`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
