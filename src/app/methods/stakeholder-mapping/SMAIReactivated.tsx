'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 700
const SVG_H = 258
const CW = 126
const CH = 78
const COLS = [68, 214, 360, 506]
const ROWS = [20, 114]

type Mode = 'human' | 'ai'
type CardStatus = 'obvious' | 'partial' | 'ghost'

type CardDef = {
  col: number
  row: number
  name: string
  role: string
  status: CardStatus
  aiLabel?: string
}

const CARDS_HUMAN: CardDef[] = [
  { col: 0, row: 0, name: 'END USER',        role: 'Primary user',          status: 'obvious'  },
  { col: 1, row: 0, name: 'DECISION MAKER',  role: 'Authority holder',      status: 'obvious'  },
  { col: 2, row: 0, name: 'BUDGET HOLDER',   role: 'Resource gatekeeper',   status: 'obvious'  },
  { col: 3, row: 0, name: 'REGULATOR',       role: 'Rule-setter',           status: 'obvious'  },
  { col: 0, row: 1, name: 'FRONTLINE STAFF', role: 'Daily implementer',     status: 'partial'  },
  { col: 1, row: 1, name: 'DOWNSTREAM',      role: 'Indirect recipient',    status: 'ghost'    },
  { col: 2, row: 1, name: 'SILENT BLOCKER',  role: 'Hidden obstacle',       status: 'ghost'    },
  { col: 3, row: 1, name: 'ADVOCATE',        role: 'Community voice',       status: 'ghost'    },
]

const CARDS_AI: CardDef[] = [
  { col: 0, row: 0, name: 'END USER',        role: 'Primary user',          status: 'obvious', aiLabel: 'AI: LISTED' },
  { col: 1, row: 0, name: 'DECISION MAKER',  role: 'Authority holder',      status: 'obvious', aiLabel: 'AI: LISTED' },
  { col: 2, row: 0, name: 'BUDGET HOLDER',   role: 'Resource gatekeeper',   status: 'obvious', aiLabel: 'AI: LISTED' },
  { col: 3, row: 0, name: 'REGULATOR',       role: 'Rule-setter',           status: 'obvious', aiLabel: 'AI: LISTED' },
  { col: 0, row: 1, name: 'FRONTLINE STAFF', role: 'Daily implementer',     status: 'partial', aiLabel: 'AI: INCOMPLETE' },
  { col: 1, row: 1, name: 'DOWNSTREAM',      role: 'Indirect recipient',    status: 'ghost',   aiLabel: 'NOT SURFACED' },
  { col: 2, row: 1, name: 'SILENT BLOCKER',  role: 'Hidden obstacle',       status: 'ghost',   aiLabel: 'NOT SURFACED' },
  { col: 3, row: 1, name: 'ADVOCATE',        role: 'Community voice',       status: 'ghost',   aiLabel: 'NOT SURFACED' },
]

function renderHumanCard(c: CardDef, x: number, y: number) {
  const isGhost = c.status === 'ghost'
  const isPartial = c.status === 'partial'
  const fill = isGhost ? `${SAGE}0.05)` : isPartial ? `${SAGE}0.07)` : `${SAGE}0.08)`
  const stroke = isGhost ? `${SAGE}0.22)` : isPartial ? `${SAGE}0.30)` : `${SAGE}0.35)`
  const nameOpacity = isGhost ? 0.55 : isPartial ? 0.70 : 0.90
  const hasNonObvious = isGhost || isPartial

  return (
    <g key={c.name}>
      <rect x={x} y={y} width={CW} height={CH} rx={3} fill={fill} stroke={stroke} strokeWidth={0.9} />
      {hasNonObvious && (
        <text x={x + CW - 7} y={y + 11} textAnchor="end" fontSize="6"
          fontFamily="system-ui, sans-serif" fill={`${SAGE}0.65)`}
          style={{ userSelect: 'none' }}>★</text>
      )}
      <text x={x + CW / 2} y={y + 17} textAnchor="middle"
        fontSize="6.5" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.09em"
        fill={`${SAGE}${nameOpacity})`} style={{ userSelect: 'none' }}>{c.name}</text>
      <text x={x + CW / 2} y={y + 28} textAnchor="middle"
        fontSize="5" fontFamily="system-ui, sans-serif" fill={`rgba(255,255,255,${isGhost ? 0.22 : 0.35})`}
        style={{ userSelect: 'none' }}>{c.role}</text>
    </g>
  )
}

function renderAICard(c: CardDef, x: number, y: number) {
  const isGhost = c.status === 'ghost'
  const isPartial = c.status === 'partial'

  if (isGhost) {
    return (
      <g key={c.name}>
        <rect x={x} y={y} width={CW} height={CH} rx={3}
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={0.7} strokeDasharray="4 3" />
        <text x={x + CW / 2} y={y + CH / 2 - 4} textAnchor="middle"
          fontSize="12" fontFamily="system-ui, sans-serif" fill="rgba(255,255,255,0.14)"
          style={{ userSelect: 'none' }}>?</text>
        <text x={x + CW / 2} y={y + CH / 2 + 10} textAnchor="middle"
          fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.18)" style={{ userSelect: 'none' }}>NOT SURFACED</text>
      </g>
    )
  }

  const fill = isPartial ? `${INDIGO}0.07)` : `${INDIGO}0.10)`
  const stroke = isPartial ? `${INDIGO}0.25)` : `${INDIGO}0.38)`
  const nameOpacity = isPartial ? 0.65 : 0.88
  const badgeOpacity = isPartial ? 0.50 : 0.75

  return (
    <g key={c.name}>
      <rect x={x} y={y} width={CW} height={CH} rx={3} fill={fill} stroke={stroke} strokeWidth={0.9} />
      {/* AI badge */}
      <rect x={x + 6} y={y + 6} width={54} height={10} rx={2}
        fill={`${INDIGO}0.20)`} />
      <text x={x + 9} y={y + 14} fontSize="4.5" fontFamily="system-ui, sans-serif"
        letterSpacing="0.08em" fill={`${INDIGO}${badgeOpacity})`}
        style={{ userSelect: 'none' }}>{c.aiLabel}</text>
      <text x={x + CW / 2} y={y + 37} textAnchor="middle"
        fontSize="6.5" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.09em"
        fill={`${INDIGO}${nameOpacity})`} style={{ userSelect: 'none' }}>{c.name}</text>
      <text x={x + CW / 2} y={y + 49} textAnchor="middle"
        fontSize="5" fontFamily="system-ui, sans-serif" fill={`${INDIGO}0.45)`}
        style={{ userSelect: 'none' }}>{c.role}</text>
      {isPartial && (
        <text x={x + CW / 2} y={y + 62} textAnchor="middle"
          fontSize="4.5" fontFamily="system-ui, sans-serif"
          fill={`${INDIGO}0.38)`} style={{ userSelect: 'none' }}>attributes incomplete</text>
      )}
    </g>
  )
}

export default function SMAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const cards = isAI ? CARDS_AI : CARDS_HUMAN

  return (
    <div className="w-full">
      {/* Mode toggle */}
      <div className="flex justify-center gap-3 mb-6">
        {(['human', 'ai'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.12)` : `${SAGE}0.12)`
                : 'rgba(255,255,255,0.05)',
              border: `1px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.38)` : `${SAGE}0.38)`
                : 'rgba(255,255,255,0.12)'}`,
              color: mode === m
                ? m === 'ai' ? `${INDIGO}1)` : `${SAGE}1)`
                : 'rgba(255,255,255,0.40)',
            }}
          >
            {m === 'human' ? 'Human-led' : 'AI-assisted'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="w-full" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <filter id="sm-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feFlood floodColor={`${INDIGO}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <AnimatePresence mode="wait">
            <motion.g
              key={mode}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {/* Row labels */}
              <text x={SVG_W / 2} y={12} textAnchor="middle"
                fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.10em"
                fill={isAI ? `${INDIGO}0.45)` : `${SAGE}0.45)`}
                style={{ userSelect: 'none' }}>
                {isAI ? 'AI: OBVIOUS STAKEHOLDERS (LISTED)' : 'OBVIOUS STAKEHOLDERS'}
              </text>
              <text x={SVG_W / 2} y={108} textAnchor="middle"
                fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.10em"
                fill={isAI ? 'rgba(255,255,255,0.20)' : `${SAGE}0.50)`}
                style={{ userSelect: 'none' }}>
                {isAI ? 'NON-OBVIOUS (NOT SURFACED WITHOUT GUIDANCE)' : 'NON-OBVIOUS (★)'}
              </text>

              {/* Cards */}
              {cards.map(c => {
                const x = COLS[c.col]
                const y = ROWS[c.row]
                return isAI ? renderAICard(c, x, y) : renderHumanCard(c, x, y)
              })}
            </motion.g>
          </AnimatePresence>

          {/* Caption */}
          <text x={SVG_W / 2} y={SVG_H - 4} textAnchor="middle"
            fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.20)"
            style={{ userSelect: 'none' }}>
            {isAI
              ? 'AI LISTS OBVIOUS STAKEHOLDERS QUICKLY — BUT OFTEN MISSES INFORMAL, INDIRECT, AND BLOCKING ROLES'
              : 'HUMAN-LED MAPPING SURFACES THE FULL CAST — INCLUDING WHO AI TENDS TO OVERLOOK'}
          </text>
        </svg>
      </div>

      {/* Explanation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <AnimatePresence mode="wait">
          {!isAI ? (
            <motion.div
              key="human-cards"
              className="contents"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {[
                { label: 'FULL CAST', body: 'A well-facilitated session surfaces all eight stakeholder types — including indirect recipients, hidden blockers, and community advocates who fall outside the team\'s usual field of view.' },
                { label: 'NON-OBVIOUS FIRST', body: 'The most valuable research subjects are often the least obvious: the downstream recipient who first reveals downstream harm, the silent blocker who will stall implementation if not addressed early.' },
                { label: 'LIVE ATTRIBUTES', body: 'Power, interest, attitude, and influence are nuanced judgements that require conversation, contextual knowledge, and domain expertise — not pattern-matching from public data.' },
              ].map(item => (
                <div key={item.label} className="rounded-lg border p-4"
                  style={{ borderColor: `${SAGE}0.20)`, background: `${SAGE}0.05)` }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-2"
                    style={{ color: `${SAGE}0.75)` }}>{item.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>{item.body}</p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="ai-cards"
              className="contents"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {[
                { label: 'SPEED, NOT SCOPE', body: 'AI generates an initial stakeholder list in seconds. The list is typically correct for the obvious roles, comprehensive within that class — but "comprehensive" here means all the expected names, not all the relevant ones.' },
                { label: 'STRUCTURAL BIAS', body: 'AI draws from documented sources: org charts, case studies, published research. Informal influencers, silent opponents, and people affected downstream rarely appear in those sources. They are systematically underrepresented in AI output.' },
                { label: 'HUMAN JUDGMENT', body: 'Attribute scoring (especially attitude and influence) requires qualitative judgment: knowing which VP quietly opposes the project, or which community voice makes adoption or breaks it. AI cannot reliably produce this from public data.' },
              ].map(item => (
                <div key={item.label} className="rounded-lg border p-4"
                  style={{ borderColor: `${INDIGO}0.20)`, background: `${INDIGO}0.05)` }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-2"
                    style={{ color: `${INDIGO}0.75)` }}>{item.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>{item.body}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
