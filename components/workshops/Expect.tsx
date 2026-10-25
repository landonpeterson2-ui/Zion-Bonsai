import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { getPhoto } from '@/lib/photos'

const beats = [
  { title: 'The phone goes face-down.', body: 'The table is screen-free. Nothing to check, nothing to post. Just your hands and what is in front of you.' },
  { title: 'You choose your tree and your pot.', body: 'A dwarf jade, and a pot thrown by hand by Taya’s Clay Creations. No two are alike.' },
  { title: 'We shape it together.', body: 'Landon walks you through soil, roots and your first cuts. No jargon, no wrong answers.' },
  { title: 'It goes home with you.', body: 'Your tree keeps growing. Come back in six to nine months and we’ll shape it again.' },
]

export default function Expect() {
  const photo = getPhoto('workshop-instructor-holding-jade-roots')
  return (
    <Section tone="paper-deep">
      <div className="container-custom grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7 md:order-2">
          <SectionHeading eyebrow="What to expect">Two hours, start to finish.</SectionHeading>
          <p className="mt-6 max-w-xl leading-[1.7] text-soil">
            No experience, no gear, no homework. Just a table, a tree and some good company.
          </p>
          <ol className="mt-10 border-t border-forest/15">
            {beats.map((b, i) => (
              <li key={b.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-forest/15 py-6 md:grid-cols-[3.5rem_1fr]">
                <span className="font-display text-2xl italic text-soil md:text-3xl" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[1.45rem] leading-snug md:text-[1.65rem]">{b.title}</h3>
                  <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">{b.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Reveal className="md:col-span-5 md:order-1">
          <Photo
            src={photo.src}
            alt={photo.alt}
            caption="Landon shows the class how the roots look before potting."
            aspect="aspect-[4/5]"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </Reveal>
      </div>
    </Section>
  )
}
