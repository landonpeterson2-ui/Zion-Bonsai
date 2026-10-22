import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <section className="relative overflow-hidden bg-olive py-16 md:py-24">
      <div
        className="pointer-events-none absolute -bottom-44 -right-40 h-[480px] w-[480px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(221,111,71,0.14), rgba(221,111,71,0) 70%)' }}
      />
      <div className="container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -right-5 -top-5 h-[420px] md:h-[520px] w-full rounded-md bg-cream-light" />
            <div className="relative h-[420px] md:h-[520px] w-full overflow-hidden rounded-md shadow-2xl">
              <Image
                src="/gallery/5.jpeg"
                alt="Young bonsai in a terracotta pot"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <span className="eyebrow text-coral-200">Why Bonsai</span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-6 text-cream-light">
              A slower kind of craft.
            </h2>
            <p className="text-lg text-cream-light/80 mb-4">
              In a world that&apos;s constantly pulling your attention in a hundred directions,
              bonsai asks you to slow down. To focus. To create something with intention.
            </p>
            <p className="text-lg text-cream-light/80 mb-7">
              It&apos;s not complicated. It&apos;s not expensive. And you don&apos;t need to be an expert.
            </p>
            <p className="font-heading italic text-2xl text-coral-200 mb-9">
              You just need to show up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/workshops" className="btn-primary text-center">
                See Upcoming Workshops
              </Link>
              <Link
                href="/gift"
                className="text-center font-semibold text-cream-light border-[1.5px] border-cream-light/50 rounded-full py-[10.5px] px-7 transition-colors hover:bg-cream-light hover:text-olive"
              >
                Buy a Gift Certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
