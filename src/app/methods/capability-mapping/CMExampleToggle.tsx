'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A company has committed to an ambitious EPIC-level capability: delivering personalised, real-time recommendations to its customers. It is the centrepiece of the strategy. Two teams have been staffed against it, and eighteen months in, it has not landed. Nobody can say why. Before spending another year, they map the capabilities. Both versions map the same organisation; only the method differs.'

export default function CMExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div className="w-full">
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

      <div className="rounded-lg px-4 py-3 mb-6"
        style={{ background: `${BRICK}0.06)`, border: `1px solid ${BRICK}0.18)` }}>
        <p className="font-mono uppercase tracking-widest mb-1"
          style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>Shared scenario</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          {SCENARIO}
        </p>
        <p className="mt-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
          Both versions map the same organisation. Only the method differs.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="space-y-4">
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.20)`, background: `${BRICK}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
                Map as a layered stack, not a list
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team built the map as a layered stack rather than a list, and that structural decision
                was what produced the answer. At the top sat the EPIC-level capability the strategy was
                named after: real-time personalisation. It was staffed, funded, and visible. Below it, the
                map made the dependencies explicit: personalisation rested on a capability to serve and act
                on customer data in real time, which rested in turn on foundational capabilities in data
                quality, pipeline reliability, and engineering practices for operating live systems.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                The practitioners, not the leadership deck
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Assessed honestly — and this required asking the practitioners rather than reading the
                leadership deck — the foundational layer had a hole in it. Data quality was not a gap
                exactly; it was PARTIAL, which was worse, because for two years it had been recorded as
                present. The data was good enough for reporting, which was what everyone had checked, and
                nowhere near good enough to drive a real-time decision, which nobody had checked. Pipeline
                reliability underneath it was a genuine gap: held together by one engineer&rsquo;s
                undocumented knowledge, unavailable when that person was away.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                The moment the dependencies were drawn
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The moment the map was drawn with dependencies, the eighteen-month mystery evaporated.
                The EPIC-level capability had never failed for lack of talent or funding; it had been
                standing on a foundational gap the whole time, and no amount of staffing the top could
                compensate for a missing floor. The two teams had been asked to build a house on a hole.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                Resequence from the bottom
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                They resequenced from the bottom: closed the foundational data-quality and pipeline-reliability
                gaps first — unglamorous, and the only thing that could possibly work — and put those gaps
                on the delivery roadmap as real work with honest timelines, rather than absorbing them as
                scheduling optimism. The EPIC-level capability landed the following year, on a floor that
                existed. The map did not build anything. It simply made it impossible to keep failing for
                a reason nobody could name.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.28)`, background: `${BRICK}0.06)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
                What this taught
              </p>
              <p className="font-semibold"
                style={{ fontSize: 'var(--text-sm)', color: `${BRICK}0.80)` }}>
                A flat capability list would never have found the foundational gap, because every item
                would have looked equally important. The layers and the dependencies are what made the
                foundational hole visible — and visible before another year was spent building on it.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="space-y-4">
            <div className="rounded-lg px-4 py-3"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The traditional approach above is what the team actually did. This tab imagines the same team
                had leaned on AI while mapping — to show where it genuinely helps and what it structurally
                cannot do.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                  The good — and it is real
                </p>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Genuine closure
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Several capability gaps that would have been serious three years ago had genuinely closed.
                Analytical work, prototyping, and a range of technical production tasks that once needed
                scarce specialists were now substantially within reach of the existing team. The map should
                record that honestly — refusing to update it would be its own dishonesty — and it
                meaningfully changed which gaps were worth worrying about.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.80)' }}>
                The map nearly recorded a fiction at the foundation
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team had begun using AI to generate and maintain parts of the data pipeline. On the
                surface, the foundational gap looked closed: the work was getting produced, quickly, and
                it appeared competent. The honest question — the one the method now has to ask — was
                whether anyone in the building could JUDGE that work: tell good from bad, catch a silent
                error, notice when the tool was confidently wrong, and take responsibility for the result.
                Nobody could. What the organisation had was not a pipeline capability; it was access to
                pipeline output, and the difference is invisible right up until the output is wrong, at
                which point there is nobody who can tell, or fix it.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.80)' }}>
                The honest state was PARTIAL — and at the foundation that matters most
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                Scored honestly, that foundational capability was PARTIAL, not HAVE IT — and at the base
                of the stack, an un-judgeable dependency was silently carrying the entire EPIC-level
                ambition above it. A capability map that had marked it green would have produced exactly
                the same eighteen-month mystery as before, with a more modern explanation.
              </p>
              <div className="rounded p-3"
                style={{ background: 'rgba(245,158,11,0.06)', borderLeft: '2px solid rgba(245,158,11,0.35)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  The most dangerous capability map is one whose foundation is a tool nobody in the
                  organisation can evaluate. The surface looks solid. The hole is still there.
                </p>
              </div>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.80)' }}>
                AI could not have drawn the map itself
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The truth about this organisation&rsquo;s capability — that data quality was fine for reporting
                and useless for real-time, that pipeline reliability lived in one person&rsquo;s head — was tacit,
                political, and written down nowhere. It came from asking the people who did the work.
                AI can offer a generic capability taxonomy to start from. It cannot tell you the truth
                about your own building.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.65)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Update the map: several gaps really have closed, and pretending otherwise is its own
                dishonesty. But for every AI-closed gap, ask: can we judge this work? If nobody can
                evaluate it, the honest state is PARTIAL. And at the foundation, PARTIAL carrying an
                EPIC-level ambition above it is the difference between a floor and a picture of one.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
