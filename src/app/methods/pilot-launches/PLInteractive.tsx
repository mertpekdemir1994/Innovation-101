'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'

const SVG_W = 700, SVG_H = 268

// Pilot zone
const ZN_X = 62, ZN_Y = 44, ZN_W = 342, ZN_H = 170
const ZN_CX = ZN_X + ZN_W / 2
const ZN_CY = ZN_Y + ZN_H / 2

// Feature tiles
const FTILES = [
  { x: 76,  y: 80,  w: 82, h: 22, label: 'ALL FEATURES' },
  { x: 170, y: 80,  w: 82, h: 22, label: 'FULL UX'      },
  { x: 264, y: 80,  w: 82, h: 22, label: 'OPERATIONS'   },
  { x: 108, y: 112, w: 82, h: 22, label: 'SUPPORT'      },
  { x: 214, y: 112, w: 82, h: 22, label: 'ECONOMICS'    },
]

// Metrics
const M_X1 = ZN_X + ZN_W + 14
const M_X2 = 484
const METRICS = [
  { y: 68,  label: 'ACQUISITION COST' },
  { y: 96,  label: '90-DAY RETENTION' },
  { y: 124, label: 'UNIT ECONOMICS'   },
  { y: 152, label: 'OP. LOAD'         },
]

// Gate
const GATE_X = 492, GATE_Y = 50, GATE_W = 118, GATE_H = 158
const GATE_CX = GATE_X + GATE_W / 2
const GATE_CY = GATE_Y + GATE_H / 2

type ZoneId = 'segment' | 'geography' | 'timeframe' | 'solution' | 'metrics' | 'gate'

interface ZoneInfo {
  tag: string
  headline: string
  body: string
  isGate?: boolean
  tradeoff?: string
}

const ZONES: Record<ZoneId, ZoneInfo> = {
  segment: {
    tag: 'BOUNDARY DIMENSION: SEGMENT',
    headline: 'WHO is exposed to the pilot, and critically, who is not.',
    body: 'Who you run the pilot with is the most consequential boundary decision. The segment must be real customers with real context, not hand-picked advocates or internal users. The key question is representativeness: does this segment resemble the broader population you intend to scale to? A tight segment (one company type, one use-case vertical, one cohort) gives you more control and cleaner learning signals. A broader segment gives you better representativeness but more to manage. The choice should be driven by which failure mode worries you more.',
    tradeoff: 'Tradeoff: Tight boundary → cleaner signal, less representative. Broad boundary → better representativeness, harder to instrument and run.',
  },
  geography: {
    tag: 'BOUNDARY DIMENSION: GEOGRAPHY',
    headline: 'WHERE the pilot runs, physically, digitally, or organizationally.',
    body: 'Geography can mean physical location (two cities), digital channel (one platform or storefront), or organizational unit (one division, one region). The principle is the same: bounded exposure creates clean learning signals and protects the rest of the business from operational strain during the learning period. Choose a geography where you have operational reach and can instrument the experience without heroic effort. The question: can you learn what you need to learn here, with the resources you actually have?',
    tradeoff: 'Tradeoff: Smaller geography → easier to run and instrument. Larger geography → more representative of scale conditions.',
  },
  timeframe: {
    tag: 'BOUNDARY DIMENSION: TIMEFRAME',
    headline: 'HOW LONG the pilot runs, with a hard, pre-committed end date.',
    body: 'The end date is not a target; it is a constraint. Setting a definite end date before the pilot begins forces three disciplines: the team must pre-commit to success criteria (what does "good enough" look like at the end?), the analysis must be complete by then (no deferral), and the go/no-go decision must be made (no indefinite extension). Pilots without end dates tend to drift: they become permanent, accumulate exceptions, or the team loses the nerve to call them. The end date keeps the pilot structurally honest.',
    tradeoff: 'Tradeoff: Shorter timeframe → faster learning, may not capture long-run patterns. Longer timeframe → more complete picture, slower to decide.',
  },
  solution: {
    tag: 'THE PRODUCT INSIDE THE ZONE: REAL AND WHOLE',
    headline: 'The solution inside the pilot zone is complete, not minimal.',
    body: 'This is the key distinction from MVP and MLP. The MVP minimizes the product: builds only what is needed to test the core product hypothesis. The pilot runs the FULL, REAL solution, including all the operational apparatus: supply chain, support, fulfilment, billing, the complete customer journey with real money moving through it. A pilot tests the delivery model and operational capability at a bounded scale, not the product concept. What the pilot reveals about operations, unit economics, and support load is the point; if it also reveals product issues, those are valuable bonus findings.',
  },
  metrics: {
    tag: 'INSTRUMENTED METRICS: OPERATIONAL AND CUSTOMER',
    headline: 'What the pilot is designed to measure, agreed before launch.',
    body: 'The metrics a pilot must answer fall into two categories. Customer metrics: acquisition cost, retention at 30/60/90 days, engagement, satisfaction. Operational metrics: support load per customer, fulfilment performance, unit economics at pilot scale, process throughput under real conditions. Both must be agreed before the pilot begins. "Measuring what emerged" is not a pilot; it is an experiment without a hypothesis. Pre-committing to metrics forces the team to state what "good" looks like before the results come in, removing the risk of retrospective justification.',
  },
  gate: {
    tag: 'THE GO / NO-GO GATE: PRE-COMMITTED CRITERIA ONLY',
    headline: 'The gate is the discipline. Pre-committed criteria, applied honestly.',
    body: 'The gate is where the pilot results meet the pre-committed success criteria. GO means proceed to scale, or to the next staged expansion. NO-GO means redesign, pull back, or stop. What makes the gate function is pre-commitment: the criteria are set before the pilot begins, when the team is not yet attached to a result. Criteria set after the results come in tend to bend toward the result: toward whatever the team wants to do next, not toward an honest read of what was learned. Pre-committed criteria keep the gate honest. The gate closes on a date. The answer comes out.',
    isGate: true,
  },
}

const ZONE_BUTTONS: { id: ZoneId; label: string }[] = [
  { id: 'segment',   label: 'SEGMENT' },
  { id: 'geography', label: 'GEOGRAPHY' },
  { id: 'timeframe', label: 'TIMEFRAME' },
  { id: 'solution',  label: 'FULL SOLUTION' },
  { id: 'metrics',   label: 'METRICS' },
  { id: 'gate',      label: 'GO / NO-GO GATE' },
]

export default function PLInteractive() {
  const [active, setActive] = useState<ZoneId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const isActive = (z: ZoneId) => active === z
  const isFaded  = (z: ZoneId) => active !== null && active !== z

  const zoneOpacity = (z: ZoneId) => isFaded(z) ? 0.18 : 1
  const zoneColor   = (z: ZoneId, full: string, dim: string) =>
    isFaded(z) ? dim : full

  const info = active ? ZONES[active] : null

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Interactive pilot zone diagram. Click a zone to explore it."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block', cursor: 'default' }}
      >
        <defs>
          <filter id="pl-int-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="pl-int-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill={`${BRICK}0.55)`} />
          </marker>
        </defs>

        {/* World background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* UN-LAUNCHED labels */}
        {[
          { x: 7, y: 17, text: 'UN-LAUNCHED' },
          { x: 450, y: 17, text: 'MARKETS' },
          { x: 7, y: 254, text: 'MARKETS' },
          { x: 620, y: 195, text: 'UN-LAUNCHED' },
        ].map(({ x, y, text }) => (
          <text key={text + x} x={x} y={y}
            fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`rgba(255,255,255,${active ? 0.05 : 0.10})`} style={{ userSelect: 'none' }}>
            {text}
          </text>
        ))}

        {/* Pilot zone glow (active when solution or zone dims are highlighted) */}
        <motion.rect x={ZN_X} y={ZN_Y} width={ZN_W} height={ZN_H}
          fill={`${BRICK}0.06)`} rx={3}
          filter="url(#pl-int-glow)"
          animate={{ opacity: active && active !== 'segment' && active !== 'geography' && active !== 'timeframe' && active !== 'solution' ? 0.25 : 1 }}
          transition={{ duration: 0.22 }} />

        {/* Pilot zone border */}
        <motion.rect x={ZN_X} y={ZN_Y} width={ZN_W} height={ZN_H}
          fill="none" stroke={`${BRICK}0.70)`} strokeWidth="1.5" rx={3}
          animate={{ opacity: zoneOpacity('solution') }}
          transition={{ duration: 0.22 }} />

        {/* SEGMENT label */}
        <motion.text x={ZN_CX} y={ZN_Y - 12}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={zoneColor('segment', `${BRICK}0.90)`, `${BRICK}0.18)`)}
          style={{ userSelect: 'none', cursor: 'pointer' }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          onClick={() => setActive(active === 'segment' ? null : 'segment')}>
          ⊞ SEGMENT · WHO IS EXPOSED
        </motion.text>

        {/* GEOGRAPHY label */}
        <motion.text
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={zoneColor('geography', `${BRICK}0.90)`, `${BRICK}0.18)`)}
          style={{ userSelect: 'none', cursor: 'pointer' }}
          transform={`rotate(-90 ${ZN_X - 10} ${ZN_CY})`}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          onClick={() => setActive(active === 'geography' ? null : 'geography')}>
          ◈ GEOGRAPHY · WHERE
        </motion.text>

        {/* TIMEFRAME label */}
        <motion.text x={ZN_CX} y={ZN_Y + ZN_H + 14}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={zoneColor('timeframe', `${BRICK}0.90)`, `${BRICK}0.18)`)}
          style={{ userSelect: 'none', cursor: 'pointer' }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          onClick={() => setActive(active === 'timeframe' ? null : 'timeframe')}>
          ⊟ TIMEFRAME · END DATE FIXED
        </motion.text>

        {/* Solution zone interior */}
        <motion.g
          animate={{ opacity: zoneOpacity('solution') }}
          transition={{ duration: 0.22 }}>

          {/* REAL FULL SOLUTION heading */}
          <text x={ZN_CX} y={64}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
            fill={`${BRICK}0.80)`} style={{ userSelect: 'none' }}>
            REAL · FULL SOLUTION
          </text>

          {/* Feature tiles */}
          {FTILES.map((t) => (
            <g key={t.label}>
              <rect x={t.x} y={t.y} width={t.w} height={t.h}
                fill={isActive('solution') ? `${BRICK}0.18)` : `${BRICK}0.10)`}
                stroke={isActive('solution') ? `${BRICK}0.60)` : `${BRICK}0.40)`}
                strokeWidth="1" rx={2} />
              <text x={t.x + t.w / 2} y={t.y + t.h / 2}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill={`${BRICK}0.90)`} style={{ userSelect: 'none' }}>
                {t.label}
              </text>
            </g>
          ))}

          {/* Operations annotation */}
          <text x={ZN_CX} y={148}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${BRICK}0.40)`} style={{ userSelect: 'none' }}>
            REAL OPERATIONS · REAL CUSTOMERS · REAL MONEY
          </text>
        </motion.g>

        {/* Invisible hit area for solution zone */}
        <rect x={ZN_X + 4} y={ZN_Y + 4} width={ZN_W - 8} height={ZN_H - 8}
          fill="transparent" rx={2} style={{ cursor: 'pointer' }}
          onClick={() => setActive(active === 'solution' ? null : 'solution')}
          aria-label="Click to explore the full solution inside the zone"
          role="button" aria-pressed={active === 'solution'} />

        {/* Metric lines */}
        <motion.g
          animate={{ opacity: zoneOpacity('metrics') }}
          transition={{ duration: 0.22 }}>
          {METRICS.map((m) => (
            <g key={m.label}>
              <line x1={M_X1} y1={m.y} x2={M_X2} y2={m.y}
                stroke={isActive('metrics') ? `${BRICK}0.75)` : `${BRICK}0.50)`}
                strokeWidth="1" markerEnd="url(#pl-int-arr)" />
              <text x={M_X1 + (M_X2 - M_X1) / 2} y={m.y - 5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={isActive('metrics') ? `${BRICK}0.75)` : `${BRICK}0.50)`}
                style={{ userSelect: 'none' }}>
                {m.label}
              </text>
            </g>
          ))}
        </motion.g>

        {/* Invisible hit area for metrics */}
        <rect x={M_X1 - 4} y={GATE_Y} width={M_X2 - M_X1 + 8} height={GATE_H}
          fill="transparent" style={{ cursor: 'pointer' }}
          onClick={() => setActive(active === 'metrics' ? null : 'metrics')}
          aria-label="Click to explore metrics" role="button" aria-pressed={active === 'metrics'} />

        {/* Gate */}
        <motion.g
          animate={{ opacity: zoneOpacity('gate') }}
          transition={{ duration: 0.22 }}>
          <rect x={GATE_X} y={GATE_Y} width={GATE_W} height={GATE_H}
            fill={isActive('gate') ? `${BRICK}0.12)` : `${BRICK}0.07)`}
            stroke={isActive('gate') ? `${BRICK}0.80)` : `${BRICK}0.60)`}
            strokeWidth="1.5" rx={3}
            filter="url(#pl-int-glow)" />
          <text x={GATE_CX} y={GATE_CY - 14}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
            fill={`${BRICK}0.90)`} style={{ userSelect: 'none' }}>
            GO / NO-GO
          </text>
          <text x={GATE_CX} y={GATE_CY + 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`${BRICK}0.55)`} style={{ userSelect: 'none' }}>
            PRE-COMMITTED
          </text>
          <text x={GATE_CX} y={GATE_CY + 13}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`${BRICK}0.55)`} style={{ userSelect: 'none' }}>
            CRITERIA
          </text>
        </motion.g>

        {/* Gate hit area */}
        <rect x={GATE_X} y={GATE_Y} width={GATE_W} height={GATE_H}
          fill="transparent" rx={3} style={{ cursor: 'pointer' }}
          onClick={() => setActive(active === 'gate' ? null : 'gate')}
          aria-label="Click to explore the go/no-go gate" role="button" aria-pressed={active === 'gate'} />
      </svg>

      {/* Zone legend */}
      <div className="flex flex-wrap gap-2 mt-4 mb-6">
        {ZONE_BUTTONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(active === id ? null : id)}
            aria-pressed={active === id}
            className="rounded-full px-3 py-1 text-xs font-mono tracking-widest transition-all"
            style={{
              background: active === id ? `${BRICK}0.18)` : 'transparent',
              color: active === id ? `${BRICK}0.90)` : `${BRICK}0.45)`,
              border: `1px solid ${active === id ? `${BRICK}0.50)` : `${BRICK}0.20)`}`,
            }}
          >
            {label}
          </button>
        ))}
        {active && (
          <button
            onClick={() => setActive(null)}
            className="rounded-full px-3 py-1 text-xs font-mono tracking-widest transition-all"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.30)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {info && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.20, ease }}
            className="rounded-lg p-5"
            style={{
              background: active === 'gate' ? `${BRICK}0.08)` : `${BRICK}0.05)`,
              border: `1px solid ${active === 'gate' ? `${BRICK}0.30)` : `${BRICK}0.18)`}`,
            }}
          >
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
              {info.tag}
            </p>
            <p className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-base)', color: '#FAFAFA', lineHeight: 1.35 }}>
              {info.headline}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)' }}>
              {info.body}
            </p>
            {info.tradeoff && (
              <div className="mt-3 rounded px-3 py-2"
                style={{ background: `${BRICK}0.08)`, borderLeft: `2px solid ${BRICK}0.35)` }}>
                <p className="font-mono" style={{ fontSize: 'var(--text-xs)', color: `${BRICK}0.70)` }}>
                  {info.tradeoff}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p className="font-mono text-center"
          style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.09em' }}>
          CLICK ANY ELEMENT OR LABEL TO EXPLORE
        </p>
      )}
    </div>
  )
}
