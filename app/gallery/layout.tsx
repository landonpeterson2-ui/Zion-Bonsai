import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos of Zion Bonsai plants, workshops, and the community we\'re building in Central Utah.',
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
