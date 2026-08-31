'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import React from 'react'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 700
const SVG_H = 258

const ORG_X = 190
const ORG_Y = 200

const AX_END   = 672
const PR_END_Y = 28

type AnalogId   = 'hotel' | 'airport' | 'pit-crew'
type PrecurId   = 'early' | 'prior-art' | 'antecedent'
type ActiveAxis = 'analogs' | 'precursors' | null

const ANALOG_PTS: { id: AnalogId; x: number; label: string; sub: string }[] = [
  { id: 'hotel',    x: 318, label: 'HOTEL',    sub: 'hospitality' },
  { id: 'airport',  x: 450, label: 'AIRPORT',  sub: 'transit flow' },
  { id: 'pit-crew', x: 578, label: 'PIT CREW', sub: 'fast handoff' },
]

const PRECUR_PTS: { id: PrecurId; y: number; label: string; sub: string }[] = [
  { id: 'early',      y: 156, label: 'EARLY VERSION', sub: '~10 YRS AGO' },
  { id: 'prior-art',  y: 106, label: 'PRIOR ART',     sub: '~20 YRS AGO' },
  { id: 'antecedent', y: 56,  label: 'ANTECEDENT',    sub: '~35 YRS AGO' },
]

const ANALOG_DATA: Record<AnalogId, { domain: string; solved: string; principle: string }> = {
  hotel: {
    domain: 'Luxury Hotels',
    solved: 'Orchestrating consistent, dignity-centred service across many staff, touchpoints, and guests simultaneously.',
    principle: 'Choreograph every handoff to feel intentional. Train every person in the service chain (not just the front desk) to the same standard. The guest experience is the sum of handoffs, not a single moment.',
  },
  airport: {
    domain: 'Airports & Transit Hubs',
    solved: 'Moving large volumes of people through a multi-stage, stressful, often opaque process while keeping them oriented and calm.',
    principle: 'Use real-time information and clear wayfinding to give people a sense of control over a process they cannot control. Anxiety drops when people know what comes next and can see their progress.',
  },
  'pit-crew': {
    domain: 'Racing Pit Crews',
    solved: 'Executing a high-precision multi-person handoff under extreme time pressure with near-zero tolerance for error.',
    principle: 'Speed in complex handoffs comes from rehearsed sequences and defined roles, not from hurrying. Every person knows their exact position and moment. The choreography happens before the clock starts.',
  },
}

const PRECUR_DATA: Record<PrecurId, { era: string; what: string; whatHappened: string; diagnosis: string }> = {
  early: {
    era: 'One decade ago',
    what: 'A similar product or service that launched, gained early users, then stalled or failed to scale.',
    whatHappened: 'The concept was directionally correct. The problem was real. But the ecosystem (technology maturity, distribution, cost curve, behavioural readiness) was not yet in place.',
    diagnosis: 'Probably premature, not flawed. Ask: has the infrastructure now caught up? If adoption, cost, or enabling technology has shifted, this idea may simply be ready now.',
  },
  'prior-art': {
    era: 'Two decades ago',
    what: 'A patent, a research prototype, or a startup that articulated the concept but never shipped at scale.',
    whatHappened: 'The idea existed but could not break through: market was too nascent, distribution did not exist, or the required cost curve had not moved enough to make the economics work.',
    diagnosis: 'Worth diagnosing carefully. If the distribution and cost landscape now look different, this could be ripe. If the concept itself proved structurally flawed (not just early), it is a warning rather than an opportunity.',
  },
  antecedent: {
    era: 'Three or more decades ago',
    what: 'A historical precedent from a different era that solved a structurally similar problem with the tools available then.',
    whatHappened: 'The category did not yet exist, the required technology was not available, or the economic model that would have made it viable had not yet emerged.',
    diagnosis: 'Classic "too early" case. Diagnose specifically: what did the earlier era lack (technology, scale, behavioural readiness) and does today provide it? If yes, there may be a ripe idea hiding in history.',
  },
}

export default function APInteractive() {
  const prefersReduced = useReducedMotion()

  const [activeAxis,  setActiveAxis]  = useState<ActiveAxis>(null)
  const [activePoint, setActivePoint] = useState<string | null>(null)

  function selectAnalog(id: AnalogId) {
    if (activeAxis === 'analogs' && activePoint === id) {
      setActivePoint(null)
    } else {
      setActiveAxis('analogs')
      setActivePoint(id)
    }
  }

  function selectPrecur(id: PrecurId) {
    if (activeAxis === 'precursors' && activePoint === id) {
      setActivePoint(null)
    } else {
      setActiveAxis('precursors')
      setActivePoint(id)
    }
  }

  function selectAxis(axis: ActiveAxis) {
    if (activeAxis === axis && activePoint === null) {
      setActiveAxis(null)
    } else {
      setActiveAxis(axis)
      setActivePoint(null)
    }
  }

  const analogDimmed  = activeAxis === 'precursors'
  const precurDimmed  = activeAxis === 'analogs'

  const analogAxisO  = analogDimmed  ? '0.18' : '0.65'
  const precurAxisO  = precurDimmed  ? '0.14' : '0.45'

  const fade = prefersReduced ? { duration: 0 } : { duration: 0.20 }

  return (
    <div className="w-full space-y-6">
      <div
        className="w-full flex justify-center select-none"
        role="group"
        aria-label="Interactive two-axis search space. Click an axis label or a point to explore."
      >
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ maxWidth: 720, overflow: 'visible', cursor: 'default' }}
        >
          <defs>
            <filter id="ap-int-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ap-int-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── ANALOGS AXIS ── */}
          <motion.line
            x1={ORG_X} y1={ORG_Y} x2={AX_END} y2={ORG_Y}
            stroke={`${CLAY}${analogAxisO})`}
            strokeWidth={activeAxis === 'analogs' ? 2 : 1.5}
            filter={activeAxis === 'analogs' ? 'url(#ap-int-glow-sm)' : undefined}
            animate={{ opacity: 1 }}
            transition={fade}
          />
          <path
            d={`M ${AX_END - 7} ${ORG_Y - 5} L ${AX_END + 1} ${ORG_Y} L ${AX_END - 7} ${ORG_Y + 5}`}
            stroke={`${CLAY}${analogAxisO})`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
          />

          {/* Analogs axis hit area + label */}
          <g
            onClick={() => selectAxis('analogs')}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-label="Select Analogs axis"
            aria-pressed={activeAxis === 'analogs' && activePoint === null}
          >
            <rect x={ORG_X} y={ORG_Y - 20} width={AX_END - ORG_X} height={26}
              fill="transparent" />
            <text
              x={AX_END + 8} y={ORG_Y - 5}
              textAnchor="start" dominantBaseline="middle"
              fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
              fill={`${CLAY}${analogDimmed ? '0.25' : activeAxis === 'analogs' && !activePoint ? '0.92' : '0.72'})`}
              style={{ userSelect: 'none' }}
            >ANALOGS →</text>
            <text
              x={AX_END + 8} y={ORG_Y + 8}
              textAnchor="start" dominantBaseline="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={`${CLAY}${analogDimmed ? '0.14' : '0.40'})`}
              style={{ userSelect: 'none' }}
            >across industries</text>
          </g>

          {/* ── PRECURSORS AXIS ── */}
          <motion.line
            x1={ORG_X} y1={ORG_Y} x2={ORG_X} y2={PR_END_Y}
            stroke={`rgba(255,255,255,${precurAxisO})`}
            strokeWidth={activeAxis === 'precursors' ? 2 : 1.5}
            filter={activeAxis === 'precursors' ? 'url(#ap-int-glow-sm)' : undefined}
            animate={{ opacity: 1 }}
            transition={fade}
          />
          <path
            d={`M ${ORG_X - 5} ${PR_END_Y + 9} L ${ORG_X} ${PR_END_Y + 1} L ${ORG_X + 5} ${PR_END_Y + 9}`}
            stroke={`rgba(255,255,255,${precurAxisO})`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
          />

          {/* Precursors axis hit area + label */}
          <g
            onClick={() => selectAxis('precursors')}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-label="Select Precursors axis"
            aria-pressed={activeAxis === 'precursors' && activePoint === null}
          >
            <rect x={ORG_X - 10} y={PR_END_Y} width={20} height={ORG_Y - PR_END_Y}
              fill="transparent" />
            <text
              x={ORG_X} y={PR_END_Y - 5}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
              fill={`rgba(255,255,255,${precurDimmed ? '0.18' : activeAxis === 'precursors' && !activePoint ? '0.70' : '0.42'})`}
              style={{ userSelect: 'none' }}
            >↑ BACK THROUGH TIME</text>
            <text
              x={ORG_X} y={PR_END_Y - 15}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={`rgba(255,255,255,${precurDimmed ? '0.10' : '0.24'})`}
              style={{ userSelect: 'none' }}
            >PRECURSORS</text>
          </g>

          {/* ── ORIGIN ── */}
          <circle
            cx={ORG_X} cy={ORG_Y} r={7}
            fill={`${CLAY}0.18)`}
            stroke={`${CLAY}0.90)`}
            strokeWidth={2}
            filter="url(#ap-int-glow)"
          />
          <text
            x={ORG_X + 13} y={ORG_Y - 3}
            dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${CLAY}0.90)`}
            style={{ userSelect: 'none' }}
          >CURRENT PROBLEM</text>
          <text
            x={ORG_X + 13} y={ORG_Y + 9}
            dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`${CLAY}0.48)`}
            style={{ userSelect: 'none' }}
          >here & now</text>

          {/* ── ANALOG POINTS ── */}
          {ANALOG_PTS.map((pt) => {
            const isActive = activeAxis === 'analogs' && activePoint === pt.id
            const isDimmed = analogDimmed || (activeAxis === 'analogs' && activePoint !== null && activePoint !== pt.id)
            const strokeO = isActive ? '1.0' : isDimmed ? '0.18' : '0.68'
            const fillO   = isActive ? '0.22' : isDimmed ? '0.04' : '0.10'
            const textO   = isActive ? '0.92' : isDimmed ? '0.18' : '0.78'
            const subO    = isActive ? '0.55' : isDimmed ? '0.10' : '0.40'
            return (
              <g
                key={pt.id}
                onClick={() => selectAnalog(pt.id as AnalogId)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-label={`${pt.label} analog point`}
                aria-pressed={isActive}
              >
                <circle
                  cx={pt.x} cy={ORG_Y} r={5}
                  fill={`${CLAY}${fillO})`}
                  stroke={`${CLAY}${strokeO})`}
                  strokeWidth={isActive ? 2 : 1.5}
                  filter={isActive ? 'url(#ap-int-glow)' : undefined}
                />
                {/* Expanded hit area */}
                <circle cx={pt.x} cy={ORG_Y} r={18} fill="transparent" />
                <text
                  x={pt.x} y={ORG_Y - 13}
                  textAnchor="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  fill={`${CLAY}${textO})`}
                  style={{ userSelect: 'none' }}
                >{pt.label}</text>
                <text
                  x={pt.x} y={ORG_Y - 22}
                  textAnchor="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)"
                  fill={`${CLAY}${subO})`}
                  style={{ userSelect: 'none' }}
                >{pt.sub}</text>
              </g>
            )
          })}

          {/* ── PRECURSOR POINTS ── */}
          {PRECUR_PTS.map((pt) => {
            const isActive = activeAxis === 'precursors' && activePoint === pt.id
            const isDimmed = precurDimmed || (activeAxis === 'precursors' && activePoint !== null && activePoint !== pt.id)
            const strokeO = isActive ? '0.85' : isDimmed ? '0.12' : '0.52'
            const fillO   = isActive ? '0.16' : isDimmed ? '0.03' : '0.07'
            const textO   = isActive ? '0.88' : isDimmed ? '0.14' : '0.58'
            const subO    = isActive ? '0.50' : isDimmed ? '0.08' : '0.28'
            return (
              <g
                key={pt.id}
                onClick={() => selectPrecur(pt.id as PrecurId)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-label={`${pt.label} precursor point`}
                aria-pressed={isActive}
              >
                <circle
                  cx={ORG_X} cy={pt.y} r={5}
                  fill={`rgba(255,255,255,${fillO})`}
                  stroke={`rgba(255,255,255,${strokeO})`}
                  strokeWidth={isActive ? 2 : 1.5}
                  filter={isActive ? 'url(#ap-int-glow)' : undefined}
                />
                <circle cx={ORG_X} cy={pt.y} r={18} fill="transparent" />
                <text
                  x={ORG_X - 13} y={pt.y - 4}
                  textAnchor="end" dominantBaseline="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`rgba(255,255,255,${textO})`}
                  style={{ userSelect: 'none' }}
                >{pt.label}</text>
                <text
                  x={ORG_X - 13} y={pt.y + 7}
                  textAnchor="end" dominantBaseline="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)"
                  fill={`rgba(255,255,255,${subO})`}
                  style={{ userSelect: 'none' }}
                >{pt.sub}</text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeAxis === null && (
          <motion.div
            key="idle"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 text-sm text-neutral-500"
            style={{ borderColor: 'var(--color-neutral-100)' }}
          >
            Click an axis label or a point to explore each search direction.
          </motion.div>
        )}

        {activeAxis === 'analogs' && activePoint === null && (
          <motion.div
            key="analogs-axis"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 space-y-3"
            style={{ borderColor: `${CLAY}0.22)`, background: `${CLAY}0.04)` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `${CLAY}0.90)` }}>
              Analogs: searching across space
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Analogs are industries, domains, or contexts that have already solved a problem structurally similar to yours,
              even when they look nothing like you. The search is lateral: away from your own category, across other industries, in the present.
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              The core skill is <strong>abstraction</strong>: moving from a surface similarity
              (both use waiting rooms) to a structural one (both must manage dignified waiting under uncertainty).
              The payoff is <strong>freshness from distance</strong>: the further the analog, the less obvious
              the connection, and the more genuinely new the borrowed principle feels in your space.
            </p>
            <p className="text-sm text-neutral-600 italic">
              Click a point to explore a specific analog.
            </p>
          </motion.div>
        )}

        {activeAxis === 'analogs' && activePoint !== null && (() => {
          const d = ANALOG_DATA[activePoint as AnalogId]
          return (
            <motion.div
              key={`analogs-${activePoint}`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="rounded-lg border p-5 space-y-4"
              style={{ borderColor: `${CLAY}0.28)`, background: `${CLAY}0.04)` }}
            >
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `${CLAY}0.90)` }}>
                  {d.domain}
                </p>
                <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: `${CLAY}0.10)`, color: `${CLAY}0.75)`, border: `1px solid ${CLAY}0.22)` }}>
                  analog
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-neutral-400">What they solved</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{d.solved}</p>
              </div>
              <div className="space-y-1 border-t pt-4" style={{ borderColor: `${CLAY}0.15)` }}>
                <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: `${CLAY}0.65)` }}>
                  Abstracted principle
                </p>
                <p className="text-sm font-semibold text-neutral-800 leading-relaxed">{d.principle}</p>
              </div>
            </motion.div>
          )
        })()}

        {activeAxis === 'precursors' && activePoint === null && (
          <motion.div
            key="precursors-axis"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 space-y-3"
            style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white text-opacity-75">
              Precursors: searching back through time
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Precursors are earlier attempts at solving the same problem within your own industry or an adjacent one.
              The search is backward: behind you, through your category&rsquo;s history. Something tried and failed,
              something patented but never shipped, something that existed in an earlier era but was ahead of its time.
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              The core skill is <strong>timing diagnosis</strong>: distinguishing between ideas that failed because they were
              structurally flawed versus ideas that failed because they were premature. The payoff is <strong>hindsight as
              advantage</strong>: if the world has now provided what the original attempt lacked, an idea hiding in history
              may be ripe.
            </p>
            <p className="text-sm text-neutral-600 italic">
              Click a point to explore a specific precursor type.
            </p>
          </motion.div>
        )}

        {activeAxis === 'precursors' && activePoint !== null && (() => {
          const d = PRECUR_DATA[activePoint as PrecurId]
          return (
            <motion.div
              key={`precursors-${activePoint}`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="rounded-lg border p-5 space-y-4"
              style={{ borderColor: 'rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-200">
                  {d.era}
                </p>
                <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.16)' }}>
                  precursor
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-neutral-400">What it was</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{d.what}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-neutral-400">What happened</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{d.whatHappened}</p>
              </div>
              <div className="space-y-1 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
                <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: `${INDIGO}0.70)` }}>
                  Timing diagnosis
                </p>
                <p className="text-sm font-semibold text-neutral-800 leading-relaxed">{d.diagnosis}</p>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
