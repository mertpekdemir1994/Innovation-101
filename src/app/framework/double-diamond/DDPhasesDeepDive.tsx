'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PURPLE = 'rgba(124,58,237,'
// This component renders in a LightSection (white bg) with no internal dark
// canvas — darkened, not brightened, text-safe variant of PURPLE.
const PURPLE_TEXT = 'rgba(108,51,206,'

type PhaseId = 'discover' | 'define' | 'develop' | 'deliver'

type Phase = {
  id: PhaseId
  n: string
  label: string
  mode: 'Diverge' | 'Converge'
  tagline: string
  objective: string
  description: string[]
  activities: Array<{ title: string; detail: string }>
  keyQuestion: string
  path: string
  cx: number
}

const PHASES: Phase[] = [
  {
    id: 'discover',
    n: '01',
    label: 'Discover',
    mode: 'Diverge',
    tagline: 'Understand the problem space before you define it',
    objective: 'Expand your understanding beyond what you think you already know. Discover is not about finding answers; it is about discovering whether you are asking the right question.',
    description: [
      'Most teams under-invest in Discover. Under pressure to show progress, they move to solutions before they have understood the problem. Discover is the phase that prevents this. It requires going out into the world, observing people in context, and gathering information that challenges your current assumptions.',
      'Discover is deliberately broad. You are not yet trying to narrow anything down. You are trying to understand the full landscape of the problem: from the people experiencing it, to the commercial environment around it, to the organisational capabilities that might address it.',
    ],
    activities: [
      {
        title: 'User Research',
        detail: 'Ethnographic and contextual research into how people experience the problem. The goal is to challenge assumptions, not confirm them.',
      },
      {
        title: 'Market Scan',
        detail: 'Map the commercial landscape. Understand what business models exist in adjacent spaces and what viable solutions look like commercially.',
      },
      {
        title: 'Capability Audit',
        detail: 'Assess your organisational assets: manufacturing, distribution, technology, partnerships. Understand the boundaries of what is buildable.',
      },
    ],
    keyQuestion: 'What would you need to see, hear, or learn to be surprised about this problem?',
    path: 'M 0 120 L 200 0 L 200 240 Z',
    cx: 133,
  },
  {
    id: 'define',
    n: '02',
    label: 'Define',
    mode: 'Converge',
    tagline: 'Frame the right problem with precision',
    objective: 'Synthesise everything you learned in Discover into a clear, specific problem statement. Define is the single highest-leverage moment in the Double Diamond.',
    description: [
      'Define is where the discipline of the Double Diamond shows itself. After deliberately broadening your understanding in Discover, you now deliberately narrow down. You are not narrowing to a solution; you are narrowing to the precise problem worth solving.',
      'A strong Define output is a Point of View: [User] needs [need] because [insight]. It is specific enough to act on but broad enough to allow creative exploration in Develop. A good POV also makes explicit what you are NOT trying to solve; the decisions made at Define determine the entire character of Diamond 2.',
    ],
    activities: [
      {
        title: 'Synthesis & Insight Generation',
        detail: 'Identify patterns in your Discover research. An insight is an interpretation of a finding; it points toward what is going on, not just what was observed.',
      },
      {
        title: 'Point of View Statement',
        detail: 'Write a clear problem statement. This becomes the frame for everything in Diamond 2. Define both what you will and will not be solving.',
      },
    ],
    keyQuestion: 'What did you learn in Discover that surprised you? What assumption did the research overturn?',
    path: 'M 200 0 L 400 120 L 200 240 Z',
    cx: 267,
  },
  {
    id: 'develop',
    n: '03',
    label: 'Develop',
    mode: 'Diverge',
    tagline: 'Explore the solution space before committing',
    objective: 'Generate a wide range of concepts before evaluating any of them. Diverge first. Volume before quality. The best ideas rarely come first.',
    description: [
      'Develop is the second divergent phase, and it requires the same discipline as Discover. Do not narrow down too quickly. Do not evaluate concepts before you have generated a wide range of them. The pressure to converge is intense at this stage, but resisting it is essential.',
      'The key discipline of Develop is building to learn, not building to impress. Rapid, rough prototypes expose concepts to real feedback early. A concept that tests well at low fidelity is worth developing further. A concept that fails early is valuable; it saves the time and resources that would have gone into building it properly.',
    ],
    activities: [
      {
        title: 'Concept Generation',
        detail: 'Generate many different types of solutions, not ten variations of the same idea. Use How Might We questions from Define to open the solution space.',
      },
      {
        title: 'Rapid Prototyping',
        detail: 'Build rough, fast representations of your top concepts. Paper, role-play, digital mocks. The goal is to learn, not to impress.',
      },
    ],
    keyQuestion: 'What is the cheapest and fastest way to test whether people want this solution?',
    path: 'M 400 120 L 600 0 L 600 240 Z',
    cx: 533,
  },
  {
    id: 'deliver',
    n: '04',
    label: 'Deliver',
    mode: 'Converge',
    tagline: 'Ship the right solution with confidence',
    objective: 'Converge on the solution that works. Validate it rigorously before committing to full-scale delivery.',
    description: [
      'Deliver is the second convergent phase. The same discipline as Define applies: narrow down with intention, not with haste. The difference is that now you are narrowing from concepts to a single solution: one that has been tested, refined, and validated.',
      'Delivery in the Double Diamond is not just about shipping a product. It is about ensuring that what gets shipped is the solution that people want, that the business model sustaining it is viable, and that the organisation can build and deliver it. All three questions need answers before you ship.',
    ],
    activities: [
      {
        title: 'Validation',
        detail: 'Confirm that people want, understand, and will use the solution, not just that they like it in a test, but that they will adopt it in their real context.',
      },
      {
        title: 'Feasibility & Launch',
        detail: 'Confirm that delivery is achievable. What needs to be built, hired, or partnered for? What is the minimum viable launch configuration?',
      },
    ],
    keyQuestion: 'What is the evidence that people will use this in their real lives, not just in a test environment?',
    path: 'M 600 0 L 800 120 L 600 240 Z',
    cx: 667,
  },
]

function PhaseDiamond({
  activeId,
  onPhaseClick,
}: {
  activeId: PhaseId
  onPhaseClick: (id: PhaseId) => void
}) {
  const [hoveredId, setHoveredId] = useState<PhaseId | null>(null)

  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full"
      style={{ overflow: 'visible' }}
      role="group"
      aria-label="Double Diamond phases, click to navigate"
    >
      {PHASES.map((phase) => {
        const active  = phase.id === activeId
        const hovered = phase.id === hoveredId && !active

        return (
          <g
            key={phase.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onPhaseClick(phase.id)}
            onMouseEnter={() => setHoveredId(phase.id)}
            onMouseLeave={() => setHoveredId(null)}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${phase.label}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onPhaseClick(phase.id)
              }
            }}
          >
            <motion.path
              d={phase.path}
              strokeWidth={active ? 1.5 : 1}
              animate={{
                fill:   active  ? `${PURPLE}0.20)` : hovered ? `${PURPLE}0.12)` : `${PURPLE}0.04)`,
                stroke: active  ? `${PURPLE}0.75)` : hovered ? `${PURPLE}0.45)` : `${PURPLE}0.18)`,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.text
              x={phase.cx}
              y={120}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fontWeight="500"
              letterSpacing="0.08em"
              style={{ userSelect: 'none', textTransform: 'uppercase', pointerEvents: 'none' }}
              animate={{
                fill: active  ? `${PURPLE_TEXT}0.97)` : hovered ? `${PURPLE_TEXT}0.87)` : `${PURPLE_TEXT}0.81)`,
              }}
              transition={{ duration: 0.2 }}
            >
              {phase.label}
            </motion.text>
          </g>
        )
      })}
      <path d="M 0 120 L 200 0 L 400 120 L 200 240 Z" fill="none" stroke={`${PURPLE}0.10)`} strokeWidth="1" />
      <path d="M 400 120 L 600 0 L 800 120 L 600 240 Z" fill="none" stroke={`${PURPLE}0.10)`} strokeWidth="1" />
      <line x1="200" y1="0" x2="200" y2="240" stroke={`${PURPLE}0.10)`} strokeWidth="1" />
      <line x1="600" y1="0" x2="600" y2="240" stroke={`${PURPLE}0.10)`} strokeWidth="1" />
      {([0, 400, 800] as const).map((cx) => (
        <circle key={cx} cx={cx} cy={120} r={cx === 400 ? 4 : 3} fill={`${PURPLE}0.45)`} />
      ))}
    </svg>
  )
}

function PhaseContent({ phase }: { phase: Phase }) {
  return (
    <div>
      <div className="flex items-center gap-space-4 mb-space-6">
        <span className="font-mono text-5xl font-semibold leading-none" style={{ color: `${PURPLE}0.08)` }}>
          {phase.n}
        </span>
        <div>
          <span
            className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full inline-block mb-space-2"
            style={{ color: `${PURPLE}0.80)`, background: `${PURPLE}0.08)`, border: `1px solid ${PURPLE}0.15)` }}
          >
            {phase.mode}
          </span>
          <h3 className="text-2xl font-semibold text-neutral-900">{phase.label}</h3>
        </div>
      </div>

      <div
        className="rounded-xl px-space-6 py-space-5 mb-space-6"
        style={{ background: `${PURPLE}0.04)`, border: `1px solid ${PURPLE}0.10)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: `${PURPLE}0.65)` }}>
          Objective
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed">{phase.objective}</p>
      </div>

      <div className="space-y-space-3 text-sm text-neutral-600 leading-relaxed mb-space-6">
        {phase.description.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mb-space-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-3">Key activities</p>
        <div className="space-y-space-3">
          {phase.activities.map((act) => (
            <div key={act.title} className="flex gap-space-3">
              <div
                className="w-0.5 self-stretch rounded-full shrink-0"
                style={{ background: `${PURPLE}0.28)` }}
              />
              <div>
                <p className="font-semibold text-sm text-neutral-900">{act.title}</p>
                <p className="text-xs text-neutral-500 mt-space-1 leading-relaxed">{act.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-lg px-space-5 py-space-4"
        style={{ background: `${PURPLE}0.05)`, borderLeft: `3px solid ${PURPLE}0.38)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: `${PURPLE}0.70)` }}>
          Key question
        </p>
        <p className="text-sm italic text-neutral-700 leading-relaxed">{phase.keyQuestion}</p>
      </div>
    </div>
  )
}

export default function DDPhasesDeepDive() {
  const [activePhase, setActivePhase] = useState<PhaseId>('discover')
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])
  const prefersReduced = useReducedMotion()

  const handleDiamondClick = useCallback((id: PhaseId) => {
    const idx = PHASES.findIndex((p) => p.id === id)
    phaseRefs.current[idx]?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [prefersReduced])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    phaseRefs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActivePhase(PHASES[i].id)
        },
        { threshold: 0.35, rootMargin: '0px 0px -25% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const activeData = PHASES.find((p) => p.id === activePhase)!

  return (
    <div>
      {/* Desktop: sticky diamond left, scrolling content right */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-space-12 items-start">
        <div className="sticky top-24 py-space-10">
          <PhaseDiamond activeId={activePhase} onPhaseClick={handleDiamondClick} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mt-space-6 text-center"
            >
              <p className="font-mono text-2xs uppercase tracking-widest mb-space-1" style={{ color: `${PURPLE}0.75)` }}>
                {activeData.mode}
              </p>
              <p className="font-semibold text-lg text-neutral-900">{activeData.label}</p>
              <p className="text-sm text-neutral-500 mt-space-1 italic">{activeData.tagline}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          {PHASES.map((phase, i) => (
            <div
              key={phase.id}
              ref={(el: HTMLDivElement | null) => { phaseRefs.current[i] = el }}
              className="py-space-12 border-b border-neutral-100 last:border-0"
              style={{ scrollMarginTop: '5rem' }}
            >
              <PhaseContent phase={phase} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden">
        {PHASES.map((phase) => (
          <div key={phase.id} className="py-space-10 border-b border-neutral-100 last:border-0">
            <PhaseContent phase={phase} />
          </div>
        ))}
      </div>
    </div>
  )
}
