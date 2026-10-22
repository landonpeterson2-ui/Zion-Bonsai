const tones = {
  clay: 'text-clay', // only on paper, never on paper-deep
  moss: 'text-moss',
  linen: 'text-linen/85', // on dark photo / soil backgrounds
}

export default function Eyebrow({
  tone = 'moss',
  className = '',
  children,
}: {
  tone?: keyof typeof tones
  className?: string
  children: React.ReactNode
}) {
  return (
    <p className={`font-label text-[11px] font-semibold uppercase tracking-[0.22em] ${tones[tone]} ${className}`}>
      {children}
    </p>
  )
}
