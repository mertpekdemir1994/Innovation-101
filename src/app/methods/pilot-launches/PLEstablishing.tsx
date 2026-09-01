'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'

const SVG_W = 700, SVG_H = 268

// Pilot zone: the contained, bounded slice
const ZN_X = 62, ZN_Y = 44, ZN_W = 342, ZN_H = 170
const ZN_CX = ZN_X + ZN_W / 2   // 233
const ZN_CY = ZN_Y + ZN_H / 2   // 129

// Feature tiles inside zone (FULL, REAL solution, no cut pile)
const FTILES = [
  { x: 76,  y: 80,  w: 82, h: 22, label: 'ALL FEATURES' },
  { x: 170, y: 80,  w: 82, h: 22, label: 'FULL UX'      },
  { x: 264, y: 80,  w: 82, h: 22, label: 'OPERATIONS'   },
  { x: 108, y: 112, w: 82, h: 22, label: 'SUPPORT'      },
  { x: 214, y: 112, w: 82, h: 22, label: 'ECONOMICS'    },
]

// Metric lines (zone right edge → gate)
const M_X1 = ZN_X + ZN_W + 14   // 418
const M_X2 = 484
const METRICS = [
  { y: 68,  label: 'ACQUISITION COST' },
  { y: 96,  label: '90-DAY RETENTION' },
  { y: 124, label: 'UNIT ECONOMICS'   },
  { y: 152, label: 'OP. LOAD'         },
]

// GO/NO-GO gate
const GATE_X = 492, GATE_Y = 50, GATE_W = 118, GATE_H = 158
const GATE_CX = GATE_X + GATE_W / 2   // 551
const GATE_CY = GATE_Y + GATE_H / 2   // 129

const CAP_Y = SVG_H - 7  // 261

export default function PLEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced
  const d = (base: number) => prefersReduced ? 0 : base

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: visible ? 1 : 0 },
    transition: { duration: 0.38, delay: d(delay) },
  })

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Contained pilot zone. A large dark world of un-launched markets surrounds a single bounded pilot zone. Inside the zone runs the complete, real solution: all features, full UX, operations, support, and economics. Three boundary dimensions define the zone: SEGMENT (who), GEOGRAPHY (where), TIMEFRAME (how long with end date). Four metrics read out to a GO/NO-GO gate."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          {/* Glow filter for the pilot zone */}
          <filter id="pl-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${BRICK}0.40)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Arrow marker for metric lines */}
          <marker id="pl-est-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill={`${BRICK}0.55)`} />
          </marker>
        </defs>

        {/* World background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H}
          fill="rgba(10,10,18,0.96)" rx={6} />

        {/* UN-LAUNCHED world labels */}
        {[
          { x: 7, y: 17, text: 'UN-LAUNCHED' },
          { x: 450, y: 17, text: 'MARKETS' },
          { x: 7, y: 254, text: 'MARKETS' },
          { x: 620, y: 195, text: 'UN-LAUNCHED' },
        ].map(({ x, y, text }) => (
          <motion.text key={text + x} x={x} y={y}
            fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill="rgba(255,255,255,0.10)" style={{ userSelect: 'none' }}
            {...fade(0.04)}>
            {text}
          </motion.text>
        ))}

        {/* Pilot zone glow */}
        <motion.rect x={ZN_X} y={ZN_Y} width={ZN_W} height={ZN_H}
          fill={`${BRICK}0.06)`} rx={3}
          filter="url(#pl-est-glow)"
          {...fade(0.10)} />

        {/* Pilot zone border */}
        <motion.rect x={ZN_X} y={ZN_Y} width={ZN_W} height={ZN_H}
          fill="none" stroke={`${BRICK}0.70)`} strokeWidth="1.5" rx={3}
          {...fade(0.14)} />

        {/* Boundary labels */}
        {/* SEGMENT: above zone */}
        <motion.text x={ZN_CX} y={ZN_Y - 12}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={`${BRICK}0.65)`} style={{ userSelect: 'none' }}
          {...fade(0.20)}>
          ⊞ SEGMENT · WHO IS EXPOSED
        </motion.text>

        {/* GEOGRAPHY: left of zone (rotated) */}
        <motion.text
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={`${BRICK}0.65)`} style={{ userSelect: 'none' }}
          transform={`rotate(-90 ${ZN_X - 10} ${ZN_CY})`}
          {...fade(0.24)}>
          ◈ GEOGRAPHY · WHERE
        </motion.text>

        {/* TIMEFRAME: below zone */}
        <motion.text x={ZN_CX} y={ZN_Y + ZN_H + 14}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={`${BRICK}0.65)`} style={{ userSelect: 'none' }}
          {...fade(0.28)}>
          ⊟ TIMEFRAME · END DATE FIXED
        </motion.text>

        {/* "REAL · FULL SOLUTION" heading inside zone */}
        <motion.text x={ZN_CX} y={64}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
          fill={`${BRICK}0.80)`} style={{ userSelect: 'none' }}
          {...fade(0.34)}>
          REAL · FULL SOLUTION
        </motion.text>

        {/* Feature tiles (all present, no cut pile) */}
        {FTILES.map((t, i) => (
          <motion.g key={t.label} {...fade(0.40 + i * 0.06)}>
            <rect x={t.x} y={t.y} width={t.w} height={t.h}
              fill={`${BRICK}0.12)`} stroke={`${BRICK}0.45)`}
              strokeWidth="1" rx="2" />
            <text x={t.x + t.w / 2} y={t.y + t.h / 2}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${BRICK}0.90)`} style={{ userSelect: 'none' }}>
              {t.label}
            </text>
          </motion.g>
        ))}

        {/* Operations annotation inside zone */}
        <motion.text x={ZN_CX} y={148}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill={`${BRICK}0.40)`} style={{ userSelect: 'none' }}
          {...fade(0.72)}>
          REAL OPERATIONS · REAL CUSTOMERS · REAL MONEY
        </motion.text>

        {/* Metric lines (zone → gate) */}
        {METRICS.map((m, i) => (
          <motion.g key={m.label} {...fade(0.76 + i * 0.02)}>
            <line x1={M_X1} y1={m.y} x2={M_X2} y2={m.y}
              stroke={`${BRICK}0.55)`} strokeWidth="1"
              markerEnd="url(#pl-est-arr)" />
            <text x={M_X1 + (M_X2 - M_X1) / 2} y={m.y - 5}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={`${BRICK}0.55)`} style={{ userSelect: 'none' }}>
              {m.label}
            </text>
          </motion.g>
        ))}

        {/* GO/NO-GO gate */}
        <motion.rect x={GATE_X} y={GATE_Y} width={GATE_W} height={GATE_H}
          fill={`${BRICK}0.07)`} stroke={`${BRICK}0.65)`}
          strokeWidth="1.5" rx={3}
          filter="url(#pl-est-glow)"
          {...fade(0.84)} />

        <motion.text x={GATE_CX} y={GATE_CY - 14}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
          fill={`${BRICK}0.90)`} style={{ userSelect: 'none' }}
          {...fade(0.88)}>
          GO / NO-GO
        </motion.text>
        <motion.text x={GATE_CX} y={GATE_CY + 2}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={`${BRICK}0.55)`} style={{ userSelect: 'none' }}
          {...fade(0.90)}>
          PRE-COMMITTED
        </motion.text>
        <motion.text x={GATE_CX} y={GATE_CY + 13}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={`${BRICK}0.55)`} style={{ userSelect: 'none' }}
          {...fade(0.92)}>
          CRITERIA
        </motion.text>

        {/* Caption */}
        <motion.text x={ZN_CX} y={CAP_Y}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.28)" style={{ userSelect: 'none' }}
          {...fade(1.00)}>
          The solution inside is full and real. The boundary defines who sees it, where, and for how long.
        </motion.text>
      </svg>
    </div>
  )
}
