import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Eyebrow from '@/components/ui/Eyebrow'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { getGiftCardBuyUrl, getSite, todayInDenver } from '@/lib/content'
import { getPhoto } from '@/lib/photos'

export const metadata: Metadata = pageMetadata({
  path: '/give',
  title: 'Gift Cards for Bonsai Workshops',
  description:
    'Give someone two screen-free hours and a bonsai of their own. Zion Bonsai workshop gift cards for one seat or a date night for two, in Sanpete County, Utah.',
})

// Render per request so the saucer offer line drops off on its own after it ends.
export const dynamic = 'force-dynamic'

const buttonClass =
  'inline-flex min-h-[44px] items-center rounded-[3px] bg-clay px-6 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-linen transition-colors hover:bg-clay-dark'

/** "2026-12-31" -> "December 31" */
const monthDay = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' })

function BuyButton({ url, email }: { url: string | null; email: string }) {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        Buy a gift card
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  return (
    <a href={`mailto:${email}?subject=${encodeURIComponent('Gift card')}`} className={buttonClass}>
      Ask about a gift card
    </a>
  )
}

export default function GivePage() {
  const site = getSite()
  const gift = site.giftCertificates
  const buyUrl = getGiftCardBuyUrl()
  const photo = getPhoto('workshop-finished-jade-thank-you-card')
  const saucerEnds = gift.saucerOfferEnds && todayInDenver() <= gift.saucerOfferEnds ? gift.saucerOfferEnds : null

  const goodToKnow = [
    {
      title: 'Arrives by email.',
      body: 'Pick a design and it lands in an inbox, theirs or yours. Want something to wrap? Print it out.',
    },
    {
      title: 'Never expires. No fees.',
      body: 'It’s good for its dollar value toward any public workshop. Use a date night card on your own and the rest stays on the card for next time.',
    },
    {
      title: 'Good for any public workshop.',
      body: 'Every public date except Sun River Gardens, which sells its own seats.',
    },
    {
      title: 'Using one.',
      body: 'Register for a date like anyone else and tell us on the form you have a gift card. Then use the card at checkout when you pay.',
    },
    {
      title: 'Dates for the year.',
      body: 'We post the year ahead and confirm dates one quarter at a time, so they stay clear of holidays and local events.',
    },
  ]

  return (
    <>
      <header className="container-custom grid gap-12 pb-16 pt-16 md:grid-cols-12 md:items-center md:gap-16 md:pb-24 md:pt-24">
        <div className="md:col-span-7">
          <Eyebrow tone="clay">Gift cards</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[2.8rem] leading-[1.02] md:text-[4.25rem]">
            Give them a <em>reason to unplug.</em>
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-[1.65] text-forest">
            A seat at the table, hands in the soil, the phone face-down for a while, and a tree that goes home with
            them. For the person who has everything except a free afternoon.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <BuyButton url={buyUrl} email={site.email} />
            <TextLink href="/workshops#dates">See the dates</TextLink>
          </div>
        </div>
        <div className="md:col-span-5">
          <Photo src={photo.src} alt={photo.alt} sizes="(min-width: 768px) 38vw, 100vw" aspect="aspect-[4/5]" priority />
        </div>
      </header>

      {gift.offers.length > 0 ? (
        <Section tone="paper-deep" bordered>
          <div className="container-custom grid gap-10 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <SectionHeading eyebrow="Choose a gift">
                One seat, <em>or two.</em>
              </SectionHeading>
            </Reveal>
            <Reveal className="md:col-span-7 md:pt-12">
              <ol className="border-t border-forest/15">
                {gift.offers.map((o, i) => (
                  <li key={o.name} className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-forest/15 py-7">
                    <span className="font-label text-[11px] font-semibold tracking-[0.16em] text-moss">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[1.6rem] leading-snug md:text-[1.9rem]">{o.name}</h3>
                      <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">{o.blurb}</p>
                    </div>
                    <p className="font-display text-[1.9rem] leading-none text-forest md:text-[2.2rem]">${o.price}</p>
                  </li>
                ))}
              </ol>
              {saucerEnds ? (
                <p className="mt-6 max-w-xl leading-[1.7] text-soil">
                  Buy by {monthDay(saucerEnds)} and it comes with a free saucer, handed over at the workshop.
                </p>
              ) : null}
              <div className="mt-8">
                <BuyButton url={buyUrl} email={site.email} />
              </div>
            </Reveal>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="container-custom grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <SectionHeading eyebrow="Good to know">
              The <em>small print,</em> kept small.
            </SectionHeading>
          </Reveal>
          <Reveal className="md:col-span-7 md:pt-12">
            <ul className="border-t border-forest/15">
              {goodToKnow.map((g) => (
                <li key={g.title} className="border-b border-forest/15 py-6">
                  <h3 className="text-[1.55rem] leading-snug md:text-[1.65rem]">{g.title}</h3>
                  <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">{g.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-xl leading-[1.7] text-soil">
              Questions? Email <a href={`mailto:${site.email}`} className="text-clay underline underline-offset-4 hover:text-clay-dark">{site.email}</a> and a real person will answer.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
