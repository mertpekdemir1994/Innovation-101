'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700
const SVG_H = 492
const CW = 300
const CH = 96
// Two thematic columns (obvious / non-obvious), four cards stacked in each,
// matching the layout used in SMEstablishing.
const COLS = [25, 375]
const ROW_TOP = 30, ROW_GAP = 106
const ROWS = [ROW_TOP, ROW_TOP + ROW_GAP, ROW_TOP + ROW_GAP * 2, ROW_TOP + ROW_GAP * 3]
const CAPTION_Y1 = SVG_H - 28, CAPTION_Y2 = SVG_H - 12

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
  // SAGE_TEXT-based floor: plain SAGE fails 4.5:1 on this dark background even at 1.0 opacity
  const nameOpacity = isGhost ? 0.85 : isPartial ? 0.92 : 1.0
  const hasNonObvious = isGhost || isPartial

  return (
    <g key={c.name}>
      <rect x={x} y={y} width={CW} height={CH} rx={3} fill={fill} stroke={stroke} strokeWidth={0.9} />
      {hasNonObvious && (
        <text x={x + CW - 10} y={y + 16} textAnchor="end" fontSize="11"
          fontFamily="system-ui, sans-serif" fill={`${SAGE_TEXT}0.926)`}
          style={{ userSelect: 'none' }}>★</text>
      )}
      <text x={x + CW / 2} y={y + 22} textAnchor="middle"
        fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.09em"
        fill={`${SAGE_TEXT}${nameOpacity})`} style={{ userSelect: 'none' }}>{c.name}</text>
      <text x={x + CW / 2} y={y + 40} textAnchor="middle"
        fontSize="11" fontFamily="system-ui, sans-serif" fill={`rgba(255,255,255,${isGhost ? 0.50 : 0.55})`}
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
        <text x={x + CW / 2} y={y + CH / 2 - 6} textAnchor="middle"
          fontSize="28" fontFamily="system-ui, sans-serif" fill="rgba(255,255,255,0.57)"
          style={{ userSelect: 'none' }}>?</text>
        <text x={x + CW / 2} y={y + CH / 2 + 24} textAnchor="middle"
          fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>NOT SURFACED</text>
      </g>
    )
  }

  const fill = isPartial ? `${INDIGO}0.07)` : `${INDIGO}0.10)`
  const stroke = isPartial ? `${INDIGO}0.25)` : `${INDIGO}0.38)`
  // INDIGO_TEXT-based floor: plain INDIGO fails 4.5:1 on this dark background even at 1.0 opacity
  const nameOpacity = isPartial ? 0.90 : 1.0
  const badgeOpacity = isPartial ? 0.85 : 1.0

  return (
    <g key={c.name}>
      <rect x={x} y={y} width={CW} height={CH} rx={3} fill={fill} stroke={stroke} strokeWidth={0.9} />
      {/* AI badge */}
      <rect x={x + 8} y={y + 8} width={130} height={18} rx={3}
        fill={`${INDIGO}0.20)`} />
      <text x={x + 14} y={y + 21} fontSize="11" fontFamily="system-ui, sans-serif"
        letterSpacing="0.08em" fill={`${INDIGO_TEXT}${badgeOpacity})`}
        style={{ userSelect: 'none' }}>{c.aiLabel}</text>
      <text x={x + CW / 2} y={y + 46} textAnchor="middle"
        fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.09em"
        fill={`${INDIGO_TEXT}${nameOpacity})`} style={{ userSelect: 'none' }}>{c.name}</text>
      <text x={x + CW / 2} y={y + 64} textAnchor="middle"
        fontSize="11" fontFamily="system-ui, sans-serif" fill={`${INDIGO_TEXT}0.885)`}
        style={{ userSelect: 'none' }}>{c.role}</text>
      {isPartial && (
        <text x={x + CW / 2} y={y + 82} textAnchor="middle"
          fontSize="11" fontFamily="system-ui, sans-serif"
          fill={`${INDIGO_TEXT}0.87)`} style={{ userSelect: 'none' }}>attributes incomplete</text>
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
                ? m === 'ai' ? `${INDIGO_TEXT}1)` : `${SAGE_TEXT}1)`
                : 'rgba(255,255,255,0.50)',
            }}
          >
            {m === 'human' ? 'Human-led' : 'AI-assisted'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="w-full" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}>
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
              {/* Column headers: obvious group (left), non-obvious group (right) */}
              <text x={COLS[0] + CW / 2} y={16} textAnchor="middle"
                fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.10em"
                fill={isAI ? `${INDIGO_TEXT}0.885)` : `${SAGE_TEXT}0.885)`}
                style={{ userSelect: 'none' }}>
                {isAI ? 'AI: OBVIOUS STAKEHOLDERS (LISTED)' : 'OBVIOUS STAKEHOLDERS'}
              </text>
              <text x={COLS[1] + CW / 2} y={16} textAnchor="middle"
                fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.10em"
                fill={isAI ? 'rgba(255,255,255,0.6)' : `${SAGE_TEXT}0.895)`}
                style={{ userSelect: 'none' }}>
                {isAI ? 'NON-OBVIOUS (NOT SURFACED WITHOUT GUIDANCE)' : 'NON-OBVIOUS (★)'}
              </text>

              {/* Cards: c.row picks the column (group), c.col picks the position within it */}
              {cards.map(c => {
                const x = COLS[c.row]
                const y = ROWS[c.col]
                return isAI ? renderAICard(c, x, y) : renderHumanCard(c, x, y)
              })}
            </motion.g>
          </AnimatePresence>

          {/* Caption */}
          {isAI ? (
            <>
              <text x={SVG_W / 2} y={CAPTION_Y1} textAnchor="middle"
                fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.08em"
                fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>
                AI LISTS OBVIOUS STAKEHOLDERS QUICKLY,
              </text>
              <text x={SVG_W / 2} y={CAPTION_Y2} textAnchor="middle"
                fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.08em"
                fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>
                BUT OFTEN MISSES INFORMAL, INDIRECT, AND BLOCKING ROLES
              </text>
            </>
          ) : (
            <text x={SVG_W / 2} y={CAPTION_Y2} textAnchor="middle"
              fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.08em"
              fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>
              HUMAN-LED MAPPING SURFACES THE FULL CAST, INCLUDING WHO AI TENDS TO OVERLOOK
            </text>
          )}
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
                { label: 'FULL CAST', body: 'A well-facilitated session surfaces all eight stakeholder types, including indirect recipients, hidden blockers, and community advocates who fall outside the team\'s usual field of view.' },
                { label: 'NON-OBVIOUS FIRST', body: 'The most valuable research subjects are often the least obvious: the downstream recipient who first reveals downstream harm, the silent blocker who will stall implementation if not addressed early.' },
                { label: 'LIVE ATTRIBUTES', body: 'Power, interest, attitude, and influence are nuanced judgements that require conversation, contextual knowledge, and domain expertise, not pattern-matching from public data.' },
              ].map(item => (
                <div key={item.label} className="rounded-lg border p-4"
                  style={{ borderColor: `${SAGE}0.20)`, background: `${SAGE}0.05)` }}>
                  <p className="text-2xs font-mono uppercase tracking-widest mb-2"
                    style={{ color: `${SAGE_TEXT}0.85)` }}>{item.label}</p>
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
                { label: 'SPEED, NOT SCOPE', body: 'AI generates an initial stakeholder list in seconds. The list is typically correct for the obvious roles, comprehensive within that class, but "comprehensive" here means all the expected names, not all the relevant ones.' },
                { label: 'STRUCTURAL BIAS', body: 'AI draws from documented sources: org charts, case studies, published research. Informal influencers, silent opponents, and people affected downstream rarely appear in those sources. They are systematically underrepresented in AI output.' },
                { label: 'HUMAN JUDGMENT', body: 'Attribute scoring (especially attitude and influence) requires qualitative judgment: knowing which VP quietly opposes the project, or which community voice makes adoption or breaks it. AI cannot reliably produce this from public data.' },
              ].map(item => (
                <div key={item.label} className="rounded-lg border p-4"
                  style={{ borderColor: `${INDIGO}0.20)`, background: `${INDIGO}0.05)` }}>
                  <p className="text-2xs font-mono uppercase tracking-widest mb-2"
                    style={{ color: `${INDIGO_TEXT}0.85)` }}>{item.label}</p>
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
