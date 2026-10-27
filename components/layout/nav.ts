export type NavItem = {
  label: string
  href: string
  /** Only shown when `shopEnabled` is true in content/site.json. */
  requiresShop?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Workshops', href: '/workshops' },
  { label: 'Private events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Shop', href: '/shop', requiresShop: true },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Care Guide', href: '/care-guide' },
]

export const bookHref = '/workshops#dates'

export function getNavItems(shopEnabled: boolean): NavItem[] {
  return navItems.filter((item) => !item.requiresShop || shopEnabled)
}

export const footerGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Visit',
    links: [
      { label: 'Workshops', href: '/workshops' },
      { label: 'Events', href: '/events' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Care Guide', href: '/care-guide' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/our-story' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]
