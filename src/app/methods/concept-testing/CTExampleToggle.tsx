'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A consumer goods company has a promising concept for a premium subscription product. Executives are confident and under pressure to launch fast.'

export default function CTExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tab toggle */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${PLUM}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t ? (t === 'ai' ? `${INDIGO}0.35)` : `${PLUM}0.35)`) : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${PLUM}1)`
                : 'var(--color-neutral-600)',
            }}
          >{t === 'traditional' ? 'Traditional Research' : 'With AI (hypothetical)'}</button>
        ))}
      </div>

      {/* Scenario label */}
      <div className="rounded-lg px-4 py-3 mb-5"
        style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mr-2">Scenario</span>
        <span className="text-sm text-neutral-600">{SCENARIO}</span>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* The test design */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${PLUM}1)` }}>What the team did</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: 'PRE-SET THRESHOLD', text: 'Defined before testing: 40% of real target customers had to actually sign up and provide payment details for the concept to proceed.' },
                  { label: 'THE COMMITMENT ASK', text: 'Instead of asking &ldquo;would you be interested?&rdquo;, they asked real target customers to sign up and provide payment details for a pilot, something real on the line.' },
                  { label: 'RECRUITING', text: 'Real target customers, not colleagues or friends. Screened against the actual target profile to ensure the reactions came from the right people.' },
                ].map((col, i) => (
                  <div key={i} className="rounded p-3" style={{ background: `${PLUM}0.04)` }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-2 text-neutral-500">{col.label}</p>
                    <p className="text-xs text-neutral-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: col.text }} />
                  </div>
                ))}
              </div>
            </div>

            {/* The result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.20)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${PLUM}1)` }}>What the test found</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-neutral-700">Stated interest</span>
                      <span className="text-sm font-semibold" style={{ color: `${PLUM}1)` }}>76%</span>
                    </div>
                    <p className="text-xs text-neutral-500">A large majority said the concept sounded appealing, warm, encouraging, and meaningless.</p>
                  </div>
                  <div className="border-t border-neutral-100 pt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-neutral-700">Revealed commitment</span>
                      <span className="text-sm font-semibold text-amber-600">28%</span>
                    </div>
                    <p className="text-xs text-neutral-500">Far fewer actually signed up and provided payment. The gap between saying yes and doing it was stark.</p>
                  </div>
                  <div className="border-t border-neutral-100 pt-3 rounded p-2 bg-amber-50">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-amber-700 mb-1">Threshold: 40% · Verdict: × FAILS</p>
                    <p className="text-xs text-neutral-600">28% did not clear the pre-set 40% threshold, and because the bar was set before the test, there was no way to spin the warm verbal interest into a green light.</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-5 border-green-200 bg-green-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-green-700 mb-3">What changed</p>
                <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                  Probing the gap revealed the concept solved a problem people recognised but did not feel acutely enough to pay a premium for. The team repositioned to a narrower segment that felt the pain far more intensely.
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                  They re-tested against the same 40% threshold. The narrower segment returned a 52% commitment rate, above the bar. They launched to that segment.
                </p>
                <p className="text-xs font-semibold text-green-700">
                  The gaps prevented a costly launch into weak demand and pointed to the segment where real demand existed.
                </p>
              </div>
            </div>

            {/* Key learning */}
            <div className="rounded-lg p-5 border"
              style={{ background: `${PLUM}0.06)`, borderColor: `${PLUM}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${PLUM}1)` }}>Why the threshold mattered</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The 76% stated interest, seen without the pre-set threshold, would have looked like strong validation. It was not. The threshold turned the result from a vibe to be interpreted into a verdict that required action. Without it, the warm verbal agreement could have been read as a green light for an expensive launch into weak demand.
              </p>
            </div>
          </motion.div>

        ) : (
          <motion.div key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* Hypothetical framing banner */}
            <div className="rounded-lg px-4 py-3 border" style={{ background: `${INDIGO}0.06)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                style={{ color: `${INDIGO}0.80)` }}>Hypothetical framing</p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                The real case was run traditionally. This tab asks: imagine the team had instead asked an AI to test the concept by simulating the target customers and predicting how they would respond. What would have happened?
              </p>
            </div>

            {/* What AI produced */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>What AI produced</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Simulated customers
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded p-3" style={{ background: `${INDIGO}0.05)` }}>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: `${INDIGO}0.70)` }}>AI customer reactions</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Playing the target customer, AI reported the concept sounded appealing, valuable, and worth trying. A synthetic panel of simulated customers returned a strong positive interest rate. Every simulated customer said yes.
                  </p>
                </div>
                <div className="rounded p-3" style={{ background: `${INDIGO}0.05)` }}>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: `${INDIGO}0.70)` }}>What AI could not do</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Asked to commit, simulated customers had no payment to part with, no premium to weigh against a real budget, no competing priorities. They could not reveal the gap between &ldquo;sounds appealing&rdquo; and &ldquo;I will actually pay for this.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* The consequence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-3">What would have happened</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The AI confidently reproduced the executives&rsquo; optimism rather than testing it. Had the team trusted it, they would have launched into the same weak demand the real test caught, with the AI&rsquo;s confidence making the mistake feel validated.
                </p>
              </div>
              <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${INDIGO}0.80)` }}>Why it fails structurally</p>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  A simulation has nothing at stake and so can only ever produce stated preference: a costless yes. That is exactly the warm agreement the method exists to see past. AI did not make a mistake; it was asked to do something it structurally cannot do.
                </p>
              </div>
            </div>

            {/* Honest readout */}
            <div className="rounded-lg p-5 border" style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO}0.80)` }}>The honest readout</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI could have helped design this test (writing the concept description, flagging leading questions, suggesting the commitment mechanism) and could have synthesized the real results afterward. But it could not be the test, because the test measures revealed preference and a simulated customer can only ever say a costless yes. The strongest version used real target users and a pre-set threshold. AI, at most, helped structure and analyze it.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
