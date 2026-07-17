'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'P&G is developing a new floor-cleaning product. Standard market research is underway. This is the decision-process that produced the Swiffer — and both versions begin from the same starting point. The contrast is in how far the team pushed the stakeholder cast before defining what the product needed to do.'

export default function SMExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${SAGE}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.35)` : `${SAGE}0.35)`
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${SAGE}1)`
                : 'var(--color-neutral-600)',
            }}
          >
            {t === 'traditional' ? 'Human-led mapping' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Scenario */}
      <div className="rounded-lg px-4 py-3 mb-6" style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mr-2">Shared scenario</span>
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
            {/* Step 1 */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>Step 1: Map the obvious cast</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team began where any product team would. The obvious stakeholders were documented first:
                the <strong>primary user</strong> (the person who cleans the floors), the <strong>retail buyer</strong>
                {' '}(the category manager who decides whether the product reaches the shelf),
                and the <strong>safety regulator</strong> (the body governing chemical and product standards).
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Mapped by power and interest, the retail buyer and regulator required proactive management.
                The primary user — the person whose behaviour the product had to change — was where the team
                needed to focus research. Standard. Expected. And not yet revealing anything that would change the product.
              </p>
            </div>

            {/* Step 2: pushing the cast */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>Step 2: Push past the obvious — who else has a stake?</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The facilitator kept pushing: <em>who else</em> interacts with floor cleaning, even indirectly?
                The cast expanded.
              </p>
              <div className="space-y-3">
                {[
                  {
                    who: 'ELDERLY & LIMITED-MOBILITY USERS',
                    nonObvious: true,
                    find: 'This group was not the target demographic in any brief. But when the team ran research with them, a specific physical pattern emerged: the hardest part of cleaning a floor was not the cleaning itself — it was the wringing. Bending to a bucket, wringing a heavy mop, carrying the water. The mop was the problem.',
                  },
                  {
                    who: 'PROFESSIONAL CLEANERS',
                    nonObvious: true,
                    find: 'Extreme-frequency users nobody had thought to study. Their insight: at high frequency, the time to wring, refill, and replace the mop head dominated the session. Disposable was not a luxury concept — it was a time-saving one.',
                  },
                  {
                    who: 'HOUSEHOLDS WITH YOUNG CHILDREN',
                    nonObvious: false,
                    find: 'More frequent cleaning cycles than any other household type. The barrier was the friction of setup and cleanup — not motivation. A faster, lower-friction method would increase frequency of use.',
                  },
                ].map(item => (
                  <div key={item.who}
                    className="rounded p-4 border"
                    style={{
                      borderColor: item.nonObvious ? `${SAGE}0.22)` : 'var(--color-neutral-100)',
                      background: item.nonObvious ? `${SAGE}0.04)` : 'transparent',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {item.nonObvious && (
                        <span className="text-[8px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded"
                          style={{ color: `${SAGE}0.85)`, background: `${SAGE}0.10)` }}>★ non-obvious</span>
                      )}
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">{item.who}</p>
                    </div>
                    <p className="text-sm text-neutral-700 leading-relaxed">{item.find}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: the reframe */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>Step 3: The stakeholder that changed the brief</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The elderly and limited-mobility users provided the pivotal insight. When the team studied this
                group, the job-to-be-done shifted: it was not &ldquo;clean the floor more effectively.&rdquo; It was
                &ldquo;maintain a clean home without physical strain.&rdquo; The bucket, the wring, the weight, the bending —
                these were the barriers. Not cleaning power.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                A better mop would not have solved this. The insight pushed the brief toward a completely
                different product archetype: lightweight, no-bucket, disposable. The constraints and the
                opportunity were both revealed by a stakeholder group nobody had planned to research.
              </p>
              <div className="rounded p-4" style={{ background: `${SAGE}0.08)`, borderLeft: `2px solid ${SAGE}0.38)` }}>
                <p className="text-xs font-semibold mb-1" style={{ color: `${SAGE}0.85)` }}>
                  From stakeholder to product category
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The Swiffer was not invented by improving the mop. It was invented by discovering that the
                  non-obvious stakeholder group — users nobody had briefed the team to study — redefined what
                  the product needed to do entirely. The stakeholder map changed the design brief. The design
                  brief changed the product. The product opened a new category.
                </p>
              </div>
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
            {/* Hypothetical notice */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The Swiffer research was human-led. This tab imagines the team had opened with an AI-generated
                stakeholder map instead — to show what that surfaces, and what it misses.
              </p>
            </div>

            {/* AI output */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>What AI produced: a fast, organised initial cast</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  obvious only
                </span>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { role: 'PRIMARY CONSUMER',  attrs: 'Power: Low · Interest: High · Attitude: Supporter', note: 'Focus group participant. Cleaning efficacy and product performance identified as core need.', obvious: true },
                  { role: 'RETAIL BUYER',       attrs: 'Power: High · Interest: Medium · Attitude: Neutral', note: 'Category management and shelf placement. Margin and velocity requirements documented.', obvious: true },
                  { role: 'PROCUREMENT',        attrs: 'Power: High · Interest: Low · Attitude: Neutral',   note: 'Cost and supplier terms. Standard procurement considerations apply.', obvious: true },
                  { role: 'SAFETY REGULATOR',  attrs: 'Power: High · Interest: Low · Attitude: Neutral',   note: 'Chemical and product safety compliance. Standard review process.', obvious: true },
                  { role: 'ELDERLY USERS',      attrs: 'Power: Low · Interest: High · Attitude: Supporter', note: 'Secondary consideration — accessibility and ease of use.', obvious: false },
                  { role: 'PROFESSIONAL CLEANERS', attrs: 'Power: Low · Interest: Medium · Attitude: Neutral', note: 'Secondary segment. High-frequency use patterns may differ from consumer baseline.', obvious: false },
                ].map(item => (
                  <div key={item.role} className="rounded p-3"
                    style={{
                      background: item.obvious ? `${INDIGO}0.07)` : 'var(--color-neutral-50)',
                      borderLeft: `2px solid ${item.obvious ? `${INDIGO}0.35)` : 'var(--color-neutral-200)'}`,
                    }}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-widest mb-0.5"
                          style={{ color: item.obvious ? `${INDIGO}0.80)` : 'var(--color-neutral-500)' }}>{item.role}</p>
                        <p className="text-[8px] mb-1" style={{ color: 'var(--color-neutral-400)' }}>{item.attrs}</p>
                        <p className="text-[10px] text-neutral-600 italic">{item.note}</p>
                      </div>
                      {!item.obvious && (
                        <span className="text-[7px] font-mono uppercase px-1.5 py-0.5 rounded shrink-0"
                          style={{ color: 'var(--color-neutral-500)', background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-200)' }}>
                          secondary
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                The AI output was organised and fast. The primary consumer was listed; elderly users and
                professional cleaners appeared as &ldquo;secondary segment&rdquo; line items. The core design brief
                inherited from the AI output: improve cleaning efficacy and ease of use. Nothing in the output
                reframed the job from &ldquo;clean better&rdquo; to &ldquo;clean without strain.&rdquo;
              </p>
            </div>

            {/* What was missing */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.80)` }}>What the AI output missed</p>
              <div className="space-y-3">
                {[
                  {
                    miss: 'The elderly user\'s insight was in the list, but not foregrounded',
                    why: 'Listed as "accessibility consideration" — a modifier to the main use case, not the key reframing signal. Without a human facilitator making the call to study this group in depth, the brief would not have shifted.',
                  },
                  {
                    miss: 'Physical strain was not identified as the primary job-to-be-done',
                    why: 'AI maps attributes from documented sources: focus-group reports, product reviews, market research. These tend to emphasise stated preferences ("cleans well," "easy to use") — not the embodied, physical barriers that emerged from observational research.',
                  },
                  {
                    miss: 'The brief stayed as-is: a better mop',
                    why: 'The AI output would have improved the conventional mop — better cleaning chemistry, lighter handle, improved wring mechanism. The Swiffer-defining leap (no bucket, no wring, disposable) required treating the "secondary" stakeholder as the primary signal.',
                  },
                ].map(item => (
                  <div key={item.miss} className="rounded p-3"
                    style={{ background: 'var(--color-neutral-50)', borderLeft: '2px solid var(--color-neutral-200)' }}>
                    <p className="text-[9px] font-semibold uppercase tracking-widest mb-1 text-neutral-500">{item.miss}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Honest split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${INDIGO}0.80)` }}>Where AI helped</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Speed and completeness on the obvious cast. A well-structured initial list in two minutes,
                  properly attributed with power and interest scores. A good starting point for the session —
                  not the session itself.
                </p>
              </div>
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
                  Where it needed human judgment
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Deciding which &ldquo;secondary&rdquo; stakeholder was actually the primary signal. Making the call
                  to run deep observational research with elderly users. Reframing the design brief from
                  cleaning efficacy to physical strain. These were human acts — and they were the whole game.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
