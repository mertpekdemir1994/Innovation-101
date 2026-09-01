'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'

const SVG_W = 700
const SVG_H = 266

// Shared core (center, prominent)
const CORE_X = 206, CORE_Y = 20, CORE_W = 288, CORE_H = 110
const CORE_CX = CORE_X + CORE_W / 2  // 350
const CORE_CY = CORE_Y + CORE_H / 2  // 75

// MVP optimization badge (left)
const MVP_X = 22, MVP_Y = 36, MVP_W = 158, MVP_H = 80
const MVP_CX = MVP_X + MVP_W / 2  // 101

// MLP optimization badge (right)
const MLP_X = 520, MLP_Y = 36, MLP_W = 158, MLP_H = 80
const MLP_CX = MLP_X + MLP_W / 2  // 599

// Feature tiles inside core (identical, reused verbatim in Interactive and AIReactivated)
const FTILES = [
  { x: 218, y: 38, w: 82,  h: 26, label: 'CORE VALUE'   },
  { x: 308, y: 38, w: 80,  h: 26, label: 'CORE ACTION'  },
  { x: 396, y: 38, w: 86,  h: 26, label: 'CORE DATA'    },
  { x: 250, y: 74, w: 90,  h: 26, label: 'CORE FEATURE' },
  { x: 350, y: 74, w: 86,  h: 26, label: 'CORE FLOW'    },
]

// Shared cut pile (below core, same for both products)
const CUT_X = 206, CUT_Y = 164, CUT_W = 288, CUT_H = 72
const CUT_CX = CORE_CX  // 350

// Cut items (non-core features, discarded by both)
const CITEMS = [
  { x: 218, y: 180, w: 80, h: 22, label: 'NON-CORE'    },
  { x: 308, y: 180, w: 76, h: 22, label: 'NOT YET'     },
  { x: 394, y: 180, w: 90, h: 22, label: 'FUTURE V2'   },
  { x: 258, y: 212, w: 88, h: 22, label: 'EXTRA FEAT.' },
  { x: 356, y: 212, w: 80, h: 22, label: 'LATER...'    },
]

const CAP_Y = SVG_H - 8  // 258

export default function MVPEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  const d = (base: number) => prefersReduced ? 0 : base

  return (
    <div className="w-full"
      aria-label="Two products, one shared core, one shared cut pile. Center: SHARED CORE with five feature tiles (Core Value, Core Action, Core Data, Core Feature, Core Flow) identical in both products. Left: MVP optimization badge, Tuned for Learning: fast, cheap, honest signal from the market. Right: MLP optimization badge, Tuned for Love: craft, resonance, users become advocates. Below: SHARED CUT PILE, five non-core features both products ruthlessly discarded. The scope is identical; only the optimization of the core differs. An MLP is not bigger than an MVP.">
      <svg ref={ref} viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
        preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <defs>
          <filter id="mvpe-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.40)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="mvpe-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
            <feFlood floodColor={`${BRICK}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Shared core box */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.50, delay: d(0.04) }}>
          <rect x={CORE_X - 4} y={CORE_Y - 4} width={CORE_W + 8} height={CORE_H + 8} rx={12}
            fill="none" stroke={`${BRICK}0.09)`} strokeWidth={8}
            style={{ filter: 'url(#mvpe-glow)' }} />
          <rect x={CORE_X} y={CORE_Y} width={CORE_W} height={CORE_H} rx={8}
            fill={`${BRICK}0.05)`} stroke={`${BRICK}0.32)`} strokeWidth={1.3} />
          <text x={CORE_CX} y={CORE_Y + 11}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill={`rgba(183,145,135,0.899)`} style={{ userSelect: 'none' }}>
            SHARED CORE · IDENTICAL IN BOTH PRODUCTS
          </text>
        </motion.g>

        {/* Feature tiles: same count and labels in both toggle states */}
        {FTILES.map((t, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.30, delay: d(0.16 + i * 0.07) }}>
            <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={3}
              fill={`${BRICK}0.10)`} stroke={`${BRICK}0.48)`} strokeWidth={0.9}
              style={{ filter: 'url(#mvpe-glow-sm)' }} />
            <text x={t.x + t.w / 2} y={t.y + t.h / 2 + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={`rgba(183,145,135,0.958)`} style={{ userSelect: 'none' }}>
              {t.label}
            </text>
          </motion.g>
        ))}

        {/* Connector lines: core → badges and core → cut pile */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(0.54) }}>
          <line x1={CORE_X} y1={CORE_CY} x2={MVP_X + MVP_W} y2={MVP_Y + MVP_H / 2}
            stroke={`${BRICK}0.28)`} strokeWidth={0.9} strokeDasharray="4 3" />
          <line x1={CORE_X + CORE_W} y1={CORE_CY} x2={MLP_X} y2={MLP_Y + MLP_H / 2}
            stroke={`${BRICK}0.28)`} strokeWidth={0.9} strokeDasharray="4 3" />
          <line x1={CORE_CX} y1={CORE_Y + CORE_H} x2={CUT_CX} y2={CUT_Y - 2}
            stroke={`${BRICK}0.20)`} strokeWidth={0.9} strokeDasharray="3 3" />
          <text x={CORE_CX + 7} y={(CORE_Y + CORE_H + CUT_Y) / 2}
            dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`rgba(183,145,135,0.849)`} style={{ userSelect: 'none' }}>
            BOTH CUT
          </text>
        </motion.g>

        {/* MVP optimization badge */}
        <motion.g
          initial={{ opacity: 0, x: -8 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.40, delay: d(0.60) }}>
          <rect x={MVP_X} y={MVP_Y} width={MVP_W} height={MVP_H} rx={6}
            fill={`${BRICK}0.06)`} stroke={`${BRICK}0.36)`} strokeWidth={1.1} />
          <text x={MVP_CX} y={MVP_Y + 18}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
            fill={`rgba(183,145,135,0.895)`} style={{ userSelect: 'none' }}>
            MVP
          </text>
          <text x={MVP_CX} y={MVP_Y + 31}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`rgba(183,145,135,0.857)`} style={{ userSelect: 'none' }}>
            TUNED FOR
          </text>
          <text x={MVP_CX} y={MVP_Y + 48}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
            fill={`rgba(183,145,135,0.975)`} style={{ userSelect: 'none' }}>
            LEARNING
          </text>
          <text x={MVP_CX} y={MVP_Y + 64}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`rgba(183,145,135,0.885)`} style={{ userSelect: 'none' }}>
            FAST · CHEAP · HONEST SIGNAL
          </text>
        </motion.g>

        {/* MLP optimization badge */}
        <motion.g
          initial={{ opacity: 0, x: 8 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
          transition={{ duration: 0.40, delay: d(0.66) }}>
          <rect x={MLP_X} y={MLP_Y} width={MLP_W} height={MLP_H} rx={6}
            fill={`${BRICK}0.06)`} stroke={`${BRICK}0.36)`} strokeWidth={1.1} />
          <text x={MLP_CX} y={MLP_Y + 18}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
            fill={`rgba(183,145,135,0.895)`} style={{ userSelect: 'none' }}>
            MLP
          </text>
          <text x={MLP_CX} y={MLP_Y + 31}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`rgba(183,145,135,0.857)`} style={{ userSelect: 'none' }}>
            TUNED FOR
          </text>
          <text x={MLP_CX} y={MLP_Y + 48}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
            fill={`rgba(183,145,135,0.975)`} style={{ userSelect: 'none' }}>
            LOVE
          </text>
          <text x={MLP_CX} y={MLP_Y + 64}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`rgba(183,145,135,0.885)`} style={{ userSelect: 'none' }}>
            CRAFT · RESONANCE · ADVOCATES
          </text>
        </motion.g>

        {/* Shared cut pile */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.40, delay: d(0.80) }}>
          <text x={CUT_CX} y={CUT_Y - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.58)" style={{ userSelect: 'none' }}>
            SHARED CUT PILE · BOTH DISCARDED THESE
          </text>
          <rect x={CUT_X} y={CUT_Y} width={CUT_W} height={CUT_H} rx={6}
            fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={0.9}
            strokeDasharray="5 4" />
        </motion.g>

        {/* Cut items */}
        {CITEMS.map((c, i) => (
          <motion.g key={i}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.28, delay: d(0.86 + i * 0.05) }}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3}
              fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={0.7}
              strokeDasharray="3 3" />
            <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
              {c.label}
            </text>
          </motion.g>
        ))}

        {/* Caption */}
        <motion.text x={CORE_CX} y={CAP_Y} textAnchor="middle"
          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.14)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(1.12) }}
          style={{ userSelect: 'none' }}>
          SAME MINIMUM SCOPE · SAME RUTHLESS CUTS · THE ONLY DIFFERENCE IS WHAT THE CORE IS OPTIMIZED FOR
        </motion.text>
      </svg>
    </div>
  )
}
