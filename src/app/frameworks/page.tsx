import type { Metadata } from 'next'
import FrameworkCard  from './FrameworkCard'
import FrameworkChooser from './FrameworkChooser'
import {
  DesignThinkingMini,
  DoubleDiamondMini,
  LeanStartupMini,
  DesignSprintMini,
  AgileInnovationMini,
  FDEMini,
} from './miniIllustrations'

export const metadata: Metadata = { title: 'Frameworks · Innovation 101' }

// ── Framework data: educational/chronological-adoption order ─────────────────
const FRAMEWORKS = [
  {
    slug: 'design-thinking',
    title: 'Design Thinking',
    tagline: 'Start with the human, not the idea. Understand first, solve second.',
    bestFor: 'Products and services built for identifiable people',
    timeHorizon: 'Weeks to months',
    signatureMove: 'understand the human first',
    color: 'rgba(13,148,136,',
  },
  {
    slug: 'double-diamond',
    title: 'Double Diamond',
    tagline: 'Separate finding the right problem from finding the right solution.',
    bestFor: 'Any challenge where the problem itself is unclear',
    timeHorizon: 'Weeks to months',
    signatureMove: 'diverge then converge, twice',
    color: 'rgba(124,58,237,',
  },
  {
    slug: 'lean-startup',
    title: 'Lean Startup',
    tagline: 'Replace elaborate planning with validated learning. Every launch is a test.',
    bestFor: 'New ventures or products seeking product-market fit',
    timeHorizon: 'Weeks, ongoing',
    signatureMove: 'build, measure, learn',
    color: 'rgba(30,64,175,',
  },
  {
    slug: 'design-sprint',
    title: 'Design Sprint',
    tagline: 'Answer critical business questions through design and testing in five days.',
    bestFor: 'High-stakes decisions that need rapid validation',
    timeHorizon: 'Five days',
    signatureMove: 'five days to a tested prototype',
    color: 'rgba(180,83,9,',
  },
  {
    slug: 'agile-innovation',
    title: 'Agile Innovation',
    tagline: 'Iterative, sprint-based innovation with continuous feedback and delivery.',
    bestFor: 'Continuous product development with iterative delivery',
    timeHorizon: 'Ongoing',
    signatureMove: 'discover and deliver, continuously',
    color: 'rgba(107,77,122,',
  },
  {
    slug: 'fde',
    title: 'Forward Deployed Engineering',
    tagline: 'Embed engineers directly in customer problems before any solution is designed.',
    bestFor: 'Large orgs with complex, high-value enterprise customers',
    timeHorizon: 'Ongoing',
    signatureMove: "engineers embedded in the customer's problem",
    color: 'rgba(185,28,28,',
  },
]

const ILLUSTRATIONS: Record<string, React.ReactNode> = {
  'design-thinking':  <DesignThinkingMini  c="rgba(13,148,136,"  />,
  'double-diamond':   <DoubleDiamondMini   c="rgba(124,58,237,"  />,
  'lean-startup':     <LeanStartupMini     c="rgba(30,64,175,"   />,
  'design-sprint':    <DesignSprintMini    c="rgba(180,83,9,"    />,
  'agile-innovation': <AgileInnovationMini c="rgba(107,77,122,"  />,
  'fde':              <FDEMini             c="rgba(185,28,28,"   />,
}

const SHOW_FRAMEWORK_QUIZ = false

export default function FrameworksPage() {
  return (
    <>
      {/* ── Dark section: page header + framework cards ── */}
      <section className="dark-section" style={{ background: 'var(--color-dark)', position: 'relative' }} aria-labelledby="frameworks-page-heading">
        {/* Subtle purple radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(124,58,237,0.11) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="max-w-content mx-auto px-6 md:px-8 py-16" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Hero ── */}
          <header className="mb-14">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'rgba(124,58,237,0.80)' }}
            >
              Innovation Frameworks
            </p>
            <h1
              id="frameworks-page-heading"
              className="font-display font-bold text-balance mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#FAFAFA',
              }}
            >
              End-to-end innovation frameworks
            </h1>
            <p className="text-lg max-w-[560px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
              Six frameworks, each a complete system for moving from problem to solution. Ordered from
              foundational to radical: pick the one that fits your context.
            </p>
          </header>

          {/* ── Framework cards grid ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pb-4">
            {FRAMEWORKS.map((fw) => (
              <FrameworkCard
                key={fw.slug}
                slug={fw.slug}
                title={fw.title}
                tagline={fw.tagline}
                bestFor={fw.bestFor}
                timeHorizon={fw.timeHorizon}
                signatureMove={fw.signatureMove}
                color={fw.color}
                illustration={ILLUSTRATIONS[fw.slug]}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── Warm section: chooser (set SHOW_FRAMEWORK_QUIZ = true to re-enable) ── */}
      {SHOW_FRAMEWORK_QUIZ && (
        <section style={{ background: 'var(--color-warm-50)' }}>
          <div className="max-w-content mx-auto px-6 md:px-8 pb-20">
            <FrameworkChooser frameworks={FRAMEWORKS.map(({ slug, title, color }) => ({ slug, title, color }))} />
          </div>
        </section>
      )}
    </>
  )
}
