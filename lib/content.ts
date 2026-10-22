import siteJson from '@/content/site.json'
import seasonsJson from '@/content/seasons.json'
import workshopsJson from '@/content/workshops.json'
import partnersJson from '@/content/partners.json'
import galleryJson from '@/content/gallery.json'
import faqJson from '@/content/faq.json'
import shopJson from '@/content/shop.json'
import {
  parseContent,
  siteSchema,
  seasonsSchema,
  workshopsSchema,
  partnersSchema,
  gallerySchema,
  faqSchema,
  shopSchema,
  type Site,
  type Season,
  type Workshop,
  type Partner,
  type GalleryItem,
  type FaqItem,
} from './content-schemas'

// Schemas live in ./content-schemas and are also run by scripts/check-content.mjs
// before every build. Parsing here again keeps the getters typed.

export type { Site, Season, Workshop, Partner, GalleryItem, FaqItem }

const site = parseContent('site.json', siteSchema, siteJson)
const seasons = parseContent('seasons.json', seasonsSchema, seasonsJson)
const workshopsFile = parseContent('workshops.json', workshopsSchema, workshopsJson)
const partners = parseContent('partners.json', partnersSchema, partnersJson)
const gallery = parseContent('gallery.json', gallerySchema, galleryJson)
const faq = parseContent('faq.json', faqSchema, faqJson)
const shop = parseContent('shop.json', shopSchema, shopJson)

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
