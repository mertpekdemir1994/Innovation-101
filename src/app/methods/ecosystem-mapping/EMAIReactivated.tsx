'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL   = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700
const SVG_H = 400

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

// Internal label position - only used for actors whose label fits inside
// the node (PLATFORM, HOSTS, GUESTS). All others use externalLabelY below.
function nodeLabelY(actor: ActorDef, lineIndex: number): number {
  const lh = actor.focal ? 16 : 8.5
  const topOffset = -(actor.label.length - 1) * lh / 2
  return actor.cy + topOffset + lineIndex * lh
}

// Nodes too small to hold their label at 11pt get it positioned outside the
// circle instead, above or below depending on which side has open room -
// same layout as EMEstablishing.
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

export default function EMAIReactivated() {
  const [aiMode, setAiMode] = useState(false)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.08)' }}
          role="group" aria-label="Mode toggle"
        >
          {(['Human Research', 'With AI'] as const).map(label => {
            const isAI = label === 'With AI'
            const isActive = isAI ? aiMode : !aiMode
            return (
              <button key={label}
                onClick={() => setAiMode(isAI)}
                className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  background: isActive
                    ? (isAI ? `${INDIGO}0.78)` : 'rgba(255,255,255,0.90)')
                    : 'transparent',
                  color: isActive ? (isAI ? '#fff' : '#111') : 'rgba(255,255,255,0.55)',
                }}
                aria-pressed={isActive}
              >{label}</button>
            )
          })}
        </div>
      </div>

      {/* Network SVG */}
      <div className="w-full select-none mb-10" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="em-ai-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8}
            fill={aiMode ? `${INDIGO}0.04)` : `${TEAL}0.04)`}
            style={{ transition: 'fill 0.35s' }}
          />

          {/* Connections - label at 30% from "from" toward "to" instead of
              the midpoint; several midpoint labels overlap the PLATFORM hub
              circle at 11pt */}
          {CONNECTIONS.map(c => {
            const fa = actorById(c.from), ta = actorById(c.to)
            const lx = fa.cx + (ta.cx - fa.cx) * 0.3
            const ly = fa.cy + (ta.cy - fa.cy) * 0.3
            const dimInAI = aiMode && !c.obvious
            return (
              <motion.g key={`conn-${c.from}-${c.to}`}
                animate={{ opacity: dimInAI ? 0.12 : 1 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.40, ease }}
              >
                <line x1={fa.cx} y1={fa.cy} x2={ta.cx} y2={ta.cy}
                  stroke={
                    aiMode
                      ? (c.obvious ? `${INDIGO}0.35)` : `${AMBER}0.25)`)
                      : (c.obvious ? `${TEAL}0.32)` : `${AMBER}0.28)`)
                  }
                  strokeWidth={1}
                  strokeDasharray={c.obvious ? undefined : '5 3'}
                  style={{ transition: 'stroke 0.35s' }}
                />
                <text x={lx} y={ly - 6}
                  textAnchor="middle" dominantBaseline="auto"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                  fill={
                    aiMode
                      ? (c.obvious ? `${INDIGO_TEXT}0.905)` : `${AMBER_TEXT}0.798)`)
                      : (c.obvious ? `${TEAL_TEXT}0.905)` : `${AMBER_TEXT}0.845)`)
                  }
                  style={{ userSelect: 'none', transition: 'fill 0.35s' }}
                >{c.label}</text>
              </motion.g>
            )
          })}

          {/* Actor nodes */}
          {ACTORS.map(actor => {
            const dimInAI = aiMode && !actor.obvious
            return (
              <motion.g key={actor.id}
                animate={{ opacity: dimInAI ? 0.12 : 1 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.40, ease }}
              >
                {!actor.obvious && (
                  <circle cx={actor.cx} cy={actor.cy} r={actor.r + 5}
                    fill="none"
                    stroke={`${AMBER}0.32)`} strokeWidth={1} strokeDasharray="4 3"
                  />
                )}
                <circle cx={actor.cx} cy={actor.cy} r={actor.r}
                  fill={
                    aiMode
                      ? (actor.obvious ? `${INDIGO}0.12)` : `${AMBER}0.05)`)
                      : (actor.focal ? `${TEAL}0.18)` : actor.obvious ? `${TEAL}0.11)` : `${AMBER}0.06)`)
                  }
                  stroke={
                    aiMode
                      ? (actor.obvious ? `${INDIGO}0.50)` : `${AMBER}0.30)`)
                      : (actor.focal ? `${TEAL}0.55)` : actor.obvious ? `${TEAL}0.45)` : `${AMBER}0.42)`)
                  }
                  strokeWidth={actor.focal ? 2 : 1.5}
                  filter={actor.focal ? 'url(#em-ai-glow)' : undefined}
                  style={{ transition: 'fill 0.35s, stroke 0.35s' }}
                />
                {actor.label.map((line, li) => (
                  <text key={li}
                    x={actor.cx} y={EXTERNAL_LABEL_DIR[actor.id] ? externalLabelY(actor, li) : nodeLabelY(actor, li)}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="11"
                    fontFamily="var(--font-mono)" letterSpacing="0.05em"
                    fill={
                      aiMode
                        ? (actor.obvious ? `${INDIGO_TEXT}0.962)` : `${AMBER_TEXT}0.876)`)
                        : (actor.obvious ? `${TEAL_TEXT}0.979)` : `${AMBER}0.82)`)
                    }
                    style={{ userSelect: 'none', transition: 'fill 0.35s' }}
                  >{line}</text>
                ))}
              </motion.g>
            )
          })}

          {/* AI mode annotations */}
          <AnimatePresence>
            {aiMode && (
              <>
                <motion.text key="ai-maps"
                  x={350} y={198 + 60}
                  textAnchor="middle" dominantBaseline="hanging"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                  fill={`${INDIGO_TEXT}0.905)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30 }}
                >AI MAPS THE VISIBLE WEB</motion.text>

                {/* Moved above the photographers node instead of below - its
                    label now sits below the node externally (see
                    EXTERNAL_LABEL_DIR), and the two would otherwise collide */}
                <motion.text key="ai-misses"
                  x={88} y={294 - 30 - 32}
                  textAnchor="middle" dominantBaseline="hanging"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                  fill={`${AMBER_TEXT}0.83)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30 }}
                >AI MISSES</motion.text>
              </>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Info cards */}
      <AnimatePresence>
        {aiMode && (
          <motion.div
            className="grid md:grid-cols-2 gap-5 mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="rounded-xl p-5"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO_TEXT}0.90)` }}
              >Where AI is strong</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI can rapidly assemble the documented, visible structure of a well-understood ecosystem: the obvious actors and the textbook flows between them. For a known domain like a rental marketplace, AI quickly produces the platform, hosts, guests, payment provider structure: the standard two-sided-market description. Genuinely useful as a starting scaffold and faster than building from scratch.
              </p>
            </div>
            <div className="rounded-xl p-5"
              style={{ background: `${AMBER}0.04)`, border: `1px solid ${AMBER}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}
              >Where AI goes faint</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI maps the ecosystem as it is commonly described. The non-obvious actors (the quiet intermediary, the informal power broker, the emerging complementor) are the ones least likely to appear in the common description of a domain, and they are where the insight almost always lives. The AI draws the two-sided-market view fast; the hidden actors that actually move the system require human system-knowledge and a deliberate hunt for what isn&rsquo;t obvious.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis - always visible */}
      <div className="rounded-xl p-6" style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.20)` }}>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${TEAL_TEXT}0.90)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI accelerates the assembly and analysis of the visible ecosystem: real value. It can produce the documented structure of a domain fast, model how value flows through the mapped system, and keep the map current as the ecosystem shifts. But the distinctive payoff of ecosystem mapping is spotting the non-obvious actor and the informal flow that reveal where a system can actually be moved. That depends on human system-knowledge and the deliberate hunt for what the common description omits, which is exactly what AI, reasoning from that common description, is least likely to surface. Use AI to build the visible scaffold; hunt for the hidden actors yourself.
        </p>
      </div>
    </div>
  )
}
