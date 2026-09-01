'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W   = 700
const PHASE_W = 140
const PCX = [70, 210, 350, 490, 630] as const

const HDR_TOP = 8, HDR_H = 40
const CONTENT_Y = 52
const BAR_BASE  = 152
const SVG_H     = 168

// Typical fraction of design investment teams put into each phase
const INV = [0.34, 0.54, 0.91, 0.26, 0.14] as const
const BAR_H_MAX = BAR_BASE - CONTENT_Y - 8  // = 92

type PhaseId = 'entice' | 'enter' | 'engage' | 'exit' | 'extend'

const PHASES: { id: PhaseId; label: string; bookend: boolean; core: boolean }[] = [
  { id: 'entice', label: 'ENTICE', bookend: true,  core: false },
  { id: 'enter',  label: 'ENTER',  bookend: false, core: false },
  { id: 'engage', label: 'ENGAGE', bookend: false, core: true  },
  { id: 'exit',   label: 'EXIT',   bookend: true,  core: false },
  { id: 'extend', label: 'EXTEND', bookend: true,  core: false },
]

function phaseBarFill(idx: number): string {
  const p = PHASES[idx]
  if (p.core) return `${TEAL}0.80)`
  if (p.bookend) return `${AMBER}0.38)`
  return `${TEAL}0.42)`
}

export default function FiveEsEstablishing() {
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const riseIn = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }
  const fadeIn = { hidden: { opacity: 0 },        visible: { opacity: 1 } }

  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.10, delayChildren: 0.05 } },
  }
  const rT = prefersReduced ? { duration: 0 } : { duration: 0.36, ease }
  const fT = prefersReduced ? { duration: 0 } : { duration: 0.28, ease }

  const barContainer = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.09, delayChildren: 0.40 } },
  }

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
          <filter id="fes-est-glow" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background */}
        <motion.rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8}
          fill={`${TEAL}0.04)`}
          variants={fadeIn} transition={{ ...fT, duration: 0.5 }}
        />

        {/* Vertical dividers between phases */}
        <motion.g variants={fadeIn} transition={fT}>
          {[1, 2, 3, 4].map(i => (
            <line key={i} x1={i * PHASE_W} y1={HDR_TOP} x2={i * PHASE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1}
            />
          ))}
          <line x1={0} y1={CONTENT_Y} x2={SVG_W} y2={CONTENT_Y}
            stroke="rgba(255,255,255,0.07)" strokeWidth={1}
          />
        </motion.g>

        {/* Phase headers */}
        {PHASES.map((phase, i) => (
          <motion.g key={phase.id} variants={riseIn} transition={rT}>
            <rect
              x={i * PHASE_W + 1} y={HDR_TOP}
              width={PHASE_W - 2} height={HDR_H}
              rx={4}
              fill={phase.bookend ? `${AMBER}0.08)` : phase.core ? `${TEAL}0.18)` : `${TEAL}0.10)`}
              stroke={phase.bookend ? `${AMBER}0.35)` : `${TEAL}0.38)`}
              strokeWidth={1}
            />
            {/* Amber top-stripe for bookends */}
            {phase.bookend && (
              <rect
                x={i * PHASE_W + 1} y={HDR_TOP}
                width={PHASE_W - 2} height={2}
                rx={2}
                fill={`${AMBER}0.55)`}
              />
            )}
            <text
              x={PCX[i]} y={HDR_TOP + HDR_H / 2 + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={phase.bookend ? `${AMBER}0.88)` : `${TEAL_TEXT}0.983)`}
              style={{ userSelect: 'none' }}
            >{phase.label}</text>
          </motion.g>
        ))}

        {/* Quality bars - stagger separately so they grow after headers settle */}
        <motion.g variants={barContainer}>
          {PHASES.map((phase, i) => {
            const barH = INV[i] * BAR_H_MAX
            const barX = PCX[i] - 28
            const barY = BAR_BASE - barH

            return (
              <motion.g key={phase.id}
                variants={{
                  hidden:  { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={fT}
              >
                {/* Bar background track */}
                <rect x={barX} y={CONTENT_Y + 8} width={56} height={BAR_H_MAX}
                  rx={2} fill="rgba(255,255,255,0.03)"
                />
                {/* Filled bar */}
                <motion.rect
                  x={barX}
                  width={56}
                  rx={2}
                  fill={phaseBarFill(i)}
                  filter={phase.core ? 'url(#fes-est-glow)' : undefined}
                  variants={{
                    hidden:  { height: 0, y: BAR_BASE },
                    visible: { height: barH, y: barY },
                  }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.45, ease }}
                />
                {/* Phase annotation */}
                {phase.core && (
                  <motion.text
                    x={PCX[i]} y={CONTENT_Y + 14}
                    textAnchor="middle" dominantBaseline="hanging"
                    fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                    fill={`${TEAL_TEXT}0.926)`} style={{ userSelect: 'none' }}
                    variants={fadeIn} transition={{ ...fT, delay: 0.6 }}
                  >OVER-INVESTED</motion.text>
                )}
                {phase.bookend && phase.id === 'extend' && (
                  <motion.text
                    x={PCX[i]} y={CONTENT_Y + 14}
                    textAnchor="middle" dominantBaseline="hanging"
                    fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                    fill={`${AMBER_TEXT}0.876)`} style={{ userSelect: 'none' }}
                    variants={fadeIn} transition={{ ...fT, delay: 0.7 }}
                  >MOST NEGLECTED</motion.text>
                )}
                {phase.bookend && phase.id !== 'extend' && (
                  <motion.text
                    x={PCX[i]} y={CONTENT_Y + 14}
                    textAnchor="middle" dominantBaseline="hanging"
                    fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                    fill={`${AMBER_TEXT}0.851)`} style={{ userSelect: 'none' }}
                    variants={fadeIn} transition={{ ...fT, delay: 0.65 }}
                  >NEGLECTED</motion.text>
                )}
              </motion.g>
            )
          })}
        </motion.g>

        {/* Bottom label: design investment levels */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 4}
          textAnchor="middle" dominantBaseline="auto"
          fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
          variants={fadeIn} transition={{ ...fT, delay: 0.8 }}
        >TYPICAL DESIGN INVESTMENT BY PHASE</motion.text>
      </svg>
    </motion.div>
  )
}
