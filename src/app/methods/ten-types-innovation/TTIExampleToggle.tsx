'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A company wants to understand how to build a durable advantage in a category where products are easily copied, and studies a textbook winner: Nespresso, whose coffee was good but not categorically better than rivals’, yet which dominated for years. The question is why the advantage was so durable, and what the 10 Types reveals.'

export default function TTIExampleToggle() {
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
            onClick={() => setTab(t)}
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
          >
            {t === 'traditional' ? 'Traditional Analysis' : 'With AI (same case)'}
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
            {/* The analysis */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: `${PLUM}1)` }}>
                What the 10 Types revealed
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Analyzing Nespresso across the ten types made the source of its durability visible, and it was not the coffee.
                Product Performance &mdash; the type everyone fixates on &mdash; was not the answer: the coffee was good but not
                uniquely so. The durable advantage came from combining several other innovation types into an interlocking system.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { type: 'PROFIT MODEL', detail: 'Razor-and-blades: inexpensive machines, high-margin recurring pod revenue. The economics of the whole business were the innovation, not the espresso quality.' },
                  { type: 'NETWORK + CHANNEL', detail: 'A proprietary pod system and exclusive boutique-and-club distribution that competitors could not easily enter. The channel was a moat.' },
                  { type: 'BRAND + CUSTOMER ENGAGEMENT', detail: 'The Nespresso Club, the boutiques, and the brand ambassador that turned a commodity into a luxury ritual. Customers joined something.' },
                  { type: 'PRODUCT PERFORMANCE', detail: 'The coffee was good — but not categorically better than rivals’. The product did not create the advantage. The combination around it did.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded p-3"
                    style={{
                      background: item.type === 'PRODUCT PERFORMANCE'
                        ? `${AMBER}0.06)`
                        : `${PLUM}0.06)`,
                      borderLeft: `2px solid ${item.type === 'PRODUCT PERFORMANCE' ? `${AMBER}0.35)` : `${PLUM}0.42)`}`,
                    }}
                  >
                    <p
                      className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: item.type === 'PRODUCT PERFORMANCE' ? `rgba(245,158,11,0.65)` : `${PLUM}0.72)` }}
                    >
                      {item.type}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The combination effect */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.28)`, background: `${PLUM}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: `${PLUM}1)` }}>
                Why the combination was so hard to copy
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Any one of these innovations alone would have been copyable &mdash; a competitor could match a profit model,
                or a channel, or a brand campaign. What made Nespresso durable was that replicating its advantage required
                matching an interlocking set of profit-model, network, channel, brand, and engagement innovations
                simultaneously, which competitors struggled for years to do.
              </p>
              <p className="text-sm font-semibold" style={{ color: `${PLUM}0.88)` }}>
                The 10 Types made the lesson explicit: Nespresso won not on the product but on the combination.
              </p>
            </div>

            {/* Key learning */}
            <div className="rounded-lg p-5 border" style={{ background: `${PLUM}0.06)`, borderColor: `${PLUM}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: `${PLUM}1)` }}>Why the framework mattered</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Reading the advantage across all ten types, rather than fixating on the coffee, is what revealed why it was
                so hard to beat, and what a would-be competitor would actually have to replicate. The insight came from
                seeing the system, not the feature.
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
            {/* What AI produced */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `${INDIGO}0.90)` }}>
                  What AI produced
                </p>
                <span
                  className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}
                >
                  Ten columns populated
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The same team asked AI to analyze innovation opportunities in the coffee category using the 10 Types.
                It produced a thorough, well-organized response: an idea in every one of the ten types, quickly.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { type: 'Profit Model', idea: 'Subscription' },
                  { type: 'Network', idea: 'Partner ecosystem' },
                  { type: 'Structure', idea: 'Outcomes org' },
                  { type: 'Process', idea: 'Agile methods' },
                  { type: 'Product Perf.', idea: 'Better taste' },
                  { type: 'Product System', idea: 'Connected app' },
                  { type: 'Service', idea: 'Extended support' },
                  { type: 'Channel', idea: 'Direct online' },
                  { type: 'Brand', idea: 'Sustainability story' },
                  { type: 'Cust. Engagement', idea: 'Loyalty program' },
                ].map((item, i) => (
                  <div key={i} className="rounded p-2 text-center" style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.14)` }}>
                    <p className="text-[8px] uppercase tracking-wider mb-1" style={{ color: `${INDIGO}0.55)` }}>
                      {item.type}
                    </p>
                    <p className="text-[9px] font-semibold text-neutral-600">{item.idea}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What was missing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: `${INDIGO}0.80)` }}>
                  As breadth: useful
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Ten columns, each populated, fast. It ensured no type was ignored and put non-product options on the table.
                  Genuinely useful for breaking a team out of product-only thinking.
                </p>
              </div>
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
                  As strategy: the combination was missing
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The AI listed a plausible move in each type in isolation. What it did not do was identify the specific,
                  interlocking combination &mdash; the particular profit model reinforcing the particular channel and brand and engagement &mdash;
                  that would together form a system a competitor could not easily copy.
                </p>
              </div>
            </div>

            {/* Honest readout */}
            <div className="rounded-lg p-5 border" style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: `${INDIGO}0.80)` }}>
                The honest readout
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Had the team taken the AI&rsquo;s ten-column list as the answer, they would have had a menu of copyable
                individual moves and no defensible system. AI guaranteed breadth across all ten types and countered the
                product-only instinct &mdash; real value. But the strategic core &mdash; combining specific under-used types
                into an interlocking, hard-to-copy system &mdash; was human judgment. The strongest version used AI for
                breadth and human strategy for the combination.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
