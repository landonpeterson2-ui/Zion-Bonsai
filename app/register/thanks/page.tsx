import type { Metadata } from 'next'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import { formatDate, formatTime } from '@/components/ui/NextWorkshop'
import { getPartner, getSite, getUpcomingWorkshops } from '@/lib/content'
import { getSignup } from '@/lib/signups'

export const metadata: Metadata = { title: 'You’re in', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const ymd = (iso: string, hhmm: string) => `${iso.replace(/-/g, '')}T${hhmm.replace(':', '')}00`
const payBtn =
  'inline-flex min-h-[48px] items-center rounded-[3px] bg-clay px-8 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-linen transition-colors hover:bg-clay-dark'

function PayButton({ href, amount }: { href: string | null; amount: number }) {
  return href ? (
    <a href={href} className={payBtn}>Pay ${amount} to confirm</a>
  ) : (
    <p className="text-soil">We&rsquo;ll email you how to pay ${amount} and confirm your seat.</p>
  )
}

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams
  const site = getSite()
  const { prices, payLinks } = site.registration
  const row = id && id.length <= 64 ? await getSignup(id) : null

  const w = row ? getUpcomingWorkshops().find((x) => x.id === row.workshop_id) : undefined
  const seats = row?.seats ?? 1
  const waitlist = row?.waitlist === 1
  const gift = row?.gift_card === 1
  const first = (row?.name ?? '').trim().split(/\s+/)[0]?.slice(0, 40) ?? ''
  const venue = w?.venue ? getPartner(w.venue) : undefined
  const payHref = seats === 2 ? payLinks.pair : payLinks.single

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
    <div className="container-custom max-w-3xl pb-24 pt-16 md:pt-24">
      <Eyebrow tone="clay">{waitlist ? 'On the waitlist' : row ? 'Seat saved' : 'Almost there'}</Eyebrow>
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
        <p className="mt-6 max-w-[58ch] leading-[1.65] text-soil">Nothing to pay. If a seat opens up, we&rsquo;ll get in touch.</p>
      ) : row ? (
        <div className="mt-10 border-y border-forest/15 py-8">
          <PayButton href={payHref} amount={seats === 2 ? prices.pair : prices.single} />
          <p className="mt-4 max-w-[58ch] text-sm leading-[1.65] text-soil">
            Your seat is held as Pending until you pay.{' '}
            {gift
              ? 'Use your gift card at checkout. If it doesn’t cover everything, the rest goes on any card.'
              : 'Paying confirms your seat.'}
          </p>
        </div>
      ) : (
        <div className="mt-10 border-y border-forest/15 py-8">
          <p className="max-w-[58ch] leading-[1.65] text-soil">
            If you signed up for a seat, pay below to confirm it. One seat or two? Pick the one that matches.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {payLinks.single ? <a href={payLinks.single} className={payBtn}>One seat, ${prices.single}</a> : null}
            {payLinks.pair ? <a href={payLinks.pair} className={payBtn}>Two seats, ${prices.pair}</a> : null}
          </div>
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
          <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">{site.registration.whatToBring ?? 'Just yourself.'}</p>
        </li>
        <li className="border-b border-forest/15 py-6">
          <h2 className="text-[1.55rem] leading-snug">Getting there.</h2>
          <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">
            {venue ? `${venue.name}${venue.location ? `, ${venue.location}` : ''}.` : 'We’ll send directions.'}
          </p>
          {venue?.mapUrl ? (
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block border-b border-forest/60 pb-1 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-forest hover:border-forest"
            >
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </li>
      </ul>

      <p className="mt-12 font-display text-[1.8rem] italic text-forest">Come grow with us.</p>
      <p className="mt-6 text-sm text-soil">
        <Link href="/workshops" className="border-b border-forest/40 pb-0.5 hover:border-forest">Back to workshops</Link>
      </p>
    </div>
  )
}
