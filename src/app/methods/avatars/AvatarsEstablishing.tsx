'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM

const CX = 188, CY = 200

const RINGS = [
  { id: 'whole-market', r: 152, label: 'WHOLE MARKET',   sub: 'too broad to win',         labelY: 125 },
  { id: 'segment',      r: 110, label: 'BROAD SEGMENT',  sub: 'large and diffuse',         labelY: 162 },
  { id: 'niche',        r:  70, label: 'SPECIFIC NICHE', sub: 'winning is conceivable',    labelY: 200 },
  { id: 'beachhead',    r:  34, label: 'THE AVATAR',     sub: 'commit here first',         labelY: 238 },
] as const

const LX = 380

export default function AvatarsEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease   = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const ringIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } }
  const fadeIn = { hidden: { opacity: 0 },              visible: { opacity: 1 } }

  // staggerChildren propagates through React context - plain <svg> doesn't break it
  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.17, delayChildren: 0.05 } },
  }
  const ringT  = prefersReduced ? { duration: 0 } : { duration: 0.5,  ease }
  const labelT = prefersReduced ? { duration: 0 } : { duration: 0.45, ease }

  return (
    <motion.div
      className="w-full flex justify-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      aria-hidden="true"
    >
      <svg viewBox="0 0 560 400" width="100%" style={{ maxWidth: 'var(--width-illustration)', overflow: 'visible' }}>
        <defs>
          <filter id="av-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient plum wash - child 0 in stagger */}
        <motion.ellipse
          cx={CX} cy={CY} rx={174} ry={174}
          fill={`${PLUM}0.06)`}
          variants={fadeIn}
          transition={{ ...ringT, duration: 0.85 }}
        />

        {/* ── Rings outer → inner, stagger makes outer appear first ── */}
        {RINGS.map(({ id, r }, i) => {
          const isBeachhead = i === 3
          const fill   = isBeachhead ? `${PLUM}0.72)`
                       : i === 2     ? `${PLUM}0.14)`
                       : i === 1     ? `${PLUM}0.08)`
                       :               `${PLUM}0.06)`
          const stroke = isBeachhead ? 'rgba(255,255,255,0.90)'
                       : i === 2     ? 'rgba(255,255,255,0.40)'
                       : i === 1     ? 'rgba(255,255,255,0.28)'
                       :               'rgba(255,255,255,0.18)'
          const strokeW = isBeachhead ? 2 : i === 2 ? 1.5 : 1

          return (
            <motion.g
              key={id}
              variants={ringIn}
              transition={ringT}
              style={{ transformOrigin: `${CX}px ${CY}px` } as React.CSSProperties}
            >
              <circle
                cx={CX} cy={CY} r={r}
                fill={fill} stroke={stroke} strokeWidth={strokeW}
                filter={isBeachhead ? 'url(#av-est-glow)' : undefined}
              />
              {isBeachhead && (
                <text
                  x={CX} y={CY + 4}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em"
                  fill="rgba(255,255,255,0.92)" style={{ userSelect: 'none' }}
                >AVATAR</text>
              )}
            </motion.g>
          )
        })}

        {/* Label column - appear after rings via stagger */}
        {RINGS.map(({ id, r, label, sub, labelY }, i) => {
          const isBeachhead = i === 3
          return (
            <motion.g key={`lbl-${id}`} variants={fadeIn} transition={labelT}>
              <line
                x1={CX + r} y1={CY} x2={LX} y2={labelY}
                stroke="rgba(255,255,255,0.13)" strokeWidth={1}
              />
              <circle cx={CX + r} cy={CY} r={2}
                fill={isBeachhead ? 'rgba(255,255,255,0.80)' : `${PLUM}0.60)`}
              />
              <text
                x={LX + 8} y={labelY - 2}
                textAnchor="start" dominantBaseline="middle"
                fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.06em"
                fill={isBeachhead ? 'rgba(255,255,255,0.85)' : `${PLUM_TEXT}0.962)`}
                style={{ userSelect: 'none' }}
              >{label}</text>
              <text
                x={LX + 8} y={labelY + 14}
                textAnchor="start" dominantBaseline="middle"
                fontSize="9" fontFamily="var(--font-mono)"
                fill="rgba(255,255,255,0.68)"
                style={{ userSelect: 'none' }}
              >{sub}</text>
            </motion.g>
          )
        })}

        {/* Narrowing annotation - last in stagger sequence */}
        <motion.text
          x={CX - 170} y={CY}
          textAnchor="middle"
          transform={`rotate(-90 ${CX - 170} ${CY})`}
          fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.62)"
          style={{ userSelect: 'none' }}
          variants={fadeIn}
          transition={labelT}
        >FOCUS NARROWS INWARD →</motion.text>

      </svg>
    </motion.div>
  )
}
