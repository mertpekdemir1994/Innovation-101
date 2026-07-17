'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const AI_C  = 'rgba(99,102,241,'
const CX = 188, CY = 200

const RINGS = [
  { id: 'whole-market', r: 152, labelY: 125 },
  { id: 'segment',      r: 110, labelY: 162 },
  { id: 'niche',        r:  70, labelY: 200 },
  { id: 'beachhead',    r:  34, labelY: 238 },
] as const

const LX = 380

// AI mode: outer rings glow indigo (AI "confident" in broad data), beachhead dim
// Human mode: normal plum gradient with beachhead prominent
function ringFill(idx: number, ai: boolean): string {
  if (ai) {
    // AI confident in outer rings, blind to beachhead
    return idx === 0 ? `${AI_C}0.18)`
         : idx === 1 ? `${AI_C}0.12)`
         : idx === 2 ? `${PLUM}0.05)`
         :              `${PLUM}0.04)`
  }
  // Human mode: plum gradient inward
  return idx === 3 ? `${PLUM}0.72)`
       : idx === 2 ? `${PLUM}0.14)`
       : idx === 1 ? `${PLUM}0.08)`
       :              `${PLUM}0.06)`
}
function ringStroke(idx: number, ai: boolean): string {
  if (ai) {
    return idx === 0 ? `${AI_C}0.80)`
         : idx === 1 ? `${AI_C}0.55)`
         : idx === 2 ? 'rgba(255,255,255,0.10)'
         :              'rgba(255,255,255,0.08)'
  }
  return idx === 3 ? 'rgba(255,255,255,0.90)'
       : idx === 2 ? 'rgba(255,255,255,0.40)'
       : idx === 1 ? 'rgba(255,255,255,0.28)'
       :              'rgba(255,255,255,0.18)'
}
function labelFill(idx: number, ai: boolean): string {
  if (ai) {
    return idx === 0 ? `${AI_C}0.82)` : idx === 1 ? `${AI_C}0.65)` : 'rgba(255,255,255,0.18)'
  }
  return idx === 3 ? 'rgba(255,255,255,0.85)' : `${PLUM}0.72)`
}

export default function AvatarsAIReactivated() {
  const [aiMode, setAiMode] = useState(false)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div>
      {/* ── Global toggle ── */}
      <div className="flex justify-center mb-10">
        <div
          className="flex rounded-full p-1"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          role="group"
          aria-label="Mode toggle"
        >
          {(['Human Judgment', 'AI Analysis'] as const).map((label) => {
            const isActive = label === 'AI Analysis' ? aiMode : !aiMode
            return (
              <button
                key={label}
                onClick={() => setAiMode(label === 'AI Analysis')}
                className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  background: isActive
                    ? (label === 'AI Analysis' ? `${AI_C}0.75)` : 'rgba(255,255,255,0.90)')
                    : 'transparent',
                  color: isActive
                    ? (label === 'AI Analysis' ? '#fff' : '#111')
                    : 'rgba(255,255,255,0.45)',
                }}
                aria-pressed={isActive}
              >{label}</button>
            )
          })}
        </div>
      </div>

      {/* ── Bullseye SVG ── */}
      <div className="w-full flex justify-center mb-10 select-none" aria-hidden="true">
        <svg viewBox="0 0 560 400" width="100%" style={{ maxWidth: 720, overflow: 'visible' }}>
          <defs>
            <filter id="av-ai-glow-outer" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="av-ai-glow-center" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {RINGS.map(({ id, r, labelY }, i) => {
            const isBeachhead = i === 3
            const isOuterAI   = aiMode && i <= 1
            const filter      = isOuterAI ? 'url(#av-ai-glow-outer)'
                              : (isBeachhead && !aiMode) ? 'url(#av-ai-glow-center)'
                              : undefined

            return (
              <g key={id}>
                <motion.circle
                  cx={CX} cy={CY} r={r}
                  strokeWidth={isBeachhead ? 2 : 1}
                  filter={filter}
                  animate={{
                    fill:   ringFill(i, aiMode),
                    stroke: ringStroke(i, aiMode),
                  }}
                  transition={{ duration: 0.4, ease }}
                />

                {/* Leader label */}
                <motion.text
                  x={LX + 8} y={labelY}
                  textAnchor="start" dominantBaseline="middle"
                  fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  style={{ userSelect: 'none' }}
                  animate={{ fill: labelFill(i, aiMode) }}
                  transition={{ duration: 0.35 }}
                >
                  {id === 'whole-market' ? 'WHOLE MARKET'
                  : id === 'segment'    ? 'BROAD SEGMENT'
                  : id === 'niche'      ? 'SPECIFIC NICHE'
                  :                       'THE AVATAR'}
                </motion.text>

                {/* Leader line */}
                <line
                  x1={CX + r} y1={CY} x2={LX} y2={labelY}
                  stroke="rgba(255,255,255,0.10)" strokeWidth={1}
                />
                <circle cx={CX + r} cy={CY} r={2}
                  fill={aiMode && i <= 1 ? `${AI_C}0.60)` : `${PLUM}0.45)`}
                />
              </g>
            )
          })}

          {/* Center AVATAR label — always inside beachhead */}
          <motion.text
            x={CX} y={CY + 4}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            style={{ userSelect: 'none', pointerEvents: 'none' }}
            animate={{ fill: aiMode ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.92)' }}
            transition={{ duration: 0.4 }}
          >AVATAR</motion.text>

          {/* AI annotation: what AI zooms in on */}
          <AnimatePresence>
            {aiMode && (
              <motion.text
                key="ai-confident"
                x={CX - 155} y={80}
                textAnchor="middle" fontSize="6"
                fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={`${AI_C}0.65)`}
                style={{ userSelect: 'none' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >AI CONFIDENT HERE</motion.text>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {aiMode && (
              <motion.text
                key="ai-blind"
                x={CX} y={CY - 42}
                textAnchor="middle" fontSize="5.5"
                fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill="rgba(255,165,0,0.70)"
                style={{ userSelect: 'none' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >AI UNDERWEIGHTS</motion.text>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* ── Info boxes in AI mode ── */}
      <AnimatePresence>
        {aiMode && (
          <motion.div
            className="grid md:grid-cols-2 gap-5 mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.32, ease }}
          >
            <div className="rounded-xl p-5"
              style={{ background: `${AI_C}0.06)`, border: `1px solid ${AI_C}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${AI_C}0.70)` }}
              >What AI does well</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI is excellent at market sizing and broad segment analysis. It can ingest industry reports, synthesize TAM/SAM estimates, and surface patterns across segment data faster than any research team. For the outer rings — identifying a broad segment, understanding its size, mapping who might conceivably be interested — AI is genuinely useful.
              </p>
            </div>
            <div className="rounded-xl p-5"
              style={{ background: 'rgba(251,146,60,0.04)', border: '1px solid rgba(251,146,60,0.20)' }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(251,146,60,0.75)' }}
              >What it misses</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                The beachhead decision is not a data problem — it is a commitment problem. Which niche do <em>you</em> want to own? Which specific people are you willing to organize your entire company around? AI can tell you the size of a niche; it cannot tell you which one to commit to. The Avatar is a bet on your thesis, not an output of pattern matching.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Honest synthesis — always visible */}
      <div className="rounded-xl p-6"
        style={{ background: `${PLUM}0.08)`, border: `1px solid ${PLUM}0.20)` }}
      >
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.70)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          Use AI to understand the rings — segment size, competitive intensity, growth rates. Use human judgment to choose which ring to commit to. The Avatar discipline is fundamentally about the courage to pick one specific group and be wrong about it, not about finding the algorithmically optimal segment. AI narrows the search space; it cannot make the bet.
        </p>
      </div>
    </div>
  )
}
