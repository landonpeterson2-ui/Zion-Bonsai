export default function Section({
  tone = 'paper',
  bordered = false,
  className = '',
  id,
  children,
}: {
  tone?: 'paper' | 'paper-deep'
  bordered?: boolean
  className?: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${tone === 'paper-deep' ? 'bg-paper-deep' : ''} ${bordered ? 'border-y border-forest/10' : ''} ${className}`}
    >
      {children}
    </section>
  )
}
