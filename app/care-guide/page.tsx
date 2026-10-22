import type { Metadata } from 'next'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { getSite } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Jade Bonsai Care Guide',
  description:
    'How to water a jade bonsai, plus dwarf jade care for Central Utah: the leaf snap test, light, seasons, soil and growth stages.',
}

const jumps = [
  { id: 'watering', label: 'Watering' },
  { id: 'snap-test', label: 'Snap test' },
  { id: 'light', label: 'Light' },
  { id: 'seasons', label: 'Seasons' },
  { id: 'stages', label: 'Growth stages' },
  { id: 'soil', label: 'Soil' },
  { id: 'return', label: 'Come back' },
]

// Stage names are placeholders until Landon supplies them.
const stages = ['Plantlet', '[STAGE NAME]', '[STAGE NAME]', '[STAGE NAME]', 'Established']

/** Two-column block: numbered label left, content right. */
function Block({
  n,
  title,
  children,
}: {
  n: string
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Reveal className="container-custom grid gap-6 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <Eyebrow>{n}</Eyebrow>
        <h2 className="mt-4 text-[2.2rem] leading-[1.05] md:text-[3rem]">{title}</h2>
      </div>
      <div className="max-w-xl space-y-4 text-lg leading-relaxed text-forest md:col-span-7">
        {children}
      </div>
    </Reveal>
  )
}

function DropIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M12 3c3 4.2 6 7.4 6 11a6 6 0 0 1-12 0c0-3.6 3-6.8 6-11Z" />
    </svg>
  )
}

export default function CareGuidePage() {
  const site = getSite()

  return (
    <>
      <header className="container-custom pb-14 pt-16 md:pb-20 md:pt-24">
        <Eyebrow>Care guide</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[2.9rem] leading-[1.02] md:text-[5rem]">
          Keeping your jade <em>happy</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest">
          For past attendees and the curious. Good news: jades are forgiving. Get the watering right
          and the rest is easy.
        </p>
        <nav aria-label="On this page" className="mt-10 border-y border-forest/15 py-3">
          <ul className="flex flex-wrap gap-x-6">
            {jumps.map((j) => (
              <li key={j.id}>
                <a
                  href={`#${j.id}`}
                  className="inline-flex min-h-[44px] items-center font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-moss hover:text-forest"
                >
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <Section id="watering" tone="paper-deep">
        <Block n="01" title={<>The one thing to <em>get right</em></>}>
          <p>Water thoroughly, until it drains completely out the bottom. Then let it dry out.</p>
          <p>
            It isn&apos;t about whether the soil <em>feels</em> dry. It&apos;s the full soak, then the
            wait.
          </p>
          <p className="flex items-start gap-3 border-l border-clay pl-4">
            <span className="mt-0.5 shrink-0 text-moss"><DropIcon /></span>
            <span>
              Bonsai hate wet feet. Never let the roots sit in water. Jades store water in their
              stems and leaves, so they can wait.
            </span>
          </p>
        </Block>
      </Section>

      <Section id="snap-test">
        <Block n="02" title={<>The leaf <em>snap test</em></>}>
          <p>Not sure whether it&apos;s time? Snap a leaf in half.</p>
          <ul className="divide-y divide-forest/15 border-y border-forest/15">
            <li className="py-4">
              <span className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-moss">
                Firm and wet inside
              </span>
              <p className="mt-1">Hydrated. Wait.</p>
            </li>
            <li className="py-4">
              <span className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
                Limp and dry inside
              </span>
              <p className="mt-1">Time to water.</p>
            </li>
          </ul>
          <div className="relative !mt-8 border border-dashed border-forest/30 px-6 py-12 text-center">
            <span className="absolute -top-2.5 left-6 bg-paper px-2 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-soil">
              Placeholder
            </span>
            <p className="font-display text-xl italic text-forest">[PHOTO &mdash; snapped jade leaf]</p>
          </div>
        </Block>
      </Section>

      <Section id="light" tone="paper-deep">
        <Block n="03" title={<>Light, and <em>where to keep it</em></>}>
          <p>
            Dwarf jade (<em>Portulacaria</em>) and jade (<em>Crassula</em>) thrive indoors,
            year-round, in Central Utah. That&apos;s a real advantage over outdoor bonsai here.
          </p>
          <p>Give it a bright spot by a window.</p>
        </Block>
      </Section>

      <Section id="seasons">
        <Block n="04" title={<>Seasons, <em>paced</em></>}>
          <p>Summer is the faster growth season.</p>
          <p>Fall and winter are slower. Not dormant, just paced.</p>
        </Block>
      </Section>

      <Section id="stages" tone="paper-deep">
        <div className="container-custom">
          <SectionHeading eyebrow="05">
            Growth <em>stages</em>
          </SectionHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest">
            We label every tree by stage, from a young plantlet to a multi-year established tree.
          </p>
          <Reveal>
            <ol className="relative mt-14 md:mt-20 md:grid md:grid-cols-5">
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[5px] top-2 w-px bg-forest/30 md:bottom-auto md:left-0 md:right-0 md:top-[5px] md:h-px md:w-auto"
              />
              {stages.map((s, i) => (
                <li key={i} className="relative pb-10 pl-9 last:pb-0 md:pb-0 md:pl-0 md:pr-4 md:pt-9">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[5px] h-px w-[11px] bg-forest md:top-0 md:h-[11px] md:w-px"
                  />
                  <span className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-1 font-display text-2xl italic text-forest md:text-[1.7rem]">{s}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section id="soil">
        <Block n="06" title={<>Our <em>soil</em></>}>
          <p>
            It&apos;s our own custom mix, engineered to hold just enough moisture without staying
            soggy.
          </p>
        </Block>
      </Section>

      <Section id="return" tone="paper-deep">
        <Block n="07" title={<>When to <em>come back</em></>}>
          <p>
            Six to nine months after your workshop, come back for a return shaping session. We&apos;ll
            shape and train your tree together.
          </p>
          <p>
            <TextLink href="/workshops">See workshops</TextLink>
          </p>
        </Block>
      </Section>

      <section className="container-custom py-24 text-center md:py-32">
        <h2 className="text-[2.4rem] leading-[1.05] md:text-[3.25rem]">
          Questions about <em>your tree?</em>
        </h2>
        <p className="mt-5 text-lg text-forest">
          Write us at{' '}
          <a href={`mailto:${site.email}`} className="text-clay underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <p className="mt-4 font-script text-2xl text-soil">Come grow with us.</p>
        <Link href="/workshops#dates" className="btn-primary mt-8">Book a workshop</Link>
      </section>
    </>
  )
}
