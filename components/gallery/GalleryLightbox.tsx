'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { TreeItem } from './items'

/**
 * Wraps the server-rendered grid (children) and owns the lightbox.
 * Uses a native modal <dialog>: the browser makes the rest of the page inert, handles Escape,
 * and we add Tab wrapping, arrow keys, scroll lock and focus return on top.
 */
export default function GalleryLightbox({ items, children }: { items: TreeItem[]; children: React.ReactNode }) {
  const [index, setIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const open = index !== null

  // Open from a click on any grid button (event delegation keeps the grid a server component).
  const onGridClick = (e: React.MouseEvent) => {
    const button = (e.target as HTMLElement).closest<HTMLElement>('[data-gallery-index]')
    if (!button) return
    openerRef.current = button
    setIndex(Number(button.dataset.galleryIndex))
  }

  // Sync the native dialog with state; lock page scroll while open.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      closeRef.current?.focus()
    }
    if (!open && dialog.open) dialog.close()
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const close = useCallback(() => {
    setIndex(null)
    // Hand focus back to the photo that opened the lightbox.
    openerRef.current?.focus()
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    } else if (e.key === 'Tab') {
      // Wrap Tab inside the dialog so focus never leaves it.
      const focusables = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled])'))
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  const item = index === null ? null : items[index]
  const navButton =
    'inline-flex h-12 w-12 items-center justify-center text-linen transition-colors hover:text-sandstone'

  return (
    <>
      {/* Grid clicks bubble up from real <button>s, so keyboard Enter/Space work too. */}
      <div onClick={onGridClick}>{children}</div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        // Escape fires `cancel`; keep React state in sync and return focus.
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          // Click on the dim area (the dialog element itself) closes; clicks on children don't.
          if (e.target === e.currentTarget) close()
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-soil/95 p-0 text-linen backdrop:bg-soil/80"
      >
        {item && index !== null ? (
          <div className="flex h-full flex-col px-4 pb-5 pt-3 md:px-10">
            <div className="flex items-center justify-between">
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-linen" aria-live="polite">
                Photo {index + 1} of {items.length}
              </p>
              <button ref={closeRef} type="button" onClick={close} className={navButton} aria-label="Close photo viewer">
                <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center gap-2 md:gap-6">
              <button type="button" onClick={() => step(-1)} className={`${navButton} shrink-0`} aria-label="Previous photo">
                <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <div className="relative h-full min-w-0 flex-1">
                <Image
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 1100px, 90vw"
                  className="object-contain"
                />
              </div>
              <button type="button" onClick={() => step(1)} className={`${navButton} shrink-0`} aria-label="Next photo">
                <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="mx-auto mt-3 max-w-xl text-center">
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-linen">{item.label}</p>
              {item.caption ? <p className="mt-1 text-sm italic text-linen/90">{item.caption}</p> : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  )
}
