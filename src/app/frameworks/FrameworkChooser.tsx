'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MiniIllustration } from './miniIllustrations'

// ── Types ─────────────────────────────────────────────────────────────────────

type FwId = 'design-thinking' | 'double-diamond' | 'lean-startup' | 'design-sprint' | 'agile-innovation' | 'fde'
type QId  = 'q1' | 'q2' | 'q3' | 'q4a' | 'q4b' | 'q4c' | 'q5a' | 'q5b' | 'q6a' | 'q6b'

// ── Framework registry ────────────────────────────────────────────────────────

const FW_ORDER: FwId[] = [
  'design-thinking', 'double-diamond', 'lean-startup',
  'design-sprint', 'agile-innovation', 'fde',
]

const FW_META: Record<FwId, { title: string; tagline: string; color: string }> = {
  'design-thinking':  { title: 'Design Thinking',             tagline: 'Start with the human, not the idea.',                    color: 'rgba(13,148,136,'  },
  'double-diamond':   { title: 'Double Diamond',              tagline: 'Separate finding the problem from finding the solution.', color: 'rgba(124,58,237,'  },
  'lean-startup':     { title: 'Lean Startup',                tagline: 'Replace planning with validated learning.',               color: 'rgba(30,64,175,'   },
  'design-sprint':    { title: 'Design Sprint',               tagline: 'Answer a critical question in five days.',                color: 'rgba(180,83,9,'    },
  'agile-innovation': { title: 'Agile Innovation',            tagline: 'Discover and deliver, continuously.',                    color: 'rgba(107,77,122,'  },
  'fde':              { title: 'Forward Deployed Engineering', tagline: "Engineers embedded in the customer's problem.",          color: 'rgba(185,28,28,'   },
}

// ── Questions ─────────────────────────────────────────────────────────────────

type Option   = { id: string; label: string; scores: Partial<Record<FwId, number>> }
type Question = { id: QId; question: string; options: Option[] }

const QUESTIONS: Record<QId, Question> = {
  // ── Executive (everyone answers) ─────────────────────────────────────────
  q1: {
    id: 'q1',
    question: 'What stage are you actually at?',
    options: [
      { id: 'A', label: "I'm not even sure what the real problem is",              scores: { 'design-thinking': 3, 'double-diamond': 3 } },
      { id: 'B', label: "The problem's clear; I need to find the right solution",  scores: { 'design-sprint': 3, 'double-diamond': 2, 'design-thinking': 1 } },
      { id: 'C', label: "I have a solution direction; I need to validate it works", scores: { 'lean-startup': 3, 'design-sprint': 1 } },
      { id: 'D', label: "Direction's validated; I need to keep building and shipping", scores: { 'agile-innovation': 3, 'lean-startup': 1 } },
    ],
  },
  q2: {
    id: 'q2',
    question: 'How much time and commitment can you give this?',
    options: [
      { id: 'A', label: 'Days',                           scores: { 'design-sprint': 3 } },
      { id: 'B', label: 'A few weeks',                    scores: { 'design-thinking': 2, 'double-diamond': 2, 'lean-startup': 1 } },
      { id: 'C', label: 'Months, but a defined project',  scores: { 'double-diamond': 2, 'lean-startup': 2 } },
      { id: 'D', label: 'Ongoing / it never really ends', scores: { 'agile-innovation': 3, 'fde': 2 } },
    ],
  },
  q3: {
    id: 'q3',
    question: 'What are you actually trying to produce?',
    options: [
      { id: 'A', label: 'A product, service, or experience people use',          scores: { 'design-thinking': 2, 'double-diamond': 2 } },
      { id: 'B', label: 'A viable new business or revenue stream',               scores: { 'lean-startup': 3, 'double-diamond': 1 } },
      { id: 'C', label: 'A continuous delivery capability or team',              scores: { 'agile-innovation': 3 } },
      { id: 'D', label: 'A deeply custom solution for specific large customers', scores: { 'fde': 3 } },
    ],
  },
  // ── Discovery branch (Q4a → Q5a → Q6a) ──────────────────────────────────
  q4a: {
    id: 'q4a',
    question: 'How well do you understand your users already?',
    options: [
      { id: 'A', label: "Barely — we're guessing",                       scores: { 'design-thinking': 2 } },
      { id: 'B', label: "Somewhat, but it's not structured",              scores: { 'double-diamond': 2 } },
      { id: 'C', label: 'Well — we just need to pick a direction fast',  scores: { 'design-sprint': 2 } },
    ],
  },
  q5a: {
    id: 'q5a',
    question: 'How does the decision need to get made?',
    options: [
      { id: 'A', label: 'Build deep shared understanding across a team',  scores: { 'design-thinking': 2, 'double-diamond': 1 } },
      { id: 'B', label: 'Follow a clear diverge-then-converge structure', scores: { 'double-diamond': 2 } },
      { id: 'C', label: 'Settle an argument and decide in one week',      scores: { 'design-sprint': 3 } },
    ],
  },
  q6a: {
    id: 'q6a',
    question: 'What does success look like at the end?',
    options: [
      { id: 'A', label: 'A well-framed problem and a strong point of view', scores: { 'design-thinking': 2, 'double-diamond': 1 } },
      { id: 'B', label: 'Two or three validated solution concepts',          scores: { 'double-diamond': 2 } },
      { id: 'C', label: 'One tested prototype with real user feedback',      scores: { 'design-sprint': 3 } },
    ],
  },
  // ── Delivery branch (Q4b → Q5b → Q6b) ───────────────────────────────────
  q4b: {
    id: 'q4b',
    question: "What's your biggest risk right now?",
    options: [
      { id: 'A', label: 'Nobody may actually want this',                                  scores: { 'lean-startup': 3 } },
      { id: 'B', label: "We'll build efficiently but build the wrong thing",              scores: { 'agile-innovation': 2, 'lean-startup': 1 } },
      { id: 'C', label: "Our customers' problems are too complex for a standard product", scores: { 'fde': 3 } },
    ],
  },
  q5b: {
    id: 'q5b',
    question: "What's your customer/market context?",
    options: [
      { id: 'A', label: 'Many customers, one product',                          scores: { 'lean-startup': 2, 'agile-innovation': 1 } },
      { id: 'B', label: 'An ongoing product with a team shipping continuously', scores: { 'agile-innovation': 3 } },
      { id: 'C', label: 'A few large customers paying premium for custom work', scores: { 'fde': 3 } },
    ],
  },
  q6b: {
    id: 'q6b',
    question: "What's your appetite for chaos and autonomy?",
    options: [
      { id: 'A', label: 'We need predictability and a roadmap',                           scores: { 'agile-innovation': 2 } },
      { id: 'B', label: 'We can run fast experiments and pivot',                          scores: { 'lean-startup': 2 } },
      { id: 'C', label: 'We can embed engineers in the field and tolerate real messiness', scores: { 'fde': 3 } },
    ],
  },
  // ── Bridging question (only when field is split after Q3) ────────────────
  q4c: {
    id: 'q4c',
    question: 'If you had to choose, is your harder problem figuring out WHAT to build, or HOW to keep building it well?',
    options: [
      { id: 'A', label: 'What to build',          scores: {} },
      { id: 'B', label: 'How to keep building it', scores: {} },
    ],
  },
}

// ── Branch detection ──────────────────────────────────────────────────────────

const DISCOVERY_SIDE: FwId[] = ['design-thinking', 'double-diamond', 'design-sprint']
const DELIVERY_SIDE:  FwId[] = ['lean-startup', 'agile-innovation', 'fde']

type Branch = 'discovery' | 'delivery' | 'split'

function detectBranch(scores: Record<FwId, number>): Branch {
  const topDisc  = Math.max(...DISCOVERY_SIDE.map((f) => scores[f]))
  const topDeliv = Math.max(...DELIVERY_SIDE.map((f) => scores[f]))
  if (Math.abs(topDisc - topDeliv) <= 1) return 'split'
  return topDisc > topDeliv ? 'discovery' : 'delivery'
}

// ── Scoring helpers ───────────────────────────────────────────────────────────

function zeroScores(): Record<FwId, number> {
  return Object.fromEntries(FW_ORDER.map((id) => [id, 0])) as Record<FwId, number>
}

function addScores(
  base: Record<FwId, number>,
  delta: Partial<Record<FwId, number>>,
): Record<FwId, number> {
  const out = { ...base }
  for (const [k, v] of Object.entries(delta) as [FwId, number][]) {
    out[k] = (out[k] ?? 0) + v
  }
  return out
}

// ── Result computation ────────────────────────────────────────────────────────

function topTwo(scores: Record<FwId, number>): [FwId, FwId] {
  const ranked = [...FW_ORDER].sort((a, b) => {
    const d = scores[b] - scores[a]
    // Tie-break: prefer earlier in educational order
    return d !== 0 ? d : FW_ORDER.indexOf(a) - FW_ORDER.indexOf(b)
  })
  return [ranked[0], ranked[1]]
}

// ── Dynamic reason ────────────────────────────────────────────────────────────

const STAGE_FRAG: Record<string, string> = {
  A: "you're still figuring out the real problem",
  B: 'you have a clear problem but not yet a solution',
  C: 'you have a direction you need to validate',
  D: "you're already in continuous delivery mode",
}
const TIME_FRAG: Record<string, string> = {
  A: 'with days to work with',
  B: 'across a few weeks',
  C: 'over a defined project',
  D: 'as an ongoing, open-ended effort',
}

function buildReason(fw: FwId, answers: Partial<Record<QId, string>>): string {
  const stage = STAGE_FRAG[answers.q1 ?? '']
  const time  = TIME_FRAG[answers.q2 ?? '']
  if (stage && time) return `Because ${stage}, working ${time}.`
  if (stage) return `Because ${stage}.`
  return 'A strong fit for your context and goals.'
}

// ── Contribution lookup (for "Why these?" panel) ──────────────────────────────

function contributions(
  path: QId[],
  answers: Partial<Record<QId, string>>,
  target: FwId,
): Array<{ question: string; answer: string }> {
  return path.flatMap((qid) => {
    const optId = answers[qid]
    if (!optId) return []
    const opt = QUESTIONS[qid].options.find((o) => o.id === optId)
    if (!opt || (opt.scores[target] ?? 0) === 0) return []
    return [{ question: QUESTIONS[qid].question, answer: opt.label }]
  })
}

// ── Sub-components ────────────────────────────────────────────────────────────

type FrameworkEntry = { slug: string; title: string; color: string }

function OptionBtn({
  label, selected, onClick,
}: {
  label: string; selected: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-xl text-sm leading-snug"
      style={{
        background: selected ? 'rgba(17,24,39,0.05)' : '#FFFFFF',
        border:     selected ? '2px solid var(--color-neutral-900)' : '1px solid var(--color-neutral-200)',
        color:      selected ? 'var(--color-neutral-900)' : 'var(--color-neutral-600)',
        fontWeight: selected ? 600 : 400,
        outline:    'none',
        transition: 'border-color 0.12s, background 0.12s',
      }}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <span
        className="inline-block w-4 h-4 rounded-full border mr-3 align-middle"
        style={{
          borderColor: selected ? 'var(--color-neutral-900)' : 'var(--color-neutral-300)',
          background:  selected ? 'var(--color-neutral-900)' : 'transparent',
          flexShrink:  0,
          transition: 'background 0.12s, border-color 0.12s',
        }}
        aria-hidden
      />
      {label}
    </button>
  )
}

function ResultCard({
  fw, reason, isPrimary,
}: {
  fw: FwId; reason: string; isPrimary: boolean
}) {
  const meta = FW_META[fw]
  return (
    <Link href={`/framework/${fw}`} className="block">
      <div
        className="rounded-xl overflow-hidden bg-white transition-shadow duration-150 hover:shadow-md"
        style={{ border: `1px solid ${isPrimary ? `${meta.color}0.30)` : 'var(--color-neutral-200)'}` }}
      >
        <div style={{ height: isPrimary ? 4 : 3, background: `${meta.color}${isPrimary ? '0.85)' : '0.50)'}` }} />
        <div className="p-5">
          <div className="flex items-center justify-center mb-4" style={{ height: 64 }} aria-hidden="true">
            <div style={{ width: '100%', maxWidth: 140 }}>
              <MiniIllustration slug={fw} color={meta.color} />
            </div>
          </div>
          <h4
            className="font-semibold mb-1"
            style={{ fontSize: isPrimary ? '1rem' : '0.875rem', color: `${meta.color}0.90)` }}
          >
            {meta.title}
          </h4>
          <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--color-neutral-500)' }}>
            {meta.tagline}
          </p>
          <p className="text-xs italic leading-snug mb-3" style={{ color: 'var(--color-neutral-600)' }}>
            {reason}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: `${meta.color}0.60)` }}>
            View framework →
          </p>
        </div>
      </div>
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FrameworkChooser({ frameworks }: { frameworks: FrameworkEntry[] }) {
  void frameworks // prop kept for API compatibility; metadata sourced from FW_META

  const [scores,  setScores]  = useState<Record<FwId, number>>(zeroScores)
  const [answers, setAnswers] = useState<Partial<Record<QId, string>>>({})
  const [path,    setPath]    = useState<QId[]>(['q1', 'q2', 'q3'])
  const [step,    setStep]    = useState(0)
  const [done,    setDone]    = useState(false)
  const [whyOpen, setWhyOpen] = useState(false)

  const prefersReduced = useReducedMotion()
  const focusRef = useRef<HTMLDivElement>(null)

  const currentQId = path[step] as QId | undefined
  const currentQ   = currentQId ? QUESTIONS[currentQId] : null
  const TOTAL_Q    = 6  // always exactly 6 for every visitor

  useEffect(() => {
    if (step > 0 || done) focusRef.current?.focus()
  }, [step, done])

  function handleAnswer(optId: string) {
    if (!currentQId) return
    const opt = QUESTIONS[currentQId].options.find((o) => o.id === optId)
    if (!opt) return

    const newScores  = addScores(scores, opt.scores)
    const newAnswers = { ...answers, [currentQId]: optId } as Partial<Record<QId, string>>

    // Determine / extend the question path
    let newPath = [...path]

    if (step === 2) {
      // Just answered Q3 → pick branch
      const branch = detectBranch(newScores)
      if (branch === 'split')          newPath = ['q1', 'q2', 'q3', 'q4c']
      else if (branch === 'discovery') newPath = ['q1', 'q2', 'q3', 'q4a', 'q5a', 'q6a']
      else                             newPath = ['q1', 'q2', 'q3', 'q4b', 'q5b', 'q6b']
    }

    if (currentQId === 'q4c') {
      // Bridging question answered → route to matching branch
      const base: QId[] = ['q1', 'q2', 'q3', 'q4c']
      newPath = optId === 'A'
        ? [...base, 'q5a', 'q6a']
        : [...base, 'q5b', 'q6b']
    }

    // Immediate: record answer for visual feedback (radio highlight)
    setAnswers(newAnswers)
    setScores(newScores)

    // Delayed: advance to next question or show results
    setTimeout(() => {
      const next = step + 1
      setPath(newPath)
      if (next >= newPath.length) setDone(true)
      else setStep(next)
    }, 320)
  }

  function reset() {
    setScores(zeroScores())
    setAnswers({})
    setPath(['q1', 'q2', 'q3'])
    setStep(0)
    setDone(false)
    setWhyOpen(false)
  }

  // ── Compute results (only when done) ─────────────────────────────────────

  const result       = done ? topTwo(scores) : null
  const primary      = result?.[0]
  const runnerUp     = result?.[1]
  const primReason   = primary  ? buildReason(primary,  answers) : ''
  const runnerReason = runnerUp ? buildReason(runnerUp, answers) : ''
  const primContribs = primary  ? contributions(path, answers, primary)  : []
  const runContribs  = runnerUp ? contributions(path, answers, runnerUp) : []

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section aria-labelledby="chooser-heading" className="mt-20">

      {/* Section header */}
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-framework)' }}>
          Not sure where to start?
        </p>
        <h2
          id="chooser-heading"
          className="font-display font-bold mb-3"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--color-neutral-900)',
          }}
        >
          Which framework fits you?
        </h2>
        <p className="text-base max-w-prose" style={{ color: 'var(--color-neutral-600)' }}>
          Six adaptive questions. Under a minute.
        </p>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl p-8 md:p-10"
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          boxShadow: '0 1px 3px rgba(17,24,39,0.04), 0 1px 2px rgba(17,24,39,0.06)',
        }}
      >
        {/* Progress bar — only shown while answering */}
        {!done && (
          <div
            className="flex items-center gap-2 mb-8"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={TOTAL_Q}
            aria-label={`Question ${step + 1} of ${TOTAL_Q}`}
          >
            {Array.from({ length: TOTAL_Q }, (_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{
                  background: i <= step ? 'var(--color-neutral-900)' : 'var(--color-neutral-200)',
                  opacity: i < step ? 0.4 : 1,
                }}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── Question view ──────────────────────────────────────────────── */}
          {!done && currentQ && (
            <motion.div
              key={currentQId}
              ref={focusRef}
              tabIndex={-1}
              style={{ outline: 'none' }}
              initial={prefersReduced ? {} : { opacity: 0, x: 16 }}
              animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-neutral-400)' }}
              >
                Question {step + 1} of {TOTAL_Q}
              </p>
              <h3
                className="font-semibold mb-6"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  color: 'var(--color-neutral-900)',
                  lineHeight: 1.3,
                }}
              >
                {currentQ.question}
              </h3>
              <div role="radiogroup" aria-label={currentQ.question} className="flex flex-col gap-3">
                {currentQ.options.map((opt) => (
                  <OptionBtn
                    key={opt.id}
                    label={opt.label}
                    selected={answers[currentQId!] === opt.id}
                    onClick={() => handleAnswer(opt.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Results view ───────────────────────────────────────────────── */}
          {done && primary && runnerUp && (
            <motion.div
              key="results"
              ref={focusRef}
              tabIndex={-1}
              style={{ outline: 'none' }}
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <p
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: 'var(--color-neutral-400)' }}
                >
                  Your match
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="font-mono text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-neutral-400)' }}
                >
                  ← Start over
                </button>
              </div>

              {/* Primary + runner-up cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: 'var(--color-neutral-900)' }}
                  >
                    Best match
                  </p>
                  <ResultCard fw={primary} reason={primReason} isPrimary />
                </div>
                <div>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: 'var(--color-neutral-400)' }}
                  >
                    Also consider
                  </p>
                  <ResultCard fw={runnerUp} reason={runnerReason} isPrimary={false} />
                </div>
              </div>

              {/* Why these? expandable */}
              <div
                className="pt-5"
                style={{ borderTop: '1px solid var(--color-neutral-100)' }}
              >
                <button
                  type="button"
                  aria-expanded={whyOpen}
                  aria-controls="why-these-panel"
                  onClick={() => setWhyOpen((o) => !o)}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-neutral-400)' }}
                >
                  <motion.span
                    animate={prefersReduced ? {} : { rotate: whyOpen ? 90 : 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block', lineHeight: 1 }}
                    aria-hidden
                  >
                    ›
                  </motion.span>
                  Why these?
                </button>

                <AnimatePresence initial={false}>
                  {whyOpen && (
                    <motion.div
                      id="why-these-panel"
                      key="why"
                      role="region"
                      aria-label="Score breakdown"
                      initial={prefersReduced ? false : { opacity: 0, height: 0 }}
                      animate={prefersReduced ? {} : { opacity: 1, height: 'auto' }}
                      exit={prefersReduced ? {} : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pt-5 grid md:grid-cols-2 gap-6">
                        {([
                          { fw: primary,  contribs: primContribs  },
                          { fw: runnerUp, contribs: runContribs   },
                        ] as const).map(({ fw, contribs }) => {
                          const meta = FW_META[fw]
                          return (
                            <div key={fw}>
                              <p
                                className="font-mono uppercase tracking-widest mb-3"
                                style={{ fontSize: 'var(--text-2xs)', color: `${meta.color}0.80)` }}
                              >
                                Why {meta.title}
                              </p>
                              {contribs.length > 0 ? (
                                <div className="flex flex-col gap-3">
                                  {contribs.map((c, i) => (
                                    <div key={i} className="flex gap-3">
                                      <div
                                        className="w-0.5 shrink-0 self-stretch rounded-full"
                                        style={{ background: `${meta.color}0.30)` }}
                                      />
                                      <div>
                                        <p
                                          className="mb-0.5"
                                          style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                                        >
                                          {c.question}
                                        </p>
                                        <p
                                          style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}
                                        >
                                          &ldquo;{c.answer}&rdquo;
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>
                                  This framework fits your overall profile.
                                </p>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Answer recap */}
              <div
                className="mt-6 pt-6"
                style={{ borderTop: '1px solid var(--color-neutral-100)' }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-4"
                  style={{ color: 'var(--color-neutral-300)' }}
                >
                  Your answers
                </p>
                <div className="flex flex-col gap-2">
                  {path.map((qid, i) => {
                    const optId = answers[qid]
                    if (!optId) return null
                    const opt = QUESTIONS[qid].options.find((o) => o.id === optId)
                    if (!opt) return null
                    return (
                      <div
                        key={qid}
                        className="flex items-start gap-3 text-xs"
                        style={{ color: 'var(--color-neutral-500)' }}
                      >
                        <span
                          className="font-semibold shrink-0 mt-px"
                          style={{ color: 'var(--color-neutral-400)' }}
                        >
                          Q{i + 1}
                        </span>
                        <span>{opt.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
