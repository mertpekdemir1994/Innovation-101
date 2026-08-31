'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional' },
  { id: 'ai',          label: 'With AI' },
]

const SCENARIO_HEADER = (
  <div
    className="rounded-xl p-5 mb-8"
    style={{ background: 'var(--color-warm-100)', border: '1px solid var(--color-neutral-200)' }}
  >
    <p
      className="font-mono uppercase tracking-widest mb-2"
      style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
    >
      Shared scenario
    </p>
    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      A team building a meditation and wellbeing app is trying to understand why so many new users download the app, try it once or twice, and abandon it within a week. The surface assumption inside the company is that sessions are too long. Both versions below tackle this same question. Only the method of running the interviews differs.
    </p>
  </div>
)

const CONTENT: Record<Tab, React.ReactNode> = {
  traditional: (
    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      <p className="mb-5">
        The team recruited fifteen people who had downloaded a meditation app and quit within a week, deliberately interviewing the people who left rather than the loyal users. A facilitator ran each 45-minute conversation while a note-taker captured verbatim quotes and watched for tone.
      </p>
      <p className="mb-5">
        The facilitator resisted asking &ldquo;were the sessions too long?&rdquo;, which would have led the witness toward the company&rsquo;s assumption. Instead she asked people to walk her through the last time they opened the app and what was happening around them. One participant, describing the moment she deleted it, went quiet, then said: &ldquo;I felt like I was failing at relaxing.&rdquo;
      </p>
      <p className="mb-5">
        The facilitator said nothing, letting the silence sit, and the participant continued, explaining that she could never tell whether she was meditating &ldquo;correctly,&rdquo; and that uncertainty produced anxiety, the exact opposite of what she had come for.
      </p>
      <p className="mb-5">
        The note-taker flagged that this same emotional note, a feeling of doing it wrong, appeared in different words across many of the interviews, often in a lowered voice or after a pause. It was never stated as &ldquo;the sessions are too long.&rdquo; It was always something closer to shame.
      </p>
      <div
        className="rounded-lg p-5 mt-6"
        style={{ background: `${SAGE}0.06)`, borderLeft: `3px solid ${SAGE}0.40)` }}
      >
        <p
          className="font-mono uppercase tracking-widest mb-2"
          style={{ fontSize: 'var(--text-2xs)', color: `${SAGE}0.65)` }}
        >
          The insight
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--color-neutral-800)' }}>
          People were not quitting because sessions were long. They were quitting because the experience made them feel like they were failing. That redirected the redesign away from shorter sessions and toward reassurance: removing any sense of a right or wrong way to do it. The breakthrough came from a human catching a quiet, almost-unspoken feeling and choosing to follow it.
        </p>
      </div>
    </div>
  ),
  ai: (
    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      <p className="mb-5">
        The same team ran the same question using AI-assisted interviewing. An AI moderator (an Outset.io-style tool) conducted structured conversations with 200 lapsed users in parallel over two days, far beyond what the human team could have scheduled. AI transcription captured every word, and AI analysis surfaced candidate themes across all 200 transcripts within minutes.
      </p>
      <p className="mb-5">
        The scale paid off in ways the traditional study could not match. The theme of &ldquo;uncertainty about doing it right&rdquo; appeared at measurable frequency across a large sample, turning what was a vivid human anecdote in the traditional study into a quantified, hard-to-dismiss pattern. For convincing a skeptical leadership team, that breadth mattered: not one memorable quote, but a clear signal across hundreds of people.
      </p>
      <p className="mb-5">
        But the tradeoff showed too. The AI moderator, following its guide competently, did not pause on the participant who went quiet before admitting she felt like a failure, because it had no instinct that the silence mattered. The phrase &ldquo;I felt like I was failing at relaxing,&rdquo; the single line that crystallized the whole insight in the traditional study, did not emerge with the same emotional force. The AI captured the theme but not the texture.
      </p>
      <div
        className="rounded-lg p-5 mt-6"
        style={{ background: 'rgba(99,102,241,0.04)', borderLeft: '3px solid rgba(99,102,241,0.38)' }}
      >
        <p
          className="font-mono uppercase tracking-widest mb-2"
          style={{ fontSize: 'var(--text-2xs)', color: 'rgba(99,102,241,0.70)' }}
        >
          The honest readout
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--color-neutral-800)' }}>
          The AI run produced breadth, speed, and quantified confidence the human run could not. The human run produced one piece of un-rationalized human truth the AI run blurred. The strongest version of this study uses both: AI for scale and pattern, a handful of human-run interviews to catch the texture and the surprise. That is exactly how the best teams now combine them.
        </p>
      </div>
    </div>
  ),
}

export default function IDIExampleToggle() {
  const [activeTab, setActiveTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()

  return (
    <div>
      {SCENARIO_HEADER}

      {/* Tab bar */}
      <div
        className="flex gap-2 mb-8"
        role="tablist"
        aria-label="Interview approach"
      >
        {TABS.map(({ id, label }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(id)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
              style={{
                background: active ? 'var(--stage-discovery)' : 'var(--color-neutral-100)',
                color:      active ? '#fff' : 'var(--color-neutral-600)',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          role="tabpanel"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {CONTENT[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
