'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PURPLE = 'rgba(124,58,237,'

const VERSIONS = [
  {
    year: '2003',
    name: 'Customer Development',
    org: 'Steve Blank',
    badge: 'Origin',
    summary:
      'The foundational precursor to the Lean Startup. Blank argued that startups spend too much time developing products and not enough time developing customers, and proposed a four-stage model for doing so.',
    changes: [
      { tag: 'Introduced', text: 'Customer Discovery: do people have the problem you think they have?' },
      { tag: 'Introduced', text: 'Customer Validation: will they pay for your solution?' },
      { tag: 'Research base', text: 'Drawn from Blank\'s experience as a serial entrepreneur and Stanford entrepreneurship teaching' },
    ],
    limitation:
      'Primarily focused on sales and customer discovery. Did not integrate with product development or manufacturing principles: left a gap that Ries later filled with the Build-Measure-Learn loop.',
  },
  {
    year: '2011',
    name: 'The Lean Startup',
    org: 'Eric Ries',
    badge: 'Foundation',
    summary:
      'The canonical framework. Synthesised Blank\'s Customer Development with lean manufacturing principles from Toyota and Agile software development into a single, continuous loop model applicable to product development.',
    changes: [
      { tag: 'Introduced', text: 'Build-Measure-Learn loop as the core engine of product development' },
      { tag: 'Introduced', text: 'Minimum Viable Product (MVP) and validated learning as the unit of progress' },
      { tag: 'Introduced', text: 'Innovation accounting and the pivot-or-persevere decision' },
    ],
    limitation:
      'Strong on what to do, light on how. MVP was frequently misapplied: teams built minimum feature sets rather than minimum artifacts to test specific assumptions. Problem discovery was underdeveloped.',
  },
  {
    year: '2012',
    name: 'Running Lean',
    org: 'Ash Maurya',
    badge: 'Adaptation',
    summary:
      'A practical step-by-step companion to the Lean Startup, adding the Lean Canvas, specific interview scripts, and a three-stage traction roadmap that gave teams a clearer sense of where they were and what to prioritise.',
    changes: [
      { tag: 'Added', text: 'Lean Canvas: a startup-optimised variant of the Business Model Canvas with Problem and Unfair Advantage blocks' },
      { tag: 'Added', text: 'Specific interview frameworks for problem, solution, and scaling stages' },
      { tag: 'Added', text: 'Three-stage traction roadmap: problem-solution fit → product-market fit → scale' },
    ],
    limitation: null,
  },
  {
    year: '2013',
    name: 'Disciplined Entrepreneurship',
    org: 'Bill Aulet, MIT',
    badge: 'Alternative',
    summary:
      'A 24-step alternative that addresses the Lean Startup\'s weaknesses with explicit sequencing. Where Lean Startup says "test your assumptions," Disciplined Entrepreneurship specifies exactly which assumptions to test and in what order.',
    changes: [
      { tag: 'Added', text: 'A specific 24-step sequence from market segmentation through pricing and sales process design' },
      { tag: 'Added', text: 'Explicit beachhead market selection before any other decisions are made' },
      { tag: 'Changed', text: 'Unit economics model must be resolved before pursuing growth: not retrofitted later' },
    ],
    limitation:
      'More structured than most startup contexts require. Best suited to B2B enterprise and inexperienced teams needing scaffolding. Can be too rigid for fast-moving consumer markets.',
  },
  {
    year: '2021',
    name: 'Continuous Discovery Habits',
    org: 'Teresa Torres',
    badge: 'Extension',
    summary:
      'Addresses the gap between discovery and delivery that the original Lean Startup left open. Torres proposes weekly customer interviews as a non-negotiable practice and an opportunity solution tree for connecting desired outcomes to solutions.',
    changes: [
      { tag: 'Added', text: 'Weekly customer interviews as a continuous, non-negotiable team practice' },
      { tag: 'Added', text: 'Opportunity solution tree: a structured artefact mapping outcomes, opportunities, and solutions' },
      { tag: 'Changed', text: 'Discovery woven into every sprint rather than a phase that precedes development' },
    ],
    limitation:
      'Assumes product teams with enough autonomy to conduct their own research. Less directly applicable to teams working under heavy feature-request governance or with long sales cycles.',
  },
  {
    year: 'Corp.',
    name: 'Corporate Innovation Adaptation',
    org: 'Various: Strategyzer, Lean LaunchPad',
    badge: 'Adaptation',
    summary:
      'As the Lean Startup spread into established organisations, practitioners developed adaptations addressing corporate-specific constraints: larger teams, compliance requirements, longer decision cycles, and a different relationship with risk.',
    changes: [
      { tag: 'Added', text: 'Pre-committed decision criteria: set pivot-or-persevere thresholds before the experiment runs, not after' },
      { tag: 'Changed', text: 'Translated MVPs: minimum artifact that clears brand and regulatory constraints while still testing the key assumption' },
      { tag: 'Added', text: 'Innovation accounting translated to finance language: risk reduction metrics and assumption confidence levels' },
    ],
    limitation:
      'Speed of iteration is typically slower: a startup might run three loops per month, a corporate team three per quarter. The logic is identical; the tempo differs.',
  },
]

export default function LSEvolutionTimeline() {
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
        <div className="flex md:grid md:grid-cols-6 gap-space-2 overflow-x-auto pb-space-2 relative">
          {VERSIONS.map((ver, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-space-2 min-w-[60px] flex-1"
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
