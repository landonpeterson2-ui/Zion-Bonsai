import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { getPhoto } from '@/lib/photos'

const steps = [
  { time: 'Arrive', title: 'Phones face-down.', body: 'Find a seat, say hi, and set your phone aside. It will survive without you for two hours.' },
  { time: 'First half hour', title: 'Meet your tree.', body: 'Pick a dwarf jade and a handmade pot that suits it. We show you what a bonsai actually is, and what it isn’t.' },
  { time: 'The middle', title: 'Hands in the soil.', body: 'Loosen the roots, trim, and pot it up. Landon walks the room and answers every question, including the small ones.' },
  { time: 'Near the end', title: 'Shape it your way.', body: 'Step back, look, make one more cut. There’s no wrong answer, only a tree that’s yours.' },
  { time: 'Goodbye', title: 'Carry it out.', body: 'You leave with your tree, the care basics, and a little more quiet than you came in with.' },
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
            {steps.map((s) => (
              <li key={s.title} className="grid gap-1 border-b border-forest/15 py-6 md:grid-cols-[9rem_1fr] md:gap-6">
                <p className="font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-moss md:pt-2">{s.time}</p>
                <div>
                  <h3 className="text-[1.45rem] leading-snug md:text-[1.65rem]">{s.title}</h3>
                  <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">{s.body}</p>
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
