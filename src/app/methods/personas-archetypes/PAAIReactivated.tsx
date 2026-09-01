'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'
const AI_C = 'rgba(99,102,241,'

type Persona = 'optimizer' | 'avoider' | 'newcomer'

const CARDS: { id: Persona; name: string; cx: number }[] = [
  { id: 'optimizer', name: 'The Optimizer', cx: 120 },
  { id: 'avoider',   name: 'The Avoider',   cx: 360 },
  { id: 'newcomer',  name: 'The Newcomer',  cx: 600 },
]

const AI_NOTES: Record<Persona, { well: string; risks: string }> = {
  optimizer: {
    well:  'AI reliably generates an Optimizer-type persona. The tech-savvy, feature-demanding power user is common in training data and matches the dominant assumption about "digital product users." This one AI tends to get right.',
    risks: "The Optimizer appearing in AI output can create false confidence. One correct-looking persona does not mean the set is complete. The more important question is always: who didn't the AI generate? The Avoider, the most common real user, does not appear.",
  },
  avoider: {
    well:  'When given REAL interview data showing anxious, shame-driven budgeting behavior, AI is excellent at clustering these signals, finding the pattern across multiple interviews faster than manual analysis.',
    risks: "This is the persona AI almost never generates from nothing. The Avoider is underrepresented in public data, non-obvious, and counterintuitive. AI trained on 'budgeting app users' returns confident optimizers; only real interviews surface the Avoider. This persona reframed the entire product, and AI-generation reliably buries it.",
  },
  newcomer: {
    well:  "AI generates a 'first-timer' persona reasonably well, the pattern is common enough in training data. A Newcomer-type typically appears in AI output alongside the Optimizer.",
    risks: "The generic first-timer AI produces often lacks the specific texture that makes a persona useful: the exact vocabulary confusions, the specific moment shame kicks in, the precise fear triggers. It reads as plausible and teaches you little you did not already assume.",
  },
}

// Avoider defaults AI-on: surfaces the key finding that AI buries the most important persona
const DEFAULT_AI: Record<Persona, boolean> = { optimizer: false, avoider: true, newcomer: false }

const CW = 62
const CT = 22
const CH = 193

function dome(cx: number, cy: number, w: number, h: number) {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

export default function PAAIReactivated() {
  const [aiCards, setAiCards] = useState<Record<Persona, boolean>>(DEFAULT_AI)
  const prefersReduced = useReducedMotion()

  function toggle(p: Persona) {
    setAiCards((prev) => ({ ...prev, [p]: !prev[p] }))
  }

  // Human mode: visible navy card with white line art
  // AI mode: indigo card with indigo dashed outline
  function cardFill(id: Persona)   { return aiCards[id] ? `${AI_C}0.22)` : `${NAVY}0.45)` }
  function cardStroke(id: Persona) { return aiCards[id] ? `${AI_C}0.80)` : 'rgba(255,255,255,0.28)' }
  function avatarFill(id: Persona)   { return aiCards[id] ? `${AI_C}0.15)` : 'rgba(255,255,255,0.12)' }
  function avatarStroke(id: Persona) { return aiCards[id] ? `${AI_C}0.88)` : 'rgba(255,255,255,0.88)' }
  function glowFill(id: Persona)   { return aiCards[id] ? `${AI_C}0.12)` : `${NAVY}0.15)` }

  return (
    <div>
      {/* ── SVG illustration ── */}
      <div className="w-full flex justify-center mb-12 select-none" aria-hidden="true">
        <svg viewBox="0 0 720 258" width="100%" style={{ maxWidth: 800, overflow: 'visible' }}>
          <defs>
            <filter id="pa-ai-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CARDS.map(({ id, name, cx }) => {
            const isAI   = aiCards[id]
            const headCy = CT + 36
            const bodyCy = headCy + 12 + 3
            const bodyH  = 20

            return (
              <g key={id}>
                {/* Ambient halo: navy or indigo depending on mode */}
                <motion.ellipse
                  cx={cx} cy={CT + CH / 2}
                  rx={54} ry={82}
                  animate={{ fill: glowFill(id) }}
                  transition={{ duration: 0.3 }}
                />

                {/* Card frame: visible surface; dashed when AI mode */}
                <motion.rect
                  x={cx - CW} y={CT}
                  width={CW * 2} height={CH}
                  rx={6}
                  strokeWidth={1.5}
                  strokeDasharray={isAI ? '5 3' : undefined}
                  filter="url(#pa-ai-glow)"
                  animate={{ fill: cardFill(id), stroke: cardStroke(id) }}
                  transition={{ duration: 0.3 }}
                />

                {/* Avatar: head */}
                <motion.circle
                  cx={cx} cy={headCy} r={12}
                  strokeWidth={1.5}
                  strokeDasharray={isAI ? '5 3' : undefined}
                  animate={{ fill: avatarFill(id), stroke: avatarStroke(id) }}
                  transition={{ duration: 0.3 }}
                />
                {/* Avatar: shoulders dome (no divider line through the figure) */}
                <motion.path
                  d={dome(cx, bodyCy, 17, bodyH)}
                  strokeWidth={1.5}
                  strokeDasharray={isAI ? '5 3' : undefined}
                  animate={{ fill: avatarFill(id), stroke: avatarStroke(id) }}
                  transition={{ duration: 0.3 }}
                />

                {/* Caption below the card */}
                <text
                  x={cx} y={228}
                  textAnchor="middle" fontSize="13" fontWeight="600"
                  fontFamily="var(--font-body, Inter, sans-serif)"
                  fill="rgba(255,255,255,0.78)"
                  style={{ userSelect: 'none' }}
                >{name}</text>

                {/* AI / RESEARCH badge below name */}
                <AnimatePresence>
                  {isAI ? (
                    <motion.text
                      key="ai"
                      x={cx} y={244}
                      textAnchor="middle" fontSize="9"
                      fontFamily="var(--font-mono)" letterSpacing="0.08em"
                      fill={`${AI_C}0.70)`}
                      style={{ userSelect: 'none' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >AI GENERATED</motion.text>
                  ) : (
                    <motion.text
                      key="human"
                      x={cx} y={244}
                      textAnchor="middle" fontSize="9"
                      fontFamily="var(--font-mono)" letterSpacing="0.04em"
                      fill="rgba(255,255,255,0.32)"
                      style={{ userSelect: 'none' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >RESEARCH-BUILT</motion.text>
                  )}
                </AnimatePresence>
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── Per-persona toggle cards ── */}
      <div className="grid md:grid-cols-3 gap-5">
        {CARDS.map(({ id, name }) => {
          const isAI = aiCards[id]
          return (
            <div
              key={id}
              className="rounded-xl p-5"
              style={{
                background: isAI ? `${AI_C}0.06)` : `${NAVY}0.06)`,
                border: `1px solid ${isAI ? `${AI_C}0.20)` : `${NAVY}0.20)`}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold" style={{ fontSize: 'var(--text-sm)', color: '#FAFAFA' }}>
                  {name}
                </h4>
                <div
                  className="flex rounded-full p-0.5"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  role="group"
                  aria-label={`${name} source mode`}
                >
                  <button
                    onClick={() => isAI && toggle(id)}
                    className="rounded-full px-3 py-1 text-xs font-semibold transition-colors"
                    style={{
                      background: !isAI ? 'rgba(255,255,255,0.90)' : 'transparent',
                      color:      !isAI ? '#111' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-pressed={!isAI}
                  >Human</button>
                  <button
                    onClick={() => !isAI && toggle(id)}
                    className="rounded-full px-3 py-1 text-xs font-semibold transition-colors"
                    style={{
                      background: isAI ? `${AI_C}0.75)` : 'transparent',
                      color:      isAI ? '#fff' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-pressed={isAI}
                  >With AI</button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isAI ? (
                  <motion.div
                    key="ai-detail"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pt-2">
                      <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: `${AI_C}0.70)` }}>
                        What AI does well
                      </p>
                      <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                        {AI_NOTES[id].well}
                      </p>
                      <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(251,146,60,0.75)' }}>
                        What it risks
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                        {AI_NOTES[id].risks}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}
                  >Toggle to AI to see what changes.</motion.p>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Honest synthesis */}
      <div className="mt-10 rounded-xl p-6" style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.20)` }}>
        <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.70)` }}>
          The honest synthesis
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI makes persona <em>production</em> trivial: a polished set of cards in seconds. That is precisely the danger. The value of a persona was never the card; it was the research and synthesis behind it. Used to accelerate clustering of your <em>real</em> interview data, AI is a genuine help. Used to skip the research and generate people from nothing, it produces exactly the assumption-based fiction this method exists to prevent, just faster, more convincingly, and with the authority of a finished artifact. The personas AI doesn&rsquo;t generate are almost always the most important ones.
        </p>
      </div>
    </div>
  )
}
