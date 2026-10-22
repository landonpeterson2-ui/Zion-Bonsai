import Image from 'next/image'

/**
 * Plain rectangular photo (no arch crops). `aspect` is the Tailwind class(es) for the frame,
 * e.g. "aspect-[4/5]" or "aspect-[4/5] md:aspect-[5/6]". Caption is optional italic text below.
 */
export default function Photo({
  src,
  alt,
  sizes,
  aspect = 'aspect-[4/5]',
  priority = false,
  caption,
  className = '',
}: {
  src: string
  alt: string
  sizes: string
  aspect?: string
  priority?: boolean
  caption?: string
  className?: string
}) {
  return (
    <>
      <div className={`relative overflow-hidden ${aspect} ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption ? <p className="mt-3 text-sm italic text-soil/80">{caption}</p> : null}
    </>
  )
}
