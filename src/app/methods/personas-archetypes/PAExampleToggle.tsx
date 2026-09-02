'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'
// darker indigo for text on this light background — plain rgba(99,102,241,)
// can't reach 4.5:1 on white even at full opacity
const INDIGO_DARK = 'rgba(79,70,229,'

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
    <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
      Shared scenario
    </p>
    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      A fintech startup is building a budgeting app and needs to define who it is for. The founding team (three engineers and a designer) all assume their user is a young, tech-savvy professional who wants extensive features and detailed control. They set out to build personas to guide the product. Both versions below tackle the same task; only the method differs.
    </p>
  </div>
)

const CONTENT: Record<Tab, React.ReactNode> = {
  traditional: (
    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      <p className="mb-5">
        The team ran fifteen in-depth interviews with a deliberately varied set of people who struggled with budgeting: different ages, different incomes, different relationships with money. They synthesized the research into four personas covering the real range they found.
      </p>
      <p className="mb-5">
        The interviews broke the founding assumption. Yes, one persona matched their imagined user: the Optimizer, a confident power user who wanted control and features. But the most common and most underserved type was almost the opposite. The team came to call her the Avoider: someone whose relationship with money was anxious and shame-tinged, who did not want more data and control but <em>less</em>, who wanted to feel reassured rather than empowered. For the Avoider, the team&rsquo;s planned feature-rich, dashboard-heavy product was actively repellent; it made the anxiety worse.
      </p>
      <p className="mb-5">
        That persona appeared in six of the fifteen interviews. The team would never have designed for her, or even imagined her, without talking to real people. And designing for her (calm, reassuring, minimal, judgment-free) rather than only for the confident Optimizer changed the entire direction of the product.
      </p>
      <div className="rounded-lg p-5 mt-6" style={{ background: `${NAVY}0.04)`, borderLeft: `3px solid ${NAVY}0.28)` }}>
        <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.90)` }}>
          The insight
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--color-neutral-800)' }}>
          The persona set did its job: it forced the team to design for a real user who was nothing like them, and who they would otherwise never have built for. The Avoider was the user who changed everything. She appeared in the research, not in the assumptions.
        </p>
      </div>
    </div>
  ),
  ai: (
    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      <p className="mb-5">
        The same team used AI to generate personas for a budgeting app. In seconds, the AI produced four polished, plausible personas: names, goals, frustrations, and all. One of them was a detailed &ldquo;Young Professional Alex&rdquo;: tech-savvy, wanted extensive features, valued control, managed money actively. Almost exactly the user the founding team had already imagined.
      </p>
      <p className="mb-5">
        The AI personas were fluent, specific, and convincing. They had the professional polish of researched work. And that was the trap: the AI, generating from the average of everything it had seen about budgeting-app users, returned the team&rsquo;s own assumption back to them in a more confident form. The Avoider, the non-obvious, underserved real user who reframed the whole product in the traditional run, did not appear. She does not live in the average of public data; she lives in the specific texture of real interviews. The AI gave the team plausible personas that validated their existing plan and buried the very user who would have changed it.
      </p>
      <p className="mb-5">
        When the team later fed their actual interview transcripts into AI to help cluster the data, it was genuinely useful: AI found the patterns faster, grouped similar experiences, and accelerated the synthesis. But AI generating personas from nothing produced confident fiction that confirmed the team&rsquo;s bias and hid the surprising truth.
      </p>
      <div className="rounded-lg p-5 mt-6" style={{ background: 'rgba(99,102,241,0.04)', borderLeft: '3px solid rgba(99,102,241,0.38)' }}>
        <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO_DARK}0.90)` }}>
          The honest readout
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--color-neutral-800)' }}>
          AI-generated personas regress to the assumed and generic, hiding the non-obvious real user who would have changed the product. AI synthesizing real research is valuable. AI replacing the research is the precise failure mode this method exists to prevent, done faster and more convincingly.
        </p>
      </div>
    </div>
  ),
}

export default function PAExampleToggle() {
  const [activeTab, setActiveTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()

  return (
    <div>
      {SCENARIO_HEADER}

      {/* Tab bar */}
      <div className="flex gap-2 mb-8" role="group" aria-label="Persona-building approach">
        {TABS.map(({ id, label }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveTab(id)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
              style={{
                background: active ? 'var(--stage-synthesis)' : 'var(--color-neutral-100)',
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
