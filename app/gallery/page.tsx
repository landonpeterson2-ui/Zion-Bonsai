import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import GalleryLightbox from '@/components/gallery/GalleryLightbox'
import { getTreeItems } from '@/components/gallery/items'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import TextLink from '@/components/ui/TextLink'
import { getSite } from '@/lib/content'

export const metadata: Metadata = pageMetadata({
  path: '/gallery',
  title: 'Gallery',
  description:
    'Trees we’ve shaped: dwarf jade bonsai in handmade pots, grown and trained by hand in Sanpete County, Utah.',
})

export default function GalleryPage() {
  const items = getTreeItems()
  const { shopEnabled } = getSite()

  return (
    <>
      <header className="container-custom pb-14 pt-16 md:pb-20 md:pt-24">
        <Eyebrow tone="clay">Gallery</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[2.75rem] leading-[1.02] md:text-[4.25rem]">
          Trees we&rsquo;ve <em>shaped.</em>
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-[1.65] text-forest">
          Every one of these was shaped by hand, one branch at a time, and most have found a home. No two
          are alike, and that&rsquo;s what keeps it interesting.
        </p>
      </header>

      <section className="container-custom pb-24 md:pb-32" aria-label="Photos of finished trees">
        <GalleryLightbox items={items}>
          <GalleryGrid items={items} />
        </GalleryLightbox>
      </section>

      <Section tone="paper-deep" bordered>
        <div className="container-custom grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Make your own</Eyebrow>
            <h2 className="mt-5 text-[2.4rem] leading-[1.05] md:text-[3.25rem]">
              Two hours. No notifications. <em>One tree that&rsquo;s yours.</em>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-5 md:justify-end">
            <TextLink href="/workshops#dates">Book a workshop</TextLink>
            {shopEnabled ? <TextLink href="/shop">Shop trees</TextLink> : null}
          </div>
        </div>
      </Section>
    </>
  )
}
