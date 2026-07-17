'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 700
const SVG_H = 258

// Geometry (matches POCEstablishing)
const INP_X = 30, INP_Y = 82, INP_W = 116, INP_H = 42
const INP_CY = INP_Y + INP_H / 2

const APP_X = 178, APP_Y = 46, APP_W = 266, APP_H = 114
const APP_CX = APP_X + APP_W / 2
const APP_CY = APP_Y + APP_H / 2

const BUS_X1 = APP_X + 14, BUS_X2 = APP_X + APP_W - 14
const TAP_Y1 = APP_Y + 14
const TAPS = [
  { x: 220, label: 'INGEST' },
  { x: 294, label: 'PROCESS' },
  { x: 368, label: 'EVALUATE' },
]
const COMP_W = 56, COMP_H = 20

const OUT_X = 468, OUT_Y = 60, OUT_W = 172, OUT_H = 84
const OUT_CX = OUT_X + OUT_W / 2
const IND_CX = OUT_X + 22
const PASS_CY = OUT_Y + 26
const FAIL_CY = OUT_Y + 58

const GHOSTS = [
  { x: 30,  y: 194, w: 150, h: 42, label: 'NO INTERFACE'      },
  { x: 198, y: 194, w: 196, h: 42, label: 'NO EXTRA FEATURES' },
  { x: 412, y: 194, w: 218, h: 42, label: 'NO PRODUCT SHELL'  },
]

// AI speed badge (appears in AI mode over the apparatus)
const AI_BADGE = {
  x: APP_CX - 72, y: APP_CY - 10, w: 144, h: 22,
}

type Mode = 'human' | 'ai'

const INFO_CARDS = {
  human: [
    {
      tag: 'WHAT HUMANS BRING',
      headline: 'Choosing the right question — and reading the conditions.',
      body: 'The critical judgment in a PoC is deciding which question to prove first. That choice is strategic: it depends on what is genuinely uncertain, what failure would be most costly, and what result would unlock the next decision. AI does not make that judgment. Nor does it read the gap between sandbox proof conditions and the messy reality the product must eventually work in.',
    },
  ],
  ai: [
    {
      tag: 'GENUINE AI UPLIFT',
      headline: 'AI can build the proving rig fast — often hours instead of weeks.',
      body: 'When the question is clear, AI can dramatically accelerate rig construction: generating data-processing pipelines, evaluation logic, and comparison machinery that would take a specialist days or weeks to write. A well-scoped PoC is exactly the kind of tightly-defined, outcome-focused build where AI coding assistance gives the most leverage. The time-to-verdict can shrink dramatically.',
    },
    {
      tag: 'HUMAN JUDGMENT STAYS',
      headline: 'AI proves whatever question you point it at — you must choose the right one.',
      body: 'AI\'s leverage is in rig construction, not question selection. It will build a fast rig for a poorly-chosen question just as readily as for the right one. The human responsibility is: which question first, what counts as a verdict, and whether the proof conditions are close enough to reality for the result to mean what you think it means.',
    },
    {
      tag: 'THE GAP THAT REMAINS',
      headline: 'AI proofs run in clean conditions. Reality is messier.',
      body: 'AI-built PoCs are proven in controlled, often ideal conditions. The qualifying judgement — which domains, data types, or edge cases degrade the result, and whether those matter in production — is a human call. A result that "works" in the sandbox may not survive the real data, real scale, or real environment. Naming those conditions precisely is what makes the verdict actionable.',
    },
  ],
}

export default function POCAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  return (
    <div className="w-full">
      {/* Toggle */}
      <div className="flex justify-center gap-2 mb-8">
        {(['human', 'ai'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className="px-5 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: mode === m
                ? (m === 'ai' ? `${INDIGO}0.10)` : `${BRICK}0.10)`)
                : 'transparent',
              border: `1px solid ${mode === m
                ? (m === 'ai' ? `${INDIGO}0.35)` : `${BRICK}0.35)`)
                : 'rgba(255,255,255,0.14)'}`,
              color: mode === m
                ? (m === 'ai' ? `${INDIGO}1)` : `${BRICK}1)`)
                : 'rgba(255,255,255,0.42)',
            }}>
            {m === 'human' ? 'Traditional (Human-Led)' : 'With AI'}
          </button>
        ))}
      </div>

      {/* SVG rig */}
      <div aria-label={`Proving rig — ${isAI ? 'AI-assisted mode: apparatus highlighted indigo (fast build). Question and verdict conditions remain brick (human judgment).' : 'Traditional human-led mode.'}`}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <filter id="poc-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={isAI ? `${INDIGO}0.35)` : `${BRICK}0.35)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="poc-ai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
              <feFlood floodColor={`${BRICK}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Question label — always BRICK (human judgment) */}
          <text x={APP_CX} y={27} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={`${BRICK}${isAI ? '0.90)' : '0.55)'}`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}>
            ONE CRITICAL QUESTION
          </text>
          {isAI && (
            <text x={APP_CX + 148} y={27} textAnchor="start"
              fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${BRICK}0.62)`} style={{ userSelect: 'none' }}>
              ← HUMAN JUDGMENT
            </text>
          )}
          <line x1={APP_CX} y1={31} x2={APP_CX} y2={APP_Y - 2}
            stroke={`${BRICK}0.18)`} strokeWidth={0.8} strokeDasharray="3 3" />

          {/* Input block */}
          <rect x={INP_X} y={INP_Y} width={INP_W} height={INP_H} rx={4}
            fill={`${BRICK}0.05)`} stroke={`${BRICK}0.20)`} strokeWidth={1.0} />
          <text x={INP_X + INP_W / 2} y={INP_CY}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${BRICK}0.45)`} style={{ userSelect: 'none' }}>
            RAW INPUT
          </text>

          {/* Wire in */}
          <line x1={INP_X + INP_W} y1={INP_CY} x2={APP_X} y2={APP_CY}
            stroke={isAI ? `${INDIGO}0.35)` : `${BRICK}0.28)`}
            strokeWidth={1.2} strokeDasharray="5 3"
            style={{ transition: 'stroke 0.35s' }} />

          {/* Apparatus — indigo in AI mode */}
          <rect x={APP_X - 3} y={APP_Y - 3} width={APP_W + 6} height={APP_H + 6} rx={9}
            fill="none" stroke={isAI ? `${INDIGO}0.06)` : `${BRICK}0.06)`}
            strokeWidth={6}
            style={{ filter: 'url(#poc-ai-glow)', transition: 'stroke 0.35s' }} />
          <rect x={APP_X} y={APP_Y} width={APP_W} height={APP_H} rx={6}
            fill={isAI ? `${INDIGO}0.07)` : `${BRICK}0.04)`}
            stroke={isAI ? `${INDIGO}0.38)` : `${BRICK}0.28)`}
            strokeWidth={1.2}
            style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
          <text x={APP_CX} y={APP_Y + APP_H - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO}0.20)` : `${BRICK}0.14)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}>
            PROVING RIG — INTERNAL — BARE
          </text>

          {/* Internal bus */}
          <line x1={BUS_X1} y1={APP_CY} x2={BUS_X2} y2={APP_CY}
            stroke={isAI ? `${INDIGO}0.22)` : `${BRICK}0.20)`}
            strokeWidth={0.8}
            style={{ transition: 'stroke 0.35s' }} />

          {/* Taps + components */}
          {TAPS.map((t, i) => (
            <g key={i}>
              <line x1={t.x} y1={TAP_Y1 + 20} x2={t.x} y2={APP_Y + APP_H - 28}
                stroke={isAI ? `${INDIGO}0.18)` : `${BRICK}0.16)`}
                strokeWidth={0.8}
                style={{ transition: 'stroke 0.35s' }} />
              <circle cx={t.x} cy={APP_CY} r={2.5}
                fill={isAI ? `${INDIGO}0.45)` : `${BRICK}0.30)`}
                style={{ transition: 'fill 0.35s' }} />
              <rect x={t.x - COMP_W / 2} y={TAP_Y1} width={COMP_W} height={COMP_H} rx={3}
                fill={isAI ? `${INDIGO}0.10)` : `${BRICK}0.06)`}
                stroke={isAI ? `${INDIGO}0.38)` : `${BRICK}0.28)`}
                strokeWidth={0.8}
                style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
              <text x={t.x} y={TAP_Y1 + COMP_H / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={isAI ? `${INDIGO}0.80)` : `${BRICK}0.62)`}
                style={{ userSelect: 'none', transition: 'fill 0.35s' }}>
                {t.label}
              </text>
            </g>
          ))}

          {/* AI BUILDS FAST badge (AI mode only) */}
          <AnimatePresence>
            {isAI && (
              <motion.g
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                style={{ transformOrigin: `${AI_BADGE.x + AI_BADGE.w / 2}px ${AI_BADGE.y + AI_BADGE.h / 2}px` }}>
                <rect x={AI_BADGE.x} y={AI_BADGE.y} width={AI_BADGE.w} height={AI_BADGE.h} rx={4}
                  fill={`${INDIGO}0.15)`} stroke={`${INDIGO}0.50)`} strokeWidth={0.9} />
                <text x={AI_BADGE.x + AI_BADGE.w / 2} y={AI_BADGE.y + AI_BADGE.h / 2 + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                  fill={`${INDIGO}0.90)`} style={{ userSelect: 'none' }}>
                  AI BUILDS THIS RIG FAST
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Wire out */}
          <line x1={APP_X + APP_W} y1={APP_CY} x2={OUT_X} y2={APP_CY}
            stroke={isAI ? `${INDIGO}0.35)` : `${BRICK}0.28)`}
            strokeWidth={1.2} strokeDasharray="5 3"
            style={{ transition: 'stroke 0.35s' }} />

          {/* Readout box — always BRICK (human reads verdict) */}
          <rect x={OUT_X} y={OUT_Y} width={OUT_W} height={OUT_H} rx={5}
            fill={`${BRICK}0.04)`} stroke={`${BRICK}0.22)`} strokeWidth={1.0} />
          <text x={OUT_CX} y={OUT_Y + 11}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${BRICK}0.38)`} style={{ userSelect: 'none' }}>
            VERDICT
          </text>
          <line x1={OUT_X + 10} y1={OUT_Y + 18} x2={OUT_X + OUT_W - 10} y2={OUT_Y + 18}
            stroke={`${BRICK}0.14)`} strokeWidth={0.6} />
          <circle cx={IND_CX} cy={PASS_CY} r={8}
            fill={`${BRICK}0.15)`} stroke={`${BRICK}0.55)`} strokeWidth={1.2}
            style={{ filter: 'url(#poc-ai-glow-sm)' }} />
          <circle cx={IND_CX} cy={PASS_CY} r={4.5} fill={`${BRICK}0.78)`} />
          <text x={IND_CX + 16} y={PASS_CY + 1}
            dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
            fill={`${BRICK}0.88)`} style={{ userSelect: 'none' }}>
            PASS
          </text>
          <circle cx={IND_CX} cy={FAIL_CY} r={8}
            fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth={1.0} />
          <text x={IND_CX + 16} y={FAIL_CY + 1}
            dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.18)" style={{ userSelect: 'none' }}>
            FAIL
          </text>

          {/* Verdict condition label (AI mode) */}
          {isAI && (
            <text x={OUT_CX} y={156} textAnchor="middle"
              fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.06em"
              fill={`${BRICK}0.60)`} style={{ userSelect: 'none' }}>
              CONDITIONS: HUMAN JUDGMENT
            </text>
          )}

          {/* Ghost absent elements */}
          {GHOSTS.map((g, i) => (
            <g key={i}>
              <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={4}
                fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={0.8}
                strokeDasharray="5 4" />
              <text x={g.x + g.w / 2} y={g.y + 16}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill="rgba(255,255,255,0.14)" style={{ userSelect: 'none' }}>
                {g.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Info cards */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-4">
            {INFO_CARDS[mode].map((card, i) => (
              <div key={i} className="rounded-xl p-5 border"
                style={{
                  background: isAI ? `${INDIGO}0.05)` : `${BRICK}0.05)`,
                  borderColor: isAI ? `${INDIGO}0.20)` : `${BRICK}0.20)`,
                }}>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-widest mb-2"
                  style={{ color: isAI ? `${INDIGO}0.80)` : `${BRICK}0.80)` }}>
                  {card.tag}
                </p>
                <h4 className="font-semibold mb-2"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                  {card.headline}
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  {card.body}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
