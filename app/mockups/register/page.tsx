import type { Metadata } from 'next'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import { formatDate, formatTime } from '@/components/ui/NextWorkshop'
import RegisterForm from '@/components/register/RegisterForm'
import { getPartner, getSite, getUpcomingWorkshops } from '@/lib/content'

export const metadata: Metadata = { title: 'Save my seat (mockup)', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

function MockBanner({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border-b border-forest/15 bg-paper-deep">
      <p className="container-custom py-3 text-sm leading-[1.6] text-soil">
        <span className="font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">Mockup</span>{' '}
        Nothing here is saved or sent. {children}
      </p>
    </div>
  )
}

export default async function RegisterMockPage({ searchParams }: { searchParams: Promise<{ date?: string; full?: string }> }) {
  const { date, full } = await searchParams
  const site = getSite()
  // Mockup: every upcoming date counts as on sale, tentative or not.
  const workshops = getUpcomingWorkshops()
  const w = workshops.find((x) => x.id === date)
  const offers = site.giftCertificates.offers
  const single = offers[0]?.price ?? 75
  const pair = offers[1]?.price ?? 125

  if (!w) {
    return (
      <>
        <MockBanner>Pick any date to see the form.</MockBanner>
        <div className="container-custom max-w-3xl pb-24 pt-16 md:pt-24">
          <Eyebrow tone="clay">Save my seat</Eyebrow>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] md:text-[3.6rem]">
            Pick a date. <em>We&rsquo;ll bring the tree.</em>
          </h1>
          <ol className="mt-12 border-t border-forest/15">
            {workshops.map((x, i) => {
              const venue = x.venue ? getPartner(x.venue) : undefined
              return (
                <li key={x.id} className="border-b border-forest/15">
                  <Link href={`/mockups/register?date=${x.id}`} className="group grid min-h-[44px] grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6">
                    <span className="font-label text-[11px] font-semibold tracking-[0.16em] text-moss">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-display text-[1.6rem] leading-snug text-forest md:text-[1.9rem]">{formatDate(x.date)}</span>
                      <span className="mt-1 block text-sm text-soil">
                        {x.title}
                        {x.start ? ` · ${formatTime(x.start)}` : ''}
                        {venue ? ` · ${venue.name}` : ''}
                      </span>
                    </span>
                    <span className="font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-forest border-b border-forest/60 pb-1 group-hover:border-forest">Choose</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      </>
    )
  }

  const venue = w.venue ? getPartner(w.venue) : undefined
  const soldOut = full === '1'
  const details = [
    w.start && w.end ? `${formatTime(w.start)}–${formatTime(w.end)}` : '',
    venue ? `${venue.name}${venue.location ? `, ${venue.location}` : ''}` : '',
  ].filter(Boolean).join(' · ')

  return (
    <>
      <MockBanner>
        {soldOut ? (
          <>Showing the sold-out version. <Link className="text-clay underline underline-offset-4" href={`/mockups/register?date=${w.id}`}>Show open seats</Link></>
        ) : (
          <>Want to see a full date? <Link className="text-clay underline underline-offset-4" href={`/mockups/register?date=${w.id}&full=1`}>Show it sold out</Link></>
        )}
      </MockBanner>
      <div className="container-custom grid gap-12 pb-24 pt-14 md:grid-cols-12 md:gap-16 md:pt-20">
        <header className="md:col-span-5">
          <Eyebrow tone="clay">{soldOut ? 'Waitlist' : 'Save my seat'}</Eyebrow>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] md:text-[3.4rem]">{formatDate(w.date)}</h1>
          <p className="mt-3 font-display text-[1.6rem] italic leading-snug text-forest">{w.title}</p>
          {details ? <p className="mt-4 text-soil">{details}</p> : null}
          <p className="mt-2 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            {soldOut ? 'Full, for now' : '[SEATS LEFT — from Grist]'}
          </p>
          <div className="mt-8 border-t border-forest/15 pt-6">
            <p className="max-w-[40ch] leading-[1.65] text-forest">
              {soldOut
                ? 'Every seat is taken. Leave your name and we’ll reach out the moment one opens.'
                : 'Two hours. Phone face-down. Just you, some soil, and a tree that’s going home with you.'}
            </p>
          </div>
          <p className="mt-8 text-sm text-soil">
            <Link href="/mockups/register" className="border-b border-forest/40 pb-0.5 hover:border-forest">Pick a different date</Link>
          </p>
        </header>
        <div className="md:col-span-7">
          <RegisterForm workshopId={w.id} single={single} pair={pair} soldOut={soldOut} />
        </div>
      </div>
    </>
  )
}
