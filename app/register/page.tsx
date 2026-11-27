import type { Metadata } from 'next'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import { formatDate, formatTime } from '@/components/ui/NextWorkshop'
import RegisterForm from '@/components/register/RegisterForm'
import { getPartner, getSite } from '@/lib/content'
import { getSignupWorkshops, signupKind } from '@/lib/registration'

export const metadata: Metadata = { title: 'Save my seat', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams
  const site = getSite()
  const workshops = getSignupWorkshops()
  const w = workshops.find((x) => x.id === date)
  const { single, pair } = site.registration.prices

  if (!w) {
    return (
      <div className="container-custom max-w-3xl pb-24 pt-16 md:pt-24">
        <Eyebrow tone="clay">Save my seat</Eyebrow>
        <h1 className="mt-5 text-[2.6rem] leading-[1.05] md:text-[3.6rem]">
          Pick a date. <em>We&rsquo;ll bring the tree.</em>
        </h1>
        {workshops.length === 0 ? (
          <p className="mt-8 max-w-[58ch] leading-[1.65] text-soil">
            No dates are open for sign-up right now. New ones go up soon; email{' '}
            <a href={`mailto:${site.email}`} className="text-clay underline underline-offset-4 hover:text-clay-dark">{site.email}</a> and we&rsquo;ll tell you first.
          </p>
        ) : (
          <ol className="mt-12 border-t border-forest/15">
            {workshops.map((x, i) => {
              const venue = x.venue ? getPartner(x.venue) : undefined
              return (
                <li key={x.id} className="border-b border-forest/15">
                  <Link href={`/register?date=${encodeURIComponent(x.id)}`} className="group grid min-h-[44px] grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6">
                    <span className="font-label text-[11px] font-semibold tracking-[0.16em] text-moss">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-display text-[1.6rem] leading-snug text-forest md:text-[1.9rem]">{formatDate(x.date)}</span>
                      <span className="mt-1 block text-sm text-soil">
                        {x.title}
                        {x.start ? ` · ${formatTime(x.start)}` : ''}
                        {venue ? ` · ${venue.name}` : ''}
                        {signupKind(x) === 'waitlist' ? ' · Full, waitlist' : ''}
                      </span>
                    </span>
                    <span className="border-b border-forest/60 pb-1 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-forest group-hover:border-forest">Choose</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    )
  }

  const venue = w.venue ? getPartner(w.venue) : undefined
  const waitlist = signupKind(w) === 'waitlist'
  const details = [
    w.start && w.end ? `${formatTime(w.start)}–${formatTime(w.end)}` : '',
    venue ? `${venue.name}${venue.location ? `, ${venue.location}` : ''}` : '',
  ].filter(Boolean).join(' · ')

  return (
    <div className="container-custom grid gap-12 pb-24 pt-14 md:grid-cols-12 md:gap-16 md:pt-20">
      <header className="md:col-span-5">
        <Eyebrow tone="clay">{waitlist ? 'Waitlist' : 'Save my seat'}</Eyebrow>
        <h1 className="mt-5 text-[2.6rem] leading-[1.05] md:text-[3.4rem]">{formatDate(w.date)}</h1>
        <p className="mt-3 font-display text-[1.6rem] italic leading-snug text-forest">{w.title}</p>
        {details ? <p className="mt-4 text-soil">{details}</p> : null}
        {waitlist ? (
          <p className="mt-2 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">Full, for now</p>
        ) : null}
        <div className="mt-8 border-t border-forest/15 pt-6">
          <p className="max-w-[40ch] leading-[1.65] text-forest">
            {waitlist
              ? 'Every seat is taken. Leave your name and we’ll reach out the moment one opens.'
              : 'Two hours with your hands in the soil. You go home with a dwarf jade in a custom, hand-thrown pot.'}
          </p>
        </div>
        <p className="mt-8 text-sm text-soil">
          <Link href="/register" className="border-b border-forest/40 pb-0.5 hover:border-forest">Pick a different date</Link>
        </p>
      </header>
      <div className="md:col-span-7">
        <RegisterForm
          workshopId={w.id}
          single={single}
          pair={pair}
          waitlist={waitlist}
          turnstileSiteKey={site.registration.turnstileSiteKey}
          contactEmail={site.email}
        />
      </div>
    </div>
  )
}
