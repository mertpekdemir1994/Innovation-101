'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

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

const ACTOR_DETAIL: Record<ActorId, { role: string; flowsTo: string; flowsFrom: string; leverage: string }> = {
  platform: {
    role: 'The focal actor: the marketplace infrastructure connecting supply (hosts) and demand (guests), setting the terms of trade and controlling the matching algorithm.',
    flowsTo: 'Access, visibility, and pricing to hosts; search, trust signals, and accommodation access to guests; fees to payment providers; reporting to regulators.',
    flowsFrom: 'Listings from hosts; booking demand and payments from guests; transaction processing from payment providers; permits and constraints from regulators; operational support from cleaning and co-host services.',
    leverage: 'The platform controls the matching algorithm, the pricing model, the trust system, and the terms of trade. Interventions here ripple to every actor in the system.',
  },
  hosts: {
    role: 'The supply side. Individuals or property managers who list their properties for short-term rental. The primary creator of inventory in the system.',
    flowsTo: 'Listings, availability, pricing, and in-person hosting quality to the platform and guests.',
    flowsFrom: 'Booking revenue from the platform; professional photos from photographers (a key driver of booking rate); operational support from cleaning and co-host services.',
    leverage: 'Host quality and listing photo quality are primary drivers of conversion. Moderate switching costs: hosts will defect to competing platforms if economics shift significantly.',
  },
  guests: {
    role: 'The demand side. Travelers seeking short-term accommodation and the source of revenue for the whole system.',
    flowsTo: 'Booking demand, payments, and reviews (a critical trust signal that feeds the platform\'s matching algorithm).',
    flowsFrom: 'Access to accommodation, pricing transparency, and trust signals from the platform and hosts.',
    leverage: 'Revenue driver with low switching costs. Guest reviews and behavior data are primary inputs to the matching algorithm: guests collectively shape which listings succeed.',
  },
  payment: {
    role: 'Payment processing infrastructure, typically a third-party provider handling all financial transactions between guests, hosts, and the platform.',
    flowsTo: 'Reliable, fraud-resistant transaction processing; timely settlement of funds to hosts.',
    flowsFrom: 'Transaction fees from every booking.',
    leverage: 'Low visible leverage, high systemic risk. A payment provider failure or regulatory action would halt all transactions, often invisible in the two-sided-market framing until it fails.',
  },
  photographers: {
    role: 'Professional photographers who photograph host listings. A non-obvious value-creating actor, not part of the standard two-sided-market description of a rental marketplace.',
    flowsTo: 'Professional listing photos to hosts, which drive dramatically higher booking rates per internal platform data.',
    flowsFrom: 'Fees from hosts; indirectly, a viable market from the platform\'s economic health.',
    leverage: 'High hidden leverage. A primary driver of supply-side quality and booking conversion. This insight, specific to this business\'s real data, led directly to the platform providing professional photography as a service.',
  },
  cleaning: {
    role: 'Cleaning services and co-host managers handling the operational work of running a short-term rental. Part of a supporting economy that emerged around the platform.',
    flowsTo: 'Operational quality and reliability to hosts; enables hosts to scale without personal operational capacity.',
    flowsFrom: 'Service fees from hosts; a steady supply of properties to service from the platform\'s growth.',
    leverage: 'Systemic but invisible: the platform\'s supply side can only scale as fast as the cleaning and co-hosting infrastructure can grow. Omitted from the two-sided framing entirely.',
  },
  regulators: {
    role: 'Local housing authorities and city governments with the power to permit, constrain, tax, or shut down short-term rental activity in a geography.',
    flowsTo: 'Permits, operating constraints, compliance requirements, and in extreme cases, market shutdowns.',
    flowsFrom: 'Tax revenue from platform activity; community pressure and political signals from neighbors.',
    leverage: 'Existential at the geographic level. A regulator who restricts short-term rentals can effectively close a local market. Peripheral on the map but decisive: what neighbors do directly shapes what regulators decide.',
  },
  neighbors: {
    role: 'Residential neighbors and local communities affected by short-term rental activity: noise, parking, neighborhood character, housing availability.',
    flowsTo: 'Community pressure, trust or distrust, and political signals to local regulators, shaping the regulatory environment the platform operates in.',
    flowsFrom: 'Positive or negative externalities from rental activity: noise, congestion, and changed neighborhood character.',
    leverage: 'High indirect leverage through regulators. Neighbor hostility → community organizing → regulatory pressure → market constraint. This informal, trust-based dynamic rarely appears in documented ecosystem descriptions. AI-generated maps almost always miss it.',
  },
}

function actorById(id: ActorId): ActorDef {
  return ACTORS.find(a => a.id === id)!
}

function isConnected(actorId: ActorId, conn: ConnectionDef): boolean {
  return conn.from === actorId || conn.to === actorId
}

function nodeOpacity(id: ActorId, active: ActorId | null, conn: ConnectionDef[]): number {
  if (!active) return 1
  if (id === active) return 1
  // adjacent: connected to active
  if (conn.some(c => (c.from === active && c.to === id) || (c.to === active && c.from === id))) return 0.55
  return 0.14
}

function connOpacity(c: ConnectionDef, active: ActorId | null): number {
  if (!active) return 1
  if (isConnected(active, c)) return 1
  return 0.08
}

function nodeLabelY(actor: ActorDef, lineIndex: number): number {
  const lh = actor.focal ? 10 : 8.5
  const total = actor.label.length
  const topOffset = -(total - 1) * lh / 2
  return actor.cy + topOffset + lineIndex * lh
}

export default function EMInteractive() {
  const [active, setActive] = useState<ActorId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const detail = active ? ACTOR_DETAIL[active] : null
  const activeActor = active ? ACTORS.find(a => a.id === active) : null

  return (
    <div>
      <div className="w-full select-none mb-8" aria-label="Click an actor to explore their role">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="em-int-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8} fill={`${TEAL}0.04)`} />

          {/* Connections (drawn under nodes) */}
          {CONNECTIONS.map(c => {
            const fa = actorById(c.from), ta = actorById(c.to)
            const lx = (fa.cx + ta.cx) / 2
            const ly = (fa.cy + ta.cy) / 2
            const op = connOpacity(c, active)
            return (
              <motion.g key={`conn-${c.from}-${c.to}`}
                animate={{ opacity: op }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.22, ease }}
              >
                <line x1={fa.cx} y1={fa.cy} x2={ta.cx} y2={ta.cy}
                  stroke={c.obvious ? `${TEAL}0.35)` : `${AMBER}0.30)`}
                  strokeWidth={active && isConnected(active, c) ? 1.5 : 1}
                  strokeDasharray={c.obvious ? undefined : '5 3'}
                />
                <text x={lx} y={ly - 6}
                  textAnchor="middle" dominantBaseline="auto"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={c.obvious ? `${TEAL_TEXT}0.905)` : `${AMBER_TEXT}0.845)`}
                  style={{ userSelect: 'none' }}
                >{c.label}</text>
              </motion.g>
            )
          })}

          {/* Actor nodes */}
          {ACTORS.map(actor => {
            const isActive = active === actor.id
            const op = nodeOpacity(actor.id, active, CONNECTIONS)
            return (
              <motion.g key={actor.id}
                animate={{ opacity: op }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.22, ease }}
                onClick={() => setActive(isActive ? null : actor.id)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-pressed={isActive}
                aria-label={`${actor.label.join(' ')}, click to explore`}
              >
                {/* Hit area */}
                <circle cx={actor.cx} cy={actor.cy} r={actor.r + 8} fill="transparent" />
                {/* Active ring */}
                {isActive && (
                  <circle cx={actor.cx} cy={actor.cy} r={actor.r + 6}
                    fill="none"
                    stroke={actor.obvious ? `${TEAL}0.60)` : `${AMBER}0.60)`}
                    strokeWidth={1.5}
                  />
                )}
                {/* Non-obvious amber dashed ring (always visible) */}
                {!actor.obvious && (
                  <circle cx={actor.cx} cy={actor.cy} r={actor.r + 5}
                    fill="none"
                    stroke={`${AMBER}0.32)`} strokeWidth={1} strokeDasharray="4 3"
                  />
                )}
                {/* Node circle */}
                <circle cx={actor.cx} cy={actor.cy} r={actor.r}
                  fill={
                    isActive
                      ? (actor.obvious ? `${TEAL}0.22)` : `${AMBER}0.10)`)
                      : (actor.focal ? `${TEAL}0.16)` : actor.obvious ? `${TEAL}0.10)` : `${AMBER}0.05)`)
                  }
                  stroke={
                    isActive
                      ? (actor.obvious ? `${TEAL}0.72)` : `${AMBER}0.70)`)
                      : (actor.obvious ? `${TEAL}0.48)` : `${AMBER}0.42)`)
                  }
                  strokeWidth={isActive || actor.focal ? 2 : 1.5}
                  filter={actor.focal && isActive ? 'url(#em-int-glow)' : undefined}
                  style={{ transition: 'fill 0.18s, stroke 0.18s' }}
                />
                {/* Labels */}
                {actor.label.map((line, li) => (
                  <text key={li}
                    x={actor.cx} y={nodeLabelY(actor, li)}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={actor.focal ? '6.5' : '5.5'}
                    fontFamily="var(--font-mono)" letterSpacing="0.10em"
                    fill={actor.obvious ? `${TEAL_TEXT}0.979)` : `${AMBER}0.82)`}
                    style={{ userSelect: 'none', transition: 'fill 0.18s' }}
                  >{line}</text>
                ))}
              </motion.g>
            )
          })}

          {/* Tap cue */}
          {!active && (
            <text x={SVG_W / 2} y={SVG_H - 8}
              textAnchor="middle" dominantBaseline="auto"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}
            >tap any actor</text>
          )}
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {detail && activeActor && (
          <motion.div key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease }}
            className="rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${activeActor.obvious ? `${TEAL}0.28)` : `${AMBER}0.28)`}`,
              background: `${activeActor.obvious ? `${TEAL}0.06)` : `${AMBER}0.04)`}`,
            }}
          >
            <div className="px-6 pt-5 pb-4"
              style={{ borderBottom: `1px solid ${activeActor.obvious ? `${TEAL}0.12)` : `${AMBER}0.12)`}` }}
            >
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{
                  fontSize: 'var(--text-2xs)',
                  color: activeActor.obvious ? `${TEAL}0.80)` : `${AMBER}0.80)`,
                }}
              >{activeActor.label.join(' ')}
                {!activeActor.obvious && (
                  <span style={{ marginLeft: 8, opacity: 0.65 }}>- NON-OBVIOUS ACTOR</span>
                )}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                {detail.role}
              </p>
            </div>

            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {[
                { label: 'What flows from them', body: detail.flowsFrom },
                { label: 'What flows to them',   body: detail.flowsTo   },
                { label: 'Their leverage',        body: detail.leverage  },
              ].map(({ label, body }) => (
                <div key={label} className="p-5">
                  <p className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.62)' }}
                  >{label}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.48)', lineHeight: 'var(--leading-relaxed)' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p className="text-center" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.28)', marginTop: '1rem' }}>
          Select an actor to see their role, flows, and leverage
        </p>
      )}
    </div>
  )
}
