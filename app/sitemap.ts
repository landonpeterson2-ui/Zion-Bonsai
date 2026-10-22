import type { MetadataRoute } from 'next'
import { getSite } from '@/lib/content'
import { SITE_URL } from '@/lib/site-url'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/workshops', '/events', '/our-story', '/care-guide', '/gallery', '/partners', '/contact']
  if (getSite().shopEnabled) routes.push('/shop')

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }))
}
