'use client'

import { motion, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'

const SVG_W = 700
const SVG_H = 440

// Quadrant rects - 24px horizontal gap, 44px vertical gap
const TL = { x: 10,  y: 10,  w: 328, h: 188 }  // SAYS
const TR = { x: 362, y: 10,  w: 328, h: 188 }  // THINKS
const BL = { x: 10,  y: 242, w: 328, h: 188 }  // DOES
const BR = { x: 362, y: 242, w: 328, h: 188 }  // FEELS

// Central figure
const CX = 350, CY = 220, CRO = 36, CRI = 26
const HEAD_CY = 209, HEAD_R = 10

type QuadrantBlock = {
  rect: typeof TL
  label: string
  entries: [string, string, string]
  isFeeels?: boolean
}

const QUADRANTS: QuadrantBlock[] = [
  {
    rect: TL,
    label: 'SAYS',
    entries: ['"I know I should save more"', '"I\'m pretty responsible with money"', '"I\'ll sort it out next year"'],
  },
  {
    rect: TR,
    label: 'THINKS',
    entries: ['retirement feels impossibly far away', 'doesn\'t really understand how it works', 'other things feel more urgent'],
  },
  {
    rect: BL,
    label: 'DOES',
    entries: ['avoids opening account statements', 'hasn\'t changed contributions in years', 'closes app without taking action'],
  },
  {
    rect: BR,
    label: 'FEELS',
    entries: ['quiet shame whenever it comes up', 'anxious when confronted with numbers', 'a sense of failure, rarely spoken'],
    isFeeels: true,
  },
]

export default function EMPEstablishing() {
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const container = {
    hidden: {},
    visible: {
      transition: prefersReduced
        ? {}
        : { staggerChildren: 0.18, delayChildren: 0.06 },
    },
  }
  const qIn    = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }
  const fadeIn = { hidden: { opacity: 0 },          visible: { opacity: 1 } }
  const T      = prefersReduced ? { duration: 0 } : { duration: 0.52, ease }

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
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="emp-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="emp-est-feels-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Canvas background */}
        <motion.rect
          x={0} y={0} width={SVG_W} height={SVG_H} rx={10}
          fill={`${NAVY}0.05)`}
          variants={fadeIn}
          transition={T}
        />

        {/* Cross guide lines (very subtle) */}
        <motion.g variants={fadeIn} transition={T}>
          <line x1={350} y1={10}  x2={350} y2={430} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
          <line x1={10}  y1={220} x2={690} y2={220} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        </motion.g>

        {/* Four quadrants */}
        {QUADRANTS.map((q, qi) => {
          const { rect: r, label, entries, isFeeels } = q
          const cx = r.x + r.w / 2

          return (
            <motion.g
              key={label}
              variants={qIn}
              transition={{ ...T, delay: prefersReduced ? 0 : qi * 0.00 }}
            >
              {/* Quadrant rect */}
              <rect
                x={r.x} y={r.y} width={r.w} height={r.h} rx={8}
                fill={isFeeels ? `${NAVY}0.14)` : `${NAVY}0.08)`}
                stroke={isFeeels ? `${NAVY}0.58)` : `${NAVY}0.35)`}
                strokeWidth={isFeeels ? 1.5 : 1}
                filter={isFeeels ? 'url(#emp-est-feels-glow)' : 'url(#emp-est-glow)'}
              />

              {/* Label */}
              <text
                x={cx} y={r.y + 18}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.14em"
                fill={isFeeels ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.72)'}
                fontWeight="600"
                style={{ userSelect: 'none' }}
              >{label}</text>

              {/* Divider */}
              <line
                x1={r.x + 16} y1={r.y + 28}
                x2={r.x + r.w - 16} y2={r.y + 28}
                stroke={isFeeels ? `${NAVY}0.45)` : 'rgba(255,255,255,0.08)'}
              />

              {/* Evidence entries */}
              {entries.map((entry, i) => (
                <g key={i}>
                  <rect
                    x={r.x + 16} y={r.y + 34 + i * 22}
                    width={r.w - 32} height={16} rx={3}
                    fill="rgba(255,255,255,0.06)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth={0.7}
                  />
                  <text
                    x={r.x + 24} y={r.y + 34 + i * 22 + 8}
                    textAnchor="start" dominantBaseline="middle"
                    fontSize="5" fontFamily="var(--font-inter,sans-serif)"
                    fill={isFeeels ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.60)'}
                    style={{ userSelect: 'none' }}
                  >{entry}</text>
                </g>
              ))}

              {/* FEELS "interpretive heart" indicator */}
              {isFeeels && (
                <>
                  <line
                    x1={r.x + 20} y1={r.y + 158}
                    x2={r.x + r.w - 20} y2={r.y + 158}
                    stroke={`${NAVY}0.38)`}
                  />
                  <text
                    x={cx} y={r.y + 170}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                    fill="rgba(255,255,255,0.65)"
                    style={{ userSelect: 'none' }}
                  >♥ INTERPRETIVE HEART</text>
                </>
              )}
            </motion.g>
          )
        })}

        {/* SAYS-vs-DOES tension hint (left arm of cross) */}
        <motion.g variants={fadeIn} transition={{ ...T, delay: prefersReduced ? 0 : 0.80 }}>
          <line
            x1={172} y1={200} x2={172} y2={240}
            stroke="rgba(255,255,255,0.10)" strokeDasharray="2 2" strokeWidth={0.8}
          />
          <text
            x={172} y={222}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)"
            fill="rgba(255,255,255,0.58)"
            style={{ userSelect: 'none' }}
          >≠</text>
        </motion.g>

        {/* Central figure */}
        <motion.g
          variants={fadeIn}
          transition={{ ...T, delay: prefersReduced ? 0 : 0.74 }}
        >
          {/* Outer dashed ring */}
          <circle cx={CX} cy={CY} r={CRO} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 2" strokeWidth={0.8} />
          {/* Inner filled circle (body) */}
          <circle cx={CX} cy={CY} r={CRI} fill={`${NAVY}0.30)`} stroke="rgba(255,255,255,0.50)" strokeWidth={1} />
          {/* Head */}
          <circle cx={CX} cy={HEAD_CY} r={HEAD_R} fill={`${NAVY}0.22)`} stroke="rgba(255,255,255,0.38)" strokeWidth={0.8} />
          {/* Shoulder arc */}
          <path
            d={`M ${CX - 17} ${CY + 18} Q ${CX} ${CY + 7} ${CX + 17} ${CY + 18}`}
            fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth={0.8}
          />
        </motion.g>

        {/* Bottom caption */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 8}
          textAnchor="middle" dominantBaseline="auto"
          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.18)"
          style={{ userSelect: 'none' }}
          variants={fadeIn}
          transition={{ ...(prefersReduced ? { duration: 0 } : { duration: 0.40, ease }), delay: prefersReduced ? 0 : 1.0 }}
        >one person, four perspectives, the insight lives in the gaps between them</motion.text>
      </svg>
    </motion.div>
  )
}
