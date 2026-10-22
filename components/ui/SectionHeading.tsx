import Eyebrow from './Eyebrow'

/** Eyebrow + display h2. Pass italic emphasis as <em> inside children. */
export default function SectionHeading({
  eyebrow,
  tone = 'moss',
  className = '',
  headingClassName = '',
  children,
}: {
  eyebrow: React.ReactNode
  tone?: 'clay' | 'moss' | 'linen'
  className?: string
  headingClassName?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={`mt-5 text-[2.4rem] leading-[1.05] md:text-[3.25rem] ${headingClassName}`}>{children}</h2>
    </div>
  )
}
