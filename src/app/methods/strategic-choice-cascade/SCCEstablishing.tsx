'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM

// Rotated from the original 700x550 (1.27:1) vertical stack into a
// horizontal row: a strategy cascade reads left-to-right just as naturally
// as top-to-bottom, and the two feedback loops (the big "must cohere" arc
// spanning first→last, and the small "must fit" arc between the two
// "heart" boxes) become arcs below/above the row instead of beside it.
//
// Box width had to come down a lot (290→200) to keep 5 boxes at a physical
// canvas width the page can render without downscaling the text below its
// original size — so each sub-line wraps onto two shorter lines instead of
// one long one, and box height grew (50→66) to hold them. Net result still
// renders larger than the original 640px-capped baseline.
const SVG_W = 1210
const SVG_H = 336

const BOX_W = 200
const BOX_H = 66
const ROW_Y = 145
const BOX_TOP = ROW_Y - BOX_H / 2
const BOX_BOTTOM = ROW_Y + BOX_H / 2

const CHOICES = [
  { id: 'aspiration',   cx: 135,  label: 'WINNING ASPIRATION',  sub: ['what does winning', 'look like?'],           heart: false },
  { id: 'where',        cx: 370,  label: 'WHERE TO PLAY',       sub: ['which markets,', 'segments, channels?'],     heart: true  },
  { id: 'how',          cx: 605,  label: 'HOW TO WIN',          sub: ['how do we create', 'unique value there?'],   heart: true  },
  { id: 'capabilities', cx: 840,  label: 'CAPABILITIES',        sub: ['what must we be', 'able to do?'],            heart: false },
  { id: 'systems',      cx: 1075, label: 'MANAGEMENT SYSTEMS',  sub: ['what systems and', 'measures sustain it?'],  heart: false },
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
      style={{ margin: '0 auto', display: 'block' }}
      role="img"
      aria-label="Strategic Choice Cascade: five choices flowing left to right: Winning Aspiration, Where to Play (the heart), How to Win (the heart), Capabilities, Management Systems, with reinforcing feedback links showing all choices must cohere as a mutually-reinforcing whole."
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
            x={c.cx - BOX_W / 2} y={BOX_TOP} width={BOX_W} height={BOX_H} rx={5}
            fill={c.heart ? `${PLUM}0.14)` : `${PLUM}0.06)`}
            stroke={c.heart ? `${PLUM}0.70)` : `${PLUM}0.38)`}
            strokeWidth={c.heart ? 1.6 : 1.1}
            style={{ filter: c.heart ? 'url(#scc-est-glow)' : 'none' }}
          />
          <text x={c.cx} y={ROW_Y - 18} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.13em" fontWeight="600"
            fill={c.heart ? `${PLUM_TEXT}1.0)` : 'rgba(255,255,255,0.75)'}
            style={{ userSelect: 'none' }}>
            {c.label}
          </text>
          <text x={c.cx} y={ROW_Y + 1} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={c.heart ? `${PLUM_TEXT}0.905)` : 'rgba(255,255,255,0.64)'}
            style={{ userSelect: 'none' }}>
            {c.sub[0]}
          </text>
          <text x={c.cx} y={ROW_Y + 17} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={c.heart ? `${PLUM_TEXT}0.905)` : 'rgba(255,255,255,0.64)'}
            style={{ userSelect: 'none' }}>
            {c.sub[1]}
          </text>
          {c.heart && (
            <text x={c.cx} y={BOX_BOTTOM + 20} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${PLUM_TEXT}0.895)`} style={{ userSelect: 'none' }}>
              ★ the heart
            </text>
          )}
        </motion.g>
      ))}

      {/* Right-cascade connector arrows */}
      {CHOICES.slice(0, -1).map((c, i) => {
        const x1 = c.cx + BOX_W / 2 + 4
        const x2 = CHOICES[i + 1].cx - BOX_W / 2 - 10
        return (
          <motion.g key={`conn-${i}`}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
            transition={tr(0.17 + i * 0.14)}>
            <line x1={x1} y1={ROW_Y} x2={x2} y2={ROW_Y}
              stroke={`${PLUM}0.45)`} strokeWidth={1.2} />
            <polygon
              points={`${x2},${ROW_Y - 5} ${x2},${ROW_Y + 5} ${x2 + 9},${ROW_Y}`}
              fill={`${PLUM}0.45)`} />
          </motion.g>
        )
      })}

      {/* Reinforcing feedback: big arc below, SYSTEMS → ASPIRATION */}
      <motion.path
        d={`M ${CHOICES[4].cx},${BOX_BOTTOM} C ${CHOICES[4].cx},250 ${CHOICES[0].cx},250 ${CHOICES[0].cx},${BOX_BOTTOM}`}
        fill="none"
        stroke={`${PLUM}0.28)`}
        strokeWidth={1.0}
        strokeDasharray="4 3"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={tr(0.84, 0.55)}
      />
      {/* Arrowhead at ASPIRATION's bottom edge (pointing up, back into it) */}
      <motion.polygon
        points={`${CHOICES[0].cx},${BOX_BOTTOM - 1} ${CHOICES[0].cx - 6},${BOX_BOTTOM + 9} ${CHOICES[0].cx + 6},${BOX_BOTTOM + 9}`}
        fill={`${PLUM}0.28)`}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.12)}
      />
      {/* "MUST COHERE" label below the big arc */}
      <motion.text
        x={(CHOICES[0].cx + CHOICES[4].cx) / 2} y={273}
        textAnchor="middle"
        fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.09em"
        fill={`${PLUM_TEXT}0.849)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.08)}>
        ← MUST COHERE →
      </motion.text>

      {/* Reinforcing feedback: small arc above, WHERE ↔ HOW (the heart must fit) */}
      <motion.path
        d={`M ${CHOICES[1].cx},${BOX_TOP} C ${CHOICES[1].cx},60 ${CHOICES[2].cx},60 ${CHOICES[2].cx},${BOX_TOP}`}
        fill="none"
        stroke={`${PLUM}0.48)`}
        strokeWidth={1.2}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={tr(0.92, 0.30)}
      />
      {/* Arrowhead at HOW's top edge (pointing down, into it) */}
      <motion.polygon
        points={`${CHOICES[2].cx},${BOX_TOP + 1} ${CHOICES[2].cx - 6},${BOX_TOP - 9} ${CHOICES[2].cx + 6},${BOX_TOP - 9}`}
        fill={`${PLUM}0.48)`}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.12)}
      />
      {/* "MUST FIT" label above the small arc */}
      <motion.text
        x={(CHOICES[1].cx + CHOICES[2].cx) / 2} y={44}
        textAnchor="middle"
        fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.09em"
        fill={`${PLUM_TEXT}0.891)`}
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.10)}>
        MUST FIT
      </motion.text>

      {/* Caption */}
      <motion.text
        x={SVG_W / 2} y={SVG_H - 30}
        textAnchor="middle"
        fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
        fill="rgba(255,255,255,0.57)"
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.14)}>
        STRATEGY IS NOT FIVE BOXES FILLED INDEPENDENTLY,
      </motion.text>
      <motion.text
        x={SVG_W / 2} y={SVG_H - 14}
        textAnchor="middle"
        fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
        fill="rgba(255,255,255,0.57)"
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : (prefersReduced ? { opacity: 1 } : { opacity: 0 })}
        transition={tr(1.14)}>
        IT IS FIVE CHOICES THAT MUST REINFORCE ONE ANOTHER
      </motion.text>
    </svg>
  )
}
