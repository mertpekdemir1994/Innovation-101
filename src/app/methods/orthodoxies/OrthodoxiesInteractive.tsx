'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE

// ── Shared geometry ────────────────────────────────────────────────────────────
const SVG_W = 700, SVG_H = 258
const SX = 152, SY = 74, SW = 268, SH = 116
const SCX = SX + SW / 2  // 286
const SCY = SY + SH / 2  // 132
const WE = 20
const TY = SY, BY = SY + SH
const TX1 = SX - WE, TX2 = SX + SW + WE  // 132, 440
const LX = SX, LY1 = SY - WE, LY2 = SY + SH + WE
const RX = SX + SW
const BRK_Y1 = SCY - 22  // 110
const BRK_Y2 = SCY + 22  // 154
const OPP_CX = Math.round((RX + SVG_W - 14) / 2)

// ── Opportunity glow positions for each wall ───────────────────────────────────
type WallId = 'top' | 'right' | 'bottom' | 'left'

const OPP_GLOW: Record<WallId, { cx: number; cy: number; rx: number; ry: number }> = {
  top:    { cx: SCX,     cy: TY - 36, rx: 100, ry: 28 },
  bottom: { cx: SCX,     cy: BY + 38, rx: 100, ry: 28 },
  left:   { cx: LX - 60, cy: SCY,     rx: 52,  ry: 44 },
  right:  { cx: OPP_CX,  cy: SCY,     rx: 110, ry: 56 },
}

// ── Orthodoxy data ─────────────────────────────────────────────────────────────
const WALLS: Record<WallId, {
  label: string
  belief: string
  beliefBody: string
  flip: string
  opportunity: string
  hmw: string
}> = {
  top: {
    label: 'CUSTOMERS MUST OWN THE PRODUCT',
    belief: 'The customer relationship only works if they buy and own it.',
    beliefBody: 'Pricing, margins, and business models all assume ownership as the fundamental mode. Customers invest once and the relationship is transactional. The entire industry is structured around this assumption, and no one has written it down because no one needs to.',
    flip: 'What if customers never owned it and only paid for access?',
    opportunity: 'Subscription models, access-first structures, outcomes-based pricing. Entire categories have been remade by this single inversion: software, music, cars, eventually eyewear.',
    hmw: 'How might we design a relationship where customers pay for outcomes rather than ownership?',
  },
  right: {
    label: 'SOLD THROUGH DEALERS ONLY',
    belief: 'You need the established dealer or retail network to reach customers at all.',
    beliefBody: 'Distribution requires intermediaries: dealers, retailers, optical shops, wholesalers. Building a direct channel is treated as either impossible or wrong. The whole industry is structured around this assumption and can\'t see it from the inside.',
    flip: 'What if we sold directly and cut the intermediaries out entirely?',
    opportunity: 'Direct-to-consumer removes the markup, enables a direct customer relationship, and makes the unit economics completely different. Warby Parker, Glossier, Tesla: each broke this orthodoxy in their category.',
    hmw: 'How might we reach our customers with no intermediary at any point in the chain?',
  },
  bottom: {
    label: 'IN-PERSON DELIVERY REQUIRED',
    belief: 'The service can only be delivered in person, by an expert, in the right location.',
    beliefBody: 'A physical encounter is assumed to be necessary for fitting, expertise, and trust. The industry has built its entire service model around in-person presence: the shop floor, the consultation, the fitting room. Remote alternatives are treated as inferior or impossible.',
    flip: 'What if the service were entirely remote, at home, or self-serve?',
    opportunity: 'Home try-on, digital measurement, self-serve onboarding. Any time a category insisted you had to come in, someone eventually showed that home delivery, video, or digital tools could do the same job, often better and cheaper.',
    hmw: 'How might we deliver the expert service without requiring the customer to travel to us at all?',
  },
  left: {
    label: 'PREMIUM PRICING = CREDIBILITY',
    belief: 'Low prices signal low quality; the category requires high prices to be taken seriously.',
    beliefBody: 'High price is treated as a proxy for quality and expertise. Low-cost alternatives are assumed to be inferior or untrustworthy. This assumption allows the whole industry to maintain high margins without question, because buyers use price as a quality signal, and always have.',
    flip: 'What if the product were cheap enough to own several, like a fashion accessory?',
    opportunity: 'Accessible pricing expands the market enormously, makes repeat purchase viable, and turns a considered purchase into a casual one. The key move is detaching price from perceived quality through other credibility signals: design, brand, social proof.',
    hmw: 'How might we make the product cheap enough to own multiple versions without signaling low quality?',
  },
}

// ── Hit area geometry ──────────────────────────────────────────────────────────
const HIT: Record<WallId, { x: number; y: number; w: number; h: number; label: string }> = {
  top:    { x: TX1 - 2, y: TY - 14,  w: TX2 - TX1 + 4, h: 28, label: 'Top wall: ' + WALLS.top.label },
  bottom: { x: TX1 - 2, y: BY - 14,  w: TX2 - TX1 + 4, h: 28, label: 'Bottom wall: ' + WALLS.bottom.label },
  left:   { x: LX - 14, y: LY1 - 2,  w: 28,            h: LY2 - LY1 + 4, label: 'Left wall: ' + WALLS.left.label },
  right:  { x: RX - 14, y: LY1 - 2,  w: 28,            h: LY2 - LY1 + 4, label: 'Right wall: ' + WALLS.right.label },
}

export default function OrthodoxiesInteractive() {
  const [selected, setSelected] = useState<WallId | null>(null)
  const [flipped, setFlipped] = useState(false)
  const prefersReduced = useReducedMotion()

  function selectWall(id: WallId) {
    if (selected === id) {
      setSelected(null)
      setFlipped(false)
    } else {
      setSelected(id)
      setFlipped(false)
    }
  }

  function doFlip() {
    setFlipped(true)
  }

  function reset() {
    setSelected(null)
    setFlipped(false)
  }

  function wallStroke(id: WallId): string {
    if (selected === null) return 'rgba(255,255,255,0.60)'
    if (selected === id) return `${SAGE}${flipped ? '1.0)' : '0.90)'}`
    return 'rgba(255,255,255,0.22)'
  }

  function wallWidth(id: WallId): number {
    if (selected === id) return flipped ? 2.5 : 2
    return 1.5
  }

  return (
    <div className="w-full">
      <p className="text-xs text-white/50 mb-4 font-mono tracking-widest uppercase">
        Click a wall to name the hidden belief · then flip it
      </p>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', overflow: 'visible', cursor: 'default' }}
        role="img"
        aria-label="Interactive constraint space with four clickable orthodoxy walls"
      >
        <defs>
          <filter id="ortho-int-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ortho-int-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="ortho-int-opp-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={`${SAGE}0.22)`} />
            <stop offset="100%" stopColor={`${SAGE}0.0)`} />
          </radialGradient>
        </defs>

        {/* Central space */}
        <rect x={SX} y={SY} width={SW} height={SH}
          rx={2} fill="rgba(255,255,255,0.025)" stroke="none" />

        {/* Idea markers */}
        {([
          [SCX - 62, SCY - 24],
          [SCX + 44, SCY - 18],
          [SCX - 18, SCY + 28],
          [SCX + 68, SCY + 18],
          [SCX - 72, SCY + 12],
        ] as [number, number][]).map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3.5}
            fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.20)" strokeWidth={1}
            style={{ opacity: selected ? 0.35 : 1, transition: 'opacity 0.3s' }} />
        ))}

        {/* Center label */}
        <text x={SCX} y={SCY + 3} textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.20em"
          fill="rgba(255,255,255,0.54)" style={{ userSelect: 'none' }}>IDEA SPACE</text>

        {/* ── WALLS ── */}

        {/* TOP */}
        <line x1={TX1} y1={TY} x2={TX2} y2={TY}
          stroke={wallStroke('top')} strokeWidth={wallWidth('top')}
          filter={selected === 'top' ? 'url(#ortho-int-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }} />

        {/* BOTTOM */}
        <line x1={TX1} y1={BY} x2={TX2} y2={BY}
          stroke={wallStroke('bottom')} strokeWidth={wallWidth('bottom')}
          filter={selected === 'bottom' ? 'url(#ortho-int-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }} />

        {/* LEFT */}
        <line x1={LX} y1={LY1} x2={LX} y2={LY2}
          stroke={wallStroke('left')} strokeWidth={wallWidth('left')}
          filter={selected === 'left' ? 'url(#ortho-int-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }} />

        {/* RIGHT: two segments with permanent break */}
        <line x1={RX} y1={LY1} x2={RX} y2={BRK_Y1}
          stroke={wallStroke('right')} strokeWidth={wallWidth('right')}
          filter={selected === 'right' ? 'url(#ortho-int-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }} />
        <line x1={RX} y1={BRK_Y2} x2={RX} y2={LY2}
          stroke={wallStroke('right')} strokeWidth={wallWidth('right')}
          filter={selected === 'right' ? 'url(#ortho-int-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }} />

        {/* ── WALL LABELS ── */}
        <text x={SCX} y={TY - 14} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill={selected === 'top' ? `${SAGE_TEXT}0.969)` : 'rgba(255,255,255,0.71)'}
          style={{ userSelect: 'none', transition: 'fill 0.25s', cursor: 'pointer' }}
          onClick={() => selectWall('top')}>
          CUSTOMERS MUST OWN THE PRODUCT
        </text>

        <text x={SCX} y={BY + 16} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill={selected === 'bottom' ? `${SAGE_TEXT}0.969)` : 'rgba(255,255,255,0.71)'}
          style={{ userSelect: 'none', transition: 'fill 0.25s', cursor: 'pointer' }}
          onClick={() => selectWall('bottom')}>
          IN-PERSON DELIVERY REQUIRED
        </text>

        <text
          transform={`rotate(-90, ${LX - 28}, ${SCY})`}
          x={LX - 28} y={SCY}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill={selected === 'left' ? `${SAGE_TEXT}0.969)` : 'rgba(255,255,255,0.71)'}
          style={{ userSelect: 'none', transition: 'fill 0.25s', cursor: 'pointer' }}
          onClick={() => selectWall('left')}>
          PREMIUM PRICING = CREDIBILITY
        </text>

        <text x={RX} y={LY1 - 10} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill={selected === 'right' ? `${SAGE_TEXT}0.979)` : `${SAGE_TEXT}0.912)`}
          style={{ userSelect: 'none', transition: 'fill 0.25s', cursor: 'pointer' }}
          onClick={() => selectWall('right')}>
          SOLD THROUGH DEALERS ONLY
        </text>

        {/* ── BREAK DETAILS ── */}
        <path d={`M ${RX - 5} ${BRK_Y1} L ${RX + 5} ${BRK_Y1 + 4} L ${RX - 5} ${BRK_Y1 + 8}`}
          stroke={selected === 'right' ? `${SAGE}0.90)` : `${SAGE}0.65)`}
          strokeWidth={1.5} fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'stroke 0.25s' }} />
        <path d={`M ${RX - 5} ${BRK_Y2 - 8} L ${RX + 5} ${BRK_Y2 - 4} L ${RX - 5} ${BRK_Y2}`}
          stroke={selected === 'right' ? `${SAGE}0.90)` : `${SAGE}0.65)`}
          strokeWidth={1.5} fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'stroke 0.25s' }} />

        {/* Break arrow */}
        <g style={{ opacity: selected === 'right' && flipped ? 0.90 : 0.55, transition: 'opacity 0.3s' }}
          filter="url(#ortho-int-glow)">
          <line x1={RX - 6} y1={SCY} x2={RX + 22} y2={SCY}
            stroke={`${SAGE}1)`} strokeWidth={2} strokeLinecap="round" />
          <path d={`M ${RX + 14} ${SCY - 5} L ${RX + 22} ${SCY} L ${RX + 14} ${SCY + 5}`}
            stroke={`${SAGE}1)`} strokeWidth={2} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ── OPPORTUNITY TERRITORY ── */}
        {/* Default right-side glow */}
        <ellipse cx={OPP_CX} cy={SCY} rx={110} ry={56}
          fill="url(#ortho-int-opp-grad)"
          style={{ opacity: selected === null ? 0.8 : (selected === 'right' && flipped ? 1.0 : 0.25), transition: 'opacity 0.4s' }} />

        {/* Opportunity labels (right) */}
        <g style={{ opacity: selected === null ? 0.70 : (selected === 'right' && flipped ? 1.0 : 0.20), transition: 'opacity 0.4s' }}
          filter="url(#ortho-int-glow-sm)">
          <text x={OPP_CX} y={SCY - 9} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={`${SAGE_TEXT}0.958)`} style={{ userSelect: 'none' }}>OPPORTUNITY</text>
          <text x={OPP_CX} y={SCY + 9} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={`${SAGE_TEXT}0.958)`} style={{ userSelect: 'none' }}>SPACE</text>
        </g>

        {/* Directional opportunity glows for non-right walls */}
        {(['top', 'bottom', 'left'] as WallId[]).map((id) => {
          const g = OPP_GLOW[id]
          const show = selected === id && flipped
          return (
            <g key={id} style={{ opacity: show ? 1 : 0, transition: 'opacity 0.4s' }}>
              <ellipse cx={g.cx} cy={g.cy} rx={g.rx} ry={g.ry}
                fill={`${SAGE}0.18)`} />
              <text x={g.cx} y={g.cy - 6} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.16em"
                fill={`${SAGE_TEXT}0.941)`} style={{ userSelect: 'none' }}>OPPORTUNITY</text>
              <text x={g.cx} y={g.cy + 8} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.16em"
                fill={`${SAGE_TEXT}0.941)`} style={{ userSelect: 'none' }}>BEYOND</text>
            </g>
          )
        })}

        {/* ── TRANSPARENT HIT AREAS ── */}
        {(Object.entries(HIT) as [WallId, typeof HIT[WallId]][]).map(([id, h]) => (
          <rect
            key={id}
            x={h.x} y={h.y} width={h.w} height={h.h}
            fill="transparent"
            stroke={selected === id ? `${SAGE}0.30)` : 'transparent'}
            strokeWidth={1}
            rx={2}
            style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
            onClick={() => selectWall(id)}
            onKeyDown={(e) => e.key === 'Enter' && selectWall(id)}
            tabIndex={0}
            role="button"
            aria-pressed={selected === id}
            aria-label={h.label}
          />
        ))}
      </svg>

      {/* ── DETAIL PANEL ── */}
      <div className="mt-4" style={{ minHeight: 148 }}>
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.18 }}
              className="flex items-center justify-center h-24 rounded-lg border border-dashed"
              style={{ borderColor: `${SAGE}0.18)` }}
            >
              <p className="text-xs text-white/50 font-mono tracking-widest uppercase">
                Click a wall to name the hidden belief
              </p>
            </motion.div>
          ) : !flipped ? (
            <motion.div
              key={`named-${selected}`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.22 }}
              className="rounded-lg border p-5"
              style={{ borderColor: `${SAGE}0.22)`, background: `${SAGE}0.06)` }}
            >
              <p className="text-2xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: `${SAGE_TEXT}0.90)` }}>
                Orthodoxy · {WALLS[selected].label}
              </p>
              <p className="text-sm font-semibold text-white/80 mb-2">
                {WALLS[selected].belief}
              </p>
              <p className="text-sm text-white/52 leading-relaxed mb-5">
                {WALLS[selected].beliefBody}
              </p>
              <button
                onClick={doFlip}
                className="px-5 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: `${SAGE}0.18)`,
                  border: `1px solid ${SAGE}0.45)`,
                  color: `${SAGE_TEXT}1)`,
                }}
              >
                Flip it, what if the opposite were true? →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`flipped-${selected}`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.22 }}
              className="rounded-lg border p-5 space-y-4"
              style={{ borderColor: `${SAGE}0.30)`, background: `${SAGE}0.09)` }}
            >
              <div>
                <p className="text-2xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: `${SAGE_TEXT}0.90)` }}>
                  The flip · what if the opposite were true?
                </p>
                <p className="text-sm font-semibold mb-2" style={{ color: `${SAGE_TEXT}1)` }}>
                  {WALLS[selected].flip}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {WALLS[selected].opportunity}
                </p>
              </div>
              <div className="rounded p-3"
                style={{ background: 'rgba(255,255,255,0.04)', borderLeft: `2px solid ${SAGE}0.35)` }}>
                <p className="text-2xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: `${SAGE_TEXT}0.90)` }}>
                  How Might We seed
                </p>
                <p className="text-xs text-white/55 leading-relaxed italic">
                  {WALLS[selected].hmw}
                </p>
              </div>
              <button
                onClick={reset}
                className="text-xs text-white/50 hover:text-white/55 transition-colors font-mono tracking-widest uppercase"
              >
                ← Back to all walls
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
