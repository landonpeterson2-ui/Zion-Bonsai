import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, Open_Sans, Satisfy } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-label',
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
const title = 'Zion Bonsai | Unplug. Create. Grow.'
const description = 'Beginner bonsai workshops in Sanpete County, Central Utah. Put the phone down, get your hands in the soil, and take home a dwarf jade in a handmade pot.'

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
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Zion Bonsai logo beside dwarf jade bonsai on a sunlit shelf' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Reveal hides content only when JS is running; if hydration hasn't happened in 4s, show everything. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js')},4000)",
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable} ${openSans.variable} ${satisfy.variable} font-sans antialiased bg-paper text-forest`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[3px] focus:bg-clay focus:px-5 focus:py-3 focus:font-semibold focus:text-linen"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="min-h-screen outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
