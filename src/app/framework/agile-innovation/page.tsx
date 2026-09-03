import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { DarkSection, LightSection, WarmSection } from '../../../components/method/Primitives'

const AIHero = dynamic(() => import('./AIHero'), { ssr: false })
const AIRhythmSection = dynamic(() => import('./AIRhythmSection'), { ssr: false })
const AIInteractiveSection = dynamic(() => import('./AIInteractiveSection'), {
  ssr: false,
  loading: () => (
    <div className="py-space-12 flex items-center justify-center" style={{ minHeight: 400, color: 'rgba(255,255,255,0.25)' }}>
      <span className="font-mono text-2xs uppercase tracking-widest">Loading interactive diagram...</span>
    </div>
  ),
})
const AIEvolutionTimeline = dynamic(() => import('./AIEvolutionTimeline'), { ssr: false })
const AICaseStudy = dynamic(() => import('./AICaseStudy'), { ssr: false })

export const metadata: Metadata = {
  title: 'Agile Innovation — Innovation 101',
  description: 'Agile Innovation applies the iterative rhythms of Agile development to the broader innovation process, enabling organizations to move from insight to delivery in short, focused cycles while keeping the flexibility to change direction as they learn.',
}


const PLUM = 'rgba(107,77,122,'

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-space-4 mb-space-8">
      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${PLUM}0.60)` }}>
        {number}
      </span>
      <div className="h-px flex-1" style={{ background: `${PLUM}0.15)` }} />
      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${PLUM}0.60)` }}>
        {label}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgileInnovationPage() {
  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO: dark, full viewport
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 55%, ${PLUM}0.12) 0%, transparent 70%)`,
          }}
        />

        <Container className="relative z-10 w-full flex flex-col justify-center flex-1 py-space-13">
          <h1
            className="font-display font-semibold text-balance mb-space-6"
            style={{ color: '#FAFAFA', fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Agile<br />Innovation
          </h1>
          <p
            className="text-xl max-w-prose mb-space-10"
            style={{ color: 'rgba(255,255,255,0.52)', lineHeight: 1.6 }}
          >
            The discipline of iterating toward the right answer. Short cycles,
            continuous user feedback, ruthless prioritization, and a discovery layer
            that keeps the delivery engine pointed at the right target.
          </p>
        </Container>

        {/* Orbit diagram: full width, outside Container */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <AIHero />
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
          THE FIVE-STAGE RHYTHM: deep dive
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${PLUM}0.65)` }}>
              The continuous rhythm
            </p>
            <h2
              className="font-display font-semibold mb-space-10"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--color-neutral-900)' }}
            >
              Each stage has one job
            </h2>
          </ScrollReveal>
          <AIRhythmSection />
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
              style={{ borderColor: 'var(--fw-agile)' }}
            >
              <p
                className="font-display font-semibold text-balance"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}
              >
                Agile development asks how to build efficiently. Agile Innovation asks what to build, then builds it efficiently.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-prose mx-auto px-6 md:px-8 space-y-space-4 mb-space-8">
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                The Agile Manifesto (2001) prioritized working software over comprehensive documentation
                and responding to change over following a plan. These principles transformed software
                development. Agile Innovation extends them to the broader innovation process: product
                development, service design, business model experimentation, and organizational change.
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                It is not Agile development renamed. It is the application of Agile&rsquo;s core
                disciplines to the messier, more ambiguous work of innovating in established organizations,
                and the addition of the{' '}
                <strong className="text-neutral-900 font-semibold">
                  discovery layer that keeps teams from building the wrong thing efficiently.
                </strong>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div
              className="max-w-prose mx-auto rounded-xl p-space-7 space-y-space-5"
              style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${PLUM}0.65)` }}>
                The core insight
              </p>
              <ol className="space-y-space-4">
                {[
                  'Uncertainty is manageable, not by eliminating it through exhaustive planning, but by designing work in short cycles that surface uncertainty quickly and cheaply. A two-week sprint that discovers a critical assumption was wrong costs two weeks. The same discovery after six months of waterfall development costs six months.',
                  'The discovery layer is what Agile development omits. Without it, teams risk being efficient at building the wrong thing. The Discovery Sprint is not optional decoration on top of Agile; it is the mechanism that keeps the delivery engine pointed at the right target.',
                  'The ability to stop is as valuable as the ability to ship. A rhythm that surfaces "this is the wrong thing" cheaply and early is worth as much as one that ships the right thing fast. Deliberate termination on evidence, after weeks rather than months, is a sign the framework is working, not failing.',
                ].map((insight, i) => (
                  <li key={i} className="flex items-start gap-space-4">
                    <span
                      className="font-mono text-xs font-semibold shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                      style={{ background: `${PLUM}0.70)`, fontSize: '0.6875rem' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-neutral-700 leading-relaxed">{insight}</span>
                  </li>
                ))}
              </ol>
              <div className="pt-space-4 border-t" style={{ borderColor: 'var(--color-neutral-200)' }}>
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-2">Real-world grounding</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Spotify&rsquo;s Squad model is built around the principle that autonomous, cross-functional
                  teams with clear missions and short feedback cycles outperform centralized, hierarchical
                  teams with long planning cycles. Spotify did not plan its product roadmap for three years.
                  It structured an organization that could discover and deliver the right product in
                  two-week increments, indefinitely.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-4 max-w-prose mx-auto px-6 md:px-8">
            {[
              {
                heading: 'Use it when',
                items: [
                  'You have a defined innovation direction but significant uncertainty about the right solution',
                  'You need to deliver something real while continuing to learn',
                  'Stakeholders need visible progress at regular intervals',
                  'The market or user needs are changing faster than a traditional plan can accommodate',
                ],
                positive: true,
              },
              {
                heading: 'Do not use it when',
                items: [
                  'The problem itself is not yet defined, use the Double Diamond\'s Discover and Define phases first',
                  'The innovation challenge requires deep, uninterrupted discovery work',
                  'Regulatory requirements mandate a sequential, gated process that cannot accommodate direction changes mid-cycle',
                ],
                positive: false,
              },
            ].map(({ heading, items, positive }, i) => (
              <ScrollReveal key={heading} delay={i * 0.1}>
                <div
                  className="rounded-lg p-space-6 h-full"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(17,24,39,0.08)',
                    borderTop: `3px solid ${positive ? 'var(--fw-agile)' : 'var(--color-neutral-200)'}`,
                  }}
                >
                  <p className="font-semibold text-sm text-neutral-900 mb-space-4">{heading}</p>
                  <ul className="space-y-space-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-space-2 text-sm text-neutral-600">
                        <span
                          className="mt-0.5 shrink-0"
                          style={{ color: positive ? 'var(--fw-agile)' : 'var(--color-neutral-500)' }}
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
              Click any stage to see how it works
            </h2>
            <p className="text-base mb-space-8 max-w-prose mx-auto px-6 md:px-8" style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              Select a stage to explore its activities and a real-world company example. Use the
              readiness check first, or toggle Standard Agile mode to see what the rhythm looks like
              without the Discovery Sprint, and what that costs.
            </p>
          </ScrollReveal>
          <AIInteractiveSection />
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
              Six versions, one engine
            </h2>
            <p className="text-base text-neutral-600 mb-space-10 max-w-prose mx-auto px-6 md:px-8">
              Agile began as a philosophy and evolved into a family of frameworks, each making different
              tradeoffs between prescription and flexibility, team autonomy and organizational alignment,
              speed and governance. Select a version to see what changed and what stayed the same.
            </p>
          </ScrollReveal>
          <AIEvolutionTimeline />
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
          <AICaseStudy />
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
            <p className="text-base mb-space-8 max-w-prose mx-auto px-6 md:px-8" style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              Agile Innovation is the operational cadence of innovation: it answers &ldquo;how do we keep
              discovering and delivering, continuously, without losing the thread?&rdquo; These are the
              frameworks and methods that answer the adjacent questions.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-3">
            {[
              { name: 'Double Diamond', rel: 'The Discovery Sprint is the ongoing version of the Double Diamond\'s Discover and Define phases, running continuously rather than once', slug: '/framework/double-diamond' },
              { name: 'Lean Startup', rel: 'Lean Startup provides the strategic direction and hypothesis-testing logic; Agile Innovation provides the operational cadence that runs it continuously', slug: '/framework/lean-startup' },
              { name: 'Design Sprint', rel: 'A Design Sprint is a compressed five-day version of the Agile Innovation cycle, useful for resolving specific uncertainties the standing rhythm cannot address quickly enough', slug: '/framework/design-sprint' },
              { name: 'Design Thinking', rel: 'Design Thinking shapes the human understanding that feeds the Discovery Sprint; Agile Innovation operationalizes the delivery of what that understanding reveals', slug: '/framework/design-thinking' },
              { name: 'Assumption Mapping', rel: 'The core method for maintaining a hypothesis-driven backlog, making the risk profile of each backlog item visible', slug: '/methods/assumption-mapping' },
              { name: 'Depth Interviews', rel: 'The core research method of the Discovery Sprint, the mechanism that continuously refreshes the team\'s understanding of the problem space', slug: '/methods/depth-interviews' },
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
          <div className="max-w-prose mx-auto px-6 md:px-8">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-6">
              Sources &amp; Further Reading
            </p>
            <div className="space-y-space-4">
              {[
                { title: 'The Agile Manifesto', author: 'Beck, Beedle, van Bennekum et al., 2001, agilemanifesto.org' },
                { title: 'The Innovator\'s Method', author: 'Nathan Furr and Jeff Dyer, 2014' },
                { title: 'The Lean Startup', author: 'Eric Ries, 2011' },
                { title: 'Team Topologies', author: 'Matthew Skelton and Manuel Pais, 2019' },
                { title: 'Shape Up', author: 'Ryan Singer at Basecamp / 37signals, 2019, basecamp.com/shapeup' },
              ].map(({ title, author }) => (
                <div key={title} className="flex items-start gap-space-4 py-space-4 border-b border-neutral-100 last:border-0">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{ background: 'var(--fw-agile)', opacity: 0.35 }}
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
