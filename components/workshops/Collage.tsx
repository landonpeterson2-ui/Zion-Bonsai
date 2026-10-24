import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { getPhoto } from '@/lib/photos'

export default function Collage() {
  const group = getPhoto('workshop-group-messy-table')
  const hands = getPhoto('workshop-hands-in-soil-round-table')
  const pair = getPhoto('workshop-pair-holding-trees-brick-wall')
  const roots = getPhoto('workshop-table-soil-and-roots')
  const pots = getPhoto('tayas-handmade-pots')
  return (
    <Section tone="paper-deep">
      <div className="container-custom">
        <SectionHeading eyebrow="Photos from the table">What it looks like in the room.</SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <Photo src={group.src} alt={group.alt} aspect="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>
          {/* 20/21 keeps this 5-column tile the same height as the 7-column 4:3 tile beside it */}
          <Reveal className="md:col-span-5">
            <Photo src={hands.src} alt={hands.alt} aspect="aspect-[4/3] md:aspect-[20/21]" sizes="(min-width: 768px) 42vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-4">
            <Photo src={pots.src} alt={pots.alt} aspect="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-4">
            <Photo src={pair.src} alt={pair.alt} aspect="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-4">
            <Photo src={roots.src} alt={roots.alt} aspect="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
