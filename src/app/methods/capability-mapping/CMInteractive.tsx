'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700, SVG_H = 280

const FE_X = 92, BE_X = 400, CELL_W = 288
const FE_CX = FE_X + CELL_W / 2
const BE_CX = BE_X + CELL_W / 2

const L = {
  1: { y: 168, h: 56, cy: 196 },
  2: { y: 96,  h: 56, cy: 124 },
  3: { y: 26,  h: 56, cy: 54  },
}

type State = 'have' | 'partial' | 'gap'
type CellId = 'fe-l1' | 'be-l1' | 'fe-l2' | 'be-l2' | 'fe-l3' | 'be-l3'
type LayerId = 1 | 2 | 3
type View = 'today' | 'target'

interface CapCell {
  id: CellId
  layer: LayerId
  seg: 'fe' | 'be'
  x: number; cy: number; cx: number
  label: string
  today: State
  blocks: CellId[]
  info: { tag: string; headline: string; body: string }
}

const CELLS: CapCell[] = [
  {
    id: 'fe-l1', layer: 1, seg: 'fe', x: FE_X, cy: 196, cx: FE_CX,
    label: 'DATA QUALITY', today: 'partial',
    blocks: ['fe-l2', 'fe-l3'],
    info: {
      tag: 'FOUNDATIONAL · FRONT-END',
      headline: 'PARTIAL: good enough for reporting, not for real-time decisions.',
      body: 'Data quality was assessed as present for two years because it was checked against the wrong requirement: reporting. For reporting it was fine. For driving a real-time decision it was nowhere near sufficient. PARTIAL is the most dangerous state because it is indistinguishable from HAVE IT on any flat capability list. Every capability resting on this one (real-time serving and, above it, the personalization initiative) is partially resting on something that is not what it appears to be.',
    },
  },
  {
    id: 'be-l1', layer: 1, seg: 'be', x: BE_X, cy: 196, cx: BE_CX,
    label: 'PIPELINE RELIABILITY', today: 'gap',
    blocks: ['be-l2', 'be-l3'],
    info: {
      tag: 'FOUNDATIONAL · BACK-END · GAP',
      headline: 'GAP: held together by one person\'s undocumented knowledge.',
      body: 'Pipeline reliability was a genuine gap: the capability existed only in one engineer\'s head, undocumented, and unavailable when that person was away. It was never listed as a gap because it was never asked about directly. It was simply assumed. Everything stacked above it (live system operations, and above that, the real-time recommendations the strategy was named after) was standing on a single person\'s private knowledge. This is the foundational gap that destabilized the entire right column. Click "propagate upward" to see what rests on it.',
    },
  },
  {
    id: 'fe-l2', layer: 2, seg: 'fe', x: FE_X, cy: 124, cx: FE_CX,
    label: 'REAL-TIME SERVING', today: 'partial',
    blocks: ['fe-l3'],
    info: {
      tag: 'OPERATIONAL · FRONT-END',
      headline: 'PARTIAL: serving logic exists, but cannot operate reliably at real-time latency.',
      body: 'The real-time serving capability was partially built: the team could serve data to a front end, but not at the sub-second latency that real-time personalization requires. This partial capability was recorded as present in most planning documents. It rests on the data quality foundational capability, which is also PARTIAL, so this partial operational capability is itself standing on a partial foundation.',
    },
  },
  {
    id: 'be-l2', layer: 2, seg: 'be', x: BE_X, cy: 124, cx: BE_CX,
    label: 'LIVE SYSTEM OPS', today: 'partial',
    blocks: ['be-l3'],
    info: {
      tag: 'OPERATIONAL · BACK-END · AT RISK',
      headline: 'PARTIAL: and standing on a foundational GAP.',
      body: 'Live system operations was partially present: the team could operate a live system, but only in conditions of moderate load and stable pipeline behavior. It rested on the pipeline reliability foundational capability, which was a genuine GAP. A partial operational capability resting on a missing foundation is worse than it looks: the partial appears to be holding, right up until the pipeline has a problem, at which point the team discovers there is no reliable way to restore it.',
    },
  },
  {
    id: 'fe-l3', layer: 3, seg: 'fe', x: FE_X, cy: 54, cx: FE_CX,
    label: 'PERSONALISATION', today: 'have',
    blocks: [],
    info: {
      tag: 'EPIC-LEVEL · FRONT-END',
      headline: 'HAVE IT: staffed, funded, and standing on a partial foundation.',
      body: 'The personalization capability was the centrepiece of the strategy: two teams staffed against it, fully funded, visible to leadership. It had been worked on for eighteen months. What no map had captured was what it depended on: real-time serving (PARTIAL), which itself depended on data quality (PARTIAL). The EPIC-level capability existed at the top of the stack, but the bottom of the stack was insufficient. The capability was real; the ground it stood on was not.',
    },
  },
  {
    id: 'be-l3', layer: 3, seg: 'be', x: BE_X, cy: 54, cx: BE_CX,
    label: 'REAL-TIME RECS', today: 'have',
    blocks: [],
    info: {
      tag: 'EPIC-LEVEL · BACK-END · AT RISK',
      headline: 'HAVE IT: but the entire back-end column below it is compromised.',
      body: 'Real-time recommendations required live system operations (PARTIAL) resting on pipeline reliability (GAP). The EPIC-level capability existed: teams worked on it, code was written, the architecture was sound. What was absent was the foundation. The two teams working on this initiative were, without knowing it, being asked to build a house on a hole. The moment pipeline reliability failed, which it did, whenever the one person who knew it was unavailable, the entire column above it could not function.',
    },
  },
]

export default function CMInteractive() {
  const [view, setView] = useState<View>('target')
  const [active, setActive] = useState<CellId | null>(null)
  const [propagating, setPropagating] = useState<CellId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const toggle = (id: CellId) => {
    if (active === id) { setActive(null); setPropagating(null); return }
    setActive(id)
    // auto-propagate when clicking a foundational GAP
    const cell = CELLS.find(c => c.id === id)
    if (cell && cell.layer === 1 && cell.today === 'gap') {
      setPropagating(id)
    } else {
      setPropagating(null)
    }
  }

  const getState = (cell: CapCell): State => view === 'target' ? 'have' : cell.today

  // Which cells are in the propagation risk set?
  const propagatingCell = CELLS.find(c => c.id === propagating)
  const atRisk = new Set<CellId>(propagatingCell ? propagatingCell.blocks : [])
  // Also add the foundational partial's blocks as "at risk" when view=today
  const feL1 = CELLS[0]
  const partialRisk = view === 'today' && active === 'fe-l1' ? new Set<CellId>(feL1.blocks) : new Set<CellId>()

  function cellFill(cell: CapCell): string {
    const s = getState(cell)
    if (atRisk.has(cell.id)) return `${AMBER}0.10)`
    if (partialRisk.has(cell.id)) return `${AMBER}0.06)`
    if (s === 'have') return `${BRICK}${active === cell.id ? 0.22 : 0.13})`
    if (s === 'partial') return `${AMBER}${active === cell.id ? 0.14 : 0.07})`
    return 'rgba(10,5,4,0.72)'
  }
  function cellStroke(cell: CapCell): string {
    const s = getState(cell)
    if (atRisk.has(cell.id) || partialRisk.has(cell.id)) return `${AMBER}0.72)`
    if (active === cell.id) return s === 'have' ? `${BRICK}0.92)` : `${AMBER}0.88)`
    if (s === 'have') return `${BRICK}0.70)`
    if (s === 'partial') return `${AMBER}0.58)`
    return `${AMBER}0.42)`
  }
  function cellSW(cell: CapCell): number {
    return (atRisk.has(cell.id) || partialRisk.has(cell.id) || active === cell.id) ? 2.0 : 1.5
  }
  function cellDash(cell: CapCell): string {
    const s = getState(cell)
    if (s === 'have') return ''
    if (s === 'partial') return '6 3'
    return '4 4'
  }
  function stateLabel(cell: CapCell): string {
    if (atRisk.has(cell.id)) return '⚠ AT RISK'
    if (partialRisk.has(cell.id)) return '⚠ RESTS ON PARTIAL'
    const s = getState(cell)
    if (s === 'have') return 'HAVE IT'
    if (s === 'partial') return 'PARTIAL'
    return 'GAP'
  }
  function stateLabelColor(cell: CapCell): string {
    if (atRisk.has(cell.id) || partialRisk.has(cell.id)) return `${AMBER}0.80)`
    const s = getState(cell)
    if (s === 'have') return `${BRICK}0.80)`
    return `${AMBER}0.72)`
  }

  const activeCell = active ? CELLS.find(c => c.id === active) : null

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setView(v => v === 'today' ? 'target' : 'today'); setActive(null); setPropagating(null) }}
          aria-pressed={view === 'today'}
          className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
          style={{
            background: view === 'today' ? `${AMBER}0.18)` : `${BRICK}0.14)`,
            color: view === 'today' ? `${AMBER}0.90)` : `${BRICK}0.80)`,
            border: `1.5px solid ${view === 'today' ? `${AMBER}0.55)` : `${BRICK}0.40)`}`,
          }}>
          {view === 'today' ? 'SHOWING: TODAY' : 'SHOWING: TARGET'}
        </button>
        {view === 'today' && propagating && (
          <button onClick={() => setPropagating(null)}
            className="rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ color: `${AMBER}0.65)`, border: `1.5px solid ${AMBER}0.25)` }}>
            CLEAR PROPAGATION
          </button>
        )}
        {(active !== null || view === 'today') && (
          <button onClick={() => { setActive(null); setPropagating(null); setView('target') }}
            className="rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ color: `${BRICK}0.45)`, border: `1.5px solid ${BRICK}0.18)` }}>
            CLEAR
          </button>
        )}
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {view === 'today' && propagating && propagatingCell
          ? `Propagating: ${propagatingCell.label} is a foundational gap. At risk: ${propagatingCell.blocks.map(bid => CELLS.find(c => c.id === bid)?.label).join(', ')}`
          : ''}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        role="group"
        aria-label="Interactive layered capability map. Toggle between TODAY (current state) and TARGET (what delivery requires). Click any capability to explore it. Click a foundational gap to see instability propagate upward."
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="cm-int-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cm-int-amber-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${AMBER}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="cm-int-up" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,6 L3,0 L6,6 Z" fill={`${BRICK}0.36)`} />
          </marker>
          <marker id="cm-int-up-warn" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,6 L3,0 L6,6 Z" fill={`${AMBER}0.55)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Segment labels */}
        <text x={FE_CX} y={16} textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
          fill={`rgba(183,145,135,0.891)`} style={{ userSelect: 'none' }}>FRONT-END</text>
        <text x={BE_CX} y={16} textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
          fill={`rgba(183,145,135,0.891)`} style={{ userSelect: 'none' }}>BACK-END</text>
        <line x1={390} y1={22} x2={390} y2={226} stroke={`${BRICK}0.10)`} strokeWidth={0.8} />

        {/* Layer labels */}
        {([1, 2, 3] as LayerId[]).map(ln => (
          <text key={ln} x={4} y={L[ln].y + 15} textAnchor="start"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="-0.01em" fontWeight="600"
            fill={`rgba(183,145,135,0.87)`} style={{ userSelect: 'none' }}>
            {ln === 1 ? 'FOUNDATIONAL' : ln === 2 ? 'OPERATIONAL' : 'EPIC-LEVEL'}
          </text>
        ))}

        {/* Upward arrows */}
        <line x1={FE_CX} y1={162} x2={FE_CX} y2={104} stroke={`${BRICK}0.28)`} strokeWidth={0.9} markerEnd="url(#cm-int-up)" />
        <line x1={BE_CX} y1={162} x2={BE_CX} y2={104}
          stroke={propagating ? `${AMBER}0.55)` : `${AMBER}0.30)`}
          strokeWidth={propagating ? 1.4 : 0.9} markerEnd="url(#cm-int-up-warn)" />
        <line x1={FE_CX} y1={90} x2={FE_CX} y2={34} stroke={`${BRICK}0.26)`} strokeWidth={0.9} markerEnd="url(#cm-int-up)" />
        <line x1={BE_CX} y1={90} x2={BE_CX} y2={34}
          stroke={propagating ? `${AMBER}0.55)` : `${AMBER}0.28)`}
          strokeWidth={propagating ? 1.4 : 0.9} markerEnd="url(#cm-int-up-warn)" />

        {/* Capability cells */}
        {CELLS.map(cell => {
          const isGap = getState(cell) === 'gap'
          const isAtRisk = atRisk.has(cell.id)
          const isPartialRisk = partialRisk.has(cell.id)
          return (
            <g key={cell.id} style={{ cursor: 'pointer' }} onClick={() => toggle(cell.id)}
              aria-label={`${cell.label}: ${stateLabel(cell)}. Layer: ${cell.layer === 1 ? 'Foundational' : cell.layer === 2 ? 'Operational' : 'Epic-level'}. Segment: ${cell.seg === 'fe' ? 'Front-end' : 'Back-end'}.${cell.blocks.length ? ` Depends on by: ${cell.blocks.join(', ')}.` : ''}`}
              role="button" tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(cell.id) } }}>
              <rect
                x={cell.x} y={L[cell.layer].y} width={CELL_W} height={L[cell.layer].h}
                fill={cellFill(cell)}
                stroke={cellStroke(cell)}
                strokeWidth={cellSW(cell)}
                strokeDasharray={cellDash(cell)}
                rx={3}
                filter={(isGap || isAtRisk || isPartialRisk) ? 'url(#cm-int-amber-glow)' : (active === cell.id ? 'url(#cm-int-glow)' : undefined)}
              />
              {/* Capability label */}
              <text x={cell.cx} y={cell.cy - 6} textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                fill={isAtRisk || isPartialRisk ? `${AMBER}0.85)` : (getState(cell) === 'have' ? `rgba(183,145,135,0.969)` : `${AMBER}0.80)`)}
                style={{ userSelect: 'none' }}>
                {cell.label}
              </text>
              {/* State label */}
              <text x={cell.cx} y={cell.cy + 11} textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                fill={stateLabelColor(cell)} style={{ userSelect: 'none' }}>
                {stateLabel(cell)}
              </text>
            </g>
          )
        })}

        {/* Today/Target gap indicator */}
        {view === 'today' && (
          <text x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle" fontSize="11"
            fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill={`${AMBER_TEXT}0.814)`} style={{ userSelect: 'none' }}>
            {propagating ? 'Everything above a foundational gap is standing on air.' : 'Click any capability. Click a foundational gap to see what rests on it.'}
          </text>
        )}
        {view === 'target' && (
          <text x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle" fontSize="11"
            fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>
            TARGET view: all capabilities as delivery requires. Toggle to TODAY to see the gaps.
          </text>
        )}
      </svg>

      {/* Capability button row */}
      <div className="flex flex-wrap gap-2">
        {CELLS.map(cell => {
          const s = view === 'today' ? cell.today : 'have'
          return (
            <button key={cell.id}
              onClick={() => toggle(cell.id)}
              aria-pressed={active === cell.id}
              className="rounded px-2.5 py-1 text-xs font-semibold font-mono tracking-widest transition-all"
              style={{
                background: active === cell.id
                  ? s === 'have' ? `${BRICK}0.16)` : `${AMBER}0.12)`
                  : 'transparent',
                color: active === cell.id
                  ? s === 'have' ? `${BRICK}0.85)` : `${AMBER}0.80)`
                  : s === 'have' ? `${BRICK}0.48)` : `${AMBER}0.52)`,
                border: `1.5px ${s === 'have' ? 'solid' : 'dashed'} ${active === cell.id
                  ? s === 'have' ? `${BRICK}0.55)` : `${AMBER}0.55)`
                  : s === 'have' ? `${BRICK}0.22)` : `${AMBER}0.28)`}`,
              }}>
              {cell.label}
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeCell && (
          <motion.div key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="rounded-lg p-5"
            style={{
              background: atRisk.has(activeCell.id) || partialRisk.has(activeCell.id)
                ? `${AMBER}0.06)` : `${BRICK}0.06)`,
              border: `1px solid ${atRisk.has(activeCell.id) || partialRisk.has(activeCell.id)
                ? `${AMBER}0.28)` : `${BRICK}0.22)`}`,
            }}>
            <p className="font-mono uppercase tracking-widest mb-1"
              style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.62)` }}>
              {activeCell.info.tag}
            </p>
            <p className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-base)', color: `${BRICK}0.82)` }}>
              {activeCell.info.headline}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.70)', lineHeight: 'var(--leading-relaxed)' }}>
              {activeCell.info.body}
            </p>
            {activeCell.layer === 1 && view === 'today' && (
              <div className="mt-4 rounded p-3"
                style={{ background: `${AMBER}0.06)`, border: `1px solid ${AMBER}0.22)` }}>
                <p className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.65)` }}>
                  Foundational dependency
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.55)', lineHeight: 'var(--leading-relaxed)' }}>
                  {activeCell.today === 'gap'
                    ? `Everything that depends on ${activeCell.label} is at risk: ${activeCell.blocks.map(bid => CELLS.find(c => c.id === bid)?.label).join(' and ')}. These capabilities cannot be stronger than their foundation. Click the SVG cell to activate propagation.`
                    : `PARTIAL is more dangerous than GAP because it is mistaken for present. ${activeCell.label} appears on the list as a tick, and the ${activeCell.blocks.map(bid => CELLS.find(c => c.id === bid)?.label).join(' and ')} above it proceed as though it is solid.`}
                </p>
              </div>
            )}
          </motion.div>
        )}
        {!activeCell && view === 'today' && propagating === null && (
          <motion.div key="today-prompt"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="rounded-lg p-4"
            style={{ border: `1px solid ${AMBER}0.20)`, background: `${AMBER}0.04)` }}>
            <p className="font-mono uppercase tracking-widest mb-1"
              style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.65)` }}>
              You are looking at TODAY
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.55)', lineHeight: 'var(--leading-relaxed)' }}>
              The gaps between TARGET and TODAY are the delivery gaps, the specific missing capabilities that
              will stop you shipping. Click any capability to explore it. Click <strong>PIPELINE RELIABILITY</strong>{' '}
              (the foundational GAP) to see instability propagate upward.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
