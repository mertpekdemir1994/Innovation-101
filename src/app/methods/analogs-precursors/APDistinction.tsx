'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(181,97,62,'

// Mini SVG geometry: showing just the two axes
const M_W = 280
const M_H = 160
const M_OX = 56
const M_OY = 132
const M_AX_END = 268
const M_PR_END = 16

type Side = 'analogs' | 'precursors'

export default function APDistinction() {
  const [side, setSide] = useState<Side>('analogs')
  const prefersReduced = useReducedMotion()
  const isAnalogs = side === 'analogs'

  const transIn  = prefersReduced ? { duration: 0 } : { duration: 0.20 }

  const analogAxisO  = isAnalogs ? '0.90' : '0.18'
  const precurAxisO  = isAnalogs ? '0.18' : '0.68'

  return (
    <div className="w-full space-y-5">
      {/* Toggle */}
      <div className="flex gap-2">
        {(['analogs', 'precursors'] as Side[]).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: side === s ? `${CLAY}0.10)` : 'transparent',
              border: `1px solid ${side === s ? `${CLAY}0.35)` : 'var(--color-neutral-100)'}`,
              color: side === s ? `${CLAY}1)` : 'var(--color-neutral-600)',
            }}
          >
            {s === 'analogs' ? 'Analogs (→)' : 'Precursors (↑)'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Mini axis SVG */}
        <div className="flex justify-center">
          <svg
            viewBox={`0 0 ${M_W} ${M_H}`}
            width="100%"
            style={{ maxWidth: 300, overflow: 'visible' }}
            aria-label={`Two axes diagram: ${isAnalogs ? 'horizontal analogs axis highlighted' : 'vertical precursors axis highlighted'}`}
          >
            {/* Analogs axis */}
            <motion.line
              x1={M_OX} y1={M_OY} x2={M_AX_END} y2={M_OY}
              stroke={`${CLAY}${analogAxisO})`}
              strokeWidth={isAnalogs ? 2.5 : 1.5}
              animate={{ opacity: 1 }}
              transition={transIn}
            />
            <path
              d={`M ${M_AX_END - 6} ${M_OY - 4} L ${M_AX_END + 1} ${M_OY} L ${M_AX_END - 6} ${M_OY + 4}`}
              stroke={`${CLAY}${analogAxisO})`} strokeWidth={isAnalogs ? 2 : 1.5} fill="none"
              strokeLinecap="round" strokeLinejoin="round"
            />
            <text
              x={M_AX_END + 5} y={M_OY}
              dominantBaseline="middle"
              fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${CLAY}${isAnalogs ? '0.85' : '0.20'})`}
              style={{ userSelect: 'none' }}
            >→</text>

            {/* Precursors axis */}
            <motion.line
              x1={M_OX} y1={M_OY} x2={M_OX} y2={M_PR_END}
              stroke={`rgba(255,255,255,${precurAxisO})`}
              strokeWidth={!isAnalogs ? 2.5 : 1.5}
              animate={{ opacity: 1 }}
              transition={transIn}
            />
            <path
              d={`M ${M_OX - 4} ${M_PR_END + 8} L ${M_OX} ${M_PR_END + 1} L ${M_OX + 4} ${M_PR_END + 8}`}
              stroke={`rgba(255,255,255,${precurAxisO})`} strokeWidth={!isAnalogs ? 2 : 1.5} fill="none"
              strokeLinecap="round" strokeLinejoin="round"
            />
            <text
              x={M_OX} y={M_PR_END - 4}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="7" fontFamily="var(--font-mono)"
              fill={`rgba(255,255,255,${!isAnalogs ? '0.80' : '0.18'})`}
              style={{ userSelect: 'none' }}
            >↑</text>

            {/* Axis labels */}
            <text
              x={(M_OX + M_AX_END) / 2} y={M_OY + 14}
              textAnchor="middle"
              fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${CLAY}${isAnalogs ? '0.75' : '0.16'})`}
              style={{ userSelect: 'none' }}
            >ANALOGS / ACROSS INDUSTRIES</text>
            <text
              x={M_OX - 10} y={(M_OY + M_PR_END) / 2}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="6" fontFamily="var(--font-mono)"
              fill={`rgba(255,255,255,${!isAnalogs ? '0.58' : '0.14'})`}
              style={{ userSelect: 'none' }}
              transform={`rotate(-90, ${M_OX - 10}, ${(M_OY + M_PR_END) / 2})`}
            >PRECURSORS / BACK IN TIME</text>

            {/* Origin */}
            <circle
              cx={M_OX} cy={M_OY} r={5}
              fill={`${CLAY}0.16)`}
              stroke={`${CLAY}0.85)`}
              strokeWidth={1.5}
            />
          </svg>
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          {isAnalogs ? (
            <motion.div
              key="analogs-detail"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={transIn}
              className="space-y-4"
            >
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">Direction</p>
                <p className="text-sm font-semibold text-neutral-800">Lateral — across other industries, in the present</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">The question</p>
                <p className="text-sm text-neutral-700">&ldquo;Who else has already solved a version of this?&rdquo;</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">The core skill</p>
                <p className="text-sm text-neutral-700">
                  <strong>Abstraction.</strong> Moving from a surface similarity to a structural one —
                  recognising that two contexts are solving the same underlying problem even when they look nothing alike.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">The payoff</p>
                <p className="text-sm text-neutral-700">
                  <strong>Freshness from distance.</strong> The further the analog from your industry,
                  the less obvious the connection, and the more genuinely novel the borrowed principle feels when applied.
                </p>
              </div>
              <div className="rounded p-3 text-xs text-neutral-600 leading-relaxed"
                style={{ background: `${CLAY}0.06)`, borderLeft: `2px solid ${CLAY}0.35)` }}>
                The abstracted principle is the deliverable, not the example. &ldquo;Hotels do X&rdquo; is a starting observation.
                &ldquo;Dignity-centred service requires choreographing every handoff, not just the moments guests notice&rdquo; is a principle you can act on.
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="precursors-detail"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={transIn}
              className="space-y-4"
            >
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">Direction</p>
                <p className="text-sm font-semibold text-neutral-800">Backward — through your own industry&rsquo;s history</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">The question</p>
                <p className="text-sm text-neutral-700">&ldquo;Who tried this before, and what happened to them?&rdquo;</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">The core skill</p>
                <p className="text-sm text-neutral-700">
                  <strong>Timing diagnosis.</strong> Distinguishing ideas that failed because they were structurally flawed
                  from ideas that failed because the infrastructure, cost curve, or behavioural readiness was not yet in place.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">The payoff</p>
                <p className="text-sm text-neutral-700">
                  <strong>Hindsight as advantage.</strong> If a good idea ran ahead of its time,
                  the world may now have provided what it lacked. A ripe idea may be hiding in your industry&rsquo;s history —
                  already validated by the need, already refined through failure.
                </p>
              </div>
              <div className="rounded p-3 text-xs text-neutral-600 leading-relaxed"
                style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '2px solid rgba(255,255,255,0.20)' }}>
                The diagnosis is the deliverable, not the history. &ldquo;This was tried in 2008&rdquo; is a fact.
                &ldquo;It stalled because the cost curve had not moved, and the cost curve has now moved&rdquo; is a timing argument that justifies a new attempt.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
