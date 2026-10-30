import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { getSite } from '@/lib/content'

export const metadata: Metadata = pageMetadata({
  path: '/contact',
  title: 'Contact',
  description:
    'Get in touch with Zion Bonsai: email, phone, gift certificates, and how to hear about the next workshop.',
})

const buttonClass =
  'inline-flex min-h-[44px] items-center rounded-[3px] bg-clay px-6 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-linen transition-colors hover:bg-clay-dark'

const mailto = (email: string, subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`

export default function ContactPage() {
  const site = getSite()
  const gift = site.giftCertificates
  const tel = `tel:+1${site.phone.replace(/\D/g, '')}`
  const handle = (url: string) => {
    const last = url.replace(/\/$/, '').split('/').pop()
    return last ? `@${last}` : url
  }

  const rows: { label: string; value: string; href: string; external?: boolean }[] = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { label: 'Phone', value: site.phone, href: tel },
    { label: 'Instagram', value: handle(site.social.instagram), href: site.social.instagram, external: true },
    { label: 'Facebook', value: site.name, href: site.social.facebook, external: true },
  ]

  return (
    <>
      <header className="container-custom pb-16 pt-16 md:pb-24 md:pt-24">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[2.8rem] leading-[1.02] md:text-[4.25rem]">
          Say hello. <em>We answer.</em>
        </h1>
        <p className="mt-6 max-w-xl leading-[1.7] text-forest/90">
          Questions about a workshop, a gift, or a group? Text, call or email. A real person (probably with soil on
          their hands) will get back to you.
        </p>
      </header>

      <Section bordered>
        <div className="container-custom grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <SectionHeading eyebrow="Find us">
              Around <em>Sanpete County.</em>
            </SectionHeading>
            <p className="mt-6 max-w-sm leading-[1.7] text-forest/90">
              {site.area}. Most public workshops are at Sweet Roots Farm & Flora in {site.towns[0]}.
            </p>
          </Reveal>
          <Reveal className="md:col-span-7">
            <ul className="border-t border-forest/15">
              {rows.map((r) => (
                <li
                  key={r.label}
                  className="flex flex-col gap-1 border-b border-forest/15 py-4 sm:flex-row sm:items-center sm:gap-8"
                >
                  <span className="w-28 shrink-0 font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-moss">
                    {r.label}
                  </span>
                  <a
                    href={r.href}
                    {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex min-h-[44px] items-center break-all font-display text-2xl text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
                  >
                    {r.value}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section id="gift" tone="paper-deep">
        <div className="container-custom grid gap-8 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <SectionHeading eyebrow="Gift certificates">
              Give someone <em>two hours off.</em>
            </SectionHeading>
          </Reveal>
          <Reveal className="md:col-span-7">
            <p className="max-w-xl leading-[1.7] text-forest/90">
              A workshop makes a good gift for the person who has everything except a free afternoon. Gift certificates
              are available.
              {gift.mode === 'inquiry'
                ? ' Send us a note and we will sort out the details with you.'
                : ' You can buy one online.'}
            </p>
            <div className="mt-8">
              {gift.mode === 'online' && gift.url ? (
                <a href={gift.url} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                  Buy a gift certificate
                </a>
              ) : (
                <a href={mailto(site.email, 'Gift certificate inquiry')} className={buttonClass}>
                  Ask about a gift certificate
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="interest-list">
        <div className="container-custom grid gap-8 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <SectionHeading eyebrow="Interest list">
              Missed a date? <em>We’ll tell you the next one.</em>
            </SectionHeading>
          </Reveal>
          <Reveal className="md:col-span-7">
            <p className="max-w-xl leading-[1.7] text-forest/90">
              Workshops fill up and new dates get added. Join the list and we will let you know when there is a seat
              with your name on it.
            </p>
            <div className="mt-8">
              {site.interestListUrl ? (
                <a href={site.interestListUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                  Join the interest list
                </a>
              ) : (
                <a href={mailto(site.email, 'Add me to the workshop list')} className={buttonClass}>
                  Email to join the list
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
