'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const AMBER = 'rgba(245,158,11,'

const SVG_W = 700
const SVG_H = 380

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

type ConnectionDef = { from: ActorId; to: ActorId; label: string; obvious: boolean }

const CONNECTIONS: ConnectionDef[] = [
  { from: 'hosts',         to: 'platform',   label: 'LISTINGS / REVENUE',     obvious: true  },
  { from: 'guests',        to: 'platform',   label: 'BOOKINGS / DEMAND',      obvious: true  },
  { from: 'payment',       to: 'platform',   label: 'TRANSACTION FEES',       obvious: true  },
  { from: 'photographers', to: 'hosts',      label: 'PROFESSIONAL PHOTOS',    obvious: false },
  { from: 'cleaning',      to: 'platform',   label: 'SERVICE LAYER',          obvious: false },
  { from: 'regulators',    to: 'platform',   label: 'PERMITS & CONSTRAINTS',  obvious: false },
  { from: 'neighbors',     to: 'regulators', label: 'COMMUNITY PRESSURE',     obvious: false },
]

function actorById(id: ActorId): ActorDef {
  return ACTORS.find(a => a.id === id)!
}

function connMidpoint(c: ConnectionDef): { lx: number; ly: number } {
  const fa = actorById(c.from), ta = actorById(c.to)
  return { lx: (fa.cx + ta.cx) / 2, ly: (fa.cy + ta.cy) / 2 }
}

function nodeLabelY(actor: ActorDef, lineIndex: number): number {
  const lh = actor.focal ? 10 : 8.5
  const total = actor.label.length
  const topOffset = -(total - 1) * lh / 2
  return actor.cy + topOffset + lineIndex * lh
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
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
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
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${TEAL}0.55)`} style={{ userSelect: 'none' }}
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
                  x={actor.cx} y={nodeLabelY(actor, li)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={actor.focal ? '6.5' : '5.5'}
                  fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`${TEAL}0.90)`} style={{ userSelect: 'none' }}
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
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${AMBER}0.55)`} style={{ userSelect: 'none' }}
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
                  x={actor.cx} y={nodeLabelY(actor, li)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="5.5"
                  fontFamily="var(--font-mono)" letterSpacing="0.09em"
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
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${TEAL}0.50)`} style={{ userSelect: 'none' }}
          >OBVIOUS ACTOR</text>
          <circle cx={130} cy={SVG_H - 14} r={5} fill={`${AMBER}0.06)`} stroke={`${AMBER}0.42)`} strokeWidth={1} />
          <text x={138} y={SVG_H - 14}
            textAnchor="start" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER}0.50)`} style={{ userSelect: 'none' }}
          >NON-OBVIOUS ACTOR</text>
        </motion.g>
      </svg>
    </motion.div>
  )
}
