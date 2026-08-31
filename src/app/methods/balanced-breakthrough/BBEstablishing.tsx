'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'

const SVG_W = 700
const SVG_H = 340

// Three circle centers
const D_CX = 350, D_CY = 113
const F_CX = 285, F_CY = 226
const V_CX = 415, V_CY = 226
const R = 90

// Center / BREAKTHROUGH
const CTR_X = 350, CTR_Y = 188

export default function BBEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  const base = prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }
  const show = { opacity: 1, scale: 1 }

  function fade(delay = 0, duration = 0.50) {
    return prefersReduced ? { duration: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }
  }

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
      aria-label="Three overlapping circles: Desirability (top), Feasibility (bottom-left), Viability (bottom-right). Where all three overlap is the Breakthrough."
    >
      <defs>
        <filter id="bb-est-plum-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
          <feFlood floodColor={`${PLUM}0.55)`} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="bb-est-center-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="blur" />
          <feFlood floodColor={`${PLUM}0.70)`} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="bb-est-center-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`${PLUM}0.28)`} />
          <stop offset="100%" stopColor={`${PLUM}0.08)`} />
        </radialGradient>
      </defs>

      {/* D circle */}
      <motion.circle
        cx={D_CX} cy={D_CY} r={R}
        fill={`${PLUM}0.07)`}
        stroke={`${PLUM}0.55)`}
        strokeWidth={1.4}
        initial={base}
        animate={inView ? show : base}
        transition={fade(0.10)}
        style={{ filter: 'url(#bb-est-plum-glow)' }}
      />

      {/* F circle */}
      <motion.circle
        cx={F_CX} cy={F_CY} r={R}
        fill={`${PLUM}0.07)`}
        stroke={`${PLUM}0.55)`}
        strokeWidth={1.4}
        initial={base}
        animate={inView ? show : base}
        transition={fade(0.22)}
        style={{ filter: 'url(#bb-est-plum-glow)' }}
      />

      {/* V circle */}
      <motion.circle
        cx={V_CX} cy={V_CY} r={R}
        fill={`${PLUM}0.07)`}
        stroke={`${PLUM}0.55)`}
        strokeWidth={1.4}
        initial={base}
        animate={inView ? show : base}
        transition={fade(0.22)}
        style={{ filter: 'url(#bb-est-plum-glow)' }}
      />

      {/* Center glow */}
      <motion.circle
        cx={CTR_X} cy={CTR_Y} r={34}
        fill="url(#bb-est-center-fill)"
        stroke={`${PLUM}0.55)`}
        strokeWidth={0.8}
        initial={prefersReduced ? {} : { opacity: 0, r: 20 }}
        animate={inView ? { opacity: 1, r: 34 } : (prefersReduced ? {} : { opacity: 0, r: 20 })}
        transition={fade(0.48, 0.60)}
        style={{ filter: 'url(#bb-est-center-glow)' }}
      />

      {/* D label */}
      <motion.text
        x={D_CX} y={D_CY - 48}
        textAnchor="middle"
        fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.13em"
        fill={`${PLUM}1)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.28)}>
        DESIRABILITY
      </motion.text>
      <motion.text
        x={D_CX} y={D_CY - 34}
        textAnchor="middle"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.68)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.32)}>
        do people want it?
      </motion.text>

      {/* F label */}
      <motion.text
        x={F_CX - 56} y={F_CY + 6}
        textAnchor="end"
        fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.13em"
        fill={`${PLUM}1)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.36)}>
        FEASIBILITY
      </motion.text>
      <motion.text
        x={F_CX - 56} y={F_CY + 20}
        textAnchor="end"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.68)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.40)}>
        can we build it?
      </motion.text>

      {/* V label */}
      <motion.text
        x={V_CX + 56} y={V_CY + 6}
        textAnchor="start"
        fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.13em"
        fill={`${PLUM}1)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.36)}>
        VIABILITY
      </motion.text>
      <motion.text
        x={V_CX + 56} y={V_CY + 20}
        textAnchor="start"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.68)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.40)}>
        does it sustain us?
      </motion.text>

      {/* BREAKTHROUGH center label - white for contrast against the plum glow */}
      <motion.text
        x={CTR_X} y={CTR_Y - 4}
        textAnchor="middle"
        fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
        fill="rgba(255,255,255,0.95)"
        style={{ userSelect: 'none', filter: `drop-shadow(0 0 10px ${PLUM}0.80))` }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.60)}>
        BREAK
      </motion.text>
      <motion.text
        x={CTR_X} y={CTR_Y + 8}
        textAnchor="middle"
        fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
        fill="rgba(255,255,255,0.95)"
        style={{ userSelect: 'none', filter: `drop-shadow(0 0 10px ${PLUM}0.80))` }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.62)}>
        THROUGH
      </motion.text>

      {/* Failure-mode labels - each backed by a dark rect for legibility in the overlap zones */}

      {/* D+F overlap: love without sustainability */}
      <motion.rect x={264} y={161} width={88} height={26} rx={3}
        fill="rgba(8,3,14,0.60)"
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.71)} />
      <motion.text x={308} y={171} textAnchor="middle"
        fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.88)`} style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.72)}>
        LOVE WITHOUT
      </motion.text>
      <motion.text x={308} y={182} textAnchor="middle"
        fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.88)`} style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.73)}>
        SUSTAINABILITY
      </motion.text>

      {/* D+V overlap: promise without capability */}
      <motion.rect x={348} y={161} width={88} height={26} rx={3}
        fill="rgba(8,3,14,0.60)"
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.71)} />
      <motion.text x={392} y={171} textAnchor="middle"
        fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.88)`} style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.72)}>
        PROMISE WITHOUT
      </motion.text>
      <motion.text x={392} y={182} textAnchor="middle"
        fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.88)`} style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.73)}>
        CAPABILITY
      </motion.text>

      {/* F+V overlap: product without a market */}
      <motion.rect x={306} y={240} width={88} height={26} rx={3}
        fill="rgba(8,3,14,0.60)"
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.71)} />
      <motion.text x={350} y={250} textAnchor="middle"
        fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.88)`} style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.72)}>
        PRODUCT WITHOUT
      </motion.text>
      <motion.text x={350} y={261} textAnchor="middle"
        fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${PLUM}0.88)`} style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.73)}>
        A MARKET
      </motion.text>

      {/* Caption */}
      <motion.text
        x={SVG_W / 2} y={SVG_H - 6}
        textAnchor="middle"
        fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill="rgba(255,255,255,0.36)"
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? {} : { opacity: 0 })}
        transition={fade(0.80)}>
        AN IDEA THAT PASSES TWO LENSES IS NOT A BREAKTHROUGH: IT IS A TRAP WITH A BLIND SPOT
      </motion.text>
    </svg>
  )
}
