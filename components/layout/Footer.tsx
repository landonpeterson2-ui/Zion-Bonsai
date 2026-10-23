import Link from 'next/link'
import Image from 'next/image'
import { getSite } from '@/lib/content'
import { footerGroups } from './nav'

const linkClass =
  'inline-flex min-h-[44px] min-w-0 max-w-full items-center break-words text-parchment underline-offset-4 hover:text-linen hover:underline transition-colors'

const headingClass =
  'mb-2 font-label text-xs font-semibold uppercase tracking-widest text-parchment'

export default function Footer() {
  const site = getSite()

  return (
    <footer className="mt-24 bg-bark text-parchment [&_:focus-visible]:outline-parchment">
      <div className="container-custom pb-8 pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/zb-logo-wide.png"
              alt="Zion Bonsai"
              width={654}
              height={360}
              className="-ml-1 mb-4 h-20 w-auto"
            />
            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-parchment">
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

        <p className="mt-14 font-display text-[1.75rem] italic text-parchment">Come grow with us.</p>

        <div className="mt-6 flex flex-col gap-1 border-t border-parchment/25 pt-5 text-sm text-parchment sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Zion Bonsai</p>
          <p>{site.area}</p>
        </div>
      </div>
    </footer>
  )
}
