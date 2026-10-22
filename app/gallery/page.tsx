'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getGallery } from '@/lib/content'

// Trees we've shaped. Workshop photos live on the Workshops page.
const galleryItems = getGallery().filter((g) => g.status !== 'workshop')
const galleryImages = galleryItems.map((g) => g.src)
const altFor = (src: string) => galleryItems.find((g) => g.src === src)?.alt ?? ''

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="eyebrow text-coral">Gallery</span>
        <h1 className="text-4xl md:text-5xl text-charcoal mt-3 mb-4">
          Our <span className="text-coral font-semibold">Gallery</span>
        </h1>
        <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
          A glimpse into the world of Zion Bonsai - our plants, workshops, and the community we&apos;re building together.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((src) => (
          <button
            key={src}
            onClick={() => setSelectedImage(src)}
            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
          >
            <Image
              src={src}
              alt={altFor(src)}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-coral transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            &times;
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-coral transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation()
              const currentIdx = galleryImages.indexOf(selectedImage)
              const prevIdx = (currentIdx - 1 + galleryImages.length) % galleryImages.length
              setSelectedImage(galleryImages[prevIdx])
            }}
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <Image
              src={selectedImage}
              alt={altFor(selectedImage)}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-coral transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation()
              const currentIdx = galleryImages.indexOf(selectedImage)
              const nextIdx = (currentIdx + 1) % galleryImages.length
              setSelectedImage(galleryImages[nextIdx])
            }}
            aria-label="Next image"
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {galleryImages.indexOf(selectedImage) + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  )
}
