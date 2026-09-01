'use client'

import { motion, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'

const SVG_W = 700
const SVG_H = 290

// Slot positions: three horizontal panels forming one sentence of progress
const SLOT_Y = 68
const SLOT_H = 158
const MID_Y  = SLOT_Y + SLOT_H / 2  // 147

const S1 = { x: 10,  w: 185 }   // WHEN
const S2 = { x: 222, w: 210 }   // I WANT TO
const S3 = { x: 459, w: 231 }   // SO I CAN

const S1_CX = S1.x + S1.w / 2   // 102.5
const S2_CX = S2.x + S2.w / 2   // 327
const S3_CX = S3.x + S3.w / 2   // 574.5

export default function JTBDEstablishing() {
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const T    = prefersReduced ? { duration: 0 } : { duration: 0.52, ease }

  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.15, delayChildren: 0.06 } },
  }
  const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }
  const fadeIn = { hidden: { opacity: 0 },         visible: { opacity: 1 } }

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
          <filter id="jtbd-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background wash */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={10} fill={`${NAVY}0.06)`} />

        {/* Wrong framing strip (contrast cue) */}
        <motion.g variants={fadeIn} transition={T}>
          <rect
            x={10} y={12} width={680} height={36} rx={6}
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.09)"
            strokeDasharray="4 3"
          />
          <text
            x={24} y={30}
            textAnchor="start" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}
          >{'× WRONG: FEATURE / DEMOGRAPHIC'}</text>
          <text
            x={252} y={30}
            textAnchor="start" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-inter,sans-serif)" fontStyle="italic"
            fill="rgba(255,255,255,0.65)" style={{ userSelect: 'none' }}
          >{'a thicker milkshake for suburban commuters'}</text>
        </motion.g>

        {/* Slot 1: WHEN (situation) */}
        <motion.g variants={fadeUp} transition={T}>
          <rect
            x={S1.x} y={SLOT_Y} width={S1.w} height={SLOT_H} rx={8}
            fill={`${NAVY}0.62)`}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={1.5}
            filter="url(#jtbd-est-glow)"
          />
          <text
            x={S1_CX} y={SLOT_Y + 16}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill="rgba(255,255,255,0.7)" style={{ userSelect: 'none' }}
          >WHEN</text>
          <line
            x1={S1.x + 14} y1={SLOT_Y + 26}
            x2={S1.x + S1.w - 14} y2={SLOT_Y + 26}
            stroke="rgba(255,255,255,0.08)"
          />
          {(['commuting alone,', 'bored and', 'hungry'] as string[]).map((ln, i) => (
            <text
              key={i} x={S1_CX} y={SLOT_Y + 60 + i * 17}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="8" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
              fill="rgba(255,255,255,0.90)" style={{ userSelect: 'none' }}
            >{ln}</text>
          ))}
          <text
            x={S1_CX} y={SLOT_Y + 138}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.625)" style={{ userSelect: 'none' }}
          >SITUATION</text>
        </motion.g>

        {/* Arrow 1→2 */}
        <motion.g variants={fadeIn} transition={T}>
          <line
            x1={S1.x + S1.w} y1={MID_Y} x2={S2.x} y2={MID_Y}
            stroke="rgba(255,255,255,0.22)" strokeWidth={1.2} strokeDasharray="3 2"
          />
          <polygon
            points={`${S2.x},${MID_Y - 4} ${S2.x + 8},${MID_Y} ${S2.x},${MID_Y + 4}`}
            fill="rgba(255,255,255,0.22)"
          />
        </motion.g>

        {/* Slot 2: I WANT TO (motivation) */}
        <motion.g variants={fadeUp} transition={T}>
          <rect
            x={S2.x} y={SLOT_Y} width={S2.w} height={SLOT_H} rx={8}
            fill={`${NAVY}0.62)`}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={1.5}
            filter="url(#jtbd-est-glow)"
          />
          <text
            x={S2_CX} y={SLOT_Y + 16}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill="rgba(255,255,255,0.7)" style={{ userSelect: 'none' }}
          >I WANT TO</text>
          <line
            x1={S2.x + 14} y1={SLOT_Y + 26}
            x2={S2.x + S2.w - 14} y2={SLOT_Y + 26}
            stroke="rgba(255,255,255,0.08)"
          />
          {(['stay engaged', 'and satisfied,', 'one-handed'] as string[]).map((ln, i) => (
            <text
              key={i} x={S2_CX} y={SLOT_Y + 60 + i * 17}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="8" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
              fill="rgba(255,255,255,0.90)" style={{ userSelect: 'none' }}
            >{ln}</text>
          ))}
          <text
            x={S2_CX} y={SLOT_Y + 138}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.625)" style={{ userSelect: 'none' }}
          >MOTIVATION</text>
        </motion.g>

        {/* Arrow 2→3 */}
        <motion.g variants={fadeIn} transition={T}>
          <line
            x1={S2.x + S2.w} y1={MID_Y} x2={S3.x} y2={MID_Y}
            stroke="rgba(255,255,255,0.22)" strokeWidth={1.2} strokeDasharray="3 2"
          />
          <polygon
            points={`${S3.x},${MID_Y - 4} ${S3.x + 8},${MID_Y} ${S3.x},${MID_Y + 4}`}
            fill="rgba(255,255,255,0.22)"
          />
        </motion.g>

        {/* Slot 3: SO I CAN (outcome) */}
        <motion.g variants={fadeUp} transition={T}>
          <rect
            x={S3.x} y={SLOT_Y} width={S3.w} height={SLOT_H} rx={8}
            fill={`${NAVY}0.62)`}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={1.5}
            filter="url(#jtbd-est-glow)"
          />
          <text
            x={S3_CX} y={SLOT_Y + 16}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill="rgba(255,255,255,0.7)" style={{ userSelect: 'none' }}
          >SO I CAN</text>
          <line
            x1={S3.x + 14} y1={SLOT_Y + 26}
            x2={S3.x + S3.w - 14} y2={SLOT_Y + 26}
            stroke="rgba(255,255,255,0.08)"
          />
          {(['arrive at work', 'ready,', 'not depleted'] as string[]).map((ln, i) => (
            <text
              key={i} x={S3_CX} y={SLOT_Y + 60 + i * 17}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="8" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
              fill="rgba(255,255,255,0.90)" style={{ userSelect: 'none' }}
            >{ln}</text>
          ))}
          <text
            x={S3_CX} y={SLOT_Y + 138}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.625)" style={{ userSelect: 'none' }}
          >OUTCOME</text>
        </motion.g>

        {/* Caption */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 8}
          textAnchor="middle" dominantBaseline="auto"
          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.59)"
          style={{ userSelect: 'none' }}
          variants={fadeIn}
          transition={{ ...T, delay: prefersReduced ? 0 : 0.90 }}
        >progress, not product; circumstance, not demographic</motion.text>
      </svg>
    </motion.div>
  )
}
