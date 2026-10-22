import Link from 'next/link'
import Image from 'next/image'
import { getSite } from '@/lib/content'
import { footerGroups } from './nav'

const linkClass =
  'inline-flex min-h-[44px] items-center text-linen/90 underline-offset-4 hover:text-linen hover:underline transition-colors'

const headingClass =
  'mb-2 font-heading text-xs font-semibold uppercase tracking-widest text-linen/80'

export default function Footer() {
  const site = getSite()

  return (
    <footer className="relative mt-16 bg-soil text-linen">
      {/* Irregular torn edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-6 w-full -translate-y-[calc(100%-1px)] text-soil sm:h-8"
        fill="currentColor"
      >
        <path d="M0 40 L0 22 C40 10 70 30 120 18 S190 2 250 16 S330 34 390 20 S470 4 530 18 S620 36 690 22 S770 6 830 20 S920 34 980 18 S1070 4 1130 20 S1180 26 1200 14 L1200 40 Z" />
      </svg>

      <div className="container-custom pb-8 pt-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/ZB Logo Transparent.png"
              alt="Zion Bonsai"
              width={160}
              height={160}
              className="mb-3 h-24 w-24"
            />
            <p className="font-script text-2xl">Dirt. Creativity. Connection.</p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className={headingClass}>{group.title}</h2>
              <ul>
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className={headingClass}>Connect</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone}`} className={linkClass}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 font-script text-3xl">Come grow with us.</p>

        <div className="mt-6 flex flex-col gap-1 border-t border-linen/20 pt-5 text-sm text-linen/80 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Zion Bonsai</p>
          <p>{site.area}</p>
        </div>
      </div>
    </footer>
  )
}
