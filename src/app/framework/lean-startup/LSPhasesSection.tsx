'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PURPLE = 'rgba(124,58,237,'

type PhaseId = 'build' | 'measure' | 'learn'

type Phase = {
  id: PhaseId
  n: string
  label: string
  mode: string
  tagline: string
  objective: string
  description: string[]
  activities: Array<{ title: string; detail: string }>
  keyQuestion: string
}

const PHASES: Phase[] = [
  {
    id: 'build',
    n: '01',
    label: 'Build',
    mode: 'Minimize',
    tagline: 'Build less than you think you need',
    objective:
      'The Build phase begins not with engineering but with a question: what is the specific assumption we are testing, and what is the minimum artifact to test it? Only after answering that do you decide what to build.',
    description: [
      'The temptation in every Build phase is to add scope: one more feature, one more element that would make the MVP "more complete." Resisting that temptation is the core discipline of this phase. The right MVP is the cheapest and fastest way to answer one specific question, not a smaller version of the finished product.',
      'Before building anything, write a falsifiable hypothesis: "We believe that [user type] will [behavior] because [reason]. We will know this is true when [measurement]." The hypothesis must be specific enough to be clearly confirmed or denied by the experiment.',
    ],
    activities: [
      {
        title: 'Define the leap-of-faith assumption',
        detail:
          'Identify the single assumption the entire concept rests on. This is what the MVP must test: not the most technically interesting assumption, but the most business-critical one.',
      },
      {
        title: 'Choose the right MVP type',
        detail:
          'Video MVP, landing page, concierge, Wizard of Oz, piecemeal, or single-feature: the form follows from the question being tested, not from a smaller version of the final product.',
      },
      {
        title: 'Resist scope',
        detail:
          'Every feature added to the MVP extends the time to learning without improving the validity of the experiment. Build the minimum that tests the assumption.',
      },
    ],
    keyQuestion:
      'What is the cheapest and fastest way to test whether the riskiest assumption in your concept is true?',
  },
  {
    id: 'measure',
    n: '02',
    label: 'Measure',
    mode: 'Measure what matters',
    tagline: 'Measure what matters, not what is easy',
    objective:
      'The Measure phase is where most Lean Startup efforts fail silently. Teams run experiments, collect data, and then measure the wrong things. The Measure phase demands ruthless specificity about what success looks like before the experiment runs.',
    description: [
      'Ries distinguishes actionable metrics (measurements directly connected to the hypothesis that will change what the team does) from vanity metrics, numbers that feel good but do not guide decisions. Total users, total page views, and total downloads are almost always vanity metrics. Activation rate, thirty-day retention, and referral rate are actionable.',
      'The most important measurement tool in the Lean Startup is cohort analysis: tracking the behavior of groups of users who experienced the product at the same time, rather than looking at aggregate numbers. Aggregate numbers hide the most important signals. Cohort analysis surfaces the signal the aggregate conceals.',
    ],
    activities: [
      {
        title: 'Set the success metric before the experiment runs',
        detail:
          'Define the measurement and the threshold for "validated" before building. Deciding what counts as success only after seeing the results is how teams fool themselves.',
      },
      {
        title: 'Use cohort analysis',
        detail:
          'Track behavior by cohort (groups of users who joined at the same time) rather than aggregate totals. Aggregates rise and fall; cohort retention reveals whether the product actually works.',
      },
      {
        title: 'Innovation accounting',
        detail:
          'Set a baseline, tune the engine, and base the pivot-or-persevere decision on progress toward validated metric targets rather than on a subjective sense of momentum.',
      },
    ],
    keyQuestion:
      'What is the one number that will tell you definitively whether your hypothesis was true or false? Have you set that number before the experiment starts?',
  },
  {
    id: 'learn',
    n: '03',
    label: 'Learn',
    mode: 'Decide honestly',
    tagline: 'Learn fast. Decide honestly.',
    objective:
      'The Learn phase is where teams do the hardest work: confronting what the evidence actually shows rather than what they hoped it would show. The cognitive biases that affect everyone are at their most dangerous here.',
    description: [
      'Learning is genuine only when it changes what the team does next. If the results are reviewed, discussed, and then the team proceeds exactly as planned, the learning was not genuine; it was post-hoc rationalization. Genuine learning produces a new hypothesis, a refinement to the MVP, or a pivot decision.',
      'The pivot decision is the most consequential moment in the process and the one most often made too late. Teams that persevere past the point the evidence supports waste resources and miss the window to make a structural change. The right time is at a predetermined review point, not when things happen to feel bad.',
    ],
    activities: [
      {
        title: 'Make the pivot-or-persevere decision',
        detail:
          'Set the review point before the experiment runs. Define the criteria for pivot versus persevere in advance and hold to them: this is what prevents the rationalization that quietly kills learning cultures.',
      },
      {
        title: 'Name the pivot type',
        detail:
          'If pivoting, name the type precisely: zoom-in, customer segment, customer need, business model, platform, channel, or technology. Naming it forces honesty about what exactly is changing and why.',
      },
      {
        title: 'Write the next hypothesis',
        detail:
          'The Learn phase ends with a sharper hypothesis. If validated, test the next assumption. If invalidated, write a diagnostic or structural hypothesis for the next loop.',
      },
    ],
    keyQuestion:
      'What did the evidence actually show, separate from what you hoped it would show? What would you do differently if you fully trusted what the evidence told you?',
  },
]

export default function LSPhasesSection() {
  const [activePhase, setActivePhase] = useState<PhaseId>('build')
  const [openActivity, setOpenActivity] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // IntersectionObserver to track which phase is in view
  useEffect(() => {
    if (prefersReduced) return
    const observers: IntersectionObserver[] = []
    PHASES.forEach((phase, i) => {
      const el = sectionRefs.current[i]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActivePhase(phase.id)
        },
        { threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [prefersReduced])

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-space-10 relative">
      {/* Left: sticky phase nav */}
      <div className="hidden md:block">
        <div className="sticky top-24 space-y-space-2">
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => {
                setActivePhase(phase.id)
                sectionRefs.current[PHASES.findIndex((p) => p.id === phase.id)]?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }}
              className="w-full text-left flex items-center gap-space-4 rounded-lg px-space-4 py-space-3 transition-all duration-200"
              style={{
                background: activePhase === phase.id ? `${PURPLE}0.06)` : 'transparent',
                borderLeft: `3px solid ${activePhase === phase.id ? `${PURPLE}0.65)` : 'transparent'}`,
              }}
            >
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: `${PURPLE}0.40)` }}
              >
                {phase.n}
              </span>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{
                    color: activePhase === phase.id ? `${PURPLE}0.90)` : 'var(--color-neutral-600)',
                  }}
                >
                  {phase.label}
                </p>
                <p
                  className="font-mono text-2xs uppercase tracking-widest"
                  style={{ color: `${PURPLE}0.40)` }}
                >
                  {phase.mode}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: phase content */}
      <div className="space-y-space-12 md:space-y-space-13">
        {PHASES.map((phase, i) => (
          <div
            key={phase.id}
            ref={(el) => { sectionRefs.current[i] = el }}
          >
            {/* Mobile phase header */}
            <div className="md:hidden mb-space-4 flex items-center gap-space-3">
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: `${PURPLE}0.55)` }}
              >
                {phase.n}
              </span>
              <span
                className="font-mono text-2xs uppercase tracking-widest"
                style={{ color: `${PURPLE}0.55)` }}
              >
                {phase.mode}
              </span>
            </div>

            <h3
              className="font-display font-semibold mb-space-3"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                lineHeight: 1.15,
                color: 'var(--color-neutral-900)',
                letterSpacing: '-0.01em',
              }}
            >
              {phase.tagline}
            </h3>

            <p className="text-base text-neutral-700 leading-relaxed mb-space-4">
              {phase.objective}
            </p>

            {phase.description.map((para, j) => (
              <p key={j} className="text-base text-neutral-600 leading-relaxed mb-space-4">
                {para}
              </p>
            ))}

            {/* Activities */}
            <div className="mt-space-6 space-y-space-2">
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-3">
                Key activities
              </p>
              {phase.activities.map((act, j) => {
                const key = i * 10 + j
                const isOpen = openActivity === key
                return (
                  <div
                    key={j}
                    className="rounded-lg overflow-hidden"
                    style={{ border: '1px solid var(--color-neutral-200)' }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenActivity(isOpen ? null : key)}
                      className="w-full text-left flex items-center justify-between px-space-5 py-space-4 transition-colors duration-200"
                      style={{
                        background: isOpen ? `${PURPLE}0.04)` : '#FFFFFF',
                      }}
                    >
                      <span className="font-semibold text-sm text-neutral-900">{act.title}</span>
                      <span
                        className="text-base shrink-0 ml-space-3 transition-transform duration-200"
                        style={{
                          color: `${PURPLE}0.60)`,
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                        }}
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={prefersReduced ? {} : { height: 0, opacity: 0 }}
                          animate={prefersReduced ? {} : { height: 'auto', opacity: 1 }}
                          exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className="px-space-5 pb-space-4 text-sm text-neutral-600 leading-relaxed">
                            {act.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Key question */}
            <div
              className="mt-space-6 rounded-xl px-space-6 py-space-5"
              style={{ background: `${PURPLE}0.04)`, border: `1px solid ${PURPLE}0.10)` }}
            >
              <p
                className="font-mono text-2xs uppercase tracking-widest mb-space-3"
                style={{ color: `${PURPLE}0.65)` }}
              >
                The key question
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed italic">{phase.keyQuestion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
