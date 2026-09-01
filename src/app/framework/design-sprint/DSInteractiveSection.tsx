'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(180,83,9,'

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

const DAYS_5: { id: DayKey; label: string; n: string; mode: string }[] = [
  { id: 'monday',    label: 'Monday',    n: '01', mode: 'Understand' },
  { id: 'tuesday',  label: 'Tuesday',   n: '02', mode: 'Sketch'     },
  { id: 'wednesday',label: 'Wednesday', n: '03', mode: 'Decide'     },
  { id: 'thursday', label: 'Thursday',  n: '04', mode: 'Prototype'  },
  { id: 'friday',   label: 'Friday',    n: '05', mode: 'Test'       },
]

// In DS 2.0 mode, Mon+Tue merge into Day 1
const DAYS_4 = [
  { id: 'monday',    label: 'Day 1', sublabel: 'Mon + Tue', n: '01', mode: 'Understand + Sketch' },
  { id: 'wednesday',label: 'Day 2', sublabel: 'Wed', n: '02', mode: 'Decide'   },
  { id: 'thursday', label: 'Day 3', sublabel: 'Thu', n: '03', mode: 'Prototype'},
  { id: 'friday',   label: 'Day 4', sublabel: 'Fri', n: '04', mode: 'Test'     },
]

const DAY_DETAIL: Record<DayKey | 'merged', {
  headline: string
  description: string
  prompt: string
  example: { co: string; text: string }
}> = {
  monday: {
    headline: 'Monday: map the problem, set the target',
    description:
      'Monday turns unspoken assumptions into shared understanding. The team maps the problem space through expert talks, surfaces the Sprint Questions that make everyone nervous, and ends the day by choosing a single target (one person, one moment) that the sprint will solve for.',
    prompt: '"We are designing for [person] at the moment when [specific situation]." Write your target in this format before moving to Tuesday. If you cannot fill in both blanks precisely, Monday is not done.',
    example: {
      co: 'Flatiron Health: Oncology Platform',
      text: 'Monday\'s expert talks at Flatiron Health revealed a critical misalignment: the internal team believed the biggest barrier was technical complexity. Clinical research coordinators described a completely different problem: they did not understand what the platform would do for them or their patients. Without Monday\'s structured knowledge-sharing, the sprint would have prototyped a solution to the wrong problem.',
    },
  },
  tuesday: {
    headline: 'Tuesday: individual ideation, Lightning Demos',
    description:
      'No brainstorming. No building on each other\'s ideas in real time. Tuesday is individual work because individual ideation consistently outperforms group brainstorming for both quantity and quality. Lightning Demos at the start borrow structural insights from outside the industry, widening the solution space before the Four-Step Sketch narrows it.',
    prompt: 'Name two companies outside your industry that have solved the core structural challenge in your sprint beautifully. What specific element (not the surface, but the underlying principle) could you adapt?',
    example: {
      co: 'Blue Bottle Coffee: E-commerce Sprint',
      text: 'Tuesday\'s Lightning Demos ranged from specialty food sites to luxury goods retailers to subscription software onboarding flows. The most influential insight came from how a high-end watchmaker explained the craft behind each piece. Blue Bottle adapted this narrative-first approach to explain the sourcing story behind each coffee: cross-industry borrowing almost impossible in a group brainstorm.',
    },
  },
  merged: {
    headline: 'Day 1 (Mon + Tue): understand, sketch, decide by end of day',
    description:
      'Design Sprint 2.0 merges Monday\'s problem-mapping with Tuesday\'s individual ideation into a single intensive day. The facilitation efficiency comes from tighter time-boxing and back-to-back sequencing: expert talks and How Might We clustering in the morning, Lightning Demos and the Four-Step Sketch in the afternoon. The output (a clear target and a set of anonymous solution sketches posted for Day 2) is identical to the original two-day sequence.',
    prompt: 'What is the core structural challenge your solution must address? Map it and your target before noon, because you will be sketching solutions in the afternoon.',
    example: {
      co: 'AJ&Smart: 2.0 Compression',
      text: 'AJ&Smart developed the 2.0 format across hundreds of facilitations with large organisations. The key discovery: Monday\'s expert talks and How Might We synthesis, when run with tight time-boxing and pre-read materials distributed the day before, can compress from a full day to a focused morning without losing output quality. The pre-read is what makes the compression possible.',
    },
  },
  wednesday: {
    headline: 'Wednesday: one direction. One storyboard.',
    description:
      'Wednesday is the hardest day. After Tuesday\'s output (often six or seven distinct concepts) the team must choose one direction. Not a hybrid. The Art Museum, Speed Critique, and Supervote make that choice quickly, rigorously, and without the politics that usually derail group decisions. The Storyboard turns the chosen direction into a prototype specification.',
    prompt: 'If you had to choose one direction right now, what would it be? What is the riskiest assumption in that direction? That assumption is what Friday\'s testing must answer.',
    example: {
      co: 'Savioke: Relay Robot',
      text: 'Wednesday\'s decision at Savioke revealed a genuine disagreement: engineering wanted minimal robot personality to set realistic expectations; design wanted expressive, friendly behaviors. The Decider, the CEO, chose the personality-forward direction based on Art Museum results: those sketches had attracted three times as many dots. That decision, made in minutes, shaped Relay\'s character and became central to its differentiation.',
    },
  },
  thursday: {
    headline: 'Thursday: a realistic facade, nothing more',
    description:
      'Build something that looks and feels real enough for users to forget they are interacting with a prototype. Nothing more. Keynote, Figma, or physical materials, whatever produces realistic-looking screens or interactions fastest. No production code, no live data, no edge cases. The team divides components between members and a dedicated stitcher assembles the whole at the end of the day.',
    prompt: 'What are the three to five screens or moments your prototype must include to test the riskiest assumptions from Monday? What can you explicitly leave out?',
    example: {
      co: 'One Medical: Patient Communication',
      text: 'Thursday\'s prototype was built entirely in Keynote in a single day. Realistic-looking screens with actual patient-facing copy, a simulated notification flow, a mock appointment booking interface, none of it functional. But when users interacted with it on Friday, clicking through slides that advanced on tap, their reactions were indistinguishable from a live product. One user said "I\'d download this today" while tapping through a Keynote presentation.',
    },
  },
  friday: {
    headline: 'Friday: five users, six hours, a real decision',
    description:
      'Five real users, recruited to match Monday\'s target, each interact with the prototype for 60 minutes while the rest of the team watches via video feed from a separate room. By 5pm the team knows which of Monday\'s Sprint Questions the prototype answered, and the Decider makes one of three calls: proceed, run another sprint, or abandon.',
    prompt: 'Before testing, write down the three things you most need to learn. Which question did the prototype answer clearly? Which requires another sprint?',
    example: {
      co: 'Airbnb: Host Dashboard',
      text: 'Friday\'s observation room at Airbnb revealed a pattern that five full days of internal work had not surfaced: hosts consistently tried to click a visual element that was not interactive, because it looked more like a button than the actual interactive elements did. This was not a conceptual problem; the underlying idea tested well. It was a visual design problem that a single day of revision resolved. Without Friday, that confusion would have reached hundreds of thousands of hosts.',
    },
  },
}

const READINESS_QUESTIONS = [
  {
    q: 'Is the challenge specific enough to prototype?',
    hint: 'Can you write it as "How might we [specific challenge] so that [specific outcome]?" in one sentence?',
  },
  {
    q: 'Can you get the right people in the room for five consecutive days?',
    hint: 'The Decider, a designer, an engineer, and subject-matter experts must be available all week.',
  },
  {
    q: 'Is there genuine uncertainty about which direction to pursue?',
    hint: 'If the answer is already decided, a sprint is theatre; run a Lightning Decision Jam instead.',
  },
  {
    q: 'Do you have access to five representative users to test with on Friday?',
    hint: 'Real users who match your Monday target, not colleagues, managers, or stakeholders.',
  },
  {
    q: 'Is there a clear Decider with genuine authority over the challenge?',
    hint: 'Someone who can make a call that sticks on Wednesday, without checking with others afterward.',
  },
]

function readinessResult(yesCount: number): { label: string; text: string } {
  if (yesCount === 5) return {
    label: 'Sprint-ready',
    text: 'You have everything required. Book the week and recruit your users now.',
  }
  if (yesCount === 4) return {
    label: 'Nearly ready',
    text: 'Address the one gap before booking the week, especially if it is around the Decider or user access.',
  }
  if (yesCount === 3) return {
    label: 'Conditionally ready',
    text: 'Resolve the gaps, especially around the Decider and user access, before committing to five days.',
  }
  return {
    label: 'Not sprint-ready',
    text: 'Fix the fundamentals first. A sprint without the right people, clear uncertainty, or available users will not produce useful results.',
  }
}

type QuizAnswers = (boolean | null)[]

function ReadinessQuiz() {
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
        Answer five questions to see whether your challenge is sprint-ready. Be honest; a sprint
        that starts with the wrong setup will not produce useful results.
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
                        ? val ? `${CLAY}0.35)` : 'rgba(255,255,255,0.10)'
                        : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${ans === val
                        ? val ? `${CLAY}0.60)` : 'rgba(255,255,255,0.25)'
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
              background: yesCount >= 4 ? `${CLAY}0.18)` : 'rgba(255,255,255,0.06)',
              border: `1px solid ${yesCount >= 4 ? `${CLAY}0.40)` : 'rgba(255,255,255,0.12)'}`,
            }}
          >
            <div className="flex items-center gap-space-3 mb-space-2">
              <span
                className="font-mono text-2xs uppercase tracking-widest px-space-2 py-space-1 rounded"
                style={{
                  background: yesCount >= 4 ? `${CLAY}0.25)` : 'rgba(255,255,255,0.08)',
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

export default function DSInteractiveSection() {
  const [activeDay, setActiveDay] = useState<DayKey | 'merged' | null>(null)
  const [sprint20, setSprint20] = useState(false)
  const prefersReduced = useReducedMotion()

  const currentDays = sprint20 ? DAYS_4 : DAYS_5

  function handleDayClick(id: string) {
    if (sprint20 && id === 'monday') {
      setActiveDay(activeDay === 'merged' ? null : 'merged')
    } else {
      const key = id as DayKey
      setActiveDay(activeDay === key ? null : key)
    }
  }

  function getActiveId(day: typeof DAYS_4[0] | typeof DAYS_5[0]) {
    if (sprint20 && day.id === 'monday') return activeDay === 'merged'
    return activeDay === day.id
  }

  const detail = activeDay ? DAY_DETAIL[activeDay] : null

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-space-8 items-start">
      {/* Left: Day selector + DS 2.0 toggle */}
      <div>
        {/* DS 2.0 toggle */}
        <div className="mb-space-4">
          <button
            type="button"
            onClick={() => {
              setSprint20((v) => !v)
              setActiveDay(null)
            }}
            className="flex items-center gap-space-3 rounded-lg px-space-4 py-space-3 w-full transition-all duration-200"
            style={{
              background: sprint20 ? `${CLAY}0.20)` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${sprint20 ? `${CLAY}0.45)` : 'rgba(255,255,255,0.10)'}`,
            }}
          >
            <span
              className="w-8 h-4 rounded-full flex items-center transition-colors duration-200 shrink-0"
              style={{ background: sprint20 ? `${CLAY}0.70)` : 'rgba(255,255,255,0.15)', padding: '2px' }}
            >
              <span
                className="w-3 h-3 rounded-full bg-white transition-transform duration-200"
                style={{ transform: sprint20 ? 'translateX(16px)' : 'translateX(0)' }}
              />
            </span>
            <div className="text-left">
              <p className="font-semibold text-xs" style={{ color: sprint20 ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                Design Sprint 2.0
              </p>
              <p className="font-mono text-2xs" style={{ color: 'rgba(255,255,255,0.30)' }}>
                {sprint20 ? '4 days: Mon + Tue merged' : '5 days: original format'}
              </p>
            </div>
          </button>
        </div>

        {/* Day buttons */}
        <div className="flex md:flex-col gap-space-2 overflow-x-auto md:overflow-visible pb-space-2 md:pb-0">
          {currentDays.map((day) => {
            const isActive = getActiveId(day)
            return (
              <button
                key={day.id + (sprint20 ? '-20' : '')}
                type="button"
                onClick={() => handleDayClick(day.id)}
                className="flex-shrink-0 flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-all duration-200 min-w-[110px] md:min-w-[150px]"
                style={{
                  background: isActive ? `${CLAY}0.20)` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? `${CLAY}0.45)` : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span
                  className="font-mono text-2xs uppercase tracking-widest mb-space-1"
                  style={{ color: isActive ? `${CLAY}0.80)` : 'rgba(255,255,255,0.30)' }}
                >
                  {day.n}
                </span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}
                >
                  {day.label}
                </span>
                {'sublabel' in day && (
                  <span
                    className="font-mono text-2xs"
                    style={{ color: isActive ? `${CLAY}0.65)` : 'rgba(255,255,255,0.20)' }}
                  >
                    {day.sublabel}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: detail panel or readiness quiz */}
      <div>
        <AnimatePresence mode="wait">
          {activeDay && detail ? (
            <motion.div
              key={activeDay}
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
                style={{ background: `${CLAY}0.12)`, border: `1px solid ${CLAY}0.22)` }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${CLAY}0.65)` }}>
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
              key="quiz"
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3
                className="font-semibold mb-space-2"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: '#FAFAFA', lineHeight: 1.2 }}
              >
                Sprint readiness check
              </h3>
              <ReadinessQuiz />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
