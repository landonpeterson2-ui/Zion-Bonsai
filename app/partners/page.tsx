import type { Metadata } from 'next'
import Image from 'next/image'
import Eyebrow from '@/components/ui/Eyebrow'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import { getPartners, type Partner } from '@/lib/content'
import { getPhoto } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Partners',
  description:
    'Zion Bonsai workshops are a local collaboration: handmade pots from Taya, a home at Sweet Roots Farm & Flora in Manti, and neighbors who welcomed us early.',
}

const linkClass =
  'inline-flex min-h-[44px] items-center border-b border-forest/60 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:border-forest'

/** Only partners with a genuine photo of their work get one; everyone else gets a labeled placeholder. */
const partnerPhotos: Record<string, string> = {
  'tayas-clay': 'tayas-handmade-pots',
  'sweet-roots': 'partner-sweet-roots-garden',
  'thistle-honey': 'partner-thistle-honey-shelf',
}

function partnerPhoto(id: string) {
  const name = partnerPhotos[id]
  if (!name) return null
  const p = getPhoto(name)
  return { src: p.src, alt: p.alt, caption: p.caption }
}

function PhotoSlot({ partner }: { partner: Partner }) {
  const photo = partnerPhoto(partner.id)
  if (photo) {
    return (
      <Photo
        src={photo.src}
        alt={photo.alt}
        caption={photo.caption}
        aspect="aspect-[4/5]"
        sizes="(min-width: 768px) 40vw, 100vw"
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={`Photo placeholder for ${partner.name}`}
      className="flex aspect-[4/5] items-center justify-center bg-sandstone/40 p-8 text-center"
    >
      <p className="font-label text-[11px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-soil">
        [PHOTO — {partner.name}]
      </p>
    </div>
  )
}

export default function PartnersPage() {
  const partners = getPartners()
  return (
    <>
      <header className="container-custom pb-16 pt-16 md:pb-24 md:pt-24">
        <Eyebrow>Partners</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[2.8rem] leading-[1.02] md:text-[4.25rem]">
          A workshop built by <em>the neighbors.</em>
        </h1>
        <p className="mt-6 max-w-xl leading-[1.7] text-forest/90">
          The pot, the room and the people who made us feel welcome all come from right here in Utah. Zion Bonsai is a
          local collaboration, and they are why the table is worth sitting at to connect with tiny trees and those
          around you.
        </p>
      </header>

      {partners.map((p, i) => {
        const flip = i % 2 === 1
        const links = [
          p.url ? { label: 'Website', href: p.url } : null,
          p.instagram ? { label: 'Instagram', href: p.instagram } : null,
        ].filter((l): l is { label: string; href: string } => l !== null)
        return (
          <Section key={p.id} id={p.id} tone={flip ? 'paper-deep' : 'paper'} bordered={!flip}>
            <div className="container-custom grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <Reveal className={flip ? 'md:order-2 md:col-span-5' : 'md:col-span-5'}>
                <PhotoSlot partner={p} />
              </Reveal>
              <Reveal className={flip ? 'md:order-1 md:col-span-7' : 'md:col-span-7'}>
                {p.logo ? (
                  // Decorative: the h2 below names the partner. Wide wordmarks sit lower than tall marks
                  // so both read at a similar visual weight.
                  <Image
                    src={p.logo.src}
                    alt=""
                    width={p.logo.width}
                    height={p.logo.height}
                    sizes="240px"
                    className={`mb-8 w-auto ${p.logo.width / p.logo.height > 2 ? 'h-14 md:h-16' : 'h-32 md:h-40'}`}
                  />
                ) : null}
                <Eyebrow>
                  {String(i + 1).padStart(2, '0')} · {p.role}
                </Eyebrow>
                <h2 className="mt-5 text-[2.4rem] leading-[1.05] md:text-[3.25rem]">{p.name}</h2>
                {p.location ? (
                  <p className="mt-3 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-soil">
                    {p.location}, Utah
                  </p>
                ) : null}
                <p className="mt-6 max-w-xl leading-[1.7] text-forest/90">{p.blurb}</p>
                {links.length > 0 ? (
                  <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-1">
                    {links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          {l.label}
                          <span className="sr-only"> for {p.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            </div>
          </Section>
        )
      })}
    </>
  )
}
