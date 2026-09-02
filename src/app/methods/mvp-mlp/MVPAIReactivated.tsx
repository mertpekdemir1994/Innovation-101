'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const BRICK_TEXT = 'rgba(183,145,135,'  // brightened text-safe variant of BRICK
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700
const SVG_H = 266

// Geometry (identical to MVPEstablishing)
const CORE_X = 206, CORE_Y = 20, CORE_W = 288, CORE_H = 110
const CORE_CX = CORE_X + CORE_W / 2

// MVP/MLP badge height grown 80 -> 100: at 11pt the bottom caption line no
// longer fits on one line, so it splits into two.
const MVP_X = 22, MVP_Y = 36, MVP_W = 158, MVP_H = 100
const MVP_CX = MVP_X + MVP_W / 2

const MLP_X = 520, MLP_Y = 36, MLP_W = 158, MLP_H = 100
const MLP_CX = MLP_X + MLP_W / 2

// CORE ACTION and CORE FEATURE widened (80->90, 90->98): at 11pt their labels
// no longer fit the old tile width. Neighbors repositioned to keep the gaps.
const FTILES = [
  { x: 218, y: 38, w: 82,  h: 26, label: 'CORE VALUE'   },
  { x: 306, y: 38, w: 90,  h: 26, label: 'CORE ACTION'  },
  { x: 402, y: 38, w: 86,  h: 26, label: 'CORE DATA'    },
  { x: 246, y: 74, w: 98,  h: 26, label: 'CORE FEATURE' },
  { x: 354, y: 74, w: 86,  h: 26, label: 'CORE FLOW'    },
]

const CUT_X = 206, CUT_Y = 164, CUT_W = 288, CUT_H = 72
const CUT_CX = CORE_CX

const CITEMS = [
  { x: 218, y: 180, w: 80, h: 22, label: 'NON-CORE'    },
  { x: 308, y: 180, w: 76, h: 22, label: 'NOT YET'     },
  { x: 394, y: 180, w: 90, h: 22, label: 'FUTURE V2'   },
  { x: 258, y: 212, w: 88, h: 22, label: 'EXTRA FEAT.' },
  { x: 356, y: 212, w: 80, h: 22, label: 'LATER...'    },
]

// AI cost-collapse badge: appears over MLP optimization in AI mode.
// Grown to hold 2 lines at 11pt ("AI MAKES THIS CHEAP NOW" no longer fits
// one line at this badge's width).
const AI_BADGE = { x: MLP_X - 2, y: 2, w: MLP_W + 4, h: 32 }

type Mode = 'human' | 'ai'

const INFO_CARDS = {
  human: [
    {
      tag: 'TRADITIONAL ECONOMICS',
      headline: 'Craft was expensive, which made the bare MVP the affordable default.',
      body: 'Historically, the argument for a bare MVP was largely economic. Polished interfaces, well-crafted copy, and well-built implementation took real time and money, so shipping something merely functional was often the only way to learn quickly. The cost gap between "functional" and "lovable" was wide, and many teams defaulted to the MVP end not by choice but by budget.',
    },
  ],
  ai: [
    {
      tag: 'GENUINE AI UPLIFT',
      headline: 'AI collapsed the cost of lovable. The old excuse for shipping something unloved is much weaker now.',
      body: 'Polished interfaces, competent copy, well-crafted visual design, and clean implementation can now be produced quickly and cheaply with AI assistance. The cost gap between "functional" and "well-executed" has narrowed sharply. The old defense, "we cannot afford lovable, so we shipped the bare minimum", is much harder to sustain. In practice this pushes the sensible default toward the MLP end: if craft is cheap, shipping something joyless mostly risks false negatives you did not need to incur. This is a real, material change to how this method should be practiced.',
    },
    {
      tag: 'TASTE: LOVED ≠ POLISHED',
      headline: 'AI makes things tidy. Tidy is not the same as loved.',
      body: 'AI is genuinely good at competent craft and genuinely limited at taste. It can make something look and feel professionally executed; it is much weaker at the specific emotional judgment that makes a product delightful rather than merely tidy: knowing which small moment matters, which detail earns affection, what would make THIS user tell a friend. Love is not an average of what has been well-received before. It is specific, and it comes from human judgment about people. A product can be immaculately produced and entirely unloved. AI can produce exactly that, at speed.',
    },
    {
      tag: 'INTERPRETATION: FLUENT ≠ EVIDENCE',
      headline: 'AI cannot make the call that the whole method turns on.',
      body: 'The hardest, most consequential moment in this method is reading a weak signal: did the market reject the IDEA, or reject THIS EXECUTION? Those two diagnoses demand opposite responses (pivot vs improve) and getting it wrong kills good ideas or props up bad ones. AI will produce a fluent, confident narrative explaining the churn. That narrative is not evidence about its cause. The interpretive judgment depends on understanding your users, your market, and what your release actually felt like to use. No metric and no summary hands you that.',
    },
  ],
}

export default function MVPAIReactivated() {
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
                ? (m === 'ai' ? `${INDIGO_TEXT}1)` : `${BRICK_TEXT}1)`)
                : 'rgba(255,255,255,0.50)',
            }}>
            {m === 'human' ? 'Traditional' : 'With AI'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div aria-label={isAI
        ? 'AI-reactivated view. MLP optimization badge highlighted with AI cost-collapse badge (indigo). Core and cut pile unchanged. Human-judgment annotations: TASTE (loved vs polished) and INTERPRETATION (idea vs execution) remain human.'
        : 'Traditional view: two products, same core, different optimization.'}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}>
          <defs>
            <filter id="mvpai-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={isAI ? `${INDIGO}0.35)` : `${BRICK}0.35)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="mvpai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
              <feFlood floodColor={`${BRICK}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Shared core: unchanged by mode */}
          <rect x={CORE_X - 4} y={CORE_Y - 4} width={CORE_W + 8} height={CORE_H + 8} rx={12}
            fill="none" stroke={`${BRICK}0.08)`} strokeWidth={8}
            style={{ filter: 'url(#mvpai-glow-sm)' }} />
          <rect x={CORE_X} y={CORE_Y} width={CORE_W} height={CORE_H} rx={8}
            fill={`${BRICK}0.05)`} stroke={`${BRICK}0.32)`} strokeWidth={1.3} />
          {/* "· IDENTICAL IN BOTH PRODUCTS" dropped: at 11pt the full line
              overflowed the core box, and the MVP/MLP badges either side of
              a single shared core already make the point */}
          <text x={CORE_CX} y={CORE_Y + 11}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill={`rgba(183,145,135,0.899)`} style={{ userSelect: 'none' }}>
            SHARED CORE
          </text>

          {/* Feature tiles: unchanged */}
          {FTILES.map((t, i) => (
            <g key={i}>
              <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={3}
                fill={`${BRICK}0.10)`} stroke={`${BRICK}0.48)`} strokeWidth={0.9}
                style={{ filter: 'url(#mvpai-glow-sm)' }} />
              <text x={t.x + t.w / 2} y={t.y + t.h / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={`rgba(183,145,135,0.958)`} style={{ userSelect: 'none' }}>
                {t.label}
              </text>
            </g>
          ))}

          {/* Connectors */}
          <line x1={CORE_X} y1={CORE_CX - CORE_CX + 75} x2={MVP_X + MVP_W} y2={MVP_Y + MVP_H / 2}
            stroke={isAI ? `rgba(255,255,255,0.14)` : `${BRICK}0.22)`}
            strokeWidth={0.9} strokeDasharray="4 3"
            style={{ transition: 'stroke 0.35s' }} />
          <line x1={CORE_X + CORE_W} y1={75} x2={MLP_X} y2={MLP_Y + MLP_H / 2}
            stroke={isAI ? `${INDIGO}0.35)` : `${BRICK}0.22)`}
            strokeWidth={0.9} strokeDasharray="4 3"
            style={{ transition: 'stroke 0.35s' }} />
          <line x1={CORE_CX} y1={CORE_Y + CORE_H} x2={CUT_CX} y2={CUT_Y - 2}
            stroke={`${BRICK}0.16)`} strokeWidth={0.9} strokeDasharray="3 3" />

          {/* MVP badge: dims in AI mode (MLP is the new default) */}
          <rect x={MVP_X} y={MVP_Y} width={MVP_W} height={MVP_H} rx={6}
            fill={`${BRICK}0.06)`}
            stroke={`${BRICK}${isAI ? '0.16)' : '0.32)'}`}
            strokeWidth={1.1}
            style={{ opacity: isAI ? 0.45 : 1.0, transition: 'opacity 0.35s, stroke 0.35s' }} />
          <text x={MVP_CX} y={MVP_Y + 16} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
            fill={`rgba(183,145,135,0.895)`}
            style={{ userSelect: 'none', opacity: isAI ? 0.45 : 1.0, transition: 'opacity 0.35s' }}>MVP</text>
          <text x={MVP_CX} y={MVP_Y + 32} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`rgba(183,145,135,0.857)`}
            style={{ userSelect: 'none', opacity: isAI ? 0.45 : 1.0, transition: 'opacity 0.35s' }}>TUNED FOR</text>
          <text x={MVP_CX} y={MVP_Y + 52} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
            fill={`rgba(183,145,135,0.975)`}
            style={{ userSelect: 'none', opacity: isAI ? 0.45 : 1.0, transition: 'opacity 0.35s' }}>LEARNING</text>
          {/* Split across two lines: "FAST · CHEAP · HONEST SIGNAL" no
              longer fits the 158-wide badge on one line at 11pt */}
          <text x={MVP_CX} y={MVP_Y + 72} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`rgba(183,145,135,0.885)`}
            style={{ userSelect: 'none', opacity: isAI ? 0.45 : 1.0, transition: 'opacity 0.35s' }}>FAST · CHEAP</text>
          <text x={MVP_CX} y={MVP_Y + 88} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`rgba(183,145,135,0.885)`}
            style={{ userSelect: 'none', opacity: isAI ? 0.45 : 1.0, transition: 'opacity 0.35s' }}>HONEST SIGNAL</text>

          {/* MLP badge: highlighted in AI mode */}
          <rect x={MLP_X - 3} y={MLP_Y - 3} width={MLP_W + 6} height={MLP_H + 6} rx={9}
            fill="none" stroke={isAI ? `${INDIGO}0.06)` : 'none'} strokeWidth={6}
            style={{ filter: 'url(#mvpai-glow)', transition: 'stroke 0.35s' }} />
          <rect x={MLP_X} y={MLP_Y} width={MLP_W} height={MLP_H} rx={6}
            fill={isAI ? `${INDIGO}0.08)` : `${BRICK}0.06)`}
            stroke={isAI ? `${INDIGO}0.45)` : `${BRICK}0.32)`}
            strokeWidth={1.1}
            style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
          <text x={MLP_CX} y={MLP_Y + 16} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
            fill={isAI ? `${INDIGO_TEXT}0.926)` : `rgba(183,145,135,0.895)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}>MLP</text>
          <text x={MLP_CX} y={MLP_Y + 32} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO_TEXT}0.878)` : `rgba(183,145,135,0.857)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}>TUNED FOR</text>
          <text x={MLP_CX} y={MLP_Y + 52} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
            fill={isAI ? `${INDIGO_TEXT}0.983)` : `rgba(183,145,135,0.975)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}>LOVE</text>
          {/* Split across two lines: "CRAFT · RESONANCE · ADVOCATES" no
              longer fits the 158-wide badge on one line at 11pt */}
          <text x={MLP_CX} y={MLP_Y + 72} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={isAI ? `${INDIGO_TEXT}0.905)` : `rgba(183,145,135,0.885)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}>CRAFT · RESONANCE</text>
          <text x={MLP_CX} y={MLP_Y + 88} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={isAI ? `${INDIGO_TEXT}0.905)` : `rgba(183,145,135,0.885)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}>ADVOCATES</text>

          {/* AI cost-collapse badge (AI mode only) */}
          <AnimatePresence>
            {isAI && (
              <motion.g
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}>
                <rect x={AI_BADGE.x} y={AI_BADGE.y} width={AI_BADGE.w} height={AI_BADGE.h} rx={4}
                  fill={`${INDIGO}0.15)`} stroke={`${INDIGO}0.50)`} strokeWidth={0.9} />
                {/* Split across two lines: doesn't fit the badge width at 11pt */}
                <text x={AI_BADGE.x + AI_BADGE.w / 2} y={AI_BADGE.y + 12}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                  fill={`${INDIGO_TEXT}0.979)`} style={{ userSelect: 'none' }}>
                  AI MAKES THIS
                </text>
                <text x={AI_BADGE.x + AI_BADGE.w / 2} y={AI_BADGE.y + 26}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                  fill={`${INDIGO_TEXT}0.979)`} style={{ userSelect: 'none' }}>
                  CHEAP NOW
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Human judgment annotations (AI mode only) */}
          <AnimatePresence>
            {isAI && (
              <motion.g
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.30, delay: 0.10 }}>
                {/* TASTE annotation: moved from beside MLP (which at 11pt
                    overflowed leftward into the CORE FLOW tile) to the open
                    gap below the MLP badge instead */}
                <line x1={MLP_CX} y1={MLP_Y + MLP_H} x2={MLP_CX} y2={MLP_Y + MLP_H + 10}
                  stroke={`${BRICK}0.45)`} strokeWidth={0.8} />
                <text x={MLP_CX} y={MLP_Y + MLP_H + 19}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`rgba(183,145,135,0.937)`} style={{ userSelect: 'none' }}>
                  TASTE: HUMAN
                </text>
                {/* INTERPRETATION annotation near cut pile; 2nd line moved
                    10 -> 16 below the 1st for clearance at 11pt */}
                <line x1={CORE_CX - 20} y1={CUT_Y + CUT_H / 2} x2={CORE_X - 10} y2={CUT_Y + CUT_H / 2}
                  stroke={`${BRICK}0.35)`} strokeWidth={0.8} />
                <text x={CORE_X - 14} y={CUT_Y + CUT_H / 2}
                  textAnchor="end" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`rgba(183,145,135,0.912)`} style={{ userSelect: 'none' }}>
                  INTERPRETATION:
                </text>
                <text x={CORE_X - 14} y={CUT_Y + CUT_H / 2 + 16}
                  textAnchor="end" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`rgba(183,145,135,0.912)`} style={{ userSelect: 'none' }}>
                  HUMAN JUDGMENT
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Cut pile: unchanged */}
          {/* "· BOTH DISCARDED THESE" dropped: at 11pt it overflowed the
              cut box, and the dashed styling + item labels already say it */}
          <text x={CUT_CX} y={CUT_Y - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.58)" style={{ userSelect: 'none' }}>
            SHARED CUT PILE
          </text>
          <rect x={CUT_X} y={CUT_Y} width={CUT_W} height={CUT_H} rx={6}
            fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={0.9}
            strokeDasharray="5 4" />
          {CITEMS.map((c, i) => (
            <g key={i}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3}
                fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={0.7}
                strokeDasharray="3 3" />
              <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
                {c.label}
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
            {INFO_CARDS[mode].map((c, i) => (
              <div key={i} className="rounded-xl p-5 border"
                style={{
                  background: isAI ? `${INDIGO}0.05)` : `${BRICK}0.05)`,
                  borderColor: isAI ? `${INDIGO}0.20)` : `${BRICK}0.20)`,
                }}>
                <p className="text-2xs font-mono font-semibold uppercase tracking-widest mb-2"
                  style={{ color: isAI ? `${INDIGO_TEXT}0.90)` : `${BRICK_TEXT}0.90)` }}>
                  {c.tag}
                </p>
                <h3 className="font-semibold mb-2"
                  style={{ fontSize: 'var(--text-sm)', color: '#FAFAFA' }}>
                  {c.headline}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                  {c.body}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
