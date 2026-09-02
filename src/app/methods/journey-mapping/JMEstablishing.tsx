'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL

// ── Geometry ──────────────────────────────────────────────────────────────────
const SVG_W = 700
// GRID_X0 reserves a left gutter for the ACTIONS/THOUGHTS/EMOTIONS lane
// labels: at 11pt "THOUGHTS" no longer fits in the sliver of margin the old
// smaller font used, so the 5 stage columns are narrower (140 -> 125) to
// make room, not wider — SVG_W itself never changes.
const GRID_X0 = 75
const STAGE_W = 125   // (700 - 75) / 5 stages
const SCX = [137.5, 262.5, 387.5, 512.5, 637.5] as const  // stage center x

// Y layout
const HDR_TOP = 8, HDR_H = 36  // stage header boxes
const DIV_Y = HDR_TOP + HDR_H + 4  // = 48
const LANE_A_Y = DIV_Y + 2  // ACTIONS lane top  = 50
const LANE_A_H = 38
const LANE_T_Y = LANE_A_Y + LANE_A_H + 2  // THOUGHTS lane top = 90
const LANE_T_H = 38
const LANE_E_Y = LANE_T_Y + LANE_T_H + 2  // EMOTIONS lane top = 130
const LANE_E_H = 80
const SVG_H = LANE_E_Y + LANE_E_H  // = 210

// Emotion line Y values inside EMOTIONS lane (LANE_E_Y=130 high, LANE_E_Y+LANE_E_H=210 low)
const EY = { discover: 178, consider: 152, gap: 205, start: 182, use: 142, reflect: 165 }

// Recomputed for the new (narrower) stage spacing: control points sit 1/3
// of each segment's x-gap in from either anchor, at the anchor's own y —
// a standard smooth-curve approximation, re-anchored at the new SCX/gap x
// positions below (137.5, 262.5, 325, 387.5, 512.5, 637.5).
const EMOTION_PATH =
  `M 137.5,${EY.discover} ` +
  `C 179.2,${EY.discover} 220.8,${EY.consider} 262.5,${EY.consider} ` +
  `C 283.3,${EY.consider} 304.2,${EY.gap} 325,${EY.gap} ` +
  `C 345.8,${EY.gap} 366.7,${EY.start} 387.5,${EY.start} ` +
  `C 429.2,${EY.start} 470.8,${EY.use} 512.5,${EY.use} ` +
  `C 554.2,${EY.use} 595.8,${EY.reflect} 637.5,${EY.reflect}`

// Abbreviated content for each stage cell
const STAGES = [
  { label: 'DISCOVER', action: 'Searches broadly',   thought: '"Something better"',  emotionY: EY.discover },
  { label: 'CONSIDER', action: 'Compares options',   thought: '"This looks right"',   emotionY: EY.consider },
  { label: 'START',    action: 'Signs up, onboards', thought: '"Why so hard?"',       emotionY: EY.start    },
  { label: 'USE',      action: 'Gets real value',    thought: '"Actually works."',    emotionY: EY.use      },
  { label: 'REFLECT',  action: 'Reviews & refers',   thought: '"Worth the pain."',   emotionY: EY.reflect  },
] as const

export default function JMEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease   = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const riseIn = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }
  const fadeIn = { hidden: { opacity: 0 },        visible: { opacity: 1 } }
  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.06, delayChildren: 0.1 } },
  }
  const cardT  = prefersReduced ? { duration: 0 } : { duration: 0.4, ease }
  const labelT = prefersReduced ? { duration: 0 } : { duration: 0.35, ease }

  return (
    <motion.div
      className="w-full select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxWidth: 'var(--width-illustration)', display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="jm-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="jm-est-line-glow" x="-10%" y="-60%" width="120%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ambient teal wash behind the map */}
        <motion.rect
          x={0} y={0} width={SVG_W} height={SVG_H} rx={8}
          fill={`${TEAL}0.05)`}
          variants={fadeIn} transition={{ ...cardT, duration: 0.6 }}
        />

        {/* ── Stage header boxes ── */}
        {STAGES.map(({ label }, i) => (
          <motion.g key={label} variants={riseIn} transition={cardT}>
            <rect
              x={GRID_X0 + i * STAGE_W + 1} y={HDR_TOP}
              width={STAGE_W - 2} height={HDR_H}
              rx={4}
              fill={`${TEAL}0.10)`}
              stroke={`${TEAL}0.35)`}
              strokeWidth={1}
            />
            <text
              x={SCX[i]} y={HDR_TOP + HDR_H / 2 + 2}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={`${TEAL_TEXT}0.969)`} style={{ userSelect: 'none' }}
            >{label}</text>
          </motion.g>
        ))}

        {/* ── Lane dividers ── */}
        <motion.g variants={fadeIn} transition={labelT}>
          <line x1={0} y1={DIV_Y}      x2={SVG_W} y2={DIV_Y}      stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <line x1={0} y1={LANE_T_Y - 2} x2={SVG_W} y2={LANE_T_Y - 2} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          <line x1={0} y1={LANE_E_Y - 2} x2={SVG_W} y2={LANE_E_Y - 2} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        </motion.g>

        {/* ── Stage column dividers (incl. the label-gutter boundary at i=0) ── */}
        <motion.g variants={fadeIn} transition={labelT}>
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i}
              x1={GRID_X0 + i * STAGE_W} y1={DIV_Y}
              x2={GRID_X0 + i * STAGE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.05)" strokeWidth={1}
            />
          ))}
        </motion.g>

        {/* ── Lane labels (left edge) ── */}
        <motion.g variants={fadeIn} transition={labelT}>
          <text x={4} y={LANE_A_Y + LANE_A_H / 2} textAnchor="start" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}
          >ACTIONS</text>
          <text x={4} y={LANE_T_Y + LANE_T_H / 2} textAnchor="start" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}
          >THOUGHTS</text>
          <text x={4} y={LANE_E_Y + LANE_E_H / 2} textAnchor="start" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}
          >EMOTIONS</text>
        </motion.g>

        {/* ── Abbreviated cell content ── */}
        {STAGES.map(({ label, action, thought }, i) => (
          <motion.g key={`cell-${label}`} variants={fadeIn} transition={{ ...labelT, delay: prefersReduced ? 0 : 0.15 }}>
            <text
              x={SCX[i]} y={LANE_A_Y + LANE_A_H / 2}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-body, Inter, sans-serif)"
              fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }}
            >{action}</text>
            <text
              x={SCX[i]} y={LANE_T_Y + LANE_T_H / 2}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-body, Inter, sans-serif)"
              fill="rgba(255,255,255,0.48)" fontStyle="italic" style={{ userSelect: 'none' }}
            >{thought}</text>
          </motion.g>
        ))}

        {/* ── Gap annotation ── */}
        <motion.g
          variants={fadeIn}
          transition={{ ...labelT, delay: prefersReduced ? 0 : 0.5 }}
        >
          {/* cx/x moved 280/284 -> 325/329 to match the gap's new midpoint
              (between the recomputed consider/start stage centers) */}
          <circle cx={325} cy={EY.gap} r={3} fill="rgba(251,146,60,0.80)" />
          <text x={329} y={EY.gap - 8} textAnchor="start" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(251,146,60,0.902)" style={{ userSelect: 'none' }}
          >THE GAP</text>
        </motion.g>

        {/* Emotion line: draws itself in on scroll */}
        <motion.path
          d={EMOTION_PATH}
          stroke={`${TEAL}0.88)`}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
          filter="url(#jm-est-line-glow)"
          variants={{
            hidden:  { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1 },
          }}
          transition={prefersReduced
            ? { duration: 0, opacity: { duration: 0 } }
            : { pathLength: { duration: 1.8, ease: 'easeInOut', delay: 0.3 }, opacity: { duration: 0.4, delay: 0.2 } }
          }
        />

        {/* ── Emotion line dot markers at stage centers ── */}
        {STAGES.map(({ label, emotionY }, i) => (
          <motion.circle
            key={`dot-${label}`}
            cx={SCX[i]} cy={emotionY} r={3.5}
            fill={`${TEAL}0.95)`}
            stroke="rgba(255,255,255,0.70)"
            strokeWidth={1}
            filter="url(#jm-est-glow)"
            variants={fadeIn}
            transition={{ ...labelT, delay: prefersReduced ? 0 : 0.55 + i * 0.07 }}
          />
        ))}

        {/* ── Emotion area fill (subtle gradient under the line) ── */}
        <motion.path
          d={`${EMOTION_PATH} L 637.5,${LANE_E_Y + LANE_E_H} L 137.5,${LANE_E_Y + LANE_E_H} Z`}
          fill={`${TEAL}0.06)`}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: prefersReduced ? 0 : 0.8, delay: prefersReduced ? 0 : 0.4 }}
        />

      </svg>
    </motion.div>
  )
}
