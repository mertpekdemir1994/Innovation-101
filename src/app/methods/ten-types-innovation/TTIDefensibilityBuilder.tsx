'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const AMBER = 'rgba(245,158,11,'

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

type TypeId =
  | 'profit-model' | 'network' | 'structure' | 'process'
  | 'product-performance' | 'product-system'
  | 'service' | 'channel' | 'brand' | 'customer-engagement'

const TILES: { id: TypeId; cat: 'config' | 'offering' | 'exp'; x: number; lines: string[] }[] = [
  { id: 'profit-model',        cat: 'config',   x: 16,  lines: ['PROFIT', 'MODEL'] },
  { id: 'network',             cat: 'config',   x: 80,  lines: ['NETWORK'] },
  { id: 'structure',           cat: 'config',   x: 144, lines: ['STRUCTURE'] },
  { id: 'process',             cat: 'config',   x: 208, lines: ['PROCESS'] },
  { id: 'product-performance', cat: 'offering', x: 288, lines: ['PRODUCT', 'PERF.'] },
  { id: 'product-system',      cat: 'offering', x: 352, lines: ['PRODUCT', 'SYSTEM'] },
  { id: 'service',             cat: 'exp',      x: 432, lines: ['SERVICE'] },
  { id: 'channel',             cat: 'exp',      x: 496, lines: ['CHANNEL'] },
  { id: 'brand',               cat: 'exp',      x: 560, lines: ['BRAND'] },
  { id: 'customer-engagement', cat: 'exp',      x: 624, lines: ['CUSTOMER', 'ENGAGE.'] },
]

function getSelectedCats(sel: Set<TypeId>) {
  const cats = new Set<string>()
  sel.forEach(id => {
    const t = TILES.find(t => t.id === id)
    if (t) cats.add(t.cat)
  })
  return cats
}

type ScaleState = 'none' | 'weak' | 'building' | 'strong' | 'bonus'

interface MeterInfo {
  state: ScaleState
  pct: number
  fillColor: string
  stateLabel: string
  stateColor: string
  description: string
  srText: string
}

function getMeter(count: number, catCount: number, allCats: boolean): MeterInfo {
  if (count === 0) return {
    state: 'none', pct: 0,
    fillColor: 'transparent',
    stateLabel: '',
    stateColor: 'rgba(255,255,255,0.28)',
    description: 'Select types below to build your company\'s innovation profile.',
    srText: '0 types selected. Select types to begin.',
  }
  if (count === 1) return {
    state: 'weak', pct: 10,
    fillColor: `${AMBER}0.80)`,
    stateLabel: 'EASILY COPIED',
    stateColor: `${AMBER}0.90)`,
    description: 'A single advantage a competitor can match within a season. Select more types to build a combination.',
    srText: '1 type selected. Easily copied: a single advantage.',
  }
  if (count <= 4) {
    const pct = 18 + (count - 2) * 14  // 2→18%, 3→32%, 4→46%
    return {
      state: 'building', pct,
      fillColor: 'rgba(175,100,60,0.80)',
      stateLabel: `BUILDING: ${count} TYPES / ${catCount} CATEGOR${catCount === 1 ? 'Y' : 'IES'}`,
      stateColor: 'rgba(200,120,50,0.92)',
      description: `Copying this now means matching ${count} distinct innovations at once, harder than a single feature, but still within reach for a well-resourced competitor. Add types from more categories to build a system.`,
      srText: `${count} types selected across ${catCount} categories. Building, harder to copy but not yet a defensive system.`,
    }
  }
  if (!allCats) {
    const pct = Math.min(60 + (count - 5) * 7, 82)
    return {
      state: 'strong', pct,
      fillColor: `${PLUM}0.82)`,
      stateLabel: `STRONGLY DEFENSIBLE: ${count} TYPES`,
      stateColor: `${PLUM}0.95)`,
      description: `To copy this, a competitor must replicate ${count} distinct innovations simultaneously, a genuinely hard target. Add at least one type from each of the three categories to make this the hardest possible position to copy.`,
      srText: `${count} types selected across ${catCount} categories. Strongly defensible: an interlocking system.`,
    }
  }
  const pct = Math.min(88 + (count - 5) * 2, 98)
  return {
    state: 'bonus', pct,
    fillColor: `${PLUM}1)`,
    stateLabel: `HARDEST TO COPY: ${count} TYPES / ALL 3 CATEGORIES`,
    stateColor: `${PLUM}1)`,
    description: `Breadth across Configuration, Offering, and Experience makes this system hardest of all to replicate. A competitor must rebuild innovations in every dimension of the business model simultaneously: internal operations, the offering itself, and the customer-facing experience.`,
    srText: `${count} types selected across all three categories. Hardest to copy, the strongest possible combined position.`,
  }
}

export default function TTIDefensibilityBuilder() {
  const [selected, setSelected] = useState<Set<TypeId>>(new Set())
  const [hovered,  setHovered]  = useState<TypeId | null>(null)
  const prefersReduced = useReducedMotion()

  function toggle(id: TypeId) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  function handleKey(e: React.KeyboardEvent, id: TypeId) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(id) }
  }

  const cats    = getSelectedCats(selected)
  const count   = selected.size
  const allCats = cats.size >= 3
  const meter   = getMeter(count, cats.size, allCats)

  const SVG_H = 170

  const trMeter = prefersReduced
    ? ({ duration: 0 } as const)
    : ({ duration: 0.45, ease: [0.22, 1, 0.36, 1] } as const)

  function tileFill(id: TypeId) {
    if (selected.has(id)) return `${PLUM}0.28)`
    if (id === hovered)   return `${PLUM}0.16)`
    if (count > 0)        return `${PLUM}0.04)`
    return `${PLUM}0.18)`
  }
  function tileStroke(id: TypeId) {
    if (selected.has(id)) return `${PLUM}0.88)`
    if (id === hovered)   return `${PLUM}0.58)`
    if (count > 0)        return `${PLUM}0.16)`
    return `${PLUM}0.65)`
  }
  function tileTextFill(id: TypeId) {
    if (selected.has(id)) return `${PLUM}1.0)`
    if (id === hovered)   return `${PLUM}0.88)`
    if (count > 0)        return `${PLUM}0.24)`
    return `${PLUM}0.90)`
  }

  return (
    <div className="w-full">
      {/* Defensibility scale */}
      <div style={{ marginBottom: '28px' }}>
        {/* State row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <motion.span
            style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', fontWeight: 600 }}
            animate={{ color: meter.stateColor }}
            transition={trMeter}
          >
            {meter.stateLabel || 'SELECT TYPES TO BUILD A COMPANY'}
          </motion.span>

          {/* Category coverage indicators */}
          <div style={{ display: 'flex', gap: '14px' }}>
            {(['config', 'offering', 'exp'] as const).map(cat => {
              const has = cats.has(cat)
              const label = cat === 'config' ? 'CONFIGURATION' : cat === 'offering' ? 'OFFERING' : 'EXPERIENCE'
              return (
                <span key={cat} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '6.5px',
                  letterSpacing: '0.08em',
                  color: has ? `${PLUM}0.85)` : 'rgba(255,255,255,0.22)',
                  transition: prefersReduced ? 'none' : 'color 0.25s',
                }}>
                  {label} {has ? '✓' : '·'}
                </span>
              )
            })}
          </div>
        </div>

        {/* Meter track */}
        <div
          style={{ position: 'relative', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={meter.pct}
          aria-valuetext={meter.srText}
        >
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, height: '100%', borderRadius: '6px' }}
            animate={{ width: `${meter.pct}%`, background: meter.fillColor }}
            transition={trMeter}
          />
          {/* Threshold markers */}
          <div style={{ position: 'absolute', top: 0, left: '10%',  width: '1px', height: '100%', background: 'rgba(255,255,255,0.18)' }} />
          <div style={{ position: 'absolute', top: 0, left: '60%', width: '1px', height: '100%', background: 'rgba(255,255,255,0.18)' }} />
        </div>

        {/* Scale endpoint labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6px', letterSpacing: '0.08em', color: `${AMBER}0.50)` }}>
            EASILY COPIED
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6px', letterSpacing: '0.08em', color: `${PLUM}0.55)` }}>
            GENUINELY DEFENSIBLE
          </span>
        </div>

        {/* State description */}
        <motion.p
          style={{ marginTop: '12px', fontSize: '14px', lineHeight: 1.65 }}
          animate={{ color: count === 0 ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.62)' }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.25 }}
        >
          {meter.description}
        </motion.p>

        {/* Bonus callout */}
        {meter.state === 'bonus' && (
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={trMeter}
            style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: `${PLUM}0.14)`,
              border: `1px solid ${PLUM}0.40)`,
              borderRadius: '6px',
            }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.12em', color: `${PLUM}0.88)`, fontWeight: 600 }}>
              WELL-ROUNDED: BREADTH ACROSS ALL THREE CATEGORIES
            </p>
          </motion.div>
        )}
      </div>

      {/* SVG tile board */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ overflow: 'visible' }}
        role="group"
        aria-label={`Defensibility builder, ${count} of 10 types selected. ${meter.srText}`}
      >
        <defs>
          <filter id="tti-def-glow" x="-30%" y="-30%" width="160%" height="160%">
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
            fill={`${PLUM}0.06)`}
            stroke={cats.has(cat.id) ? `${PLUM}0.32)` : `${PLUM}0.16)`}
            strokeWidth={cats.has(cat.id) ? 1.5 : 1}
            style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
          />
        ))}

        {/* Category labels */}
        {CATEGORIES.map((cat) => (
          <g key={`lbl-${cat.id}`}>
            <text
              x={cat.cx} y={CAT_LABEL_Y}
              textAnchor="middle"
              fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={cats.has(cat.id) ? `${PLUM}0.88)` : `${PLUM}0.50)`}
              style={{ userSelect: 'none', transition: 'fill 0.25s' }}
            >
              {cat.label}
            </text>
            <line
              x1={cat.x1 - 2} y1={CAT_LINE_Y} x2={cat.x2 + 2} y2={CAT_LINE_Y}
              stroke={`${PLUM}0.22)`} strokeWidth={1}
            />
          </g>
        ))}

        {/* Tiles */}
        {TILES.map((tile) => {
          const cx = tile.x + TILE_W / 2
          const isSel = selected.has(tile.id)
          return (
            <g
              key={tile.id}
              style={{ cursor: 'pointer', outline: 'none' }}
              onClick={() => toggle(tile.id)}
              onMouseEnter={() => setHovered(tile.id)}
              onMouseLeave={() => setHovered(null)}
              role="checkbox"
              tabIndex={0}
              aria-checked={isSel}
              aria-label={`${tile.lines.join(' ')}, ${isSel ? 'selected, click to remove' : 'click to add to combination'}`}
              onKeyDown={(e) => handleKey(e, tile.id)}
            >
              <motion.rect
                x={tile.x} y={TILE_Y}
                width={TILE_W} height={TILE_H}
                rx={TILE_R}
                strokeWidth={isSel ? 2 : 1.2}
                filter={isSel ? 'url(#tti-def-glow)' : undefined}
                animate={{ fill: tileFill(tile.id), stroke: tileStroke(tile.id) }}
                transition={{ duration: prefersReduced ? 0 : 0.20 }}
              />

              {tile.lines.length === 1 ? (
                <motion.text
                  x={cx} y={TILE_CY}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: tileTextFill(tile.id) }}
                  transition={{ duration: prefersReduced ? 0 : 0.20 }}
                >
                  {tile.lines[0]}
                </motion.text>
              ) : (
                <>
                  <motion.text
                    x={cx} y={TILE_CY - 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                    animate={{ fill: tileTextFill(tile.id) }}
                    transition={{ duration: prefersReduced ? 0 : 0.20 }}
                  >
                    {tile.lines[0]}
                  </motion.text>
                  <motion.text
                    x={cx} y={TILE_CY + 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                    animate={{ fill: tileTextFill(tile.id) }}
                    transition={{ duration: prefersReduced ? 0 : 0.20 }}
                  >
                    {tile.lines[1]}
                  </motion.text>
                </>
              )}

              {isSel && (
                <text
                  x={tile.x + TILE_W - 8} y={TILE_Y + 13}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="8" fontFamily="var(--font-mono)"
                  fill={`${PLUM}0.92)`}
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                >
                  ✓
                </text>
              )}
            </g>
          )
        })}

        {/* Idle hint */}
        {count === 0 && (
          <text
            x={SVG_W / 2} y={SVG_H - 4}
            textAnchor="middle"
            fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.22)"
            style={{ userSelect: 'none' }}
          >
            CLICK TILES TO BUILD YOUR COMBINATION, WATCH THE SCALE RESPOND
          </text>
        )}
      </svg>
    </div>
  )
}
