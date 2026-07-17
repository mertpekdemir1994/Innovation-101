import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { DarkSection, LightSection, WarmSection } from '../../../components/method/Primitives'

const FDEHeroOrbit    = dynamic(() => import('./FDEHeroOrbit'),    { ssr: false })
const FDEMovementsLoop = dynamic(() => import('./FDEMovementsLoop'), { ssr: false })
const FDEInteractiveSection = dynamic(() => import('./FDEInteractiveSection'), {
  ssr: false,
  loading: () => (
    <div className="py-space-12 flex items-center justify-center" style={{ minHeight: 400, color: 'rgba(255,255,255,0.25)' }}>
      <span className="font-mono text-2xs uppercase tracking-widest">Loading interactive diagram…</span>
    </div>
  ),
})
const FDEVariantsSpectrum = dynamic(() => import('./FDEVariantsSpectrum'), { ssr: false })
const FDECaseStudy = dynamic(() => import('./FDECaseStudy'), { ssr: false })
const FDEDiagnostic = dynamic(() => import('./FDEDiagnostic'), { ssr: false })

export const metadata: Metadata = {
  title: 'Forward Deployed Engineering — Innovation 101',
  description: 'Forward Deployed Engineering embeds highly skilled engineers directly with customers, empowered to build custom solutions in the field with radical autonomy — with successful innovations migrating back to the core platform.',
}


const BRICK = 'rgba(185,28,28,'

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-space-4 mb-space-8">
      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${BRICK}0.60)` }}>
        {number}
      </span>
      <div className="h-px flex-1" style={{ background: `${BRICK}0.15)` }} />
      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${BRICK}0.60)` }}>
        {label}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FDEPage() {
  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — dark, full viewport
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 55%, ${BRICK}0.10) 0%, transparent 70%)`,
          }}
        />

        <Container className="relative z-10 pt-space-13 pb-space-4">
          <p
            className="font-mono text-2xs uppercase tracking-widest mb-space-4"
            style={{ color: `${BRICK}0.65)` }}
          >
            The most radical model
          </p>
          <h1
            className="font-display font-semibold text-balance mb-space-6"
            style={{ color: '#FAFAFA', fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Forward<br />Deployed<br />Engineering
          </h1>
          <p
            className="text-xl max-w-prose"
            style={{ color: 'rgba(255,255,255,0.52)', lineHeight: 1.6 }}
          >
            Engineers embedded directly with customers. The field as the product lab. Customer deployments
            treated as R&amp;D, not delivery. Field innovations migrating back to the core platform.
          </p>
        </Container>

        {/* Decorative orbit diagram */}
        <div className="relative z-10 w-full px-space-4 md:px-space-8 pb-space-10">
          <FDEHeroOrbit />
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
          THE FOUR MOVEMENTS — interactive walkthrough
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-12">

          {/* Honest warning — moved here from hero */}
          <ScrollReveal>
            <div
              className="max-w-prose rounded-xl px-space-6 py-space-5 mb-space-10"
              style={{ background: `${BRICK}0.05)`, border: `1px solid ${BRICK}0.18)` }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${BRICK}0.72)` }}>
                Read this before going further
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-space-3">
                Barry McCardel (former Palantir, co-founder of Hex) has written candidly about why FDE is the
                wrong model for most organizations. His three conditions for true FDE:
              </p>
              <ul className="space-y-space-2 mb-space-4">
                {[
                  'Engineers who combine top-tier technical skill with customer-facing charisma, creative problem-solving under pressure, and independent product judgment — a profile that is exceptionally rare and expensive.',
                  "Acceptance that field teams will overlap, duplicate, and sometimes contradict each other's work. Many builds will fail. Most organizations and investors cannot stomach the waste.",
                  'Genuine subordination of the central product roadmap to field team discoveries. An organization with a planning function that controls what gets built cannot do true FDE.',
                ].map((cond, i) => (
                  <li key={i} className="flex items-start gap-space-3 text-sm text-neutral-600">
                    <span style={{ color: `${BRICK}0.55)`, flexShrink: 0 }}>—</span>
                    {cond}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold italic" style={{ color: `${BRICK}0.80)` }}>
                &ldquo;FDE is not Forward Deployed Engineering unless all three of these are true. Otherwise it is sparkling Sales Engineering.&rdquo; — Barry McCardel
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${BRICK}0.65)` }}>
              The operating model
            </p>
            <h2
              className="font-display font-semibold mb-space-3"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--color-neutral-900)' }}
            >
              Four movements, one continuous cycle
            </h2>
            <p className="text-base text-neutral-500 mb-space-10 max-w-prose">
              Select a movement on the loop to explore its objective, key activities, and the question it forces you to answer.
            </p>
          </ScrollReveal>

          <FDEMovementsLoop />
        </Container>
      </LightSection>

      {/* ═══════════════════════════════════════════════════════════════════
          THE CORE TRUTH — the inversion argument
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container className="py-space-12 md:py-space-13">
          <ScrollReveal>
            <div
              className="border-l-4 pl-space-8 mb-space-10"
              style={{ borderColor: 'var(--fw-fde)' }}
            >
              <p
                className="font-display font-semibold text-balance"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}
              >
                Every other innovation model translates customer problems. FDE eliminates the translation entirely.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-prose space-y-space-4 mb-space-8">
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                Most organizations build products from offices, developing solutions based on market research,
                user interviews, roadmap planning sessions, and requirements documents. The people who understand
                the user&rsquo;s world most deeply — field teams, account managers, implementation consultants —
                are separated from the people who build the product by organizational structure, geography, and process.
              </p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                FDE collapses this separation entirely. The engineers are in the field. The field is the product
                lab. The customer&rsquo;s real problems — not a distilled, translated, and deprioritized version of
                them — drive what gets built next. Understanding FDE is valuable even for organizations that will
                never implement it, because it exposes the assumptions embedded in{' '}
                <strong className="text-neutral-900 font-semibold">every other innovation model.</strong>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div
              className="max-w-prose rounded-xl p-space-7 space-y-space-5"
              style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${BRICK}0.65)` }}>
                The question FDE asks every other model
              </p>
              <p className="text-base text-neutral-700 leading-relaxed">
                What would your organization build differently if engineers were in the room when the
                problem occurred, rather than receiving a report about it three months later?
              </p>
              <div className="pt-space-4 border-t" style={{ borderColor: 'var(--color-neutral-200)' }}>
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-2">The Auftragstaktik principle</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Palantir&rsquo;s FDE model is built on Auftragstaktik — a military doctrine in which senior leaders
                  set high-level objectives and leave all other decisions to people in the field. Senior leadership
                  defines the mission. FDEs decide how to achieve it. There is no central approval process for
                  field decisions. This doctrine is what makes FDE genuinely different from professional services
                  or implementation consulting — and what makes it genuinely hard to run.
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
            <Eyebrow className="mb-space-6">When to consider it</Eyebrow>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-4 max-w-prose">
            {[
              {
                heading: 'Genuine FDE may be worth exploring when',
                items: [
                  'Your market consists of large complex organizations (Fortune 500 or government) willing to pay premium prices for context-specific solutions',
                  'You do not yet know what the right product is and believe field discovery is the fastest way to find out',
                  'You can hire engineers who are simultaneously world-class at building and at customer engagement',
                  'Your leadership can genuinely tolerate the chaos and unpredictability of bottoms-up product discovery',
                  'You are building a platform designed for extensibility from day one',
                ],
                positive: true,
              },
              {
                heading: 'FDE is almost certainly wrong for you when',
                items: [
                  'You are a SaaS business selling one standardized product',
                  'Your unit economics depend on low cost-to-serve',
                  'Your investors require predictable product roadmaps',
                  'Your engineering team is measured on story points, velocity, or feature shipping rate',
                  'Your definition of success is a Gantt chart on slide 71 of a quarterly deck',
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
                    borderTop: `3px solid ${positive ? 'var(--fw-fde)' : 'var(--color-neutral-200)'}`,
                  }}
                >
                  <p className="font-semibold text-sm text-neutral-900 mb-space-4">{heading}</p>
                  <ul className="space-y-space-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-space-2 text-sm text-neutral-600">
                        <span className="mt-0.5 shrink-0" style={{ color: positive ? 'var(--fw-fde)' : 'var(--color-neutral-400)' }}>
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
          EXPLORE — dark, commitment spectrum
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection>
        <Container className="pt-space-10 pb-space-4">
          <ChapterLabel number="01" label="Explore" />
          <ScrollReveal>
            <h2
              className="font-display font-semibold mb-space-4"
              style={{ color: '#FAFAFA', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              FDE is a spectrum, not a binary choice
            </h2>
            <p className="text-base mb-space-8 max-w-prose" style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              Select a variant on the commitment spectrum to see what FDE looks like at that level of commitment —
              from the full Palantir model to Commitment Engineering, which delivers most of FDE&rsquo;s core
              benefit at a fraction of the cost.
            </p>
          </ScrollReveal>
          <FDEInteractiveSection />
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
              Four variants, one core insight
            </h2>
            <p className="text-base text-neutral-600 mb-space-10 max-w-prose">
              FDE has not evolved through official versioning the way Design Sprint 2.0 emerged from
              the original. It has evolved through practitioners leaving Palantir, founding new
              companies, and either replicating, adapting, or explicitly rejecting the model based on
              what they learned. The result is not a sequence of dated releases but a spectrum of
              related approaches — some fully committed to the Palantir ethos, others that distill
              specific FDE principles into more accessible forms. The four variants below are ordered
              from highest commitment to lowest. Select a variant to see how it works and what it
              trades off.
            </p>
          </ScrollReveal>
          <FDEVariantsSpectrum />
        </Container>
      </WarmSection>

      {/* ═══════════════════════════════════════════════════════════════════
          CASE STUDY — Palantir Foundry (REAL)
      ══════════════════════════════════════════════════════════════════════ */}
      <WarmSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <ChapterLabel number="03" label="Case study" />
          </ScrollReveal>
          <FDECaseStudy />
        </Container>
      </WarmSection>

      {/* ═══════════════════════════════════════════════════════════════════
          DIAGNOSTIC — Is FDE right for you?
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <ChapterLabel number="04" label="Diagnostic" />
            <h2
              className="font-display font-semibold mb-space-4"
              style={{ color: '#FAFAFA', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Is FDE right for you?
            </h2>
          </ScrollReveal>
          <FDEDiagnostic />
        </Container>
      </DarkSection>

      {/* ═══════════════════════════════════════════════════════════════════
          CONNECTIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection>
        <Container className="py-space-12">
          <ScrollReveal>
            <ChapterLabel number="05" label="Connections" />
            <h2
              className="font-display font-semibold mb-space-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15, color: '#FAFAFA' }}
            >
              Where this connects
            </h2>
            <p className="text-base mb-space-8 max-w-prose" style={{ color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              FDE is an extreme version of the customer-proximity principle that runs through every framework
              in this library. These are the frameworks and methods that FDE relates to most directly.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-3">
            {[
              { name: 'Agile Innovation', rel: 'FDE is an extreme version of Agile Innovation run in a customer-embedded context; the Discovery Sprint becomes the customer deployment itself', slug: '/framework/agile-innovation' },
              { name: 'Lean Startup', rel: 'FDE\'s field deployments are a form of MVP testing — each customer engagement tests the hypothesis that the platform can solve this category of problem', slug: '/framework/lean-startup' },
              { name: 'Double Diamond', rel: 'The Embed movement is an ongoing, immersive version of the Discover phase — never-ending because the customer\'s context never stops changing', slug: '/framework/double-diamond' },
              { name: 'Design Thinking', rel: 'FDE\'s embeddedness is the most intensive possible form of the Empathize stage, carried continuously through delivery rather than done once at the start', slug: '/framework/design-thinking' },
              { name: 'Design Sprint', rel: 'Can be run inside an FDE engagement as a way to compress specific problem-solving within a broader field deployment', slug: '/framework/design-sprint' },
              { name: 'Contextual Observation', rel: 'The Embed movement is contextual observation taken to its furthest extreme — not a research activity but a continuous operating mode', slug: '/methods/contextual-observation' },
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
          <div className="max-w-prose">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-6">
              Sources &amp; Further Reading
            </p>
            <div className="space-y-space-4">
              {[
                { title: 'Understanding Forward Deployed Engineering', author: 'Barry McCardel — barry.ooo (primary source)' },
                { title: 'Reflections on Palantir', author: 'Nabeel Qureshi — nabeelqu.co' },
                { title: 'Zero to One', author: 'Peter Thiel with Blake Masters, 2014' },
                { title: 'Team Topologies', author: 'Matthew Skelton and Manuel Pais, 2019 (on organizational design for fast flow)' },
              ].map(({ title, author }) => (
                <div key={title} className="flex items-start gap-space-4 py-space-4 border-b border-neutral-100 last:border-0">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{ background: 'var(--fw-fde)', opacity: 0.35 }}
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
