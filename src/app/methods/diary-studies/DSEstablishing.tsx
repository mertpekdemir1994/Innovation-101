'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE

const SVG_W = 700
const SVG_H = 268
const AXIS_Y = 200
const AXIS_X0 = 54
const AXIS_X1 = 642
const CW = 86
const CH = 54

type EntryDef = {
  id: number
  x: number
  day: string
  time: string
  context: string
  location: string
  emotion: string
  pattern: boolean
  cardY: number
}

const ENTRIES: EntryDef[] = [
  { id: 0, x: 92,  day: 'DAY 1',  time: '7:30 AM',  context: 'ROUTINE',   location: 'Home',       emotion: 'NEUTRAL',    pattern: false, cardY: 116 },
  { id: 1, x: 186, day: 'DAY 3',  time: '1:15 PM',  context: 'WORK DESK', location: 'Work',       emotion: 'FRUSTRATED', pattern: true,  cardY: 72  },
  { id: 2, x: 280, day: 'DAY 5',  time: '9:00 PM',  context: 'EVENING',   location: 'Home',       emotion: 'SATISFIED',  pattern: false, cardY: 103 },
  { id: 3, x: 378, day: 'DAY 7',  time: '7:45 PM',  context: 'OUT',       location: 'Restaurant', emotion: 'AVOIDANT',   pattern: true,  cardY: 76  },
  { id: 4, x: 472, day: 'DAY 10', time: '8:20 AM',  context: 'TRANSIT',   location: 'Train',      emotion: 'FRUSTRATED', pattern: true,  cardY: 110 },
  { id: 5, x: 570, day: 'DAY 13', time: '11:00 AM', context: 'WEEKEND',   location: 'Home',       emotion: 'RESIGNED',   pattern: true,  cardY: 84  },
]

export default function DSEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  return (
    <div className="w-full" aria-hidden="true">
      <svg ref={ref} viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
        preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <defs>
          <filter id="ds-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feFlood floodColor={`${SAGE}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Time axis */}
        <motion.line x1={AXIS_X0} y1={AXIS_Y} x2={AXIS_X1} y2={AXIS_Y}
          stroke="rgba(255,255,255,0.18)" strokeWidth={1}
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: prefersReduced ? 0 : 0.05 }}
        />
        <motion.polygon
          points={`${AXIS_X1},${AXIS_Y} ${AXIS_X1 - 7},${AXIS_Y - 3.5} ${AXIS_X1 - 7},${AXIS_Y + 3.5}`}
          fill="rgba(255,255,255,0.20)"
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: prefersReduced ? 0 : 0.48 }}
        />

        {/* Axis labels */}
        <motion.text x={AXIS_X0} y={AXIS_Y - 6}
          fontSize="5" fontFamily="system-ui, sans-serif" letterSpacing="0.10em"
          fill="rgba(255,255,255,0.64)" style={{ userSelect: 'none' }}
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: prefersReduced ? 0 : 0.08 }}
        >TIME →</motion.text>

        <motion.text x={AXIS_X1 + 6} y={AXIS_Y + 4}
          fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: prefersReduced ? 0 : 0.50 }}
        >14 DAYS</motion.text>

        {/* Entry cards */}
        {ENTRIES.map((e, i) => {
          const delay = prefersReduced ? 0 : i * 0.09 + 0.18
          const cx = e.x
          const cy = e.cardY
          const cardL = cx - CW / 2
          const tickBottom = cy + CH

          return (
            <motion.g key={e.id}
              initial={{ opacity: 0, y: 14 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.40, delay }}
            >
              {/* Dashed tick from card bottom to axis */}
              <line x1={cx} y1={tickBottom} x2={cx} y2={AXIS_Y}
                stroke={e.pattern ? `${SAGE}0.22)` : 'rgba(255,255,255,0.10)'}
                strokeWidth={0.8} strokeDasharray="3 2" />

              {/* Axis tick mark */}
              <line x1={cx} y1={AXIS_Y - 4} x2={cx} y2={AXIS_Y + 4}
                stroke={e.pattern ? `${SAGE}0.50)` : 'rgba(255,255,255,0.22)'}
                strokeWidth={e.pattern ? 1.2 : 0.8} />

              {/* Day label */}
              <text x={cx} y={AXIS_Y + 11} textAnchor="middle"
                fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.05em"
                fill={e.pattern ? `${SAGE_TEXT}0.905)` : 'rgba(255,255,255,0.63)'}
                style={{ userSelect: 'none' }}>{e.day}</text>

              {/* Glow behind pattern cards */}
              {e.pattern && (
                <rect x={cardL - 1} y={cy - 1} width={CW + 2} height={CH + 2} rx={4}
                  fill="none" stroke={`${SAGE}0.18)`} strokeWidth={4}
                  style={{ filter: 'url(#ds-est-glow)' }} />
              )}

              {/* Card */}
              <rect x={cardL} y={cy} width={CW} height={CH} rx={3}
                fill={e.pattern ? `${SAGE}0.07)` : 'rgba(255,255,255,0.03)'}
                stroke={e.pattern ? `${SAGE}0.32)` : 'rgba(255,255,255,0.10)'}
                strokeWidth={0.8} />

              {/* Context */}
              <text x={cx} y={cy + 14} textAnchor="middle"
                fontSize="6.5" fontFamily="system-ui, sans-serif"
                fontWeight="600" letterSpacing="0.08em"
                fill={e.pattern ? `${SAGE_TEXT}0.983)` : 'rgba(255,255,255,0.74)'}
                style={{ userSelect: 'none' }}>{e.context}</text>

              {/* Time + location */}
              <text x={cx} y={cy + 25} textAnchor="middle"
                fontSize="4.5" fontFamily="system-ui, sans-serif"
                fill="rgba(255,255,255,0.65)"
                style={{ userSelect: 'none' }}>{`${e.time} · ${e.location}`}</text>

              {/* Divider */}
              <line x1={cardL + 8} y1={cy + 32} x2={cardL + CW - 8} y2={cy + 32}
                stroke="rgba(255,255,255,0.08)" strokeWidth={0.7} />

              {/* Emotion */}
              <text x={cx} y={cy + 44} textAnchor="middle"
                fontSize="5" fontFamily="system-ui, sans-serif" letterSpacing="0.07em"
                fill={e.pattern ? `${SAGE_TEXT}0.958)` : 'rgba(255,255,255,0.725)'}
                style={{ userSelect: 'none' }}>{e.emotion}</text>
            </motion.g>
          )
        })}

        {/* Pattern arc - appears after entries */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.88 }}
        >
          <path d={`M186,${AXIS_Y + 18} Q378,${AXIS_Y + 34} 570,${AXIS_Y + 18}`}
            stroke={`${SAGE}0.50)`} fill="none" strokeWidth={1.2} strokeDasharray="4 3" />
          <text x={378} y={AXIS_Y + 50} textAnchor="middle"
            fontSize="4.8" fontFamily="system-ui, sans-serif" letterSpacing="0.09em"
            fill={`${SAGE_TEXT}0.926)`} style={{ userSelect: 'none' }}>
            RECURRING PATTERN: CONTEXT FRICTION → DROPOUT
          </text>
        </motion.g>

        {/* Caption */}
        <motion.text x={SVG_W / 2} y={SVG_H - 3} textAnchor="middle"
          fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.59)"
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: prefersReduced ? 0 : 0.68 }}
          style={{ userSelect: 'none' }}>
          SIX SELF-LOGGED ENTRIES OVER TWO WEEKS: THE PATTERN IS IN THE ACCUMULATION
        </motion.text>
      </svg>
    </div>
  )
}
