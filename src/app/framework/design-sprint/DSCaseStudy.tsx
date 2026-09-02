'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(180,83,9,'

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

const DAY_DEFS: { key: DayKey; label: string; sub: string; mode: string }[] = [
  { key: 'monday',    label: 'Monday',    sub: 'Day 01', mode: 'Understand' },
  { key: 'tuesday',  label: 'Tuesday',   sub: 'Day 02', mode: 'Sketch'     },
  { key: 'wednesday',label: 'Wednesday', sub: 'Day 03', mode: 'Decide'     },
  { key: 'thursday', label: 'Thursday',  sub: 'Day 04', mode: 'Prototype'  },
  { key: 'friday',   label: 'Friday',    sub: 'Day 05', mode: 'Test'       },
]

type ArtifactType = 'quote' | 'finding' | 'decision'
type Artifact = { type: ArtifactType; label: string; lines: string[] }

type DayData = {
  intro: string
  work: string
  artifact: Artifact
  insight: string
}

const DAYS: Record<DayKey, DayData> = {
  monday: {
    intro:
      'The team spent the morning on expert talks, including a video call with two real academic advisors, and mapped the advisor\'s journey from logging into Cohort to walking into a student meeting.',
    work: 'Journey mapping, expert interviews, How Might We notes, and target selection. The team assumed advisors avoided the tool because it was too complex. The expert talks complicated that assumption within the first hour.',
    artifact: {
      type: 'quote',
      label: 'Critical misalignment: advisor expert, Monday morning',
      lines: [
        'The internal team had assumed advisors did not use the tool because it was too complex to navigate. One of the advisor experts described something completely different.',
        '"I don\'t open it before a meeting because by the time I\'ve made sense of the risk score, the student is already sitting in front of me. I don\'t know why it flagged them, so I can\'t use it in the conversation. So I just skim their file the old way."',
        'The barrier was not complexity. It was that the risk score was a number with no explanation, and advisors would not act on a number they could not understand or defend to a student.',
      ],
    },
    insight:
      'Monday\'s target: an academic advisor, in the ten minutes before a student meeting. Sprint Questions: Will advisors trust a risk indicator if they can see the reasons behind it? Will they open the tool before a meeting if it saves prep time? Will it feel like a help or a judgment?',
  },
  tuesday: {
    intro:
      'The team split: half ran Lightning Demos, half began individual Four-Step Sketches. The Demos ranged well outside education; the most influential came from a domain none of them had thought to look at.',
    work: 'Lightning Demos from outside education (a doctor\'s pre-appointment patient summary, a CRM\'s "next best action" panel, a consumer credit score\'s reason codes), then individual Four-Step Sketches by every team member working independently.',
    artifact: {
      type: 'finding',
      label: 'Tuesday output: six solution sketches, posted anonymously',
      lines: [
        'Credit-score inspiration: the consumer credit report, which always pairs a score with a short list of the top reasons behind it, was the pivotal Lightning Demo',
        'The advisor-turned-employee wildcard sketched a "student prep card", like a credit report, pairing the risk flag with the two or three specific reasons (missed classes, failed quiz, stopped logging in)',
        'The prep card included one suggested opening question for the meeting, translating the data into a conversational first move',
        'Five other concepts ranged from a simplified dashboard to a full model explainer, all posted anonymously for Wednesday',
      ],
    },
    insight:
      'The credit-score analogy gave the sprint its direction. The structural principle, a score paired with its reasons, in plain language, translated directly to the advisor\'s problem. Six anonymous sketches posted. The team did not know yet which had come from whom.',
  },
  wednesday: {
    intro:
      'The Art Museum, Speed Critique, and Supervote ran in the morning. One concept dominated the dot heat map and the Decider\'s call. The afternoon produced a 12-panel storyboard.',
    work: 'The Art Museum (silent dot-voting), Speed Critique on each sketch, the Decider\'s Supervote, and a storyboard. One disagreement emerged and the Decider resolved it explicitly.',
    artifact: {
      type: 'decision',
      label: 'The Decider\'s call: Wednesday afternoon',
      lines: [
        'The prep card concept drew by far the most dots in the Art Museum. The key disagreement: engineering wanted to expose the full risk model in the card; the advisor wildcard argued it would overwhelm.',
        'The Decider\'s Supervote went to the simple prep card: risk flag, top three plain-language reasons, one suggested opening question, and nothing more. The full model would be one click away but not on the card.',
        'The storyboard: 12 panels showing an advisor opening Cohort, seeing the prep card for the next student, reading the reasons, noting the suggested question, and walking into the meeting ready.',
      ],
    },
    insight:
      'The Decider\'s call to keep the full model off the card was explicit and on record. If Friday\'s testing challenged it, the team would know whether to revisit. If testing confirmed it, the Decider\'s preference over engineering\'s would be validated by user evidence.',
  },
  thursday: {
    intro:
      'No production code. A realistic Figma prototype (fake data, fake model, real-looking screens) built by the team in one day and stitched together before the trial run.',
    work: 'A clickable Figma prototype of the advisor\'s screen for three fictional students, each showing the prep card (risk flag, three plain-language reasons, a suggested opening question) with a "see why" link that opened a simple explanation. Divided among team members, stitched together by 3pm.',
    artifact: {
      type: 'finding',
      label: 'Prototype specification: Thursday build',
      lines: [
        'Tool: Figma, no production code, no live data, no working model',
        'Three fictional student profiles, each with a prep card showing risk flag, three plain-language reasons, suggested opening question',
        '"See why" link per card: opens a simple one-paragraph explanation of the underlying pattern',
        'Trial run at 4pm caught one error: one student\'s reasons did not match the suggested opening question, fixed before Friday',
        'Five academic advisors from comparable universities confirmed for Friday interviews',
      ],
    },
    insight:
      'The trial run earned its place. One of the three student cards had an inconsistency that the designer had missed during the build. The trial run caught it. The same inconsistency would have confused at least two of five Friday users, and might have contaminated the test results for that question.',
  },
  friday: {
    intro:
      'Five 60-minute interviews with academic advisors from comparable universities. The sprint team observed from a separate room and mapped reactions to Monday\'s Sprint Questions in real time.',
    work: 'Five structured interviews: warm-up, prototype introduction, task-based interaction (advisors navigating the prep card for a fictional student meeting), debrief. Observation room with sticky-note grids per Sprint Question. Pattern synthesis after the fifth interview.',
    artifact: {
      type: 'finding',
      label: 'Patterns across five users: Friday synthesis',
      lines: [
        'All five immediately understood and trusted the prep card in a way they had never trusted the bare risk score',
        '"Now I can walk in and say \'I noticed you\'ve missed a few classes, is everything okay?\' instead of staring at a number I can\'t explain." (Advisor 3)',
        'Four of five used the suggested opening question and called it the single most useful element: the hardest part of their job is starting a difficult conversation',
        'The "see why" link was barely clicked: the plain-language reasons were sufficient, confirming the Decider\'s Wednesday call to keep the full model off the card',
        'One friction point: two advisors wanted to add their own note to the card before the meeting, which the prototype did not allow',
      ],
    },
    insight:
      'The Decider\'s call: proceed to development. The prep card, not a simpler or more complex version, became the core of the redesign. The editable-note request from two users was added to the build as the first feature after launch. A two-month internal argument settled in five days, by evidence.',
  },
}

const LESSONS = [
  {
    n: '01',
    title: 'The sprint settled a two-month argument in five days, with evidence.',
    detail:
      'Sales, engineering, and customer success each had a plausible theory for low adoption, and no theory had won because none had evidence. The sprint did not run more meetings; it put a realistic prototype in front of five real advisors and let their behavior decide. The real barrier (an unexplained risk score) was none of the three internal theories exactly.',
  },
  {
    n: '02',
    title: 'The riskiest assumption was tested directly, with a facade.',
    detail:
      'The whole concept rested on one assumption: that advisors would trust and use a risk indicator if it came with plain-language reasons. A clickable Figma prototype with fake data tested that assumption in a day, for almost nothing, before a single line of real code was written. All five advisors confirmed it immediately.',
  },
  {
    n: '03',
    title: 'The Wednesday decision to keep it simple was validated on Friday.',
    detail:
      'The Decider\'s Supervote deliberately kept the detailed model off the prep card, against engineering\'s preference. Friday\'s testing confirmed the call: advisors barely clicked the "see why" link and found the plain-language reasons sufficient. The sprint\'s structured decision process, and the willingness to test it, prevented a more complex build that users did not want.',
  },
]

function ArtifactBlock({ artifact }: { artifact: Artifact }) {
  if (artifact.type === 'quote') {
    return (
      <div
        className="rounded-xl p-space-6"
        style={{ background: `${CLAY}0.04)`, border: `1px solid ${CLAY}0.10)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-4" style={{ color: `${CLAY}1)` }}>
          {artifact.label}
        </p>
        <div className="space-y-space-3">
          {artifact.lines.map((line, i) =>
            i === artifact.lines.length - 1 ? (
              <p
                key={i}
                className="text-base text-neutral-800 leading-relaxed italic pl-space-4"
                style={{ borderLeft: `3px solid ${CLAY}0.40)` }}
              >
                {line}
              </p>
            ) : (
              <p key={i} className="text-sm text-neutral-600 leading-relaxed">{line}</p>
            )
          )}
        </div>
      </div>
    )
  }

  if (artifact.type === 'decision') {
    return (
      <blockquote
        className="rounded-xl p-space-6"
        style={{ background: `${CLAY}0.04)`, borderLeft: `4px solid ${CLAY}0.50)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${CLAY}1)` }}>
          {artifact.label}
        </p>
        {artifact.lines.map((line, i) => (
          <p key={i} className={`text-base text-neutral-800 leading-relaxed${i > 0 ? ' mt-space-3' : ''}`}>
            {line}
          </p>
        ))}
      </blockquote>
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
          <p key={i} className="text-sm text-neutral-700 leading-relaxed">{line}</p>
        ))}
      </div>
    </div>
  )
}

function DayContent({ dayKey }: { dayKey: DayKey }) {
  const day = DAYS[dayKey]

  return (
    <div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-space-5">{day.intro}</p>

      <div className="mb-space-5">
        <p className="text-2xs font-semibold uppercase tracking-widest text-neutral-500 mb-space-2">The work</p>
        <p className="text-sm text-neutral-700 leading-relaxed">{day.work}</p>
      </div>

      <div className="mb-space-5">
        <p className="text-2xs font-semibold uppercase tracking-widest text-neutral-500 mb-space-2">Sample output</p>
        <ArtifactBlock artifact={day.artifact} />
      </div>

      <div
        className="rounded-lg px-space-5 py-space-4"
        style={{ background: `${CLAY}0.05)`, borderLeft: `3px solid ${CLAY}0.40)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: `${CLAY}1)` }}>
          What it meant
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed italic">{day.insight}</p>
      </div>
    </div>
  )
}

export default function DSCaseStudy() {
  const [activeDay, setActiveDay] = useState<DayKey>('monday')
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
          Cohort is an invented company and this sprint is illustrative. It is written to show,
          concretely, what the work and outputs of each day of a Design Sprint look like
          in practice. The methods, artifacts, and decision logic are realistic; the company and
          its results are fictional.
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
            ['Company', 'Cohort (fictional)'],
            ['Sector', 'Education technology, Series B'],
            ['Duration', '5 days, one sprint week'],
            ['Team', '7 people, cross-functional'],
            ['Framework', 'Original GV Sprint'],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-1">{label}</p>
              <p className="text-sm font-semibold text-neutral-900">{val}</p>
            </div>
          ))}
        </div>
        <div className="px-space-6 md:px-space-8 py-space-7">
          <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${CLAY}1)` }}>
            The problem
          </p>
          <p
            className="font-display font-semibold text-balance"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)', lineHeight: 1.2, color: 'var(--color-neutral-900)', letterSpacing: '-0.01em' }}
          >
            Academic advisors have a 20% adoption rate on Cohort. Universities are not renewing
            because the tool they paid for is not being used.
          </p>
          <p className="text-sm text-neutral-500 mt-space-3">
            Sprint target: an academic advisor, in the ten minutes before a student meeting.
          </p>
        </div>
      </div>

      {/* Day navigator */}
      <div className="flex flex-wrap gap-space-2 mb-space-6">
        {DAY_DEFS.map(({ key, label, sub, mode }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveDay(key)}
            className="flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-colors duration-200 flex-1 min-w-[90px]"
            style={{
              background: activeDay === key ? `${CLAY}0.08)` : '#FFFFFF',
              border: `1px solid ${activeDay === key ? `${CLAY}0.25)` : 'var(--color-neutral-200)'}`,
            }}
          >
            <span
              className="font-mono text-2xs uppercase tracking-widest mb-space-1"
              style={{ color: activeDay === key ? `${CLAY}1)` : 'var(--color-neutral-500)' }}
            >
              {mode}
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: activeDay === key ? `${CLAY}1)` : 'var(--color-neutral-700)' }}
            >
              {label}
            </span>
            <span
              className="text-xs"
              style={{ color: activeDay === key ? `${CLAY}1)` : 'var(--color-neutral-500)' }}
            >
              {sub}
            </span>
          </button>
        ))}
      </div>

      {/* Day content panel */}
      <div
        className="rounded-2xl p-space-6 md:p-space-8 mb-space-10"
        style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <DayContent dayKey={activeDay} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Key lessons */}
      <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-4">Key lessons</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
        {LESSONS.map(({ n, title, detail }) => (
          <div
            key={n}
            className="rounded-xl p-space-6"
            style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
          >
            <span
              className="font-mono text-3xl font-semibold block mb-space-4"
              style={{ color: `${CLAY}0.12)`, lineHeight: 1 }}
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
