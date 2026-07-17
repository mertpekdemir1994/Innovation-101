'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A founder wants to build an online shoe store. The concept rests on many assumptions — but which one is the genuine leap of faith? Will people actually buy shoes online without trying them on first? That is the Zappos origin question: critical (the whole business hinges on it) and untested (no evidence exists either way).'

export default function AMPExampleToggle() {
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
                ? t === 'ai' ? `${INDIGO}0.10)` : `${CLAY}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? (t === 'ai' ? `${INDIGO}0.35)` : `${CLAY}0.35)`)
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${CLAY}1)`
                : 'var(--color-neutral-600)',
            }}
          >
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
            className="space-y-4"
          >
            {/* Setup */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>How the mapping worked</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The team surfaced every assumption the online shoe store depended on — across desirability
                (do people want this?), feasibility (can it be built?), and viability (do the economics work?).
                Most assumptions were important but well-evidenced. Shoes can be photographed and displayed online.
                People already buy things online. Delivery and returns are operationally viable.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                But one assumption sat alone in the leap-of-faith corner: critical, and genuinely untested.
                Everyone already agreed that shoes had to be tried on before buying. Whether people would
                actually purchase them online, sight unseen, was a belief nobody had tested — and the entire
                business model depended on the answer.
              </p>
            </div>

            {/* The assumptions mapped */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>The assumptions mapped</p>
              <div className="space-y-3">
                {[
                  {
                    label: 'Shoes can be sold online',
                    quadrant: 'MONITOR',
                    note: 'Important, and reasonably evidenced — e-commerce was already established for other goods. Safe to proceed on, but not the dangerous bet.',
                    danger: false,
                  },
                  {
                    label: 'Delivery and returns are operationally viable',
                    quadrant: 'MONITOR',
                    note: 'Known. Other categories already shipped and accepted returns. Safe.',
                    danger: false,
                  },
                  {
                    label: 'People will buy shoes without trying them on',
                    quadrant: 'LEAP OF FAITH',
                    note: 'Critical — the concept collapses without this being true — and completely untested. No evidence existed either way. This is the one.',
                    danger: true,
                  },
                  {
                    label: 'Customers prefer a wide online selection',
                    quadrant: 'MONITOR',
                    note: 'Plausible from other categories; important but not as unknown as the core question.',
                    danger: false,
                  },
                  {
                    label: 'Website can be built and run reliably',
                    quadrant: 'IGNORE',
                    note: 'Known and not a differentiator. Move on.',
                    danger: false,
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded p-3 flex gap-4"
                    style={{
                      background: item.danger ? `${CLAY}0.06)` : 'var(--color-neutral-50)',
                      borderLeft: `2px solid ${item.danger ? `${CLAY}0.55)` : 'var(--color-neutral-200)'}`,
                    }}>
                    <div className="shrink-0 w-28">
                      <span className="text-[9px] font-semibold uppercase tracking-wider block"
                        style={{ color: item.danger ? `${CLAY}1)` : 'var(--color-neutral-400)' }}>
                        {item.quadrant}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-800 mb-1">{item.label}</p>
                      <p className="text-xs text-neutral-600 leading-relaxed">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The cheap test */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.30)`, background: `${CLAY}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: `${CLAY}1)` }}>The cheapest test for the riskiest assumption</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Rather than build a full e-commerce platform to find out whether people would buy shoes online,
                Nick Swinmurn designed the smallest possible test for exactly that assumption. He photographed
                shoes in local shoe stores, posted them on a simple website, and when someone ordered,
                bought the shoes at retail price and shipped them himself.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                He lost money on every sale. That was not the point. The test answered the one
                leap-of-faith assumption in days, with no engineering investment: people would buy shoes
                online, without trying them on first. The Zappos business model was validated by a test
                aimed at the belief that could have killed the idea — not at the comfortable ones.
              </p>
              <p className="text-sm font-semibold" style={{ color: `${CLAY}0.88)` }}>
                Testing the thing that could kill the idea first, while it was still cheap to be wrong, is the whole discipline.
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
            className="space-y-4"
          >
            {/* Hypothetical notice */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The real Zappos case was human-led. This tab imagines the founder had instead used AI
                to map the concept&rsquo;s assumptions — to show where it helps and where it falls short.
              </p>
            </div>

            {/* What AI did well */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>Where AI helped</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Breadth and speed
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI produced a thorough list of assumptions fast — across desirability, feasibility, and
                viability. It covered the obvious categories well and ensured nothing was forgotten:
                delivery, returns, catalogue size, trust in online retail. As a checklist, it was useful.
              </p>
            </div>

            {/* Where AI failed — the consensus trap */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>Where AI fell short</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(217,119,6,0.10)', color: 'rgba(217,119,6,0.85)', border: '1px solid rgba(217,119,6,0.25)' }}>
                  The consensus trap
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The decisive judgment was one AI could not make well. Rating &ldquo;people will buy shoes
                without trying them on&rdquo; on UNCERTAINTY required knowing how uncertain that was for
                this specific venture — a judgment about the founder&rsquo;s actual evidence (none) and
                the specific market context.
              </p>
              <div className="space-y-3">
                {[
                  {
                    tag: 'On online purchasing',
                    ai: '"Online shopping is a well-established consumer behaviour across most product categories. Strong evidence base from other verticals."',
                    note: 'The consensus trap: AI rates online purchasing as broadly known — missing that buying shoes sight unseen, without trying, was the genuine untested question. It conflates general online buying with the specific shoes-without-trying leap.',
                  },
                  {
                    tag: 'On the leap-of-faith assumption',
                    ai: '"Consumer comfort with online apparel purchasing is growing and well-documented. Risk here appears moderate rather than critical."',
                    note: 'A generic assessment based on published patterns. The founder\'s actual evidence was zero: nobody had tested whether their specific customers, in their specific context, would buy shoes they could not try on.',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded p-3"
                    style={{ background: `${INDIGO}0.05)`, borderLeft: `2px solid ${INDIGO}0.28)` }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: `${INDIGO}0.65)` }}>{item.tag}</p>
                    <p className="text-xs text-neutral-700 italic mb-1.5">{item.ai}</p>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">↑ {item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Honest readout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${INDIGO}0.80)` }}>The assumption AI missed</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Had the founder trusted the AI&rsquo;s generic placement, the assumption &ldquo;people will buy
                  shoes without trying them on&rdquo; might have looked safely &ldquo;known&rdquo; — and the temptation
                  would have been to just build. The leap of faith would have remained untested until
                  after months of engineering investment.
                </p>
              </div>
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
                  The judgment stayed human
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Correctly identifying that assumption as the leap of faith — based on zero actual evidence —
                  and committing to test it cheaply before building: that was a human act of intellectual
                  honesty about what was genuinely unknown, that no generic AI rating could supply.
                </p>
              </div>
            </div>

            <div className="rounded-lg p-5 border"
              style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO}0.80)` }}>The honest readout</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI generates the assumption list fast — breadth for the obvious beliefs.
                But judging which assumption is both most critical to this specific concept and least
                evidenced by what you actually know requires your business model and your private evidence,
                neither of which AI has. And the consensus trap — AI rating shared beliefs as safe — can
                quietly push the riskiest assumption out of the danger quadrant. Use AI to build the list;
                keep the placement on the two axes, and the choice of the leap-of-faith assumption to test first, human.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
