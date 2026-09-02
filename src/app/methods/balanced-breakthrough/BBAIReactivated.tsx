'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO
const AMBER  = 'rgba(217,119,6,'

const SVG_W = 700
const SVG_H = 400

const D_CX = 350, D_CY = 113
const F_CX = 285, F_CY = 226
const V_CX = 415, V_CY = 226
const R    = 90
const CTR_X = 350, CTR_Y = 188

type Mode = 'human' | 'ai'

export default function BBAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const fade = prefersReduced ? { duration: 0 } : { duration: 0.28 }

  // In AI mode: V circle strongest (INDIGO), F mid, D weakest (AI can't feel desire)
  const dColor   = isAI ? INDIGO : PLUM
  const fColor   = isAI ? INDIGO : PLUM
  const vColor   = isAI ? INDIGO : PLUM
  const dOpacity = isAI ? 0.28 : 0.55
  const fOpacity = isAI ? 0.50 : 0.55
  const vOpacity = isAI ? 0.75 : 0.55

  return (
    <div className="w-full space-y-5">
      {/* Toggle */}
      <div className="flex gap-2">
        {(['human', 'ai'] as Mode[]).map(m => (
          <button key={m}
            onClick={() => setMode(m)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.10)` : `${PLUM}0.10)`
                : 'transparent',
              border: `1px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.35)` : `${PLUM}0.35)`
                : 'rgba(255,255,255,0.12)'}`,
              color: mode === m
                ? m === 'ai' ? `${INDIGO_TEXT}1)` : `${PLUM_TEXT}1)`
                : 'rgba(255,255,255,0.55)',
            }}>
            {m === 'human' ? 'Human-led' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}
          aria-label={isAI
            ? 'AI mode: Viability lens is strongest (AI can model economics), Feasibility is moderate (AI can assess technical complexity), Desirability is weakest (AI cannot feel what humans genuinely want). The centre, the integration judgment, remains human.'
            : 'Human mode: all three lenses balanced, requiring cross-functional human input across Desirability, Feasibility, and Viability.'}>
          <defs>
            <filter id="bb-ai-plum-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${PLUM}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="bb-ai-indigo-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${INDIGO}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="bb-ai-center-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
              <feFlood floodColor={`${PLUM}0.60)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="bb-ai-center-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`${PLUM}0.32)`} />
              <stop offset="100%" stopColor={`${PLUM}0.06)`} />
            </radialGradient>
          </defs>

          <AnimatePresence mode="wait">
            <motion.g key={mode}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}>

              {/* D circle */}
              <circle cx={D_CX} cy={D_CY} r={R}
                fill={`${dColor}0.07)`}
                stroke={`${dColor}${dOpacity})`}
                strokeWidth={isAI ? (1.4 * 0.5) : 1.4}
                strokeDasharray={isAI ? '4 3' : undefined}
                style={{ filter: isAI ? 'url(#bb-ai-indigo-glow)' : 'url(#bb-ai-plum-glow)' }}
              />

              {/* F circle */}
              <circle cx={F_CX} cy={F_CY} r={R}
                fill={`${fColor}0.07)`}
                stroke={`${fColor}${fOpacity})`}
                strokeWidth={isAI ? (1.4 * 0.75) : 1.4}
                style={{ filter: isAI ? 'url(#bb-ai-indigo-glow)' : 'url(#bb-ai-plum-glow)' }}
              />

              {/* V circle */}
              <circle cx={V_CX} cy={V_CY} r={R}
                fill={`${vColor}0.10)`}
                stroke={`${vColor}${vOpacity})`}
                strokeWidth={isAI ? 1.8 : 1.4}
                style={{ filter: isAI ? 'url(#bb-ai-indigo-glow)' : 'url(#bb-ai-plum-glow)' }}
              />

              {/* Center */}
              <circle cx={CTR_X} cy={CTR_Y} r={34}
                fill="url(#bb-ai-center-fill)"
                stroke={`${PLUM}0.45)`}
                strokeWidth={0.8}
                style={{ filter: 'url(#bb-ai-center-glow)' }}
              />
              <text x={CTR_X} y={CTR_Y - 4} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
                fill="rgba(255,255,255,0.95)"
                style={{ userSelect: 'none', filter: `drop-shadow(0 0 8px ${PLUM_TEXT}0.948))` }}>
                {isAI ? 'HUMAN' : 'BREAK'}
              </text>
              <text x={CTR_X} y={CTR_Y + 8} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
                fill="rgba(255,255,255,0.95)"
                style={{ userSelect: 'none', filter: `drop-shadow(0 0 8px ${PLUM_TEXT}0.948))` }}>
                {isAI ? 'JUDGMENT' : 'THROUGH'}
              </text>

              {/* Circle labels - AI mode deliberately grades opacity D < F < V (AI strength order) */}
              <text x={D_CX} y={D_CY - 48} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={isAI ? `${INDIGO_TEXT}0.941)` : `${PLUM_TEXT}0.99)`}
                style={{ userSelect: 'none' }}>DESIRABILITY</text>
              <text x={D_CX} y={D_CY - 32} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={isAI ? `${INDIGO_TEXT}0.899)` : `${PLUM_TEXT}0.926)`}
                style={{ userSelect: 'none' }}>do people want it?</text>

              <text x={F_CX - 58} y={F_CY + 5} textAnchor="end"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={isAI ? `${INDIGO_TEXT}0.966)` : `${PLUM_TEXT}0.99)`}
                style={{ userSelect: 'none' }}>FEASIBILITY</text>
              <text x={F_CX - 58} y={F_CY + 21} textAnchor="end"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={isAI ? `${INDIGO_TEXT}0.92)` : `${PLUM_TEXT}0.926)`}
                style={{ userSelect: 'none' }}>can we build it?</text>

              <text x={V_CX + 58} y={V_CY + 5} textAnchor="start"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={isAI ? `${INDIGO_TEXT}1.0)` : `${PLUM_TEXT}0.99)`}
                style={{ userSelect: 'none' }}>VIABILITY</text>
              <text x={V_CX + 58} y={V_CY + 21} textAnchor="start"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={isAI ? `${INDIGO_TEXT}0.954)` : `${PLUM_TEXT}0.926)`}
                style={{ userSelect: 'none' }}>does it sustain us?</text>
            </motion.g>
          </AnimatePresence>

          {/* AI-mode notes - moved below the circles, they no longer fit as
              in-circle badges at a legible size */}
          {isAI && (
            <motion.g
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={fade}>
              <text x={133} y={345} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={`rgba(221,132,30,0.94)`} style={{ userSelect: 'none' }}>AI CAN&apos;T FEEL</text>
              <text x={133} y={361} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={`rgba(221,132,30,0.94)`} style={{ userSelect: 'none' }}>WHAT PEOPLE WANT</text>

              <text x={350} y={345} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={`${INDIGO_TEXT}0.916)`} style={{ userSelect: 'none' }}>AI HELPS ASSESS</text>
              <text x={350} y={361} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={`${INDIGO_TEXT}0.916)`} style={{ userSelect: 'none' }}>COMPLEXITY</text>

              <text x={567} y={345} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={`${INDIGO_TEXT}0.941)`} style={{ userSelect: 'none' }}>AI STRONGEST:</text>
              <text x={567} y={361} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={`${INDIGO_TEXT}0.941)`} style={{ userSelect: 'none' }}>MODELS ECONOMICS</text>
            </motion.g>
          )}

          {/* Caption */}
          <text x={SVG_W / 2} y={SVG_H - 10} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill="rgba(255,255,255,0.68)" style={{ userSelect: 'none' }}>
            {isAI
              ? 'AI SHIFTS THE WEIGHT OF THE LENSES: THE INTEGRATION JUDGMENT IN THE CENTRE REMAINS HUMAN'
              : 'ALL THREE LENSES REQUIRE HUMAN JUDGMENT: NO SINGLE LENS IS ENOUGH'}
          </text>
        </svg>
      </div>

      {/* Explanation cards */}
      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'DESIRABILITY', body: 'Requires genuine empathy and human research. Understanding what people actually want, not what they say they want, cannot be delegated to analysis alone. It is rooted in observation, listening, and interpretive judgment.' },
              { label: 'FEASIBILITY', body: 'Requires operational and technical honesty. The team must assess whether the organisation can genuinely deliver this (given current capabilities, constraints, and what would need to change) not just whether it seems plausible.' },
              { label: 'VIABILITY', body: 'Requires financial and strategic literacy. The economics must work sustainably: the cost to deliver, what the market will pay, and how the model holds up at scale and under competitive pressure. Optimistic projections are not enough.' },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${PLUM}0.18)`, background: `${PLUM}0.04)` }}>
                <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: `${PLUM_TEXT}0.95)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.body}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'DESIRABILITY: WEAKEST',
                color: AMBER,
                body: 'AI can analyse patterns in stated preferences, reviews, and survey data. But Desirability is ultimately about what people actually want, which requires empathy, contextual observation, and interpretive judgment that AI cannot substitute. Fluent sentiment analysis is not the same as understanding genuine human need.',
              },
              {
                label: 'FEASIBILITY: MODERATE',
                color: INDIGO,
                body: 'AI can help assess technical complexity, identify analogous implementations, and surface operational constraints. But it cannot replace the grounded organisational knowledge of whether this team, with these capabilities and this operating context, can actually deliver.',
              },
              {
                label: 'VIABILITY: STRONGEST',
                color: INDIGO,
                body: 'AI can model financial scenarios, benchmark unit economics, and identify structural risks in a business model with reasonable reliability. Viability analysis is the lens where AI contributes most, though the assumptions the model rests on still require human judgment to set correctly.',
              },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${item.color}0.20)`, background: `${item.color}0.05)` }}>
                <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: item.color === AMBER ? `${AMBER}0.90)` : `${INDIGO_TEXT}0.95)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.body}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI integration note */}
      <AnimatePresence>
        {isAI && (
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="rounded-xl border p-4"
            style={{ borderColor: `${PLUM}0.25)`, background: `${PLUM}0.06)` }}>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: `${PLUM_TEXT}0.95)` }}>
              The integration judgment, centre, remains human
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
              Even when AI contributes meaningfully to individual lenses, the act of weighing all three together (deciding whether the gaps are bridgeable, which trade-offs to accept, and whether the overall picture adds up to a real opportunity) requires human judgment. AI can sharpen each input; it cannot substitute for the integrative decision at the centre.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
