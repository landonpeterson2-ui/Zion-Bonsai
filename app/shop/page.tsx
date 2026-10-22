import type { Metadata } from 'next'
import { ShopifyBuyButton } from '@/components/shopify'
import Eyebrow from '@/components/ui/Eyebrow'
import Photo from '@/components/ui/Photo'
import Section from '@/components/ui/Section'
import TextLink from '@/components/ui/TextLink'
import { getShopHandles, getSite } from '@/lib/content'
import { getPhoto } from '@/lib/photos'

const { shopEnabled } = getSite()

export const metadata: Metadata = {
  title: 'Shop Dwarf Jade Bonsai',
  description:
    'Dwarf jade bonsai shaped by hand in Sanpete County, Utah, ready to come home with you. Trees come and go, so check back.',
  // The shop is hidden from the nav until shopEnabled is true; keep it out of search too.
  robots: shopEnabled ? undefined : { index: false, follow: true },
}

export default function ShopPage() {
  const handles = getShopHandles()
  const site = getSite()
  const tree = getPhoto('jade-terracotta-tall-stem')

  return (
    <>
      <header className="container-custom pb-16 pt-16 md:pb-20 md:pt-24">
        <Eyebrow tone="clay">Shop</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[2.75rem] leading-[1.02] md:text-[4.25rem]">
          Trees, ready for <em>a new table.</em>
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-[1.65] text-forest">
          Every tree here has been trained by hand, one branch at a time. Pick one up and it comes home with you,
          with a standing invitation to ask us anything.
        </p>
      </header>

      <Section tone="paper-deep" bordered>
        <div className="container-custom">
          {handles.length > 0 ? (
            <>
              <Eyebrow>Available now</Eyebrow>
              <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {handles.map((handle) => (
                  <li key={handle} className="border-t border-forest/15 pt-6">
                    <ShopifyBuyButton productHandle={handle} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-7">
                <Eyebrow>Nothing on the table right now</Eyebrow>
                <h2 className="mt-5 text-[2.4rem] leading-[1.05] md:text-[3.25rem]">
                  Trees come and go. <em>Slowly.</em>
                </h2>
                <p className="mt-6 max-w-[56ch] leading-[1.65] text-forest">
                  Shaping a tree takes time, so we only have a few at a time, and
                  they tend to find a home quickly. When a new one is ready, it shows up here.
                </p>
                <p className="mt-4 max-w-[56ch] leading-[1.65] text-forest">
                  The best way to know first is to follow along on Instagram
                  {site.interestListUrl ? ' or join the interest list' : ' or ask us about the interest list'}.
                  Or come make your own at a workshop. That one you can&rsquo;t buy, only grow.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a href={site.social.instagram} className="btn-primary" target="_blank" rel="noopener noreferrer">
                    Follow on Instagram
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <TextLink href={site.interestListUrl ?? '/contact'}>
                    {site.interestListUrl ? 'Join the interest list' : 'Ask about the interest list'}
                  </TextLink>
                  <TextLink href="/workshops#dates">Make your own</TextLink>
                </div>
              </div>
              <div className="md:col-span-5">
                <Photo
                  src={tree.src}
                  alt={tree.alt}
                  sizes="(min-width: 768px) 38vw, 100vw"
                  aspect="aspect-[4/5]"
                  caption="A tree we shaped earlier. It has already gone home."
                />
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section>
        <div className="container-custom max-w-3xl">
          <Eyebrow>Good to know</Eyebrow>
          <p className="mt-5 leading-[1.65] text-forest">
            Looking for tools? We use them in every workshop, and they are available for purchase.
            Want to see what we&rsquo;ve made before? Have a look at the{' '}
            <TextLink href="/gallery">gallery</TextLink>.
          </p>
        </div>
      </Section>
    </>
  )
}
