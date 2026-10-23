import Image from 'next/image'
import type { TreeItem } from './items'

// Asymmetric rhythm, repeating every five trees. Phone: first of five runs full width, the
// rest sit two across. Desktop: 12 columns with uneven spans, aspect ratios and offsets.
const slots = [
  { cell: 'col-span-2 md:col-span-7', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 58vw, 100vw' },
  { cell: 'md:col-span-5 md:mt-28', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 42vw, 50vw' },
  { cell: 'md:col-span-4', aspect: 'aspect-square', sizes: '(min-width: 768px) 33vw, 50vw' },
  { cell: 'md:col-span-4 md:mt-16', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 33vw, 50vw' },
  { cell: 'md:col-span-4 md:mt-6', aspect: 'aspect-square', sizes: '(min-width: 768px) 33vw, 50vw' },
]

/**
 * Server-rendered grid. Each tree is a real <button data-gallery-index>; the client
 * GalleryLightbox wrapping this grid listens for clicks and opens the dialog.
 */
export default function GalleryGrid({ items }: { items: TreeItem[] }) {
  return (
    <ul className="grid grid-cols-2 items-start gap-x-4 gap-y-10 md:grid-cols-12 md:gap-x-8 md:gap-y-14">
      {items.map((item, i) => {
        const slot = slots[i % slots.length]
        return (
          <li key={item.src} className={slot.cell}>
            <button
              type="button"
              data-gallery-index={i}
              aria-haspopup="dialog"
              className="relative block w-full text-left"
            >
              <span className={`relative block overflow-hidden ${slot.aspect}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={slot.sizes}
                  className="object-cover"
                />
              </span>
              <span className="mt-3 block font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-moss">
                {item.label}
              </span>
              {item.caption ? <span className="mt-1 block text-sm italic text-soil/80">{item.caption}</span> : null}
              <span className="sr-only">Enlarge photo</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
