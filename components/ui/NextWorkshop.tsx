import Link from 'next/link'
import Eyebrow from './Eyebrow'
import { getPartner, getUpcomingWorkshops } from '@/lib/content'

export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC',
  })
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, '0')}` : ''}${suffix}`
}

/** Bordered next-date block. The card is paper, so the clay eyebrow is fine even on a paper-deep section. */
export default function NextWorkshop({ className = '' }: { className?: string }) {
  const next = getUpcomingWorkshops()[0]
  const venue = next ? getPartner(next.venue) : undefined

  return (
    <div className={`flex flex-col gap-6 border border-forest/20 bg-paper p-6 sm:flex-row sm:items-center sm:justify-between md:p-8 ${className}`}>
      {next ? (
        <div>
          <Eyebrow tone="clay">Next workshop</Eyebrow>
          <p className="mt-2 font-display text-[1.9rem] font-medium leading-tight text-forest">{formatDate(next.date)}</p>
          <p className="mt-1 text-sm text-soil">
            {formatTime(next.start)}&ndash;{formatTime(next.end)}
            {venue ? ` · ${venue.name}${venue.location ? `, ${venue.location}` : ''}` : ''}
          </p>
        </div>
      ) : (
        <p className="font-display text-2xl text-forest">New dates soon.</p>
      )}
      <Link href="/workshops#dates" className="btn-primary shrink-0">See dates</Link>
    </div>
  )
}
