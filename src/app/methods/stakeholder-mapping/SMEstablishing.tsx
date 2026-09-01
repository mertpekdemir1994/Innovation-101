'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE

const SVG_W = 700
const SVG_H = 258
const CW = 126
const CH = 78

// Four-column grid, centred in 700px
const COLS = [68, 214, 360, 506]
const ROWS = [20, 114]

type Attitude = 'supporter' | 'neutral' | 'blocker'
type Level = 'low' | 'medium' | 'high'

type CardDef = {
  col: number
  row: number
  name: string
  role: string
  power: Level
  interest: Level
  attitude: Attitude
  influence: Level
  nonObvious: boolean
}

const CARDS: CardDef[] = [
  { col: 0, row: 0, name: 'END USER',        role: 'Primary user',          power: 'medium', interest: 'high',   attitude: 'supporter', influence: 'medium', nonObvious: false },
  { col: 1, row: 0, name: 'DECISION MAKER',  role: 'Authority holder',      power: 'high',   interest: 'high',   attitude: 'neutral',   influence: 'high',   nonObvious: false },
  { col: 2, row: 0, name: 'BUDGET HOLDER',   role: 'Resource gatekeeper',   power: 'high',   interest: 'low',    attitude: 'neutral',   influence: 'low',    nonObvious: false },
  { col: 3, row: 0, name: 'REGULATOR',       role: 'Rule-setter',           power: 'high',   interest: 'low',    attitude: 'neutral',   influence: 'low',    nonObvious: false },
  { col: 0, row: 1, name: 'FRONTLINE STAFF', role: 'Daily implementer',     power: 'medium', interest: 'high',   attitude: 'supporter', influence: 'medium', nonObvious: false },
  { col: 1, row: 1, name: 'DOWNSTREAM',      role: 'Indirect recipient',    power: 'low',    interest: 'medium', attitude: 'supporter', influence: 'low',    nonObvious: true  },
  { col: 2, row: 1, name: 'SILENT BLOCKER',  role: 'Hidden obstacle',       power: 'medium', interest: 'low',    attitude: 'blocker',   influence: 'medium', nonObvious: true  },
  { col: 3, row: 1, name: 'ADVOCATE',        role: 'Community voice',       power: 'low',    interest: 'high',   attitude: 'supporter', influence: 'high',   nonObvious: true  },
]

function attitudeColor(a: Attitude): string {
  if (a === 'supporter') return `${SAGE}0.82)`
  if (a === 'blocker')   return 'rgba(245,158,11,0.80)'
  return 'rgba(255,255,255,0.45)'
}

export default function SMEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  return (
    <div className="w-full" aria-hidden="true">
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        <defs>
          <filter id="sm-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feFlood floodColor={`${SAGE}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Row 0 label */}
        <motion.text
          x={SVG_W / 2} y={12} textAnchor="middle"
          fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.10em"
          fill="rgba(255,255,255,0.22)"
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: prefersReduced ? 0 : 0.05 }}
          style={{ userSelect: 'none' }}
        >OBVIOUS STAKEHOLDERS</motion.text>

        {/* Row 1 label */}
        <motion.text
          x={SVG_W / 2} y={108} textAnchor="middle"
          fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.10em"
          fill={`${SAGE}0.55)`}
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: prefersReduced ? 0 : 0.32 }}
          style={{ userSelect: 'none' }}
        >NON-OBVIOUS (★)</motion.text>

        {/* Cards */}
        {CARDS.map((c, i) => {
          const x = COLS[c.col]
          const y = ROWS[c.row]
          const delay = prefersReduced ? 0 : i * 0.065 + 0.10

          return (
            <motion.g
              key={c.name}
              initial={{ opacity: 0, y: 14 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.38, delay }}
            >
              {/* Glow for non-obvious */}
              {c.nonObvious && (
                <rect
                  x={x - 1} y={y - 1} width={CW + 2} height={CH + 2} rx={4}
                  fill="none" stroke={`${SAGE}0.18)`} strokeWidth={4}
                  style={{ filter: 'url(#sm-est-glow)' }}
                />
              )}

              {/* Card body */}
              <rect x={x} y={y} width={CW} height={CH} rx={3}
                fill={c.nonObvious ? `${SAGE}0.06)` : 'rgba(255,255,255,0.03)'}
                stroke={c.nonObvious ? `${SAGE}0.32)` : 'rgba(255,255,255,0.10)'}
                strokeWidth={c.nonObvious ? 0.9 : 0.7}
              />

              {/* Non-obvious star */}
              {c.nonObvious && (
                <text x={x + CW - 7} y={y + 11} textAnchor="end"
                  fontSize="6" fontFamily="system-ui, sans-serif"
                  fill={`${SAGE_TEXT}0.948)`}
                  style={{ userSelect: 'none' }}>★</text>
              )}

              {/* Name */}
              <text x={x + CW / 2} y={y + 17} textAnchor="middle"
                fontSize="6.5" fontFamily="system-ui, sans-serif"
                fontWeight="600" letterSpacing="0.09em"
                fill={c.nonObvious ? `${SAGE_TEXT}0.983)` : 'rgba(255,255,255,0.78)'}
                style={{ userSelect: 'none' }}>{c.name}</text>

              {/* Role */}
              <text x={x + CW / 2} y={y + 28} textAnchor="middle"
                fontSize="5" fontFamily="system-ui, sans-serif"
                fill="rgba(255,255,255,0.675)"
                style={{ userSelect: 'none' }}>{c.role}</text>

              {/* Divider */}
              <line x1={x + 8} y1={y + 35} x2={x + CW - 8} y2={y + 35}
                stroke="rgba(255,255,255,0.08)" strokeWidth={0.7} />

              {/* Attributes row 1 */}
              <text x={x + 8} y={y + 46} fontSize="4.8" fontFamily="system-ui, sans-serif"
                letterSpacing="0.05em" fill="rgba(255,255,255,0.7)"
                style={{ userSelect: 'none' }}>
                {`PWR ${c.power.slice(0, 3).toUpperCase()}  ·  INT ${c.interest.slice(0, 3).toUpperCase()}`}
              </text>

              {/* Attributes row 2 */}
              <text x={x + 8} y={y + 58} fontSize="4.8" fontFamily="system-ui, sans-serif"
                letterSpacing="0.05em" fill={attitudeColor(c.attitude)}
                style={{ userSelect: 'none' }}>
                {`${c.attitude.toUpperCase()}  ·  INFL ${c.influence.slice(0, 3).toUpperCase()}`}
              </text>
            </motion.g>
          )
        })}

        {/* Caption */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 4} textAnchor="middle"
          fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.20)"
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: prefersReduced ? 0 : 0.65 }}
          style={{ userSelect: 'none' }}
        >CAST OF STAKEHOLDERS, SORTED BY ATTRIBUTE TO REVEAL PRIORITY AND HIDDEN OBSTACLES</motion.text>
      </svg>
    </div>
  )
}
