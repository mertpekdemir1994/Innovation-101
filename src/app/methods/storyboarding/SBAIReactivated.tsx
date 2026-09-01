'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 680
const SVG_H = 130
const FW    = 108
const FH    = 90
const FY    = 14
const GAP_P = 10

const FRAME_X: number[] = (() => {
  const total = 5 * FW + 4 * GAP_P
  const sx    = Math.round((SVG_W - total) / 2)
  return Array.from({ length: 5 }, (_, i) => sx + i * (FW + GAP_P))
})()

const LABEL_Y = FY + FH + 11

type Mode = 'author' | 'adversary'

// In AUTHOR mode, AI draws a complete 5-frame storyboard, including frame 3
// In ADVERSARY mode, frames 0-2 and 4 normal; frame 3 amber (gap still there)

const AUTHOR_CARDS = [
  {
    label: 'THE COLLAPSE',
    color: INDIGO,
    body: 'AI eliminates the drawing barrier. Five frames appear in thirty seconds, rendered clearly, narrated confidently. The visual quality problem is gone. The storyboard looks finished.',
  },
  {
    label: 'THE SUBSTITUTION',
    color: AMBER,
    body: 'In frame four the AI writes: "The app intelligently suggests the right recipe." It does not draw the mechanism. It labels it. A label is not a frame. The gap is illustrated, not crossed.',
  },
  {
    label: 'THE RISK',
    color: AMBER,
    body: 'A storyboard with no gaps looks like a validated concept. It is not. The team becomes more confident and less correct. The gap that would have stopped a three-month build is now invisible under a professionally rendered arrow.',
  },
]

const ADVERSARY_CARDS = [
  {
    label: 'FIND THE GAP',
    color: INDIGO,
    body: 'Ask AI to read your storyboard and find the frame that describes a mechanism rather than a behaviour. It will find it. Every time. "Frame four tells us the app suggests a recipe. It does not show us how the app knows what is available."',
  },
  {
    label: 'STRESS THE FRAME',
    color: INDIGO,
    body: 'For each frame: ask AI what assumption the frame is making and how safe that assumption is. The framing forces honesty in a way that freeform exploration does not. You get a risk map, not a narrative.',
  },
  {
    label: 'THE PRINCIPLE',
    color: `${CLAY}1)`,
    body: 'Do not ask AI to draw your storyboard. Ask it to read your storyboard and tell you which frame it cannot draw honestly. That frame is your gap.',
  },
]

export default function SBAIReactivated() {
  const [mode, setMode]     = useState<Mode>('author')
  const prefersReduced      = useReducedMotion()
  const tr = prefersReduced ? { duration: 0 } : { duration: 0.24 }

  const isAuthor = mode === 'author'

  return (
    <div className="w-full">
      {/* ── Tabs ── */}
      <div className="flex gap-2 mb-6">
        {(['author', 'adversary'] as Mode[]).map(m => {
          const active = mode === m
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors"
              style={{
                background: active
                  ? m === 'author' ? `${INDIGO}0.15)` : `${CLAY}0.15)`
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active
                  ? m === 'author' ? `${INDIGO}0.50)` : `${CLAY}0.50)`
                  : 'rgba(255,255,255,0.12)'}`,
                color: active
                  ? m === 'author' ? `${INDIGO}1)` : `${CLAY}1)`
                  : 'rgba(255,255,255,0.45)',
              }}
            >
              {m === 'author' ? 'AI AS AUTHOR' : 'AI AS ADVERSARY'}
            </button>
          )
        })}
      </div>

      {/* ── SVG strip ── */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label={isAuthor
          ? 'Five storyboard frames, all rendered by AI with clean indigo borders. Frame four contains the words "intelligently surfaces the right answer": a label, not a drawing. The gap is invisible but present.'
          : 'Five storyboard frames. Frames one through three and frame five have clay borders. Frame four, THE GAP, has an amber border and is still empty. The gap cannot be closed by AI any more than it can be closed by hand.'
        }
        style={{ width: '100%', maxWidth: SVG_W, display: 'block', marginBottom: '24px' }}
      >
        <defs>
          <filter id="sb-ai-indigo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${INDIGO}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sb-ai-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.60)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sb-ai-clay-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${CLAY}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.97)" rx={6} />

        {/* Frames 0-4 */}
        {[0, 1, 2, 3, 4].map(i => {
          const fx      = FRAME_X[i]
          const isGap   = i === 3
          const indigoFill   = `${INDIGO}0.08)`
          const indigoStroke = `${INDIGO}0.45)`
          const clayFill     = `${CLAY}0.06)`
          const clayStroke   = `${CLAY}0.32)`
          const amberFill    = `${AMBER}0.05)`
          const amberStroke  = `${AMBER}0.62)`

          const fill   = isAuthor ? indigoFill : isGap ? amberFill : clayFill
          const stroke = isAuthor ? indigoStroke : isGap ? amberStroke : clayStroke
          const glow   = isAuthor ? 'url(#sb-ai-indigo-glow)' : isGap ? 'url(#sb-ai-amber-glow)' : undefined
          const dash   = (!isAuthor && isGap) ? '6 4' : undefined

          return (
            <motion.g key={i} animate={{ opacity: 1 }} transition={tr}>
              <rect x={fx} y={FY} width={FW} height={FH} rx={3}
                fill={fill} stroke={stroke} strokeWidth={isGap && !isAuthor ? 1.3 : 0.9}
                strokeDasharray={dash}
                style={glow ? { filter: glow } : undefined}
              />

              {/* Author mode: frame 3 shows a label instead of mechanism */}
              {isAuthor && isGap && (
                <>
                  {/* "Intelligently surfaces" text: the label masquerading as a frame */}
                  <text x={fx + FW / 2} y={FY + 30}
                    textAnchor="middle" fontSize="5.5"
                    fontFamily="var(--font-mono)"
                    fill={`${INDIGO}0.55)`} style={{ userSelect: 'none' }}>
                    intelligently
                  </text>
                  <text x={fx + FW / 2} y={FY + 40}
                    textAnchor="middle" fontSize="5.5"
                    fontFamily="var(--font-mono)"
                    fill={`${INDIGO}0.55)`} style={{ userSelect: 'none' }}>
                    surfaces
                  </text>
                  <text x={fx + FW / 2} y={FY + 50}
                    textAnchor="middle" fontSize="5.5"
                    fontFamily="var(--font-mono)"
                    fill={`${INDIGO}0.55)`} style={{ userSelect: 'none' }}>
                    right answer
                  </text>
                  <text x={fx + FW / 2} y={FY + 74}
                    textAnchor="middle" fontSize="4.0"
                    fontFamily="var(--font-mono)" letterSpacing="0.06em"
                    fill={`${AMBER}0.65)`} style={{ userSelect: 'none' }}>
                    ← A LABEL, NOT A FRAME
                  </text>
                </>
              )}

              {/* Adversary mode: frame 3 shows "?" */}
              {!isAuthor && isGap && (
                <text x={fx + FW / 2} y={FY + 48}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="28" fontFamily="var(--font-mono)" fontWeight="600"
                  fill={`${AMBER}0.62)`} style={{ userSelect: 'none' }}
                  filter="url(#sb-ai-amber-glow)">
                  ?
                </text>
              )}

              {/* Author: "UNVALIDATED" badge on each frame */}
              {isAuthor && !isGap && (
                <text x={fx + FW / 2} y={FY + FH - 8}
                  textAnchor="middle" fontSize="3.8"
                  fontFamily="var(--font-mono)" letterSpacing="0.06em"
                  fill={`${INDIGO}0.40)`} style={{ userSelect: 'none' }}>
                  RENDERED
                </text>
              )}

              <text x={fx + FW / 2} y={LABEL_Y}
                textAnchor="middle" fontSize="4.0"
                fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fontWeight={isGap ? '600' : undefined}
                fill={isAuthor ? `${INDIGO}0.50)` : isGap ? `${AMBER}0.78)` : `${CLAY}0.48)`}
                style={{ userSelect: 'none' }}>
                {i === 0 ? '1' : i === 1 ? '2' : i === 2 ? '3' : isGap ? '?' : '5'}
              </text>
            </motion.g>
          )
        })}

        {/* Author mode: banner */}
        {isAuthor && (
          <text x={SVG_W / 2} y={SVG_H - 6}
            textAnchor="middle" fontSize="3.6"
            fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`${INDIGO}0.35)`} style={{ userSelect: 'none' }}>
            COMPLETE · PROFESSIONAL · THE GAP IS STILL THERE
          </text>
        )}
        {!isAuthor && (
          <text x={SVG_W / 2} y={SVG_H - 6}
            textAnchor="middle" fontSize="3.6"
            fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`${AMBER}0.40)`} style={{ userSelect: 'none' }}>
            AI CANNOT CROSS THE GAP EITHER, IT CAN ONLY FIND IT FASTER
          </text>
        )}
      </svg>

      {/* ── Cards ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={tr}
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          {(isAuthor ? AUTHOR_CARDS : ADVERSARY_CARDS).map((card, i) => {
            const accent = typeof card.color === 'string' && card.color.startsWith('rgba')
              ? card.color
              : `${card.color}1)`
            const alphaBg = typeof card.color === 'string' && card.color.startsWith('rgba')
              ? card.color.replace(/[\d.]+\)$/, '0.06)')
              : `${card.color}0.06)`
            const alphaBorder = typeof card.color === 'string' && card.color.startsWith('rgba')
              ? card.color.replace(/[\d.]+\)$/, '0.22)')
              : `${card.color}0.22)`
            return (
              <div key={i} className="rounded-sm p-5"
                style={{ background: alphaBg, border: `1px solid ${alphaBorder}` }}>
                <p className="text-xs font-mono tracking-widest mb-3"
                  style={{ color: accent }}>
                  {card.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  {card.body}
                </p>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* ── Synthesis card ── */}
      <div className="mt-5 rounded-sm p-5" style={{
        background: `${CLAY}0.08)`,
        border: `1px solid ${CLAY}0.25)`,
        borderLeft: `3px solid ${CLAY}0.60)`,
      }}>
        <p className="text-xs font-mono tracking-widest mb-3" style={{ color: `${CLAY}0.72)` }}>
          HOW TO USE AI WITH A STORYBOARD
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Use AI to find the gap, not fill it. A storyboard where AI has filled the gap with a beautifully rendered arrow is not a validated concept; it is a confident hypothesis with the most important question hidden inside a label. The gap closes when the team can describe the mechanism in a frame that shows a real behaviour. Not before.
        </p>
      </div>
    </div>
  )
}
