'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(185,28,28,'

type VariantKey = 'palantir' | 'distyl' | 'embedded' | 'commitment'

type Variant = {
  key: VariantKey
  shortLabel: string
  commitmentLabel: string
  name: string
  who: string
  summary: string[]
  changes: { tag: string; text: string }[]
  limitation: string
  prompt?: string
  nodeOpacity: number
}

const VARIANTS: Variant[] = [
  {
    key: 'palantir',
    shortLabel: 'Palantir FDE',
    commitmentLabel: 'Highest',
    name: 'The Original Palantir FDE Model',
    who: 'Palantir Technologies (emerged early 2000s)',
    summary: [
      'The original and most extreme version, described in detail through the movements above. Engineers embedded with customers for months or years, building custom solutions with radical autonomy, treating customer deployments as R&D rather than delivery, with successful field innovations migrating back to a core platform.',
      'The model works because three conditions are simultaneously true at Palantir: the customers are large enough to pay premium prices that support the cost structure, the problems are complex enough to require genuinely custom solutions, and the organizational culture genuinely subordinates the product roadmap to field team discoveries. Remove any one of these conditions and the model breaks.',
    ],
    changes: [
      { tag: 'Introduced', text: 'Full engineer embeddedness at customer sites for months or years — the FDE is not a visitor but a presence' },
      { tag: 'Introduced', text: 'Auftragstaktik: leadership sets high-level mission, FDE teams make all field decisions without central approval' },
      { tag: 'Introduced', text: 'Embed-Build-Extract-Migrate cycle: field-built innovations migrate back to the core platform, enriching it continuously' },
    ],
    limitation:
      'Requires engineers who simultaneously combine top-tier technical skill, customer-facing charisma, creative problem-solving under pressure, and independent product judgment. This profile is exceptionally rare and expensive. Also requires investors who can tolerate a cost structure where many deployments will have negative individual margins.',
    nodeOpacity: 1.0,
  },
  {
    key: 'distyl',
    shortLabel: 'Distyl Model',
    commitmentLabel: 'High',
    name: 'The Distyl Model',
    who: 'Arjun Narayan at Distyl AI (cited by McCardel; no single origin date)',
    summary: [
      "McCardel cites Distyl as the only company he is aware of truly replicating the Palantir FDE model as a startup strategy, intentionally metabolizing all the pain and tradeoffs of true forward-deployed culture. Distyl deploys engineers directly with enterprise AI customers, building custom ML and data infrastructure solutions in the customer's environment, treating each deployment as both a revenue event and a product discovery mechanism.",
      "The key difference from Palantir: Distyl chose FDE as a deliberate founding strategic decision, not discovered it as an emergent practice. The business model, pricing, hiring profile, and organizational culture were designed from day one to support FDE rather than retrofitted onto an existing company structure. The intentional version may be more replicable than Palantir's emergent one, because the tradeoffs are understood in advance.",
    ],
    changes: [
      { tag: 'Deliberate', text: 'FDE chosen as a founding strategy, not discovered through iteration — business model and hiring profile designed around it from day one' },
      { tag: 'Updated', text: 'Applied to enterprise AI / ML infrastructure, where genuine problem complexity and customer-specificity justify the FDE cost structure' },
      { tag: 'Insight', text: "Designing a company explicitly for FDE from the start may be more replicable than Palantir's emergent model, because the tradeoffs are understood in advance" },
    ],
    limitation:
      "Still requires the same rare engineer profile as the original Palantir model. The intentional approach may make the business model more coherent but does not reduce the talent requirement or the investors' need to tolerate operational unpredictability.",
    nodeOpacity: 0.70,
  },
  {
    key: 'embedded',
    shortLabel: 'Embedded Team',
    commitmentLabel: 'Medium',
    name: 'The Embedded Product Team',
    who: 'Synthesized from enterprise software and consulting practices (no single origin date)',
    summary: [
      "A broader organizational pattern that shares FDE's core insight — that proximity to the customer's real context produces better product decisions — without requiring Palantir's cost structure or organizational model.",
      'A small cross-functional team (typically a product manager, a designer, and one to two engineers) spends a defined period, usually four to twelve weeks, embedded with a specific customer or customer segment. They are not there to implement. They are there to understand and prototype. The embedded team develops firsthand knowledge of the customer\'s workflows, pain points, and working environment that no amount of user research from a distance replicates.',
    ],
    changes: [
      { tag: 'Changed', text: 'Time-bounded rather than open-ended — four to twelve weeks, with a defined handoff back to the standard product process' },
      { tag: 'Changed', text: 'Focused on understanding and prototyping rather than building production systems in the field' },
      { tag: 'Used by', text: 'Enterprise software companies embedded in key accounts during new product development; internal innovation teams embedded in specific business units' },
    ],
    limitation:
      'The time-bounded format limits the depth of knowledge that can be built. True embeddedness — the kind that surfaces the invisible workarounds and informal power structures — requires sustained presence over time, more than most organizations are willing to commit to a single customer engagement.',
    nodeOpacity: 0.50,
  },
  {
    key: 'commitment',
    shortLabel: 'Commitment Eng.',
    commitmentLabel: 'Lower',
    name: 'Commitment Engineering',
    who: 'Hex (Barry McCardel and colleagues), 2020s',
    summary: [
      "After leaving Palantir, the founding team of Hex explicitly chose not to replicate FDE at their new company. But they did not abandon all FDE-inspired practices. Instead they developed Commitment Engineering: a lighter-weight approach to embedding customer feedback into the product development process without the full cost structure of true FDE.",
      "Product and engineering leads establish close, ongoing relationships with a small number of high-trust customers who are willing to share unfiltered feedback, participate in early-stage testing, and co-develop features. The company is building one product, not custom solutions — but the customers shaping that product are closer and more trusted than standard enterprise customer relationships.",
    ],
    changes: [
      { tag: 'Removed', text: 'Custom field builds for individual customers — Commitment Engineering feeds one shared product, not bespoke deployments' },
      { tag: 'Preserved', text: 'Deep customer proximity and trust — a small set of high-trust partners shape the product with unfiltered ongoing input' },
      { tag: 'Better when', text: 'Almost always, for companies not targeting Palantir-scale enterprise customers with genuinely complex, non-standardizable problems' },
    ],
    limitation:
      'Requires genuinely high-trust, high-bandwidth customer relationships that are hard to build and maintain at scale. The model depends on customers who will tell you uncomfortable truths, not just encouraging feedback.',
    prompt:
      'Who are the three customers or users you could develop a Commitment Engineering relationship with? What would it look like to give them access to your early-stage product thinking in exchange for unfiltered, ongoing feedback?',
    nodeOpacity: 0.35,
  },
]

const BEST_FOR: Record<VariantKey, string> = {
  palantir: 'Complex enterprise/government problems, premium pricing, genuine field autonomy',
  distyl: 'Startups choosing FDE as a deliberate founding strategy with a matching business model',
  embedded: 'Time-bounded deep discovery feeding a standard product process',
  commitment: 'Almost everyone else: deep customer grounding without the FDE cost structure',
}

export default function FDEVariantsSpectrum() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()
  const v = VARIANTS[active]

  return (
    <div>
      {/* Axis labels */}
      <div className="flex items-center justify-between mb-space-2">
        <span className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${BRICK}0.70)` }}>
          ← Highest commitment
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest" style={{ color: 'var(--color-neutral-400)' }}>
          Lowest commitment →
        </span>
      </div>

      {/* Spectrum track + nodes */}
      <div className="relative mb-space-10">
        <div
          className="absolute top-4 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, ${BRICK}0.50) 0%, ${BRICK}0.10) 100%)`,
          }}
        />
        <div className="grid grid-cols-4 relative">
          {VARIANTS.map((variant, i) => (
            <button
              key={variant.key}
              type="button"
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-space-2"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold relative z-10 transition-all duration-200"
                style={{
                  background: active === i
                    ? `${BRICK}1)`
                    : `${BRICK}${variant.nodeOpacity * 0.12})`,
                  border: `1px solid ${active === i ? 'transparent' : `${BRICK}${variant.nodeOpacity * 0.30})`}`,
                  color: active === i ? '#fff' : `${BRICK}${variant.nodeOpacity * 0.85})`,
                  transform: active === i ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: active === i ? `0 0 0 4px ${BRICK}0.10)` : 'none',
                }}
              >
                {i + 1}
              </div>
              <p
                className="font-mono text-2xs uppercase tracking-widest text-center leading-tight transition-colors duration-200"
                style={{
                  color: active === i ? `${BRICK}0.90)` : 'var(--color-neutral-400)',
                  maxWidth: 80,
                }}
              >
                {variant.shortLabel}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 gap-space-8"
        >
          {/* Left — summary */}
          <div>
            <div className="flex items-center gap-space-3 mb-space-5">
              <span
                className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full"
                style={{
                  color: `${BRICK}0.80)`,
                  background: `${BRICK}0.08)`,
                  border: `1px solid ${BRICK}0.15)`,
                }}
              >
                {v.commitmentLabel} commitment
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-space-2">{v.name}</h3>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-5">{v.who}</p>
            <div className="space-y-space-3">
              {v.summary.map((para, j) => (
                <p key={j} className="text-base text-neutral-600 leading-relaxed">{para}</p>
              ))}
            </div>

            {v.limitation && (
              <div
                className="mt-space-6 rounded-lg px-space-5 py-space-4"
                style={{ background: 'rgba(17,24,39,0.03)', border: '1px solid rgba(17,24,39,0.08)' }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-2">
                  Acknowledged limitation
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">{v.limitation}</p>
              </div>
            )}

            {v.prompt && (
              <div
                className="mt-space-4 rounded-lg px-space-5 py-space-4"
                style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.12)` }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: `${BRICK}0.55)` }}>
                  Prompt
                </p>
                <p className="text-sm leading-relaxed" style={{ color: `${BRICK}0.80)` }}>{v.prompt}</p>
              </div>
            )}
          </div>

          {/* Right — changes */}
          <div>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-4">
              {active === 0 ? 'What it introduced' : 'How it adapts FDE'}
            </p>
            <div className="space-y-space-3">
              {v.changes.map((change, j) => (
                <div
                  key={j}
                  className="flex gap-space-4 rounded-lg p-space-4"
                  style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-100)' }}
                >
                  <span
                    className="font-mono text-xs px-space-2 py-space-1 rounded shrink-0 self-start"
                    style={{ background: `${BRICK}0.08)`, color: `${BRICK}0.80)`, whiteSpace: 'nowrap' }}
                  >
                    {change.tag}
                  </span>
                  <p className="text-sm text-neutral-700 leading-relaxed">{change.text}</p>
                </div>
              ))}
            </div>

            {/* Prev / next nav */}
            <div className="flex items-center justify-between mt-space-8">
              {active > 0 ? (
                <button
                  type="button"
                  onClick={() => setActive(active - 1)}
                  className="text-sm font-semibold transition-opacity hover:opacity-70 flex items-center gap-space-2"
                  style={{ color: 'var(--color-neutral-600)' }}
                >
                  ← {VARIANTS[active - 1].shortLabel}
                </button>
              ) : <div />}
              {active < VARIANTS.length - 1 && (
                <button
                  type="button"
                  onClick={() => setActive(active + 1)}
                  className="text-sm font-semibold transition-opacity hover:opacity-70 flex items-center gap-space-2"
                  style={{ color: `${BRICK}0.85)` }}
                >
                  {VARIANTS[active + 1].shortLabel} →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Summary table */}
      <div
        className="mt-space-10 rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--color-neutral-200)' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 bg-neutral-100 px-space-5 py-space-3">
          <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500">Variant</p>
          <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500">Commitment</p>
          <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 hidden md:block">Best for</p>
        </div>
        {VARIANTS.map((variant, i) => (
          <button
            key={variant.key}
            type="button"
            onClick={() => setActive(i)}
            className="w-full grid grid-cols-2 md:grid-cols-3 px-space-5 py-space-4 text-left border-t border-neutral-100 transition-colors duration-150 hover:bg-neutral-50"
            style={{ background: active === i ? `${BRICK}0.03)` : undefined }}
          >
            <p className="text-sm font-semibold text-neutral-900 pr-space-4">{variant.name}</p>
            <p className="text-sm" style={{ color: `${BRICK}${0.40 + (3 - i) * 0.15})` }}>
              {variant.commitmentLabel}
            </p>
            <p className="text-sm text-neutral-500 leading-snug hidden md:block">{BEST_FOR[variant.key]}</p>
          </button>
        ))}
      </div>

      {/* Closing statement */}
      <p className="mt-space-8 text-sm text-neutral-500 leading-relaxed max-w-prose">
        Every organization can find a place on this spectrum. The question is not &ldquo;should we do FDE?&rdquo; but
        &ldquo;how much of FDE&rsquo;s core insight — that proximity to real customer context produces better
        products — can we practically embed in our operating model?&rdquo;
      </p>
    </div>
  )
}
