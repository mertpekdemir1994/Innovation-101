'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,77,122,'

type StageId = 'discovery' | 'backlog' | 'sprint' | 'review' | 'retro'

const STAGES: { id: StageId; label: string; n: string; mode: string; special?: boolean }[] = [
  { id: 'discovery', label: 'Discovery Sprint',   n: '01', mode: 'Discover',  special: true  },
  { id: 'backlog',   label: 'Backlog',             n: '02', mode: 'Prioritize'               },
  { id: 'sprint',    label: 'Sprint',              n: '03', mode: 'Build'                    },
  { id: 'review',    label: 'Review',              n: '04', mode: 'Demo'                     },
  { id: 'retro',     label: 'Retrospective',       n: '05', mode: 'Improve'                  },
]

const STAGE_DETAIL: Record<StageId, {
  headline: string
  description: string
  prompt: string
  example: { co: string; text: string }
}> = {
  discovery: {
    headline: 'Discovery Sprint: go back to users before committing to the next delivery sprint',
    description:
      'The Discovery Sprint is the innovation layer that standard Agile lacks. A focused period of user research, assumption testing, and insight generation that continuously refreshes the team\'s understanding of the problem space. It runs at the start of every initiative, at the start of each new phase, and when user research signals the team may be building the wrong thing. The test of a good Discovery Sprint: it produces evidence that actually changes the backlog, sometimes uncomfortably.',
    prompt: 'When did your team last talk directly to users? If it has been more than two weeks, what assumptions are you currently building on that have not been tested since then?',
    example: {
      co: 'ING Bank: Customer Journey Sprints',
      text: 'ING Bank\'s transformation to Agile Innovation included mandatory Discovery Sprints called "customer journey sprints" that ran alongside delivery sprints in every squad. ING credited this dual-sprint rhythm (discovery and delivery running in parallel) as a key factor in reducing time-to-market for new features from 14 months to 5 weeks.',
    },
  },
  backlog: {
    headline: 'Backlog Management: the backlog is a prioritized hypothesis list, not a feature wish list',
    description:
      'In Agile Innovation, the backlog is a prioritized list of hypotheses to test and features to build, with the distinction clearly marked. Each item specifies what is being built or tested, the hypothesis it is testing or the user need it addresses, the success metric, and the risk level. A three-tier structure makes risk visible: validated items (strong evidence, build confidently), testing items (promising signals, small test first), and exploring items (hypotheses, discovery first).',
    prompt: 'Take the top three items on your current backlog. For each, write the specific hypothesis it is testing and the metric that will tell you if the hypothesis was validated. If you cannot write these for an item, the item may not be ready for a delivery sprint.',
    example: {
      co: 'Amazon: Working Backwards Documents',
      text: 'Amazon\'s "working backwards" document (a press release and FAQ written for each proposed feature before any development begins) is a version of this principle. The press release describes the feature as if it already exists and has been enthusiastically received. This document is the innovation backlog item; it specifies the hypothesis before any development investment is made. Items that cannot produce a compelling press release do not make the backlog.',
    },
  },
  sprint: {
    headline: 'Sprint Execution: build in two-week cycles. Ship something real at the end of every sprint',
    description:
      'The delivery sprint is the heartbeat of Agile Innovation: a focused, time-boxed cycle in which a cross-functional team builds and tests a prioritized set of backlog items. Every sprint ends with a working, demonstrable output: not a plan, not a design, but something that can be shown to users or stakeholders and generates real feedback. Cross-functional team composition is non-negotiable: a sprint team that must wait for a designer, engineer, or researcher from outside the team cannot deliver in two weeks.',
    prompt: 'What is the single most important thing your team needs to deliver in the next two weeks? What does "done" look like? If you had to ship one thing (not plan or design, but actually ship) what would it be?',
    example: {
      co: 'Bosch: IoT Innovation Team',
      text: 'Bosch\'s IoT innovation team ran two-week delivery sprints with a standing rule that every sprint must end with something placed in the hands of at least one real user. This rule forced the team to decompose work into units genuinely completable in two weeks. After 18 months of this discipline, cycle time from idea to user feedback dropped from six months to three weeks.',
    },
  },
  review: {
    headline: 'Sprint Review: show real work to real stakeholders. Gather real feedback',
    description:
      'The Sprint Review demonstrates what the team built during the sprint, presented to stakeholders and, where possible, real users. It is not a status meeting or a slide deck. It is a live demonstration of working output designed to generate concrete feedback that informs the next sprint. A good review: the team demonstrates working output (not plans), stakeholders interact with or observe the output directly, feedback is specific and actionable, and the feedback directly informs backlog reprioritization.',
    prompt: 'Who should be in the room for your next Sprint Review that is not currently invited? What specific question do you most need answered by real users at the end of this sprint?',
    example: {
      co: 'Google Area 120: Internal Incubator',
      text: 'Google\'s Area 120 internal incubator runs sprint reviews where teams demo their experiments directly to potential users, not just internal stakeholders. This practice ensures that the feedback shaping the next sprint comes from people who will actually use the product. Several Area 120 products that graduated to full Google products (including Jamboard) cite user-first sprint reviews as a key factor in finding product-market fit quickly.',
    },
  },
  retro: {
    headline: 'Retrospective: improve the way you work, not just what you build',
    description:
      'The Retrospective is the sprint\'s learning session, focused not on the product but on the process. Every two weeks, the team asks: what worked well, what did not work, and what will we change in the next sprint? The critical discipline: the third question must produce at least one concrete, owned process change before the meeting closes. A retrospective that does not produce a change is a complaint session. Longitudinal tracking (checking whether changes from previous retrospectives actually stuck) turns a bi-weekly habit into a genuine improvement engine.',
    prompt: 'On your most recent project, what is one thing that slowed the team down that a simple process change could have prevented? What specifically would that change look like, and who would own making it?',
    example: {
      co: 'Atlassian: Health Monitor',
      text: 'Atlassian\'s engineering teams run retrospectives using a structured format called the "Health Monitor" (a regular assessment of eight team health attributes) (including clarity of mission, psychological safety, quality of output, speed, and fun) tracked over time. This longitudinal dimension prevents the common failure of identifying the same problems sprint after sprint without making progress on them.',
    },
  },
}

const READINESS_QUESTIONS = [
  {
    q: 'Does your team have the authority to change direction based on what they learn each sprint?',
    hint: 'If every direction change requires senior approval, Agile Innovation will frustrate more than it delivers.',
  },
  {
    q: 'Is your team cross-functional: can it deliver a complete sprint output without waiting on people outside the team?',
    hint: 'Design, engineering, and research all need to sit inside the squad. External dependencies break the two-week cycle.',
  },
  {
    q: 'Has your team talked directly to users in the past two weeks?',
    hint: 'If not, what assumptions is the current backlog resting on that have not been tested?',
  },
  {
    q: 'Can each item on your backlog be traced to a specific hypothesis and a success metric?',
    hint: 'If not, the backlog may be a wish list rather than a prioritized learning plan.',
  },
  {
    q: 'Does your team end every retrospective with at least one concrete, owned process change?',
    hint: 'A retrospective that does not produce a change is a complaint session. The process improvement loop only works if changes are made and tracked.',
  },
]

function readinessResult(yesCount: number): { label: string; text: string } {
  if (yesCount === 5) return {
    label: 'Agile Innovation ready',
    text: 'The conditions for Agile Innovation are in place. The rhythm will work. Start with a Discovery Sprint.',
  }
  if (yesCount === 4) return {
    label: 'Nearly ready',
    text: 'Address the one gap before committing to the full rhythm: the authority question and cross-functional composition are the hardest to fix mid-stride.',
  }
  if (yesCount === 3) return {
    label: 'Conditionally ready',
    text: 'The gaps will limit the rhythm. Address team authority and cross-functional structure before the conditions create a ceiling on what the sprints can achieve.',
  }
  return {
    label: 'Not yet ready',
    text: 'Running Agile Innovation ceremonies without the conditions will produce frustration, not learning. Fix the structural prerequisites first, especially team authority and composition.',
  }
}

type QuizAnswers = (boolean | null)[]

function ReadinessCheck() {
  const [answers, setAnswers] = useState<QuizAnswers>(Array(5).fill(null))
  const prefersReduced = useReducedMotion()

  const answered = answers.filter((a) => a !== null).length
  const yesCount = answers.filter((a) => a === true).length
  const allAnswered = answered === 5
  const result = allAnswered ? readinessResult(yesCount) : null

  function toggle(i: number, val: boolean) {
    setAnswers((prev) => {
      const next = [...prev]
      next[i] = prev[i] === val ? null : val
      return next
    })
  }

  return (
    <div>
      <p className="text-sm leading-relaxed mb-space-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
        Answer five questions to check whether your team has the conditions for Agile Innovation to work.
        The rhythm runs on structural prerequisites; the ceremonies alone are not enough.
      </p>

      <div className="space-y-space-4">
        {READINESS_QUESTIONS.map((item, i) => {
          const ans = answers[i]
          return (
            <div
              key={i}
              className="rounded-lg p-space-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-sm font-semibold mb-space-1" style={{ color: ans !== null ? '#fff' : 'rgba(255,255,255,0.75)' }}>
                {item.q}
              </p>
              <p className="text-xs mb-space-3" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.hint}</p>
              <div className="flex gap-space-2">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => toggle(i, val)}
                    className="px-space-4 py-space-2 rounded text-xs font-semibold transition-all duration-200"
                    style={{
                      background: ans === val
                        ? val ? `${PLUM}0.35)` : 'rgba(255,255,255,0.10)'
                        : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${ans === val
                        ? val ? `${PLUM}0.60)` : 'rgba(255,255,255,0.25)'
                        : 'rgba(255,255,255,0.08)'}`,
                      color: ans === val ? '#fff' : 'rgba(255,255,255,0.40)',
                    }}
                  >
                    {val ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {allAnswered && result && (
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-space-6 rounded-xl p-space-5"
            style={{
              background: yesCount >= 4 ? `${PLUM}0.18)` : 'rgba(255,255,255,0.06)',
              border: `1px solid ${yesCount >= 4 ? `${PLUM}0.40)` : 'rgba(255,255,255,0.12)'}`,
            }}
          >
            <div className="flex items-center gap-space-3 mb-space-2">
              <span
                className="font-mono text-2xs uppercase tracking-widest px-space-2 py-space-1 rounded"
                style={{
                  background: yesCount >= 4 ? `${PLUM}0.25)` : 'rgba(255,255,255,0.08)',
                  color: yesCount >= 4 ? '#fff' : 'rgba(255,255,255,0.50)',
                }}
              >
                {yesCount}/5
              </span>
              <p className="font-semibold text-sm" style={{ color: '#fff' }}>{result.label}</p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{result.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!allAnswered && answered > 0 && (
        <p className="mt-space-4 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {5 - answered} question{5 - answered !== 1 ? 's' : ''} remaining
        </p>
      )}
    </div>
  )
}

export default function AIInteractiveSection() {
  const [activeStage, setActiveStage] = useState<StageId | null>(null)
  const [agileDevMode, setAgileDevMode] = useState(false)
  const prefersReduced = useReducedMotion()

  const detail = activeStage ? STAGE_DETAIL[activeStage] : null

  function handleStageClick(id: StageId) {
    if (agileDevMode && id === 'discovery') return
    setActiveStage(activeStage === id ? null : id)
  }

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-space-8 items-start">
      {/* Left: Stage selector + Agile Dev toggle */}
      <div>
        {/* Agile Dev mode toggle */}
        <div className="mb-space-4">
          <button
            type="button"
            onClick={() => {
              setAgileDevMode((v) => !v)
              if (!agileDevMode && activeStage === 'discovery') setActiveStage(null)
            }}
            className="flex items-center gap-space-3 rounded-lg px-space-4 py-space-3 w-full transition-all duration-200"
            style={{
              background: agileDevMode ? `${PLUM}0.20)` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${agileDevMode ? `${PLUM}0.45)` : 'rgba(255,255,255,0.10)'}`,
            }}
          >
            <span
              className="w-8 h-4 rounded-full flex items-center transition-colors duration-200 shrink-0"
              style={{ background: agileDevMode ? `${PLUM}0.70)` : 'rgba(255,255,255,0.15)', padding: '2px' }}
            >
              <span
                className="w-3 h-3 rounded-full bg-white transition-transform duration-200"
                style={{ transform: agileDevMode ? 'translateX(16px)' : 'translateX(0)' }}
              />
            </span>
            <div className="text-left">
              <p className="font-semibold text-xs" style={{ color: agileDevMode ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                Standard Agile mode
              </p>
              <p className="font-mono text-2xs" style={{ color: 'rgba(255,255,255,0.30)' }}>
                {agileDevMode ? 'Discovery Sprint removed, delivery only' : 'Full cycle: discovery + delivery'}
              </p>
            </div>
          </button>

          {agileDevMode && (
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, height: 0 }}
              animate={prefersReduced ? {} : { opacity: 1, height: 'auto' }}
              className="mt-space-2 rounded-lg px-space-4 py-space-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.40)' }}>
                This is what standard Agile development looks like: an efficient delivery engine with no discovery layer.
                The risk: building the wrong thing efficiently.
              </p>
            </motion.div>
          )}
        </div>

        {/* Stage buttons */}
        <div className="flex md:flex-col gap-space-2 overflow-x-auto md:overflow-visible pb-space-2 md:pb-0">
          {STAGES.map((stage) => {
            const isActive = activeStage === stage.id
            const isDisabled = agileDevMode && stage.special
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => handleStageClick(stage.id)}
                disabled={isDisabled}
                className="flex-shrink-0 flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-all duration-200 min-w-[130px] md:min-w-[160px]"
                style={{
                  background: isDisabled
                    ? 'rgba(255,255,255,0.02)'
                    : isActive
                    ? `${PLUM}0.20)`
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isDisabled
                    ? 'rgba(255,255,255,0.04)'
                    : isActive
                    ? `${PLUM}0.45)`
                    : 'rgba(255,255,255,0.08)'}`,
                  opacity: isDisabled ? 0.35 : 1,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                <span
                  className="font-mono text-2xs uppercase tracking-widest mb-space-1"
                  style={{ color: isActive ? `${PLUM}0.80)` : 'rgba(255,255,255,0.30)' }}
                >
                  {stage.n}
                </span>
                <span
                  className="font-semibold text-sm leading-snug"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}
                >
                  {stage.label}
                </span>
                <span
                  className="font-mono text-2xs mt-space-1"
                  style={{ color: isActive ? `${PLUM}0.65)` : 'rgba(255,255,255,0.20)' }}
                >
                  {stage.mode}
                </span>
                {stage.special && !agileDevMode && (
                  <span
                    className="font-mono text-2xs mt-space-1 px-space-1 rounded"
                    style={{ background: `${PLUM}0.15)`, color: `${PLUM}0.65)`, fontSize: '0.55rem', letterSpacing: '0.05em' }}
                  >
                    DISCOVER
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: detail panel or readiness check */}
      <div>
        <AnimatePresence mode="wait">
          {activeStage && detail ? (
            <motion.div
              key={activeStage}
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3
                className="font-semibold mb-space-4"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: '#FAFAFA', lineHeight: 1.2 }}
              >
                {detail.headline}
              </h3>
              <p className="text-sm leading-relaxed mb-space-5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                {detail.description}
              </p>

              {/* Company example */}
              <div
                className="rounded-xl p-space-5 mb-space-5"
                style={{ background: `${PLUM}0.12)`, border: `1px solid ${PLUM}0.22)` }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${PLUM}0.65)` }}>
                  {detail.example.co}
                </p>
                <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {detail.example.text}
                </p>
              </div>

              {/* Prompt */}
              <div
                className="rounded-lg px-space-5 py-space-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Your prompt
                </p>
                <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {detail.prompt}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="check"
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3
                className="font-semibold mb-space-2"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: '#FAFAFA', lineHeight: 1.2 }}
              >
                Agile Innovation readiness check
              </h3>
              <ReadinessCheck />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
