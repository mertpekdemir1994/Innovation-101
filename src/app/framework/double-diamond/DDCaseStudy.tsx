'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PURPLE = 'rgba(124,58,237,'

type Phase = 'discover' | 'define' | 'develop' | 'deliver'
type StreamKey = 'desirability' | 'viability' | 'feasibility'
type Signal = 'Strong' | 'Weak' | 'Partial'

const PHASE_DEFS: { key: Phase; label: string; sub: string; mode: string }[] = [
  { key: 'discover', label: 'Discover', sub: 'Weeks 1–8', mode: 'Diverge' },
  { key: 'define', label: 'Define', sub: 'Weeks 9–12', mode: 'Converge' },
  { key: 'develop', label: 'Develop', sub: 'Weeks 13–22', mode: 'Diverge' },
  { key: 'deliver', label: 'Deliver', sub: 'Weeks 23–28', mode: 'Converge' },
]

const STREAMS: { key: StreamKey; label: string; question: string }[] = [
  { key: 'desirability', label: 'Desirability', question: 'What do people need?' },
  { key: 'viability', label: 'Viability', question: 'Where is there a business?' },
  { key: 'feasibility', label: 'Feasibility', question: 'What can Northvale do?' },
]

type Artifact = { type: 'quote' | 'finding'; label: string; lines: string[] }

const STREAM_DATA: Record<StreamKey, { work: string; artifact: Artifact; pattern: string }> = {
  desirability: {
    work: 'In-home ethnography with 60 households across the US, UK, Germany, and Japan. Researchers spent two to three hours in each home watching people clean, restock, and manage their household supplies, then interviewed them about frustrations and workarounds.',
    artifact: {
      type: 'quote',
      label: 'Field observation: Participant H-014, Munich',
      lines: [
        'Participant H-014 keeps a handwritten list on the fridge of things "about to run out." She photographs it before shopping. She has run out of dishwasher tablets three times this month anyway.',
        '"I don\'t mind buying it. I mind realizing at 9pm that we\'re out."',
      ],
    },
    pattern:
      'The pain was rarely about how well a product cleaned. It was about managing the system of supplies: the mental load of tracking, remembering, and never quite running out. Cleaning efficacy was table stakes; supply anxiety was the unmet need.',
  },
  viability: {
    work: "Market sizing of eight adjacent categories. Business-model benchmarking of twelve companies that had extended from a product business into services or subscription. Margin teardown of Northvale's own portfolio to understand which economic models the company already knew how to run.",
    artifact: {
      type: 'finding',
      label: 'Market model: Subscription viability',
      lines: [
        'The household-supply subscription market was growing ~18% annually.',
        'Attractive contribution margins required roughly 40,000–60,000 active subscribers, the point where logistics and acquisition costs amortize.',
        'Below that threshold, the economics lose money on every box shipped.',
      ],
    },
    pattern:
      'There was a real, growing, profitable business in recurring replenishment, but only at scale. Any concept here had to have a credible path to ~50,000 subscribers fast.',
  },
  feasibility: {
    work: "An internal capability audit. What can the eleven plants flex to make? What do the retail relationships permit? What is the R&D pipeline? What does Northvale categorically lack?",
    artifact: {
      type: 'finding',
      label: 'Capability map: Summary',
      lines: [
        'STRONG: chemical formulation, high-volume manufacturing, retail distribution, brand trust.',
        "WEAK: e-commerce, subscription billing, connected devices, direct customer relationships: Northvale has never sold directly to a consumer in its history.",
      ],
    },
    pattern:
      'Northvale could make and distribute almost anything physical and chemical. It could not, on its own, run software, devices, or a direct subscriber relationship. Any concept requiring those would need a partner or an acquisition.',
  },
}

const SCORING_ROWS: {
  n: string
  candidate: string
  d: Signal
  v: Signal
  f: Signal
  verdict: 'Proceed' | 'Cut'
  reason: string
}[] = [
  {
    n: '2',
    candidate: 'Help people deep-clean their homes less often',
    d: 'Weak',
    v: 'Weak',
    f: 'Strong',
    verdict: 'Cut',
    reason: 'Low desire, poor margin',
  },
  {
    n: '5',
    candidate: 'Help allergy sufferers control indoor air',
    d: 'Strong',
    v: 'Weak',
    f: 'Weak',
    verdict: 'Cut',
    reason: 'Needs devices + thin margin',
  },
  {
    n: '7',
    candidate: 'Remove the mental load of never running out of household supplies',
    d: 'Strong',
    v: 'Strong',
    f: 'Partial',
    verdict: 'Proceed',
    reason: '',
  },
  {
    n: '9',
    candidate: 'Make home cleaning feel like one connected system, not many products',
    d: 'Strong',
    v: 'Strong',
    f: 'Partial',
    verdict: 'Proceed',
    reason: '',
  },
  {
    n: '11',
    candidate: 'Premium concierge home-cleaning service',
    d: 'Strong',
    v: 'Weak',
    f: 'Weak',
    verdict: 'Cut',
    reason: 'Not a product business; outside capability',
  },
]

const LESSONS = [
  {
    n: '01',
    title: 'Run all three research streams simultaneously.',
    detail:
      "Teams that research only desirability first, then bolt on viability and feasibility later, almost always have to return to Discover when their most-loved concept turns out to be unbuildable or unprofitable. Northvale paid more upfront and saved months downstream.",
  },
  {
    n: '02',
    title: 'Define is where the triad does its hardest work.',
    detail:
      'Narrowing 11 candidate problems to 2, on evidence, before entering Develop, is what prevented Northvale from spending half a year building toward a problem that could never be monetized or built.',
  },
  {
    n: '03',
    title: 'A concept without a business-model hypothesis is incomplete.',
    detail:
      'Developing product, business model, and delivery in parallel, rather than designing the product and retrofitting a business model later, is the structural thing that separates the Doblin approach from the original.',
  },
]

function SignalBadge({ value }: { value: Signal }) {
  if (value === 'Strong') {
    return (
      <span
        className="inline-block font-mono text-2xs uppercase tracking-widest px-space-2 py-0.5 rounded"
        style={{ background: `${PURPLE}0.10)`, color: `${PURPLE}0.85)` }}
      >
        Strong
      </span>
    )
  }
  if (value === 'Weak') {
    return (
      <span
        className="inline-block font-mono text-2xs uppercase tracking-widest px-space-2 py-0.5 rounded"
        style={{ background: 'rgba(17,24,39,0.06)', color: 'var(--color-neutral-600)' }}
      >
        Weak
      </span>
    )
  }
  return (
    <span
      className="inline-block font-mono text-2xs uppercase tracking-widest px-space-2 py-0.5 rounded"
      style={{ background: `${PURPLE}0.06)`, color: `${PURPLE}0.55)` }}
    >
      Partial
    </span>
  )
}

function ArtifactBlock({ artifact }: { artifact: Artifact }) {
  if (artifact.type === 'quote') {
    return (
      <div
        className="rounded-xl p-space-6"
        style={{ background: `${PURPLE}0.04)`, border: `1px solid ${PURPLE}0.10)` }}
      >
        <p
          className="font-mono text-2xs uppercase tracking-widest mb-space-4"
          style={{ color: `${PURPLE}0.65)` }}
        >
          {artifact.label}
        </p>
        <div className="space-y-space-3">
          {artifact.lines.map((line, i) =>
            i === artifact.lines.length - 1 ? (
              <p
                key={i}
                className="text-base text-neutral-800 leading-relaxed italic pl-space-4"
                style={{ borderLeft: `3px solid ${PURPLE}0.40)` }}
              >
                {line}
              </p>
            ) : (
              <p key={i} className="text-sm text-neutral-600 leading-relaxed">
                {line}
              </p>
            )
          )}
        </div>
      </div>
    )
  }
  return (
    <div
      className="rounded-xl p-space-6"
      style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
    >
      <p className="font-mono text-2xs uppercase tracking-widest mb-space-4 text-neutral-500">
        {artifact.label}
      </p>
      <div className="space-y-space-2">
        {artifact.lines.map((line, i) => (
          <p key={i} className="text-sm text-neutral-700 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function DiscoverContent({
  activeStream,
  setActiveStream,
}: {
  activeStream: StreamKey
  setActiveStream: (s: StreamKey) => void
}) {
  const prefersReduced = useReducedMotion()
  const stream = STREAM_DATA[activeStream]
  const currentStreamDef = STREAMS.find((s) => s.key === activeStream)!

  return (
    <div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-space-6">
        The defining move of the Doblin approach: the team does not research people alone. It researches people, money, and capability simultaneously, so that by Define it can apply all three filters with real evidence behind each.
      </p>

      <div className="flex flex-wrap gap-space-2 mb-space-6">
        {STREAMS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActiveStream(s.key)}
            className="px-space-4 py-space-2 rounded-full text-sm transition-colors duration-200"
            style={{
              background: activeStream === s.key ? `${PURPLE}1)` : `${PURPLE}0.06)`,
              color: activeStream === s.key ? '#fff' : `${PURPLE}0.75)`,
              fontWeight: activeStream === s.key ? 600 : 400,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStream}
          initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          exit={prefersReduced ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <p
            className="font-mono text-2xs uppercase tracking-widest mb-space-5"
            style={{ color: `${PURPLE}0.65)` }}
          >
            {currentStreamDef.question}
          </p>

          <div className="mb-space-5">
            <p className="text-2xs font-semibold uppercase tracking-widest text-neutral-500 mb-space-2">
              The work
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">{stream.work}</p>
          </div>

          <div className="mb-space-5">
            <p className="text-2xs font-semibold uppercase tracking-widest text-neutral-500 mb-space-2">
              Sample output
            </p>
            <ArtifactBlock artifact={stream.artifact} />
          </div>

          <div
            className="rounded-lg px-space-5 py-space-4"
            style={{ background: `${PURPLE}0.05)`, borderLeft: `3px solid ${PURPLE}0.40)` }}
          >
            <p
              className="font-mono text-2xs uppercase tracking-widest mb-space-2"
              style={{ color: `${PURPLE}0.70)` }}
            >
              Pattern that emerged
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed italic">{stream.pattern}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function DefineContent() {
  return (
    <div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-space-6">
        The team generated 11 candidate problem definitions from the research. In a structured Define session, each was scored against all three Doblin filters. This is the highest-leverage moment in the whole engagement: the triad does the cutting here, cheaply, before any money is spent building.
      </p>

      <div className="mb-space-2">
        <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-3">
          Representative slice: 5 of 11 candidates evaluated
        </p>
        <div
          className="overflow-x-auto rounded-xl"
          style={{ border: '1px solid var(--color-neutral-200)' }}
        >
          <table className="w-full text-sm border-collapse" style={{ minWidth: 640 }}>
            <thead>
              <tr
                style={{
                  background: 'var(--color-warm-50)',
                  borderBottom: '1px solid var(--color-neutral-200)',
                }}
              >
                <th className="text-left px-space-4 py-space-3 font-semibold text-neutral-900 text-xs w-8">
                  #
                </th>
                <th className="text-left px-space-4 py-space-3 font-semibold text-neutral-900 text-sm">
                  Candidate problem definition
                </th>
                <th className="text-center px-space-3 py-space-3 font-mono text-2xs uppercase tracking-widest text-neutral-500 w-24">
                  Desirable?
                </th>
                <th className="text-center px-space-3 py-space-3 font-mono text-2xs uppercase tracking-widest text-neutral-500 w-20">
                  Viable?
                </th>
                <th className="text-center px-space-3 py-space-3 font-mono text-2xs uppercase tracking-widest text-neutral-500 w-24">
                  Feasible?
                </th>
                <th className="text-left px-space-4 py-space-3 font-semibold text-neutral-900 text-sm w-28">
                  Verdict
                </th>
              </tr>
            </thead>
            <tbody>
              {SCORING_ROWS.map((row) => (
                <tr
                  key={row.n}
                  style={{
                    background: row.verdict === 'Proceed' ? `${PURPLE}0.04)` : '#FFFFFF',
                    borderBottom: '1px solid var(--color-neutral-100)',
                    opacity: row.verdict === 'Cut' ? 0.65 : 1,
                  }}
                >
                  <td className="px-space-4 py-space-3 font-mono text-xs text-neutral-500">{row.n}</td>
                  <td className="px-space-4 py-space-3 text-neutral-800 text-sm">
                    {row.candidate}
                    {row.reason && (
                      <span className="block text-xs text-neutral-500 mt-space-1">{row.reason}</span>
                    )}
                  </td>
                  <td className="text-center px-space-3 py-space-3">
                    <SignalBadge value={row.d} />
                  </td>
                  <td className="text-center px-space-3 py-space-3">
                    <SignalBadge value={row.v} />
                  </td>
                  <td className="text-center px-space-3 py-space-3">
                    <SignalBadge value={row.f} />
                  </td>
                  <td className="px-space-4 py-space-3">
                    {row.verdict === 'Proceed' ? (
                      <span className="font-semibold text-sm" style={{ color: `${PURPLE}0.85)` }}>
                        Proceed →
                      </span>
                    ) : (
                      <span className="text-sm text-neutral-500">Cut</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-neutral-500 mt-space-3 mb-space-8">
        Of 11 candidates, 3 failed viability, 2 failed feasibility, and the rest scored lower across all three. Two POVs proceeded, before a dollar was spent developing them.
      </p>

      <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-4">
        The two problem definitions that proceeded
      </p>
      <div className="space-y-space-4">
        <blockquote
          className="rounded-xl p-space-6"
          style={{ background: `${PURPLE}0.04)`, borderLeft: `4px solid ${PURPLE}0.50)` }}
        >
          <p
            className="font-mono text-2xs uppercase tracking-widest mb-space-3"
            style={{ color: `${PURPLE}0.70)` }}
          >
            POV 1: Replenishment
          </p>
          <p className="text-base text-neutral-800 leading-relaxed italic">
            &ldquo;Households with recurring supply needs need replenishment that removes the friction of remembering, ordering, and waiting, because the failure mode that hurts is running out, not choosing the wrong product.&rdquo;
          </p>
        </blockquote>
        <blockquote
          className="rounded-xl p-space-6"
          style={{ background: `${PURPLE}0.04)`, borderLeft: `4px solid ${PURPLE}0.50)` }}
        >
          <p
            className="font-mono text-2xs uppercase tracking-widest mb-space-3"
            style={{ color: `${PURPLE}0.70)` }}
          >
            POV 2: System
          </p>
          <p className="text-base text-neutral-800 leading-relaxed italic">
            &ldquo;Households managing cleaning need a coherent system rather than a drawer of incompatible products, because the mental load of managing many products is the real burden, not the performance of any one of them.&rdquo;
          </p>
        </blockquote>
      </div>
    </div>
  )
}

function DevelopContent() {
  const [activePov, setActivePov] = useState<1 | 2>(1)
  const prefersReduced = useReducedMotion()

  const povDimensions: Record<1 | 2, { label: string; content: string }[]> = {
    1: [
      {
        label: 'Product',
        content:
          'Three forms explored: a simple scheduled refill box, a sensor-triggered reorder (smart dispenser), and an AI-predicted model that learns household consumption patterns.',
      },
      {
        label: 'Business model',
        content:
          'Subscription margin modeled at the 50,000-subscriber threshold identified in the Viability research stream: the break-even point where unit economics become attractive.',
      },
      {
        label: 'Delivery',
        content:
          'Direct-to-consumer vs. a retailer-partnered model. Each carries different unit economics, customer acquisition cost, and brand implications.',
      },
    ],
    2: [
      {
        label: 'Product',
        content:
          'A curated, coordinated set of cleaning products designed to work as one system, in refillable durable vessels: the physical expression of the "coherent system" POV.',
      },
      {
        label: 'Business model',
        content:
          'Premium price point with recurring refill revenue. The razor-and-blades logic the viability benchmarking had already validated across 12 comparators.',
      },
      {
        label: 'Delivery',
        content:
          "Direct-to-consumer subscription, supported by Northvale's manufacturing but bypassing the retail shelf where private label was eroding margin.",
      },
    ],
  }

  return (
    <div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-space-6">
        The Doblin difference in Develop: a concept is never just a product idea. Every concept is developed across three dimensions at once: what it is, how it makes money, and how it reaches people. A product idea without a business-model hypothesis is treated as incomplete.
      </p>

      <div className="flex gap-space-3 mb-space-6">
        {([1, 2] as const).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setActivePov(n)}
            className="flex-1 rounded-lg px-space-4 py-space-3 text-sm text-left transition-colors duration-200"
            style={{
              background: activePov === n ? `${PURPLE}0.08)` : 'var(--color-warm-50)',
              border: `1px solid ${activePov === n ? `${PURPLE}0.25)` : 'var(--color-neutral-200)'}`,
              color: activePov === n ? `${PURPLE}0.85)` : 'var(--color-neutral-600)',
              fontWeight: activePov === n ? 600 : 400,
            }}
          >
            <span
              className="font-mono text-2xs uppercase tracking-widest block mb-space-1"
              style={{ color: 'inherit', opacity: 0.7 }}
            >
              POV {n}
            </span>
            {n === 1 ? 'Replenishment' : 'System'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePov}
          initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          exit={prefersReduced ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-4 mb-space-5">
            {povDimensions[activePov].map(({ label, content }) => (
              <div
                key={label}
                className="rounded-lg p-space-5"
                style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
              >
                <p
                  className="font-mono text-2xs uppercase tracking-widest mb-space-3"
                  style={{ color: `${PURPLE}0.65)` }}
                >
                  {label}
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          {activePov === 1 && (
            <div
              className="rounded-lg px-space-5 py-space-4 mb-space-2"
              style={{ background: `${PURPLE}0.05)`, borderLeft: `3px solid ${PURPLE}0.40)` }}
            >
              <p
                className="font-mono text-2xs uppercase tracking-widest mb-space-2"
                style={{ color: `${PURPLE}0.70)` }}
              >
                Testing with 120 households revealed
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The sensor and AI versions were most loved but required device and software capability Northvale lacked.{' '}
                <strong className="text-neutral-900">Resolution:</strong> launch the scheduled box, partner with an existing smart-home platform to add prediction later, a phased path that respects feasibility now and desirability later.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div
        className="rounded-xl p-space-6 mt-space-6"
        style={{ border: `1px solid ${PURPLE}0.20)`, background: `${PURPLE}0.03)` }}
      >
        <p className="font-semibold text-sm text-neutral-900 mb-space-5">
          The Doblin triple gate: required before either concept moved to Deliver
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-5">
          {[
            {
              filter: 'Desirability',
              confirmation: 'Confirmed via prototype testing with 120 households.',
            },
            {
              filter: 'Viability',
              confirmation: 'Confirmed via financial model showing path to target margin at ~50,000 subscribers.',
            },
            {
              filter: 'Feasibility',
              confirmation: 'Confirmed via signed letters of intent with two technology partners.',
            },
          ].map(({ filter, confirmation }) => (
            <div key={filter} className="flex items-start gap-space-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${PURPLE}0.70)` }}
              >
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-sm text-neutral-900">{filter}</p>
                <p className="text-xs text-neutral-500 mt-space-1 leading-relaxed">{confirmation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DeliverContent() {
  return (
    <div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-space-8">
        Live pilots of both concepts in two cities each, with pre-committed success criteria set before launch: subscriber acquisition cost, 90-day retention, and contribution margin trajectory.
      </p>

      <div className="grid grid-cols-2 gap-space-4 mb-space-8">
        {[
          {
            n: '2',
            label: 'city pilots per concept',
            sub: 'Pre-committed success criteria set before launch',
          },
          {
            n: '2',
            label: 'revenue streams approved',
            sub: 'Both concepts met all pre-committed criteria',
          },
        ].map(({ n, label, sub }) => (
          <div
            key={label}
            className="rounded-xl p-space-6"
            style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
          >
            <p
              className="font-display font-semibold"
              style={{ fontSize: '3rem', lineHeight: 1, color: `${PURPLE}0.18)` }}
            >
              {n}
            </p>
            <p className="font-semibold text-neutral-900 mt-space-2 text-sm">{label}</p>
            <p className="text-xs text-neutral-500 mt-space-1 leading-relaxed">{sub}</p>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-space-6"
        style={{ background: `${PURPLE}0.05)`, border: `1px solid ${PURPLE}0.15)` }}
      >
        <p
          className="font-mono text-2xs uppercase tracking-widest mb-space-3"
          style={{ color: `${PURPLE}0.70)` }}
        >
          Outcome at Deliver
        </p>
        <p className="font-semibold text-neutral-900 mb-space-2">
          Winning concept: premium direct-to-consumer system with subscription refill.
        </p>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Full rollout approved for both revenue streams. Both pilots met pre-committed success criteria on subscriber acquisition cost, 90-day retention, and contribution margin trajectory.
        </p>
      </div>
    </div>
  )
}

export default function DDCaseStudy() {
  const [activePhase, setActivePhase] = useState<Phase>('discover')
  const [activeStream, setActiveStream] = useState<StreamKey>('desirability')
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
          style={{ background: 'rgba(17,24,39,0.08)', color: 'var(--color-neutral-600)' }}
        >
          Mock scenario
        </span>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Northvale Home is an invented company and this engagement is illustrative. It is written to show what the work and outputs of each Double Diamond phase look like in practice. The methods, artifacts, and decision logic are realistic; the company and its results are fictional.
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
            ['Company', 'Northvale Home (fictional)'],
            ['Revenue', '$9B global consumer goods'],
            ['Duration', '28 weeks'],
            ['Team', '9 people, cross-functional'],
            ['Version', 'Doblin Double Diamond'],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-1">
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
            The mandate
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
            Identify two new revenue streams capable of reaching $500M each within five years.
          </p>
          <p className="text-sm text-neutral-500 mt-space-3">
            Constraint: use existing manufacturing, distribution, or brand relationships.
          </p>
        </div>
      </div>

      {/* Phase navigator */}
      <div className="flex flex-wrap gap-space-2 mb-space-6">
        {PHASE_DEFS.map(({ key, label, sub, mode }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActivePhase(key)}
            className="flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-colors duration-200 flex-1 min-w-[120px]"
            style={{
              background: activePhase === key ? `${PURPLE}0.08)` : '#FFFFFF',
              border: `1px solid ${activePhase === key ? `${PURPLE}0.25)` : 'var(--color-neutral-200)'}`,
            }}
          >
            <span
              className="font-mono text-2xs uppercase tracking-widest mb-space-1"
              style={{
                color: activePhase === key ? `${PURPLE}0.65)` : 'var(--color-neutral-500)',
              }}
            >
              {mode}
            </span>
            <span
              className="font-semibold text-sm"
              style={{
                color: activePhase === key ? `${PURPLE}0.90)` : 'var(--color-neutral-700)',
              }}
            >
              {label}
            </span>
            <span
              className="text-xs"
              style={{
                color: activePhase === key ? `${PURPLE}0.55)` : 'var(--color-neutral-500)',
              }}
            >
              {sub}
            </span>
          </button>
        ))}
      </div>

      {/* Phase content panel */}
      <div
        className="rounded-2xl p-space-6 md:p-space-8 mb-space-10"
        style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activePhase === 'discover' && (
              <DiscoverContent activeStream={activeStream} setActiveStream={setActiveStream} />
            )}
            {activePhase === 'define' && <DefineContent />}
            {activePhase === 'develop' && <DevelopContent />}
            {activePhase === 'deliver' && <DeliverContent />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Key lessons */}
      <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-4">
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
