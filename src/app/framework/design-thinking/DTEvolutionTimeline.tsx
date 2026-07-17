'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(13,148,136,'

const VERSIONS = [
  {
    year: '1969',
    name: 'The Intellectual Roots',
    org: 'Herbert Simon / Stanford',
    badge: 'Origin',
    summary:
      'Herbert Simon\'s The Sciences of the Artificial (1969) argued that design is a distinct way of thinking — a science of how things ought to be, separate from the natural sciences that study how things are. Stanford professors Robert McKim and Rolf Faste then developed methods for teaching designerly thinking, especially the idea of deep, empathic understanding of the user as the starting point.',
    changes: [
      { tag: 'Introduced', text: 'Design as a generalizable mode of reasoning, not just an aesthetic craft' },
      { tag: 'Introduced', text: 'Empathy with the user as the root of good design — not personal preference or technical specification' },
      { tag: 'Research base', text: 'Stanford engineering curriculum: McKim\'s "Experiences in Visual Thinking" (1972) and Faste\'s design methodology courses' },
    ],
    limitation:
      'Remained within academic design circles and did not yet provide a teachable, scalable process that non-designers could pick up and apply immediately.',
  },
  {
    year: '2005',
    name: 'The Stanford d.school Five-Stage Model',
    org: 'Hasso Plattner Institute of Design (d.school)',
    badge: 'Foundation',
    summary:
      'The d.school formalized design thinking into a teachable, five-stage process — Empathize, Define, Ideate, Prototype, Test — so that students from any discipline could learn and apply it. This is the canonical model most people mean by "Design Thinking." Explicitly non-linear: the stages are a flexible scaffold, not a rigid sequence.',
    changes: [
      { tag: 'Introduced', text: 'Five named stages: Empathize, Define, Ideate, Prototype, Test' },
      { tag: 'Introduced', text: 'Explicit non-linearity — testing sends you back to ideating, or even to empathizing' },
      { tag: 'Added', text: 'Interdisciplinary pedagogy — designed for business, medicine, engineering, and education students alike' },
    ],
    limitation:
      'Because it is taught simply, it is often applied superficially — sticky-note rituals rather than genuine inquiry. The Empathize stage in particular is frequently rushed, producing shallow understanding dressed in the vocabulary of empathy.',
  },
  {
    year: '2009',
    name: 'IDEO Design Thinking',
    org: 'IDEO (David Kelley, Tim Brown)',
    badge: 'Adaptation',
    summary:
      'IDEO did the most to bring design thinking into the business mainstream. Tim Brown\'s 2009 book Change by Design defined design thinking for a generation of business leaders and introduced the three-lens model (Desirability, Feasibility, Viability) as the evaluative frame. IDEO also reframed the work as three broad spaces: Inspiration, Ideation, and Implementation.',
    changes: [
      { tag: 'Added', text: 'Desirability-Feasibility-Viability: every viable solution must satisfy all three lenses simultaneously' },
      { tag: 'Changed', text: 'Three spaces over five stages: Inspiration, Ideation, Implementation — broader and less sequential framing' },
      { tag: 'Added', text: 'Human-centered design (HCD) toolkit published openly, spreading the approach into social and nonprofit sectors worldwide' },
    ],
    limitation:
      'The three-lens model can be applied as a filter for existing ideas rather than a genuine constraint in the process. The "viability" question is often deferred to the end rather than held throughout.',
  },
  {
    year: '2014',
    name: 'IBM Enterprise Design Thinking',
    org: 'IBM',
    badge: 'Enterprise',
    summary:
      'As design thinking moved into very large organisations, the original models proved hard to scale across thousands of people and hundreds of teams. IBM developed Enterprise Design Thinking with three specific additions built for scale: Hills, Playbacks, and Sponsor Users.',
    changes: [
      { tag: 'Added', text: 'Hills: concise, outcome-focused statements of where the team is going, used to align large groups across functions and geographies' },
      { tag: 'Added', text: 'Playbacks: regular, structured moments where teams share progress and realign with stakeholders and users' },
      { tag: 'Added', text: 'Sponsor Users: real users formally embedded in the process so the human voice is not lost as the organisation scales' },
    ],
    limitation:
      'Optimised for alignment across large organisations rather than for the quality of the empathy work itself. The additions answer "how do we keep people pointed at the same human outcome?" but do not solve the shallow-empathy problem.',
  },
  {
    year: '2015+',
    name: 'The Critiques and Honest Limits',
    org: 'Various practitioners and scholars',
    badge: 'Reflection',
    summary:
      'As design thinking became a corporate buzzword, a serious body of critique emerged, much of it from people who value the approach and want it used well. These critiques are worth holding alongside the practice, not as attacks, but as the honest limits a mature practitioner must keep in view.',
    changes: [
      { tag: 'Critique', text: 'Often applied as theater: sticky notes and workshops that produce the appearance of innovation without the substance' },
      { tag: 'Critique', text: 'Empathize stage frequently done shallowly — a few interviews standing in for genuine understanding' },
      { tag: 'Critique', text: 'Underplays the hard work of implementation: the front-end ideation is not the whole job; some problems need deep domain expertise, not a cross-functional team with markers' },
    ],
    limitation:
      'A mature practitioner holds both the value and the limits. Design thinking is powerful for keeping human needs at the center of problem-solving. It is not a magic process that replaces expertise, rigor, or the unglamorous work of building and shipping.',
  },
]

export default function DTEvolutionTimeline() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()

  const v = VERSIONS[active]

  return (
    <div>
      {/* Timeline row */}
      <div className="relative mb-space-10">
        <div
          className="absolute top-4 left-0 right-0 h-px hidden md:block"
          style={{ background: `${TEAL}0.12)` }}
        />
        <div className="flex md:grid md:grid-cols-5 gap-space-2 overflow-x-auto pb-space-2 relative">
          {VERSIONS.map((ver, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-space-2 min-w-[68px] flex-1"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold relative z-10 transition-all duration-200"
                style={{
                  background: active === i ? `${TEAL}1)` : `${TEAL}0.08)`,
                  border: `1px solid ${active === i ? 'transparent' : `${TEAL}0.20)`}`,
                  color: active === i ? '#fff' : `${TEAL}0.70)`,
                }}
              >
                {i + 1}
              </div>
              <p
                className="font-mono text-2xs uppercase tracking-widest text-center leading-tight transition-colors duration-200"
                style={{ color: active === i ? `${TEAL}0.85)` : 'var(--color-neutral-400)' }}
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
                style={{ color: `${TEAL}0.80)`, background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.15)` }}
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

          {/* Right: changes */}
          <div>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-4">
              {active === 0 ? 'What it introduced' : active === VERSIONS.length - 1 ? 'The critiques' : 'What changed'}
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
                    style={{ background: `${TEAL}0.08)`, color: `${TEAL}0.80)`, whiteSpace: 'nowrap' }}
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
                  style={{ color: `${TEAL}0.85)` }}
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
