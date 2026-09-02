'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'

const SVG_W = 700
const SVG_H = 258

// Question label (above apparatus)
const Q_CX = 311
const Q_Y = 14

// Input block (left)
const INP_X = 30, INP_Y = 82, INP_W = 116, INP_H = 42
const INP_CY = INP_Y + INP_H / 2  // 103

// Apparatus box (the proving rig)
const APP_X = 178, APP_Y = 46, APP_W = 266, APP_H = 114
const APP_CX = APP_X + APP_W / 2  // 311
const APP_CY = APP_Y + APP_H / 2  // 103

// Internal structure: bus line + 3 vertical taps
const BUS_X1 = APP_X + 14, BUS_X2 = APP_X + APP_W - 14
const TAP_Y1 = APP_Y + 14  // top of taps
const TAP_Y2 = APP_Y + APP_H - 14  // bottom of taps
const TAPS = [
  { x: 220, label: 'INGEST' },
  { x: 294, label: 'PROCESS' },
  { x: 368, label: 'EVALUATE' },
]
// Widened 56 -> 68: "EVALUATE" doesn't fit the old tile width at 11pt
const COMP_W = 68, COMP_H = 20

// Wires
const W1 = { x1: INP_X + INP_W, y1: INP_CY, x2: APP_X, y2: APP_CY }
const W2 = { x1: APP_X + APP_W, y1: APP_CY, x2: 468, y2: APP_CY }

// Readout box
const OUT_X = 468, OUT_Y = 60, OUT_W = 172, OUT_H = 84
const OUT_CX = OUT_X + OUT_W / 2  // 554
const IND_CX = OUT_X + 22         // 490
const PASS_CY = OUT_Y + 26        // 86
const FAIL_CY = OUT_Y + 58        // 118

// Ghost absent elements (below apparatus)
const GHOSTS = [
  { x: 30,  y: 194, w: 150, h: 42, label: 'NO INTERFACE',      note: 'costs time only'                },
  { x: 198, y: 194, w: 196, h: 42, label: 'NO EXTRA FEATURES', note: 'one question only'              },
  { x: 412, y: 194, w: 218, h: 42, label: 'NO PRODUCT SHELL',  note: 'internal · bare · discarded'   },
]

const CAP_Y = SVG_H - 4

export default function POCEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  const d = (base: number) => prefersReduced ? 0 : base

  return (
    <div className="w-full"
      aria-label="Proving rig diagram. A bare apparatus connects an input block on the left to a pass/fail readout on the right. Above the apparatus: 'ONE CRITICAL QUESTION'. Inside: three internal stages (Ingest, Process, Evaluate). Below: three ghosted absent elements (No Interface, No Extra Features, No Product Shell). The rig is built only to answer the one question. Everything else is deliberately excluded.">
      <svg ref={ref} viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
        preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block' }}>
        <defs>
          <filter id="poc-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.40)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="poc-est-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
            <feFlood floodColor={`${BRICK}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ONE CRITICAL QUESTION label */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.40, delay: d(0.10) }}>
          <text x={Q_CX} y={Q_Y - 10 + 24} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={`rgba(183,145,135,0.905)`} style={{ userSelect: 'none' }}>
            ONE CRITICAL QUESTION
          </text>
          {/* Arrow down from label to apparatus */}
          <line x1={Q_CX} y1={Q_Y - 10 + 28} x2={Q_CX} y2={APP_Y - 2}
            stroke={`${BRICK}0.22)`} strokeWidth={0.8}
            strokeDasharray="3 3" markerEnd="url(#poc-arrow-down)" />
          <defs>
            <marker id="poc-arrow-down" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
              <path d="M0,0 L5,0 L2.5,5 Z" fill={`${BRICK}0.22)`} />
            </marker>
          </defs>
        </motion.g>

        {/* Input block */}
        <motion.g
          initial={{ opacity: 0, y: 6 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.40, delay: d(0.18) }}>
          <rect x={INP_X} y={INP_Y} width={INP_W} height={INP_H} rx={4}
            fill={`${BRICK}0.05)`} stroke={`${BRICK}0.25)`} strokeWidth={1.0} />
          <text x={INP_X + INP_W / 2} y={INP_CY - 5}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`rgba(183,145,135,0.905)`} style={{ userSelect: 'none' }}>
            RAW INPUT
          </text>
          {/* "/ signal" dropped: doesn't fit the 116-wide block at 11pt */}
          <text x={INP_X + INP_W / 2} y={INP_CY + 7}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`rgba(183,145,135,0.853)`} style={{ userSelect: 'none' }}>
            (real data)
          </text>
        </motion.g>

        {/* Wire in */}
        <motion.line
          x1={W1.x1} y1={W1.y1} x2={W1.x2} y2={W1.y2}
          stroke={`${BRICK}0.35)`} strokeWidth={1.2} strokeDasharray="5 3"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(0.28) }}
        />

        {/* Apparatus box */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.50, delay: d(0.04) }}>
          {/* Outer glow rect */}
          <rect x={APP_X - 3} y={APP_Y - 3} width={APP_W + 6} height={APP_H + 6} rx={9}
            fill="none" stroke={`${BRICK}0.08)`} strokeWidth={6}
            style={{ filter: 'url(#poc-est-glow)' }} />
          <rect x={APP_X} y={APP_Y} width={APP_W} height={APP_H} rx={6}
            fill={`${BRICK}0.04)`} stroke={`${BRICK}0.28)`} strokeWidth={1.2} />
          <text x={APP_CX} y={APP_Y + APP_H - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`rgba(183,145,135,0.819)`} style={{ userSelect: 'none' }}>
            PROVING RIG, INTERNAL, BARE
          </text>
        </motion.g>

        {/* Internal bus line */}
        <motion.line
          x1={BUS_X1} y1={APP_CY} x2={BUS_X2} y2={APP_CY}
          stroke={`${BRICK}0.22)`} strokeWidth={0.8}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.40, delay: d(0.34) }}
        />

        {/* Taps + component rects */}
        {TAPS.map((t, i) => (
          <motion.g key={i}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, delay: d(0.40 + i * 0.06) }}>
            {/* Vertical tap line */}
            <line x1={t.x} y1={TAP_Y1 + 20} x2={t.x} y2={TAP_Y2 - 14}
              stroke={`${BRICK}0.18)`} strokeWidth={0.8} />
            {/* Junction dot on bus */}
            <circle cx={t.x} cy={APP_CY} r={2.5} fill={`${BRICK}0.32)`} />
            {/* Component rect above tap */}
            <rect x={t.x - COMP_W / 2} y={TAP_Y1} width={COMP_W} height={COMP_H} rx={3}
              fill={`${BRICK}0.07)`} stroke={`${BRICK}0.30)`} strokeWidth={0.8}
              style={{ filter: 'url(#poc-est-glow-sm)' }} />
            <text x={t.x} y={TAP_Y1 + COMP_H / 2 + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`rgba(183,145,135,0.937)`} style={{ userSelect: 'none' }}>
              {t.label}
            </text>
          </motion.g>
        ))}

        {/* Wire out */}
        <motion.line
          x1={W2.x1} y1={W2.y1} x2={W2.x2} y2={W2.y2}
          stroke={`${BRICK}0.35)`} strokeWidth={1.2} strokeDasharray="5 3"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(0.54) }}
        />

        {/* Readout box */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.40, delay: d(0.62) }}>
          <rect x={OUT_X} y={OUT_Y} width={OUT_W} height={OUT_H} rx={5}
            fill={`${BRICK}0.04)`} stroke={`${BRICK}0.25)`} strokeWidth={1.0} />
          <text x={OUT_CX} y={OUT_Y + 11}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`rgba(183,145,135,0.87)`} style={{ userSelect: 'none' }}>
            VERDICT
          </text>
          <line x1={OUT_X + 10} y1={OUT_Y + 18} x2={OUT_X + OUT_W - 10} y2={OUT_Y + 18}
            stroke={`${BRICK}0.15)`} strokeWidth={0.6} />
          {/* PASS row */}
          <circle cx={IND_CX} cy={PASS_CY} r={8}
            fill={`${BRICK}0.15)`} stroke={`${BRICK}0.60)`} strokeWidth={1.2}
            style={{ filter: 'url(#poc-est-glow-sm)' }} />
          <circle cx={IND_CX} cy={PASS_CY} r={4.5} fill={`${BRICK}0.80)`} />
          <text x={IND_CX + 16} y={PASS_CY + 1}
            dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
            fill={`rgba(183,145,135,0.975)`} style={{ userSelect: 'none' }}>
            PASS
          </text>
          {/* FAIL row */}
          <circle cx={IND_CX} cy={FAIL_CY} r={8}
            fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1.0} />
          <text x={IND_CX + 16} y={FAIL_CY + 1}
            dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>
            FAIL
          </text>
        </motion.g>

        {/* Ghost absent elements */}
        {GHOSTS.map((g, i) => (
          <motion.g key={i}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, delay: d(0.80 + i * 0.06) }}>
            <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={4}
              fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={0.8}
              strokeDasharray="5 4" />
            <text x={g.x + g.w / 2} y={g.y + 13}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
              {g.label}
            </text>
            <text x={g.x + g.w / 2} y={g.y + 31}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
              fill="rgba(255,255,255,0.55)" style={{ userSelect: 'none' }}>
              {g.note}
            </text>
          </motion.g>
        ))}

        {/* Caption */}
        <motion.text x={Q_CX} y={CAP_Y} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.57)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(1.08) }}
          style={{ userSelect: 'none' }}>
          BARE · INTERNAL · BUILT TO ANSWER ONE QUESTION · TYPICALLY DISCARDED AFTER
        </motion.text>
      </svg>
    </div>
  )
}
