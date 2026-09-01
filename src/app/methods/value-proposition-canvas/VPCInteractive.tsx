'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const AMBER = 'rgba(245,158,11,'

const SVG_W = 700
const SVG_H = 310

const VM_X  = 14, VM_Y = 30, VM_W = 252, VM_H = 260
const VM_RE = VM_X + VM_W
const VM_DY = VM_Y + 88
const VM_DX = VM_X + 126

const CP_CX = 540, CP_CY = 165, CP_R = 108
const CP_LE = CP_CX - CP_R

// Circle divider endpoints
const D30_X  = Math.round(CP_CX + CP_R * Math.cos(30  * Math.PI / 180))  // 634
const D30_Y  = Math.round(CP_CY + CP_R * Math.sin(30  * Math.PI / 180))  // 219
const D90_Y  = Math.round(CP_CY + CP_R)                                   // 273
const D150_X = Math.round(CP_CX + CP_R * Math.cos(150 * Math.PI / 180))  // 447
const D150_Y = D30_Y

type Region = 'ps' | 'gc' | 'pr' | 'jobs' | 'pains' | 'gains'

const REGION_DETAILS: Record<Region, { heading: string; body: string; tip: string }> = {
  ps: {
    heading: 'Products & Services',
    body: 'List every product, feature, and service you offer: the full inventory of your value proposition. Be exhaustive and concrete, not aspirational.',
    tip: 'List offerings, not benefits. Benefits belong in Gain Creators and Pain Relievers.',
  },
  gc: {
    heading: 'Gain Creators',
    body: 'Describe specifically how your products and services create the outcomes and benefits your customer profile lists under Gains. Not every offering needs to create every gain.',
    tip: 'The strongest gain creators address gains the customer never expected but immediately values.',
  },
  pr: {
    heading: 'Pain Relievers',
    body: 'Describe specifically how your products and services eliminate or reduce the things that frustrate, risk, or block your customer before, during, or after getting the job done.',
    tip: 'Address extreme, frequent pains first. Relieving a mild inconvenience rarely creates meaningful differentiation.',
  },
  jobs: {
    heading: 'Customer Jobs',
    body: 'What functional, social, or emotional tasks is the customer trying to accomplish? Describe these from the customer\'s perspective, not from the lens of your product.',
    tip: 'Use the JTBD format: When [situation], I want to [motivation], so I can [outcome].',
  },
  pains: {
    heading: 'Pains',
    body: 'What frustrates, blocks, worries, or creates risk for your customer before, during, or after getting the job done? Rank by severity and frequency.',
    tip: 'Extreme pains, the ones your customer mentions unprompted, create the strongest pull for pain relievers.',
  },
  gains: {
    heading: 'Gains',
    body: 'What outcomes or benefits does your customer expect, desire, or dream of? These can be required gains (minimum expectations), expected gains, desired gains, or unexpected delighters.',
    tip: 'Surprising gains that the customer never articulated but immediately recognises as valuable are the hardest to copy.',
  },
}

const VM_REGIONS: Array<{ id: Region; label: string; x: number; y: number; w: number; h: number }> = [
  { id: 'ps',   label: 'PRODUCTS & SERVICES', x: VM_X,   y: VM_Y,   w: VM_W, h: 88  },
  { id: 'gc',   label: 'GAIN CREATORS',        x: VM_X,   y: VM_DY,  w: 126,  h: 172 },
  { id: 'pr',   label: 'PAIN RELIEVERS',        x: VM_DX,  y: VM_DY,  w: 126,  h: 172 },
]

export default function VPCInteractive() {
  const [active, setActive] = useState<Region | null>(null)
  const [showFit, setShowFit] = useState(false)
  const prefersReduced = useReducedMotion()

  const toggle = (id: Region) => setActive(prev => prev === id ? null : id)

  const vmDim = (id: Region) => active !== null && active !== id && ['ps','gc','pr'].includes(active)
  const cpDim = (id: Region) => active !== null && active !== id && ['jobs','pains','gains'].includes(active)

  return (
    <div className="w-full">
      {/* Button controls */}
      <div className="flex flex-wrap items-start gap-6 mb-4">
        {/* VALUE MAP group */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-semibold tracking-[1.8px] uppercase"
            style={{ color: `${PLUM}0.60)` }}>Value Map</span>
          <div className="flex flex-wrap gap-1.5">
            {VM_REGIONS.map(r => (
              <button key={r.id} onClick={() => toggle(r.id)}
                className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-all"
                style={{
                  background: active === r.id ? `${PLUM}0.35)` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active === r.id ? `${PLUM}0.70)` : 'rgba(255,255,255,0.12)'}`,
                  color: active === r.id ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
              >{r.label}</button>
            ))}
          </div>
        </div>

        {/* CUSTOMER PROFILE group */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-semibold tracking-[1.8px] uppercase"
            style={{ color: `${PLUM}0.60)` }}>Customer Profile</span>
          <div className="flex flex-wrap gap-1.5">
            {(['jobs','pains','gains'] as Region[]).map(id => (
              <button key={id} onClick={() => toggle(id)}
                className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-all"
                style={{
                  background: active === id ? `${PLUM}0.35)` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active === id ? `${PLUM}0.70)` : 'rgba(255,255,255,0.12)'}`,
                  color: active === id ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
              >{id === 'ps' ? 'Products & Services' : id.charAt(0).toUpperCase() + id.slice(1)}</button>
            ))}
          </div>
        </div>

        {/* Fit toggle */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-semibold tracking-[1.8px] uppercase text-white/20">Fit</span>
          <button onClick={() => setShowFit(f => !f)}
            className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-all"
            style={{
              background: showFit ? `${PLUM}0.25)` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${showFit ? `${PLUM}0.55)` : 'rgba(255,255,255,0.12)'}`,
              color: showFit ? '#fff' : 'rgba(255,255,255,0.45)',
            }}
          >{showFit ? 'Hide Fit' : 'Show Fit'}</button>
        </div>
      </div>

      {/* SVG */}
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: 320 }}
        aria-hidden="true">
        <defs>
          <filter id="vpc-int-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="vpc-int-arrow-plum" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={`${PLUM}0.70)`} />
          </marker>
        </defs>

        {/* ── VALUE MAP ─────────────────────────────────────────────── */}
        {/* Outer rect */}
        <rect x={VM_X} y={VM_Y} width={VM_W} height={VM_H} rx={5}
          fill={`${PLUM}0.08)`}
          stroke={active && ['ps','gc','pr'].includes(active) ? `${PLUM}0.50)` : `${PLUM}0.32)`}
          strokeWidth={1.5}
          style={{ transition: 'all 0.25s' }} />

        {/* P&S section highlight */}
        <rect x={VM_X} y={VM_Y} width={VM_W} height={88} rx={5}
          fill={`${PLUM}${active === 'ps' ? '0.30)' : '0.00)'}`}
          stroke="none"
          style={{ transition: 'fill 0.22s' }} />

        {/* GC section highlight */}
        <rect x={VM_X} y={VM_DY} width={126} height={172}
          fill={`${PLUM}${active === 'gc' ? '0.30)' : '0.00)'}`}
          stroke="none"
          style={{ transition: 'fill 0.22s' }} />

        {/* PR section highlight */}
        <rect x={VM_DX} y={VM_DY} width={126} height={172}
          fill={`${PLUM}${active === 'pr' ? '0.30)' : '0.00)'}`}
          stroke="none"
          style={{ transition: 'fill 0.22s' }} />

        {/* Dividers */}
        <line x1={VM_X} y1={VM_DY} x2={VM_RE} y2={VM_DY}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
        <line x1={VM_DX} y1={VM_DY} x2={VM_DX} y2={VM_Y + VM_H}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} />

        {/* VM section labels */}
        {VM_REGIONS.map(r => (
          <text key={r.id}
            x={r.x + r.w / 2} y={r.y + (r.id === 'ps' ? 17 : 15)}
            textAnchor="middle"
            fill={`rgba(255,255,255,${active === r.id ? '0.65' : vmDim(r.id) ? '0.12' : '0.28'})`}
            fontSize={7} fontWeight={600} letterSpacing={1.2} fontFamily="monospace"
            style={{ transition: 'fill 0.22s' }}
          >{r.label}</text>
        ))}

        {/* VM items */}
        {([
          [22,  80, 90, 10, 'ps'],
          [122, 80, 112, 10, 'ps'],
          [22,  95, 70, 10, 'ps'],
          [22,  155, 95, 10, 'gc'],
          [22,  170, 76, 10, 'gc'],
          [150, 155, 90, 10, 'pr'],
          [150, 170, 76, 10, 'pr'],
        ] as [number,number,number,number,Region][]).map(([ix,iy,iw,ih,sec], i) => (
          <rect key={i} x={ix} y={iy} width={iw} height={ih} rx={2}
            fill={active === sec ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)'}
            stroke={active === sec ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)'}
            strokeWidth={0.75}
            style={{ transition: 'all 0.22s', opacity: vmDim(sec) ? 0.25 : 1 }} />
        ))}

        {/* ── CUSTOMER PROFILE ──────────────────────────────────────── */}
        {/* Sector highlight paths: behind circle border */}
        {/* JOBS sector (upper) */}
        <path d={`M ${CP_CX},${CP_CY} L ${D150_X},${D150_Y} A ${CP_R},${CP_R} 0 1 0 ${D30_X},${D30_Y} Z`}
          fill={`${PLUM}${active === 'jobs' ? '0.28)' : '0.00)'}`}
          style={{ transition: 'fill 0.22s' }} />
        {/* PAINS sector (lower-right) */}
        <path d={`M ${CP_CX},${CP_CY} L ${D30_X},${D30_Y} A ${CP_R},${CP_R} 0 0 1 ${CP_CX},${D90_Y} Z`}
          fill={`${PLUM}${active === 'pains' ? '0.28)' : '0.00)'}`}
          style={{ transition: 'fill 0.22s' }} />
        {/* GAINS sector (lower-left) */}
        <path d={`M ${CP_CX},${CP_CY} L ${CP_CX},${D90_Y} A ${CP_R},${CP_R} 0 0 1 ${D150_X},${D150_Y} Z`}
          fill={`${PLUM}${active === 'gains' ? '0.28)' : '0.00)'}`}
          style={{ transition: 'fill 0.22s' }} />

        {/* Circle border */}
        <circle cx={CP_CX} cy={CP_CY} r={CP_R}
          fill="none"
          stroke={active && ['jobs','pains','gains'].includes(active) ? `${PLUM}0.60)` : `${PLUM}0.32)`}
          strokeWidth={1.5}
          filter="url(#vpc-int-glow)"
          style={{ transition: 'stroke 0.22s' }} />

        {/* Divider lines */}
        <line x1={CP_CX} y1={CP_CY} x2={D150_X} y2={D150_Y}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
        <line x1={CP_CX} y1={CP_CY} x2={D30_X} y2={D30_Y}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
        <line x1={CP_CX} y1={CP_CY} x2={CP_CX} y2={D90_Y}
          stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />

        {/* CP region labels */}
        {([
          { id: 'jobs' as Region,  label: 'CUSTOMER JOBS', x: CP_CX,      y: CP_CY - 68 },
          { id: 'pains' as Region, label: 'PAINS',          x: CP_CX + 55, y: CP_CY + 60 },
          { id: 'gains' as Region, label: 'GAINS',          x: CP_CX - 55, y: CP_CY + 60 },
        ]).map(r => (
          <text key={r.id} x={r.x} y={r.y} textAnchor="middle"
            fill={`rgba(255,255,255,${active === r.id ? '0.70' : cpDim(r.id) ? '0.10' : '0.28'})`}
            fontSize={7} fontWeight={600} letterSpacing={1.2} fontFamily="monospace"
            style={{ transition: 'fill 0.22s' }}
          >{r.label}</text>
        ))}

        {/* CP item dots */}
        {([
          [516,108,'jobs'],[552,122,'jobs'],
          [490,200,'gains'],[472,218,'gains'],
          [578,197,'pains'],[598,215,'pains'],[580,234,'pains'],
        ] as [number,number,Region][]).map(([dx,dy,sec], i) => (
          <circle key={i} cx={dx} cy={dy} r={3}
            fill={active === sec ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)'}
            stroke={active === sec ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.14)'}
            strokeWidth={0.8}
            style={{ transition: 'all 0.22s', opacity: cpDim(sec) ? 0.20 : 1 }} />
        ))}

        {/* ── FIT OVERLAY ───────────────────────────────────────────── */}
        <AnimatePresence>
          {showFit && (
            <motion.g
              key="fit-overlay"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.30 }}
            >
              {/* FIT: PR → PAINS */}
              <line x1={VM_RE} y1={160} x2={CP_LE} y2={197}
                stroke={`${PLUM}0.72)`} strokeWidth={1.5}
                markerEnd="url(#vpc-int-arrow-plum)" />
              {/* FIT: GC → GAINS */}
              <line x1={VM_RE} y1={174} x2={CP_LE} y2={200}
                stroke={`${PLUM}0.60)`} strokeWidth={1.5}
                markerEnd="url(#vpc-int-arrow-plum)" />

              <text x={349} y={174} textAnchor="middle"
                fill={`${PLUM}0.90)`} fontSize={7.5} fontWeight={600}
                letterSpacing={1.0} fontFamily="monospace">FIT ✓</text>

              {/* WASTED: PR item with no pain */}
              <line x1={VM_RE} y1={148} x2={328} y2={148}
                stroke={`${AMBER}0.60)`} strokeWidth={1.2} strokeDasharray="4 3" />
              <text x={330} y={145} textAnchor="start"
                fill={`${AMBER}0.70)`} fontSize={6.5} fontWeight={600}
                letterSpacing={1.1} fontFamily="monospace">WASTED ×</text>

              {/* WASTED: GC item with no gain */}
              <line x1={VM_RE} y1={188} x2={328} y2={188}
                stroke={`${AMBER}0.55)`} strokeWidth={1.2} strokeDasharray="4 3" />
              <text x={330} y={185} textAnchor="start"
                fill={`${AMBER}0.65)`} fontSize={6.5} fontWeight={600}
                letterSpacing={1.1} fontFamily="monospace">WASTED ×</text>

              {/* UNMET NEED */}
              <line x1={CP_LE} y1={220} x2={380} y2={220}
                stroke={`${AMBER}0.52)`} strokeWidth={1.2} strokeDasharray="4 3" />
              <text x={378} y={217} textAnchor="end"
                fill={`${AMBER}0.62)`} fontSize={6.5} fontWeight={600}
                letterSpacing={1.1} fontFamily="monospace">UNMET NEED !</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="mt-4 rounded-lg p-5 border"
            style={{
              background: `${PLUM}0.15)`,
              borderColor: `${PLUM}0.38)`,
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[1.6px] mb-2"
              style={{ color: `${PLUM}0.80)` }}>
              {REGION_DETAILS[active].heading}
            </p>
            <p className="text-sm leading-relaxed text-white/70 mb-3">
              {REGION_DETAILS[active].body}
            </p>
            <div className="flex items-start gap-2 rounded p-3"
              style={{ background: `${PLUM}0.12)` }}>
              <span className="text-[10px] font-semibold shrink-0 mt-0.5"
                style={{ color: `${PLUM}0.80)` }}>TIP</span>
              <p className="text-xs text-white/55 leading-relaxed">
                {REGION_DETAILS[active].tip}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
