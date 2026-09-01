// Shared layout and typography primitives for all method pages.
// Method pages MUST import from here. MUST NOT define these locally.

type SectionProps = {
  children: React.ReactNode
  className?: string
  /** id of the heading inside this section, for a labeled landmark. Optional. */
  ariaLabelledBy?: string
}

export function DarkSection({ children, className = '', ariaLabelledBy }: SectionProps) {
  return (
    <section
      className={`dark-section${className ? ` ${className}` : ''}`}
      style={{ background: 'var(--color-dark)' }}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  )
}

export function LightSection({ children, className = '', ariaLabelledBy }: SectionProps) {
  return (
    <section
      className={className || undefined}
      style={{ background: 'var(--color-background)' }}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  )
}

export function WarmSection({ children, className = '', ariaLabelledBy }: SectionProps) {
  return (
    <section
      className={className || undefined}
      style={{ background: 'var(--color-warm-50)' }}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  )
}

export function Container({ children, prose = false }: { children: React.ReactNode; prose?: boolean }) {
  return (
    <div className={`${prose ? 'max-w-prose' : 'max-w-content'} mx-auto px-6 md:px-8`}>
      {children}
    </div>
  )
}

export function SectionLabel({
  children,
  accent,
  dark = false,
}: {
  children: React.ReactNode
  accent: string
  dark?: boolean
}) {
  return (
    <p
      className="font-mono uppercase tracking-widest mb-4"
      style={{ fontSize: 'var(--text-2xs)', color: accent, opacity: dark ? 0.6 : 1 }}
    >
      {children}
    </p>
  )
}

export function SectionHeadingDark({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-display font-semibold mb-6"
      style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, color: '#FAFAFA' }}
    >
      {children}
    </h2>
  )
}

export function SectionHeadingLight({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-display font-semibold mb-6"
      style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)' }}
    >
      {children}
    </h2>
  )
}

export function Body({
  children,
  dark = false,
  className = 'mb-5 last:mb-0',
}: {
  children: React.ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <p
      className={className}
      style={{
        fontSize: 'var(--text-base)',
        lineHeight: 'var(--leading-relaxed)',
        color: dark ? 'rgba(255,255,255,0.68)' : 'var(--color-neutral-700)',
      }}
    >
      {children}
    </p>
  )
}
