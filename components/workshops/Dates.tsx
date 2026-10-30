import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { formatDate, formatTime } from '@/components/ui/NextWorkshop'
import { getPartner, getSite, getUpcomingWorkshops } from '@/lib/content'
import type { Workshop } from '@/lib/content'

const typeLabel: Record<Workshop['type'], string> = {
  intro: 'Intro workshop',
  shaping: 'Return shaping session',
  popup: 'Pop-up',
}

const btn =
  'inline-flex min-h-[44px] items-center rounded-[3px] border border-forest/60 px-6 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:bg-forest hover:text-linen'

const plain = 'font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-soil'

/** full and waitlist behave the same: a waitlist link if there is a URL, otherwise "Full". */
function statusNote(w: Workshop) {
  if (w.status === 'open') return ''
  return w.registrationUrl ? ' · Waitlist' : ' · Full'
}

function Action({ w }: { w: Workshop }) {
  const closed = w.status !== 'open'
  if (!w.registrationUrl) {
    return <p className={plain}>{closed ? 'Full' : 'Registration opens soon'}</p>
  }
  return (
    <a href={w.registrationUrl} target="_blank" rel="noopener noreferrer" className={closed ? btn : 'btn-primary'}>
      {closed ? 'Join the waitlist' : 'Register'}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  )
}

export default function Dates() {
  const upcoming = getUpcomingWorkshops()
  const site = getSite()
  const interest = site.interestListUrl ?? `mailto:${site.email}?subject=Bonsai%20workshop%20interest%20list`

  return (
    <Section id="dates">
      <div className="container-custom">
        <SectionHeading eyebrow="Upcoming dates">Pull up a chair.</SectionHeading>
        {upcoming.length > 0 ? (
          <>
            <ul className="mt-10 border-t border-forest/15">
              {upcoming.map((w) => {
                const venue = getPartner(w.venue)
                return (
                  <li
                    key={w.id}
                    className="grid gap-6 border-b border-forest/15 py-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12"
                  >
                    <div>
                      <Eyebrow tone="clay">{typeLabel[w.type]}</Eyebrow>
                      <h3 className="mt-2 text-[1.6rem] leading-snug md:text-[1.9rem]">{w.title}</h3>
                      <p className="mt-2 text-soil">
                        {formatDate(w.date)} &middot; {formatTime(w.start)}&ndash;{formatTime(w.end)}
                      </p>
                      <p className="mt-1 text-soil">
                        {venue ? (
                          venue.url ? (
                            <a href={venue.url} className="underline underline-offset-4 hover:text-forest">{venue.name}</a>
                          ) : (
                            venue.name
                          )
                        ) : null}
                        {venue?.location ? `, ${venue.location}` : ''}
                        {' · '}
                        {w.price}
                        {statusNote(w)}
                      </p>
                    </div>
                    <Action w={w} />
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <div className="mt-10 max-w-xl border-t border-forest/15 pt-8">
            <p className="font-display text-[1.9rem] leading-tight text-forest">New dates coming soon.</p>
            <p className="mt-3 leading-[1.7] text-soil">
              Want to hear first? Join the interest list and we&rsquo;ll tell you when the next table opens up.
            </p>
            <a href={interest} className="btn-primary mt-6">Join the interest list</a>
          </div>
        )}
      </div>
    </Section>
  )
}
