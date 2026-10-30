import type { Site, Workshop, Partner } from '@/lib/content'
import { SITE_URL } from '@/lib/site-url'

/** Serialize for a <script type="application/ld+json">; escapes "<" so content can't close the tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

const abs = (path: string) => `${SITE_URL}${encodeURI(path)}`

export function localBusinessJsonLd(site: Site, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description,
    url: SITE_URL,
    email: site.email,
    telephone: site.phone,
    logo: abs('/ZB Logo Transparent.png'),
    image: abs('/og-image.jpg'),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Sanpete County, Utah' },
      ...site.towns.map((name) => ({ '@type': 'City', name })),
    ],
    sameAs: Object.values(site.social).filter(Boolean),
  }
}

/** UTC offset for America/Denver on a calendar date at a given local time, e.g. "-07:00". */
function denverOffset(date: string, time: string): string {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  const asUtc = Date.UTC(y, m - 1, d, hh, mm)
  // Try both candidate offsets; the one whose Denver wall clock matches wins.
  for (const off of [7, 6]) {
    const instant = new Date(asUtc + off * 3_600_000)
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Denver',
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).formatToParts(instant)
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
    if (get('year') === y && get('month') === m && get('day') === d && get('hour') === hh && get('minute') === mm) {
      return `-0${off}:00`
    }
  }
  return '-07:00'
}

export function denverIso(date: string, time: string): string {
  return `${date}T${time}:00${denverOffset(date, time)}`
}

/** Pull dollar amounts out of a label like "$65 solo · $100 pair". */
function parsePrices(label: string): number[] {
  return [...label.matchAll(/\$\s?(\d+(?:\.\d{1,2})?)/g)].map((m) => Number(m[1]))
}

const availability: Record<Workshop['status'], string> = {
  open: 'https://schema.org/InStock',
  full: 'https://schema.org/SoldOut',
  waitlist: 'https://schema.org/LimitedAvailability',
}

export function workshopEventJsonLd(
  w: Workshop,
  venue: Partner | undefined,
  site: Site,
  imagePath: string,
) {
  const prices = parsePrices(w.price)
  const offerBase = {
    ...(w.registrationUrl ? { url: w.registrationUrl } : {}),
    availability: availability[w.status],
    ...(prices.length ? { priceCurrency: 'USD' } : {}),
  }
  const offers =
    prices.length > 1
      ? {
          '@type': 'AggregateOffer',
          ...offerBase,
          lowPrice: Math.min(...prices),
          highPrice: Math.max(...prices),
        }
      : { '@type': 'Offer', ...offerBase, ...(prices.length === 1 ? { price: prices[0] } : {}) }

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: w.title,
    startDate: denverIso(w.date, w.start),
    endDate: denverIso(w.date, w.end),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    ...(venue
      ? {
          location: {
            '@type': 'Place',
            name: venue.name,
            address: {
              '@type': 'PostalAddress',
              ...(venue.location ? { addressLocality: venue.location } : {}),
              addressRegion: 'UT',
              addressCountry: 'US',
            },
          },
        }
      : {}),
    image: abs(imagePath),
    offers,
    organizer: { '@type': 'Organization', name: site.name, url: SITE_URL },
  }
}
