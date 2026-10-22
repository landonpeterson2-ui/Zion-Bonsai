import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { getPhoto } from '@/lib/photos'

function Placeholder({ label, aspect, className = '' }: { label: string; aspect: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-forest/40 bg-paper p-6 text-center text-sm italic text-soil ${aspect} ${className}`}
    >
      {label}
    </div>
  )
}

export default function Collage() {
  const card = getPhoto('workshop-finished-jade-thank-you-card')
  const tables = getPhoto('workshop-tables-set-for-class')
  return (
    <Section tone="paper-deep">
      <div className="container-custom">
        <SectionHeading eyebrow="Photos from the table">What it looks like in the room.</SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <Photo
              src={tables.src}
              alt={tables.alt}
              aspect="aspect-[4/3]"
              sizes="(min-width: 768px) 58vw, 100vw"
              caption="Tables set, before anyone arrives."
            />
          </Reveal>
          <Reveal className="md:col-span-5">
            <Placeholder label="[PHOTO — hands in soil, pending permission]" aspect="aspect-[4/3] md:aspect-auto md:h-full" />
          </Reveal>
          <Reveal className="md:col-span-4">
            <Placeholder label="[PHOTO — Taya’s pots lined up]" aspect="aspect-[4/5]" />
          </Reveal>
          <Reveal className="md:col-span-4">
            <Photo src={card.src} alt={card.alt} aspect="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-4">
            <Placeholder label="[PHOTO — a finished tree, pending permission]" aspect="aspect-[4/5]" />
          </Reveal>
        </div>
        <p className="mt-6 text-sm italic text-soil/80">
          More photos of the people and trees are coming once attendees have said yes to sharing them.
        </p>
      </div>
    </Section>
  )
}
