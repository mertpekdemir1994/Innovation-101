'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY  = 'rgba(31,58,95,'
const AMBER = 'rgba(245,158,11,'

const SVG_W = 700
const SVG_H = 440

const TL = { x: 10,  y: 10,  w: 328, h: 188 }
const TR = { x: 362, y: 10,  w: 328, h: 188 }
const BL = { x: 10,  y: 242, w: 328, h: 188 }
const BR = { x: 362, y: 242, w: 328, h: 188 }

const CX = 350, CY = 220, CRO = 36, CRI = 26
const HEAD_CY = 209, HEAD_R = 10

type QuadrantId = 'says' | 'thinks' | 'does' | 'feels'
type ActiveState = QuadrantId | 'gap' | null

type QuadrantDef = {
  id: QuadrantId
  rect: typeof TL
  label: string
  entries: [string, string, string]
}

const QUADS: QuadrantDef[] = [
  {
    id: 'says',
    rect: TL,
    label: 'SAYS',
    entries: ['"I know I should save more"', '"I\'m pretty responsible with money"', '"I\'ll sort it out next year"'],
  },
  {
    id: 'thinks',
    rect: TR,
    label: 'THINKS',
    entries: ['retirement feels impossibly far away', 'doesn\'t really understand how it works', 'other things feel more urgent'],
  },
  {
    id: 'does',
    rect: BL,
    label: 'DOES',
    entries: ['avoids opening account statements', 'hasn\'t changed contributions in years', 'closes app without taking action'],
  },
  {
    id: 'feels',
    rect: BR,
    label: 'FEELS',
    entries: ['quiet shame whenever it comes up', 'anxious when confronted with numbers', 'a sense of failure, rarely spoken'],
  },
]

type Detail = { title: string; body: string; tip: string }

const DETAILS: Record<QuadrantId | 'gap', Detail> = {
  says: {
    title: 'SAYS: the stated',
    body: "What the person says out loud: their direct quotes, stated preferences, and explicit explanations. The most visible quadrant and the least reliable on its own. People say what they believe, what presents them well, or what the conversation calls for. SAYS is the starting point, not the destination.",
    tip: 'Pair with DOES: when SAYS and DOES contradict each other, you have found something real.',
  },
  thinks: {
    title: 'THINKS: the believed',
    body: "What occupies the person's mind: their beliefs, mental models, preoccupations, and unspoken assumptions. THINKS may differ from SAYS: social pressure, embarrassment, or politeness often produces a gap between the stated and the believed. This is the quadrant of tacit knowledge.",
    tip: "Harder to fill than SAYS. It requires careful reading of tone, hesitation, and what is conspicuously absent from the conversation.",
  },
  does: {
    title: 'DOES: the actual',
    body: "What the person actually does: observed behavior, recorded actions, measurable choices. DOES is drawn from field observation and behavioral data, not self-report. When DOES contradicts SAYS, trust DOES: behavior does not perform for an audience the way words do.",
    tip: "The most reliable quadrant for surfacing the Says-vs-Does contradiction. Behavior is the evidence; words are the presentation.",
  },
  feels: {
    title: 'FEELS: the interpretive heart',
    body: "The person's emotional state: their anxieties, hopes, shame, pride, and frustrations. FEELS is the hardest quadrant to fill honestly and the most valuable. The emotional truth beneath behavior is usually what a design must actually address. Every entry should trace to evidence from the research, not assumption.",
    tip: "The emotion the person names ('I'm frustrated') is often not the deepest emotion. Read carefully for what they do not name: the shame, the avoidance, the quiet sense of failure.",
  },
  gap: {
    title: 'THE GAP: SAYS vs DOES',
    body: "The most valuable move in empathy mapping is finding where SAYS and DOES contradict each other, and then understanding, through FEELS, why. The person who says 'I know I should save more' and avoids the statements is telling you something no individual quadrant could reveal. The gap between SAYS and DOES is not a puzzle to resolve; it is the insight to design from.",
    tip: "FEELS explains the gap. When you find the SAYS-vs-DOES contradiction, look at FEELS for the emotional truth that explains why the behavior diverges from the words.",
  },
}

function quadOpacity(id: QuadrantId, active: ActiveState): number {
  if (active === null) return 1
  if (active === 'gap') return (id === 'says' || id === 'does') ? 1 : 0.14
  return active === id ? 1 : 0.14
}

function quadIsActive(id: QuadrantId, active: ActiveState): boolean {
  if (active === 'gap') return id === 'says' || id === 'does'
  return active === id
}

export default function EMPInteractive() {
  const [active, setActive] = useState<ActiveState>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const toggle = (next: ActiveState) => setActive(prev => prev === next ? null : next)

  const activeDetail = active ? DETAILS[active] : null

  return (
    <div>
      {/* Control buttons */}
      <div className="flex gap-2 mb-6 flex-wrap" role="group" aria-label="Empathy map quadrants">
        {QUADS.map(q => (
          <button
            key={q.id}
            onClick={() => toggle(q.id)}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            style={{
              background: active === q.id ? `${NAVY}0.82)` : 'transparent',
              color: active === q.id ? '#fff' : 'rgba(255,255,255,0.52)',
              border: `1.5px solid ${active === q.id ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.16)'}`,
            }}
            aria-pressed={active === q.id}
          >{q.label}</button>
        ))}
        <button
          onClick={() => toggle('gap')}
          className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
          style={{
            background: active === 'gap' ? `${AMBER}0.82)` : 'transparent',
            color: active === 'gap' ? '#fff' : `${AMBER}0.65)`,
            border: `1.5px solid ${active === 'gap' ? `${AMBER}0.60)` : `${AMBER}0.28)`}`,
          }}
          aria-pressed={active === 'gap'}
        >SAYS ≠ DOES</button>
      </div>

      {/* Canvas */}
      <div className="w-full select-none mb-6" aria-label="Empathy map, click a quadrant or use the buttons above to explore">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="emp-int-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="emp-int-feels-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={10} fill={`${NAVY}0.05)`} />

          {/* Hint text */}
          {active === null && (
            <text
              x={SVG_W / 2} y={SVG_H - 8}
              textAnchor="middle" dominantBaseline="auto"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill="rgba(255,255,255,0.59)"
              style={{ userSelect: 'none' }}
            >tap a quadrant or use the buttons above to reveal what goes there</text>
          )}

          {/* Quadrants */}
          {QUADS.map(q => {
            const isActive  = quadIsActive(q.id, active)
            const isFeeels  = q.id === 'feels'
            const opacity   = quadOpacity(q.id, active)
            const cx        = q.rect.x + q.rect.w / 2

            return (
              <motion.g
                key={q.id}
                animate={{ opacity }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.20 }}
                onClick={() => toggle(q.id)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-pressed={active === q.id}
                aria-label={`${q.label} quadrant, click to explore`}
              >
                {/* Hit area */}
                <rect x={q.rect.x - 2} y={q.rect.y - 2} width={q.rect.w + 4} height={q.rect.h + 4} fill="transparent" />

                {/* Background */}
                <rect
                  x={q.rect.x} y={q.rect.y} width={q.rect.w} height={q.rect.h} rx={8}
                  fill={isActive
                    ? (isFeeels ? `${NAVY}0.22)` : `${NAVY}0.16)`)
                    : (isFeeels ? `${NAVY}0.14)` : `${NAVY}0.08)`)}
                  stroke={isActive
                    ? (isFeeels ? `${NAVY}0.80)` : 'rgba(255,255,255,0.38)')
                    : (isFeeels ? `${NAVY}0.55)` : `${NAVY}0.35)`)}
                  strokeWidth={isActive ? 1.8 : (isFeeels ? 1.5 : 1)}
                  filter={isFeeels ? 'url(#emp-int-feels-glow)' : 'url(#emp-int-glow)'}
                  style={{ transition: 'fill 0.20s, stroke 0.20s' }}
                />

                {/* Active ring */}
                {isActive && (
                  <rect
                    x={q.rect.x - 4} y={q.rect.y - 4}
                    width={q.rect.w + 8} height={q.rect.h + 8} rx={11}
                    fill="none"
                    stroke={isFeeels ? `${NAVY}0.40)` : 'rgba(255,255,255,0.14)'}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                  />
                )}

                {/* Label */}
                <text
                  x={cx} y={q.rect.y + 18}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.14em"
                  fill={isActive
                    ? (isFeeels ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.88)')
                    : (isFeeels ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.65)')}
                  fontWeight="600"
                  style={{ userSelect: 'none', transition: 'fill 0.20s' }}
                >{q.label}</text>

                <line
                  x1={q.rect.x + 16} y1={q.rect.y + 28}
                  x2={q.rect.x + q.rect.w - 16} y2={q.rect.y + 28}
                  stroke="rgba(255,255,255,0.08)"
                />

                {/* Entries */}
                {q.entries.map((entry, i) => (
                  <g key={i}>
                    <rect
                      x={q.rect.x + 16} y={q.rect.y + 34 + i * 22}
                      width={q.rect.w - 32} height={16} rx={3}
                      fill={isActive ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)'}
                      stroke={isActive ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.14)'}
                      strokeWidth={0.7}
                      style={{ transition: 'fill 0.20s, stroke 0.20s' }}
                    />
                    <text
                      x={q.rect.x + 24} y={q.rect.y + 34 + i * 22 + 8}
                      textAnchor="start" dominantBaseline="middle"
                      fontSize="5" fontFamily="var(--font-inter,sans-serif)"
                      fill={isActive ? 'rgba(255,255,255,0.80)' : (isFeeels ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.60)')}
                      style={{ userSelect: 'none', transition: 'fill 0.20s' }}
                    >{entry}</text>
                  </g>
                ))}

                {/* FEELS heart indicator */}
                {isFeeels && (
                  <>
                    <line
                      x1={q.rect.x + 20} y1={q.rect.y + 158}
                      x2={q.rect.x + q.rect.w - 20} y2={q.rect.y + 158}
                      stroke={isActive ? `${NAVY}0.55)` : `${NAVY}0.38)`}
                      style={{ transition: 'stroke 0.20s' }}
                    />
                    <text
                      x={cx} y={q.rect.y + 170}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                      fill={isActive ? 'rgba(255,255,255,0.725)' : 'rgba(255,255,255,0.64)'}
                      style={{ userSelect: 'none', transition: 'fill 0.20s' }}
                    >♥ INTERPRETIVE HEART</text>
                  </>
                )}
              </motion.g>
            )
          })}

          {/* GAP connector - SAYS vs DOES */}
          <AnimatePresence>
            {active === 'gap' && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.22 }}
              >
                {/* Dashed connecting line in left arm of cross */}
                <line
                  x1={172} y1={200} x2={172} y2={240}
                  stroke={`${AMBER}0.55)`} strokeDasharray="3 2" strokeWidth={1.5}
                />
                {/* "≠" at center */}
                <text
                  x={172} y={222}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fontFamily="var(--font-mono)"
                  fill={`${AMBER}0.72)`}
                  style={{ userSelect: 'none' }}
                >≠</text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Central figure */}
          <g style={{ pointerEvents: 'none' }}>
            <circle cx={CX} cy={CY} r={CRO} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 2" strokeWidth={0.8} />
            <circle cx={CX} cy={CY} r={CRI} fill={`${NAVY}0.30)`} stroke="rgba(255,255,255,0.50)" strokeWidth={1} />
            <circle cx={CX} cy={HEAD_CY} r={HEAD_R} fill={`${NAVY}0.22)`} stroke="rgba(255,255,255,0.38)" strokeWidth={0.8} />
            <path
              d={`M ${CX - 17} ${CY + 18} Q ${CX} ${CY + 7} ${CX + 17} ${CY + 18}`}
              fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth={0.8}
            />
          </g>
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeDetail && (
          <motion.div
            key={active!}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
          >
            <div
              className="rounded-xl p-6 mb-4"
              style={{
                background: active === 'gap' ? `${AMBER}0.06)` : `${NAVY}0.10)`,
                border: `1px solid ${active === 'gap' ? `${AMBER}0.22)` : `${NAVY}0.25)`}`,
              }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{
                  fontSize: 'var(--text-2xs)',
                  color: active === 'gap' ? `${AMBER}0.75)` : `${NAVY}0.65)`,
                }}
              >{activeDetail.title}</p>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255,255,255,0.70)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >{activeDetail.body}</p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{
                background: active === 'gap' ? `${AMBER}0.04)` : `${NAVY}0.06)`,
                border: `1px solid ${active === 'gap' ? `${AMBER}0.16)` : `${NAVY}0.18)`}`,
                borderLeft: `3px solid ${active === 'gap' ? `${AMBER}0.55)` : `${NAVY}0.50)`}`,
              }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-1"
                style={{
                  fontSize: 'var(--text-2xs)',
                  color: active === 'gap' ? `${AMBER}0.65)` : `${NAVY}0.55)`,
                }}
              >How to read it</p>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(255,255,255,0.58)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >{activeDetail.tip}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
