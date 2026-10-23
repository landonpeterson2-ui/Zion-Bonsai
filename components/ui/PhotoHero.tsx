import Image from 'next/image'

/**
 * Soil-washed photo hero. Phone: full-bleed photo with a bottom-up soil gradient.
 * Desktop: solid soil behind the text, fading into the photo on the right 55%.
 * Children are the text (put an <h1> in there) and should use linen colors.
 * `objectPosition` is a Tailwind class string, e.g. "object-[60%_30%] md:object-[40%_60%]".
 * The image is `priority` (above the fold), so use one PhotoHero per page.
 */
export default function PhotoHero({
  src,
  alt,
  objectPosition = 'object-center',
  caption,
  children,
}: {
  src: string
  alt: string
  objectPosition?: string
  caption?: string
  children: React.ReactNode
}) {
  return (
    <section className="relative isolate mt-3 flex min-h-[640px] items-end overflow-hidden bg-soil md:mt-4 md:min-h-[720px] md:items-center">
      <div className="absolute inset-0 -z-10 md:left-auto md:w-[55%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
          className={`object-cover ${objectPosition}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil/95 via-soil/80 to-soil/60 md:bg-gradient-to-r md:from-soil md:via-soil/45 md:to-soil/15" />
      </div>
      <div className="container-custom w-full pb-14 pt-32 md:py-24">
        <div className="max-w-xl">{children}</div>
      </div>
      {caption ? (
        <p className="absolute bottom-4 right-4 hidden text-sm italic text-linen/80 md:block md:right-8">{caption}</p>
      ) : null}
    </section>
  )
}
