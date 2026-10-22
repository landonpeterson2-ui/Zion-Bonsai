/** Base URL for absolute links (sitemap, robots). Never localhost by default. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL || 'https://zionbonsai.com'
).replace(/\/$/, '')
