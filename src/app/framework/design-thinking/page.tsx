import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { DarkSection, LightSection, WarmSection } from '../../../components/method/Primitives'

const DTStagesHero = dynamic(() => import('./DTStagesHero'), { ssr: false })
const DTStagesSection = dynamic(() => import('./DTStagesSection'), { ssr: false })
const DTInteractiveSection = dynamic(() => import('./DTInteractiveSection'), {
  ssr: false,
  loading: () => (
    <div className="py-space-12 flex items-center justify-center" style={{ minHeight: 400, color: 'rgba(255,255,255,0.25)' }}>
      <span className="font-mono text-2xs uppercase tracking-widest">Loading interactive diagram...</span>
    </div>
  ),
})
const DTEvolutionTimeline = dynamic(() => import('./DTEvolutionTimeline'), { ssr: false })
const DTCaseStudy = dynamic(() => import('./DTCaseStudy'), { ssr: false })

export const metadata: Metadata = {
  title: 'Design Thinking — Innovation 101',
  description: 'Design Thinking is a human-centered, five-stage process for solving problems by deeply understanding the people you design for before exploring and testing solutions.',
}


const TEAL = 'rgba(13,148,136,'

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-space-4 mb-space-8">
      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${TEAL}0.60)` }}>
        {number}
      </span>
      <div className="h-px flex-1" style={{ background: `${TEAL}0.15)` }} />
      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${TEAL}0.60)` }}>
        {label}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignThinkingPage() {
  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO: dark, full viewport
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 55%, ${TEAL}0.12) 0%, transparent 70%)`,
          }}
        />

        <Container className="relative z-10 w-full flex flex-col justify-center flex-1 py-space-13">
          <h1
            className="font-display font-semibold text-balance mb-space-6"
            style={{ color: '#FAFAFA', fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Design<br />Thinking
          </h1>
          <p
            className="text-xl max-w-prose mb-space-10"
            style={{ color: 'rgba(255,255,255,0.52)', lineHeight: 1.6 }}
          >
            Start with the human, not the idea. Understand first, solve second. Empathize deeply,
            define precisely, ideate widely, prototype cheaply, test honestly.
          </p>
        </Container>

        {/* Five-stage diagram: full width, outside Container */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <DTStagesHero />
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
          FIVE STAGES DEEP DIVE
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${TEAL}0.65)` }}>
              The five stages
            </p>
            <h2
              className="font-display font-semibold mb-space-10"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--color-neutral-900)' }}
            >
              Each stage has a single discipline
            </h2>
          </ScrollReveal>
          <DTStagesSection />
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
              style={{ borderColor: 'var(--fw-design-thinking)' }}
            >
              <p
                className="font-display font-semibold text-balance"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}
              >
                Most teams start in the wrong place. They begin with a solution.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-prose mx-auto px-6 md:px-8 space-y-space-4 mb-space-8">
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                Most problem-solving starts with an idea. Someone has a solution, becomes attached
                to it, and spends months building it before discovering whether anyone needed it.
                Design Thinking exists to interrupt that reflex. It insists that you begin not with
                your idea but with the human you are designing for.
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                Formalized at the Stanford d.school and popularized commercially by IDEO, Design
                Thinking is less a rigid procedure than a mindset made operational through five
                stages. The real engine is the underlying disposition:{' '}
                <strong className="text-neutral-900 font-semibold">
                  stay curious about people, resist premature solutions, make ideas tangible early,
                  and let real human response guide the work.
                </strong>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div
              className="max-w-prose mx-auto rounded-xl p-space-7 space-y-space-5"
              style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${TEAL}0.65)` }}>
                The core insight
              </p>
              <p className="text-base text-neutral-700 leading-relaxed">
                Design Thinking makes two moves that most problem-solving skips. First: it separates
                understanding from solving, spending real effort making sure the team is solving the
                right problem before rushing to solve any problem. Second: it makes ideas tangible
                early and cheaply: prototypes that let real people react before teams commit.
              </p>
              <ol className="space-y-space-3">
                {[
                  'Observe and engage with the people you are designing for, firsthand, not through surveys or assumptions.',
                  'Frame the problem precisely around a real human need, as a point of view that opens solutions rather than closing them.',
                  'Generate many possible solutions before evaluating any of them. Volume before judgment.',
                  'Build the minimum rough prototype to answer a specific question: not a draft of the product, but a question made physical.',
                  'Test with real people and let their actual response guide the next iteration. Expect to loop back.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-space-4">
                    <span
                      className="font-mono text-xs font-semibold shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                      style={{ background: `${TEAL}0.70)`, fontSize: '0.6875rem' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-neutral-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="pt-space-4 border-t" style={{ borderColor: 'var(--color-neutral-200)' }}>
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-2">Real-world example</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  A designer asked to improve an MRI scanner spent time in the hospital watching
                  children being scanned. Many were so terrified they had to be sedated. The real
                  problem was not the machine&apos;s engineering; it was the child&apos;s
                  experience. The team reframed the scanner as an adventure: pirate ship, jungle,
                  a story the child was part of. Sedation rates dropped dramatically. Nothing about
                  the machine changed. Everything about the human experience did.
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
                  'The problem is human-centered and not yet well understood',
                  'You are designing a product, service, or experience people will use',
                  'The team is attached to a solution and has not examined the problem',
                  'Past attempts have failed because they solved the wrong thing',
                ],
                positive: true,
              },
              {
                heading: 'Do not use it when',
                items: [
                  'The solution is already known and the work is execution',
                  'The problem is purely technical with no meaningful human-experience dimension',
                  'You are in a domain that demands a heavily regulated, gated process',
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
                    borderTop: `3px solid ${positive ? 'var(--fw-design-thinking)' : 'var(--color-neutral-200)'}`,
                  }}
                >
                  <p className="font-semibold text-sm text-neutral-900 mb-space-4">{heading}</p>
                  <ul className="space-y-space-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-space-2 text-sm text-neutral-600">
                        <span
                          className="mt-0.5 shrink-0"
                          style={{ color: positive ? 'var(--fw-design-thinking)' : 'var(--color-neutral-500)' }}
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
              Select a stage to explore its mindset, activities, and a real-world example. The IDEO
              three-lens model (Desirability, Feasibility, Viability) is surfaced below each stage
              panel; click a lens to see what it means.
            </p>
          </ScrollReveal>
          <DTInteractiveSection />
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
              Five versions, one conviction
            </h2>
            <p className="text-base text-neutral-600 mb-space-10 max-w-prose mx-auto px-6 md:px-8">
              Design Thinking is not a single fixed method. It is an idea shaped over decades, from
              academic roots into commercial practice and enterprise scale. Select a version to see
              what changed.
            </p>
          </ScrollReveal>
          <DTEvolutionTimeline />
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
          <DTCaseStudy />
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
              Design Thinking answers &ldquo;are we solving the right human problem, and have we
              explored solutions widely enough?&rdquo; These are the frameworks and methods that
              answer the adjacent questions.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-3">
            {[
              { name: 'Design Sprint', rel: 'A Design Sprint is a compressed, five-day expression of the Design Thinking stages (understand, sketch, decide, prototype, test) time-boxed for speed', slug: '/framework/design-sprint' },
              { name: 'Lean Startup', rel: 'Design Thinking frames the right human problem; Lean Startup rigorously tests its business viability through Build-Measure-Learn', slug: '/framework/lean-startup' },
              { name: 'Double Diamond', rel: 'The Double Diamond and Design Thinking share the same core logic: diverge to understand, converge to define, diverge to explore, converge to deliver', slug: '/framework/double-diamond' },
              { name: 'How Might We', rel: 'The core method for translating a Define point of view into Ideate challenges', slug: '/methods/how-might-we' },
              { name: 'Empathy Mapping', rel: 'A core synthesis method bridging Empathize and Define', slug: '/methods/empathy-mapping' },
              { name: 'Rapid Prototyping', rel: 'The core building method of the Prototype stage', slug: '/methods/rapid-prototyping' },
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
                { title: 'Change by Design', author: 'Tim Brown, 2009' },
                { title: 'Creative Confidence', author: 'Tom Kelley and David Kelley, 2013' },
                { title: 'The Sciences of the Artificial', author: 'Herbert Simon, 1969' },
                { title: 'IDEO Design Kit: Human-Centered Design Toolkit', author: 'IDEO.org' },
              ].map(({ title, author }) => (
                <div key={title} className="flex items-start gap-space-4 py-space-4 border-b border-neutral-100 last:border-0">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{ background: 'var(--fw-design-thinking)', opacity: 0.35 }}
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
