'use client'

import { motion, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'

const CARDS = [
  { id: 'optimizer', name: 'The Optimizer', sub: 'The power user',   goal: 'Total control',     frustration: 'Apps lack depth',      cx: 120 },
  { id: 'avoider',   name: 'The Avoider',   sub: 'The anxious one',  goal: 'Feel reassured',    frustration: 'Apps amplify anxiety', cx: 360 },
  { id: 'newcomer',  name: 'The Newcomer',  sub: 'The first-timer',  goal: 'Learn the basics',  frustration: "It's all jargon",      cx: 600 },
] as const

const CW = 62   // card half-width
const CT = 22   // card top y
const CH = 193  // card height

function dome(cx: number, cy: number, w: number, h: number) {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

export default function PAEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const fade   = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const riseIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.13, delayChildren: 0.06 } },
  }
  const cardT = prefersReduced ? { duration: 0 } : { duration: 0.5, ease }
  const glowT = prefersReduced ? { duration: 0 } : { duration: 0.7, ease }

  return (
    <motion.div
      className="w-full flex justify-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      aria-hidden="true"
    >
      {/* viewBox 720×258: 3 cards + captions below */}
      <svg viewBox="0 0 720 258" width="100%" style={{ maxWidth: 'var(--width-illustration)', overflow: 'visible' }}>
        <defs>
          <filter id="pa-est-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient navy wash behind all three cards */}
        <motion.ellipse
          cx={360} cy={118} rx={320} ry={92}
          fill={`${NAVY}0.10)`}
          variants={fade} transition={glowT}
        />

        {CARDS.map(({ id, name, sub, goal, frustration, cx }) => {
          const headCy = CT + 36    // y=58: head circle center
          const bodyCy = headCy + 12 + 3  // y=73: dome arc baseline (neck gap=3)
          const bodyH  = 20

          return (
            <motion.g key={id} variants={riseIn} transition={cardT}>

              {/* Card frame: visible navy surface on the dark page */}
              <rect
                x={cx - CW} y={CT}
                width={CW * 2} height={CH}
                rx={6}
                fill={`${NAVY}0.45)`}
                stroke="rgba(255,255,255,0.28)" strokeWidth={1}
                filter="url(#pa-est-glow)"
              />

              {/* Avatar: head */}
              <circle
                cx={cx} cy={headCy}
                r={12}
                fill="rgba(255,255,255,0.12)"
                stroke="rgba(255,255,255,0.88)" strokeWidth={1.5}
              />
              {/* Avatar: shoulders dome (no divider line through the figure) */}
              <path
                d={dome(cx, bodyCy, 17, bodyH)}
                fill="rgba(255,255,255,0.12)"
                stroke="rgba(255,255,255,0.88)" strokeWidth={1.5}
              />

              {/* ── GOAL ── */}
              <text
                x={cx} y={115}
                textAnchor="middle" fontSize="5.5"
                fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill="rgba(255,255,255,0.48)"
                style={{ userSelect: 'none' }}
              >GOAL</text>
              <text
                x={cx} y={129}
                textAnchor="middle" fontSize="8"
                fontFamily="var(--font-body, Inter, sans-serif)"
                fill="rgba(255,255,255,0.88)"
                style={{ userSelect: 'none' }}
              >{goal}</text>

              {/* ── FRUSTRATION ── */}
              <text
                x={cx} y={149}
                textAnchor="middle" fontSize="5.5"
                fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill="rgba(255,255,255,0.48)"
                style={{ userSelect: 'none' }}
              >FRUSTRATION</text>
              <text
                x={cx} y={163}
                textAnchor="middle" fontSize="8"
                fontFamily="var(--font-body, Inter, sans-serif)"
                fill="rgba(255,255,255,0.88)"
                style={{ userSelect: 'none' }}
              >{frustration}</text>

              {/* ── Caption below the card ── */}
              <text
                x={cx} y={228}
                textAnchor="middle" fontSize="13" fontWeight="600"
                fontFamily="var(--font-body, Inter, sans-serif)"
                fill="rgba(255,255,255,0.82)"
                style={{ userSelect: 'none' }}
              >{name}</text>
              <text
                x={cx} y={244}
                textAnchor="middle" fontSize="10"
                fontFamily="var(--font-mono)" letterSpacing="0.04em"
                fill="rgba(255,255,255,0.675)"
                style={{ userSelect: 'none' }}
              >{sub}</text>

            </motion.g>
          )
        })}
      </svg>
    </motion.div>
  )
}
