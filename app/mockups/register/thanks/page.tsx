import type { Metadata } from 'next'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import { formatDate, formatTime } from '@/components/ui/NextWorkshop'
import { getPartner, getSite, getUpcomingWorkshops } from '@/lib/content'

export const metadata: Metadata = { title: 'You’re in (mockup)', robots: { index: false, follow: false } }
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

const ymd = (iso: string, hhmm: string) => `${iso.replace(/-/g, '')}T${hhmm.replace(':', '')}00`

export default async function ThanksMock({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; seats?: string; first?: string; gift?: string; waitlist?: string }>
}) {
  const sp = await searchParams
  const site = getSite()
  const w = getUpcomingWorkshops().find((x) => x.id === sp.date)
  const seats = sp.seats === '2' ? 2 : 1
  const offers = site.giftCertificates.offers
  const price = seats === 2 ? offers[1]?.price ?? 125 : offers[0]?.price ?? 75
  const first = (sp.first || '').slice(0, 40)
  const waitlist = sp.waitlist === '1'
  const venue = w?.venue ? getPartner(w.venue) : undefined

  const ics = w && w.start && w.end
    ? [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Zion Bonsai//Workshop//EN', 'BEGIN:VEVENT',
        `UID:${w.id}@zionbonsai.com`,
        `DTSTART;TZID=America/Denver:${ymd(w.date, w.start)}`,
        `DTEND;TZID=America/Denver:${ymd(w.date, w.end)}`,
        `SUMMARY:Zion Bonsai — ${w.title}`,
        venue ? `LOCATION:${venue.name}${venue.location ? ', ' + venue.location : ''}` : '',
        'DESCRIPTION:Phone face-down. Tree waiting.',
        'END:VEVENT', 'END:VCALENDAR',
      ].filter(Boolean).join('\r\n')
    : null

  return (
    <>
      <MockBanner>
        The pay button would open the {seats === 2 ? 'two-seat' : 'one-seat'} Square link.{' '}
        <Link className="text-clay underline underline-offset-4" href="/mockups/register">Start over</Link>
      </MockBanner>
      <div className="container-custom max-w-3xl pb-24 pt-16 md:pt-24">
        <Eyebrow tone="clay">{waitlist ? 'On the waitlist' : 'Seat saved'}</Eyebrow>
        <h1 className="mt-5 text-[2.8rem] leading-[1.03] md:text-[4rem]">
          {waitlist ? (
            <>You&rsquo;re on the list{first ? `, ${first}` : ''}. <em>We&rsquo;ll be in touch.</em></>
          ) : (
            <>You&rsquo;re in{first ? `, ${first}` : ''}. <em>Almost.</em></>
          )}
        </h1>

        {w ? (
          <p className="mt-6 text-lg leading-[1.65] text-forest">
            {formatDate(w.date)}
            {w.start && w.end ? `, ${formatTime(w.start)}–${formatTime(w.end)}` : ''}
            {venue ? ` at ${venue.name}` : ''}. {seats === 2 ? 'Two seats.' : 'One seat.'}
          </p>
        ) : null}

        {waitlist ? (
          <p className="mt-6 max-w-[58ch] leading-[1.65] text-soil">
            Nothing to pay. If a seat opens up, we&rsquo;ll get in touch.
          </p>
        ) : (
          <div className="mt-10 border-y border-forest/15 py-8">
            <a
              href="#"
              className="inline-flex min-h-[48px] items-center rounded-[3px] bg-clay px-8 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-linen transition-colors hover:bg-clay-dark"
            >
              Pay ${price} to confirm
            </a>
            <p className="mt-4 max-w-[58ch] text-sm leading-[1.65] text-soil">
              {sp.gift === '1'
                ? 'Use your gift card at checkout. If it doesn’t cover everything, the rest goes on any card.'
                : 'Paying confirms your seat.'}
            </p>
          </div>
        )}

        <ul className="mt-10 border-t border-forest/15">
          {ics ? (
            <li className="border-b border-forest/15 py-6">
              <h2 className="text-[1.55rem] leading-snug">Put it on the calendar.</h2>
              <a
                href={`data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`}
                download="zion-bonsai-workshop.ics"
                className="mt-3 inline-block border-b border-forest/60 pb-1 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-forest hover:border-forest"
              >
                Add to calendar
              </a>
            </li>
          ) : null}
          <li className="border-b border-forest/15 py-6">
            <h2 className="text-[1.55rem] leading-snug">What to bring.</h2>
            <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">[WHAT TO BRING — Landon and Cass to confirm]</p>
          </li>
          <li className="border-b border-forest/15 py-6">
            <h2 className="text-[1.55rem] leading-snug">Getting there.</h2>
            <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">[PARKING AND DIRECTIONS — {venue?.name ?? 'venue'}]</p>
          </li>
        </ul>

        <p className="mt-12 font-display text-[1.8rem] italic text-forest">Come grow with us.</p>
      </div>
    </>
  )
}
