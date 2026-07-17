'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional' },
  { id: 'ai',          label: 'With AI' },
]

const CONTENT: Record<Tab, {
  intro: string
  steps: string[]
  finding: string
  verdict: string
  verdictLabel: string
  verdictColor: string
}> = {
  traditional: {
    intro: 'A hospital is redesigning its cancer care pathway, from a patient\'s first symptom through diagnosis, treatment, and follow-up. Each clinical department believes its own touchpoint works well. The team uses journey mapping to understand the whole experience.',
    steps: [
      'The team builds the map from in-depth patient interviews and by following several real patients end to end through the entire system. They map the full arc: first symptom, GP referral, specialist appointment, test results, treatment, ongoing monitoring, and follow-up. Stages laid out in sequence.',
      'The emotion line is drawn from what patients actually described feeling at each stage. Within any single department, the experience looked acceptable — each had optimized their own moment. But across the arc, the curve told a different story.',
      'The lowest point was not any clinical moment. Not the frightening diagnosis. Not the treatment. It was the silence between departments. A patient would receive a result from one team and then wait — days with no contact, no information, no support — before the next team reached out. The deepest dip on the entire map was the gap, when patients felt abandoned and alone with their fear.',
    ],
    finding: 'The insight was invisible to every individual department, because no department owned the gap. It surfaced only because the map spanned the whole journey and because a human had followed real patients into that silence and heard what it felt like.',
    verdict: 'The redesign targeted the gaps directly: proactive communication, a single point of contact, and support during the waits. The clinical care had never been the problem. The spaces between it were.',
    verdictLabel: 'Result',
    verdictColor: 'rgba(5,150,105,0.75)',
  },
  ai: {
    intro: 'The same hospital builds the map with AI assistance. AI synthesizes a draft journey map from a large corpus of existing data — patient satisfaction surveys, complaint records, support communications, and appointment logs — across thousands of patients, in a fraction of the time.',
    steps: [
      'AI sentiment analysis draws an emotion line from the data at population scale. The breadth is powerful: the map confirms patterns across thousands of patients, not just a handful. Departments that previously dismissed small-sample research now see quantified evidence that is harder to ignore.',
      'The quantified story: satisfaction dips around certain transitions. AI can specify the dip in percentage terms and correlate it with appointment wait times, follow-up lags, and complaint volume. For convincing leadership that the problem is real and widespread, the scale is genuinely valuable.',
      'But the deepest insight comes through softly. AI drew the emotion line from what patients expressed — in surveys and complaints — and the lowest expressed sentiment clustered around diagnosis and treatment moments: the things patients actually wrote about. The silent gap between departments, the true low point, barely registered. Patients did not file surveys about the days when nothing happened.',
    ],
    finding: 'The abandonment felt in the silence — the most important insight, the one that reframed the entire redesign — was precisely the emotion that left no data trail. A team relying on the AI map alone would likely have optimized the moments patients complained about and missed the gap that hurt them most.',
    verdict: 'AI assembled a broad, quantified map fast and proved the problem\'s scale — real value. But the un-expressed emotional truth that reframed the whole redesign came from a human in the silence, not from the data.',
    verdictLabel: 'Result',
    verdictColor: 'rgba(251,146,60,0.75)',
  },
}

export default function JMExampleToggle() {
  const [activeTab, setActiveTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const d = CONTENT[activeTab]

  return (
    <div>
      {/* Tab pills */}
      <div className="flex gap-2 mb-8" role="tablist" aria-label="Choose example version">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => setActiveTab(id)}
            className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
            style={{
              background: activeTab === id ? 'rgba(42,111,122,0.12)' : 'transparent',
              color:      activeTab === id ? 'var(--color-neutral-900)' : 'var(--color-neutral-400)',
              border:     `1px solid ${activeTab === id ? 'rgba(42,111,122,0.35)' : 'var(--color-neutral-200)'}`,
            }}
          >{label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          role="tabpanel"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease }}
        >
          {/* Scenario intro */}
          <p className="mb-8" style={{
            fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-neutral-600)', fontStyle: 'italic',
          }}>{d.intro}</p>

          {/* Steps */}
          <div className="flex flex-col gap-6 mb-8">
            {d.steps.map((text, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-semibold"
                  style={{
                    background: 'rgba(42,111,122,0.08)',
                    color: 'rgba(42,111,122,0.70)',
                    border: '1px solid rgba(42,111,122,0.22)',
                    marginTop: 2,
                  }}
                >{i + 1}</div>
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-700)' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Finding */}
          <div className="rounded-xl p-5 mb-4"
            style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
          >
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
            >Finding</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              {d.finding}
            </p>
          </div>

          {/* Verdict */}
          <div className="rounded-xl p-5"
            style={{
              background: 'var(--color-neutral-50)',
              border: `1px solid ${d.verdictColor.replace('0.75', '0.22')}`,
            }}
          >
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: d.verdictColor }}
            >{d.verdictLabel}</p>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-neutral-600)' }}>
              {d.verdict}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
