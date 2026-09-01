'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY
const AMBER  = 'rgba(217,119,6,'

const SVG_W = 700, SVG_H = 260

// Grid geometry - identical to AMPEstablishing
const GX = 96,  GY = 20
const GW = 544, GH = 228
const GR = GX + GW   // 640
const GB = GY + GH   // 248
const MX = GX + GW / 2  // 368
const MY = GY + GH / 2  // 134

const CARD_H = 26

type CardId = 'a' | 'b' | 'c' | 'd' | 'e'
type Quadrant = 'lof' | 'monitor' | 'ntk' | 'ignore'

type AssumptionCard = {
  id: CardId
  x: number
  y: number
  w: number
  label: string
  quadrant: Quadrant
  detail: {
    verdict: string
    tag: string
    why: string
    action: string
  }
}

const CARDS: AssumptionCard[] = [
  {
    id: 'a',
    x: 384, y: 40, w: 118,
    label: 'WILL THEY BUY?',
    quadrant: 'lof',
    detail: {
      verdict: 'Leap of Faith',
      tag: 'TEST FIRST',
      why: 'This is both critical (the concept depends on it) and genuinely untested. You have no real evidence yet. If this turns out to be false, the whole idea collapses.',
      action: 'Design the cheapest possible experiment that could prove this wrong and run it before committing to build.',
    },
  },
  {
    id: 'b',
    x: 508, y: 80, w: 118,
    label: 'PRICE ACCEPTED?',
    quadrant: 'lof',
    detail: {
      verdict: 'Leap of Faith',
      tag: 'TEST FIRST',
      why: 'The economics of the concept depend on customers accepting this price, and you have no evidence either way. A wrong assumption here makes the business model unviable.',
      action: 'Test willingness to pay before investing in product development. A fake-door test or a pilot sale is usually enough.',
    },
  },
  {
    id: 'c',
    x: 104, y: 40, w: 126,
    label: 'BEHAVIOUR EXISTS',
    quadrant: 'monitor',
    detail: {
      verdict: 'Monitor',
      tag: 'SAFE TO PROCEED',
      why: 'You have reasonable evidence that this behaviour already exists in your target segment. The concept depends on it, but the evidence is solid enough to proceed.',
      action: 'Proceed on this assumption, but keep watching. If the evidence weakens or your specific segment turns out to differ from the average, it moves into the danger quadrant.',
    },
  },
  {
    id: 'd',
    x: 400, y: 170, w: 134,
    label: 'PREFER FREE RETURNS',
    quadrant: 'ntk',
    detail: {
      verdict: 'Nice to Know',
      tag: 'LOW PRIORITY',
      why: 'Interesting to learn, but even if wrong (if customers are fine paying for returns) the concept still works. This is not a concept-killer.',
      action: 'Do not spend scarce test budget here. Log it for later; address it once the leap-of-faith assumptions are resolved.',
    },
  },
  {
    id: 'e',
    x: 104, y: 168, w: 118,
    label: 'CAN BUILD SITE',
    quadrant: 'ignore',
    detail: {
      verdict: 'Ignore',
      tag: 'MOVE ON',
      why: 'Well-evidenced (websites get built every day) and not critical to the differentiation of this concept. Not worth any testing attention.',
      action: 'Move on. Allocate all testing energy to the leap-of-faith corner.',
    },
  },
]

const QUADRANT_LABEL: Record<Quadrant, { text: string; x: number; y: number; anchor: string }> = {
  lof:    { text: 'LEAP OF FAITH · TEST FIRST', x: GR - 8,  y: GY + 14, anchor: 'end'   },
  monitor:{ text: 'MONITOR',                    x: GX + 8,  y: GY + 14, anchor: 'start' },
  ntk:    { text: 'NICE TO KNOW',               x: GR - 8,  y: GB - 8,  anchor: 'end'   },
  ignore: { text: 'IGNORE',                     x: GX + 8,  y: GB - 8,  anchor: 'start' },
}

export default function AMPInteractive() {
  const [active, setActive] = useState<CardId | null>(null)
  const [liveText, setLiveText] = useState('')
  const prefersReduced = useReducedMotion()

  const activeCard = CARDS.find(c => c.id === active) ?? null

  function select(id: CardId) {
    const next = active === id ? null : id
    setActive(next)
    if (next) {
      const card = CARDS.find(c => c.id === id)!
      setLiveText(`${card.label}: ${card.detail.verdict}. ${card.detail.why}`)
    } else {
      setLiveText('Selection cleared')
    }
  }

  function cardFill(card: AssumptionCard): string {
    if (!active) return card.quadrant === 'lof' ? `${CLAY}0.12)` : 'rgba(255,255,255,0.05)'
    if (card.id === active) return card.quadrant === 'lof' ? `${CLAY}0.22)` : 'rgba(255,255,255,0.10)'
    return 'rgba(255,255,255,0.02)'
  }

  function cardStroke(card: AssumptionCard): string {
    if (!active) return card.quadrant === 'lof' ? `${CLAY}0.65)` : 'rgba(255,255,255,0.16)'
    if (card.id === active) return card.quadrant === 'lof' ? `${CLAY}0.90)` : 'rgba(255,255,255,0.60)'
    return 'rgba(255,255,255,0.08)'
  }

  function cardStrokeWidth(card: AssumptionCard): number {
    if (card.id === active) return 2
    return card.quadrant === 'lof' ? 1.5 : 1
  }

  function cardTextFill(card: AssumptionCard): string {
    if (!active) return card.quadrant === 'lof' ? `${CLAY}0.95)` : 'rgba(255,255,255,0.35)'
    if (card.id === active) return card.quadrant === 'lof' ? `${CLAY}1)` : 'rgba(255,255,255,0.85)'
    return 'rgba(255,255,255,0.16)'
  }

  const activeQ = activeCard?.quadrant
  const lofActive = activeQ === 'lof'
  const tagColor = lofActive ? `${CLAY}1)` : `${AMBER}0.90)`

  return (
    <div className="w-full" style={{ position: 'relative' }}>
      {/* Screen-reader live region */}
      <div aria-live="polite" aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        {liveText}
      </div>

      <p className="font-mono uppercase tracking-widest mb-4"
        style={{ fontSize: 'var(--text-2xs)', color: `${CLAY}0.55)` }}>
        Click an assumption to see where it sits, and what to do about it
      </p>

      <div className="w-full select-none">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          style={{ overflow: 'visible', cursor: 'default' }}
          role="img"
          aria-label="Interactive assumption mapping grid. Five clickable assumption cards are placed across four quadrants. Click each to reveal its verdict.">
          <defs>
            <filter id="amp-int-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="amp-int-lof-grad" cx="20%" cy="20%" r="90%">
              <stop offset="0%" stopColor={`${CLAY}${active === 'a' || active === 'b' ? '0.26)' : '0.18)'}`} />
              <stop offset="100%" stopColor={`${CLAY}0.0)`} />
            </radialGradient>
          </defs>

          {/* Leap-of-faith corner glow */}
          <rect x={MX} y={GY} width={GR - MX} height={MY - GY}
            fill="url(#amp-int-lof-grad)"
            style={{ transition: 'fill 0.3s' }} />

          {/* Grid border */}
          <rect x={GX} y={GY} width={GW} height={GH}
            fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth={1} />

          {/* Center dividers */}
          <line x1={MX} y1={GY} x2={MX} y2={GB}
            stroke="rgba(255,255,255,0.09)" strokeWidth={1} strokeDasharray="4 3" />
          <line x1={GX} y1={MY} x2={GR} y2={MY}
            stroke="rgba(255,255,255,0.09)" strokeWidth={1} strokeDasharray="4 3" />

          {/* Axis labels */}
          <text transform={`rotate(-90, 16, ${(GY + GB) / 2})`}
            x={16} y={(GY + GB) / 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>IMPORTANCE</text>
          <text x={GX - 20} y={GY + 4} textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>HIGH</text>
          <text x={GX - 20} y={GB - 2} textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>LOW</text>

          {/* Quadrant labels */}
          {(Object.entries(QUADRANT_LABEL) as [Quadrant, typeof QUADRANT_LABEL[Quadrant]][]).map(([qid, ql]) => (
            <text key={qid}
              x={ql.x} y={ql.y}
              textAnchor={ql.anchor as 'start' | 'end'}
              fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.13em"
              fill={
                qid === 'lof'
                  ? (activeQ === 'lof' ? `${CLAY_TEXT}0.979)` : `${CLAY_TEXT}0.926)`)
                  : activeQ === qid ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.59)'
              }
              style={{ userSelect: 'none', transition: 'fill 0.25s' }}>
              {ql.text}
            </text>
          ))}

          {/* Assumption cards */}
          {CARDS.map(card => (
            <g key={card.id}
              style={{ cursor: 'pointer', transition: 'opacity 0.22s' }}
              onClick={() => select(card.id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(card.id) } }}
              tabIndex={0}
              role="button"
              aria-pressed={active === card.id}
              aria-label={`${card.label}: ${card.detail.verdict}, ${card.detail.tag}`}
            >
              <rect
                x={card.x} y={card.y} width={card.w} height={CARD_H} rx={3}
                fill={cardFill(card)}
                stroke={cardStroke(card)}
                strokeWidth={cardStrokeWidth(card)}
                filter={card.id === active && card.quadrant === 'lof' ? 'url(#amp-int-glow-sm)' : undefined}
                style={{ transition: 'fill 0.22s, stroke 0.22s, stroke-width 0.22s' }}
              />
              <text
                x={card.x + card.w / 2} y={card.y + CARD_H / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.11em"
                fill={cardTextFill(card)}
                style={{ userSelect: 'none', transition: 'fill 0.22s' }}
              >{card.label}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Detail panel */}
      <div className="mt-4" style={{ minHeight: 140 }}>
        <AnimatePresence mode="wait">
          {activeCard === null ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.18 }}
              className="flex items-center justify-center h-24 rounded-lg border border-dashed"
              style={{ borderColor: `${CLAY}0.18)` }}
            >
              <p className="font-mono uppercase tracking-widest text-white/28"
                style={{ fontSize: 'var(--text-2xs)' }}>
                Click an assumption to see where it sits
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCard.id}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.22 }}
              className="rounded-lg border p-5"
              style={{
                borderColor: lofActive ? `${CLAY}0.30)` : 'rgba(255,255,255,0.12)',
                background:  lofActive ? `${CLAY}0.07)` : 'rgba(255,255,255,0.03)',
              }}
            >
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className="font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: 'var(--text-2xs)',
                    color: tagColor,
                    background: lofActive ? `${CLAY}0.12)` : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${lofActive ? `${CLAY}0.35)` : 'rgba(255,255,255,0.15)'}`,
                  }}
                >
                  {activeCard.detail.tag}
                </span>
                <span className="font-mono font-semibold"
                  style={{ fontSize: 'var(--text-xs)', color: lofActive ? `${CLAY}1)` : 'rgba(255,255,255,0.70)' }}>
                  {activeCard.label}
                </span>
                <span style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.30)' }}>
                  {activeCard.detail.verdict}
                </span>
              </div>

              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.62)', lineHeight: 'var(--leading-relaxed)', marginBottom: '0.75rem' }}>
                {activeCard.detail.why}
              </p>

              <div className="rounded p-3"
                style={{ background: 'rgba(255,255,255,0.04)', borderLeft: `2px solid ${lofActive ? `${CLAY}0.40)` : 'rgba(255,255,255,0.15)'}` }}>
                <p className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: lofActive ? `${CLAY}0.65)` : 'rgba(255,255,255,0.28)' }}>
                  What to do
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', lineHeight: 'var(--leading-relaxed)' }}>
                  {activeCard.detail.action}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
