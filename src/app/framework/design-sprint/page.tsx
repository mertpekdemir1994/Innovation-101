import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { DarkSection, LightSection, WarmSection } from '../../../components/method/Primitives'

const DSDaysHero = dynamic(() => import('./DSDaysHero'), { ssr: false })
const DSDaysSection = dynamic(() => import('./DSDaysSection'), { ssr: false })
const DSInteractiveSection = dynamic(() => import('./DSInteractiveSection'), {
  ssr: false,
  loading: () => (
    <div className="py-space-12 flex items-center justify-center" style={{ minHeight: 400, color: 'rgba(255,255,255,0.25)' }}>
      <span className="font-mono text-2xs uppercase tracking-widest">Loading interactive diagram...</span>
    </div>
  ),
})
const DSEvolutionTimeline = dynamic(() => import('./DSEvolutionTimeline'), { ssr: false })
const DSCaseStudy = dynamic(() => import('./DSCaseStudy'), { ssr: false })

export const metadata: Metadata = {
  title: 'Design Sprint',
  description: 'The Design Sprint is a five-day process for answering critical business questions through rapid prototyping and real user testing, compressing months of work into a single week.',
}


const CLAY = 'rgba(180,83,9,'

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-space-4 mb-space-8">
      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${CLAY}0.60)` }}>
        {number}
      </span>
      <div className="h-px flex-1" style={{ background: `${CLAY}0.15)` }} />
      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${CLAY}0.60)` }}>
        {label}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSprintPage() {
  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO: dark, full viewport
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 55%, ${CLAY}0.12) 0%, transparent 70%)`,
          }}
        />

        <Container className="relative z-10 w-full flex flex-col justify-center flex-1 py-space-13">
          <h1
            className="font-display font-semibold text-balance mb-space-6"
            style={{ color: '#FAFAFA', fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Design<br />Sprint
          </h1>
          <p
            className="text-xl mb-space-10"
            style={{ color: 'rgba(255,255,255,0.52)', lineHeight: 1.6 }}
          >
            Five focused days from problem to tested prototype. Answer a critical business question
            through design, prototyping, and real user testing, before writing a line of production
            code.
          </p>
        </Container>

        {/* Five-day diagram: full width, outside Container */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <DSDaysHero />
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
          FIVE DAYS DEEP DIVE
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${CLAY}0.65)` }}>
              The five days
            </p>
            <h2
              className="font-display font-semibold mb-space-10"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--color-neutral-900)' }}
            >
              Each day has one job
            </h2>
          </ScrollReveal>
          <DSDaysSection />
        </Container>
      </LightSection>

      {/* ═══════════════════════════════════════════════════════════════════
          THE CORE TRUTH
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-12 md:py-space-13">
          <ScrollReveal>
            <div
              className="border-l-4 pl-space-8 mb-space-10"
              style={{ borderColor: 'var(--fw-design-sprint)' }}
            >
              <p
                className="font-display font-semibold text-balance"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}
              >
                Most teams spend months building something before a user ever sees it.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-space-4 mb-space-8">
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                The Design Sprint was developed at Google Ventures by Jake Knapp, John Zeratsky,
                and Braden Kowitz between 2010 and 2016, tested across more than 150 startups and
                enterprises. Its core premise is radical: you do not need months to answer a
                critical question. You need five focused days, the right people in the room, a
                realistic prototype, and five real users.
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                The Design Sprint does not replace longer innovation processes. It accelerates the
                most expensive part of them: the moment between &ldquo;we have a promising
                idea&rdquo; and{' '}
                <strong className="text-neutral-900 font-semibold">
                  &ldquo;we know if it works.&rdquo;
                </strong>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div
              className="rounded-xl p-space-7 space-y-space-5"
              style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${CLAY}0.65)` }}>
                Three uncomfortable truths
              </p>
              <ol className="space-y-space-4">
                {[
                  'Discussion without prototyping is largely wasted time. Teams can debate the merits of an idea for weeks without learning anything that a five-hour prototype and five user interviews would not reveal in a day.',
                  'The people closest to a problem are often the worst judges of its solution. Subject-matter expertise creates blind spots. The Design Sprint deliberately brings in outsiders through user testing on Friday.',
                  'The pressure of a deadline produces better creative work than unlimited time. The five-day structure is not arbitrary; it is tight enough to prevent overthinking and long enough to produce something testable.',
                ].map((truth, i) => (
                  <li key={i} className="flex items-start gap-space-4">
                    <span
                      className="font-mono text-xs font-semibold shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                      style={{ background: `${CLAY}0.70)`, fontSize: '0.6875rem' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-neutral-700 leading-relaxed">{truth}</span>
                  </li>
                ))}
              </ol>
              <div className="pt-space-4 border-t" style={{ borderColor: 'var(--color-neutral-200)' }}>
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-2">Real-world grounding</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  When Slack was refining its onboarding experience, the team ran a Design Sprint
                  focused on the moment new users first encountered the product. In five days they
                  prototyped and tested three different onboarding flows, identified the specific
                  points of confusion causing early churn, and had a clear direction for a
                  redesign, before writing a single line of production code.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </LightSection>

      {/* ═══════════════════════════════════════════════════════════════════
          WHEN TO USE
      ══════════════════════════════════════════════════════════════════════ */}
      <WarmSection>
        <Container className="py-space-10">
          <ScrollReveal>
            <Eyebrow className="mb-space-6">When to use it</Eyebrow>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">
            {[
              {
                heading: 'Use it when',
                items: [
                  'You have a defined challenge but are uncertain which solution direction to pursue',
                  'The stakes of getting the direction wrong are high',
                  'You have been discussing a problem for weeks without reaching clarity',
                  'You want to test a risky assumption before committing to development',
                ],
                positive: true,
              },
              {
                heading: 'Do not use it when',
                items: [
                  'The problem itself is not yet defined, run the Double Diamond\'s Discover and Define first',
                  'The solution is already decided and the work is execution',
                  'You cannot get the right decision-makers in the room for five consecutive days',
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
                    borderTop: `3px solid ${positive ? 'var(--fw-design-sprint)' : 'var(--color-neutral-200)'}`,
                  }}
                >
                  <p className="font-semibold text-sm text-neutral-900 mb-space-4">{heading}</p>
                  <ul className="space-y-space-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-space-2 text-sm text-neutral-600">
                        <span
                          className="mt-0.5 shrink-0"
                          style={{ color: positive ? 'var(--fw-design-sprint)' : 'var(--color-neutral-500)' }}
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
          EXPLORE: dark, interactive
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection>
        <Container className="pt-space-10 pb-space-4">
          <ChapterLabel number="01" label="Explore" />
          <ScrollReveal>
            <h2
              className="font-display font-semibold mb-space-4"
              style={{ color: '#FAFAFA', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Click any day to see how it works
            </h2>
            <p className="text-base mb-space-8" style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              Select a day to explore its activities and a real-world company example. Use the
              sprint readiness check first, or toggle to Design Sprint 2.0 to see how Monday
              and Tuesday merge into a single four-day format.
            </p>
          </ScrollReveal>
          <DSInteractiveSection />
        </Container>
      </DarkSection>

      {/* ═══════════════════════════════════════════════════════════════════
          EVOLUTION
      ══════════════════════════════════════════════════════════════════════ */}
      <WarmSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <ChapterLabel number="02" label="Evolution" />
            <h2
              className="font-display font-semibold mb-space-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)' }}
            >
              Five versions, one engine
            </h2>
            <p className="text-base text-neutral-600 mb-space-10">
              The Design Sprint has evolved through close collaboration between its original authors
              and the practitioner community, producing named versions with documented changes.
              Select a version to see what changed and what stayed the same.
            </p>
          </ScrollReveal>
          <DSEvolutionTimeline />
        </Container>
      </WarmSection>

      {/* ═══════════════════════════════════════════════════════════════════
          CASE STUDY
      ══════════════════════════════════════════════════════════════════════ */}
      <WarmSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <ChapterLabel number="03" label="Case study" />
          </ScrollReveal>
          <DSCaseStudy />
        </Container>
      </WarmSection>

      {/* ═══════════════════════════════════════════════════════════════════
          CONNECTIONS
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
            <p className="text-base mb-space-8" style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              The Design Sprint answers &ldquo;which direction should we build, and does it work for
              real users?&rdquo; These are the frameworks and methods that answer the adjacent questions.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-3">
            {[
              { name: 'Double Diamond', rel: 'The Design Sprint compresses the Develop phase of the Double Diamond; it works best when the problem is already defined (Discover and Define complete)', slug: '/framework/double-diamond' },
              { name: 'Design Thinking', rel: 'A Design Sprint is a compressed, time-boxed expression of the Design Thinking stages: understand, sketch, decide, prototype, test', slug: '/framework/design-thinking' },
              { name: 'Lean Startup', rel: 'A sprint produces a tested prototype that feeds directly into the first Build-Measure-Learn loop for ongoing iteration after the sprint', slug: '/framework/lean-startup' },
              { name: 'How Might We', rel: 'Used on Monday to reframe problems and risks as design opportunities during expert talks', slug: '/methods/how-might-we' },
              { name: 'Crazy 8s', rel: 'A core ideation method in Tuesday\'s Four-Step Sketch: eight variations in eight minutes', slug: '/methods/crazy-8s' },
              { name: 'Rapid Prototyping', rel: 'The core building method of Thursday: a realistic facade, not an MVP or proof of concept', slug: '/methods/rapid-prototyping' },
            ].map(({ name, rel, slug }, i) => (
              <ScrollReveal key={name} delay={i * 0.06}>
                <a
                  href={slug}
                  className="dark-card-hover flex items-start justify-between gap-space-4 rounded-lg p-space-5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
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
          SOURCES
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-10">
          <div className="">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-6">
              Sources &amp; Further Reading
            </p>
            <div className="space-y-space-4">
              {[
                { title: 'Sprint', author: 'Jake Knapp, John Zeratsky, and Braden Kowitz, 2016' },
                { title: 'Make Time', author: 'Jake Knapp and John Zeratsky, 2018' },
                { title: 'Design Sprint 2.0', author: 'AJ&Smart / Jonathan Courtney, 2018' },
                { title: 'The Sprint Book: sprintbook.com', author: 'Official companion resources' },
              ].map(({ title, author }) => (
                <div key={title} className="flex items-start gap-space-4 py-space-4 border-b border-neutral-100 last:border-0">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{ background: 'var(--fw-design-sprint)', opacity: 0.35 }}
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
