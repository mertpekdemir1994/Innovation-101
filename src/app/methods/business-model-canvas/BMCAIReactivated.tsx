'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700

const BLK = {
  kp:   { x: 4,   y: 4,   w: 116, h: 168 },
  ka:   { x: 124, y: 4,   w: 116, h: 82  },
  kr:   { x: 124, y: 90,  w: 116, h: 82  },
  vp:   { x: 244, y: 4,   w: 156, h: 168 },
  cr:   { x: 404, y: 4,   w: 116, h: 82  },
  ch:   { x: 404, y: 90,  w: 116, h: 82  },
  cs:   { x: 524, y: 4,   w: 172, h: 168 },
  cost: { x: 4,   y: 176, w: 396, h: 68  },
  rev:  { x: 404, y: 176, w: 292, h: 68  },
} as const

type BlockId = keyof typeof BLK
type Mode = 'author' | 'adversary'

const LABELS: Record<BlockId, [string, string]> = {
  kp:   ['KEY', 'PARTNERS'],
  ka:   ['KEY', 'ACTIVITIES'],
  kr:   ['KEY', 'RESOURCES'],
  vp:   ['VALUE', 'PROPOSITIONS'],
  cr:   ['CUSTOMER', 'RELATIONSHIPS'],
  ch:   ['CHANNELS', ''],
  cs:   ['CUSTOMER', 'SEGMENTS'],
  cost: ['COST STRUCTURE', ''],
  rev:  ['REVENUE STREAMS', ''],
}

// In AI-as-author mode: all blocks glow indigo (filled, plausible, professional)
// In AI-as-adversary mode: most blocks normal, CONTRADICTION highlighted (ch ↔ cost)
const CONTRADICTION_BLOCKS: BlockId[] = ['ch', 'cost']

interface CardSpec { accent: string; label: string; body: string }

const AUTHOR_CARDS: CardSpec[] = [
  {
    accent: INDIGO,
    label: 'INSTANT, PROFESSIONAL, PLAUSIBLE',
    body: 'AI fills all nine blocks in seconds. The result looks like competent strategy work: coherently phrased, professionally organized, internally reasonable. This is the trap: it looks like the work of a team that knows the business.',
  },
  {
    accent: AMBER,
    label: 'EVERY BLOCK IS A GUESS',
    body: 'AI cannot know whether this segment exists, whether this channel reaches them, whether this revenue stream converts, or whether these costs are what you think. What it produces is a plausible business model, and plausible is exactly what makes an untested hypothesis dangerous.',
  },
  {
    accent: AMBER,
    label: 'FLUENCY INDUSTRIALIZES THE FAILURE',
    body: 'The canvas\'s characteristic failure has always been the team that fills in nine boxes and mistakes a hypothesis for a plan. AI does this in seconds, at scale, at no cost. The ratio of confident canvases to tested ones has moved sharply in the wrong direction.',
  },
]

const ADVERSARY_CARDS: CardSpec[] = [
  {
    accent: INDIGO,
    label: 'COHERENCE IS FORMAL, AI IS GOOD AT FORMAL',
    body: 'Finding contradictions between blocks is a formal property check: does this cost structure survive that channel? Does this revenue model work at the volume this segment implies? AI can evaluate these quickly and is genuinely useful for this.',
  },
  {
    accent: INDIGO,
    label: 'GIVE IT YOUR CANVAS AND ASK IT TO BREAK IT',
    body: 'Hand it your canvas (the one built by people who know the business) and ask where blocks contradict each other. It will find real inconsistencies, fast. This is legitimately the coherence work the method is built around.',
  },
  {
    accent: PLUM,
    label: 'BUT COHERENCE IS NOT TRUTH',
    body: 'A canvas that passes the coherence check is a consistent set of hypotheses. It can still be entirely wrong. After the adversarial pass, go test the assumptions with real customers. A perfectly consistent business model can fail in the market.',
  },
]

export default function BMCAIReactivated() {
  const [mode, setMode] = useState<Mode>('author')
  const prefersReduced = useReducedMotion()
  const isAuthor = mode === 'author'
  const tr = prefersReduced ? { duration: 0 } : { duration: 0.26 }
  const SVG_H = 290

  function blockFill(k: BlockId): string {
    if (isAuthor) return `${INDIGO}0.14)`
    if (CONTRADICTION_BLOCKS.includes(k)) return `${AMBER}0.14)`
    return `${PLUM}0.06)`
  }

  function blockStroke(k: BlockId): string {
    if (isAuthor) return `${INDIGO}0.55)`
    if (CONTRADICTION_BLOCKS.includes(k)) return `${AMBER}0.75)`
    return `${PLUM}0.30)`
  }

  function blockStrokeW(k: BlockId): number {
    if (isAuthor) return 1.2
    if (CONTRADICTION_BLOCKS.includes(k)) return 1.8
    return 0.9
  }

  function textColor(k: BlockId): string {
    if (isAuthor) return `${INDIGO}0.88)`
    if (CONTRADICTION_BLOCKS.includes(k)) return `${AMBER}0.90)`
    return 'rgba(255,255,255,0.58)'
  }

  return (
    <div className="w-full">
      {/* Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {(['author', 'adversary'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em',
              padding: '7px 18px', borderRadius: '20px', cursor: 'pointer',
              transition: prefersReduced ? 'none' : 'all 0.2s',
              border: `1px solid ${m === mode ? (m === 'adversary' ? `${PLUM}0.60)` : `${INDIGO}0.60)`) : 'rgba(255,255,255,0.14)'}`,
              background: m === mode ? (m === 'adversary' ? `${PLUM}0.12)` : `${INDIGO}0.12)`) : 'transparent',
              color: m === mode ? (m === 'adversary' ? `${PLUM_TEXT}0.95)` : `${INDIGO}0.92)`) : 'var(--color-dark-muted)',
            }}>
            {m === 'author' ? 'AI AS AUTHOR' : 'AI AS ADVERSARY'}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}
        aria-label={isAuthor
          ? 'AI-as-author mode: all nine canvas blocks are filled instantly in indigo, looking professional and plausible. Each block is marked UNVALIDATED: every entry is a guess, and the confidence is precisely what makes it dangerous.'
          : 'AI-as-adversary mode: the Channels and Cost Structure blocks are highlighted in amber as a contradiction. AI has found that the chosen channel breaks the cost structure. This is formal coherence work AI does well.'}
      >
        <defs>
          <filter id="bmc-ai-indigo-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${INDIGO}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bmc-ai-amber-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${AMBER}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Blocks */}
        {(Object.keys(BLK) as BlockId[]).map(k => {
          const b = BLK[k]
          const [line1, line2] = LABELS[k]
          const midY = b.y + b.h / 2
          const hasTwo = line2 !== ''
          const isContradiction = !isAuthor && CONTRADICTION_BLOCKS.includes(k)
          const glowFilter = isAuthor ? 'url(#bmc-ai-indigo-glow)' : isContradiction ? 'url(#bmc-ai-amber-glow)' : 'none'

          return (
            <motion.g key={k}>
              <motion.rect
                x={b.x} y={b.y} width={b.w} height={b.h} rx={3}
                animate={{ fill: blockFill(k), stroke: blockStroke(k), strokeWidth: blockStrokeW(k) }}
                transition={tr}
                style={{ filter: glowFilter }}
              />
              <text x={b.x + b.w / 2} y={hasTwo ? midY - (isAuthor || isContradiction ? 14 : 8) : midY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11"
                fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                style={{ userSelect: 'none', fill: textColor(k) }}>
                {line1}
              </text>
              {hasTwo && (
                <text x={b.x + b.w / 2} y={midY + (isAuthor || isContradiction ? 2 : 10)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                  style={{ userSelect: 'none', fill: textColor(k) }}>
                  {line2}
                </text>
              )}
              {/* Author mode: UNVALIDATED badge */}
              {isAuthor && (
                <text x={b.x + b.w / 2} y={b.y + b.h - 10}
                  textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
                  fill={`${INDIGO_TEXT}0.905)`} style={{ userSelect: 'none' }}>
                  UNVALIDATED
                </text>
              )}
              {/* Adversary mode: contradiction badges */}
              {isContradiction && (
                <text x={b.x + b.w / 2} y={b.y + b.h - 10}
                  textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="-0.01em" fontWeight="600"
                  fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
                  {k === 'ch' ? '⚠ CHANNEL' : '⚠ ECONOMICS BREAK'}
                </text>
              )}
            </motion.g>
          )
        })}

        {/* Author mode overlay: "DANGER" banner */}
        <AnimatePresence>
          {isAuthor && (
            <motion.g
              key="author-overlay"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              transition={tr}>
              <rect x={SVG_W / 2 - 250} y={SVG_H - 40} width={500} height={30} rx={5}
                fill={`${INDIGO}0.18)`} stroke={`${INDIGO}0.50)`} strokeWidth={1.2}
                style={{ filter: 'url(#bmc-ai-indigo-glow)' }} />
              <text x={SVG_W / 2} y={SVG_H - 22} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                fill={`${INDIGO_TEXT}0.979)`} style={{ userSelect: 'none' }}>
                PLAUSIBLE · PROFESSIONAL · ENTIRELY UNVALIDATED
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Adversary mode: contradiction arrow */}
        <AnimatePresence>
          {!isAuthor && (
            <motion.g
              key="adversary-arrow"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              transition={tr}>
              <line
                x1={462} y1={172} x2={300} y2={176}
                stroke={`${AMBER}0.70)`} strokeWidth={1.5} strokeDasharray="5 3" />
              <text x={380} y={198} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fontWeight="600"
                fill={`${AMBER}0.85)`} style={{ userSelect: 'none' }}>
                CONTRADICTION FOUND
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          transition={tr}
          style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {(isAuthor ? AUTHOR_CARDS : ADVERSARY_CARDS).map(({ accent, label, body }) => (
            <div key={label} style={{
              padding: '14px 16px',
              background: `${accent}0.06)`,
              border: `1px solid ${accent}0.22)`,
              borderRadius: '6px',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.06em',
                fontWeight: 600, color: accent === PLUM ? `${PLUM_TEXT}0.95)` : `${accent}0.80)`, marginBottom: '8px',
              }}>{label}</p>
              <p style={{ color: 'rgba(255,255,255,0.56)', fontSize: '12px', lineHeight: 1.65, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Full-width synthesis card */}
      <div style={{
        marginTop: '12px', padding: '16px 20px',
        background: `${PLUM}0.06)`, border: `1px solid ${PLUM}0.20)`, borderRadius: '6px',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.06em', color: `${PLUM_TEXT}0.95)`, marginBottom: '8px' }}>
          THE HONEST SYNTHESIS
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>
          Do not ask AI to <em>write</em> your canvas. It produces nine confident guesses arranged beautifully, and you
          will believe them because they sound like a business. Ask it to <em>break</em> your canvas: to find the
          contradiction between block three and block seven, which is the thing the method exists to surface. Then
          go and test the assumptions on real customers, because coherence is not truth.
        </p>
      </div>
    </div>
  )
}
