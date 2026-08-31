'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A company that sells software to large enterprises through a direct sales team wants to move down-market and serve small businesses. Everyone in the room agrees it is a growth opportunity. They use the Business Model Canvas to see what the move requires.'

export default function BMCExampleToggle() {
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
            {t === 'traditional' ? 'Traditional approach' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Shared scenario */}
      <div className="rounded-lg px-4 py-3 mb-6"
        style={{ background: `${PLUM}0.05)`, border: `1px solid ${PLUM}0.16)` }}>
        <p className="font-mono uppercase tracking-widest mb-1"
          style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.55)` }}>Shared scenario</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          {SCENARIO}
        </p>
        <p className="mt-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
          Both tabs map the same business. Only the method differs.
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
                Draw the current canvas first
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team started by mapping the existing enterprise model: large enterprise customer segment,
                high-touch direct sales channel, dedicated account management relationships, large annual
                contracts as revenue streams, and a cost structure built around an expensive sales force.
                Coherent. It worked, because every block supported every other one. The model held together.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${PLUM}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.55)` }}>
                Change one block and follow the dependencies
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                They changed one block: customer segment, from enterprise to small business. And then they did
                the thing the method is actually for, which is following the dependency links to see what moved
                with it. Almost everything did. The value proposition had to change: small businesses do not need,
                and will not pay for, the enterprise feature set. The channel had to change: a direct sales team
                cannot economically call on thousands of small accounts. The customer relationship had to change:
                dedicated account managers are impossible at small-business price points. The revenue stream had
                to change: large annual contracts become small monthly subscriptions.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `2px solid ${AMBER}0.45)`, background: `${AMBER}0.05)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.80)` }}>
                ⚠ The break: this is the method
              </p>
              <p className="font-semibold mb-3"
                style={{ fontSize: 'var(--text-sm)', color: `${AMBER}0.88)` }}>
                With small monthly subscriptions as the revenue stream, the existing cost structure, built
                around an expensive direct sales force, did not work. The cost of acquiring a
                small-business customer through direct sales exceeded what that customer would ever pay.
                Two blocks contradicted each other outright.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                That contradiction was the finding. It arrived on a whiteboard rather than in the P&amp;L eighteen
                months later. The move down-market was not impossible, but it was not an extension of the
                current business model. It required a different one: self-serve channel, product-led
                onboarding, a fundamentally different cost structure. Now the team could argue about <em>that</em>, honestly,
                instead of about whether small businesses were an attractive market.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${PLUM}0.20)`, background: `${PLUM}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.65)` }}>
                Write the assumptions on the canvas itself
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                They wrote the untested claims onto the new canvas: that small businesses would adopt self-serve,
                that the product could be simplified without losing what customers valued, that the freemium
                conversion rate would hold. Those went to concept testing and assumption mapping. The canvas
                organised the guesses. It did not settle them. A completed canvas is a hypothesis, and they
                knew that, which is why the work was not done when they finished filling it in.
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
                The traditional approach above is what the team actually did. This tab imagines the same
                team had asked AI to produce the small-business canvas, to show where it helps
                and what it structurally cannot do.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.04)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                  The result looked like the work of a company that had already succeeded
                </p>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI produced the canvas instantly and it was excellent to look at: a self-serve channel, a freemium
                revenue model, a simplified value proposition, a lean cost structure. Nine blocks, coherently phrased,
                professionally organised. It read like the business model of a company that had figured this out already,
                and somebody in the room said it looked like a plan.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${AMBER}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                But it was nine confident guesses arranged beautifully
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Would these small businesses adopt a self-serve product? Would the freemium conversion
                rate be anywhere near what the model implied? Could the product be simplified without losing the
                thing enterprise customers valued, which might not be what small businesses value at all? The AI
                had no way to know. And the plausibility of the output was exactly what made it dangerous: it was
                the version nobody in the room would challenge, because it sounded right, and it arrived carrying
                the authority of a finished artifact.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                Where AI earned its keep was the opposite use
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Handed the team&rsquo;s own canvas and asked to attack it, AI was sharp. It flagged quickly
                that the retained direct-sales cost structure could not survive a monthly subscription revenue
                stream at small-business price points; that a self-serve channel was inconsistent with a
                dedicated-account-manager relationship block the team had left unchanged out of habit; and that
                key activities still assumed enterprise implementation work that a self-serve model would not
                involve. Every one of those was a real coherence failure, found in seconds. Finding them is
                precisely the work the method exists to do.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ background: `${PLUM}0.04)`, border: `1px solid ${PLUM}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.62)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Never ask AI to write the canvas. It produces a beautiful hypothesis and you will mistake it for
                a business. Ask it to break the canvas: to find the contradiction between block three and block
                seven, which is the thing the method exists to surface. Then go and test the assumptions with real
                small businesses, because a perfectly coherent business model can still be completely wrong, and
                coherence is not truth.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
