'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A direct-to-consumer company has developed a subscription wellness box. After concept testing and MVP rounds, product-market fit is confirmed: customers want it. The next question is operational: can we actually deliver it, at what unit economics, with what support load, and at what acquisition cost? They decide to pilot before scaling.'

export default function PLExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button
            key={t}
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
            }}
          >
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
          Both versions run the same pilot. Only the supporting method differs.
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
            {/* Step 1: Defining the pilot boundaries */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.20)`, background: `${BRICK}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
                First: define the three boundaries before anything ships
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team set boundaries across all three dimensions before the pilot launched. Segment: 400 subscribers
                recruited from the existing waitlist, real customers who had expressed real intent, not hand-picked
                advocates. Geography: one city where they had supply chain reach and courier coverage. Timeframe:
                ten weeks, with a hard end date and a pre-scheduled gate review on day seventy-two. The end date
                was non-negotiable. Without it, pilots drift.
              </p>
            </div>

            {/* Step 2: Pre-committing metrics */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                Second: agree on success criteria before the results come in
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team pre-committed to six metrics, each with a threshold that would constitute &ldquo;good enough
                to proceed.&rdquo; Customer metrics: acquisition cost (target: under £38), 90-day retention (floor: 62%),
                NPS (floor: +28). Operational metrics: on-time delivery rate (floor: 91%), average support contacts
                per subscriber per month (ceiling: 0.9), contribution margin at pilot scale (floor: 18%). The
                criteria were written down, signed off, and sealed before launch. Nobody could move them after
                seeing the results.
              </p>
            </div>

            {/* Step 3: Running the pilot */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                What the operational reality revealed
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The product worked. Customers loved the boxes. But the operational picture was messier. The
                packing process took forty-two minutes per box in week one; the projected unit economics assumed
                thirty. The primary courier failed to meet its delivery SLA on 14% of shipments, breaching the
                91% floor. And support contacts ran at 1.4 per subscriber per month (well above the 0.9 ceiling)
                driven almost entirely by two sources: delivery status queries (a courier problem) and one SKU
                that arrived damaged in transit far more often than the supplier&rsquo;s spec had suggested. Neither
                failure showed up in any pre-pilot planning. Both showed up clearly in the first four weeks of
                real operations.
              </p>
            </div>

            {/* Step 4: The gate */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
                The go/no-go gate, called on the committed date
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                At the gate review, three of six criteria were missed. The verdict was no-go to scale, but a
                directed no-go, not a product failure. The customer metrics were strong: acquisition cost at £34
                (above target), retention at 71% (above floor), NPS at +41 (above floor). The operational metrics
                were the problem: delivery, packing efficiency, and support load. The gate gave the team a precise
                list of what to fix before re-running a second pilot. Without the gate, without the pre-committed
                criteria, the strong customer metrics would have made it tempting to declare success and scale
                into operational chaos.
              </p>
            </div>

            {/* The honest finding */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.28)`, background: `${BRICK}0.06)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
                What the pilot was actually for
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                The team knew the product worked before the pilot started. The pilot was for something else entirely:
                finding out whether the DELIVERY MODEL worked: the supply chain, the operational process, the
                courier, the support model, the unit economics when real money moved through real systems at real
                volume, even bounded volume.
              </p>
              <p className="font-semibold"
                style={{ fontSize: 'var(--text-sm)', color: `${BRICK}0.80)` }}>
                The pilot did not save a good product from a bad scale decision. It saved the company from scaling
                a delivery model with two structural faults neither the team nor the supplier nor any pre-launch
                analysis had been able to predict. Those faults were only visible when the thing actually ran.
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
                The traditional approach above was run by the team directly. This tab imagines the same team
                had used AI assistance throughout the pilot design, execution, and analysis, to show where AI
                genuinely helps and what it structurally cannot do.
              </p>
            </div>

            {/* Genuine uplift */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                  Where AI genuinely helped
                </p>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Real uplift
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI helped significantly with the design work. It analyzed waitlist data to characterize the
                candidate segment (demographic profile, stated intent signals, geographic clustering) and
                surfaced that the existing waitlist skewed toward one postcode area, making single-city pilot
                geography a natural fit. It helped construct the metrics instrumentation plan: given the
                business model and the questions at stake, what should the team measure and at what thresholds?
                It also ran the analysis at the gate review, surfacing the packing-time and courier trends weeks
                before the gate date, giving the team time to investigate the courier problem before the formal
                review.
              </p>
            </div>

            {/* Limit: operational reality */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.80)' }}>
                What AI could not see: the operational reality
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                The courier&rsquo;s actual SLA performance under real operational conditions was not in any dataset AI
                could access. The courier&rsquo;s contract said 95%. The courier&rsquo;s historical data, where the team
                could access it, showed 93%. Neither predicted the 86% that appeared in the pilot, because
                the pilot week overlapped with a regional capacity crunch the courier had not disclosed and
                would not have appeared in historical averages. Similarly, the packing time issue (forty-two
                minutes vs. thirty projected) was the product of a process that had never run under real
                conditions with real people who were not the design team. AI could model packing efficiency
                from assumptions; it could not model the gap between the assumption and the first time real
                warehouse staff ran the process for real.
              </p>
              <div className="rounded p-3"
                style={{ background: 'rgba(245,158,11,0.06)', borderLeft: '2px solid rgba(245,158,11,0.35)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  This is not an AI limitation that a better model will fix. The gap between the operational
                  model and operational reality is precisely what the pilot exists to expose. The finding IS the
                  gap. AI can help design the experiment; only the experiment itself can produce the finding.
                </p>
              </div>
            </div>

            {/* The honest readout */}
            <div className="rounded-lg p-5"
              style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.65)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The strongest version uses AI to design the pilot faster and analyze results more thoroughly,
                while running the actual pilot with the same operational rigor the traditional approach demands.
                AI shortened the design phase by several days and surfaced the courier problem earlier than the
                team would have caught it manually. It did not change what the pilot was for or what it found.
                The structural faults in the delivery model were only visible when the delivery model actually
                ran. That did not change.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
