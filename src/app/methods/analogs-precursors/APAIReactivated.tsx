'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import React from 'react'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 700
const SVG_H = 258

const ORG_X = 190
const ORG_Y = 200
const AX_END   = 672
const PR_END_Y = 28

type Mode = 'human' | 'ai'

// Near zone: AI retrieves these first (surface-similar, close to origin)
const NEAR_ZONE_X2 = 316 // end of near zone on analogs axis

// Near points AI clusters (small INDIGO dots)
const NEAR_DOTS = [
  { x: 228, y: ORG_Y },
  { x: 254, y: ORG_Y },
  { x: 278, y: ORG_Y },
  { x: 302, y: ORG_Y },
]

const ANALOG_PTS = [
  { x: 318, label: 'HOTEL',    sub: 'hospitality' },
  { x: 450, label: 'AIRPORT',  sub: 'transit flow' },
  { x: 578, label: 'PIT CREW', sub: 'fast handoff' },
]

const PRECUR_PTS = [
  { y: 156, label: 'EARLY VERSION', sub: '~10 YRS AGO' },
  { y: 106, label: 'PRIOR ART',     sub: '~20 YRS AGO' },
  { y: 56,  label: 'ANTECEDENT',    sub: '~35 YRS AGO' },
]

export default function APAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  const fade = prefersReduced ? { duration: 0 } : { duration: 0.30 }

  // Opacity helpers
  const analogAxisO = isAI ? '0.35' : '0.55'
  const precurAxisO = isAI ? '0.28' : '0.38'

  return (
    <div className="w-full space-y-5">
      {/* Mode toggle */}
      <div className="flex gap-2">
        {(['human', 'ai'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.10)` : `${CLAY}0.10)`
                : 'transparent',
              border: `1px solid ${mode === m
                ? (m === 'ai' ? `${INDIGO}0.35)` : `${CLAY}0.35)`)
                : 'var(--color-neutral-100)'}`,
              color: mode === m
                ? m === 'ai' ? `${INDIGO}1)` : `${CLAY}1)`
                : 'var(--color-neutral-600)',
            }}
          >
            {m === 'human' ? 'Human-led search' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="w-full flex justify-center select-none">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ maxWidth: 720, overflow: 'visible' }}
          aria-label={isAI
            ? 'AI mode: dense near-zone dots cluster close to origin on the analogs axis. Far structural analogs and precursor timing points are dimmer.'
            : 'Human mode: full two-axis search space with analogs and precursors visible at equal weight.'}
        >
          <defs>
            <filter id="ap-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ap-ai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ap-ai-glow-indigo" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── ANALOGS AXIS ── */}
          <motion.line
            x1={ORG_X} y1={ORG_Y} x2={AX_END} y2={ORG_Y}
            stroke={`${CLAY}${analogAxisO})`}
            strokeWidth={1.5}
            animate={{ opacity: 1 }}
            transition={fade}
          />
          <path
            d={`M ${AX_END - 7} ${ORG_Y - 5} L ${AX_END + 1} ${ORG_Y} L ${AX_END - 7} ${ORG_Y + 5}`}
            stroke={`${CLAY}${analogAxisO})`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <text
            x={AX_END + 8} y={ORG_Y - 5}
            textAnchor="start" dominantBaseline="middle"
            fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
            fill={`${CLAY}${isAI ? '0.30' : '0.72'})`}
            style={{ userSelect: 'none' }}
          >ANALOGS →</text>

          {/* ── NEAR ZONE (AI mode) ── */}
          <AnimatePresence>
            {isAI && (
              <motion.g
                key="near-zone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fade}
              >
                {/* Near zone band */}
                <rect
                  x={ORG_X + 8} y={ORG_Y - 14}
                  width={NEAR_ZONE_X2 - ORG_X - 8} height={28}
                  fill={`${INDIGO}0.07)`}
                  stroke={`${INDIGO}0.20)`}
                  strokeWidth={0.8}
                  rx={4}
                />
                {/* Near dots */}
                {NEAR_DOTS.map((d, i) => (
                  <circle
                    key={i}
                    cx={d.x} cy={d.y} r={4}
                    fill={`${INDIGO}0.22)`}
                    stroke={`${INDIGO}0.60)`}
                    strokeWidth={1}
                    filter="url(#ap-ai-glow-indigo)"
                  />
                ))}
                {/* Near zone label */}
                <text
                  x={(ORG_X + 8 + NEAR_ZONE_X2) / 2} y={ORG_Y - 20}
                  textAnchor="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`${INDIGO}0.65)`}
                  style={{ userSelect: 'none' }}
                >AI RETRIEVES NEAR FIRST</text>
                <text
                  x={(ORG_X + 8 + NEAR_ZONE_X2) / 2} y={ORG_Y + 22}
                  textAnchor="middle"
                  fontSize="5" fontFamily="var(--font-mono)"
                  fill={`${INDIGO}0.42)`}
                  style={{ userSelect: 'none' }}
                >surface-similar / obvious</text>

                {/* Far zone label */}
                <text
                  x={(NEAR_ZONE_X2 + AX_END) / 2} y={ORG_Y - 22}
                  textAnchor="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill="rgba(255,255,255,0.30)"
                  style={{ userSelect: 'none' }}
                >← FAR STRUCTURAL MATCH</text>
                <text
                  x={(NEAR_ZONE_X2 + AX_END) / 2} y={ORG_Y - 13}
                  textAnchor="middle"
                  fontSize="5" fontFamily="var(--font-mono)"
                  fill="rgba(255,255,255,0.18)"
                  style={{ userSelect: 'none' }}
                >harder for AI to surface</text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── ANALOG POINTS ── */}
          {ANALOG_PTS.map((pt) => {
            const o = isAI ? '0.22' : '0.68'
            const fo = isAI ? '0.05' : '0.10'
            const to = isAI ? '0.20' : '0.80'
            return (
              <motion.g key={pt.label} animate={{ opacity: 1 }} transition={fade}>
                <circle
                  cx={pt.x} cy={ORG_Y} r={5}
                  fill={`${CLAY}${fo})`}
                  stroke={`${CLAY}${o})`}
                  strokeWidth={1.5}
                />
                <text
                  x={pt.x} y={ORG_Y - 13}
                  textAnchor="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  fill={`${CLAY}${to})`}
                  style={{ userSelect: 'none' }}
                >{pt.label}</text>
                <text
                  x={pt.x} y={ORG_Y - 22}
                  textAnchor="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)"
                  fill={`${CLAY}${isAI ? '0.14' : '0.44'})`}
                  style={{ userSelect: 'none' }}
                >{pt.sub}</text>
              </motion.g>
            )
          })}

          {/* ── PRECURSORS AXIS ── */}
          <motion.line
            x1={ORG_X} y1={ORG_Y} x2={ORG_X} y2={PR_END_Y}
            stroke={`rgba(255,255,255,${precurAxisO})`}
            strokeWidth={1.5}
            animate={{ opacity: 1 }}
            transition={fade}
          />
          <path
            d={`M ${ORG_X - 5} ${PR_END_Y + 9} L ${ORG_X} ${PR_END_Y + 1} L ${ORG_X + 5} ${PR_END_Y + 9}`}
            stroke={`rgba(255,255,255,${precurAxisO})`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <text
            x={ORG_X} y={PR_END_Y - 5}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
            fill={`rgba(255,255,255,${isAI ? '0.22' : '0.42'})`}
            style={{ userSelect: 'none' }}
          >↑ BACK THROUGH TIME</text>

          {/* ── PRECURSOR POINTS ── */}
          {PRECUR_PTS.map((pt) => {
            const o  = isAI ? '0.22' : '0.50'
            const fo = isAI ? '0.04' : '0.07'
            const to = isAI ? '0.20' : '0.58'
            return (
              <motion.g key={pt.label} animate={{ opacity: 1 }} transition={fade}>
                <circle
                  cx={ORG_X} cy={pt.y} r={5}
                  fill={`rgba(255,255,255,${fo})`}
                  stroke={`rgba(255,255,255,${o})`}
                  strokeWidth={1.5}
                />
                <text
                  x={ORG_X - 13} y={pt.y - 4}
                  textAnchor="end" dominantBaseline="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`rgba(255,255,255,${to})`}
                  style={{ userSelect: 'none' }}
                >{pt.label}</text>
                {isAI && (
                  <text
                    x={ORG_X + 13} y={pt.y}
                    dominantBaseline="middle"
                    fontSize="5.5" fontFamily="var(--font-mono)"
                    fill={`${INDIGO}0.45)`}
                    style={{ userSelect: 'none' }}
                  >timing: human</text>
                )}
              </motion.g>
            )
          })}

          {/* ── ORIGIN ── */}
          <circle
            cx={ORG_X} cy={ORG_Y} r={7}
            fill={`${CLAY}0.18)`}
            stroke={`${CLAY}0.90)`}
            strokeWidth={2}
            filter="url(#ap-ai-glow)"
          />
          <text
            x={ORG_X + 13} y={ORG_Y - 3}
            dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${CLAY}0.90)`}
            style={{ userSelect: 'none' }}
          >CURRENT PROBLEM</text>
        </svg>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div
            key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-lg border p-5 space-y-2"
              style={{ borderColor: `${CLAY}0.22)`, background: `${CLAY}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `${CLAY}0.85)` }}>
                Analogs: the human advantage
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Humans search far: they jump from a hospital to a luxury hotel not because the surface is similar
                but because they can feel a structural match across a conceptual gap. That leap, from medical
                to hospitality, from clinical to dignity-centered, is a distinctly human move.
              </p>
            </div>
            <div className="rounded-lg border p-5 space-y-2"
              style={{ borderColor: 'rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                Precursors: the human advantage
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Humans diagnose timing: they look at something that failed fifteen years ago and ask
                &ldquo;was this premature or fundamentally broken?&rdquo; The distinction is a judgment call:
                it requires interpreting why the world changed, not just recording that it did.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-5 space-y-2"
                style={{ borderColor: `${INDIGO}0.22)`, background: `${INDIGO}0.04)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `${INDIGO}0.80)` }}>
                  AI on the analogs axis: near-bias
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  AI retrieves by similarity in its training data. Asked for analogs to hospital patient experience,
                  it surfaces other hospitals, then clinics, then hotel chains mentioned alongside healthcare.
                  The far structural match (&ldquo;what does a racing pit crew have in common with a trauma unit?&rdquo;)
                  requires a conceptual leap the model does not naturally take without an explicit prompt.
                </p>
              </div>
              <div className="rounded-lg border p-5 space-y-2"
                style={{ borderColor: `${INDIGO}0.18)`, background: `${INDIGO}0.03)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `${INDIGO}0.70)` }}>
                  AI on the precursors axis: lists, not diagnoses
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  AI can retrieve a rich list of past attempts in your category. What it cannot reliably do is
                  diagnose whether each failure was premature or structurally flawed. That judgment requires
                  contextual interpretation of why the world is different now. Without that, a list of precursors
                  stays a history lesson rather than a timing map.
                </p>
              </div>
            </div>
            <div className="rounded-lg border p-5"
              style={{ borderColor: `${INDIGO}0.20)`, background: `${INDIGO}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: `${INDIGO}0.80)` }}>
                Where AI helps most
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI accelerates research on both axes when aimed with precision. Ask it explicitly for &ldquo;industries
                that have solved X, ranked from most obvious to least obvious,&rdquo; and it can push further than it
                defaults to. For precursors, ask it to list failures and for each, speculate on whether the timing
                or the concept was the problem. The judgment call on the answer still lands with a human,
                but the raw material arrives faster.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
