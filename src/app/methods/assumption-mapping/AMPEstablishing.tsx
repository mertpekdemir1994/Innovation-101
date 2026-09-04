'use client'
import { motion, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY

// Wide field: grid width was stretched (544→784) to give the hero a
// cinematic ~2.4:1 frame; card widths/x-positions grew with their quadrant
// so each still gets the full quadrant width for its label. Grid height and
// all y-positions untouched.
const SVG_W = 940
const SVG_H = 390

// Grid geometry - shared across all three appearances
const GX = 96,  GY = 24
const GW = 784, GH = 280
const GR = GX + GW   // 880
const GB = GY + GH   // 304
const MX = GX + GW / 2  // 488
const MY = GY + GH / 2  // 164

const CARD_H = 28

type Card = {
  id: string
  x: number
  y: number
  w: number
  label: string
  lof: boolean
}

// Cards stack single-file within their quadrant (rather than side-by-side)
// so each gets the full quadrant width for its label at a legible size.
const CARDS: Card[] = [
  // LEAP-OF-FAITH (top-right - high importance, unknown)
  { id: 'a', x: 500, y: 54,  w: 372, label: 'WILL THEY BUY?',      lof: true  },
  { id: 'b', x: 500, y: 92,  w: 372, label: 'PRICE ACCEPTED?',     lof: true  },
  // MONITOR (top-left - high importance, known)
  { id: 'c', x: 104, y: 54,  w: 372, label: 'BEHAVIOUR EXISTS',    lof: false },
  { id: 'd', x: 104, y: 92,  w: 372, label: 'TECH IS READY',       lof: false },
  // NICE-TO-KNOW (bottom-right - low importance, unknown)
  { id: 'e', x: 500, y: 178, w: 372, label: 'PREFER FREE RETURNS', lof: false },
  // IGNORE (bottom-left - low importance, known)
  { id: 'f', x: 104, y: 178, w: 372, label: 'CAN SHIP PRODUCT',    lof: false },
  { id: 'g', x: 104, y: 216, w: 372, label: 'CAN BUILD SITE',      lof: false },
]

export default function AMPEstablishing() {
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const container = {
    hidden: {},
    visible: {
      transition: prefersReduced ? {} : { staggerChildren: 0.07, delayChildren: 0.04 },
    },
  }

  const fadeIn  = { hidden: { opacity: 0 },         visible: { opacity: 1 } }
  const slideIn = { hidden: { opacity: 0, y: 7 },   visible: { opacity: 1, y: 0 } }

  const gridT = prefersReduced ? { duration: 0 } : { duration: 0.50, ease }
  const cardT = prefersReduced ? { duration: 0 } : { duration: 0.38, ease }
  const glowT = prefersReduced ? { duration: 0 } : { duration: 0.60, ease }

  return (
    <motion.div
      className="w-full select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
      role="img"
      aria-label="Importance by uncertainty risk grid. Top-right quadrant (high importance, unknown) glows in clay orange and is labelled LEAP OF FAITH: TEST THESE FIRST. Other quadrants: top-left is MONITOR, bottom-right is NICE TO KNOW, bottom-left is IGNORE. Seven assumption cards are placed across the four quadrants."
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ margin: '0 auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="amp-est-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="amp-est-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="amp-est-lof-grad" cx="20%" cy="20%" r="90%">
            <stop offset="0%" stopColor={`${CLAY}0.20)`} />
            <stop offset="100%" stopColor={`${CLAY}0.0)`} />
          </radialGradient>
        </defs>

        {/* Leap-of-faith corner glow */}
        <motion.rect
          x={MX} y={GY} width={GR - MX} height={MY - GY}
          fill="url(#amp-est-lof-grad)"
          variants={fadeIn}
          transition={{ ...glowT, delay: prefersReduced ? 0 : 0.50 }}
        />

        {/* Grid border */}
        <motion.rect
          x={GX} y={GY} width={GW} height={GH}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
          variants={fadeIn} transition={gridT}
        />

        {/* Center dividers */}
        <motion.line
          x1={MX} y1={GY} x2={MX} y2={GB}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} strokeDasharray="4 3"
          variants={fadeIn} transition={gridT}
        />
        <motion.line
          x1={GX} y1={MY} x2={GR} y2={MY}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} strokeDasharray="4 3"
          variants={fadeIn} transition={gridT}
        />

        {/* Importance axis arrow (left, pointing up) */}
        <motion.g variants={fadeIn} transition={gridT}>
          <line x1={GX - 8} y1={GB + 4} x2={GX - 8} y2={GY - 2}
            stroke="rgba(255,255,255,0.20)" strokeWidth={1} strokeLinecap="round" />
          <path d={`M ${GX - 13} ${GY + 6} L ${GX - 8} ${GY - 2} L ${GX - 3} ${GY + 6}`}
            stroke="rgba(255,255,255,0.20)" strokeWidth={1} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* Uncertainty axis arrow (bottom, pointing right) */}
        <motion.g variants={fadeIn} transition={gridT}>
          <line x1={GX - 4} y1={GB + 8} x2={GR + 4} y2={GB + 8}
            stroke="rgba(255,255,255,0.20)" strokeWidth={1} strokeLinecap="round" />
          <path d={`M ${GR - 2} ${GB + 3} L ${GR + 4} ${GB + 8} L ${GR - 2} ${GB + 13}`}
            stroke="rgba(255,255,255,0.20)" strokeWidth={1} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* Axis name labels */}
        <motion.text
          transform={`rotate(-90, 14, ${(GY + GB) / 2})`}
          x={14} y={(GY + GB) / 2}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.68)" style={{ userSelect: 'none' }}
          variants={fadeIn} transition={gridT}
        >IMPORTANCE</motion.text>

        <motion.text
          x={(GX + GR) / 2} y={GB + 42}
          textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.68)" style={{ userSelect: 'none' }}
          variants={fadeIn} transition={gridT}
        >UNCERTAINTY</motion.text>

        {/* Axis end labels */}
        <motion.text x={GX - 26} y={GY + 4} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }} variants={fadeIn} transition={gridT}>HIGH</motion.text>
        <motion.text x={GX - 26} y={GB - 2} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }} variants={fadeIn} transition={gridT}>LOW</motion.text>
        <motion.text x={GX + 2}  y={GB + 26} textAnchor="start"  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }} variants={fadeIn} transition={gridT}>KNOWN</motion.text>
        <motion.text x={GR - 2}  y={GB + 26} textAnchor="end"    fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }} variants={fadeIn} transition={gridT}>UNKNOWN</motion.text>

        {/* Quadrant corner labels */}
        <motion.text x={GX + 8} y={GY + 15} textAnchor="start"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }}
          variants={fadeIn} transition={{ ...gridT, delay: prefersReduced ? 0 : 0.28 }}>
          MONITOR
        </motion.text>

        <motion.g
          variants={fadeIn}
          transition={{ ...glowT, delay: prefersReduced ? 0 : 0.42 }}
          filter="url(#amp-est-glow-sm)"
        >
          <text x={GR - 8} y={GY + 15} textAnchor="end"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
            fill={`${CLAY_TEXT}0.979)`} style={{ userSelect: 'none' }}>
            LEAP OF FAITH
          </text>
        </motion.g>

        <motion.text x={GX + 8} y={GB - 9} textAnchor="start"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.58)" style={{ userSelect: 'none' }}
          variants={fadeIn} transition={{ ...gridT, delay: prefersReduced ? 0 : 0.22 }}>
          IGNORE
        </motion.text>

        <motion.text x={GR - 8} y={GB - 9} textAnchor="end"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.60)" style={{ userSelect: 'none' }}
          variants={fadeIn} transition={{ ...gridT, delay: prefersReduced ? 0 : 0.26 }}>
          NICE TO KNOW
        </motion.text>

        {/* Assumption cards */}
        {CARDS.map((card, i) => (
          <motion.g
            key={card.id}
            variants={slideIn}
            transition={{ ...cardT, delay: prefersReduced ? 0 : 0.22 + i * 0.07 }}
          >
            <rect
              x={card.x} y={card.y} width={card.w} height={CARD_H} rx={3}
              fill={card.lof ? `${CLAY}0.12)` : 'rgba(255,255,255,0.05)'}
              stroke={card.lof ? `${CLAY}0.65)` : 'rgba(255,255,255,0.16)'}
              strokeWidth={card.lof ? 1.5 : 1}
              filter={card.lof ? 'url(#amp-est-glow-sm)' : undefined}
            />
            <text
              x={card.x + card.w / 2} y={card.y + CARD_H / 2 + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={card.lof ? `${CLAY_TEXT}0.99)` : 'rgba(255,255,255,0.72)'}
              style={{ userSelect: 'none' }}
            >{card.label}</text>
          </motion.g>
        ))}

        {/* Caption */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 10}
          textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
          fill="rgba(255,255,255,0.60)" style={{ userSelect: 'none' }}
          variants={fadeIn}
          transition={{ ...gridT, delay: prefersReduced ? 0 : 0.72 }}
        >
          every assumption has a place · the dangerous ones are critical and untested · test those first
        </motion.text>
      </svg>
    </motion.div>
  )
}
