'use client'

import { motion, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'

// Horizontal row: Note-taker · Facilitator (center, primary) · Participant
// cy=105 for all; Facilitator is slightly larger to signal primacy
const ROLES = [
  { id: 'notetaker',   name: 'Note-taker',  sub: 'The observer', cx: 130, cy: 105, headR: 15, bodyW: 26, bodyH: 28 },
  { id: 'facilitator', name: 'Facilitator',  sub: 'The guide',    cx: 320, cy: 105, headR: 18, bodyW: 30, bodyH: 32 },
  { id: 'participant', name: 'Participant',  sub: 'The source',   cx: 510, cy: 105, headR: 15, bodyW: 26, bodyH: 28 },
] as const

// Dome path: base at cy+h, arcs up to apex at cy
function dome(cx: number, cy: number, w: number, h: number) {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

const FILL_DEFAULT   = 'rgba(255,255,255,0.08)'
const STROKE_DEFAULT = 'rgba(255,255,255,0.60)'
const STROKE_FOCAL   = 'rgba(255,255,255,0.78)' // Facilitator slightly brighter

export default function IDIEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const fade    = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const scaleIn = { hidden: { opacity: 0, scale: 0.72 }, visible: { opacity: 1, scale: 1 } }
  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.14, delayChildren: 0.08 } },
  }
  const nodeT = prefersReduced ? { duration: 0 } : { duration: 0.5, ease }
  const lineT = prefersReduced ? { duration: 0 } : { duration: 0.65, ease }

  return (
    <motion.div
      className="w-full flex justify-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      aria-hidden="true"
    >
      {/* viewBox height: body base (137) + name (18) + sub (16) + margin (14) = 185 */}
      <svg viewBox="0 0 640 185" width="100%" style={{ maxWidth: 'var(--width-illustration)', overflow: 'visible' }}>
        <defs>
          {/* Soft glow that blends stroke/fill outward: matches DiamondHero treatment */}
          <filter id="idi-est-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient sage wash */}
        <motion.ellipse
          cx={320} cy={118} rx={280} ry={68}
          fill={`${SAGE}0.06)`}
          variants={fade} transition={lineT}
        />

        {/* Connectors: in the clear gap between figure bodies */}
        {/* OBSERVES: Note-taker → Facilitator (dashed) */}
        <motion.line
          x1={148} y1={105} x2={302} y2={105}
          stroke="rgba(255,255,255,0.14)" strokeWidth={1} strokeDasharray="4 4"
          variants={fade} transition={lineT}
        />
        {/* CONVERSATION: Facilitator → Participant (solid) */}
        <motion.line
          x1={338} y1={105} x2={492} y2={105}
          stroke="rgba(255,255,255,0.20)" strokeWidth={1}
          variants={fade} transition={lineT}
        />

        {/* Connector micro-labels: float between the head circles */}
        <motion.text
          x={225} y={90} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
          variants={fade} transition={lineT}
        >OBSERVES</motion.text>
        <motion.text
          x={415} y={90} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
          variants={fade} transition={lineT}
        >CONVERSATION</motion.text>

        {/* Sage glow halos behind each figure */}
        {ROLES.map((r) => (
          <motion.ellipse
            key={`halo-${r.id}`}
            cx={r.cx} cy={r.cy + r.bodyH / 2}
            rx={r.bodyW + 20} ry={r.headR + r.bodyH + 16}
            fill={`${SAGE}0.12)`}
            variants={fade} transition={lineT}
          />
        ))}

        {/* ── Person silhouettes ── */}
        {ROLES.map((r) => {
          const headCy = r.cy - r.headR - 3 // 3 px neck gap
          const isFocal = r.id === 'facilitator'
          const stroke  = isFocal ? STROKE_FOCAL : STROKE_DEFAULT

          return (
            <motion.g
              key={r.id}
              variants={scaleIn}
              transition={nodeT}
              style={{ transformOrigin: `${r.cx}px ${r.cy}px` } as React.CSSProperties}
            >
              {/* Head */}
              <circle
                cx={r.cx} cy={headCy} r={r.headR}
                fill={FILL_DEFAULT} stroke={stroke} strokeWidth={1.5}
                filter="url(#idi-est-glow)"
              />
              {/* Shoulders / body dome */}
              <path
                d={dome(r.cx, r.cy, r.bodyW, r.bodyH)}
                fill={FILL_DEFAULT} stroke={stroke} strokeWidth={1.5}
                filter="url(#idi-est-glow)"
              />
              {/* Name */}
              <text
                x={r.cx} y={r.cy + r.bodyH + 18}
                textAnchor="middle" fontSize="13" fontWeight="600"
                fontFamily="Inter,sans-serif" fill="rgba(255,255,255,0.82)"
                style={{ userSelect: 'none' }}
              >{r.name}</text>
              {/* Sub-label */}
              <text
                x={r.cx} y={r.cy + r.bodyH + 34}
                textAnchor="middle" fontSize="10.5"
                fontFamily="var(--font-mono)" letterSpacing="0.04em"
                fill="rgba(255,255,255,0.65)"
                style={{ userSelect: 'none' }}
              >{r.sub}</text>
            </motion.g>
          )
        })}
      </svg>
    </motion.div>
  )
}
