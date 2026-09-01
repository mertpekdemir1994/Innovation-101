'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY

const SVG_W = 700
const SVG_H = 262

const AXIS_Y   = 118
const AXIS_X1  = 54
const AXIS_X2  = 660

const WARNING_Y   = 58
const NAME_Y      = 76
const SUB_Y       = 92
const COST_Y      = 138
const BRACKET_Y   = 162
const JUST_Y      = 182
const JUST_SUB_Y  = 194
const CAPTION_Y   = SVG_H - 6

type Rung = { id: string; x: number; low: boolean; name: string; sub: string; cost: string }

const RUNGS: Rung[] = [
  { id: 'paper',    x: 103, low: true,  name: 'PAPER SKETCH',       sub: 'hand-drawn · minutes · free',   cost: 'MINUTES / FREE' },
  { id: 'quick',   x: 248, low: true,  name: 'CONCEPTUAL VISUAL',  sub: 'fast drawn or digital',          cost: 'UNDER AN HOUR'  },
  { id: 'click',   x: 393, low: false, name: 'CLICKABLE MOCKUP',   sub: 'e.g. Figma · interactive',      cost: 'HOURS'          },
  { id: 'polished', x: 558, low: false, name: 'POLISHED PROTOTYPE', sub: 'near-real · expensive',         cost: 'DAYS'           },
]

const ZONE_X1  = RUNGS[0].x - 22
const ZONE_X2  = RUNGS[1].x + 22
const ZONE_MID = (ZONE_X1 + ZONE_X2) / 2

export default function RPEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  return (
    <div
      className="w-full"
      aria-label="Horizontal fidelity spectrum from rough paper sketch on the left to polished prototype on the right. The just enough to learn zone is marked low on the spectrum at the paper sketch and conceptual visual levels. A warning zone near the polished end notes that high fidelity invites feedback on polish rather than concept."
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}
      >
        <defs>
          <filter id="rp-est-clay-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${CLAY}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Axis ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.28, delay: prefersReduced ? 0 : 0.02 }}
        >
          <line x1={AXIS_X1} y1={AXIS_Y} x2={AXIS_X2} y2={AXIS_Y}
            stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          <path d={`M ${AXIS_X2-6} ${AXIS_Y-4} L ${AXIS_X2+2} ${AXIS_Y} L ${AXIS_X2-6} ${AXIS_Y+4}`}
            stroke="rgba(255,255,255,0.20)" strokeWidth={1} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <text x={AXIS_X1+2} y={AXIS_Y+10} textAnchor="start"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>
            ROUGH · FAST
          </text>
          <text x={AXIS_X2+4} y={AXIS_Y+10} textAnchor="start"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>
            HIGH FIDELITY →
          </text>
        </motion.g>

        {/* ── Rungs (left to right: paper first) ── */}
        {RUNGS.map((r, i) => {
          const delay = prefersReduced ? 0 : 0.10 + i * 0.12
          const circleStroke = r.low ? `${CLAY}0.80)` : 'rgba(255,255,255,0.32)'
          const circleFill   = r.low ? `${CLAY}0.12)` : 'rgba(255,255,255,0.05)'
          const nameColor    = r.low ? `${CLAY}0.88)` : 'rgba(255,255,255,0.58)'
          const subColor     = r.low ? `${CLAY}0.44)` : 'rgba(255,255,255,0.26)'
          const costColor    = r.low ? `${CLAY}0.42)` : 'rgba(255,255,255,0.25)'
          return (
            <motion.g key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.36, delay, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tick on axis */}
              <line x1={r.x} y1={AXIS_Y - 5} x2={r.x} y2={AXIS_Y + 5}
                stroke={r.low ? `${CLAY}0.55)` : 'rgba(255,255,255,0.20)'}
                strokeWidth={r.low ? 1.5 : 1} />
              {/* Circle */}
              <circle cx={r.x} cy={AXIS_Y} r={5}
                fill={circleFill} stroke={circleStroke} strokeWidth={r.low ? 1.5 : 1}
                style={r.low ? { filter: 'url(#rp-est-clay-glow)' } : undefined} />
              {/* Connector line upward */}
              <line x1={r.x} y1={AXIS_Y - 6} x2={r.x} y2={SUB_Y}
                stroke={r.low ? `${CLAY}0.14)` : 'rgba(255,255,255,0.08)'}
                strokeWidth={0.8} strokeDasharray="2 2" />
              {/* Name */}
              <text x={r.x} y={NAME_Y} textAnchor="middle"
                fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.11em"
                fill={nameColor} style={{ userSelect: 'none' }}>{r.name}</text>
              {/* Sub */}
              <text x={r.x} y={SUB_Y} textAnchor="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={subColor} style={{ userSelect: 'none' }}>{r.sub}</text>
              {/* Cost below axis */}
              <text x={r.x} y={COST_Y} textAnchor="middle"
                fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={costColor} style={{ userSelect: 'none' }}>{r.cost}</text>
            </motion.g>
          )
        })}

        {/* ── Warning zone at polished end ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.28, delay: prefersReduced ? 0 : 0.58 }}
        >
          <text x={558} y={WARNING_Y} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill="rgba(245,158,11,0.826)" style={{ userSelect: 'none' }}>
            ⚠ FEEDBACK DRIFTS TO POLISH PAST HERE
          </text>
        </motion.g>

        {/* ── JUST ENOUGH TO LEARN zone ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: prefersReduced ? 0 : 0.68 }}
        >
          {/* Bracket: horizontal bar + vertical ticks */}
          <line x1={ZONE_X1} y1={BRACKET_Y} x2={ZONE_X2} y2={BRACKET_Y}
            stroke={`${CLAY}0.36)`} strokeWidth={0.8} />
          <line x1={ZONE_X1} y1={BRACKET_Y - 8} x2={ZONE_X1} y2={BRACKET_Y + 8}
            stroke={`${CLAY}0.36)`} strokeWidth={0.8} />
          <line x1={ZONE_X2} y1={BRACKET_Y - 8} x2={ZONE_X2} y2={BRACKET_Y + 8}
            stroke={`${CLAY}0.36)`} strokeWidth={0.8} />
          {/* Label */}
          <text x={ZONE_MID} y={JUST_Y} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${CLAY_TEXT}0.958)`}
            style={{ filter: `drop-shadow(0 0 5px ${CLAY_TEXT}0.843))`, userSelect: 'none' }}>
            JUST ENOUGH TO LEARN
          </text>
          <text x={ZONE_MID} y={JUST_SUB_Y} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${CLAY_TEXT}0.87)`} style={{ userSelect: 'none' }}>
            default low · the lowest that answers your question
          </text>
        </motion.g>

        {/* ── Caption ── */}
        <motion.text x={SVG_W / 2} y={CAPTION_Y} textAnchor="middle"
          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.57)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.28, delay: prefersReduced ? 0 : 0.84 }}
          style={{ userSelect: 'none' }}>
          THE RIGHT FIDELITY IS NOT THE HIGHEST YOU CAN BUILD, IT IS THE LOWEST THAT ANSWERS YOUR CURRENT QUESTION
        </motion.text>
      </svg>
    </div>
  )
}
