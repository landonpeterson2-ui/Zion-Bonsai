import Link from 'next/link'
import Image from 'next/image'
import { getSite } from '@/lib/content'
import { footerGroups } from './nav'

const linkClass =
  'inline-flex min-h-[44px] min-w-0 max-w-full items-center break-words text-linen/90 underline-offset-4 hover:text-linen hover:underline transition-colors'

const headingClass =
  'mb-2 font-heading text-xs font-semibold uppercase tracking-widest text-linen/80'

export default function Footer() {
  const site = getSite()

  return (
    <footer className="mt-24 bg-soil text-linen">
      <div className="container-custom pb-8 pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/ZB Logo Transparent.png"
              alt="Zion Bonsai"
              width={160}
              height={160}
              className="mb-3 h-24 w-24"
            />
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-linen/80">
              Dirt. Creativity. Connection.
            </p>
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

        <p className="mt-14 font-script text-2xl text-linen/90">Come grow with us.</p>

        <div className="mt-6 flex flex-col gap-1 border-t border-linen/20 pt-5 text-sm text-linen/80 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Zion Bonsai</p>
          <p>{site.area}</p>
        </div>
      </div>
    </footer>
  )
}
