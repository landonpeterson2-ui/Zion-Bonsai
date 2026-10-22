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
      { source: '/gift', destination: '/contact#gift', permanent: true },
    ]
  },
}

module.exports = nextConfig
