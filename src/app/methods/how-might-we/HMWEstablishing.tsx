'use client'

import { motion, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'

const SVG_W = 700
const SVG_H = 230

// Panel geometry
const PROB_X = 10,  PROB_W = 238,  PROB_Y = 15, PANEL_H = 190
const SOL_X  = 456, SOL_W  = 234
const PROB_CX = PROB_X + PROB_W / 2   // 129
const SOL_CX  = SOL_X  + SOL_W  / 2  // 573

// Door geometry: posts + opening
const DOOR_POST1_X = 310, DOOR_POST2_X = 391, DOOR_POST_W = 5
const DOOR_OPEN_X1 = DOOR_POST1_X + DOOR_POST_W  // 315
const DOOR_OPEN_X2 = DOOR_POST2_X                 // 391
const DOOR_CX      = (DOOR_OPEN_X1 + DOOR_OPEN_X2) / 2  // 353

export default function HMWEstablishing() {
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const T    = prefersReduced ? { duration: 0 } : { duration: 0.50, ease }

  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.20, delayChildren: 0.06 } },
  }
  const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }
  const fadeIn = { hidden: { opacity: 0 },         visible: { opacity: 1 } }

  const midY = PROB_Y + PANEL_H / 2  // vertical center of panels

  return (
    <motion.div
      className="w-full select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="hmw-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background wash */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={10} fill={`${NAVY}0.06)`} />

        {/* ── LEFT: Problem Space ── */}
        <motion.g variants={fadeUp} transition={T}>
          <rect
            x={PROB_X} y={PROB_Y} width={PROB_W} height={PANEL_H} rx={8}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.14)"
            strokeDasharray="5 3"
          />
          <text
            x={PROB_CX} y={PROB_Y + 18}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.65)" style={{ userSelect: 'none' }}
          >PROBLEM SPACE</text>
          <line
            x1={PROB_X + 16} y1={PROB_Y + 29} x2={PROB_X + PROB_W - 16} y2={PROB_Y + 29}
            stroke="rgba(255,255,255,0.07)"
          />
          <text
            x={PROB_CX} y={PROB_Y + 44}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.71)" style={{ userSelect: 'none' }}
          >INSIGHT</text>
          {([
            ['Users abandon checkout',         PROB_Y + 68,  '7',   0.80],
            ['at payment, the step',             PROB_Y + 82,  '7',   0.80],
            ['feels effortful',                 PROB_Y + 96,  '7',   0.80],
            ['and uncertain.',                  PROB_Y + 110, '7',   0.80],
            ['11 of 14 interviews',             PROB_Y + 140, '4.5', 0.30],
          ] as [string, number, string, number][]).map(([t, y, fs, op]) => (
            <text
              key={y} x={PROB_CX} y={y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={fs} fontFamily="var(--font-inter,sans-serif)"
              fill={`rgba(255,255,255,${op})`} style={{ userSelect: 'none' }}
            >{t}</text>
          ))}
        </motion.g>

        {/* ── Arrow: left panel → door ── */}
        <motion.g variants={fadeIn} transition={T}>
          <line
            x1={PROB_X + PROB_W} y1={midY}
            x2={DOOR_POST1_X}     y2={midY}
            stroke="rgba(255,255,255,0.16)" strokeWidth={1} strokeDasharray="3 2"
          />
        </motion.g>

        {/* ── CENTER: Door / Threshold ── */}
        <motion.g variants={fadeIn} transition={T}>
          {/* Left post */}
          <rect
            x={DOOR_POST1_X} y={PROB_Y} width={DOOR_POST_W} height={PANEL_H} rx={2}
            fill="rgba(255,255,255,0.22)"
          />
          {/* Right post */}
          <rect
            x={DOOR_POST2_X} y={PROB_Y} width={DOOR_POST_W} height={PANEL_H} rx={2}
            fill="rgba(255,255,255,0.22)"
          />
          {/* Lintel */}
          <rect
            x={DOOR_POST1_X} y={PROB_Y}
            width={DOOR_POST2_X - DOOR_POST1_X + DOOR_POST_W} height={5} rx={2}
            fill="rgba(255,255,255,0.22)"
          />
          {/* HOW MIGHT WE */}
          {(['HOW', 'MIGHT', 'WE'] as const).map((word, i) => (
            <text
              key={word}
              x={DOOR_CX} y={PROB_Y + 60 + i * 18}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill="rgba(255,255,255,0.78)" style={{ userSelect: 'none' }}
            >{word}</text>
          ))}
          {/* Arrow inside door (flow indicator) */}
          <line
            x1={DOOR_OPEN_X1 + 8} y1={PROB_Y + PANEL_H - 28}
            x2={DOOR_OPEN_X2 - 6} y2={PROB_Y + PANEL_H - 28}
            stroke="rgba(255,255,255,0.38)" strokeWidth={1.5}
          />
          <polygon
            points={`${DOOR_OPEN_X2 - 6},${PROB_Y + PANEL_H - 33} ${DOOR_OPEN_X2 + 8},${PROB_Y + PANEL_H - 28} ${DOOR_OPEN_X2 - 6},${PROB_Y + PANEL_H - 23}`}
            fill="rgba(255,255,255,0.38)"
          />
        </motion.g>

        {/* ── Arrow: door → right panel ── */}
        <motion.g variants={fadeIn} transition={T}>
          <line
            x1={DOOR_POST2_X + DOOR_POST_W} y1={midY}
            x2={SOL_X}                        y2={midY}
            stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="3 2"
          />
          <polygon
            points={`${SOL_X},${midY - 4} ${SOL_X + 10},${midY} ${SOL_X},${midY + 4}`}
            fill="rgba(255,255,255,0.18)"
          />
        </motion.g>

        {/* ── RIGHT: Solution Space ── */}
        <motion.g variants={fadeUp} transition={T}>
          <rect
            x={SOL_X} y={PROB_Y} width={SOL_W} height={PANEL_H} rx={8}
            fill={`${NAVY}0.62)`}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={1.5}
            filter="url(#hmw-est-glow)"
          />
          <text
            x={SOL_CX} y={PROB_Y + 18}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.7)" style={{ userSelect: 'none' }}
          >HOW MIGHT WE</text>
          <line
            x1={SOL_X + 16} y1={PROB_Y + 29} x2={SOL_X + SOL_W - 16} y2={PROB_Y + 29}
            stroke="rgba(255,255,255,0.10)"
          />
          {([
            ['make checkout feel',   PROB_Y + 64, '8.5', '600', 0.92],
            ['effortless and',       PROB_Y + 80, '8.5', '600', 0.92],
            ['reassuring?',          PROB_Y + 96, '8.5', '600', 0.92],
          ] as [string, number, string, string, number][]).map(([t, y, fs, fw, op]) => (
            <text
              key={y} x={SOL_CX} y={y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={fs} fontWeight={fw} fontFamily="var(--font-inter,sans-serif)"
              fill={`rgba(255,255,255,${op})`} style={{ userSelect: 'none' }}
            >{t}</text>
          ))}
          <text
            x={SOL_CX} y={PROB_Y + 135}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-inter,sans-serif)" fontStyle="italic"
            fill="rgba(255,255,255,0.69)" style={{ userSelect: 'none' }}
          >specific problem. open solution space.</text>
        </motion.g>
      </svg>
    </motion.div>
  )
}
