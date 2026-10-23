import { getGallery, type GalleryItem } from '@/lib/content'

export type TreeItem = {
  src: string
  alt: string
  caption: string
  /** Short status label shown under the photo and in the lightbox. */
  label: string
  featured: boolean
}

function labelFor(status: GalleryItem['status']): string {
  // Cheesecake (status "collection") is ours, not sold, so he never gets the "found a home" tag.
  return status === 'collection' ? 'Ours, not for sale' : 'Found a home'
}

/**
 * Finished trees only (sold + collection; workshop photos live on the Workshops page).
 * Ordered so featured trees land in the large slot (first of every five) and Cheesecake leads.
 */
export function getTreeItems(): TreeItem[] {
  const all = getGallery()
    .filter((g) => g.status === 'sold' || g.status === 'collection')
    .map((g) => ({
      src: g.src,
      alt: g.alt,
      caption: g.caption,
      label: labelFor(g.status),
      featured: g.featured,
      collection: g.status === 'collection',
    }))

  const featured = all.filter((g) => g.featured).sort((a, b) => Number(b.collection) - Number(a.collection))
  const rest = all.filter((g) => !g.featured)
  const total = all.length
  const bigSlots = Math.ceil(total / 5)
  const out: TreeItem[] = []
  let f = 0
  let r = 0
  for (let i = 0; i < total; i++) {
    const wantsBig = i % 5 === 0 && f < Math.min(bigSlots, featured.length)
    const pick = wantsBig || r >= rest.length ? featured[f++] : rest[r++]
    out.push(pick)
  }
  return out.map(({ src, alt, caption, label, featured: isFeatured }) => ({
    src,
    alt,
    caption,
    label,
    featured: isFeatured,
  }))
}
