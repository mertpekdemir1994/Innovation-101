'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'

// SVG layout: 960 × 420 (horizontal scale 1.5x applied to the original
// 640-wide composition — every x-coordinate below is the original × 1.5,
// giving the hero a cinematic ~2.3:1 frame while leaving every y-coordinate,
// and so the quadrant grid's proportions, completely untouched)
// Quadrant centers: S top-left (internal+helpful) = Strengths, W top-right (internal+harmful) = Weaknesses
// O bottom-left (external+helpful) = Opportunities, T bottom-right (external+harmful) = Threats
// Grid lines cross at cx=480, cy=210

// `color` drives the line/dots (only needs 3:1); `textColor` is a brightened
// variant for the move label, since plain PLUM/red/blue fail 4.5:1 on this
// dark background at the opacities `color` uses
const CROSSINGS = [
  { id: 'so', label: 'S × O', move: 'PRESS',   x1: 240, y1: 100, x2: 240, y2: 310, color: `${PLUM}0.85)`, textColor: 'rgba(166,147,174,0.90)' },
  { id: 'wt', label: 'W × T', move: 'DEFEND',  x1: 720, y1: 100, x2: 720, y2: 310, color: 'rgba(220,38,38,0.70)', textColor: 'rgba(248,113,113,0.90)' },
  { id: 'st', label: 'S × T', move: 'COUNTER', x1: 240, y1: 100, x2: 720, y2: 310, color: 'rgba(245,158,11,0.75)', textColor: 'rgba(245,158,11,0.75)' },
  { id: 'wo', label: 'W × O', move: 'BUILD',   x1: 720, y1: 100, x2: 240, y2: 310, color: 'rgba(59,130,246,0.75)', textColor: 'rgba(96,165,250,0.90)' },
]

const QUADRANTS = [
  { id: 's', label: 'STRENGTHS',     axis: 'Internal · Helpful', cx: 240, cy: 100, items: ['Loyal customer base', 'Dense local footprint', 'Supplier relationships'] },
  { id: 'w', label: 'WEAKNESSES',    axis: 'Internal · Harmful', cx: 720, cy: 100, items: ['Weak digital presence', 'Limited delivery logistics', 'Thin margins'] },
  { id: 'o', label: 'OPPORTUNITIES', axis: 'External · Helpful', cx: 240, cy: 310, items: ['"Shop local" sentiment', 'Convenience demand', 'Untapped delivery market'] },
  { id: 't', label: 'THREATS',       axis: 'External · Harmful', cx: 720, cy: 310, items: ['National online entrant', 'Changing consumer habits', 'Price competition'] },
]

export default function SWOTEstablishing() {
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const axisT = prefersReduced ? { duration: 0 } : { duration: 0.6, ease }
  const itemT  = prefersReduced ? { duration: 0 } : { duration: 0.4, ease }
  const lineT  = prefersReduced ? { duration: 0 } : { duration: 0.7, ease }

  const container = {
    hidden: {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const lineContainer = {
    hidden: {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.25, delayChildren: 0.8 } },
  }

  return (
    <motion.div
      className="w-full flex justify-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      role="img"
      aria-label="SWOT grid showing four quadrants and cross-pairing connections"
    >
      <svg viewBox="0 0 960 420" width="100%" style={{ margin: '0 auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="swot-est-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="swot-est-line-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ambient plum wash */}
        <motion.ellipse
          cx={480} cy={210} rx={420} ry={180}
          fill={`${PLUM}0.06)`}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={axisT}
        />

        {/* ── Axis lines ── */}
        <motion.g variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={axisT}>
          {/* Vertical axis */}
          <line x1={480} y1={30} x2={480} y2={390} stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="4 4" />
          {/* Horizontal axis */}
          <line x1={45} y1={210} x2={915} y2={210} stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="4 4" />

          {/* Axis labels */}
          <text x={480} y={20} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize={11} fontFamily="var(--font-mono)" letterSpacing="0.10em">INTERNAL</text>
          <text x={480} y={408} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize={11} fontFamily="var(--font-mono)" letterSpacing="0.10em">EXTERNAL</text>
          <text x={33} y={213} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize={11} fontFamily="var(--font-mono)" letterSpacing="0.08em" transform="rotate(-90,33,213)">HELPFUL</text>
          <text x={927} y={213} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize={11} fontFamily="var(--font-mono)" letterSpacing="0.08em" transform="rotate(90,927,213)">HARMFUL</text>
        </motion.g>

        {/* ── Quadrant labels + items ── */}
        <motion.g variants={container}>
          {QUADRANTS.map(q => (
            <motion.g
              key={q.id}
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
              transition={itemT}
            >
              {/* Quadrant label */}
              <text
                x={q.cx} y={q.cy - 50}
                textAnchor="middle"
                fill="rgba(255,255,255,0.55)"
                fontSize={11}
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
                fontWeight={600}
              >{q.label}</text>
              {/* Axis position */}
              <text
                x={q.cx} y={q.cy - 32}
                textAnchor="middle"
                fill="rgba(255,255,255,0.61)"
                fontSize={11}
                fontFamily="var(--font-mono)"
                letterSpacing="0.06em"
              >{q.axis}</text>
              {/* Items - plain, inert */}
              {q.items.map((item, i) => (
                <text
                  key={i}
                  x={q.cx} y={q.cy - 12 + i * 18}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.69)"
                  fontSize={11}
                  fontFamily="var(--font-body)"
                >· {item}</text>
              ))}
            </motion.g>
          ))}
        </motion.g>

        {/* -- Cross-pairing lines - these GLOW, boxes do not -- */}
        <motion.g variants={lineContainer}>
          {CROSSINGS.map(c => (
            <motion.g
              key={c.id}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={lineT}
              filter="url(#swot-est-line-glow)"
            >
              <line
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke={c.color}
                strokeWidth={2}
                strokeLinecap="round"
              />
              {/* Move label at midpoint */}
              <text
                x={(c.x1 + c.x2) / 2 + (c.id === 'st' ? 60 : c.id === 'wo' ? -60 : 0)}
                y={(c.y1 + c.y2) / 2 + (c.id === 'so' ? -8 : c.id === 'wt' ? -8 : 0)}
                textAnchor="middle"
                fill={c.textColor}
                fontSize={11}
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
                fontWeight={600}
              >{c.move}</text>
              {/* Dots at endpoints */}
              <circle cx={c.x1} cy={c.y1} r={4} fill={c.color} opacity={0.8} />
              <circle cx={c.x2} cy={c.y2} r={4} fill={c.color} opacity={0.8} />
            </motion.g>
          ))}
        </motion.g>
      </svg>

      {/* Screen reader summary */}
      <p className="sr-only">
        SWOT grid with four quadrants: Strengths (internal, helpful), Weaknesses (internal, harmful),
        Opportunities (external, helpful), Threats (external, harmful). Four cross-pairing connections:
        Strengths × Opportunities = PRESS, Weaknesses × Threats = DEFEND, Strengths × Threats = COUNTER,
        Weaknesses × Opportunities = BUILD.
      </p>
    </motion.div>
  )
}
