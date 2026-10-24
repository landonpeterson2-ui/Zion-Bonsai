import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { getPhoto } from '@/lib/photos'

export default function TakeHome() {
  const photo = getPhoto('dwarf-jade-sample-workshop-tree')
  return (
    <Section>
      <div className="container-custom grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
        <div className="md:col-span-6">
          <SectionHeading eyebrow="What you take home">A tree, in a pot made by hand.</SectionHeading>
          <p className="mt-6 max-w-xl leading-[1.7] text-soil">
            You go home with your own dwarf jade bonsai (<em>Portulacaria afra</em>) in a handmade pot from Taya&rsquo;s
            Clay Creations, plus the care basics to keep it happy.
          </p>
          <p className="mt-4 max-w-xl leading-[1.7] text-soil">
            <strong className="font-semibold text-forest">About tools:</strong> we provide them to use during the
            workshop, and they&rsquo;re available to purchase if you want your own. They don&rsquo;t come home with you
            as part of the workshop.
          </p>
          <div className="mt-8">
            <TextLink href="/care-guide">Read the care guide</TextLink>
          </div>
        </div>
        <Reveal className="md:col-span-6">
          <Photo
            src={photo.src}
            alt={photo.alt}
            caption={photo.caption}
            aspect="aspect-[4/5]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </Reveal>
      </div>
    </Section>
  )
}
