'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A company is building a logistics platform that matches drivers to deliveries in real time. The technical crux is a routing algorithm at scale — the team has never run this at the volume the business requires. The commercial question is whether operations teams in partner companies will actually adopt a new workflow. Both are genuine bets. The team must decide which goes first.'

export default function DRExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.85)` : `${BRICK}0.85)`
                : 'transparent',
              color: tab === t ? '#fff'
                : t === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`,
              border: `1.5px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`
                : t === 'ai' ? `${INDIGO}0.30)` : `${BRICK}0.30)`}`,
            }}>
            {t === 'traditional' ? 'Traditional Approach' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Shared scenario */}
      <div className="rounded-lg px-4 py-3 mb-6"
        style={{ background: `${BRICK}0.06)`, border: `1px solid ${BRICK}0.18)` }}>
        <p className="font-mono uppercase tracking-widest mb-1"
          style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>Shared scenario</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          {SCENARIO}
        </p>
        <p className="mt-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
          Both versions face the same sequencing decision. Only the approach differs.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="space-y-4"
          >
            {/* The sequencing decision */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.20)`, background: `${BRICK}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
                The sequencing decision: which bet goes first?
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team mapped its assumptions and identified the riskiest one: not whether operations
                teams would adopt — that was a commercial risk, manageable — but whether the routing
                algorithm could actually work at the required scale. If it could not, no amount of
                adoption work would matter. The technical question was existential. It went first.
              </p>
            </div>

            {/* Bet 1: technical PoC */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                Bet 1 — Technical proof of concept (weeks 1–3)
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team ran the algorithm against simulated load data, then against anonymised historical
                data from a willing pilot partner. They set a pre-committed threshold: if assignment latency
                exceeded two seconds at 10,000 concurrent requests, the approach would need to change.
                The threshold was not negotiated; it was pre-committed before the experiment started.
                The result: the algorithm held at scale. The existential question was answered in three
                weeks, not nine months.
              </p>
            </div>

            {/* Bet 2: release with real users */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                Bet 2 — Smallest real release to one operations team
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                With the technical foundation confirmed, the team built the smallest real product —
                not a prototype, but a working system for one operations team at one partner company.
                Pre-committed criteria: adoption rate above 70% within four weeks, and dispatch
                error rate below 3%. Both were met. The commercial question was answered. The team
                also learned that operations managers wanted an override capability the team had not
                planned for. That finding reshaped bet 3.
              </p>
            </div>

            {/* Learning reshapes bet 3 */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                The learning arrow fires — bet 3 is reshaped before it begins
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The pilot had been planned as a three-region expansion with no override feature.
                The release finding — that override capability was operationally essential — triggered
                a reshape before the pilot started. The pilot was scoped to two regions, with override
                built in, and the gate criteria updated to include override usage patterns. This is what
                the learning arrow does: a finding in bet 2 reshaped bet 3 before resources were committed
                to the wrong version of it.
              </p>
            </div>

            {/* What the roadmap looked like */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.28)`, background: `${BRICK}0.06)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
                What the roadmap actually looked like at any moment
              </p>
              <p className="font-semibold"
                style={{ fontSize: 'var(--text-sm)', color: `${BRICK}0.80)` }}>
                Near bets were precisely specified with pre-committed gate criteria. Far bets were
                deliberately loose — described in intent, not in features. The roadmap was not a promise;
                it was a sequence of bets, and its far end was allowed to stay uncertain until evidence
                warranted specifying it.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="space-y-4"
          >
            {/* Hypothetical framing */}
            <div className="rounded-lg px-4 py-3"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The traditional approach above was what the team actually did. This tab imagines the same
                team had used AI to build their roadmap — to show where AI genuinely helps and what it
                structurally cannot do.
              </p>
            </div>

            {/* Genuine uplift: mechanics */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                  Where AI genuinely helped — and the help was real
                </p>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Real uplift
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                At the mechanics level, AI was excellent. It mapped dependencies between bets automatically —
                flagging that the override feature discovered in bet 2 would need to be accounted for in
                the pilot scope, and that skipping this would create a technical debt that would compound.
                It produced a capacity model against team bandwidth within minutes, and maintained the
                roadmap document as a living artefact with no manual upkeep. These are real, practical
                gains and the team should use them.
              </p>
            </div>

            {/* The existential question AI could not answer */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.80)' }}>
                What it could not do — the sequencing judgment
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                When asked to sequence the roadmap, the AI produced a plausible order — and it was the
                wrong one. It placed adoption work first, because that was the commercially visible deliverable,
                and the technical PoC third, because it had no commercial output. This is the convenience
                ordering: demo-able first, existential question last. The AI had no way to know that the
                routing algorithm question, if wrong, would invalidate every bet that followed. That judgment
                requires knowing which assumption is fatal — and that is not a sequencing problem; it is a
                risk judgment about the specific business and its specific constraints.
              </p>
            </div>

            {/* The dangerous artefact */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.80)' }}>
                The dangerous artefact — the 12-month plan, beautifully made
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The AI produced a fully specified 12-month delivery plan: every bet precisely defined,
                every month accounted for, the whole sequence equally confident from week one to month
                twelve. It was beautiful. It was also a Gantt chart wearing the language of a roadmap.
                The far end was as specified as the near end, which is exactly the lie. The stakeholders
                treated it as a plan. The team treated it as a plan. Nobody resisted it, because it
                looked better than the honest, gradient version — and looking better was its flaw.
              </p>
            </div>

            {/* The honest readout */}
            <div className="rounded-lg p-5"
              style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.65)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Use AI for mechanics — dependency mapping, capacity modelling, document maintenance.
                It is genuinely better at these tasks. But the sequencing judgment — which bet is
                existential, which goes first, which can stay loose — must come from a human who
                understands the actual risk. Review any AI-generated roadmap for false precision before
                it is shared. Reintroduce the gradient. The looseness at the far end is not a defect
                to be smoothed away. It is the honesty.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
