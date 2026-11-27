// eslint-disable-next-line @typescript-eslint/no-require-imports
const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare')

// Lets `next dev` see Cloudflare bindings (D1) and .dev.vars.
initOpenNextCloudflareForDev()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/about', destination: '/our-story', permanent: true },
      // :slug+ (not *) so /workshops itself never redirects to itself
      { source: '/workshops/:slug+', destination: '/workshops', permanent: true },
      { source: '/gift', destination: '/give', permanent: true },
      { source: '/gift-cards', destination: '/give', permanent: true },
    ]
  },
}

module.exports = nextConfig
