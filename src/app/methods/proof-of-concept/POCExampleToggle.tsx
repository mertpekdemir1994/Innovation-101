'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A logistics company suspects it can predict delivery delays 24 hours in advance using its existing route, weather, and driver-history data, and route to different fulfilment options before the delay occurs. But it doesn\'t know if the signal is strong enough. Building the full prediction system would be months of work. The PoC asks only: can the data predict delays at useful accuracy?'

export default function POCExampleToggle() {
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
            aria-pressed={tab === t}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${BRICK}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? (t === 'ai' ? `${INDIGO}0.35)` : `${BRICK}0.35)`)
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${BRICK}1)`
                : 'var(--color-neutral-600)',
            }}>
            {t === 'traditional' ? 'Traditional Approach' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Shared scenario */}
      <div className="rounded-lg px-4 py-3 mb-6" style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mr-2">
          Shared scenario
        </span>
        <span className="text-sm text-neutral-600">{SCENARIO}</span>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* The question, precisely named */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${BRICK}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${BRICK}1)` }}>The one question, named precisely</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team resisted the temptation to ask &ldquo;will our delay-prediction product work?&rdquo;, a
                question with no provable answer at this stage. Instead they named the critical uncertain
                thing: <span className="font-semibold">&ldquo;Using the existing route, weather, and driver-history data, can we predict delivery delays
                more than 24 hours in advance with accuracy above 75% on the last 18 months of real data?&rdquo;</span>
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Crucially, they also named the pass/fail threshold in advance: accuracy above 75% on real
                historical data. Not &ldquo;it feels promising&rdquo;, a number, set before the test ran.
              </p>
            </div>

            {/* What the rig included / excluded */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${BRICK}0.20)`, background: `${BRICK}0.03)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${BRICK}1)` }}>What the rig included</p>
                <ul className="flex flex-col gap-2">
                  {[
                    'A data pipeline to pull and normalise three existing data sources',
                    'A simple ML model (gradient boosted trees) to generate predictions',
                    'Evaluation logic: compare predictions against actual outcomes',
                    'A result readout: accuracy score, breakdown by route type',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color: `${BRICK}0.80)`, flexShrink: 0 }}>→</span>
                      <span className="text-xs text-neutral-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border rounded-lg p-5 border-neutral-100 bg-neutral-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                  What it excluded (deliberately)
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'No interface, results read from a notebook, not a dashboard',
                    'No real-time data feeds, tested on 18 months of historical data only',
                    'No routing logic, the PoC proved prediction, not the full system',
                    'No production engineering, would be discarded after',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-neutral-300 shrink-0">×</span>
                      <span className="text-xs text-neutral-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Real messy data */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${BRICK}0.20)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${BRICK}1)` }}>Tested on real messy data, not cleaned samples</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team insisted on testing with 18 months of actual, uncleaned operational data,
                the same data the system would eventually work with. They resisted the temptation to
                clean it first, which would have made the rig succeed in conditions unlike production.
                The messy data was the point: if the signal wasn&rsquo;t strong enough to work in messy
                conditions, that was a fact worth knowing now.
              </p>
            </div>

            {/* Qualified verdict */}
            <div className="border rounded-lg p-5"
              style={{ borderColor: `${BRICK}0.30)`, background: `${BRICK}0.05)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: `${BRICK}1)` }}>The verdict, qualified and useful</p>
              <div className="flex items-start gap-3 mb-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ background: `${BRICK}0.12)`, color: `${BRICK}1)`, whiteSpace: 'nowrap', marginTop: 2 }}>
                  QUALIFIED PASS
                </span>
                <p className="text-sm font-semibold text-neutral-900">
                  Worked for standard domestic routes (83% accuracy). Degraded significantly for
                  cross-border deliveries (58%, below threshold).
                </p>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                That qualified verdict was more valuable than a clean pass would have been. The team now knew:
                the prediction signal was real for domestic routes, but cross-border logistics data had
                a different structure that the current data sources couldn&rsquo;t capture well enough.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The rig was discarded. The knowledge carried forward, reshaping what to build: a domestic-first
                product, with cross-border as a phase-two problem requiring different data sources. That
                decision, made now, saved months of building the wrong thing.
              </p>
              <p className="text-sm font-semibold" style={{ color: `${BRICK}0.85)` }}>
                The verdict, including its conditions, was the deliverable. Not the notebook. Not the model. The knowledge.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* Hypothetical notice */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The logistics PoC above was built by a specialist team over roughly a week. This tab
                imagines the same question tested with AI coding assistance, to show where AI genuinely
                compresses time, and where the human judgment calls remain.
              </p>
            </div>

            {/* Genuine uplift */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>Where AI gave substantial uplift</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Days → hours
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                With AI assistance, what would have taken a data specialist four to five days took
                closer to six hours. AI generated the full data-ingestion pipeline, wrote the
                normalisation logic for all three data sources, built the gradient-boosted model
                configuration, and produced the evaluation and accuracy-measurement code, all from
                a clear description of the question and the data structure.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                This is where AI gives the most leverage in a PoC: the rig is tightly scoped,
                outcome-focused, and internal, exactly the kind of build where AI coding assistance
                compounds speed without the complexity of production concerns. The time-to-verdict
                compressed dramatically. That is a genuine, substantial win.
              </p>
            </div>

            {/* Two limits */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>Where human judgment remained essential</p>
              <div className="space-y-4">
                {[
                  {
                    tag: 'WHICH QUESTION TO PROVE',
                    text: 'AI built the rig fast, for whatever question it was pointed at. Choosing to prove prediction accuracy first (not routing logic, not real-time performance, not the interface) was a strategic call about what was genuinely uncertain and what a positive result would enable. AI does not make that call. Point AI at the wrong question and you get a fast answer to the wrong thing.',
                    note: 'Human judgment: question selection, threshold setting, what "good" means',
                  },
                  {
                    tag: 'SANDBOX ≠ REAL CONDITIONS',
                    text: 'The AI-built rig ran in a clean environment with well-structured historical data. The degradation on cross-border routes (the qualifying finding that reshaped the product direction) emerged because the human team insisted on running against real messy production data, including the poorly-structured cross-border records. A team that accepted the clean-sandbox result as the verdict would have missed it.',
                    note: 'Human judgment: reading the gap between proof conditions and production reality',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded p-4"
                    style={{ background: `${INDIGO}0.05)`, borderLeft: `2px solid ${INDIGO}0.28)` }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1.5"
                      style={{ color: `${INDIGO}0.65)` }}>{item.tag}</p>
                    <p className="text-xs text-neutral-700 leading-relaxed mb-2">{item.text}</p>
                    <p className="text-[10px] text-neutral-500 leading-relaxed font-mono">
                      ↑ {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Honest readout */}
            <div className="rounded-lg p-5 border"
              style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO}0.80)` }}>The honest readout</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI compresses rig-building substantially and genuinely, this is one of the clearest
                examples of AI giving a team real leverage. The human work that remained was not
                diminished by that speed: choosing the right question, setting the verdict threshold
                in advance, and reading the gap between sandbox conditions and production reality are
                the judgment calls that determine whether the PoC actually de-risks anything. Speed
                of rig construction is the gain. Precision of question and interpretation of verdict
                stay with the humans.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
