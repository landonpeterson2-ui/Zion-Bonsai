import type { Metadata } from 'next'

export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Zion Bonsai logo beside dwarf jade bonsai on a sunlit shelf',
}

type PageMetadataInput = {
  /** Route path, e.g. '/workshops'. Use '' or '/' for home. */
  path: string
  title: string
  description: string
  /** Use the title as written, without the " | Zion Bonsai" template suffix. */
  absoluteTitle?: boolean
  robots?: Metadata['robots']
}

/**
 * Per-page metadata: title, description, canonical, and matching Open Graph / Twitter tags.
 * Pages that set openGraph replace the layout's wholesale, so the shared image is repeated here.
 */
export function pageMetadata({ path, title, description, absoluteTitle, robots }: PageMetadataInput): Metadata {
  const url = path === '/' ? '/' : path
  const shareTitle = absoluteTitle ? title : `${title} | Zion Bonsai`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: 'Zion Bonsai',
      images: [OG_IMAGE],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [OG_IMAGE.url],
    },
    ...(robots !== undefined ? { robots } : {}),
  }
}
