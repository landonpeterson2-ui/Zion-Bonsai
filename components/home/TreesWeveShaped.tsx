import Photo from '@/components/ui/Photo'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { getPhoto } from '@/lib/photos'

export default function TreesWeveShaped() {
  const big = getPhoto('jade-white-origami-pot-porch')
  const a = getPhoto('variegated-jade-grey-pot')
  const b = getPhoto('jade-drip-glaze-pot')
  return (
    <Section tone="paper-deep">
      <div className="container-custom">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Trees we’ve shaped">Each one its own.</SectionHeading>
          <TextLink href="/gallery">See the gallery</TextLink>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <Photo
              src={big.src}
              alt={big.alt}
              sizes="(min-width: 768px) 55vw, 100vw"
              aspect="aspect-[4/5] md:aspect-auto md:min-h-[640px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1 md:gap-6">
            <Photo src={a.src} alt={a.alt} sizes="(min-width: 768px) 38vw, 50vw" aspect="aspect-square md:aspect-auto md:min-h-[308px]" />
            <Photo src={b.src} alt={b.alt} sizes="(min-width: 768px) 38vw, 50vw" aspect="aspect-square md:aspect-auto md:min-h-[308px]" />
          </div>
        </div>
      </div>
    </Section>
  )
}
