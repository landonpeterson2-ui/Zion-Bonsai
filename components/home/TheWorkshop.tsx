import NextWorkshop from '@/components/ui/NextWorkshop'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { getPhoto } from '@/lib/photos'

const expect = [
  'No experience needed. Never touched a bonsai? Perfect.',
  'We bring the trees, the handmade pots, the soil and the tools to use.',
  'You leave with your own dwarf jade in a handmade pot, plus the care basics.',
  'Come back in nine months to a year for Bonsai Level 2: more advanced shaping and pruning techniques.',
]

export default function TheWorkshop() {
  const photo = getPhoto('workshop-hands-in-soil-round-table')
  return (
    <Section tone="paper-deep">
      <div className="container-custom grid gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-5">
          <Photo src={photo.src} alt={photo.alt} caption={photo.caption} sizes="(min-width: 768px) 40vw, 100vw" aspect="aspect-[4/5]" />
        </Reveal>
        <div className="md:col-span-7">
          <SectionHeading eyebrow="Why unplug">
            Two hours. <em>Hands full of soil.</em>
          </SectionHeading>
          <div className="mt-6 max-w-xl space-y-4 leading-[1.7] text-soil">
            <p>
              Central Utah is full of beautiful outdoor recreation, but not many places to unplug, work with your hands
              and make something living.
            </p>
            <p>
              So that&rsquo;s the table we built. No pressure to be perfect, just soil, tools, good company and a tree
              that&rsquo;s yours to grow. You don&rsquo;t need a green thumb. You just need to show up.
            </p>
          </div>
          <h3 className="mt-10 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-moss">
            What to expect
          </h3>
          <ul className="mt-4 border-t border-forest/15">
            {expect.map((e) => (
              <li key={e} className="max-w-xl border-b border-forest/15 py-4 leading-[1.7] text-forest">
                {e}
              </li>
            ))}
          </ul>
          <TextLink href="/workshops" className="mt-8 inline-flex min-h-[44px] items-center">
            How the workshop runs
          </TextLink>
          <NextWorkshop className="mt-10" />
        </div>
      </div>
    </Section>
  )
}
