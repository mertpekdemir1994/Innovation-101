'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY   = 'rgba(31,58,95,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional JTBD' },
  { id: 'ai',          label: 'With AI Assistance' },
]

export default function JTBDExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            style={{
              background: tab === t.id ? `${NAVY}0.85)` : 'transparent',
              color:      tab === t.id ? '#fff' : `${NAVY}0.70)`,
              border:     `1.5px solid ${tab === t.id ? `${NAVY}0.70)` : `${NAVY}0.30)`}`,
            }}
            aria-pressed={tab === t.id}
          >{t.label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'traditional' ? (
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
          >
            {/* Scenario */}
            <div className="rounded-xl p-6 mb-6" style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}>
                Scenario
              </p>
              <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                A fast-food chain wants to sell more milkshakes. Sales are flat.
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                Conventional analysis had already failed. The team had segmented by demographics, asked customers how
                to improve the shake (thicker, cheaper, chunkier) and made none of those changes. Nothing moved.
                They switched to a JTBD investigation: study the <em>circumstances</em> of purchase, especially the
                moment of hiring.
              </p>
            </div>

            {/* What the investigation found */}
            <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
              <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                What the investigation revealed
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                A striking number of milkshakes were bought early in the morning, by solo commuters, alone, buying
                nothing else. Investigating that specific circumstance revealed the job: make a long, boring solo
                commute more interesting, and stave off hunger until lunch, all manageable with one hand on the wheel.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                That job had almost nothing to do with milkshakes as food. It was a companionship-and-engagement job
                in disguise, and the milkshake happened to do it well: thick enough to last the whole commute, one
                handle, engagingly dense to consume.
              </p>
            </div>

            {/* The job statement */}
            <div className="rounded-xl p-6 mb-6" style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}>
                The job statement
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                {[
                  { slot: 'WHEN', text: 'I face a long, boring solo commute' },
                  { slot: 'I WANT TO', text: 'something engaging and filling I can manage one-handed' },
                  { slot: 'SO I CAN', text: 'arrive at work feeling ready, not depleted or bored' },
                ].map(({ slot, text }) => (
                  <div key={slot} className="rounded-lg p-3" style={{ background: `${NAVY}0.14)`, border: `1px solid ${NAVY}0.22)` }}>
                    <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.60)` }}>{slot}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-800)', lineHeight: 'var(--leading-relaxed)' }}>{text}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                No product name. No demographic. Only progress-in-a-circumstance, which is exactly why the real competition and the real improvement suddenly become visible.
              </p>
            </div>

            {/* True competition */}
            <div className="rounded-xl p-5 mb-6" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
              <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                The real competition (not other milkshakes)
              </p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: 'Banana', why: 'Gone too fast, leaves you hungry by 9am' },
                  { name: 'Bagel', why: 'Dry, needs two hands, messy at the wheel' },
                  { name: 'Donut', why: 'Messy, leaves fingers sticky for the meeting' },
                  { name: 'Boredom', why: 'Nothing, you just sit there, drained' },
                ].map(({ name, why }) => (
                  <div key={name} className="rounded-lg px-4 py-3 flex-1 min-w-[140px]" style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.16)` }}>
                    <p className="font-semibold mb-1" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>{name}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>{why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The winning move */}
            <div className="rounded-xl p-5 mb-4" style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}>
                The winning move, revealed by the job
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)', lineHeight: 'var(--leading-relaxed)' }}>
                Make it <em>thicker</em> so it lasts the whole commute (the opposite of what the feature-improvement
                analysis had found). Move the dispenser to a fast self-serve location so commuters can grab it quickly
                before the drive. Both improvements come directly from the job, not from asking customers what they
                wanted in a milkshake, but from understanding what they were hiring it to do.
              </p>
            </div>

            <div className="rounded-lg p-4" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
              <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                What made this possible
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The investigation focused on the <em>circumstance of hiring</em>, not the product&rsquo;s features or the
                customer&rsquo;s profile. The counterintuitive job, make a boring commute bearable, one-handed, until
                lunch, was invisible until someone studied what was actually happening at 7am in the drive-through.
                The job cannot be guessed from the product. It can only be found in the situation.
              </p>
            </div>
          </motion.div>

        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
          >
            {/* AI scenario */}
            <div className="rounded-xl p-6 mb-6" style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}>
              <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}>
                Same scenario: AI assistance applied
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The team feeds the product description to AI: &ldquo;We sell milkshakes. Sales are flat. What are the Jobs To
                Be Done?&rdquo; The AI produces well-formatted job statements in seconds.
              </p>
            </div>

            {/* AI-generated job statements */}
            <div className="flex flex-col gap-3 mb-6">
              <p className="font-mono uppercase tracking-widest" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                AI-generated job statements
              </p>
              {[
                {
                  quality: 'PLAUSIBLE',
                  slots: ['When I want a sweet treat', 'enjoy a rich, satisfying milkshake', 'savour a moment of indulgence'],
                },
                {
                  quality: 'PLAUSIBLE',
                  slots: ['When I am with my kids', 'find an affordable dessert they will enjoy', 'give them a treat without overspending'],
                },
                {
                  quality: 'PLAUSIBLE',
                  slots: ['When I want something filling after lunch', 'find a satisfying, flavourful drink', 'feel pleasantly full without a heavy meal'],
                },
              ].map(({ quality, slots }, i) => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${INDIGO}0.16)` }}>
                  <div className="px-4 py-2 flex items-center justify-between" style={{ background: `${INDIGO}0.08)`, borderBottom: `1px solid ${INDIGO}0.10)` }}>
                    <p className="font-mono uppercase tracking-widest" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                      Job {i + 1}
                    </p>
                    <span className="font-mono uppercase tracking-widest" style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.60)` }}>
                      {quality}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-0 divide-x divide-neutral-100 p-0">
                    {(['WHEN', 'I WANT TO', 'SO I CAN'] as const).map((slotLabel, si) => (
                      <div key={slotLabel} className="p-3">
                        <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                          {slotLabel}
                        </p>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                          {slots[si]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* What AI missed */}
            <div className="rounded-xl p-6 mb-4" style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}>
                The job the AI did not produce
              </p>
              <p className="font-semibold mb-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', lineHeight: 1.35 }}>
                The commute companion job, the one that actually drove morning sales, appears nowhere in the AI output.
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                AI, reasoning from the description &ldquo;milkshake,&rdquo; produced dessert jobs and treat jobs, all anchored
                to the product category. The counterintuitive commute job requires knowing that a specific population
                of people buys milkshakes at 7am, alone, while driving, for reasons that have almost nothing to do
                with milkshakes. That knowledge lives in the drive-through observation, not in the product description.
                No prompt can surface it.
              </p>
            </div>

            {/* Wrong competition */}
            <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.18)' }}>
              <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.70)' }}>
                The competition AI named, and the competition it missed
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>
                    AI competition (within category):
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    Other milkshakes, smoothies, frozen yogurt, specialty coffee drinks. All within the food-and-drink
                    category. None of these competed for the commuter&rsquo;s morning job.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>
                    Real competition (non-obvious):
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    Bananas (gone too fast), bagels (two hands, dry), donuts (messy), boredom (nothing at all). The
                    milkshake beat all of these because of the job, not the product.
                  </p>
                </div>
              </div>
            </div>

            {/* Synthesis */}
            <div className="rounded-xl p-5" style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}>
                What this tells you about AI + JTBD
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI produced correctly-formatted job statements fast, genuinely useful for breaking out of feature-language
                and generating a starting set to react to. But the method&rsquo;s value is the counterintuitive job that
                the product description never implies. That job cannot be produced from a description; it can only be
                found from investigating real circumstances of use. Had the team acted on the AI&rsquo;s output, they would
                have doubled down on milkshake-as-dessert, exactly the framing that had already failed. The strongest
                practice uses AI to draft and escape feature-speak, and human research to find the job that actually
                drives behavior.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
