'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

// Canvas widened from the original 700-wide composition (1.75:1) toward
// 2.4:1 by framing it wider, not stretching the hub-and-spoke layout — the
// diagram's own geometry is untouched, just recentered via a translate
// (see OFFSET_X below, applied to every child except the full-bleed
// background rect).
const SVG_W = 960
const SVG_H = 400
const OFFSET_X = 130

type ActorId = 'platform' | 'hosts' | 'guests' | 'payment' | 'photographers' | 'cleaning' | 'regulators' | 'neighbors'

type ActorDef = { id: ActorId; cx: number; cy: number; r: number; label: string[]; obvious: boolean; focal: boolean }

const ACTORS: ActorDef[] = [
  { id: 'platform',      cx: 350, cy: 198, r: 44, label: ['THE', 'PLATFORM'],          obvious: true,  focal: true  },
  { id: 'hosts',         cx: 152, cy: 108, r: 32, label: ['HOSTS'],                     obvious: true,  focal: false },
  { id: 'guests',        cx: 548, cy: 108, r: 32, label: ['GUESTS'],                    obvious: true,  focal: false },
  { id: 'payment',       cx: 350, cy:  42, r: 26, label: ['PAYMENT', 'PROVIDERS'],      obvious: true,  focal: false },
  { id: 'photographers', cx:  88, cy: 294, r: 30, label: ['PROFESSIONAL', 'PHOTOGRAPHERS'], obvious: false, focal: false },
  { id: 'cleaning',      cx: 205, cy: 350, r: 26, label: ['CLEANING &', 'CO-HOSTS'],   obvious: false, focal: false },
  { id: 'regulators',    cx: 558, cy: 294, r: 30, label: ['LOCAL', 'REGULATORS'],      obvious: false, focal: false },
  { id: 'neighbors',     cx: 634, cy: 198, r: 26, label: ['NEIGHBORS &', 'COMMUNITY'], obvious: false, focal: false },
]

type ConnectionDef = { from: ActorId; to: ActorId; label: string; obvious: boolean; t?: number }

const CONNECTIONS: ConnectionDef[] = [
  { from: 'hosts',         to: 'platform',   label: 'LISTINGS / REVENUE',     obvious: true  },
  { from: 'guests',        to: 'platform',   label: 'BOOKINGS / DEMAND',      obvious: true  },
  // payment sits directly above platform (same cx), so the default 30%
  // midpoint lands right on payment's own external label — pulled to 55%
  // to clear it.
  { from: 'payment',       to: 'platform',   label: 'TRANSACTION FEES',       obvious: true,  t: 0.55 },
  { from: 'photographers', to: 'hosts',      label: 'PROFESSIONAL PHOTOS',    obvious: false },
  // Same issue: cleaning's external label sits "above" the node, right where
  // the default 30% midpoint toward platform would land.
  { from: 'cleaning',      to: 'platform',   label: 'SERVICE LAYER',          obvious: false, t: 0.5  },
  { from: 'regulators',    to: 'platform',   label: 'PERMITS & CONSTRAINTS',  obvious: false },
  { from: 'neighbors',     to: 'regulators', label: 'COMMUNITY PRESSURE',     obvious: false },
]

function actorById(id: ActorId): ActorDef {
  return ACTORS.find(a => a.id === id)!
}

// Label at 30% of the way from the "from" actor toward "to", instead of the
// midpoint - at an 11pt floor, several labels at the true midpoint overlap
// the large PLATFORM hub circle. Pulling them toward the spoke end clears it.
function connMidpoint(c: ConnectionDef): { lx: number; ly: number } {
  const fa = actorById(c.from), ta = actorById(c.to)
  const t = c.t ?? 0.3
  return { lx: fa.cx + (ta.cx - fa.cx) * t, ly: fa.cy + (ta.cy - fa.cy) * t }
}

// Internal label position - only used for actors whose label fits inside
// the node (PLATFORM, HOSTS, GUESTS). All others use externalLabelY below.
function nodeLabelY(actor: ActorDef, lineIndex: number): number {
  const lh = actor.focal ? 16 : 8.5
  const total = actor.label.length
  const topOffset = -(total - 1) * lh / 2
  return actor.cy + topOffset + lineIndex * lh
}

// Nodes too small to hold their label at 11pt get it positioned outside the
// circle instead, above or below depending on which side has open room.
const EXTERNAL_LABEL_DIR: Partial<Record<ActorId, 'above' | 'below'>> = {
  payment: 'below',
  photographers: 'below',
  cleaning: 'above',
  regulators: 'below',
  neighbors: 'above',
}

function externalLabelY(actor: ActorDef, lineIndex: number): number {
  const dir = EXTERNAL_LABEL_DIR[actor.id]
  return dir === 'above'
    ? actor.cy - actor.r - 32 + lineIndex * 16
    : actor.cy + actor.r + 16 + lineIndex * 16
}

export default function EMEstablishing() {
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const fade = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const rise = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }
  const rT = prefersReduced ? { duration: 0 } : { duration: 0.35, ease }
  const fT = prefersReduced ? { duration: 0 } : { duration: 0.28, ease }

  const obviousConn   = CONNECTIONS.filter(c => c.obvious)
  const hiddenConn    = CONNECTIONS.filter(c => !c.obvious)
  const obviousActors = ACTORS.filter(a => a.obvious)
  const hiddenActors  = ACTORS.filter(a => !a.obvious)

  const staggerObv = { hidden: {}, visible: { transition: prefersReduced ? {} : { staggerChildren: 0.09, delayChildren: 0.05 } } }
  const staggerHid = { hidden: {}, visible: { transition: prefersReduced ? {} : { staggerChildren: 0.09, delayChildren: 0.70 } } }

  return (
    <motion.div
      className="w-full select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ margin: '0 auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="em-est-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="em-est-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background */}
        <motion.rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8}
          fill={`${TEAL}0.04)`}
          variants={fade} transition={{ ...fT, duration: 0.5 }}
        />

        <g transform={`translate(${OFFSET_X}, 0)`}>

        {/* ── Obvious connections (drawn FIRST, under nodes) ── */}
        <motion.g variants={staggerObv}>
          {obviousConn.map(c => {
            const fa = actorById(c.from), ta = actorById(c.to)
            const { lx, ly } = connMidpoint(c)
            return (
              <motion.g key={`conn-${c.from}-${c.to}`} variants={fade} transition={fT}>
                <line x1={fa.cx} y1={fa.cy} x2={ta.cx} y2={ta.cy}
                  stroke={`${TEAL}0.30)`} strokeWidth={1}
                />
                <text x={lx} y={ly - 6}
                  textAnchor="middle" dominantBaseline="auto"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                  fill={`${TEAL_TEXT}0.905)`} style={{ userSelect: 'none' }}
                >{c.label}</text>
              </motion.g>
            )
          })}
        </motion.g>

        {/* ── Obvious actor nodes ── */}
        <motion.g variants={staggerObv}>
          {obviousActors.map(actor => (
            <motion.g key={actor.id} variants={rise} transition={rT}>
              <circle cx={actor.cx} cy={actor.cy} r={actor.r}
                fill={actor.focal ? `${TEAL}0.18)` : `${TEAL}0.11)`}
                stroke={`${TEAL}0.52)`}
                strokeWidth={actor.focal ? 2 : 1.5}
                filter={actor.focal ? 'url(#em-est-glow)' : undefined}
              />
              {actor.label.map((line, li) => (
                <text key={li}
                  x={actor.cx} y={EXTERNAL_LABEL_DIR[actor.id] ? externalLabelY(actor, li) : nodeLabelY(actor, li)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)" letterSpacing="0.05em"
                  fill={`${TEAL_TEXT}0.979)`} style={{ userSelect: 'none' }}
                >{line}</text>
              ))}
            </motion.g>
          ))}
        </motion.g>

        {/* ── Non-obvious connections ── */}
        <motion.g variants={staggerHid}>
          {hiddenConn.map(c => {
            const fa = actorById(c.from), ta = actorById(c.to)
            const { lx, ly } = connMidpoint(c)
            return (
              <motion.g key={`conn-${c.from}-${c.to}`} variants={fade} transition={fT}>
                <line x1={fa.cx} y1={fa.cy} x2={ta.cx} y2={ta.cy}
                  stroke={`${AMBER}0.28)`} strokeWidth={1} strokeDasharray="5 3"
                />
                <text x={lx} y={ly - 6}
                  textAnchor="middle" dominantBaseline="auto"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                  fill={`${AMBER_TEXT}0.861)`} style={{ userSelect: 'none' }}
                >{c.label}</text>
              </motion.g>
            )
          })}
        </motion.g>

        {/* ── Non-obvious actor nodes (the hidden actors) ── */}
        <motion.g variants={staggerHid}>
          {hiddenActors.map(actor => (
            <motion.g key={actor.id} variants={rise} transition={rT}>
              {/* Amber dashed discovery ring */}
              <circle cx={actor.cx} cy={actor.cy} r={actor.r + 5}
                fill="none"
                stroke={`${AMBER}0.35)`} strokeWidth={1} strokeDasharray="4 3"
                filter="url(#em-est-amber)"
              />
              <circle cx={actor.cx} cy={actor.cy} r={actor.r}
                fill={`${AMBER}0.06)`}
                stroke={`${AMBER}0.45)`}
                strokeWidth={1.5}
              />
              {actor.label.map((line, li) => (
                <text key={li}
                  x={actor.cx} y={externalLabelY(actor, li)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)" letterSpacing="0.04em"
                  fill={`${AMBER}0.82)`} style={{ userSelect: 'none' }}
                >{line}</text>
              ))}
            </motion.g>
          ))}
        </motion.g>

        {/* Legend */}
        <motion.g
          variants={fade}
          transition={{ ...fT, delay: 1.1 }}
        >
          <circle cx={14} cy={SVG_H - 14} r={5} fill={`${TEAL}0.14)`} stroke={`${TEAL}0.45)`} strokeWidth={1} />
          <text x={22} y={SVG_H - 14}
            textAnchor="start" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
            fill={`${TEAL_TEXT}0.895)`} style={{ userSelect: 'none' }}
          >OBVIOUS ACTOR</text>
          <circle cx={144} cy={SVG_H - 14} r={5} fill={`${AMBER}0.06)`} stroke={`${AMBER}0.42)`} strokeWidth={1} />
          <text x={152} y={SVG_H - 14}
            textAnchor="start" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
            fill={`${AMBER_TEXT}0.845)`} style={{ userSelect: 'none' }}
          >NON-OBVIOUS ACTOR</text>
        </motion.g>

        </g>
      </svg>
    </motion.div>
  )
}
