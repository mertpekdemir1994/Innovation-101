'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A product team has built an early product for first-time users. It is working: adoption is healthy, users complete their tasks, the feedback is mostly positive. Then come the power users. Their requests are consistent and reasonable-sounding: more configurability, more options, the ability to adapt the tool to advanced workflows. The team must decide whether to build it. The decision keeps coming up, consuming the same hour in every planning session, landing in the same unresolved place. They need a principle.'

export default function DPExampleToggle() {
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
                ? t === 'ai' ? `${INDIGO}0.85)` : `${PLUM}0.85)`
                : 'transparent',
              color: tab === t ? '#fff'
                : t === 'ai' ? `${INDIGO}0.70)` : `${PLUM}0.70)`,
              border: `1.5px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.70)` : `${PLUM}0.70)`
                : t === 'ai' ? `${INDIGO}0.30)` : `${PLUM}0.30)`}`,
            }}>
            {t === 'traditional' ? 'Team-derived principle' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      <div className="rounded-lg px-4 py-3 mb-6"
        style={{ background: `${PLUM}0.05)`, border: `1px solid ${PLUM}0.16)` }}>
        <p className="font-mono uppercase tracking-widest mb-1"
          style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.55)` }}>Shared scenario</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          {SCENARIO}
        </p>
        <p className="mt-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
          Both tabs start from the same recurring argument. Only the derivation method differs.
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
              style={{ border: `1px solid ${PLUM}0.20)`, background: `${PLUM}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.65)` }}>
                Derive from the recurring argument
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team mapped the recurring argument. Every time the power-user requests came in, the same
                sub-discussion surfaced underneath them: should the product be primarily for the new user or
                for the expert? Nobody had ever decided. They had built a product for new users, but nobody had
                actually committed to it in writing, in a form that could hold when someone arrived with a
                compelling counter-case.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${PLUM}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.55)` }}>
                Name the sacrifice explicitly
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                After two sessions, they had a candidate principle: &ldquo;We optimise for the first-time user, even
                at the expense of the expert.&rdquo; The second clause — &ldquo;even at the expense of the expert&rdquo; — was
                the hard part, and it was the whole point. Without it, the principle was just &ldquo;be good for users&rdquo;
                and it closed nothing. With it, it named what they were giving up.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${PLUM}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.55)` }}>
                The principle working under pressure
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The next time a large customer asked for a power-user feature, a customer who was vocal and important,
                the team ran the principle. The feature would improve expert efficiency at the cost of first-time
                clarity. The principle had already decided: the answer was no. There was no hour-long debate. The
                customer was disappointed. The principle held. The product did not drift.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${PLUM}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.55)` }}>
                The arguability test as a check
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                They checked it: could a reasonable team argue the opposite? Yes — many products had been built
                the other way and had succeeded. Bloomberg Terminal, Adobe Photoshop, Microsoft Excel all chose
                the expert over the first-time user and won. The opposite was defensible. That confirmed it was
                a principle, not a platitude. It described a real, contested choice that the team had now
                committed to explicitly.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${PLUM}0.28)`, background: `${PLUM}0.05)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.70)` }}>
                What this taught
              </p>
              <p className="font-semibold"
                style={{ fontSize: 'var(--text-sm)', color: `${PLUM}0.82)` }}>
                The principle did not change the answer — it made the answer pre-computable. The same situation
                had come up eight times in the previous six months. It had consumed the same hour each time and
                reached no durable conclusion. After the principle, the same situation took four minutes.
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
                The team-derived approach above is the recommended method. This tab imagines the same team
                had asked AI to write their principles first — to show where that goes and where AI genuinely helps.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${AMBER}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                The AI principles — beautiful and empty
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                The team asked an AI assistant to generate a set of product principles for a product-led growth
                company. The output was polished and reasonable:
              </p>
              <div className="space-y-2">
                {[
                  'Balance power with simplicity',
                  'Serve every user well — new and experienced',
                  'Be flexible without becoming complex',
                  'Empower users to do their best work',
                ].map(p => (
                  <div key={p} className="rounded px-4 py-2"
                    style={{ background: `${INDIGO}0.05)`, border: `1px solid ${INDIGO}0.18)` }}>
                    <p className="font-mono"
                      style={{ fontSize: 'var(--text-sm)', color: `${INDIGO}0.72)`, letterSpacing: '0.02em' }}>
                      &ldquo;{p}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                Each one sounded reasonable. The team agreed with all of them. Then they tried to apply one to the
                actual power-user question, and they were back in the same hour-long debate, with an elegant
                sentence above the door that had not decided anything.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${AMBER}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                The fork test
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                They brought each principle to the fork: a large customer is asking for a configuration feature
                that helps expert users at the cost of first-time clarity. Apply the principle. What does it decide?
                &ldquo;Balance power with simplicity&rdquo; pointed both directions. &ldquo;Serve every user well&rdquo; pointed both
                directions. &ldquo;Empower users to do their best work&rdquo; pointed both directions. Every principle the
                AI had generated pointed both directions. The fork was still undecided.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                  Where AI legitimately helped
                </p>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Argue the opposite
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                After the team had derived the real principle themselves — &ldquo;we optimise for the first-time user,
                even at the expense of the expert&rdquo; — they gave it to AI with one instruction: argue the strongest
                possible case for the opposite. The AI produced a detailed argument for the expert-first strategy,
                citing real products, real numbers, real market data. It was excellent. It confirmed the principle
                was arguable (therefore a principle), and it forced the team to stress-test their conviction before
                committing. The derivation was theirs. The stress test was AI&rsquo;s.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ background: `${PLUM}0.04)`, border: `1px solid ${PLUM}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.62)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Skip the AI generation step. Do the hard work of surfacing your real recurring argument, naming
                the sacrifice, and passing the arguability test — in the room, with the people who will be held
                to the principle. Then bring in AI to challenge it. That sequence is the right one. Reversing it
                produces beautiful walls with no load-bearing function.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
