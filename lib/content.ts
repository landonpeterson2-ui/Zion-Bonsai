import { z } from 'zod'
import siteJson from '@/content/site.json'
import seasonsJson from '@/content/seasons.json'
import workshopsJson from '@/content/workshops.json'
import partnersJson from '@/content/partners.json'
import galleryJson from '@/content/gallery.json'
import faqJson from '@/content/faq.json'

// Schemas are parsed at module load, so bad data fails the build loudly.

const url = z.string().url()
const nullableUrl = url.nullable()
const seasonName = z.enum(['spring', 'summer', 'fall', 'winter'])

const siteSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  area: z.string().min(1),
  towns: z.array(z.string().min(1)),
  social: z.object({ instagram: url, facebook: url }),
  interestListUrl: nullableUrl,
  eventsInquiryUrl: nullableUrl.default(null),
  giftCertificates: z.object({
    mode: z.enum(['inquiry', 'online']),
    url: nullableUrl,
  }),
  shopEnabled: z.boolean(),
  season: seasonName,
})

const seasonEntrySchema = z.object({
  draft: z.boolean().optional(),
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  lede: z.string().min(1),
  photo: z.string().nullable(),
  photoAlt: z.string().nullable(),
})
const seasonsSchema = z.object({
  spring: seasonEntrySchema,
  summer: seasonEntrySchema,
  fall: seasonEntrySchema,
  winter: seasonEntrySchema,
})

const workshopSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['intro', 'shaping', 'popup']),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  start: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'time must be HH:MM (24-hour)'),
  end: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'time must be HH:MM (24-hour)'),
  venue: z.string().min(1),
  price: z.string().min(1),
  registrationUrl: nullableUrl,
  status: z.enum(['open', 'full', 'waitlist']),
})
const workshopsSchema = z.object({
  registrationNote: z.string().min(1),
  workshops: z.array(workshopSchema),
})

const partnerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  blurb: z.string().min(1),
  url: nullableUrl,
  instagram: nullableUrl,
  location: z.string().nullable(),
})

const galleryItemSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string(),
  status: z.enum(['sold', 'available', 'workshop']),
  featured: z.boolean(),
})

const faqSchema = z.array(z.object({ q: z.string().min(1), a: z.string().min(1) }))

function parse<T extends z.ZodTypeAny>(file: string, schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n')
    throw new Error(`Invalid content in content/${file}:\n${issues}`)
  }
  return result.data
}

const site = parse('site.json', siteSchema, siteJson)
const seasons = parse('seasons.json', seasonsSchema, seasonsJson)
const workshopsFile = parse('workshops.json', workshopsSchema, workshopsJson)
const partners = parse('partners.json', z.array(partnerSchema), partnersJson)
const gallery = parse('gallery.json', z.array(galleryItemSchema), galleryJson)
const faq = parse('faq.json', faqSchema, faqJson)

export type Site = z.infer<typeof siteSchema>
export type Season = z.infer<typeof seasonEntrySchema>
export type Workshop = z.infer<typeof workshopSchema>
export type Partner = z.infer<typeof partnerSchema>
export type GalleryItem = z.infer<typeof galleryItemSchema>
export type FaqItem = z.infer<typeof faqSchema>[number]

export function getSite(): Site {
  return site
}

/** The season named in site.json. */
export function getSeason(): Season {
  return seasons[site.season]
}

/** Today's date (YYYY-MM-DD) in America/Denver. */
function todayInDenver(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Denver',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export function getWorkshopsNote(): string {
  return workshopsFile.registrationNote
}

/** Workshops dated today or later (America/Denver), soonest first. */
export function getUpcomingWorkshops(): Workshop[] {
  const today = todayInDenver()
  return workshopsFile.workshops
    .filter((w) => w.date >= today)
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start))
}

export function getPartners(): Partner[] {
  return partners
}

export function getPartner(id: string): Partner | undefined {
  return partners.find((p) => p.id === id)
}

export function getGallery(): GalleryItem[] {
  return gallery
}

export function getFaq(): FaqItem[] {
  return faq
}
