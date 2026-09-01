'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700
const TILE_W = 60
const TILE_H = 104
const TILE_R = 6
const TILE_Y = 58
const TILE_CY = TILE_Y + TILE_H / 2

const CAT_LABEL_Y = 17
const CAT_LINE_Y  = 32

const CATEGORIES = [
  { id: 'config',   label: 'CONFIGURATION', x1: 16,  x2: 268, cx: 142 },
  { id: 'offering', label: 'OFFERING',      x1: 288, x2: 412, cx: 350 },
  { id: 'exp',      label: 'EXPERIENCE',    x1: 432, x2: 684, cx: 558 },
]

// No overUsed flag: all tiles are neutral in this section
const TILES = [
  { id: 'profit-model',        cat: 'config',   x: 16,  lines: ['PROFIT', 'MODEL'],      aiIdea: ['TRY', 'SUBSCR.'] },
  { id: 'network',             cat: 'config',   x: 80,  lines: ['NETWORK'],              aiIdea: ['ADD', 'PARTNERS'] },
  { id: 'structure',           cat: 'config',   x: 144, lines: ['STRUCTURE'],            aiIdea: ['REORGANIZE'] },
  { id: 'process',             cat: 'config',   x: 208, lines: ['PROCESS'],              aiIdea: ['GO AGILE'] },
  { id: 'product-performance', cat: 'offering', x: 288, lines: ['PRODUCT', 'PERF.'],    aiIdea: ['BETTER', 'FEATURES'] },
  { id: 'product-system',      cat: 'offering', x: 352, lines: ['PRODUCT', 'SYSTEM'],   aiIdea: ['BUILD', 'PLATFORM'] },
  { id: 'service',             cat: 'exp',      x: 432, lines: ['SERVICE'],              aiIdea: ['ADD', 'SUPPORT'] },
  { id: 'channel',             cat: 'exp',      x: 496, lines: ['CHANNEL'],             aiIdea: ['SELL', 'DIRECT'] },
  { id: 'brand',               cat: 'exp',      x: 560, lines: ['BRAND'],               aiIdea: ['SUSTAIN-', 'ABILITY'] },
  { id: 'customer-engagement', cat: 'exp',      x: 624, lines: ['CUSTOMER', 'ENGAGE.'], aiIdea: ['LOYALTY', 'PROG.'] },
]

type Mode = 'human' | 'ai'

export default function TTIAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  const SVG_H = 170

  return (
    <div className="w-full">
      {/* Mode toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.07)' }}>
          {(['human', 'ai'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: mode === m
                  ? m === 'ai' ? `${INDIGO}0.25)` : `${PLUM}0.25)`
                  : 'transparent',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.38)',
                border: `1px solid ${mode === m ? (m === 'ai' ? `${INDIGO}0.55)` : `${PLUM}0.55)`) : 'transparent'}`,
              }}
            >
              {m === 'human' ? 'Human Strategy' : 'With AI'}
            </button>
          ))}
        </div>
      </div>

      {/* SVG board */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="tti-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Category backgrounds */}
        {CATEGORIES.map((cat) => (
          <rect
            key={cat.id}
            x={cat.x1 - 4} y={CAT_LINE_Y - 2}
            width={cat.x2 - cat.x1 + 8}
            height={TILE_Y + TILE_H - CAT_LINE_Y + 14}
            rx={8}
            fill={isAI ? `${INDIGO}0.06)` : `${PLUM}0.06)`}
            stroke={isAI ? `${INDIGO}0.18)` : `${PLUM}0.16)`}
            strokeWidth={1}
            style={{ transition: 'fill 0.35s, stroke 0.35s' }}
          />
        ))}

        {/* Category labels */}
        {CATEGORIES.map((cat) => (
          <g key={`lbl-${cat.id}`}>
            <text
              x={cat.cx} y={CAT_LABEL_Y}
              textAnchor="middle"
              fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={isAI ? `${INDIGO_TEXT}0.916)` : `${PLUM_TEXT}0.905)`}
              style={{ userSelect: 'none', transition: 'fill 0.35s' }}
            >
              {cat.label}
            </text>
            <line
              x1={cat.x1 - 2} y1={CAT_LINE_Y} x2={cat.x2 + 2} y2={CAT_LINE_Y}
              stroke={isAI ? `${INDIGO}0.18)` : `${PLUM}0.22)`}
              strokeWidth={1}
              style={{ transition: 'stroke 0.35s' }}
            />
          </g>
        ))}

        {/* Tiles: all neutral (no over-used distinction in this section) */}
        {TILES.map((tile) => {
          const cx = tile.x + TILE_W / 2
          const C = isAI ? INDIGO : PLUM
          return (
            <g key={tile.id}>
              <rect
                x={tile.x} y={TILE_Y}
                width={TILE_W} height={TILE_H}
                rx={TILE_R}
                fill={`${C}${isAI ? '0.16)' : '0.18)'}`}
                stroke={`${C}${isAI ? '0.65)' : '0.65)'}`}
                strokeWidth={1.5}
                filter="url(#tti-ai-glow)"
                style={{ transition: 'fill 0.35s, stroke 0.35s' }}
              />

              <AnimatePresence mode="wait">
                {!isAI ? (
                  <motion.g
                    key="human-label"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.25 }}
                  >
                    {tile.lines.length === 1 ? (
                      <text x={cx} y={TILE_CY}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                        fill={`${PLUM_TEXT}0.983)`} style={{ userSelect: 'none' }}>
                        {tile.lines[0]}
                      </text>
                    ) : (
                      <>
                        <text x={cx} y={TILE_CY - 8}
                          textAnchor="middle" dominantBaseline="middle"
                          fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                          fill={`${PLUM_TEXT}0.983)`} style={{ userSelect: 'none' }}>
                          {tile.lines[0]}
                        </text>
                        <text x={cx} y={TILE_CY + 8}
                          textAnchor="middle" dominantBaseline="middle"
                          fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                          fill={`${PLUM_TEXT}0.983)`} style={{ userSelect: 'none' }}>
                          {tile.lines[1]}
                        </text>
                      </>
                    )}
                  </motion.g>
                ) : (
                  <motion.g
                    key="ai-idea"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.28 }}
                  >
                    {/* Dimmed type label */}
                    {tile.lines.length === 1 ? (
                      <text x={cx} y={TILE_CY - 16}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                        fill={`${INDIGO_TEXT}0.864)`} style={{ userSelect: 'none' }}>
                        {tile.lines[0]}
                      </text>
                    ) : (
                      <>
                        <text x={cx} y={TILE_CY - 24}
                          textAnchor="middle" dominantBaseline="middle"
                          fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                          fill={`${INDIGO_TEXT}0.864)`} style={{ userSelect: 'none' }}>
                          {tile.lines[0]}
                        </text>
                        <text x={cx} y={TILE_CY - 14}
                          textAnchor="middle" dominantBaseline="middle"
                          fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                          fill={`${INDIGO_TEXT}0.864)`} style={{ userSelect: 'none' }}>
                          {tile.lines[1]}
                        </text>
                      </>
                    )}
                    {/* AI idea text */}
                    {tile.aiIdea.length === 1 ? (
                      <text x={cx} y={TILE_CY + 10}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                        fill={`${INDIGO_TEXT}0.983)`} style={{ userSelect: 'none' }}>
                        {tile.aiIdea[0]}
                      </text>
                    ) : (
                      <>
                        <text x={cx} y={TILE_CY + 3}
                          textAnchor="middle" dominantBaseline="middle"
                          fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                          fill={`${INDIGO_TEXT}0.983)`} style={{ userSelect: 'none' }}>
                          {tile.aiIdea[0]}
                        </text>
                        <text x={cx} y={TILE_CY + 15}
                          textAnchor="middle" dominantBaseline="middle"
                          fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                          fill={`${INDIGO_TEXT}0.983)`} style={{ userSelect: 'none' }}>
                          {tile.aiIdea[1]}
                        </text>
                      </>
                    )}
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          )
        })}
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {isAI ? (
          <motion.div
            key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                h: 'AI fills all ten types, fast',
                b: 'Every type gets at least one plausible idea, quickly. This counters the product-only default and makes sure no dimension is overlooked before the team commits to a direction. The breadth is genuinely useful.',
              },
              {
                h: 'The ideas are generic, by design',
                b: '"Try subscription" for profit model. "Sell direct online" for channel. "Add a loyalty program" for customer engagement. These are the on-pattern ideas for each type: correct in category, but not specific to this business. They are starting points, not a strategy.',
              },
              {
                h: 'The combination stays unchosen',
                b: 'Which of these ideas should interlock into a defensible system, and why that specific set, for this specific business, would be hard to copy, is a strategic judgment AI does not make. The ten columns are populated; the winning combination is still missing.',
              },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border" style={{ background: `${INDIGO}0.07)`, borderColor: `${INDIGO}0.22)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: `${INDIGO}0.80)` }}>
                  {card.h}
                </p>
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
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              {
                h: 'The combination is the strategy',
                b: 'Any single type can be copied. The goal is to combine several under-used types (especially the non-product ones) into an interlocking system that rivals must replicate all at once. That combination is what makes an advantage durable.',
              },
              {
                h: 'Human judgment picks the interlocking set',
                b: 'Which specific types, for this business, would reinforce each other into a defensible system, and whether that combination is genuinely feasible, requires strategic judgment that depends on deep knowledge of the business and its competitive landscape.',
              },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border" style={{ background: `${PLUM}0.10)`, borderColor: `${PLUM}0.26)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: `${PLUM}0.82)` }}>
                  {card.h}
                </p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis card */}
      <div className="mt-4 rounded-lg p-4 border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/28 mb-1">Synthesis</p>
        <p className="text-xs text-white/42 leading-relaxed">
          AI accelerates the diagnostic and guarantees breadth across all ten types: real value, countering the product-only default. But the payoff of the framework is the specific, non-obvious combination of under-used types that becomes a defensible system. That combination is a strategic judgment that depends on deep knowledge of this business and this competitive landscape. AI gives you ten columns. Human strategy picks the interlocking set.
        </p>
      </div>
    </div>
  )
}
