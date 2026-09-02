'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W  = 700
const SVG_H  = 296
const BAR_W  = 90
const BASE_Y = 238

const S_CX  = 195
const S_L   = 150
const S_H   = 148
const S_TOP = 90

const R_CX = 435
const R_L  = 390
const R_H  = 58      // human: 28%
const TH_Y = 162

type Mode = 'human' | 'ai'

const AI_CARDS = [
  { h: 'Design and structure the test', b: 'AI can help write a rigorous concept description, suggest a pre-set success threshold, propose commitment mechanisms, and flag leading questions before the test runs. This is useful and low-risk.' },
  { h: 'Synthesize real results', b: 'After a test with real users, AI can cluster qualitative feedback, find patterns across sessions, and summarise the commitment data. Pattern-finding at speed, as long as the raw signal stays in view.' },
  { h: 'The fundamental limit: revealed preference', b: 'A simulated customer has nothing at stake and so can only produce a costless stated yes. It cannot walk away, fail to pay, or reveal the gap between interest and commitment. That gap is the entire method. AI cannot cross it.' },
]

export default function CTAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  return (
    <div className="w-full">
      {/* Mode toggle */}
      <div className="flex justify-center mb-5">
        <div className="flex rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.07)' }}>
          {(['human', 'ai'] as Mode[]).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: mode === m
                  ? m === 'ai' ? `${INDIGO}0.22)` : `${PLUM}0.22)`
                  : 'transparent',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.55)',
                border: `1px solid ${mode === m ? (m === 'ai' ? `${INDIGO}0.50)` : `${PLUM}0.50)`) : 'transparent'}`,
              }}
            >{m === 'human' ? 'Human Research' : 'With AI'}</button>
          ))}
        </div>
      </div>

      {/* SVG */}
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxWidth: 'var(--width-illustration)', maxHeight: 290 }}
        aria-hidden="true">
        <defs>
          <filter id="ct-ai-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Base */}
        <line x1={100} y1={BASE_Y} x2={580} y2={BASE_Y}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} />

        {/* ── STATED BAR ───────────────────────────────────── */}
        {/* Track */}
        <rect x={S_L} y={S_TOP} width={BAR_W} height={S_H} rx={4}
          fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        {/* Stated bar - AMBER in human mode, INDIGO in AI mode */}
        <rect x={S_L} y={S_TOP} width={BAR_W} height={S_H} rx={4}
          fill={isAI ? `${INDIGO}0.25)` : `${AMBER}0.22)`}
          stroke={isAI ? `${INDIGO}0.62)` : `${AMBER}0.60)`}
          strokeWidth={1.5}
          filter="url(#ct-ai-glow)"
          style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
        {/* Percentage */}
        <text x={S_CX} y={S_TOP - 10} textAnchor="middle"
          fill={isAI ? `${INDIGO_TEXT}0.975)` : `${AMBER}0.85)`}
          fontSize={13} fontWeight={600} fontFamily="monospace"
          style={{ transition: 'fill 0.35s' }}>76%</text>
        {/* Labels */}
        <text x={S_CX} y={36} textAnchor="middle"
          fill="rgba(255,255,255,0.60)" fontSize={11} fontWeight={600}
          letterSpacing={1.4} fontFamily="monospace">STATED</text>
        <text x={S_CX} y={54} textAnchor="middle"
          fill="rgba(255,255,255,0.64)" fontSize={11} fontFamily="monospace">
          {isAI ? 'AI simulates warm interest' : 'What people say'}
        </text>
        <text x={S_CX} y={BASE_Y + 16} textAnchor="middle"
          fill={isAI ? `${INDIGO_TEXT}0.895)` : `${AMBER_TEXT}0.845)`}
          fontSize={11} fontFamily="monospace"
          style={{ transition: 'fill 0.35s' }}>
          {isAI ? 'AI-generated (stated only)' : 'Stated preference'}
        </text>

        {/* ── REVEALED BAR ─────────────────────────────────── */}
        {/* Track */}
        <rect x={R_L} y={S_TOP} width={BAR_W} height={S_H} rx={4}
          fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

        <AnimatePresence mode="wait">
          {isAI ? (
            /* AI mode: revealed bar absent - only dashed outline */
            <motion.g key="ai-revealed"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}>
              {/* Empty outline - AI cannot produce revealed preference */}
              <rect x={R_L} y={BASE_Y - 18} width={BAR_W} height={18} rx={4}
                fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" strokeWidth={1}
                strokeDasharray="4 3" />
              <text x={R_CX} y={BASE_Y - 5} textAnchor="middle"
                fill="rgba(255,255,255,0.65)" fontSize={11} fontFamily="monospace">—</text>
              {/* Cannot produce label - box widened beyond the bar's own column since
                  three lines of 11pt text no longer fit the original bar-width box */}
              <rect x={365} y={S_TOP + 10} width={150} height={80} rx={4}
                fill={`${INDIGO}0.05)`} stroke={`${INDIGO}0.15)`} strokeWidth={1}
                strokeDasharray="4 3" />
              <text x={R_CX} y={S_TOP + 48} textAnchor="middle"
                fill={`${INDIGO_TEXT}0.885)`} fontSize={11} fontWeight={600} fontFamily="monospace"
                letterSpacing={0.2}>AI CANNOT PRODUCE</text>
              <text x={R_CX} y={S_TOP + 66} textAnchor="middle"
                fill={`${INDIGO_TEXT}0.885)`} fontSize={11} fontWeight={600} fontFamily="monospace"
                letterSpacing={0.4}>REVEALED</text>
              <text x={R_CX} y={S_TOP + 84} textAnchor="middle"
                fill={`${INDIGO_TEXT}0.853)`} fontSize={11} fontFamily="monospace">NOTHING AT STAKE</text>
            </motion.g>
          ) : (
            /* Human mode: genuine revealed bar */
            <motion.g key="human-revealed"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}>
              <rect x={R_L} y={BASE_Y - R_H} width={BAR_W} height={R_H} rx={4}
                fill={`${PLUM}0.32)`} stroke={`${PLUM}0.68)`} strokeWidth={1.5}
                filter="url(#ct-ai-glow)" />
              <text x={R_CX} y={BASE_Y - R_H - 10} textAnchor="middle"
                fill={`${PLUM_TEXT}0.975)`} fontSize={13} fontWeight={600} fontFamily="monospace">28%</text>
              {/* Verdict - widened and moved above the percentage so the 18-character
                  label at 11pt doesn't overlap the "28%" number below it */}
              <rect x={373} y={133} width={124} height={20} rx={3}
                fill="rgba(245,158,11,0.10)" stroke="rgba(245,158,11,0.28)" strokeWidth={1} />
              <text x={R_CX} y={147} textAnchor="middle"
                fill="rgba(245,158,11,0.80)" fontSize={11} fontWeight={600}
                letterSpacing={0.3} fontFamily="monospace">× BELOW THRESHOLD</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Top label for revealed */}
        <text x={R_CX} y={36} textAnchor="middle"
          fill="rgba(255,255,255,0.60)" fontSize={11} fontWeight={600}
          letterSpacing={1.4} fontFamily="monospace">REVEALED</text>
        <text x={R_CX} y={54} textAnchor="middle"
          fill="rgba(255,255,255,0.64)" fontSize={11} fontFamily="monospace">
          {isAI ? 'No stake, cannot commit' : 'What people do'}
        </text>
        <text x={R_CX} y={BASE_Y + 16} textAnchor="middle"
          fill={isAI ? `${INDIGO_TEXT}0.874)` : `${PLUM_TEXT}0.885)`}
          fontSize={11} fontFamily="monospace"
          style={{ transition: 'fill 0.35s' }}>
          {isAI ? 'Absent, structurally impossible' : 'Revealed commitment'}
        </text>

        {/* ── THRESHOLD LINE ─────────────────────────────────── */}
        <line x1={105} y1={TH_Y} x2={540} y2={TH_Y}
          stroke={isAI ? `${INDIGO}0.40)` : 'rgba(255,255,255,0.52)'}
          strokeWidth={1.5} strokeDasharray="6 4"
          style={{ transition: 'stroke 0.35s' }} />
        <text x={530} y={TH_Y - 10}
          fill={isAI ? `${INDIGO_TEXT}0.916)` : 'rgba(255,255,255,0.62)'}
          fontSize={11} fontWeight={600} letterSpacing={0.2} fontFamily="monospace"
          style={{ transition: 'fill 0.35s' }}>
          {isAI ? 'THRESHOLD: UNREACHABLE' : 'SUCCESS THRESHOLD'}
        </text>
        <text x={530} y={TH_Y + 12}
          fill="rgba(255,255,255,0.64)" fontSize={11} fontFamily="monospace" letterSpacing={0.1}>
          SET IN ADVANCE · 40%
        </text>

        {/* AI annotation at bottom */}
        <AnimatePresence>
          {isAI && (
            <motion.g
              key="ai-note"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <text x={SVG_W / 2} y={SVG_H - 20} textAnchor="middle"
                fill={`${INDIGO_TEXT}0.878)`} fontSize={11} fontFamily="monospace" letterSpacing={0.2}>
                AI can only ever produce the warm stated bar ·
              </text>
              <text x={SVG_W / 2} y={SVG_H - 4} textAnchor="middle"
                fill={`${INDIGO_TEXT}0.878)`} fontSize={11} fontFamily="monospace" letterSpacing={0.2}>
                the revealed bar requires real users with something at stake
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {isAI ? (
          <motion.div key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {AI_CARDS.map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${INDIGO}0.06)`, borderColor: `${INDIGO}0.20)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${INDIGO_TEXT}0.90)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { h: 'Real target users, real stakes', b: 'The signal comes from people who actually belong to the target audience, asked to do something that costs them something. No surrogate, no simulation, no shortcut.' },
              { h: 'The threshold is what makes it honest', b: 'Without a pre-set criterion, the team reads the result it wanted to see. With it, the revealed commitment either clears the bar or it does not, and the decision follows.' },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${PLUM}0.10)`, borderColor: `${PLUM}0.26)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${PLUM_TEXT}0.90)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis card */}
      <div className="mt-3 rounded-lg p-4 border border-white/8"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mb-1">Synthesis</p>
        <p className="text-xs text-white/55 leading-relaxed">
          AI can help design the test well and synthesize real results afterward. It cannot substitute for the test itself, because the test measures revealed preference (real people doing costly things) and a model with nothing at stake can only produce the stated interest the method was built to see past.
        </p>
      </div>
    </div>
  )
}
