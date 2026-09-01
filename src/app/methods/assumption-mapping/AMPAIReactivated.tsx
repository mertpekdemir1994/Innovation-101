'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700, SVG_H = 260

// Grid geometry - identical to AMPEstablishing
const GX = 96,  GY = 20
const GW = 544, GH = 228
const GR = GX + GW
const GB = GY + GH
const MX = GX + GW / 2   // 368
const MY = GY + GH / 2   // 134

const CARD_H = 26

type Mode = 'human' | 'ai'

// The key assumption: in human mode it's correctly in the LOF quadrant (top-right).
// In AI mode it's incorrectly pushed to the MONITOR quadrant (top-left): the consensus trap.
const LOF_CARD = { x: 384, y: 54, w: 136, label: 'WILL THEY BUY ONLINE?' }
const TRAP_CARD = { x: 218, y: 54, w: 136, label: 'WILL THEY BUY ONLINE?' }

const STATIC_CARDS = [
  { id: 's1', x: 104, y: 40, w: 110, label: 'BEHAVIOUR EXISTS' },
  { id: 's2', x: 218, y: 82, w: 110, label: 'TECH IS READY' },
  { id: 's3', x: 508, y: 80, w: 118, label: 'PRICE ACCEPTED?' },
  { id: 's4', x: 400, y: 170, w: 134, label: 'PREFER FREE RETURNS' },
  { id: 's5', x: 104, y: 168, w: 118, label: 'CAN SHIP PRODUCT' },
  { id: 's6', x: 224, y: 208, w: 110, label: 'CAN BUILD SITE' },
]

export default function AMPAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  return (
    <div className="w-full">
      {/* Mode toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {(['human', 'ai'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
              aria-pressed={mode === m}
              style={{
                background: mode === m
                  ? m === 'ai' ? `${INDIGO}0.25)` : `${CLAY}0.22)`
                  : 'transparent',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.38)',
                border: `1px solid ${mode === m
                  ? (m === 'ai' ? `${INDIGO}0.55)` : `${CLAY}0.55)`)
                  : 'transparent'}`,
              }}
            >
              {m === 'human' ? 'Human Mapping' : 'With AI (default)'}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', overflow: 'visible' }}
        aria-label={
          isAI
            ? 'AI mode: the assumption "Will they buy online?" is incorrectly placed in the top-left monitor quadrant. AI rates online purchasing as well-established behaviour, missing that buying shoes without trying is the genuine, untested leap.'
            : 'Human mode: the assumption "Will they buy online?" is correctly placed in the top-right leap-of-faith quadrant, critical and untested.'
        }
      >
        <defs>
          <filter id="amp-ai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="amp-ai-lof-grad-h" cx="20%" cy="20%" r="90%">
            <stop offset="0%" stopColor={`${CLAY}0.20)`} />
            <stop offset="100%" stopColor={`${CLAY}0.0)`} />
          </radialGradient>
          <radialGradient id="amp-ai-lof-grad-ai" cx="20%" cy="20%" r="90%">
            <stop offset="0%" stopColor={`${INDIGO}0.06)`} />
            <stop offset="100%" stopColor={`${INDIGO}0.0)`} />
          </radialGradient>
        </defs>

        {/* Leap-of-faith corner glow (dims in AI mode - the AI misses the dangerous zone) */}
        <rect x={MX} y={GY} width={GR - MX} height={MY - GY}
          fill={isAI ? 'url(#amp-ai-lof-grad-ai)' : 'url(#amp-ai-lof-grad-h)'}
          style={{ transition: 'fill 0.45s' }} />

        {/* Grid border */}
        <rect x={GX} y={GY} width={GW} height={GH}
          fill={isAI ? `${INDIGO}0.03)` : 'none'}
          stroke={isAI ? `${INDIGO}0.25)` : 'rgba(255,255,255,0.13)'}
          strokeWidth={1}
          style={{ transition: 'fill 0.4s, stroke 0.4s' }} />

        {/* Center dividers */}
        <line x1={MX} y1={GY} x2={MX} y2={GB}
          stroke={isAI ? `${INDIGO}0.12)` : 'rgba(255,255,255,0.09)'}
          strokeWidth={1} strokeDasharray="4 3"
          style={{ transition: 'stroke 0.4s' }} />
        <line x1={GX} y1={MY} x2={GR} y2={MY}
          stroke={isAI ? `${INDIGO}0.12)` : 'rgba(255,255,255,0.09)'}
          strokeWidth={1} strokeDasharray="4 3"
          style={{ transition: 'stroke 0.4s' }} />

        {/* Axis labels */}
        <text transform={`rotate(-90, 16, ${(GY + GB) / 2})`}
          x={16} y={(GY + GB) / 2}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.18em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>IMPORTANCE</text>
        <text x={GX - 20} y={GY + 4} textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>HIGH</text>
        <text x={GX - 20} y={GB - 2} textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>LOW</text>

        {/* Quadrant labels */}
        <text x={GX + 8} y={GY + 14} textAnchor="start"
          fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.13em"
          fill={isAI ? `${INDIGO_TEXT}0.905)` : 'rgba(255,255,255,0.6)'}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>
          {isAI ? 'AI: KNOWN / SAFE' : 'MONITOR'}
        </text>
        <text x={GR - 8} y={GY + 14} textAnchor="end"
          fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
          fill={isAI ? 'rgba(255,255,255,0.59)' : `${CLAY_TEXT}0.958)`}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>
          {isAI ? 'LEAP OF FAITH' : 'LEAP OF FAITH · TEST FIRST'}
        </text>
        <text x={GX + 8} y={GB - 8} textAnchor="start"
          fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.13em"
          fill="rgba(255,255,255,0.56)" style={{ userSelect: 'none' }}>IGNORE</text>
        <text x={GR - 8} y={GB - 8} textAnchor="end"
          fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.13em"
          fill="rgba(255,255,255,0.57)" style={{ userSelect: 'none' }}>NICE TO KNOW</text>

        {/* Static background cards */}
        {STATIC_CARDS.filter(c => !(isAI && c.id === 's1' && false)).map(c => (
          <g key={c.id}>
            <rect x={c.x} y={c.y} width={c.w} height={CARD_H} rx={3}
              fill="rgba(255,255,255,0.04)"
              stroke={isAI ? `${INDIGO}0.16)` : 'rgba(255,255,255,0.13)'}
              strokeWidth={1}
              style={{ transition: 'stroke 0.4s' }} />
            <text x={c.x + c.w / 2} y={c.y + CARD_H / 2 + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.11em"
              fill="rgba(255,255,255,0.64)" style={{ userSelect: 'none' }}>{c.label}</text>
          </g>
        ))}

        {/* The key assumption card - moves position in AI mode */}
        {(() => {
          const card = isAI ? TRAP_CARD : LOF_CARD
          return (
            <g style={{ transition: 'none' }}>
              <rect
                x={card.x} y={card.y} width={card.w} height={CARD_H} rx={3}
                fill={isAI ? `${INDIGO}0.12)` : `${CLAY}0.14)`}
                stroke={isAI ? `${INDIGO}0.60)` : `${CLAY}0.70)`}
                strokeWidth={isAI ? 1.5 : 2}
                filter="url(#amp-ai-glow-sm)"
                style={{ transition: 'fill 0.4s, stroke 0.4s' }}
              />
              <text x={card.x + card.w / 2} y={card.y + CARD_H / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.11em"
                fill={isAI ? `${INDIGO_TEXT}0.979)` : `${CLAY_TEXT}1.0)`}
                style={{ userSelect: 'none', transition: 'fill 0.4s' }}>
                {card.label}
              </text>
            </g>
          )
        })()}

        {/* AI consensus-trap annotation (visible only in AI mode) */}
        <AnimatePresence>
          {isAI && (
            <motion.g
              key="trap-badge"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.35 }}
            >
              {/* Arrow from card toward the correct LOF quadrant (suggesting where it should be) */}
              <line x1={357} y1={67} x2={385} y2={67}
                stroke={`${INDIGO}0.45)`} strokeWidth={1}
                strokeDasharray="3 2" strokeLinecap="round" />
              <path d={`M 381 62 L 387 67 L 381 72`}
                stroke={`${INDIGO}0.45)`} strokeWidth={1} fill="none"
                strokeLinecap="round" strokeLinejoin="round" />
              {/* Trap badge */}
              <rect x={TRAP_CARD.x} y={TRAP_CARD.y - 20} width={110} height={16} rx={3}
                fill={`${INDIGO}0.14)`} stroke={`${INDIGO}0.45)`} strokeWidth={1} />
              <text x={TRAP_CARD.x + 55} y={TRAP_CARD.y - 12} textAnchor="middle" dominantBaseline="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={`${INDIGO_TEXT}0.969)`} style={{ userSelect: 'none' }}>CONSENSUS TRAP</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {isAI ? (
          <motion.div
            key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                h: 'AI generates the list fast',
                b: 'Given a concept, AI can brainstorm a long list of assumptions across desirability, feasibility, and viability in seconds. Useful for breadth and for not forgetting whole categories. The obvious assumptions come out well.',
              },
              {
                h: 'AI cannot judge your uncertainty',
                b: "Uncertainty is how much evidence YOU have: what you've learned from customers, tests, and your specific context. AI doesn't have access to your private evidence. An assumption that's genuinely unknown to your team may look well-established to AI from public patterns.",
              },
              {
                h: 'The consensus trap',
                b: "AI reasons from what's widely written, so it tends to rate industry-wide shared assumptions as 'known' and safe, when those consensus beliefs are sometimes exactly the untested leaps a breakthrough would challenge. It can quietly push the riskiest assumption into the safe quadrant.",
              },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${INDIGO}0.07)`, borderColor: `${INDIGO}0.22)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${INDIGO}0.80)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              {
                h: 'Importance is specific to your model',
                b: 'How much does THIS concept depend on THIS assumption? That depends on your specific business design, not a generic one. A team can judge importance for their situation; AI can only guess generically.',
              },
              {
                h: 'Uncertainty is what you actually know',
                b: "The axis that matters most is: do you have real evidence, or are you just hoping? That is a judgment about your own evidence base: what you have tested, what customers have told you. Only you know what you actually know.",
              },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${CLAY}0.07)`, borderColor: `${CLAY}0.22)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${CLAY}0.90)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis */}
      <div className="mt-4 rounded-lg p-4 border border-white/8"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/28 mb-1">Synthesis</p>
        <p className="text-xs text-white/42 leading-relaxed">
          Use AI to generate the assumption list quickly: breadth for the obvious beliefs. But keep the placement on the two axes human: importance depends on your specific business model, and uncertainty depends on your private evidence. The leap-of-faith assumption to test first is a human judgment, not a generic one.
        </p>
      </div>
    </div>
  )
}
