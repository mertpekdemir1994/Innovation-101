import { DarkSection, Container, SectionLabel } from '../../components/method/Primitives'
import ScenarioPaths from './ScenarioPaths'

export const metadata = { title: 'Scenarios' }

const IDEATION = 'var(--stage-ideation)'
const IDEATION_GLOW = '181,97,62'
// SectionLabel's dark prop multiplies whatever color it's given by a
// further 0.6 opacity, and the raw --stage-ideation hex is already fully
// opaque -- compounding to ~2.3:1 against --color-dark, well under the
// 4.5:1 text minimum (verified against the WCAG relative-luminance
// formula, same failure mode caught on the /reading page). Passing this
// pre-brightened color directly (dark prop omitted) measures 7.5:1.
const IDEATION_TEXT = 'rgba(240,170,130,0.85)'

export default function ScenariosPage() {
  return (
    <DarkSection
      ariaLabelledBy="scenarios-hold-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial accent glow: purely decorative */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 55% at 50% 44%, rgba(${IDEATION_GLOW},0.11) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Container className="relative z-10">
        <div style={{ textAlign: 'center', maxWidth: '30rem', margin: '0 auto' }}>
          <ScenarioPaths accent={IDEATION} />

          <SectionLabel accent={IDEATION_TEXT}>Scenarios</SectionLabel>

          <h1
            id="scenarios-hold-heading"
            className="font-display text-balance"
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.875rem)',
              fontWeight: 600,
              lineHeight: 'var(--leading-snug)',
              color: 'var(--color-dark-text)',
              marginBottom: '1.125rem',
            }}
          >
            Not published yet.
          </h1>

          <p
            style={{
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--color-dark-muted)',
              marginBottom: '2rem',
            }}
          >
            A scenario will describe a specific business situation, defined by its industry and the
            type of challenge it presents, and point to the frameworks and methods on this site that
            apply to it, along with a realistic time estimate. None exist yet.
          </p>

          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--color-dark-muted)' }}>
            Everything else on this site is finished. This is not.
          </p>
        </div>
      </Container>
    </DarkSection>
  )
}
