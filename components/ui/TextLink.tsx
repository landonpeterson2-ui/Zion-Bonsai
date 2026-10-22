import Link from 'next/link'

const tones = {
  forest: 'text-forest border-forest/60 hover:border-forest',
  linen: 'text-linen border-linen/70 hover:border-linen',
}

export default function TextLink({
  href,
  tone = 'forest',
  className = '',
  children,
}: {
  href: string
  tone?: keyof typeof tones
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`border-b pb-1 font-label text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${tones[tone]} ${className}`}
    >
      {children}
    </Link>
  )
}
