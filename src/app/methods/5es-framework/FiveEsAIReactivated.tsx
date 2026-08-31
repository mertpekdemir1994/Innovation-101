'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL   = 'rgba(42,111,122,'
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W   = 700
const PHASE_W = 140
const PCX = [70, 210, 350, 490, 630] as const

const HDR_TOP = 8, HDR_H = 40
const CONTENT_Y = 52
const BAR_BASE  = 152
const SVG_H     = 168

const INV_HUMAN = [0.34, 0.54, 0.91, 0.26, 0.14] as const
// In AI mode: Engage is strong (data-rich signals); bookends are near-zero (faint signals)
const INV_AI    = [0.10, 0.45, 0.90, 0.08, 0.05] as const
const BAR_H_MAX = BAR_BASE - CONTENT_Y - 8

type PhaseId = 'entice' | 'enter' | 'engage' | 'exit' | 'extend'

const PHASES: { id: PhaseId; label: string; bookend: boolean; core: boolean }[] = [
  { id: 'entice', label: 'ENTICE', bookend: true,  core: false },
  { id: 'enter',  label: 'ENTER',  bookend: false, core: false },
  { id: 'engage', label: 'ENGAGE', bookend: false, core: true  },
  { id: 'exit',   label: 'EXIT',   bookend: true,  core: false },
  { id: 'extend', label: 'EXTEND', bookend: true,  core: false },
]

export default function FiveEsAIReactivated() {
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
                  color: isActive ? (isAI ? '#fff' : '#111') : 'rgba(255,255,255,0.45)',
                }}
                aria-pressed={isActive}
              >{label}</button>
            )
          })}
        </div>
      </div>

      {/* Phase SVG */}
      <div className="w-full select-none mb-10" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="fes-ai-glow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8}
            fill={aiMode ? `${INDIGO}0.04)` : `${TEAL}0.04)`}
            style={{ transition: 'fill 0.35s' }}
          />

          {[1, 2, 3, 4].map(i => (
            <line key={i} x1={i * PHASE_W} y1={HDR_TOP} x2={i * PHASE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1}
            />
          ))}
          <line x1={0} y1={CONTENT_Y} x2={SVG_W} y2={CONTENT_Y}
            stroke="rgba(255,255,255,0.07)" strokeWidth={1}
          />

          {PHASES.map((phase, i) => {
            const humanInv = INV_HUMAN[i]
            const aiInv    = INV_AI[i]
            const inv = aiMode ? aiInv : humanInv
            const barH = inv * BAR_H_MAX
            const barX = PCX[i] - 28
            const barY = BAR_BASE - barH

            const isBookendInAI = aiMode && phase.bookend
            const isCoreInAI    = aiMode && phase.core

            return (
              <g key={phase.id}>
                {/* Header box */}
                <rect
                  x={i * PHASE_W + 1} y={HDR_TOP}
                  width={PHASE_W - 2} height={HDR_H}
                  rx={4}
                  fill={
                    isCoreInAI ? `${INDIGO}0.18)` :
                    isBookendInAI ? 'rgba(255,255,255,0.03)' :
                    aiMode ? `${INDIGO}0.10)` :
                    phase.bookend ? `${AMBER}0.08)` : `${TEAL}0.10)`
                  }
                  stroke={
                    isCoreInAI ? `${INDIGO}0.45)` :
                    isBookendInAI ? 'rgba(255,255,255,0.08)' :
                    aiMode ? `${INDIGO}0.25)` :
                    phase.bookend ? `${AMBER}0.35)` : `${TEAL}0.38)`
                  }
                  strokeWidth={1}
                  style={{ transition: 'fill 0.35s, stroke 0.35s' }}
                />
                {phase.bookend && !aiMode && (
                  <rect x={i * PHASE_W + 1} y={HDR_TOP} width={PHASE_W - 2} height={2}
                    rx={2} fill={`${AMBER}0.55)`}
                  />
                )}
                <text
                  x={PCX[i]} y={HDR_TOP + HDR_H / 2 + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  fill={
                    isCoreInAI ? `${INDIGO}0.92)` :
                    isBookendInAI ? 'rgba(255,255,255,0.22)' :
                    aiMode ? `${INDIGO}0.60)` :
                    phase.bookend ? `${AMBER}0.88)` : `${TEAL}0.92)`
                  }
                  style={{ userSelect: 'none', transition: 'fill 0.35s' }}
                >{phase.label}</text>

                {/* Bar */}
                <rect x={barX} y={CONTENT_Y + 8} width={56} height={BAR_H_MAX}
                  rx={2} fill="rgba(255,255,255,0.03)"
                />
                <motion.rect
                  x={barX}
                  width={56}
                  rx={2}
                  fill={
                    isCoreInAI ? `${INDIGO}0.78)` :
                    isBookendInAI ? 'rgba(255,255,255,0.10)' :
                    aiMode ? `${INDIGO}0.40)` :
                    phase.core ? `${TEAL}0.80)` :
                    phase.bookend ? `${AMBER}0.38)` : `${TEAL}0.42)`
                  }
                  filter={isCoreInAI ? 'url(#fes-ai-glow)' : undefined}
                  animate={{ height: barH, y: barY }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.45, ease }}
                />

                {/* AI annotations */}
                <AnimatePresence>
                  {aiMode && isCoreInAI && (
                    <motion.text key="ai-strong"
                      x={PCX[i]} y={CONTENT_Y + 14}
                      textAnchor="middle" dominantBaseline="hanging"
                      fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                      fill={`${INDIGO}0.65)`} style={{ userSelect: 'none' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >AI STRONG</motion.text>
                  )}
                  {aiMode && isBookendInAI && (
                    <motion.text key="ai-weak"
                      x={PCX[i]} y={CONTENT_Y + 14}
                      textAnchor="middle" dominantBaseline="hanging"
                      fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                      fill="rgba(255,255,255,0.25)" style={{ userSelect: 'none' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >AI WEAK</motion.text>
                  )}
                </AnimatePresence>
              </g>
            )
          })}

          {/* Bottom label */}
          <text
            x={SVG_W / 2} y={SVG_H - 4}
            textAnchor="middle" dominantBaseline="auto"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.20)" style={{ userSelect: 'none' }}
          >
            {aiMode ? 'AI EVALUATION CONFIDENCE BY PHASE' : 'TYPICAL DESIGN INVESTMENT BY PHASE'}
          </text>
        </svg>
      </div>

      {/* Info cards */}
      <AnimatePresence>
        {aiMode && (
          <motion.div
            className="grid md:grid-cols-2 gap-5 mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="rounded-xl p-5"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}
              >Where AI is strong</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                The Engage phase generates abundant data: session recordings, usage logs, completion rates, NPS scores, A/B test results. AI can synthesize this evidence faster and at higher volume than any team. It will give you a thorough and well-supported read on the core experience, exactly the phase you already know the most about.
              </p>
            </div>
            <div className="rounded-xl p-5"
              style={{ background: `${AMBER}0.04)`, border: `1px solid ${AMBER}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}
              >Where AI is weakest</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                Bookend signals are faint and unstructured: the moment of awareness before someone even becomes a user, the anxiety of the very first visit, what someone feels in the days after the experience has ended. These leave few data traces. AI&rsquo;s reading of the bookends goes thin and generic: it can tell you what the pattern usually looks like, not what it actually looks like for your experience.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis - always visible */}
      <div className="rounded-xl p-6" style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.20)` }}>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI reinforces the exact bias the 5Es is designed to correct. It gives you the most evidence on the phase you already over-invest in, and the least evidence on the phases you already neglect. The bookends (Entice, Exit, Extend) are thin in data because they are thin in design. That is the finding, not the limit. Use AI to efficiently cover the Engage phase, and spend your human research budget entirely on the bookends.
        </p>
      </div>
    </div>
  )
}
