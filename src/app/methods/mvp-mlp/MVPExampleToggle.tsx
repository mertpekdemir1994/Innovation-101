'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A team wants to launch a personal finance tool in a crowded, mature category where users already have polished alternatives and high expectations. The core value is clear and the concept has tested well. The question is what to actually ship: a bare MVP to learn cheaply, or a Minimum LOVABLE Product? Both routes face the same prioritization work first — and only then does the choice between them matter.'

export default function MVPExampleToggle() {
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

            {/* The shared prioritization work */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${BRICK}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${BRICK}1)` }}>The shared work — same for both routes</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                First, the team identified the true core: the small set of features that actually delivered the
                central value — the ability to see spending clearly, set a single goal, and see progress toward
                it. Everything else was cut. Not deferred, not &ldquo;later&rdquo; — cut. That ruthless prioritization
                was the same regardless of which route they took. The choice between MVP and MLP comes after
                the core is identified, not instead of the scoping work.
              </p>
            </div>

            {/* The market judgment */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${BRICK}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${BRICK}1)` }}>The judgment that mattered: what would this market tolerate?</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team thought hard about the market. The category was crowded and expectations were high:
                users already had well-made alternatives — Mint, YNAB, others. A bare, functional MVP in
                that context would tell them almost nothing useful, because people would churn from a joyless
                product regardless of whether the underlying idea was good.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                That is the false negative, and in this market it was the expensive risk. They could have killed
                a genuinely good idea because their test was unloved, not because the idea was wrong. In a crowded,
                high-expectation category, an unlovable product teaches you almost nothing about whether the
                idea has merit.
              </p>
              <div className="rounded p-3 mt-1"
                style={{ background: 'rgba(217,119,6,0.05)', borderLeft: '2px solid rgba(217,119,6,0.35)' }}>
                <p className="text-[9px] font-mono font-semibold uppercase tracking-wider mb-1"
                  style={{ color: 'rgba(217,119,6,0.80)' }}>FALSE NEGATIVE RISK</p>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  In a crowded market with polished alternatives, people churn from a joyless product regardless
                  of the idea. Reading that churn as a verdict on the concept kills good ideas based on bad tests.
                </p>
              </div>
            </div>

            {/* What they built */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${BRICK}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${BRICK}1)` }}>What they built: the same core, executed with craft</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                They built a Minimum LOVABLE Product: the same minimal core — no extra features — but executed
                with real care. The interactions were considered, the copy was human, the visual design was
                something people actually enjoyed looking at. The experience within its narrow scope was
                genuinely good to use.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                What they did not do: expand the scope. They shipped three features, not twelve. The
                discipline was identical to what an MVP would have required — they just spent their effort on
                the QUALITY of the core rather than the QUANTITY of features. Same ruthless cutting; different
                optimization of what remained.
              </p>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                {[
                  { label: 'Features cut', items: ['Budgeting categories', 'Account linking', 'Bill tracking', 'Reports', 'Multi-currency', 'Sharing'] },
                  { label: 'Core built with craft', items: ['Spending clarity (considered, clean)', 'Single goal (human copy, encouraging)', 'Progress view (satisfying, not clinical)'] },
                ].map(col => (
                  <div key={col.label}>
                    <p className="text-[9px] font-mono font-semibold uppercase tracking-wider mb-2"
                      style={{ color: col.label.includes('cut') ? 'var(--color-neutral-400)' : `${BRICK}0.80)` }}>
                      {col.label}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {col.items.map((item, i) => (
                        <li key={i} className="text-xs text-neutral-600 flex gap-1.5">
                          <span style={{ color: col.label.includes('cut') ? 'var(--color-neutral-300)' : `${BRICK}0.60)`, flexShrink: 0 }}>
                            {col.label.includes('cut') ? '×' : '→'}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* The result */}
            <div className="border rounded-lg p-5"
              style={{ borderColor: `${BRICK}0.30)`, background: `${BRICK}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: `${BRICK}1)` }}>What the lovable minimum produced</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Early users did not merely tolerate it — they advocated for it. Because it was genuinely
                good within its narrow scope, the signal it returned was about the IDEA: whether people
                wanted this kind of tool, whether this approach to personal finance resonated. It was not
                a verdict on their indifference to craft.
              </p>
              <p className="text-sm font-semibold" style={{ color: `${BRICK}0.85)` }}>
                The discipline that made it work: they cut just as ruthlessly as an MVP would have, and
                spent their effort on the quality of the core rather than the quantity of features. The
                choice of lovable over viable was made deliberately, based on the market&rsquo;s expectations —
                not as an excuse to build more.
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
                The personal finance case above was built by a traditional team. This tab imagines the team
                had leaned on AI throughout — to show where it genuinely helps, and where the human judgment
                calls remain load-bearing.
              </p>
            </div>

            {/* Genuine uplift — the main section */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>Where AI gave substantial, genuine uplift</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Cost of lovable collapsed
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The most significant effect was economic, and it was real. Historically, choosing lovable
                over viable meant paying a meaningful premium in time and money: polished interfaces take
                longer to build, well-crafted copy takes a skilled writer, considered interactions take
                design iteration. With AI, that premium shrank substantially.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team produced polished interaction states, well-written encouraging copy, and clean
                implementation faster and more cheaply than a comparable team could have a few years ago.
                The old argument for shipping a bare MVP — &ldquo;we cannot afford to make it lovely&rdquo; — largely
                dissolves. More teams should now default toward the MLP end, and that is a legitimate,
                important shift.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                This is the AI contribution that matters most here: it raises the floor. For teams that were
                previously choosing bare MVP because lovable was financially out of reach, AI removes that
                constraint. That is a genuine improvement to how this method can be practiced.
              </p>
            </div>

            {/* Two human limits */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>Where human judgment stayed load-bearing</p>
              <div className="space-y-4">
                {[
                  {
                    tag: 'TASTE: LOVED ≠ POLISHED',
                    text: 'AI produced something immaculately tidy. And tidy is not loved. The team still needed to make the judgment calls that made the personal finance tool feel safe and encouraging rather than clinical and stressful — the specific tone that made an anxious topic feel manageable, the one interaction that made someone feel good about their progress rather than guilty about their spending. Those choices were not derivable from a pattern average of well-received finance apps. They required understanding these specific users\' emotional relationship with money.',
                    note: 'Human judgment: which moments earn affection, for these users, in this context',
                  },
                  {
                    tag: 'INTERPRETATION: FLUENT ≠ EVIDENCE',
                    text: 'When early adoption data came in with softer-than-expected retention, the AI produced a confident, articulate analysis of possible causes — feature gaps, onboarding friction, competitive pressure. The narrative was plausible and well-structured. It was not evidence about the actual cause. Whether the softness meant the idea needed pivoting (wrong approach to personal finance) or the execution had not quite landed (the lovable part fell short) was a consequential judgment that required understanding the users, running follow-up conversations, and reading the qualitative signal alongside the metrics. Trusting the AI’s narrative would have been how the team pivoted away from a good idea — or polished a mediocre one indefinitely.',
                    note: 'Human judgment: idea rejected vs execution rejected — the interpretive call the whole method turns on',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded p-4"
                    style={{ background: `${INDIGO}0.05)`, borderLeft: `2px solid ${INDIGO}0.28)` }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1.5"
                      style={{ color: `${INDIGO}0.65)` }}>{item.tag}</p>
                    <p className="text-xs text-neutral-700 leading-relaxed mb-2">{item.text}</p>
                    <p className="text-[10px] text-neutral-500 leading-relaxed font-mono">↑ {item.note}</p>
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
                AI makes lovable affordable — that is a genuine, material improvement to how this method
                should be practiced, and teams should use it. The human work that remains is not diminished:
                the taste to know what would actually be loved by these users (not merely polished for a
                general audience), and the interpretive judgment to read a soft signal correctly (idea or
                execution?) are the calls that determine whether the release actually teaches anything.
                Cheap craft raises the floor; it does not make the judgment for you.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
