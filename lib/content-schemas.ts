// Shared by lib/content.ts and scripts/check-content.mjs.
// Keep this file free of local imports and TS-only runtime syntax (enums, etc.)
// so plain Node can load it via type stripping.
import { z } from 'zod'

const url = z.string().url()
const nullableUrl = url.nullable()
const seasonName = z.enum(['spring', 'summer', 'fall', 'winter'])

export const siteSchema = z.object({
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
    /** The "Give a workshop" page, linked from tentative dates, Contact and Workshops. */
    giveUrl: z.string().min(1).default('/give'),
    /** What the /give page sells. Prices in whole dollars; keep them the same as Square. */
    offers: z.array(z.object({ name: z.string().min(1), price: z.number().positive(), blurb: z.string().min(1) })).default([]),
    /** Last day (YYYY-MM-DD) a card comes with a free saucer; the line hides itself after. null = no offer. */
    /** Shown on /give only while no date is bookable (all upcoming dates tentative). null = never. */
    bookingNote: z.string().min(1).nullable().default(null),
    saucerOfferEnds: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'saucerOfferEnds must be YYYY-MM-DD').nullable().default(null),
  }),
  /**
   * Sign-ups. mode "form" = Register buttons go to each workshop's Google Form (registrationUrl).
   * mode "site" = Register buttons go to /register on our site (task 61); payment is the Square link after.
   */
  registration: z
    .object({
      mode: z.enum(['form', 'site']).default('form'),
      prices: z.object({ single: z.number().positive(), pair: z.number().positive() }),
      /** Square payment links, shown on /register/thanks only (never elsewhere on the site). */
      payLinks: z.object({ single: nullableUrl, pair: nullableUrl }),
      /** Cloudflare Turnstile site key (public). The secret lives in the Worker secret TURNSTILE_SECRET. */
      turnstileSiteKey: z.string().min(1),
      /** "What to bring" line on the thank-you page and in the confirmation email. */
      whatToBring: z.string().min(1).nullable().default(null),
      /** Level 2 (type "shaping") version, since they bring their own tree. Falls back to whatToBring. */
      whatToBringShaping: z.string().min(1).nullable().default(null),
    })
    .default({ mode: 'form', prices: { single: 75, pair: 125 }, payLinks: { single: null, pair: null }, turnstileSiteKey: '1x00000000000000000000AA', whatToBring: null, whatToBringShaping: null }),
  shopEnabled: z.boolean(),
  season: seasonName,
})

export const seasonEntrySchema = z.object({
  draft: z.boolean().optional(),
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  lede: z.string().min(1),
  photo: z.string().nullable(),
  photoAlt: z.string().nullable(),
})
export const seasonsSchema = z.object({
  spring: seasonEntrySchema,
  summer: seasonEntrySchema,
  fall: seasonEntrySchema,
  winter: seasonEntrySchema,
})

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'time must be HH:MM (24-hour)')

export const workshopSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(['intro', 'shaping', 'popup']),
    title: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
    start: time.optional(),
    end: time.optional(),
    venue: z.string().min(1).optional(),
    price: z.string().min(1).optional(),
    registrationUrl: nullableUrl.default(null),
    status: z.enum(['open', 'full', 'waitlist', 'tentative']),
  })
  .superRefine((w, ctx) => {
    if (w.status === 'tentative') return
    for (const key of ['start', 'end', 'venue', 'price'] as const) {
      if (!w[key]) ctx.addIssue({ code: 'custom', path: [key], message: `${key} is required unless status is "tentative"` })
    }
  })
export const workshopsSchema = z.object({
  workshops: z.array(workshopSchema),
})

export const partnerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  blurb: z.string().min(1),
  url: nullableUrl,
  instagram: nullableUrl,
  location: z.string().nullable(),
  /** Google Maps link for a venue (Grist Organizations.Map_Url). */
  mapUrl: nullableUrl.default(null),
  // Logo file in public/partners/ (trimmed, tinted PNG). Width/height are the file's pixel size.
  logo: z.object({ src: z.string().min(1), width: z.number().int(), height: z.number().int() }).nullable().optional(),
})
export const partnersSchema = z.array(partnerSchema)

export const galleryItemSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string(),
  // collection = our own trees (e.g. Cheesecake), not for sale
  status: z.enum(['sold', 'available', 'workshop', 'collection']),
  featured: z.boolean(),
  // Keeps the photo out of the Gallery page while other pages can still use it.
  hideInGallery: z.boolean().optional(),
  // Which edge to keep when a gallery tile crops the photo.
  focus: z.enum(['top', 'bottom']).optional(),
})
export const gallerySchema = z.array(galleryItemSchema)

// Shopify product handles (Shopify Admin > Products > URL handle). Empty = shop shows its empty state.
export const shopSchema = z.object({ handles: z.array(z.string().min(1)) })

export const testimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  town: z.string().min(1).optional(),
  note: z.string().optional(),
  // The attendee's exact words. Excerpts are whole consecutive sentences, never reworded.
  quote: z.string().min(1),
  pages: z.array(z.enum(['home', 'workshops', 'workshops-top', 'events'])),
})
export const testimonialsSchema = z.object({
  _note: z.string().optional(),
  testimonials: z.array(testimonialSchema),
})

export const faqItemSchema = z.object({ q: z.string().min(1), a: z.string().min(1) })
export const faqSchema = z.array(faqItemSchema)

/** Parse data against a schema; throws a readable error naming the file and fields. */
export function parseContent<T extends z.ZodTypeAny>(
  file: string,
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n')
    throw new Error(`Invalid content in content/${file}:\n${issues}`)
  }
  return result.data
}

/** File name -> schema, used by the prebuild check. */
export const contentFiles = {
  'site.json': siteSchema,
  'seasons.json': seasonsSchema,
  'workshops.json': workshopsSchema,
  'partners.json': partnersSchema,
  'gallery.json': gallerySchema,
  'faq.json': faqSchema,
  'shop.json': shopSchema,
  'testimonials.json': testimonialsSchema,
} as const

export type Site = z.infer<typeof siteSchema>
export type Season = z.infer<typeof seasonEntrySchema>
export type Workshop = z.infer<typeof workshopSchema>
export type Partner = z.infer<typeof partnerSchema>
export type GalleryItem = z.infer<typeof galleryItemSchema>
export type Testimonial = z.infer<typeof testimonialSchema>
export type FaqItem = z.infer<typeof faqItemSchema>
