'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(185,28,28,'

const VERSIONS = [
  {
    year: 'Early 2000s',
    name: 'The Original Palantir FDE Model',
    org: 'Palantir Technologies, under Alex Karp and Peter Thiel',
    badge: 'Foundation',
    summary:
      'The original and most extreme version. Engineers embedded with customers for months or years, building custom solutions with radical autonomy, treating customer deployments as R&D rather than delivery, with successful field innovations migrating back to a core platform. The model works because three conditions are simultaneously true at Palantir: customers are large enough to pay premium prices that support the cost structure, problems are complex enough to require custom solutions, and the organizational culture subordinates the product roadmap to field team discoveries. Remove any one of these conditions and the model breaks. The FDE culture was not a deliberate strategy at the outset; it emerged as a response to reality. If every customer\'s context was different, the only way to solve their problems was to be present in their context.',
    changes: [
      { tag: 'Introduced', text: 'Full engineer embeddedness at customer sites for months or years: the FDE is not a visitor but a presence' },
      { tag: 'Introduced', text: 'Auftragstaktik: leadership sets high-level mission, FDE teams make all field decisions without central approval' },
      { tag: 'Introduced', text: 'Embed-Build-Extract-Migrate cycle: field-built innovations migrate back to the core platform, enriching it continuously' },
    ],
    limitation:
      'Requires engineers who simultaneously combine top-tier technical skill, customer-facing charisma, creative problem-solving under pressure, and independent product judgment. This profile is exceptionally rare and expensive. The model also requires investors who can tolerate a cost structure where many deployments will have negative individual margins.',
  },
  {
    year: '2021',
    name: 'Commitment Engineering',
    org: 'Barry McCardel and colleagues at Hex (after leaving Palantir)',
    badge: 'Distillation',
    summary:
      'After leaving Palantir, the Hex founding team explicitly chose not to replicate FDE at their new company. But they did not abandon all FDE-inspired practices. Instead they developed Commitment Engineering: a lighter-weight approach to embedding customer feedback into the product development process without the full cost structure of true FDE. Product and engineering leads establish close, ongoing relationships with a small number of high-trust customers who are willing to share unfiltered feedback, participate in early-stage testing, and co-develop features. These are not formal deployments; they are high-bandwidth customer relationships that function as a continuous source of grounded product direction. The company builds one product, not custom solutions, but the customers shaping that product are closer and more trusted than standard enterprise customer relationships.',
    changes: [
      { tag: 'Removed', text: 'Custom field builds for individual customers: Commitment Engineering feeds one shared product, not bespoke deployments' },
      { tag: 'Preserved', text: 'Deep customer proximity and trust: a small set of high-trust partners shape the product with unfiltered ongoing input' },
      { tag: 'Better when', text: 'Almost always, for companies not targeting Palantir-scale enterprise customers with complex, non-standardizable problems' },
    ],
    limitation:
      'Commitment Engineering requires high-trust, high-bandwidth customer relationships that are hard to build and maintain at scale. The model depends on customers who will tell you uncomfortable truths, not just encouraging feedback.',
  },
  {
    year: '2010s–Now',
    name: 'The Embedded Product Team',
    org: 'Synthesized from enterprise software and consulting practices',
    badge: 'Accessible Variant',
    summary:
      'A broader organizational pattern that shares FDE\'s core insight (that proximity to the customer\'s real context produces better product decisions) without requiring Palantir\'s cost structure. A small cross-functional team (typically a product manager, a designer, and one to two engineers) spends a defined period, usually four to twelve weeks, embedded with a specific customer or customer segment. They are not there to implement. They are there to understand and prototype. The embedded team develops firsthand knowledge of the customer\'s workflows, pain points, and working environment that no amount of user research from a distance replicates. They prototype solutions in the customer\'s actual context, getting feedback from people whose jobs depend on the problem being solved. The engagement is time-bounded and feeds back into a standard product development process.',
    changes: [
      { tag: 'Changed', text: 'Time-bounded rather than open-ended: four to twelve weeks, with a defined handoff back to the standard product process' },
      { tag: 'Changed', text: 'Focused on understanding and prototyping rather than building production systems in the field' },
      { tag: 'Used by', text: 'Enterprise software companies embedded in key accounts during new product development; internal innovation teams embedded in specific business units' },
    ],
    limitation:
      'The time-bounded format limits the depth of knowledge that can be built. True embeddedness, the kind that surfaces the invisible workarounds and informal power structures, requires sustained presence over time, more than most organizations are willing to commit to a single customer engagement.',
  },
  {
    year: '2022',
    name: 'The Distyl Model',
    org: 'Arjun Narayan at Distyl AI (cited by McCardel as the closest Palantir replication)',
    badge: 'Intentional Replication',
    summary:
      'McCardel cites Distyl as the only company he is aware of replicating the Palantir FDE model as a startup strategy, intentionally metabolizing all the pain and tradeoffs of true forward-deployed culture. Distyl deploys engineers directly with enterprise AI customers, building custom ML and data infrastructure solutions in the customer\'s environment, treating each deployment as both a revenue event and a product discovery mechanism. The key difference from Palantir: Distyl chose FDE as a deliberate founding strategic decision, not discovered it as an emergent practice. The business model, pricing, hiring profile, and organizational culture were designed from day one to support FDE rather than retrofitted onto an existing company structure. The intentional version may be more replicable than Palantir\'s emergent one.',
    changes: [
      { tag: 'Deliberate', text: 'FDE chosen as a founding strategy, not discovered through iteration: business model and hiring profile designed around it from day one' },
      { tag: 'Updated', text: 'Applied to enterprise AI / ML infrastructure, where genuine problem complexity and customer-specificity justify the FDE cost structure' },
      { tag: 'Insight', text: 'Designing a company explicitly for FDE from the start may be more replicable than Palantir\'s emergent model, because the tradeoffs are understood in advance' },
    ],
    limitation:
      'Still requires the same rare engineer profile as the original Palantir model. The intentional approach may make the business model more coherent but does not reduce the talent requirement or the investors\' need to tolerate operational unpredictability.',
  },
]

export default function FDEEvolutionTimeline() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()
  const v = VERSIONS[active]

  return (
    <div>
      {/* Timeline row */}
      <div className="relative mb-space-10">
        <div
          className="absolute top-4 left-0 right-0 h-px hidden md:block"
          style={{ background: `${BRICK}0.12)` }}
        />
        <div className="flex md:grid md:grid-cols-4 gap-space-2 overflow-x-auto pb-space-2 relative">
          {VERSIONS.map((ver, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-space-2 min-w-[72px] flex-1"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold relative z-10 transition-all duration-200"
                style={{
                  background: active === i ? `${BRICK}1)` : `${BRICK}0.08)`,
                  border: `1px solid ${active === i ? 'transparent' : `${BRICK}0.20)`}`,
                  color: active === i ? '#fff' : `${BRICK}0.70)`,
                }}
              >
                {i + 1}
              </div>
              <p
                className="font-mono text-2xs uppercase tracking-widest text-center leading-tight transition-colors duration-200"
                style={{ color: active === i ? `${BRICK}0.85)` : 'var(--color-neutral-500)' }}
              >
                {ver.year}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Active version detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 gap-space-8"
        >
          <div>
            <div className="flex items-center gap-space-3 mb-space-5">
              <span
                className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full"
                style={{ color: `${BRICK}0.80)`, background: `${BRICK}0.08)`, border: `1px solid ${BRICK}0.15)` }}
              >
                {v.badge}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-space-2">{v.name}</h3>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-5">{v.org}</p>
            <p className="text-base text-neutral-600 leading-relaxed">{v.summary}</p>

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
          </div>

          <div>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-4">
              {active === 0 ? 'What it introduced' : 'What changed'}
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

            <div className="flex items-center justify-between mt-space-8">
              {active > 0 ? (
                <button
                  type="button"
                  onClick={() => setActive(active - 1)}
                  className="text-sm font-semibold transition-opacity hover:opacity-70 flex items-center gap-space-2"
                  style={{ color: 'var(--color-neutral-600)' }}
                >
                  ← {VERSIONS[active - 1].year}
                </button>
              ) : <div />}
              {active < VERSIONS.length - 1 && (
                <button
                  type="button"
                  onClick={() => setActive(active + 1)}
                  className="text-sm font-semibold transition-opacity hover:opacity-70 flex items-center gap-space-2"
                  style={{ color: `${BRICK}0.85)` }}
                >
                  {VERSIONS[active + 1].year} →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
