import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { getPhoto } from '@/lib/photos'

export default function WhoYoullLearnFrom() {
  const photo = getPhoto('workshop-instructor-holding-jade-roots')
  return (
    <Section>
      <div className="container-custom grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:order-2 md:col-span-6">
          <Photo src={photo.src} alt={photo.alt} sizes="(min-width: 768px) 45vw, 100vw" />
        </Reveal>
        <div className="md:order-1 md:col-span-5 md:col-start-1">
          <SectionHeading eyebrow="Who you’ll learn from">
            An old art, <em>made new at the table.</em>
          </SectionHeading>
          <div className="mt-6 space-y-4 leading-[1.7] text-soil">
            <p>Bonsai has a thousand years of tradition behind it. We love that, and we skip the gatekeeping.</p>
            <p>
              Landon and Cass, co-founders of Zion Bonsai, will be your guides to a more contemporary take on bonsai.
              Landon concentrates on technique, and Cass brings the aesthetic.
            </p>
          </div>
          <TextLink href="/our-story" className="mt-8 inline-block">Our story</TextLink>
        </div>
      </div>
    </Section>
  )
}
