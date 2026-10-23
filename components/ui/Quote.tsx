import type { Testimonial } from '@/lib/content'

const sizes = {
  lg: 'text-[1.7rem] leading-[1.3] md:text-[2.2rem]',
  md: 'text-[1.35rem] leading-[1.4] md:text-[1.55rem]',
}

/** An attendee's words, exactly as given in content/testimonials.json, with a name/town credit. */
export default function Quote({
  testimonial,
  size = 'lg',
  align = 'center',
  className = '',
}: {
  testimonial: Testimonial
  size?: keyof typeof sizes
  align?: 'center' | 'left'
  className?: string
}) {
  const t = testimonial
  return (
    <figure className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      <blockquote className={`font-display italic text-forest ${sizes[size]}`}>
        <p>&ldquo;{t.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-5 font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-moss">
        {t.name}, {t.town}
        {t.note ? <span className="text-soil"> &middot; {t.note}</span> : null}
      </figcaption>
    </figure>
  )
}
