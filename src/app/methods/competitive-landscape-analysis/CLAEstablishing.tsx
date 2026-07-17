'use client'
import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'

const SAGE = 'rgba(61,107,90,'

// Larger field for legibility
const SVG_W = 720
const SVG_H = 372
const FX = 78   // Y-axis x-position
const FY = 26   // field top
const FW = 585  // field width
const FH = 304  // field height
const F_R = FX + FW  // 663
const F_B = FY + FH  // 330

// All competitors cluster in upper-right (high price, high prestige).
// Lower-left quadrant is the genuine white space.
const COMPS = [
  { id: 'a', cx: 532, cy: 70  },  // heritage brand
  { id: 'b', cx: 582, cy: 95  },  // premium challenger
  { id: 'c', cx: 486, cy: 82  },  // quality specialist
  { id: 'd', cx: 556, cy: 132 },  // prestige niche
  { id: 'e', cx: 615, cy: 55  },  // category leader
  { id: 'f', cx: 435, cy: 158 },  // mid-market
  { id: 'g', cx: 310, cy: 218 },  // budget entry
  { id: 'h', cx: 248, cy: 186 },  // value segment
] as const

// Ellipse enclosing the upper-right cluster
const CROWD = { cx: 534, cy: 88, rx: 128, ry: 74 }

// White space: derived from COMPS so it always occupies the actual empty region.
// Cluster is upper-right → WS is lower-left: right edge = leftmost dot − gap,
// top edge = bottom half of the field.
const _minCX = Math.min(...COMPS.map(c => c.cx))
const WS = {
  x: FX + 6,
  y: FY + FH * 0.50,
  w: _minCX - 9 - 20 - (FX + 6),   // 9 = dot radius; 20 = clearance
  h: F_B - (FY + FH * 0.50) - 6,
}

export default function CLAEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease  = [0.16, 1, 0.3, 1] as const
  const d     = (t: number) => (prefersReduced ? 0 : t)
  const axT   = prefersReduced ? { duration: 0 } : { duration: 0.50, ease }
  const ptT   = prefersReduced ? { duration: 0 } : { duration: 0.40, ease }
  const zoneT = prefersReduced ? { duration: 0 } : { duration: 0.45, ease }

  const container = {
    hidden: {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.06, delayChildren: 0.04 } },
  }
  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const scaleIn = { hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }

  return (
    <motion.div
      className="w-full select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
      role="img"
      aria-label="Competitive positioning field: Price (horizontal) vs Prestige (vertical). Eight competitors cluster in the high-price, high-prestige upper-right zone. The lower-left — low price, low prestige — is empty: the un-served white space."
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="cla-est-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cla-est-dot-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="cla-est-crowd-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={`${SAGE}0.20)`} />
            <stop offset="100%" stopColor={`${SAGE}0.00)`} />
          </radialGradient>
          <radialGradient id="cla-est-ws-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={`${SAGE}0.28)`} />
            <stop offset="100%" stopColor={`${SAGE}0.08)`} />
          </radialGradient>
        </defs>

        {/* Grid — subtle guidance lines */}
        <motion.g variants={fadeIn} transition={axT}>
          {[0.25, 0.50, 0.75].map((t) => (
            <React.Fragment key={t}>
              <line x1={FX + t * FW} y1={FY} x2={FX + t * FW} y2={F_B}
                stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
              <line x1={FX} y1={FY + (1 - t) * FH} x2={F_R} y2={FY + (1 - t) * FH}
                stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            </React.Fragment>
          ))}
        </motion.g>

        {/* X axis */}
        <motion.g variants={fadeIn} transition={axT}>
          <line x1={FX} y1={F_B} x2={F_R} y2={F_B}
            stroke="rgba(255,255,255,0.52)" strokeWidth={2} />
          <path d={`M ${F_R - 7} ${F_B - 4} L ${F_R + 2} ${F_B} L ${F_R - 7} ${F_B + 4}`}
            stroke="rgba(255,255,255,0.52)" strokeWidth={2} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <text x={FX + 6}    y={F_B + 16} fontSize="8"  fontFamily="var(--font-mono)"
            letterSpacing="0.10em" fill="rgba(255,255,255,0.42)" style={{ userSelect: 'none' }}>LOW</text>
          <text x={F_R - 6}   y={F_B + 16} fontSize="8"  fontFamily="var(--font-mono)"
            letterSpacing="0.10em" fill="rgba(255,255,255,0.42)" textAnchor="end"
            style={{ userSelect: 'none' }}>HIGH</text>
          <text x={(FX + F_R) / 2} y={F_B + 26} fontSize="8.5" fontFamily="var(--font-mono)"
            letterSpacing="0.14em" fill="rgba(255,255,255,0.50)" textAnchor="middle"
            style={{ userSelect: 'none' }}>PRICE →</text>
        </motion.g>

        {/* Y axis */}
        <motion.g variants={fadeIn} transition={axT}>
          <line x1={FX} y1={F_B} x2={FX} y2={FY}
            stroke="rgba(255,255,255,0.52)" strokeWidth={2} />
          <path d={`M ${FX - 4} ${FY + 8} L ${FX} ${FY} L ${FX + 4} ${FY + 8}`}
            stroke="rgba(255,255,255,0.52)" strokeWidth={2} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <text
            transform={`rotate(-90, ${FX - 28}, ${(FY + F_B) / 2})`}
            x={FX - 28} y={(FY + F_B) / 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill="rgba(255,255,255,0.50)" style={{ userSelect: 'none' }}>↑ PRESTIGE LEVEL</text>
          <text x={FX - 10} y={F_B - 6} textAnchor="end" fontSize="8"
            fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.36)"
            style={{ userSelect: 'none' }}>SIMPLE</text>
          <text x={FX - 10} y={FY + 12} textAnchor="end" fontSize="8"
            fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.36)"
            style={{ userSelect: 'none' }}>EXPERT</text>
        </motion.g>

        {/* Crowded zone ellipse */}
        <motion.g
          variants={fadeIn}
          transition={{ ...zoneT, delay: d(0.40) }}
        >
          <ellipse
            cx={CROWD.cx} cy={CROWD.cy} rx={CROWD.rx} ry={CROWD.ry}
            fill="url(#cla-est-crowd-grad)"
            stroke={`${SAGE}0.38)`} strokeWidth={1.5}
            strokeDasharray="5 3"
          />
          {/* Label inside the ellipse, near top */}
          <text
            x={CROWD.cx} y={CROWD.cy - CROWD.ry + 24}
            textAnchor="middle"
            fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill={`${SAGE}0.80)`} style={{ userSelect: 'none' }}>CROWDED ZONE</text>
          <text
            x={CROWD.cx} y={CROWD.cy - CROWD.ry + 38}
            textAnchor="middle"
            fontSize="7" fontFamily="var(--font-mono)"
            fill={`${SAGE}0.50)`} style={{ userSelect: 'none' }}>8 players competing here</text>
        </motion.g>

        {/* Competitors — large dots, 9px radius */}
        {COMPS.map((c, i) => (
          <motion.circle
            key={c.id}
            cx={c.cx} cy={c.cy} r={9}
            fill={`${SAGE}0.22)`}
            stroke={`${SAGE}0.82)`}
            strokeWidth={2}
            filter="url(#cla-est-dot-glow)"
            variants={scaleIn}
            transition={{ ...ptT, delay: d(0.14 + i * 0.06) }}
            style={{ transformOrigin: `${c.cx}px ${c.cy}px` } as React.CSSProperties}
          />
        ))}

        {/* White space — the actual empty region of the plot.
            This rect sits on the genuinely empty lower-left (no dot within x<232, y>228). */}
        <motion.g
          variants={fadeIn}
          transition={{ ...zoneT, delay: d(0.58) }}
        >
          <rect
            x={WS.x} y={WS.y} width={WS.w} height={WS.h}
            rx={8}
            fill="url(#cla-est-ws-grad)"
            stroke={`${SAGE}0.65)`} strokeWidth={1.5}
            strokeDasharray="6 3"
            filter="url(#cla-est-glow)"
          />
          <text
            x={WS.x + WS.w / 2} y={WS.y + WS.h / 2 - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.16em"
            fill={`${SAGE}0.95)`} style={{ userSelect: 'none' }}>WHITE SPACE</text>
          <text
            x={WS.x + WS.w / 2} y={WS.y + WS.h / 2 + 10}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)"
            fill={`${SAGE}0.62)`} style={{ userSelect: 'none' }}>no competitor here</text>
        </motion.g>

        {/* Span annotation */}
        <motion.g
          variants={fadeIn}
          transition={{ ...zoneT, delay: d(0.76) }}
        >
          <line x1={FX} y1={SVG_H - 16} x2={F_R} y2={SVG_H - 16}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <text x={FX + 2} y={SVG_H - 5} textAnchor="start"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.20)" style={{ userSelect: 'none' }}>
            ← INTERNAL / HOW THE BUSINESS WORKS
          </text>
          <text x={F_R - 2} y={SVG_H - 5} textAnchor="end"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.20)" style={{ userSelect: 'none' }}>
            CUSTOMER-FACING / HOW IT FEELS →
          </text>
        </motion.g>
      </svg>
    </motion.div>
  )
}
