'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import React from 'react'

const SAGE = 'rgba(61,107,90,'

// Larger field so every element is comfortably legible
const SVG_W = 720
const SVG_H = 338
const FX = 78
const FY = 26
const FW = 580
const FH = 278
const F_R = FX + FW  // 658
const F_B = FY + FH  // 304

type CompId = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
type AxisSet = 'conventional' | 'reframed'

type CompData = {
  id: CompId
  label: string
  sub: string
  positioning: string
  conventional: { cx: number; cy: number }
  reframed:     { cx: number; cy: number }
}

// Positions scaled from original (FX 66→78, FY 20→26, FW 556→580, FH 208→278).
// Conventional = upper-right cluster; reframed = all shift left (price y unchanged).
const COMPS: CompData[] = [
  {
    id: 'a', label: 'INCUMBENT A', sub: 'heritage brand',
    positioning: 'Positions on category heritage and expertise. High price, expert-oriented voice and packaging. Sets the conventional benchmark other players compare themselves to.',
    conventional: { cx: 529, cy: 66 }, reframed: { cx: 103, cy: 66 },
  },
  {
    id: 'b', label: 'INCUMBENT B', sub: 'premium challenger',
    positioning: 'Premium challenger competing on quality credentials. Similar axis to the market leader (expert voice, high prestige) differentiated primarily on specific quality claims.',
    conventional: { cx: 580, cy: 90 }, reframed: { cx: 116, cy: 90 },
  },
  {
    id: 'c', label: 'INCUMBENT C', sub: 'quality specialist',
    positioning: 'Specialist positioning within the high-prestige cluster. Competes on niche expertise within the category. Expert-oriented, high price, intimidating to non-experts.',
    conventional: { cx: 484, cy: 77 }, reframed: { cx: 127, cy: 77 },
  },
  {
    id: 'd', label: 'INCUMBENT D', sub: 'prestige niche',
    positioning: 'Ultra-high price, ultra-high prestige positioning. Small market share but strong margin. Defines the category\'s upper ceiling.',
    conventional: { cx: 554, cy: 125 }, reframed: { cx: 148, cy: 125 },
  },
  {
    id: 'e', label: 'LEADER E', sub: 'category leader',
    positioning: 'The category leader. Market-share dominant. Sets industry conventions. Everyone else defines their position relative to this player. Expert-forward, high price.',
    conventional: { cx: 612, cy: 53 }, reframed: { cx: 93, cy: 53 },
  },
  {
    id: 'f', label: 'MID-MARKET F', sub: 'accessible quality',
    positioning: 'Mid-market positioning. More accessible price, but still uses expert category conventions in voice and design. Bridges the entry level and the premium cluster.',
    conventional: { cx: 426, cy: 152 }, reframed: { cx: 178, cy: 152 },
  },
  {
    id: 'g', label: 'BUDGET G', sub: 'entry level',
    positioning: 'Entry-level price point. Cheapest in the category. Still uses category conventions (prestige signals, expertise language) but at lower quality and price.',
    conventional: { cx: 312, cy: 202 }, reframed: { cx: 207, cy: 202 },
  },
  {
    id: 'h', label: 'BUDGET H', sub: 'value segment',
    positioning: 'Value segment player. Competes on price and accessibility claims, but retains the category\'s expert-oriented aesthetic and language conventions.',
    conventional: { cx: 253, cy: 173 }, reframed: { cx: 192, cy: 173 },
  },
]

// Crowded-zone ellipses (scaled + ry clamped so label stays inside field)
const CROWD = {
  conventional: { cx: 512, cy: 108, rx: 142, ry: 86 },
  reframed:     { cx: 153, cy: 130, rx: 96,  ry: 98 },
}

const AXIS_LABELS = {
  conventional: {
    xLeft: 'LOW', xRight: 'HIGH', xAxis: 'PRICE →',
    yBottom: 'SIMPLE', yTop: 'EXPERT', yAxis: '↑ PRESTIGE LEVEL',
  },
  reframed: {
    xLeft: 'INTIMIDATING', xRight: 'APPROACHABLE', xAxis: 'APPROACHABILITY →',
    yBottom: 'LOW', yTop: 'HIGH', yAxis: '↑ PRICE',
  },
}

const DOT_R  = 10   // visual dot radius
const WS_GAP = 20   // min clearance from nearest dot edge to white-space border

// Derive the white-space rectangle from the actual dot positions so it always
// occupies the genuinely empty region, regardless of the current axis configuration.
function computeWS(dots: { cx: number; cy: number }[]): { x: number; y: number; w: number; h: number } {
  const xs   = dots.map(d => d.cx)
  const avgX = xs.reduce((s, v) => s + v, 0) / xs.length
  const gap  = DOT_R + WS_GAP

  if (avgX > FX + FW * 0.5) {
    // Cluster on right → white space is the lower-left quadrant.
    // Right edge: left of the leftmost dot; top edge: bottom half of the field.
    const wsRight = Math.min(...xs) - gap
    const wsTop   = FY + FH * 0.50
    return { x: FX + 6, y: wsTop, w: wsRight - FX - 6, h: F_B - wsTop - 6 }
  } else {
    // Cluster on left → white space is the entire right side.
    const wsLeft = Math.max(...xs) + gap
    return { x: wsLeft, y: FY + 6, w: F_R - wsLeft - 6, h: FH - 12 }
  }
}

type PanelState =
  | { type: 'idle' }
  | { type: 'comp'; id: CompId }
  | { type: 'crowd' }
  | { type: 'whitespace' }

export default function CLAInteractive() {
  const [axisSet, setAxisSet] = useState<AxisSet>('conventional')
  const [panel, setPanel]     = useState<PanelState>({ type: 'idle' })
  const [hovered, setHovered] = useState<CompId | null>(null)
  const [liveText, setLiveText] = useState('')
  const prefersReduced = useReducedMotion()

  const isReframed = axisSet === 'reframed'
  const labels = AXIS_LABELS[axisSet]
  const crowd  = CROWD[axisSet]
  const currentDots = COMPS.map(c => isReframed ? c.reframed : c.conventional)
  const ws = computeWS(currentDots)

  const motT  = prefersReduced ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }
  const fadeT = prefersReduced ? { duration: 0 } : { duration: 0.20 }

  function handleReframe() {
    setAxisSet(a => {
      const next = a === 'conventional' ? 'reframed' : 'conventional'
      setLiveText(next === 'reframed'
        ? 'Axes reframed to approachability by price. Competitors moved left. White space is now the right side.'
        : 'Reset to conventional axes: price by prestige. Competitors cluster upper-right. White space is now lower-left.')
      return next
    })
    setPanel({ type: 'idle' })
  }

  function selectComp(id: CompId) {
    setPanel(prev => {
      const isDeselect = prev.type === 'comp' && prev.id === id
      if (!isDeselect) {
        const c = COMPS.find(x => x.id === id)!
        setLiveText(`Selected: ${c.label}, ${c.sub}. ${c.positioning}`)
      } else {
        setLiveText('Competitor deselected.')
      }
      return isDeselect ? { type: 'idle' } : { type: 'comp', id }
    })
  }

  function toggleWS() {
    setPanel(p => {
      const next = p.type === 'whitespace' ? { type: 'idle' as const } : { type: 'whitespace' as const }
      setLiveText(next.type === 'whitespace'
        ? 'White space selected: genuinely empty region with no competitors. Click again to close.'
        : 'White space panel closed.')
      return next
    })
  }

  // Crowd label inside ellipse, clamped below FY
  const crowdLabelY = Math.max(FY + 14, crowd.cy - crowd.ry + 20)

  return (
    <div className="w-full space-y-6">
      {/* Screen-reader live region - announces state changes (reframe, selection, WS) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
      >
        {liveText}
      </div>

      {/* Reframe button */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={handleReframe}
          className="px-5 py-2 rounded-full text-xs font-semibold transition-all"
          style={{
            background: isReframed ? `${SAGE}0.12)` : 'transparent',
            border: `1px solid ${isReframed ? `${SAGE}0.40)` : 'rgba(255,255,255,0.20)'}`,
            color: isReframed ? `${SAGE}1)` : 'rgba(255,255,255,0.65)',
          }}
        >
          {isReframed ? '← Reset to conventional axes' : '⇄ Reframe axes'}
        </button>
        <span className="text-xs font-mono tracking-widest"
          style={{ color: 'rgba(255,255,255,0.32)' }}>
          {isReframed ? 'REFRAMED: APPROACHABILITY × PRICE' : 'CONVENTIONAL: PRICE × PRESTIGE'}
        </span>
      </div>

      {/* SVG field */}
      <div className="w-full select-none"
        role="group"
        aria-label="Interactive competitive positioning field. Click a competitor or the white space to explore. Use the Reframe button to switch axes."
      >
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ overflow: 'visible', cursor: 'default' }}
        >
          <defs>
            <filter id="cla-int-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="cla-int-dot-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="cla-int-ws-glow" x="-20%" y="-25%" width="140%" height="150%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="cla-int-crowd-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={`${SAGE}0.15)`} />
              <stop offset="100%" stopColor={`${SAGE}0.00)`} />
            </radialGradient>
            <radialGradient id="cla-int-ws-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={`${SAGE}0.26)`} />
              <stop offset="100%" stopColor={`${SAGE}0.06)`} />
            </radialGradient>
          </defs>

          {/* Grid */}
          {[0.25, 0.50, 0.75].map((t) => (
            <React.Fragment key={t}>
              <line x1={FX + t * FW} y1={FY} x2={FX + t * FW} y2={F_B}
                stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
              <line x1={FX} y1={FY + (1 - t) * FH} x2={F_R} y2={FY + (1 - t) * FH}
                stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            </React.Fragment>
          ))}

          {/* X axis */}
          <line x1={FX} y1={F_B} x2={F_R} y2={F_B}
            stroke="rgba(255,255,255,0.48)" strokeWidth={2} />
          <path d={`M ${F_R - 7} ${F_B - 4} L ${F_R + 2} ${F_B} L ${F_R - 7} ${F_B + 4}`}
            stroke="rgba(255,255,255,0.48)" strokeWidth={2} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />

          <AnimatePresence mode="wait">
            <motion.g key={`x-${axisSet}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={fadeT}>
              <text x={FX + 6}         y={F_B + 15} fontSize="8"   fontFamily="var(--font-mono)"
                letterSpacing="0.10em" fill="rgba(255,255,255,0.40)" style={{ userSelect: 'none' }}>
                {labels.xLeft}</text>
              <text x={F_R - 6}        y={F_B + 15} fontSize="8"   fontFamily="var(--font-mono)"
                letterSpacing="0.10em" fill="rgba(255,255,255,0.40)" textAnchor="end"
                style={{ userSelect: 'none' }}>{labels.xRight}</text>
              <text x={(FX + F_R) / 2} y={F_B + 25} fontSize="8.5" fontFamily="var(--font-mono)"
                letterSpacing="0.14em" fill="rgba(255,255,255,0.48)" textAnchor="middle"
                style={{ userSelect: 'none' }}>{labels.xAxis}</text>
            </motion.g>
          </AnimatePresence>

          {/* Y axis */}
          <line x1={FX} y1={F_B} x2={FX} y2={FY}
            stroke="rgba(255,255,255,0.48)" strokeWidth={2} />
          <path d={`M ${FX - 4} ${FY + 8} L ${FX} ${FY} L ${FX + 4} ${FY + 8}`}
            stroke="rgba(255,255,255,0.48)" strokeWidth={2} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />

          <AnimatePresence mode="wait">
            <motion.g key={`y-${axisSet}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={fadeT}>
              <text
                transform={`rotate(-90, ${FX - 28}, ${(FY + F_B) / 2})`}
                x={FX - 28} y={(FY + F_B) / 2}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
                fill="rgba(255,255,255,0.48)"
                style={{ userSelect: 'none' }}>{labels.yAxis}</text>
              <text x={FX - 10} y={F_B - 6} textAnchor="end" fontSize="8"
                fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.34)"
                style={{ userSelect: 'none' }}>{labels.yBottom}</text>
              <text x={FX - 10} y={FY + 12} textAnchor="end" fontSize="8"
                fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.34)"
                style={{ userSelect: 'none' }}>{labels.yTop}</text>
            </motion.g>
          </AnimatePresence>

          {/* Crowded zone ellipse (animates on reframe) */}
          <motion.ellipse
            cx={crowd.cx} cy={crowd.cy} rx={crowd.rx} ry={crowd.ry}
            fill="url(#cla-int-crowd-grad)"
            stroke={`${SAGE}0.28)`} strokeWidth={1.5} strokeDasharray="5 3"
            animate={{ cx: crowd.cx, cy: crowd.cy, rx: crowd.rx, ry: crowd.ry }}
            transition={motT}
            onClick={() => setPanel(p => p.type === 'crowd' ? { type: 'idle' } : { type: 'crowd' })}
            style={{ cursor: 'pointer' }}
          />
          <motion.text
            textAnchor="middle"
            fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill={`${SAGE}0.62)`}
            animate={{ x: crowd.cx, y: crowdLabelY }}
            transition={motT}
            style={{ userSelect: 'none', cursor: 'pointer' } as React.CSSProperties}
            onClick={() => setPanel(p => p.type === 'crowd' ? { type: 'idle' } : { type: 'crowd' })}
          >CROWDED ZONE</motion.text>

          {/* White space - ONE group. Position is computed from current dot positions so
              the highlight, label, and hit-target always sit on the actual empty region.
              initial matches animate to prevent a fly-in on mount. */}
          <motion.g
            initial={{ x: ws.x, y: ws.y }}
            animate={{ x: ws.x, y: ws.y }}
            transition={motT}
          >
            {/* Visual background */}
            <motion.rect
              x={0} y={0}
              initial={{ width: ws.w, height: ws.h }}
              animate={{ width: ws.w, height: ws.h }}
              transition={motT}
              rx={8}
              fill="url(#cla-int-ws-grad)"
              stroke={`${SAGE}${panel.type === 'whitespace' ? '0.85' : '0.55'})`}
              strokeWidth={panel.type === 'whitespace' ? 2 : 1.5}
              strokeDasharray="6 3"
              filter="url(#cla-int-ws-glow)"
              style={{ pointerEvents: 'none' }}
            />
            {/* Labels - centred inside the box */}
            <motion.text
              textAnchor="middle" dominantBaseline="middle"
              fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.16em"
              fill={`${SAGE}${panel.type === 'whitespace' ? '1.0' : '0.88'})`}
              initial={{ x: ws.w / 2, y: ws.h / 2 - 8 }}
              animate={{ x: ws.w / 2, y: ws.h / 2 - 8 }}
              transition={motT}
              style={{ userSelect: 'none', pointerEvents: 'none' } as React.CSSProperties}
            >WHITE SPACE</motion.text>
            <motion.text
              textAnchor="middle" dominantBaseline="middle"
              fontSize="7.5" fontFamily="var(--font-mono)"
              fill={`${SAGE}0.55)`}
              initial={{ x: ws.w / 2, y: ws.h / 2 + 10 }}
              animate={{ x: ws.w / 2, y: ws.h / 2 + 10 }}
              transition={motT}
              style={{ userSelect: 'none', pointerEvents: 'none' } as React.CSSProperties}
            >click to explore</motion.text>
            {/* Full-area transparent hit-target - single surface for click and keyboard.
                Sits on top so it captures all events over the entire white-space region. */}
            <motion.rect
              x={0} y={0}
              initial={{ width: ws.w, height: ws.h }}
              animate={{ width: ws.w, height: ws.h }}
              transition={motT}
              fill="transparent"
              rx={8}
              onClick={toggleWS}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleWS() } }}
              tabIndex={0}
              role="button"
              aria-pressed={panel.type === 'whitespace'}
              aria-label="White space, click to explore the un-served opportunity"
              style={{ cursor: 'pointer', outline: 'none' }}
            />
          </motion.g>

          {/* Competitors - 10px visual radius, 24px hit target, hover feedback */}
          {COMPS.map((c) => {
            const pos   = isReframed ? c.reframed : c.conventional
            const isAct = panel.type === 'comp' && panel.id === c.id
            const isHov = hovered === c.id && !isAct
            return (
              <motion.g key={c.id}>
                {/* Visual dot */}
                <motion.circle
                  cx={c.conventional.cx} cy={c.conventional.cy}
                  r={isAct ? 14 : isHov ? 13 : 10}
                  fill={`${SAGE}${isAct ? '0.30' : isHov ? '0.18' : '0.14'})`}
                  stroke={`${SAGE}${isAct ? '1.00' : isHov ? '0.88' : '0.76'})`}
                  strokeWidth={isAct ? 2.5 : isHov ? 2 : 1.8}
                  filter={isAct ? 'url(#cla-int-glow)' : 'url(#cla-int-dot-glow)'}
                  animate={{ cx: pos.cx, cy: pos.cy }}
                  transition={motT}
                  style={{ pointerEvents: 'none' }}
                />
                {/* 24px transparent hit area - easy to click / tap */}
                <motion.circle
                  cx={c.conventional.cx} cy={c.conventional.cy}
                  r={24}
                  fill="transparent"
                  animate={{ cx: pos.cx, cy: pos.cy }}
                  transition={motT}
                  onClick={() => selectComp(c.id)}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectComp(c.id) } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${c.label}: ${c.sub}`}
                  aria-pressed={isAct}
                  style={{ cursor: 'pointer', outline: 'none' }}
                />
              </motion.g>
            )
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {panel.type === 'idle' && (
          <motion.div key="idle"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 text-sm"
            style={{ borderColor: 'var(--color-neutral-100)', color: 'var(--color-neutral-500)' }}
          >
            {isReframed
              ? 'Axes reframed: the crowded cluster has moved to the left (intimidating). The right side (approachable, accessible) is now the white space. Click the white space to explore the opportunity.'
              : 'Click a competitor to see its positioning. Click the white space to explore the opportunity. Use the Reframe button to see how the map changes on different axes.'}
          </motion.div>
        )}

        {panel.type === 'comp' && (() => {
          const c = COMPS.find(x => x.id === panel.id)!
          return (
            <motion.div key={`comp-${panel.id}`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="rounded-lg border p-5 space-y-3"
              style={{ borderColor: `${SAGE}0.22)`, background: `${SAGE}0.04)` }}
            >
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${SAGE}0.90)` }}>{c.label}</p>
                <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: `${SAGE}0.10)`, color: `${SAGE}0.72)`, border: `1px solid ${SAGE}0.22)` }}>
                  {c.sub}
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">{c.positioning}</p>
              <p className="text-xs text-neutral-500 italic">
                {isReframed
                  ? 'On the reframed axis: positioned at the intimidating end. Approachability is not how this player competes.'
                  : 'On the conventional axis: competes where most of the market competes.'}
              </p>
            </motion.div>
          )
        })()}

        {panel.type === 'crowd' && (
          <motion.div key="crowd"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 space-y-3"
            style={{ borderColor: `${SAGE}0.18)`, background: `${SAGE}0.03)` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: `${SAGE}0.80)` }}>The crowded zone</p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              This is where the entire market competes. Every player has converged on the same two or three
              dimensions, driving toward feature parity and margin erosion. Entering here means choosing a
              position on the conventional axes, and then fighting, at great expense, for incremental
              differentiation in a space that is already defined.
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              The crowded zone is not a failure of the competitors; it is the result of each company sensibly
              watching its nearest rivals and matching what works. The result is a field of increasingly
              similar offerings. The map makes the pattern visible, and seeing it clearly is the first
              step to escaping it.
            </p>
            {!isReframed && (
              <p className="text-xs text-neutral-500 italic">
                Try reframing the axes to see how the crowded zone shifts on different dimensions.
              </p>
            )}
          </motion.div>
        )}

        {panel.type === 'whitespace' && (
          <motion.div key="whitespace"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 space-y-4"
            style={{ borderColor: `${SAGE}0.28)`, background: `${SAGE}0.05)` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: `${SAGE}0.90)` }}>
              {isReframed ? 'The white space on the reframed axis' : 'The white space'}
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {isReframed
                ? 'After reframing to approachability vs price, the entire right side of the field is empty. No competitor has positioned on being genuinely approachable and accessible: every player, from the budget entry-level to the ultra-premium leader, uses the expert-oriented category conventions. The gap between where competitors actually sit and where un-served customers might want them is now visible.'
                : 'This region has no competitors. On the conventional axes, the lower-left represents a position that combines accessible price with simplified, low-barrier positioning, something no current player occupies.'}
            </p>
            <div className="border-t pt-4 space-y-2" style={{ borderColor: `${SAGE}0.15)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: `${SAGE}0.70)` }}>The critical question</p>
              <p className="text-sm font-semibold text-neutral-800 leading-relaxed">
                Is this space empty because it is an un-served opportunity, or because no viable business can survive here?
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Both exist. A white space on a competitive map is necessary but not sufficient. It tells you
                no competitor is here; it does not tell you whether customers would come if you were.
                The judgment requires customer research: who lives in this space, what they need, and whether
                they would choose a product designed for them over the crowded alternatives.
              </p>
              <p className="text-sm text-neutral-600 italic">
                The map finds the gap. Interviews, observation, and concept testing determine whether the gap is real.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
