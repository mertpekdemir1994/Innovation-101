'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PURPLE = 'rgba(124,58,237,'

type LoopKey = 'loop1' | 'loop2' | 'loop3'

const LOOP_DEFS: { key: LoopKey; label: string; sub: string; pivotType: string | null }[] = [
  { key: 'loop1', label: 'Loop 1', sub: 'Weeks 1–2', pivotType: null },
  { key: 'loop2', label: 'Loop 2', sub: 'Weeks 3–5', pivotType: 'Customer-Need Pivot' },
  { key: 'loop3', label: 'Loop 3', sub: 'Weeks 6–10', pivotType: null },
]

type ArtifactType = 'cohort' | 'finding'
type Artifact = { type: ArtifactType; label: string; lines: string[] }

type LoopData = {
  hypothesis: string
  mvpType: string
  buildDesc: string
  measureDesc: string
  artifact: Artifact
  learnDesc: string
  decision: string
}

const LOOPS: Record<LoopKey, LoopData> = {
  loop1: {
    hypothesis:
      'We believe low usage is an activation problem: users do not return because the initial setup is too complex to get through. We will know we are right if guided setup dramatically lifts the share of users who complete setup and run their first report.',
    mvpType: 'Concierge MVP',
    buildDesc:
      'Rather than redesign onboarding, the founders ran a concierge MVP. They personally walked every new user through setup over a video call, doing by hand what the product would eventually automate. No engineering required. This let them test the activation hypothesis in days.',
    measureDesc:
      'They compared activation (completed setup plus first report) between the concierge cohort and the prior self-serve cohort, and tracked thirty-day retention for both.',
    artifact: {
      type: 'cohort',
      label: 'Cohort readout: Loop 1',
      lines: [
        'Activation (self-serve cohort): 12%',
        'Activation (concierge cohort): 71%',
        '30-day retention (self-serve): ~22%',
        '30-day retention (concierge): ~22%',
      ],
    },
    learnDesc:
      'The evidence was clear and uncomfortable. Activation was not the real problem. They could lift activation dramatically and it changed nothing about retention. Users who activated with hands-on help left at the same rate as everyone else. Something deeper than setup was wrong.',
    decision:
      'Persevere on the product thesis but pivot the focus: from activation to retention. The next loop must test why activated users do not come back.',
  },
  loop2: {
    hypothesis:
      'We believe activated users do not return because they do not know what to do after their first report. We will know we are right if a guided, personalized prompt to run a second analysis lifts thirty-day retention.',
    mvpType: 'Email Sequence',
    buildDesc:
      'A lightweight email sequence: not a product change. After a user\'s first report, they received specific, personalized suggestions for a next analysis to run. Cheap to build, fast to test.',
    measureDesc:
      'Seven-day and thirty-day retention tracked across the nudge cohort versus the prior baseline.',
    artifact: {
      type: 'cohort',
      label: 'Cohort readout: Loop 2',
      lines: [
        '7-day retention (baseline): 23%',
        '7-day retention (nudge cohort): 31%',
        '30-day retention (baseline): ~22%',
        '30-day retention (nudge cohort): ~23%, no meaningful change',
      ],
    },
    learnDesc:
      'Another clear, uncomfortable answer. The problem was not a missing nudge. Follow-up interviews with churned users surfaced the real issue: the reports the product produced did not connect to the decisions users had to make. The data was interesting but not actionable. People looked once, found it neat, and had no reason to build it into their week.',
    decision:
      'Customer-need pivot. The problem was never complexity or engagement mechanics. The product was answering questions users were not asking.',
  },
  loop3: {
    hypothesis:
      'We believe users will retain at a much higher rate if the product is organized around the specific marketing decisions they make (budget allocation, channel performance, campaign optimization) rather than open-ended data exploration. We will know we are right if thirty- and ninety-day retention rise sharply and a meaningful share of users call the product essential to their weekly work.',
    mvpType: 'Targeted Rebuild',
    buildDesc:
      'A genuine but minimal rebuild. The open-ended data-exploration interface was replaced with three decision-specific views, each organized around a recurring marketing decision. Roughly four weeks of work, scoped tightly to test the new thesis and nothing more.',
    measureDesc:
      'Thirty- and ninety-day retention, plus a single qualitative question: what share of users describe the product as "essential to their weekly workflow"?',
    artifact: {
      type: 'cohort',
      label: 'Cohort readout: Loop 3',
      lines: [
        '30-day retention (pre-rebuild): 23%',
        '30-day retention (post-rebuild): 58%',
        '90-day retention (pre-rebuild): 8%',
        '90-day retention (post-rebuild): 34%',
        'Users calling product "essential to their weekly workflow": 41%',
      ],
    },
    learnDesc:
      'The hypothesis was validated, decisively. Organizing the product around decisions rather than data was the breakthrough. The original thesis (non-technical marketers are underserved) had been right all along, but the original product expressed it wrongly. The pivot was not away from the vision; it was the vision finally executed correctly.',
    decision:
      'Persevere, and scale. Tempo raised a Series A six months later on the strength of cohort data showing clear, durable retention: the signature of real product-market fit.',
  },
}

const LESSONS = [
  {
    n: '01',
    title: 'The cheapest MVP often produces the most important learning.',
    detail:
      'The concierge MVP in Loop 1 (founders manually onboarding users) cost nothing to build and definitively separated the activation question from the retention question. Engineering a better onboarding flow would have improved the wrong thing.',
  },
  {
    n: '02',
    title: 'Vanity metrics would have killed the company.',
    detail:
      'The early fifty-user numbers looked acceptable in aggregate. Cohort-based retention analysis revealed the truth aggregates hid. A team measuring only aggregate numbers would have missed the need to pivot until it was too late.',
  },
  {
    n: '03',
    title: 'A pivot can preserve the vision rather than abandon it.',
    detail:
      'Loop 3 kept the founding thesis entirely intact and changed only how the product expressed it. Naming it a customer-need pivot, precisely, was what let the team make the change with conviction instead of treating it as a failure.',
  },
]

function ArtifactBlock({ artifact }: { artifact: Artifact }) {
  return (
    <div
      className="rounded-xl p-space-6"
      style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
    >
      <p className="font-mono text-2xs uppercase tracking-widest mb-space-4 text-neutral-400">
        {artifact.label}
      </p>
      <div className="space-y-space-2">
        {artifact.lines.map((line, i) => (
          <p
            key={i}
            className="text-sm text-neutral-700 leading-relaxed"
            style={
              line.includes('no meaningful change') || line.includes('41%')
                ? { fontWeight: 600, color: `${PURPLE}0.85)` }
                : {}
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function LoopContent({ loopKey }: { loopKey: LoopKey }) {
  const loop = LOOPS[loopKey]

  return (
    <div>
      {/* Hypothesis blockquote */}
      <blockquote
        className="rounded-xl p-space-6 mb-space-6"
        style={{ background: `${PURPLE}0.04)`, borderLeft: `4px solid ${PURPLE}0.50)` }}
      >
        <p
          className="font-mono text-2xs uppercase tracking-widest mb-space-3"
          style={{ color: `${PURPLE}0.70)` }}
        >
          Hypothesis
        </p>
        <p className="text-base text-neutral-800 leading-relaxed italic">
          &ldquo;{loop.hypothesis}&rdquo;
        </p>
      </blockquote>

      {/* Build */}
      <div className="mb-space-6">
        <div className="flex items-center gap-space-3 mb-space-3">
          <span
            className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full"
            style={{ background: `${PURPLE}0.08)`, color: `${PURPLE}0.80)` }}
          >
            Build
          </span>
          <span className="font-mono text-2xs uppercase tracking-widest text-neutral-400">
            {loop.mvpType}
          </span>
        </div>
        <p className="text-sm text-neutral-700 leading-relaxed">{loop.buildDesc}</p>
      </div>

      {/* Measure */}
      <div className="mb-space-5">
        <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-2">
          Measure
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed mb-space-4">{loop.measureDesc}</p>
        <ArtifactBlock artifact={loop.artifact} />
      </div>

      {/* Learn */}
      <div
        className="rounded-lg px-space-5 py-space-4 mb-space-4"
        style={{ background: `${PURPLE}0.05)`, borderLeft: `3px solid ${PURPLE}0.40)` }}
      >
        <p
          className="font-mono text-2xs uppercase tracking-widest mb-space-2"
          style={{ color: `${PURPLE}0.70)` }}
        >
          Learn
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed italic">{loop.learnDesc}</p>
      </div>

      {/* Decision */}
      <div
        className="rounded-xl p-space-5"
        style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-2">
          Decision
        </p>
        <p className="font-semibold text-sm text-neutral-900 leading-relaxed">{loop.decision}</p>
      </div>
    </div>
  )
}

export default function LSCaseStudy() {
  const [activeLoop, setActiveLoop] = useState<LoopKey>('loop1')
  const prefersReduced = useReducedMotion()

  return (
    <div className="mt-space-8">
      {/* Mock scenario disclaimer */}
      <div
        className="rounded-xl px-space-6 py-space-4 mb-space-8 flex gap-space-4 items-start"
        style={{ background: 'rgba(17,24,39,0.04)', border: '1px solid rgba(17,24,39,0.08)' }}
      >
        <span
          className="font-mono text-2xs uppercase tracking-widest px-space-2 py-space-1 rounded shrink-0 mt-0.5"
          style={{ background: 'rgba(17,24,39,0.08)', color: 'rgba(17,24,39,0.45)' }}
        >
          Mock scenario
        </span>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Tempo is an invented company and this engagement is illustrative. It is written to show,
          concretely, what the work and outputs of each Build-Measure-Learn loop look like in
          practice. The methods, artifacts, and decision logic are realistic; the company and its
          results are fictional.
        </p>
      </div>

      {/* Company context card */}
      <div
        className="rounded-2xl overflow-hidden mb-space-8"
        style={{ border: '1px solid var(--color-neutral-200)' }}
      >
        <div
          className="px-space-6 md:px-space-8 py-space-5 border-b flex flex-wrap gap-space-6"
          style={{ background: 'var(--color-warm-50)', borderColor: 'var(--color-neutral-100)' }}
        >
          {[
            ['Company', 'Tempo (fictional)'],
            ['Stage', 'Seed-funded, 4 founders'],
            ['Runway', '~11 months'],
            ['Duration', '8 weeks, 3 loops'],
            ['Framework', 'Build-Measure-Learn'],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-1">
                {label}
              </p>
              <p className="text-sm font-semibold text-neutral-900">{val}</p>
            </div>
          ))}
        </div>
        <div className="px-space-6 md:px-space-8 py-space-7">
          <p
            className="font-mono text-2xs uppercase tracking-widest mb-space-3"
            style={{ color: `${PURPLE}0.65)` }}
          >
            The problem
          </p>
          <p
            className="font-display font-semibold text-balance"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
              lineHeight: 1.2,
              color: 'var(--color-neutral-900)',
              letterSpacing: '-0.01em',
            }}
          >
            Three months post-launch, usage is low and retention is quietly alarming. Is the thesis
            wrong, or is the execution wrong?
          </p>
          <p className="text-sm text-neutral-500 mt-space-3">
            Thesis: non-technical marketing managers are underserved by complex analytics tools.
          </p>
        </div>
      </div>

      {/* Loop navigator */}
      <div className="flex flex-wrap gap-space-2 mb-space-6">
        {LOOP_DEFS.map(({ key, label, sub, pivotType }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveLoop(key)}
            className="flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-colors duration-200 flex-1 min-w-[120px]"
            style={{
              background: activeLoop === key ? `${PURPLE}0.08)` : '#FFFFFF',
              border: `1px solid ${activeLoop === key ? `${PURPLE}0.25)` : 'var(--color-neutral-200)'}`,
            }}
          >
            <span
              className="font-mono text-2xs uppercase tracking-widest mb-space-1"
              style={{
                color: activeLoop === key ? `${PURPLE}0.65)` : 'var(--color-neutral-400)',
              }}
            >
              {sub}
            </span>
            <span
              className="font-semibold text-sm"
              style={{
                color: activeLoop === key ? `${PURPLE}0.90)` : 'var(--color-neutral-700)',
              }}
            >
              {label}
            </span>
            {pivotType && (
              <span
                className="font-mono text-2xs uppercase tracking-widest mt-space-1"
                style={{ color: `${PURPLE}0.50)` }}
              >
                {pivotType}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loop content panel */}
      <div
        className="rounded-2xl p-space-6 md:p-space-8 mb-space-10"
        style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLoop}
            initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <LoopContent loopKey={activeLoop} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Key lessons */}
      <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-4">
        Key lessons
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
        {LESSONS.map(({ n, title, detail }) => (
          <div
            key={n}
            className="rounded-xl p-space-6"
            style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
          >
            <span
              className="font-mono text-3xl font-semibold block mb-space-4"
              style={{ color: `${PURPLE}0.12)`, lineHeight: 1 }}
            >
              {n}
            </span>
            <p className="font-semibold text-sm text-neutral-900 mb-space-2 leading-snug">{title}</p>
            <p className="text-xs text-neutral-500 leading-relaxed">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
