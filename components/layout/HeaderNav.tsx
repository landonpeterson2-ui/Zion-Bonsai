'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { bookHref, getNavItems } from './nav'

function ActiveMark() {
  return <span aria-hidden="true" className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-full bg-clay" />
}

export default function HeaderNav({ shopEnabled, cart }: { shopEnabled: boolean; cart: ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  // Any pathname change (link, Back/Forward) closes the menu. State is adjusted
  // during render rather than in an effect.
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setOpen(false)
  }
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const items = getNavItems(shopEnabled)
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }, [])

  // A panel link hides itself when it closes the menu, so hand focus to the
  // page content (also right for same-page anchors like #dates).
  const closeToContent = useCallback(() => {
    setOpen(false)
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [])

  // Focus into the panel on open; lock body scroll; Escape, Tab wrap, resize.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close(true)
        return
      }
      if (e.key !== 'Tab') return
      const focusables = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
      ).filter((el) => el.offsetParent !== null)
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
    const mq = window.matchMedia('(min-width: 1024px)')
    const onResize = () => {
      if (mq.matches) close(false)
    }
    document.addEventListener('keydown', onKeyDown)
    mq.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      mq.removeEventListener('change', onResize)
    }
  }, [open, close])

  const desktopLink =
    'relative inline-flex items-center min-h-[44px] font-label font-semibold text-xs uppercase tracking-[0.14em] text-forest hover:text-clay transition-colors'

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-paper border-b border-forest/10">
      <nav aria-label="Main" className="container-custom">
        <div className="flex h-16 items-center justify-between gap-3 lg:h-[72px]">
          <Link href="/" onClick={() => close(false)} className="flex shrink-0 items-center" aria-label="Zion Bonsai, home">
            <Image
              src="/ZB Logo Transparent.png"
              alt=""
              width={112}
              height={112}
              className="h-12 w-12 lg:h-14 lg:w-14"
              priority
            />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-7 lg:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={desktopLink}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span className="relative">
                  {item.label}
                  {isActive(item.href) && <ActiveMark />}
                </span>
              </Link>
            ))}
            {cart}
            <Link href={bookHref} className="btn-primary">
              Book a workshop
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={bookHref}
              onClick={() => close(false)}
              className="btn-primary !px-5 !py-2"
            >
              Book
            </Link>
            <button
              ref={buttonRef}
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => (open ? close(true) : setOpen(true))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile panel: sits under the header bar, fills the rest of the viewport */}
      <div
        ref={panelRef}
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper lg:hidden"
      >
        <ul className="container-custom flex flex-col py-6">
          {items.map((item) => (
            <li key={item.href} className="border-b border-forest/10">
              <Link
                href={item.href}
                onClick={closeToContent}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className="flex min-h-[56px] items-center font-label text-lg font-semibold text-forest"
              >
                <span className="relative">
                  {item.label}
                  {isActive(item.href) && <ActiveMark />}
                </span>
              </Link>
            </li>
          ))}
          {shopEnabled && cart && <li className="flex min-h-[56px] items-center">{cart}</li>}
        </ul>
      </div>
    </header>
  )
}
