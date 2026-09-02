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
  verdictBorderColor: string
}> = {
  traditional: {
    intro: 'A bank wants to fix its small-business loan application. Customers experience it as slow and arbitrary: they apply, wait weeks with little contact, and often receive a decision that feels unexplained. The customer-facing team has already journey-mapped the experience and knows customers feel abandoned during the wait. Now they need to understand why, in the operations beneath the line of visibility.',
    steps: [
      'The team builds the blueprint with the actual frontline staff in the room: loan officers, underwriters, and the back-office processing team. They lay the customer journey across the top, map the frontstage (the loan officer the customer talks to) draw the line of visibility, and then map the backstage and systems below it.',
      'Below the line, a gap appears that is invisible to every individual team. After a loan officer submits an application, it enters a backstage handoff between two departments that no one owns: the officer assumes underwriting will pick it up; underwriting assumes the officer will flag urgent cases. Applications sit in that gap (sometimes for a week) with no system tracking the delay and no person responsible for moving them.',
      'That unowned handoff is the root cause of the frustrating wait. It lives entirely below the line of visibility, in a blind spot between two teams. No process document acknowledges it. It surfaces only because the blueprint maps the full backstage and because the frontline staff, in the room, admit how the handoff actually works, and how it does not.',
    ],
    finding: 'The customer-facing symptom (a frustrating wait) had an operational root three layers below the surface: an unowned handoff between departments that no individual team could see and no system recorded as a delay. The journey map told them customers felt abandoned; the blueprint told them exactly why.',
    verdict: 'The fix (assigning clear ownership of that handoff and adding a simple tracking step) addressed the real root cause rather than optimizing the surface. Without the blueprint going below the line of visibility, the team would have redesigned the frontstage and left the underlying problem untouched.',
    verdictLabel: 'Result',
    // emerald-800: plain emerald fails 4.5:1 on this light background even at full opacity
    verdictColor: 'rgba(6,95,70,1)',
    verdictBorderColor: 'rgba(6,95,70,0.22)',
  },
  ai: {
    intro: 'The same bank builds the blueprint with AI assistance. AI assembles a draft from the bank\'s process documentation, system logs, and application-tracking data, reconstructing the documented frontstage, backstage steps, and systems and quantifying where applications show logged delays.',
    steps: [
      'The AI draft is genuinely useful for the documented machine: it lays out the official process cleanly, identifies the systems involved, and flags that total processing time is high. It quantifies the delay in aggregate terms and correlates it with application volume. For convincing leadership that the problem is real and measurable, the breadth is valuable.',
      'But the decisive insight comes through only faintly. According to the process documentation, the handoff between the loan officer and underwriting is a defined step, so on the AI\'s blueprint it looks fine. The delay lives in the gap between what the document says and what actually happens. Because no system logs the unowned wait as a discrete failure (the application is "in process"), the AI\'s view does not flag it as the problem. The documented handoff looks healthy; only the undocumented reality is broken.',
      'When the team takes the AI\'s draft to the actual frontline staff, the truth emerges: the same unowned-handoff insight from the traditional run. But the AI draft had initially pointed them slightly away from it by making the documented handoff look clean. A team that stopped at the AI draft might have optimized processing time or added automation to the documented steps, and left the actual root cause in place.',
    ],
    finding: 'AI reconstructed the documented service fast and quantified logged delays: real value. But the root cause lived in the undocumented reality below the line of visibility: an unowned gap that no process doc acknowledges and no system records as a failure. Only frontline staff could reveal it.',
    verdict: 'The strongest approach used the AI draft to establish the documented baseline quickly, then took that draft to frontline staff to correct it with how the work truly runs. AI built the visible structure; humans found the hidden break.',
    verdictLabel: 'Result',
    // orange-800: plain orange fails 4.5:1 on this light background even at full opacity
    verdictColor: 'rgba(154,52,18,1)',
    verdictBorderColor: 'rgba(154,52,18,0.22)',
  },
}

const TEAL = 'rgba(42,111,122,'

export default function SBExampleToggle() {
  const [activeTab, setActiveTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const d = CONTENT[activeTab]

  return (
    <div>
      {/* Tab pills */}
      <div className="flex gap-2 mb-8" role="group" aria-label="Choose example version">
        {TABS.map(({ id, label }) => (
          <button key={id}
            type="button"
            aria-pressed={activeTab === id}
            onClick={() => setActiveTab(id)}
            className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
            style={{
              background: activeTab === id ? 'rgba(42,111,122,0.12)' : 'transparent',
              color:      activeTab === id ? 'var(--color-neutral-900)' : 'var(--color-neutral-500)',
              border:     `1px solid ${activeTab === id ? 'rgba(42,111,122,0.35)' : 'var(--color-neutral-200)'}`,
            }}
          >{label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease }}
        >
          <p className="mb-8" style={{
            fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-neutral-600)', fontStyle: 'italic',
          }}>{d.intro}</p>

          <div className="flex flex-col gap-6 mb-8">
            {d.steps.map((text, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-semibold"
                  style={{
                    background: 'rgba(42,111,122,0.08)',
                    color: `${TEAL}0.95)`,
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

          <div className="rounded-xl p-5 mb-4"
            style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
          >
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
            >Finding</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              {d.finding}
            </p>
          </div>

          <div className="rounded-xl p-5"
            style={{ border: `1px solid ${d.verdictBorderColor}` }}
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
