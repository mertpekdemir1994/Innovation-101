import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { DarkSection, LightSection, WarmSection } from '../../../components/method/Primitives'

const DiamondHero = dynamic(() => import('@/components/viz/DiamondHero'), { ssr: false })
const DDInteractiveSection = dynamic(() => import('./DDInteractiveSection'), {
  ssr: false,
  loading: () => (
    <div className="py-space-12 flex items-center justify-center" style={{ minHeight: 400, color: 'rgba(255,255,255,0.25)' }}>
      <span className="font-mono text-2xs uppercase tracking-widest">Loading interactive diagram...</span>
    </div>
  ),
})
const DDPhasesDeepDive = dynamic(() => import('./DDPhasesDeepDive'), { ssr: false })
const DDEvolutionTimeline = dynamic(() => import('./DDEvolutionTimeline'), { ssr: false })
const DDCaseStudy = dynamic(() => import('./DDCaseStudy'), { ssr: false })

export const metadata: Metadata = {
  title: 'Double Diamond — Innovation 101',
  description: 'The Double Diamond separates the work of finding the right problem from the work of finding the right solution.',
}


const PURPLE = 'rgba(124,58,237,'

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-space-4 mb-space-8">
      <span
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: `${PURPLE}0.60)` }}
      >
        {number}
      </span>
      <div className="h-px flex-1" style={{ background: `${PURPLE}0.15)` }} />
      <span
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: `${PURPLE}0.60)` }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DoubleDiamondPage() {
  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO: dark, full viewport
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Radial purple glow behind diamond */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 55%, ${PURPLE}0.14) 0%, transparent 70%)`,
          }}
        />

        <Container className="relative z-10 flex flex-col justify-center flex-1 py-space-13">
          {/* Title */}
          <h1
            className="font-display font-semibold text-balance mb-space-6"
            style={{
              color: '#FAFAFA',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            The Double<br />Diamond
          </h1>

          {/* Tagline */}
          <p
            className="text-xl max-w-prose mb-space-10"
            style={{ color: 'rgba(255,255,255,0.52)', lineHeight: 1.6 }}
          >
            Separate the work of finding the right problem from the work
            of finding the right solution. Diverge before you converge, twice.
          </p>

        </Container>

        {/* Diamond SVG: intentionally outside Container, full viewport width */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <DiamondHero />
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-space-2 pointer-events-none"
          style={{ color: 'rgba(255,255,255,0.20)' }}
        >
          <span className="font-mono text-2xs uppercase tracking-widest">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="6" y="0" width="4" height="12" rx="2" fill="currentColor" opacity="0.4" />
            <path d="M4 18L8 22L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </DarkSection>

      {/* ═══════════════════════════════════════════════════════════════════
          FOUR PHASES DEEP DIVE: sticky scroll through each phase
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${PURPLE}0.65)` }}>
              The four phases
            </p>
            <h2
              className="font-display font-semibold mb-space-10"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--color-neutral-900)',
              }}
            >
              Each phase has a single discipline
            </h2>
          </ScrollReveal>
          <DDPhasesDeepDive />
        </Container>
      </LightSection>

      {/* ═══════════════════════════════════════════════════════════════════
          THE CORE TRUTH: white, bold statement
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-12 md:py-space-13">
          <ScrollReveal>
            <div
              className="border-l-4 pl-space-8 mb-space-10"
              style={{ borderColor: 'var(--color-framework)' }}
            >
              <p
                className="font-display font-semibold text-balance"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  lineHeight: 1.15,
                  color: 'var(--color-neutral-900)',
                  letterSpacing: '-0.02em',
                }}
              >
                Most teams solve the wrong problem brilliantly.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-prose space-y-space-4 mb-space-8">
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                Most innovation efforts fail not because teams cannot find solutions; they fail
                because teams solve the wrong problem. A product team builds a feature nobody
                wanted. A service team redesigns a process that was not broken. An
                organization invests millions in an answer to a question nobody asked.
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                The Double Diamond was developed by the British Design Council in 2005. Its power
                is not in its complexity. It is in the discipline it enforces:{' '}
                <strong className="text-neutral-900 font-semibold">
                  diverge before you converge, and do it twice.
                </strong>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div
              className="max-w-prose rounded-xl p-space-7 space-y-space-5"
              style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${PURPLE}0.65)` }}>
                The core insight
              </p>
              <p className="text-base text-neutral-700 leading-relaxed">
                Most teams rush to solutions because they feel the pressure of time, resources, and
                stakeholders, and skip straight to &ldquo;how do we fix this?&rdquo; The Double
                Diamond insists on a different sequence:
              </p>
              <ol className="space-y-space-3">
                {[
                  'Expand your understanding of the problem space. Gather more information than you think you need. Challenge every assumption.',
                  'Narrow down to the real problem. Synthesise what you learned and define exactly what you are and are not trying to solve.',
                  'Expand again. Generate more ideas than any one of them deserves. Build concepts before evaluating them.',
                  'Narrow again. Test, refine, and deliver the solution that works.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-space-4">
                    <span
                      className="font-mono text-xs font-semibold shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                      style={{ background: `${PURPLE}0.70)`, fontSize: '0.6875rem' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-neutral-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <div
                className="pt-space-4 border-t"
                style={{ borderColor: 'var(--color-neutral-200)' }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-2">Real-world example</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  When Airbnb was struggling early, the founders flew to New York, stayed with hosts,
                  and observed. They discovered the real problem: listing photos were terrible. The
                  solution, professional photography, came directly from understanding the problem
                  firsthand. This is the first diamond working as intended.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </LightSection>

      {/* ═══════════════════════════════════════════════════════════════════
          WHEN TO USE: warm surface, two-column grid
      ══════════════════════════════════════════════════════════════════════ */}
      <WarmSection>
        <Container className="py-space-10">
          <ScrollReveal>
            <Eyebrow className="mb-space-6">When to use it</Eyebrow>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-4 max-w-prose">
            {[
              {
                heading: 'Use it when',
                items: [
                  'The problem is not yet defined',
                  'You are solving for people',
                  'Stakeholders disagree about what the problem is',
                  'Past solutions have not stuck',
                ],
                positive: true,
              },
              {
                heading: 'Do not use it when',
                items: [
                  'The problem is well understood and solutions are known',
                  'You need a fast tactical fix',
                  'The decision has already been made',
                ],
                positive: false,
              },
            ].map(({ heading, items, positive }, i) => (
              <ScrollReveal key={heading} delay={i * 0.1}>
                <div
                  className="rounded-lg p-space-6 h-full"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid rgba(17,24,39,0.08)`,
                    borderTop: `3px solid ${positive ? 'var(--color-framework)' : 'var(--color-neutral-200)'}`,
                  }}
                >
                  <p className="font-semibold text-sm text-neutral-900 mb-space-4">{heading}</p>
                  <ul className="space-y-space-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-space-2 text-sm text-neutral-600">
                        <span
                          className="mt-0.5 shrink-0"
                          style={{ color: positive ? 'var(--color-framework)' : 'var(--color-neutral-400)' }}
                        >
                          {positive ? '→' : '×'}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </WarmSection>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPLORE THE FRAMEWORK: dark, interactive viz
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection>
        <Container className="pt-space-10 pb-space-4">
          <ChapterLabel number="01" label="Explore" />
          <ScrollReveal>
            <h2
              className="font-display font-semibold mb-space-4"
              style={{
                color: '#FAFAFA',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Click any phase to see how it works
            </h2>
            <p className="text-base mb-space-8 max-w-prose" style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              Switch between the Design Council and Doblin lenses. The Doblin version adds a
              Desirable–Viable–Feasible filter at each convergence point.
            </p>
          </ScrollReveal>
          <DDInteractiveSection />
        </Container>
      </DarkSection>

      {/* ═══════════════════════════════════════════════════════════════════
          EVOLUTION: interactive timeline of versions
      ══════════════════════════════════════════════════════════════════════ */}
      <WarmSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <ChapterLabel number="02" label="Evolution" />
            <h2
              className="font-display font-semibold mb-space-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)' }}
            >
              Five versions, one discipline
            </h2>
            <p className="text-base text-neutral-600 mb-space-10 max-w-prose">
              The Double Diamond is one of the few innovation frameworks that has evolved publicly
              and transparently. Select a version to see what changed.
            </p>
          </ScrollReveal>
          <DDEvolutionTimeline />
        </Container>
      </WarmSection>

      {/* ═══════════════════════════════════════════════════════════════════
          CASE STUDY: warm surface
      ══════════════════════════════════════════════════════════════════════ */}
      <WarmSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <ChapterLabel number="03" label="Case study" />
          </ScrollReveal>

          <DDCaseStudy />
        </Container>
      </WarmSection>

      {/* ═══════════════════════════════════════════════════════════════════
          CONNECTIONS: dark, method links
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <ChapterLabel number="04" label="Connections" />
            <h2
              className="font-display font-semibold mb-space-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, color: '#FAFAFA' }}
            >
              Where this connects
            </h2>
            <p className="text-base mb-space-8 max-w-prose" style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              The Double Diamond is a framework, not a method. These are the methods and
              frameworks that slot into each phase.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-3">
            {[
              { name: 'Design Sprint', rel: 'Compresses the Develop phase into five days', slug: 'design-sprint' },
              { name: 'Lean Startup', rel: 'Build–Measure–Learn maps onto the Deliver phase', slug: 'lean-startup' },
              { name: '10 Types of Innovation', rel: 'Natural tool to use in Develop with the Doblin version', slug: '10-types-of-innovation' },
              { name: 'Jobs To Be Done', rel: 'Useful lens for the Define phase', slug: 'jobs-to-be-done' },
              { name: 'Ambition Matrix', rel: 'Used in Develop to map concepts against ambition level', slug: 'ambition-matrix' },
              { name: 'How Might We', rel: 'Primary method for translating Define insights into Develop challenges', slug: 'how-might-we' },
            ].map(({ name, rel, slug }, i) => (
              <ScrollReveal key={slug} delay={i * 0.06}>
                <a
                  href={`/methods/${slug}`}
                  className="dark-card-hover flex items-start justify-between gap-space-4 rounded-lg p-space-5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div>
                    <p className="font-semibold text-sm mb-space-1" style={{ color: '#FAFAFA' }}>{name}</p>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{rel}</p>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>→</span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </DarkSection>

      {/* ═══════════════════════════════════════════════════════════════════
          SOURCES: light, clean list
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-10">
          <div className="max-w-prose">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-6">
              Sources &amp; Further Reading
            </p>
            <div className="space-y-space-4">
              {[
                { title: 'Eleven Lessons: Managing Design in Eleven Global Companies', author: 'British Design Council, 2007' },
                { title: 'Framework for Innovation (2019 edition)', author: 'British Design Council' },
                { title: 'The Design of Business', author: 'Roger Martin, 2009' },
              ].map(({ title, author }) => (
                <div key={title} className="flex items-start gap-space-4 py-space-4 border-b border-neutral-100 last:border-0">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{ background: 'var(--color-framework)', opacity: 0.35 }}
                  />
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">{title}</p>
                    <p className="text-sm text-neutral-500 mt-space-1">{author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

    </>
  )
}
