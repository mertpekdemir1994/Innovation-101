'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'Intuit wants to understand how small business owners actually manage their money, to decide what product to build next. The team sends researchers into the field and also has access to screen-recording data from existing software. The question is what each approach reveals, and what it misses.'

export default function COExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${SAGE}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? (t === 'ai' ? `${INDIGO}0.35)` : `${SAGE}0.35)`)
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${SAGE}1)`
                : 'var(--color-neutral-600)',
            }}
          >
            {t === 'traditional' ? 'Contextual Observation' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Scenario */}
      <div className="rounded-lg px-4 py-3 mb-6" style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mr-2">Shared scenario</span>
        <span className="text-sm text-neutral-600">{SCENARIO}</span>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* What happened */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>What the researchers found at QuickBooks</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Intuit sent researchers into the homes and offices of small business owners to watch them work.
                Not to interview them. To observe. What they saw had almost nothing to do with accounting software.
              </p>
              <div className="space-y-3">
                {[
                  {
                    tag: 'THE SHOEBOX',
                    detail: 'Most participants had a physical box (a shoebox, a folder, a drawer) where they put receipts. Their actual filing system was not the software at all. The software was for tax time. The shoebox was for real life.',
                  },
                  {
                    tag: 'THE REAL QUESTION',
                    detail: '"Can I make payroll this week?" One participant had this written on a sticky note stuck to the side of their screen. That question, not "how do I categorise this expense," was the thing they were actually trying to answer every day.',
                  },
                  {
                    tag: 'THE IMPROVISED SYSTEM',
                    detail: 'Spreadsheets open beside the official software. A whiteboard with hand-drawn cash flow by week. A spiral notebook with "money in / money out" written at the top. Participants had built their own instruments because the official tool did not answer the question they were asking.',
                  },
                  {
                    tag: 'THE SAY-vs-DO GAP',
                    detail: 'When asked, participants said they used the accounting software "to keep track of finances." When observed, they used it maybe once a month, for invoicing. Their real financial tracking happened in the improvised systems the researcher could see, and the software could not.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded p-3"
                    style={{
                      background: `${SAGE}0.06)`,
                      borderLeft: `2px solid ${SAGE}0.42)`,
                    }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: `${SAGE}0.72)` }}>{item.tag}</p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The insight */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.28)`, background: `${SAGE}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: `${SAGE}1)` }}>The product insight that followed</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The researchers brought back a finding: the job small business owners were actually trying to do
                was not &ldquo;accounting.&rdquo; It was &ldquo;knowing if the business is okay this week.&rdquo;
                Those are two fundamentally different products.
              </p>
              <p className="text-sm font-semibold" style={{ color: `${SAGE}0.88)` }}>
                That insight, only visible because a researcher sat in the room, shaped the direction of QuickBooks for years.
              </p>
            </div>

            {/* Key learning */}
            <div className="rounded-lg p-5 border" style={{ background: `${SAGE}0.06)`, borderColor: `${SAGE}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${SAGE}1)` }}>Why observation was necessary</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Participants could not have told an interviewer about the shoebox, the sticky note, or the improvised
                cash-flow calendar, not because they were hiding anything, but because these things were so
                normal to them they had stopped noticing them. The environment held the answer. Only observation could see it.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* What AI would see */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>What AI would find (hypothetical)</p>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: `${INDIGO}0.10)`,
                    color: `${INDIGO}0.80)`,
                    border: `1px solid ${INDIGO}0.25)`,
                  }}
                >Screen data only</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Imagine Intuit instead analysed screen recordings and usage logs from existing QuickBooks users.
                The AI would produce a thorough, accurate picture of software behaviour, and a fundamentally misleading picture of the user problem.
              </p>
              <div className="space-y-3">
                {[
                  {
                    tag: 'WHERE USERS HESITATE',
                    detail: 'AI would find the steps where sessions slow down, probably invoice entry, expense categorisation, report generation. It would recommend making those steps faster or simpler. The recommendations would be accurate about the software and irrelevant to the real problem.',
                  },
                  {
                    tag: 'WHERE USERS DROP OFF',
                    detail: 'AI would find that certain features are barely used. It might recommend removing them or surfacing them differently. It would not know that the users who "dropped off" had built their own cash-flow spreadsheet and only came back to QuickBooks for tax time.',
                  },
                  {
                    tag: 'WHAT THE DATA CANNOT SEE',
                    detail: 'No log file records the shoebox. No screen recording shows the sticky note on the side of the monitor. No usage metric reflects the anxiety behind "Can I make payroll?" because the user never typed that question into the software. It lived on a Post-it.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded p-3"
                    style={{
                      background: `${INDIGO}0.05)`,
                      borderLeft: `2px solid ${INDIGO}0.28)`,
                    }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: `${INDIGO}0.62)` }}>{item.tag}</p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What would be missed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${INDIGO}0.80)` }}>As a usability tool: useful</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  AI analysis of usage data would genuinely improve the software: faster flows, clearer navigation,
                  fewer abandoned sessions. Those are real improvements. They would not change what the product is for.
                </p>
              </div>
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
                  As a discovery tool: wrong frame
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The insight that changed QuickBooks was not about the software. It was about a different job:
                  knowing if the business is okay this week. That insight required seeing the shoebox.
                  AI optimises the tool as defined. Observation questions what the tool should be.
                </p>
              </div>
            </div>

            {/* Honest readout */}
            <div className="rounded-lg p-5 border" style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO}0.80)` }}>The honest readout</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI analysis of existing software data is a useful tool for improving a product you already understand.
                Contextual observation is the tool for discovering that you have been solving the wrong problem.
                They answer different questions. In the QuickBooks case, the AI question was &ldquo;how do we improve this tool?&rdquo;
                The observation question was &ldquo;what should this tool actually do?&rdquo; And only one of those questions
                can be answered from a screen recording.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
