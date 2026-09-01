'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM

const SVG_W = 700
const SVG_H = 536

const BOX_W = 264
const BOX_H = 50
const CX = 350
const BOX_LEFT  = CX - BOX_W / 2  // 218
const BOX_RIGHT = CX + BOX_W / 2  // 482

const CHOICES = [
  { id: 'aspiration',   cy: 66,  label: 'WINNING ASPIRATION',  sub: 'what does winning look like?',          heart: false },
  { id: 'where',        cy: 170, label: 'WHERE TO PLAY',       sub: 'which markets, segments, channels?',    heart: true  },
  { id: 'how',          cy: 274, label: 'HOW TO WIN',          sub: 'how do we create unique value there?',  heart: true  },
  { id: 'capabilities', cy: 378, label: 'CAPABILITIES',        sub: 'what must we be able to do?',           heart: false },
  { id: 'systems',      cy: 482, label: 'MANAGEMENT SYSTEMS',  sub: 'what systems and measures sustain it?', heart: false },
]

export default function SCCEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  function tr(delay = 0, dur = 0.40) {
    return prefersReduced
      ? { duration: 0 }
      : { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }

  const boxBase = prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }
  const boxShow = { opacity: 1, y: 0 }

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
      aria-label="Strategic Choice Cascade: five choices flowing top to bottom: Winning Aspiration, Where to Play (the heart), How to Win (the heart), Capabilities, Management Systems, with reinforcing feedback links showing all choices must cohere as a mutually-reinforcing whole."
    >
      <defs>
        <filter id="scc-est-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
          <feFlood floodColor={`${PLUM}0.55)`} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Choice boxes */}
      {CHOICES.map((c, i) => (
        <motion.g key={c.id}
          initial={boxBase}
          animate={inView ? boxShow : boxBase}
          transition={tr(0.10 + i * 0.14)}>
          <rect
            x={BOX_LEFT} y={c.cy - BOX_H / 2} width={BOX_W} height={BOX_H} rx={5}
            fill={c.heart ? `${PLUM}0.14)` : `${PLUM}0.06)`}
            stroke={c.heart ? `${PLUM}0.70)` : `${PLUM}0.38)`}
            strokeWidth={c.heart ? 1.6 : 1.1}
            style={{ filter: c.heart ? 'url(#scc-est-glow)' : 'none' }}
          />
          <text x={CX} y={c.cy - 6} textAnchor="middle"
            fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.13em" fontWeight="600"
            fill={c.heart ? `${PLUM_TEXT}1.0)` : 'rgba(255,255,255,0.75)'}
            style={{ userSelect: 'none' }}>
            {c.label}
          </text>
          <text x={CX} y={c.cy + 9} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={c.heart ? `${PLUM_TEXT}0.905)` : 'rgba(255,255,255,0.64)'}
            style={{ userSelect: 'none' }}>
            {c.sub}
          </text>
          {c.heart && (
            <text x={BOX_RIGHT + 9} y={c.cy + 3} textAnchor="start"
              fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${PLUM_TEXT}0.895)`} style={{ userSelect: 'none' }}>
              ★ the heart
            </text>
          )}
        </motion.g>
      ))}

      {/* Down-cascade connector arrows */}
      {CHOICES.slice(0, -1).map((c, i) => {
        const y1 = c.cy + BOX_H / 2 + 4
        const y2 = CHOICES[i + 1].cy - BOX_H / 2 - 10
        return (
          <motion.g key={`conn-${i}`}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
            transition={tr(0.17 + i * 0.14)}>
            <line x1={CX} y1={y1} x2={CX} y2={y2}
              stroke={`${PLUM}0.45)`} strokeWidth={1.2} />
            <polygon
              points={`${CX - 5},${y2} ${CX + 5},${y2} ${CX},${y2 + 9}`}
              fill={`${PLUM}0.45)`} />
          </motion.g>
        )
      })}

      {/* Reinforcing feedback: full right-side arc SYSTEMS → ASPIRATION */}
      <motion.path
        d={`M ${BOX_RIGHT},${482} C 616,${482} 616,${66} ${BOX_RIGHT},${66}`}
        fill="none"
        stroke={`${PLUM}0.28)`}
        strokeWidth={1.0}
        strokeDasharray="4 3"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={tr(0.84, 0.55)}
      />
      {/* Arrowhead at top of right arc (pointing left into ASPIRATION) */}
      <motion.polygon
        points={`${BOX_RIGHT + 1},${66} ${BOX_RIGHT + 11},${60} ${BOX_RIGHT + 11},${72}`}
        fill={`${PLUM}0.28)`}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.12)}
      />
      {/* "MUST COHERE" label on right side */}
      <motion.text
        x={632} y={295}
        textAnchor="middle"
        fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
        fill={`${PLUM}0.28)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.08)}>
        ↑ MUST COHERE ↓
      </motion.text>

      {/* Reinforcing feedback: left-side WHERE ↔ HOW (the heart must fit) */}
      <motion.path
        d={`M ${BOX_LEFT},${170} C 148,${170} 148,${274} ${BOX_LEFT},${274}`}
        fill="none"
        stroke={`${PLUM}0.48)`}
        strokeWidth={1.2}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={tr(0.92, 0.30)}
      />
      {/* Arrowhead at bottom of WHERE↔HOW arc (pointing right into HOW) */}
      <motion.polygon
        points={`${BOX_LEFT - 1},${274} ${BOX_LEFT - 11},${268} ${BOX_LEFT - 11},${280}`}
        fill={`${PLUM}0.48)`}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.12)}
      />
      {/* "MUST FIT" label on left side */}
      <motion.text
        x={128} y={226}
        textAnchor="middle"
        fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
        fill={`${PLUM}0.48)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.10)}>
        MUST FIT
      </motion.text>

      {/* Caption */}
      <motion.text
        x={SVG_W / 2} y={SVG_H - 6}
        textAnchor="middle"
        fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
        fill="rgba(255,255,255,0.14)"
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.14)}>
        STRATEGY IS NOT FIVE BOXES FILLED INDEPENDENTLY, IT IS FIVE CHOICES THAT MUST REINFORCE ONE ANOTHER
      </motion.text>
    </svg>
  )
}
