import siteJson from '@/content/site.json'
import seasonsJson from '@/content/seasons.json'
import workshopsJson from '@/content/workshops.json'
import partnersJson from '@/content/partners.json'
import galleryJson from '@/content/gallery.json'
import faqJson from '@/content/faq.json'
import shopJson from '@/content/shop.json'
import testimonialsJson from '@/content/testimonials.json'
import {
  parseContent,
  siteSchema,
  seasonsSchema,
  workshopsSchema,
  partnersSchema,
  gallerySchema,
  faqSchema,
  shopSchema,
  testimonialsSchema,
  type Site,
  type Season,
  type Workshop,
  type Partner,
  type GalleryItem,
  type FaqItem,
  type Testimonial,
} from './content-schemas'

// Schemas live in ./content-schemas and are also run by scripts/check-content.mjs
// before every build. Parsing here again keeps the getters typed.

export type { Site, Season, Workshop, Partner, GalleryItem, FaqItem, Testimonial }

const site = parseContent('site.json', siteSchema, siteJson)
const seasons = parseContent('seasons.json', seasonsSchema, seasonsJson)
const workshopsFile = parseContent('workshops.json', workshopsSchema, workshopsJson)
const partners = parseContent('partners.json', partnersSchema, partnersJson)
const gallery = parseContent('gallery.json', gallerySchema, galleryJson)
const faq = parseContent('faq.json', faqSchema, faqJson)
const shop = parseContent('shop.json', shopSchema, shopJson)
const testimonials = parseContent('testimonials.json', testimonialsSchema, testimonialsJson)

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

/** Shopify product handles for the /shop page. */
export function getShopHandles(): string[] {
  return shop.handles
}

export function getFaq(): FaqItem[] {
  return faq
}

export function getTestimonials(page: Testimonial['pages'][number]): Testimonial[] {
  return testimonials.testimonials.filter((t) => t.pages.includes(page))
}

/**
 * One quote for a page, advancing each hour. Pages that use it revalidate hourly,
 * so each regeneration shows the next quote with no client-side JS.
 */
export function getRotatingTestimonial(page: Testimonial['pages'][number]): Testimonial | undefined {
  const list = getTestimonials(page)
  if (list.length === 0) return undefined
  return list[Math.floor(Date.now() / 3_600_000) % list.length]
}
