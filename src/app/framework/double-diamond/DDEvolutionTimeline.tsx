'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PURPLE = 'rgba(124,58,237,'

const VERSIONS = [
  {
    year: '2005',
    name: 'The Original Double Diamond',
    org: 'British Design Council',
    badge: 'Origin',
    summary:
      'The foundational framework. Introduced four phases and the language of divergence and convergence to innovation teams worldwide.',
    changes: [
      { tag: 'Introduced', text: 'Four phases: Discover, Define, Develop, Deliver' },
      { tag: 'Introduced', text: 'Diverge → Converge × 2 as the core process discipline' },
      {
        tag: 'Research base',
        text: 'Studied 11 global companies including LEGO, Sony, Microsoft, and Starbucks',
      },
    ],
    limitation:
      'Acknowledged by its creators as too linear: it implied a clear beginning and end, excluded the messiness of real design work, and told the story of a process rather than the story of impact.',
  },
  {
    year: '2019',
    name: 'Framework for Innovation',
    org: 'British Design Council',
    badge: 'Official Update',
    summary:
      'The formal revision on the framework\'s 15th anniversary. Added guiding principles, a leadership layer, and made iteration explicit throughout both diamonds.',
    changes: [
      {
        tag: 'Added',
        text: 'Four guiding principles running continuously through both diamonds: people-centred, visual communication, collaborative, and iterative',
      },
      {
        tag: 'Added',
        text: 'Leadership & engagement as an outer layer, the diamonds sit inside an organisational context that must be actively managed',
      },
      {
        tag: 'Changed',
        text: 'Explicit iteration, making and testing ideas can happen inside Discover; no solution is ever finished',
      },
    ],
    limitation: null,
  },
  {
    year: 'Doblin',
    name: 'The Doblin Adaptation',
    org: 'Larry Keeley, Doblin (now Deloitte)',
    badge: 'Adaptation',
    summary:
      'Added a Desirable–Viable–Feasible evaluation at both convergence points and ran three research streams in parallel through Discover.',
    changes: [
      {
        tag: 'Added',
        text: 'Desirable–Viable–Feasible triad applied simultaneously at both Define and Deliver',
      },
      {
        tag: 'Added',
        text: 'Three parallel research streams in Discover: user need, business model landscape, and technology capability',
      },
      {
        tag: 'Changed',
        text: 'Concept ideas that cannot articulate a viable business model hypothesis are deprioritised regardless of desirability',
      },
    ],
    limitation:
      'Adds rigour but significant overhead. Right for corporate innovation with a financial mandate; can be overkill for early-stage or social innovation.',
  },
  {
    year: 'Continuous',
    name: 'The Continuous Diamond',
    org: 'Agile & lean product practitioners',
    badge: 'Adaptation',
    summary:
      'Resolved the tension between the Double Diamond\'s implied linearity and sprint-based Agile delivery by running Discovery and Delivery in parallel, offset by one cycle.',
    changes: [
      {
        tag: 'Changed',
        text: 'Discovery and delivery run concurrently, offset by one sprint cycle',
      },
      {
        tag: 'Added',
        text: 'Discovery team leads delivery team, findings feed directly into the next sprint\'s work',
      },
      {
        tag: 'Requires',
        text: 'Two distinct teams or two distinct modes; conflating them means failing at both',
      },
    ],
    limitation:
      'The discipline is everything. Without clear separation of discovery and delivery modes, the parallel structure collapses and neither gets done well.',
  },
  {
    year: 'Systemic',
    name: 'Systemic Design Adaptation',
    org: 'RSD community & systemic design practitioners',
    badge: 'Extension',
    summary:
      'Extended the framework for challenges no single team can solve with a single solution: policy, climate, health equity, and organisational culture change.',
    changes: [
      {
        tag: 'Added',
        text: 'Pre-diamond Systems Mapping: map actors, relationships, feedback loops, and leverage points before Discover begins',
      },
      {
        tag: 'Changed',
        text: 'Define produces a leverage point in the system, not just a Point of View on user need',
      },
      {
        tag: 'Added',
        text: 'Post-diamond Systems Integration: ongoing stewardship replaces project closure',
      },
    ],
    limitation:
      'Significant additional complexity. Appropriate for systemic challenges: policy, climate, culture change. Not for product development cycles.',
  },
]

export default function DDEvolutionTimeline() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()

  const v = VERSIONS[active]

  return (
    <div>
      {/* Timeline row */}
      <div className="relative mb-space-10">
        <div
          className="absolute top-4 left-0 right-0 h-px hidden md:block"
          style={{ background: `${PURPLE}0.12)` }}
        />
        <div className="flex md:grid md:grid-cols-5 gap-space-2 overflow-x-auto pb-space-2 relative">
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
                  background: active === i ? `${PURPLE}1)` : `${PURPLE}0.08)`,
                  border: `1px solid ${active === i ? 'transparent' : `${PURPLE}0.20)`}`,
                  color: active === i ? '#fff' : `${PURPLE}0.70)`,
                }}
              >
                {i + 1}
              </div>
              <p
                className="font-mono text-2xs uppercase tracking-widest text-center leading-tight transition-colors duration-200"
                style={{ color: active === i ? `${PURPLE}0.85)` : 'var(--color-neutral-500)' }}
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
          {/* Left: summary + limitation */}
          <div>
            <div className="flex items-center gap-space-3 mb-space-5">
              <span
                className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full"
                style={{
                  color: `${PURPLE}0.80)`,
                  background: `${PURPLE}0.08)`,
                  border: `1px solid ${PURPLE}0.15)`,
                }}
              >
                {v.badge}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-space-2">{v.name}</h3>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-5">{v.org}</p>
            <p className="text-base text-neutral-600 leading-relaxed">{v.summary}</p>

            {v.limitation && (
              <div
                className="mt-space-6 rounded-lg px-space-5 py-space-4"
                style={{ background: 'rgba(17,24,39,0.03)', border: '1px solid rgba(17,24,39,0.08)' }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-2">
                  Acknowledged limitation
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">{v.limitation}</p>
              </div>
            )}
          </div>

          {/* Right: changes */}
          <div>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-4">
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
                    style={{
                      background: `${PURPLE}0.08)`,
                      color: `${PURPLE}0.80)`,
                      whiteSpace: 'nowrap',
                    }}
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
              ) : (
                <div />
              )}
              {active < VERSIONS.length - 1 && (
                <button
                  type="button"
                  onClick={() => setActive(active + 1)}
                  className="text-sm font-semibold transition-opacity hover:opacity-70 flex items-center gap-space-2"
                  style={{ color: `${PURPLE}0.85)` }}
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
