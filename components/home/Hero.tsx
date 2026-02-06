'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

// Add your gallery images here - place files in public/gallery/
const galleryImages = [
  '/gallery/1.jpeg',
  '/gallery/2.jpeg',
  '/gallery/3.jpeg',
  '/gallery/4.jpeg',
  '/gallery/5.jpeg',
  '/gallery/6.jpeg',
  '/gallery/7.jpeg',
  '/gallery/8.jpeg',
  '/gallery/9.jpeg',
  '/gallery/10.jpeg',
  '/gallery/11.jpeg',
  '/gallery/12.jpeg',
  '/gallery/13.jpeg',
  '/gallery/14.jpeg',
  '/gallery/15.jpeg',
  '/gallery/16.jpeg',
  '/gallery/17.jpeg',
  '/gallery/18.jpeg',
  '/gallery/19.jpeg',
  '/gallery/20.jpeg',
  '/gallery/21.jpeg',
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-cream to-sage-50 py-20 md:py-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="bg-sage rounded-2xl p-8 md:p-10 shadow-lg">
            <Image
              src="/ZB Logo.PNG"
              alt="Zion Bonsai"
              width={200}
              height={200}
              className="h-40 md:h-48 w-auto mb-6 rounded-lg"
            />
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Unplug. Create. <span className="text-coral">Grow.</span>
            </h1>
            <p className="text-xl font-medium text-cream mb-4">
              Bonsai workshops for beginners in Central Utah.
            </p>
            <p className="text-lg text-white/80 mb-8">
              No experience needed. No intimidating jargon. Just two hours where you disconnect
              from screens, work with your hands, and leave with a living piece of art you
              cultivated yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/workshops" className="btn-primary text-center">
                Sign Up for a Workshop
              </Link>
              <Link href="/about" className="bg-white text-sage font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors text-center">
                Learn More About Us
              </Link>
            </div>
          </div>

          {/* Rotating Gallery */}
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-coral/30 shadow-xl">
              {isLoaded && galleryImages.length > 0 ? (
                <div className="relative w-full h-full">
                  {galleryImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`Zion Bonsai gallery image ${index + 1}`}
                      fill
                      className={`object-cover object-top transition-opacity duration-1000 ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={index === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-full bg-coral/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🌿</div>
                    <p className="text-lg text-gray-600">
                      Portulacaria afra
                      <br />
                      <span className="text-coral font-semibold">(Dwarf Jade)</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Progress dots */}
            {isLoaded && galleryImages.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-4">
                {galleryImages.slice(0, 7).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex % 7 ? 'bg-coral' : 'bg-coral/30'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
                {galleryImages.length > 7 && (
                  <span className="text-coral/50 text-xs ml-1">+{galleryImages.length - 7}</span>
                )}
              </div>
            )}

            {/* Decorative circle */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-sage rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
