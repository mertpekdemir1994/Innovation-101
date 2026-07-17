'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const INDIGO = 'rgba(99,102,241,'
const AMBER  = 'rgba(217,119,6,'

const SVG_W = 700
const COL_X  = [22, 251, 480] as const
const COL_W  = 207
const LEVER_H   = 46
const LEVER_GAP = 8
const FIRST_LEVER_Y = 52

type Mode = 'human' | 'ai'
type Col = 0 | 1 | 2

interface LeverSpec {
  id: string
  col: Col
  i: number
  label: string
  sub: string
  overpulled?: boolean
  neglected?: boolean
  aiGeneric?: boolean
}

const LEVERS: LeverSpec[] = [
  { id: 'segment',    col: 0, i: 0, label: 'TARGET SEGMENT',  sub: 'who you serve' },
  { id: 'offering',   col: 0, i: 1, label: 'OFFERING',        sub: 'product & service', overpulled: true, aiGeneric: true },
  { id: 'revenue',    col: 0, i: 2, label: 'REVENUE MODEL',   sub: 'how you charge',    neglected: true },
  { id: 'bundling',   col: 0, i: 3, label: 'BUNDLING',        sub: 'how you package' },
  { id: 'valuechain', col: 1, i: 0, label: 'VALUE CHAIN',     sub: 'how you produce' },
  { id: 'cost',       col: 1, i: 1, label: 'COST MODEL',      sub: 'your cost structure', neglected: true },
  { id: 'org',        col: 1, i: 2, label: 'ORGANIZATION',    sub: 'people & resources' },
  { id: 'tech',       col: 1, i: 3, label: 'TECHNOLOGY',      sub: 'platform & infra.' },
  { id: 'channels',   col: 2, i: 0, label: 'CHANNELS',        sub: 'how you reach' },
  { id: 'crm',        col: 2, i: 1, label: 'RELATIONSHIPS',   sub: 'acquire & retain' },
  { id: 'brand',      col: 2, i: 2, label: 'BRAND',           sub: 'what you stand for' },
  { id: 'partners',   col: 2, i: 3, label: 'PARTNERSHIPS',    sub: 'partner network',    neglected: true },
]

function leverY(i: number) {
  return FIRST_LEVER_Y + i * (LEVER_H + LEVER_GAP)
}

const AREAS = [
  { label: 'VALUE PROPOSITION', sub: 'what you offer & to whom' },
  { label: 'OPERATING MODEL',   sub: 'how you create & deliver' },
  { label: 'GO-TO-MARKET',      sub: 'how you reach & keep' },
] as const

export default function TLAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const SVG_H = 340

  function leverFill(lev: LeverSpec) {
    if (isAI) return `${INDIGO}0.09)`
    if (lev.overpulled) return `${AMBER}0.09)`
    if (lev.neglected) return `${PLUM}0.13)`
    return `${PLUM}0.05)`
  }

  function leverStroke(lev: LeverSpec) {
    if (isAI) return lev.aiGeneric ? `${AMBER}0.42)` : `${INDIGO}0.38)`
    if (lev.overpulled) return `${AMBER}0.42)`
    if (lev.neglected) return `${PLUM}0.58)`
    return `${PLUM}0.26)`
  }

  function leverStrokeW(lev: LeverSpec) {
    if (isAI) return lev.aiGeneric ? 1.5 : 1.2
    return lev.overpulled || lev.neglected ? 1.4 : 0.9
  }

  function leverLabel(lev: LeverSpec) {
    if (isAI) return lev.aiGeneric ? `${AMBER}0.85)` : `${INDIGO}0.88)`
    if (lev.overpulled) return `${AMBER}0.88)`
    if (lev.neglected) return `${PLUM}1)`
    return 'rgba(255,255,255,0.62)'
  }

  function leverSub(lev: LeverSpec) {
    if (isAI) return lev.aiGeneric ? `${AMBER}0.45)` : `${INDIGO}0.40)`
    if (lev.overpulled) return `${AMBER}0.48)`
    if (lev.neglected) return `${PLUM}0.52)`
    return 'rgba(255,255,255,0.24)'
  }

  const tr = prefersReduced ? { duration: 0 } : { duration: 0.26 }

  return (
    <div>
      {/* Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
        {(['human', 'ai'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.14em',
              padding: '6px 18px',
              borderRadius: '20px',
              border: `1px solid ${m === mode ? (m === 'ai' ? `${INDIGO}0.60)` : `${PLUM}0.60)`) : 'rgba(255,255,255,0.14)'}`,
              background: m === mode ? (m === 'ai' ? `${INDIGO}0.12)` : `${PLUM}0.12)`) : 'transparent',
              color: m === mode ? (m === 'ai' ? `${INDIGO}0.92)` : `${PLUM}0.92)`) : 'rgba(255,255,255,0.40)',
              cursor: 'pointer',
              transition: prefersReduced ? 'none' : 'all 0.2s',
            }}
          >
            {m === 'human' ? 'HUMAN-LED' : 'AI-ASSISTED'}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
        aria-label={isAI ? 'AI mode: all twelve levers are populated with AI-generated ideas, but the choice of which lever to pull stays human.' : 'Human mode: twelve-lever panel with over-pulled and high-leverage levers marked.'}
      >
        <defs>
          <filter id="tl-ai-plum-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${PLUM}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tl-ai-indigo-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${INDIGO}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tl-ai-amber-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Area headers */}
        {AREAS.map((area, ai) => {
          const x = COL_X[ai as Col]
          return (
            <g key={area.label}>
              <rect x={x} y={2} width={COL_W} height={46} rx={5}
                fill={isAI ? `${INDIGO}0.08)` : `${PLUM}0.10)`}
                stroke={isAI ? `${INDIGO}0.26)` : `${PLUM}0.26)`}
                strokeWidth={0.8} />
              <text x={x + COL_W / 2} y={21} textAnchor="middle"
                fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                fill={isAI ? `${INDIGO}0.78)` : `${PLUM}0.80)`}
                style={{ userSelect: 'none' }}>
                {area.label}
              </text>
              <text x={x + COL_W / 2} y={36} textAnchor="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={isAI ? `${INDIGO}0.35)` : `${PLUM}0.35)`}
                style={{ userSelect: 'none' }}>
                {area.sub}
              </text>
            </g>
          )
        })}

        {/* Levers */}
        {LEVERS.map(lev => {
          const x = COL_X[lev.col]
          const y = leverY(lev.i)
          const glowFilter = isAI
            ? (lev.aiGeneric ? 'url(#tl-ai-amber-glow)' : 'url(#tl-ai-indigo-glow)')
            : (lev.neglected ? 'url(#tl-ai-plum-glow)' : lev.overpulled ? 'url(#tl-ai-amber-glow)' : 'none')

          return (
            <motion.g key={lev.id} animate={{}} transition={tr}>
              <motion.rect
                x={x} y={y} width={COL_W} height={LEVER_H} rx={4}
                animate={{ fill: leverFill(lev), stroke: leverStroke(lev), strokeWidth: leverStrokeW(lev) }}
                transition={tr}
                style={{ filter: glowFilter }}
              />
              <text x={x + COL_W / 2} y={y + 20} textAnchor="middle"
                fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                style={{ userSelect: 'none', fill: leverLabel(lev) }}>
                {lev.label}
              </text>
              <text x={x + COL_W / 2} y={y + 35} textAnchor="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                style={{ userSelect: 'none', fill: leverSub(lev) }}>
                {lev.sub}
              </text>

              {/* Human mode badges */}
              {!isAI && lev.overpulled && (
                <text x={x + COL_W - 5} y={y + 11} textAnchor="end"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${AMBER}0.68)`} style={{ userSelect: 'none' }}>
                  OVER-PULLED
                </text>
              )}
              {!isAI && lev.neglected && (
                <text x={x + COL_W - 5} y={y + 11} textAnchor="end"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${PLUM}0.65)`} style={{ userSelect: 'none' }}>
                  HIGH LEVERAGE
                </text>
              )}

              {/* AI mode badges */}
              {isAI && lev.aiGeneric && (
                <text x={x + COL_W - 5} y={y + 11} textAnchor="end"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${AMBER}0.65)`} style={{ userSelect: 'none' }}>
                  GENERIC MOVE
                </text>
              )}
              {isAI && !lev.aiGeneric && (
                <text x={x + COL_W - 5} y={y + 11} textAnchor="end"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${INDIGO}0.60)`} style={{ userSelect: 'none' }}>
                  AI: IDEA LISTED
                </text>
              )}
            </motion.g>
          )
        })}

        {/* AI mode overlay annotation */}
        <AnimatePresence>
          {isAI && (
            <motion.g
              key="ai-overlay"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              transition={tr}>
              <rect
                x={SVG_W / 2 - 138} y={262} width={276} height={56} rx={6}
                fill={`${PLUM}0.22)`}
                stroke={`${PLUM}0.60)`}
                strokeWidth={1.2}
                style={{ filter: 'url(#tl-ai-plum-glow)' }}
              />
              <text x={SVG_W / 2} y={282} textAnchor="middle"
                fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
                fill={`${PLUM}0.95)`} style={{ userSelect: 'none' }}>
                WHICH LEVER TO ACTUALLY PULL
              </text>
              <text x={SVG_W / 2} y={296} textAnchor="middle"
                fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={`${PLUM}0.60)`} style={{ userSelect: 'none' }}>
                AND IS THE COMBINATION FEASIBLE?
              </text>
              <text x={SVG_W / 2} y={310} textAnchor="middle"
                fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={`${PLUM}0.60)`} style={{ userSelect: 'none' }}>
                STAYS HUMAN
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Human mode caption */}
        {!isAI && (
          <text x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill="rgba(255,255,255,0.14)" style={{ userSelect: 'none' }}>
            12 LEVERS — 3 AREAS — MOST TEAMS ONLY PULL ONE
          </text>
        )}
      </svg>

      {/* Explanation cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          transition={tr}
          style={{
            marginTop: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}
        >
          {isAI ? (
            <>
              <Card
                accent={INDIGO}
                label="WHERE AI HELPS"
                body="AI can rapidly generate plausible ideas for all twelve levers simultaneously — in minutes rather than a week of workshops. It removes blank-page paralysis and ensures no lever is overlooked."
              />
              <Card
                accent={AMBER}
                label="WHERE AI STRUGGLES"
                body="AI produces generic, single-lever ideas in isolation. It cannot assess organizational feasibility, know which lever fits your specific context, or prioritize. Every suggestion it makes for a lever it doesn't understand (org, brand, partnerships) is speculative."
              />
              <Card
                accent={PLUM}
                label="THE BET STAYS HUMAN"
                body="Choosing which lever or combination to actually pull — and confirming it is genuinely feasible for your organization — requires contextual judgment no AI can substitute. The audit is faster. The decision is still yours."
              />
            </>
          ) : (
            <>
              <Card
                accent={PLUM}
                label="AUDIT ALL 12"
                body="Most teams innovate instinctively on the Offering lever. A structured audit forces attention to levers the team has never seriously considered — often where the most defensible differentiation sits."
              />
              <Card
                accent={AMBER}
                label="THE OVER-PULLED LEVER"
                body="Offering is the default innovation lever because it is tangible and familiar. But product improvements are the easiest for competitors to copy. The audit surfaces why you keep returning to the same lever — and whether that is strategic or habit."
              />
              <Card
                accent={PLUM}
                label="THE NEGLECTED LEVERS"
                body="Revenue model, cost model, and partnership levers are systematically under-used because they require cross-functional coordination. But they are typically the hardest for competitors to replicate — because copying them requires restructuring an entire business, not just a product team."
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Card({ accent, label, body }: { accent: string; label: string; body: string }) {
  return (
    <div style={{
      padding: '16px',
      background: `${accent}0.06)`,
      border: `1px solid ${accent}0.24)`,
      borderRadius: '6px',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '8px',
        letterSpacing: '0.12em',
        color: `${accent}0.80)`,
        marginBottom: '8px',
        fontWeight: 600,
      }}>
        {label}
      </p>
      <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>
        {body}
      </p>
    </div>
  )
}
