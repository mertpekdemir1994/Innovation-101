'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'

type Zone = 'core' | 'adjacent' | 'transformational'

// Grid geometry (matches AMEstablishing)
const GX = 80, GY = 40, GW = 400, GH = 340
const GR = GX + GW, GB = GY + GH
const MX = GX + GW / 2, MY = GY + GH / 2

const ZONES: { id: Zone; label: string; cx: number; cy: number; rx: number; ry: number }[] = [
  { id: 'core',             label: 'CORE',            cx: 165, cy: 308, rx: 82, ry: 64 },
  { id: 'adjacent',         label: 'ADJACENT',         cx: 280, cy: 210, rx: 102, ry: 74 },
  { id: 'transformational', label: 'TRANSFORMATIONAL', cx: 394, cy: 112, rx: 82, ry: 62 },
]

const ZONE_DETAIL: Record<Zone, { heading: string; allocation: string; body: string }> = {
  core: {
    heading: 'Core',
    allocation: '~70% of innovation resources',
    body: 'Optimizing what already exists for the customers you already have. Incremental improvements, efficiency gains, line extensions. The safest, most measurable bets, and the ones that fund everything else. Core work is essential and must not be neglected, but it is also where organizations over-concentrate, because its returns are near-term and easy to justify.',
  },
  adjacent: {
    heading: 'Adjacent',
    allocation: '~20% of innovation resources',
    body: 'Extending a proven strength into nearby territory (a new customer segment, a related product, an adjacent market). Adjacent bets carry more uncertainty than core but build on something you already do well, which makes the risk manageable. This is where most real growth comes from.',
  },
  transformational: {
    heading: 'Transformational',
    allocation: '~10% of innovation resources',
    body: "Creating something genuinely new for a market that does not yet exist. The highest-risk, highest-uncertainty bets, most of which are expected to fail. But the rare transformational success can create an entirely new core business and define the organization's next decade. The discipline is protecting this zone's small slice of investment from being raided to feed the safe core.",
  },
}

function zoneState(id: Zone, active: Zone | null, hovered: Zone | null) {
  if (active === null) return hovered === id ? 'hovered' : 'default'
  if (id === active)   return 'active'
  return 'dim'
}

function zoneFill(st: string)        { return st === 'active' ? `${PLUM}0.28)` : st === 'hovered' ? `${PLUM}0.18)` : st === 'dim' ? `${PLUM}0.04)` : `${PLUM}0.12)` }
function zoneStroke(st: string)      { return st === 'active' ? `${PLUM}0.90)` : st === 'hovered' ? `${PLUM}0.65)` : st === 'dim' ? `${PLUM}0.16)` : `${PLUM}0.55)` }
function zoneLabelFill(st: string)   { return st === 'active' ? `${PLUM}0.95)` : st === 'hovered' ? `${PLUM}0.75)` : st === 'dim' ? `${PLUM}0.18)` : `${PLUM}0.80)` }

export default function AMInteractive() {
  const [activeZone,  setActiveZone]  = useState<Zone | null>(null)
  const [hoveredZone, setHoveredZone] = useState<Zone | null>(null)
  const prefersReduced = useReducedMotion()

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
      {/* ── SVG illustration ── */}
      <div className="w-full md:w-[54%] shrink-0">
        <svg
          viewBox="0 0 560 450"
          width="100%"
          style={{ overflow: 'visible' }}
          role="group"
          aria-label="Ambition Matrix, click a zone to learn about that type of bet"
        >
          <defs>
            <filter id="am-int-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="am-int-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B4A77" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#6B4A77" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Grid */}
          <rect x={GX} y={GY} width={GW} height={GH} fill="url(#am-int-grad)" stroke={`${PLUM}0.25)`} strokeWidth={1} rx={2} />
          <line x1={MX} y1={GY} x2={MX} y2={GB} stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="4 5" />
          <line x1={GX} y1={MY} x2={GR} y2={MY} stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="4 5" />

          {/* Axis labels */}
          <text x={GX} y={GB + 22} textAnchor="start" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em" fill="rgba(255,255,255,0.22)" style={{ userSelect: 'none' }}>EXISTING</text>
          <text x={GR} y={GB + 22} textAnchor="end"   fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em" fill="rgba(255,255,255,0.22)" style={{ userSelect: 'none' }}>NEW</text>
          <text x={MX} y={GB + 40} textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill="rgba(255,255,255,0.15)" style={{ userSelect: 'none' }}>MARKET / CUSTOMER →</text>
          <text x={GX - 8} y={GB}      textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em" fill="rgba(255,255,255,0.22)" style={{ userSelect: 'none' }}>EXISTING</text>
          <text x={GX - 8} y={GY + 6} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em" fill="rgba(255,255,255,0.22)" style={{ userSelect: 'none' }}>NEW</text>
          <text transform={`translate(28, ${MY}) rotate(-90)`} textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill="rgba(255,255,255,0.15)" style={{ userSelect: 'none' }}>↑ OFFERING / PRODUCT</text>

          {/* Clickable zone nodes */}
          {ZONES.map(({ id, label, cx, cy, rx, ry }) => {
            const st = zoneState(id, activeZone, hoveredZone)
            return (
              <g
                key={id}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveZone(activeZone === id ? null : id)}
                onMouseEnter={() => setHoveredZone(id)}
                onMouseLeave={() => setHoveredZone(null)}
                role="button"
                tabIndex={0}
                aria-label={`Learn about the ${label} zone`}
                aria-pressed={activeZone === id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveZone(activeZone === id ? null : id)
                  }
                }}
              >
                <motion.ellipse
                  cx={cx} cy={cy} rx={rx} ry={ry}
                  strokeWidth={st === 'active' ? 2 : 1.5}
                  filter={st === 'active' ? 'url(#am-int-glow)' : undefined}
                  animate={{ fill: zoneFill(st), stroke: zoneStroke(st) }}
                  transition={{ duration: 0.22 }}
                />
                <motion.text
                  x={cx} y={cy + 4}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={id === 'transformational' ? '6.5' : '8'}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.12em"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: zoneLabelFill(st) }}
                  transition={{ duration: 0.22 }}
                >{label}</motion.text>
              </g>
            )
          })}
        </svg>

        {!activeZone && (
          <p
            className="text-center mt-4"
            style={{
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: `${PLUM}0.48)`,
            }}
          >
            Click a zone to explore
          </p>
        )}
      </div>

      {/* ── Detail panel ── */}
      <div className="w-full md:flex-1 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeZone ? (
            <motion.div
              key={activeZone}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.68)` }}
              >
                Zone
              </p>
              <h3
                className="font-display font-semibold mb-2"
                style={{ fontSize: 'var(--text-2xl)', color: '#FAFAFA', lineHeight: 1.2 }}
              >
                {ZONE_DETAIL[activeZone].heading}
              </h3>
              <p
                className="font-mono mb-5"
                style={{ fontSize: 'var(--text-xs)', color: `${PLUM}0.70)`, letterSpacing: '0.06em' }}
              >
                {ZONE_DETAIL[activeZone].allocation}
              </p>
              <p
                style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.62)' }}
              >
                {ZONE_DETAIL[activeZone].body}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-full"
              style={{ minHeight: 200 }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                Select a zone to read its description.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
