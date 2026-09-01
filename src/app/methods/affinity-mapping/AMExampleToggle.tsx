'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY  = 'rgba(31,58,95,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional Affinity Mapping' },
  { id: 'ai',          label: 'With AI Assistance' },
]

export default function AMExampleToggle() {
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
              color: tab === t.id ? '#fff' : `${NAVY}0.70)`,
              border: `1.5px solid ${tab === t.id ? `${NAVY}0.70)` : `${NAVY}0.30)`}`,
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
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.18)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >Scenario</p>
              <p
                className="font-semibold mb-2"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
              >IDEO and Oral-B redesigning the children&rsquo;s toothbrush</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The IDEO team has completed field research: observing children brushing at home, interviewing parents, and shadowing paediatric dentists. They now have over 90 individual observations written on cards. The affinity mapping session is the moment where those observations become insights.
              </p>
            </div>

            {/* Research cards → cluster */}
            <div className="mb-6">
              <p
                className="font-mono uppercase tracking-widest mb-4"
                style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
              >The raw observations, before clustering</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {[
                  { obs: 'Child grips the brush with whole fist: all four fingers wrapped around the handle.', note: 'Observation' },
                  { obs: 'Child&rsquo;s arm shakes when trying to hold a thin grip. Brush slips.', note: 'Observation' },
                  { obs: 'Parent says: "She just can\'t control it. She ends up poking herself."', note: 'Parent interview' },
                  { obs: 'Dentist: "Children under eight don\'t have the fine motor control for a thin handle."', note: 'Expert interview' },
                  { obs: 'Child holds pencil with fist, not pincer. Same pattern across all children observed.', note: 'Observation' },
                  { obs: 'Child with fatter handle (a rubber toy) brushes more confidently, less slipping.', note: 'Observation' },
                ].map(({ obs, note }, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4"
                    style={{
                      background: 'var(--color-neutral-50)',
                      border: '1px solid var(--color-neutral-100)',
                    }}
                  >
                    <p
                      className="font-mono uppercase tracking-widest mb-1.5"
                      style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
                    >{note}</p>
                    <p
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}
                      dangerouslySetInnerHTML={{ __html: obs }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* The cluster that emerges */}
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.22)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.60)` }}
              >The cluster that emerged</p>
              <p
                className="font-semibold mb-3"
                style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)', lineHeight: 1.35 }}
              >
                Children brush with their whole fist: the standard thin handle fights the grip they actually have
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Six separate observations (from field visits, parent interviews, and expert input) cluster together around a single pattern. No individual card says this. The insight exists only in the grouping. The team named the cluster as an insight, not as a category (&ldquo;grip issues&rdquo;), which made the design direction immediate.
              </p>
            </div>

            {/* Design direction */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
              >What the cluster made possible</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The named insight, children brush with their whole fist, pointed directly to a design direction that Oral-B had never considered: make the handle fatter. Not a feature. Not an aesthetic update. A structural change that matched the grip children actually use. The Oral-B Squish Grip became one of the most commercially successful product redesigns of its decade. The insight was not in any single observation. It was in the cluster.
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
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}
              >Same research: AI assistance applied</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The same 90 observation cards are fed to an AI as text. The AI is asked to perform affinity mapping: group the observations into themes and label each group.
              </p>
            </div>

            {/* AI clusters */}
            <div className="space-y-3 mb-6">
              {[
                {
                  category: 'Grip & Handling',
                  count: 12,
                  sample: '"whole fist grip," "brush slips," "can\'t control it," "fatter handle helped"',
                  verdict: 'ACCURATE BUT FLAT',
                  note: 'AI correctly identifies grip-related observations and groups them together. The category label is accurate. But it tells the team nothing they could not have read from the cards themselves.',
                },
                {
                  category: 'Motor Skills',
                  count: 9,
                  sample: '"arm shakes," "fine motor control," "pincer grip not developed," "pencil grip pattern"',
                  verdict: 'DUPLICATES THE CLUSTER',
                  note: 'AI creates a second cluster that overlaps significantly with "Grip & Handling." The motor development observations and the grip observations describe the same underlying pattern, but AI does not recognize this because it is matching keywords, not meaning.',
                },
                {
                  category: 'Parent Feedback',
                  count: 11,
                  sample: '"she can\'t control it," "ends up poking herself," "needs supervision," "gives up halfway"',
                  verdict: 'GROUPS BY SOURCE',
                  note: 'AI groups observations by who provided them (parents) rather than by what they reveal. Parent observations about grip difficulty belong with the grip cluster, but AI keeps them separate. The signal is scattered across categories.',
                },
                {
                  category: 'Brushing Confidence',
                  count: 7,
                  sample: '"less slipping," "brushes more confidently," "enjoys it more," "asks to brush again"',
                  verdict: 'MISSES THE CAUSE',
                  note: 'The confidence improvement observations are caused by a different handle, but AI files them under behaviour rather than connecting them to the grip pattern. The most design-relevant link in the entire dataset is not visible in the clustering.',
                },
              ].map(item => (
                <div
                  key={item.category}
                  className="rounded-lg overflow-hidden"
                  style={{ border: `1px solid ${INDIGO}0.16)` }}
                >
                  <div
                    className="px-5 py-3 flex items-center justify-between gap-4"
                    style={{ background: `${INDIGO}0.08)`, borderBottom: `1px solid ${INDIGO}0.10)` }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-semibold"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                      >{item.category}</span>
                      <span
                        className="font-mono"
                        style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.60)` }}
                      >{item.count} cards</span>
                    </div>
                    <span
                      className="font-mono uppercase tracking-widest shrink-0"
                      style={{
                        fontSize: 'var(--text-2xs)',
                        color: item.verdict === 'ACCURATE BUT FLAT' ? `${INDIGO}0.60)` : 'rgba(245,158,11,0.72)',
                      }}
                    >{item.verdict}</span>
                  </div>
                  <div className="p-4">
                    <p
                      className="mb-2 italic"
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}
                    >Sample cards: {item.sample}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* What AI missed */}
            <div
              className="rounded-xl p-6 mb-4"
              style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.18)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >The insight AI could not make</p>
              <p
                className="font-semibold mb-2"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', lineHeight: 1.35 }}
              >
                Children brush with their whole fist: the standard thin handle fights the grip they actually have
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                AI split the relevant observations across three separate categories (Grip &amp; Handling, Motor Skills, Parent Feedback) and did not recognize that observations about confidence improvement were caused by a handle shape change. The singular insight that led to the Oral-B Squish Grip is not visible anywhere in the AI output. It required a human to see what the four categories had in common.
              </p>
            </div>

            {/* Synthesis */}
            <div
              className="rounded-xl p-5"
              style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.22)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >What this tells you about AI + affinity mapping</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI groups by surface similarity and keyword co-occurrence: useful for initial sorting, unreliable for insight generation. Use it to organize volume before the session, not to replace the session. The naming step, converting a cluster into a statement that reveals meaning, not just topic, requires the researcher who was in the room. The insight that changed Oral-B required seeing across categories, not within them.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
