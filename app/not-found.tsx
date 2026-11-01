import type { Metadata } from 'next'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import TextLink from '@/components/ui/TextLink'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <header className="container-custom pb-24 pt-16 md:pb-32 md:pt-24">
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="mt-5 max-w-3xl text-[2.8rem] leading-[1.02] md:text-[4.25rem]">
        Nothing growing here. <em>Yet.</em>
      </h1>
      <p className="mt-6 max-w-xl leading-[1.7] text-forest/90">
        That page has moved, or the link is an old one. The trees are still where you left them.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link href="/workshops#dates" className="btn-primary">See workshop dates</Link>
        <TextLink href="/" className="inline-flex min-h-[44px] items-center">Back to home</TextLink>
      </div>
    </header>
  )
}
