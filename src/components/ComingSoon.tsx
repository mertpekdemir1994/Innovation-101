import styles from './coming-soon.module.css'

/*
  Shared holding page for sections without content yet.
  Both READING and SCENARIOS use this: only accent color and copy differ.

  accent:   CSS color value (e.g. 'var(--stage-discovery)')
  glowRgb:  comma-separated R,G,B for the radial background glow
  heading:  the h1 text
  body:     the explanatory paragraph
  footer:   optional quiet closing line (shared on both pages)

  SVG: a regular hexagon traced over 5 of its 6 sides: the missing closing
  side is the deliberate gap. Under prefers-reduced-motion the shape renders
  statically with the gap already visible.
*/

interface ComingSoonProps {
  accent: string
  glowRgb: string
  heading: string
  body: string
  footer?: string
}

export default function ComingSoon({ accent, glowRgb, heading, body, footer }: ComingSoonProps) {
  return (
    <div
      className="dark-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial accent glow: purely decorative */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 55% at 50% 44%, rgba(${glowRgb},0.11) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-content mx-auto px-6 md:px-8 w-full" style={{ position: 'relative', zIndex: 1 }}>
      <div
        style={{
          textAlign: 'center',
          maxWidth: '26rem',
          margin: '0 auto',
        }}
      >
        {/* Animated SVG: decorative, aria-hidden */}
        <svg
          aria-hidden="true"
          viewBox="0 0 180 180"
          width="156"
          height="156"
          style={{ display: 'block', margin: '0 auto 2rem' }}
        >
          {/*
            Hexagon: point up, circumradius 65, center (90, 90).
            375 of 390 path units drawn; small gap at closing vertex.
            The <g> rotates as a unit so the gap orbits the perimeter.
          */}
          <g className={styles.group}>
            <circle cx="90" cy="90" r="3" fill={accent} opacity={0.32} />
            <path
              className={styles.path}
              d="M 90 25 L 146 57 L 146 123 L 90 155 L 34 123 L 34 57"
              stroke={accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </svg>

        {/* Mono section label */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: accent,
            marginBottom: '1.25rem',
          }}
        >
          In progress
        </p>

        {/* Heading: primary accessible content */}
        <h1
          className="font-display text-balance"
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.875rem)',
            fontWeight: 600,
            lineHeight: 'var(--leading-snug)',
            color: 'var(--color-dark-text)',
            marginBottom: '1.125rem',
          }}
        >
          {heading}
        </h1>

        {/* Body: explanatory paragraph */}
        <p
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-dark-muted)',
            marginBottom: footer ? '2rem' : 0,
          }}
        >
          {body}
        </p>

        {/* Optional quiet closing line */}
        {footer && (
          <p
            style={{
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--color-dark-muted)',
            }}
          >
            {footer}
          </p>
        )}
      </div>
      </div>
    </div>
  )
}
