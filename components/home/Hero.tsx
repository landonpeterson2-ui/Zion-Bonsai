'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getGallery } from '@/lib/content'

// Finished trees only (workshop photos with people live on the Workshops page).
const galleryItems = getGallery().filter((g) => g.status !== 'workshop')
const galleryImages = galleryItems.map((g) => g.src)

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  // Only mount images as they're reached in the rotation, instead of all 21 up front.
  // Keeps 1 image ahead "preloaded" so the crossfade never shows a blank frame.
  const [mountedIndices, setMountedIndices] = useState<Set<number>>(() => new Set([0, 1 % galleryImages.length]))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Hero is rebuilt in task 20; remove then
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % galleryImages.length
        const preload = (next + 1) % galleryImages.length
        setMountedIndices((mounted) => {
          if (mounted.has(next) && mounted.has(preload)) return mounted
          return new Set(mounted).add(next).add(preload)
        })
        return next
      })
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute -left-40 -top-36 h-[560px] w-[560px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(221,111,71,0.16), rgba(221,111,71,0) 68%)' }}
      />
      <div className="container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <span className="eyebrow inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full">
              Central Utah &middot; Beginner-Friendly Workshops
            </span>
            <h1 className="text-5xl md:text-6xl mt-6 mb-5 leading-[1.08]">
              Unplug. Create.
              <br />
              <span className="text-coral font-semibold">Grow.</span>
            </h1>
            <p className="text-lg font-medium text-charcoal/80 mb-3">
              Bonsai workshops for beginners in Central Utah.
            </p>
            <p className="text-lg text-charcoal/70 mb-8 max-w-md">
              No experience needed. No intimidating jargon. Just two hours where you disconnect
              from screens, work with your hands, and leave with a living piece of art you
              cultivated yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <Link href="/workshops" className="btn-primary text-center">
                Sign Up for a Workshop
              </Link>
              <Link href="/about" className="font-semibold text-sage-700 border-b-[1.5px] border-sage pb-0.5 transition-colors hover:text-sage-800">
                Learn More About Us
              </Link>
            </div>
          </div>

          {/* Rotating Gallery */}
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-[92%] rounded-md bg-coral" />
            <div className="relative h-[420px] md:h-[560px] w-[92%] overflow-hidden rounded-md shadow-2xl">
              {isLoaded && galleryImages.length > 0 ? (
                <div className="relative w-full h-full">
                  {galleryImages.map((src, index) => (
                    mountedIndices.has(index) && (
                      <Image
                        key={src}
                        src={src}
                        alt={galleryItems[index].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover transition-opacity duration-1000 ${
                          index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        priority={index === 0}
                      />
                    )
                  ))}
                  <div className="absolute left-5 bottom-5 rounded bg-cream-light/90 px-4 py-2.5 font-label italic text-sm text-charcoal">
                    Portulacaria afra &middot; hand-shaped in Central Utah
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-coral/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-lg text-charcoal/70">
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
              <div className="flex gap-1.5 mt-4">
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
          </div>
        </div>
      </div>
    </section>
  )
}
