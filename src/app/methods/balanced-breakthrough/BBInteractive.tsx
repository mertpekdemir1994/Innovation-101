'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const AMBER = 'rgba(217,119,6,'

const SVG_W = 700
const SVG_H = 320

const D_CX = 350, D_CY = 113
const F_CX = 285, F_CY = 226
const V_CX = 415, V_CY = 226
const R = 90
const CTR_X = 350, CTR_Y = 188

type RegionId = 'd' | 'f' | 'v' | 'df' | 'dv' | 'fv' | 'center'

type Region = {
  id: RegionId
  hitX: number
  hitY: number
  hitR: number
  label: string
  sublabel: string
  zone: 'good' | 'trap' | 'void'
  headline: string
  body: string
  example: string
}

const REGIONS: Region[] = [
  {
    id: 'd',
    hitX: 350, hitY: 62, hitR: 28,
    label: 'DESIRABILITY',
    sublabel: 'Wanted, but that is all',
    zone: 'void',
    headline: 'People want it, but it cannot be built or sustained.',
    body: 'An idea in the Desirability-only zone is genuinely compelling to the people it is designed for. But without Feasibility, the organisation cannot deliver it: the capability or technology does not exist, or the operational demands are beyond reach. Without Viability, there is no path to a sustainable economics. The desirability is real; the opportunity is not.',
    example: 'A service that customers would genuinely love, but which the team cannot execute reliably, and which costs more to deliver than customers will ever pay.',
  },
  {
    id: 'f',
    hitX: 240, hitY: 264, hitR: 28,
    label: 'FEASIBILITY',
    sublabel: 'Buildable, but that is all',
    zone: 'void',
    headline: 'The team can build it, but no one wants it and it will not pay.',
    body: 'A Feasibility-only idea is technically achievable: the organisation has the capability or access to it. But without Desirability, there is no genuine human need or want being met; without Viability, the economics do not work. Technology-push in its purest form: building what can be built, not what is needed or worth building.',
    example: 'An internal platform the technology team can deploy without difficulty, that solves a problem real users do not have, and that generates no revenue or meaningful value in return.',
  },
  {
    id: 'v',
    hitX: 460, hitY: 264, hitR: 28,
    label: 'VIABILITY',
    sublabel: 'Financially sound, but that is all',
    zone: 'void',
    headline: 'The numbers work, but there is no demand and no path to delivery.',
    body: 'A Viability-only idea might produce margin on paper, but it satisfies no genuine human need (no Desirability) and cannot actually be executed (no Feasibility). This is the rarest zone in practice, usually it signals a financial model built around hypothetical numbers, or a pivot toward a market that is economically attractive but fundamentally misunderstood.',
    example: 'A business model that pencils out on a spreadsheet, targeting a market that appears large, but that the team cannot serve and that customers do not actually want served this way.',
  },
  {
    id: 'df',
    hitX: 291, hitY: 155, hitR: 28,
    label: 'D + F',
    sublabel: 'Love without sustainability',
    zone: 'trap',
    headline: 'People love it and the team can build it, but the economics are fatal.',
    body: 'This is the most common and most expensive trap in product and service development. Desirability and Feasibility are both present: real people want the thing, and the organisation can deliver it. What is missing is Viability: the unit economics do not work. The cost to serve exceeds what customers will pay, or the competitive dynamics erode margin to zero. Teams can spend years building something loved and deliverable before the economics catch up with them.',
    example: 'A premium on-demand service that customers adore and operations can fulfil, but where the labour cost to deliver each unit exceeds the price any customer will pay, no matter the volume.',
  },
  {
    id: 'dv',
    hitX: 409, hitY: 155, hitR: 28,
    label: 'D + V',
    sublabel: 'Promise without capability',
    zone: 'trap',
    headline: 'Customers want it and it would make money, but the organisation cannot do it.',
    body: 'Desirability and Viability align: the opportunity is real, customers would pay, and the economics work. What is absent is Feasibility: the organisation lacks the technical capability, operational capacity, or talent to deliver. This trap is particularly dangerous because the market signal and the financial model are both correct. The failure is internal: the capability to capture the opportunity does not yet exist.',
    example: 'A highly personalised service with strong willingness to pay, that requires real-time data capability or operational precision the organisation has not yet built and cannot rapidly acquire.',
  },
  {
    id: 'fv',
    hitX: 350, hitY: 248, hitR: 22,
    label: 'F + V',
    sublabel: 'Product without a market',
    zone: 'trap',
    headline: 'Efficient, profitable, and something nobody wants.',
    body: 'Feasibility and Viability are present: the organisation can build this and the financials work. But without Desirability, there is no genuine human need at the centre. The classic "solution in search of a problem," executed with operational efficiency and reasonable margins on a product the market does not value. Often the result of starting from capability or financial opportunity rather than from a real user need.',
    example: 'An operational capability that generates positive unit economics and that the team can execute flawlessly, for a problem that the target customers have not prioritised, or have already solved another way.',
  },
  {
    id: 'center',
    hitX: CTR_X, hitY: CTR_Y, hitR: 28,
    label: 'BREAKTHROUGH',
    sublabel: 'Desirable · Feasible · Viable',
    zone: 'good',
    headline: 'All three lenses align. This is what you are looking for.',
    body: 'A Balanced Breakthrough sits at the intersection of all three circles: people genuinely want it (Desirability), the organisation can reliably deliver it (Feasibility), and the economics work sustainably (Viability). Reaching the centre is not an accident. It requires explicitly testing each lens and being willing to kill or reshape ideas that pass only two. Most promising ideas live in one of the pairwise overlaps, not the centre. The discipline is identifying which lens is missing and either filling that gap or changing the idea.',
    example: 'A service that addresses a genuine unmet need, that the organisation has the operational capability to deliver consistently, and where the price customers will pay covers the cost to serve with margin left to sustain and improve it.',
  },
]

export default function BBInteractive() {
  const [active, setActive] = useState<RegionId | null>(null)
  const [focused, setFocused] = useState<RegionId | null>(null)
  const [liveText, setLiveText] = useState('')
  const prefersReduced = useReducedMotion()

  const activeRegion = REGIONS.find(r => r.id === active) ?? null

  function select(id: RegionId) {
    const next = active === id ? null : id
    setActive(next)
    const region = REGIONS.find(r => r.id === id)!
    setLiveText(next ? `${region.label} selected: ${region.headline}` : 'Selection cleared')
  }

  const centerActive = active === 'center'
  // A circle is "involved" when the active region is one of its zones
  const dInvolved = !active || ['d', 'df', 'dv', 'center'].includes(active)
  const fInvolved = !active || ['f', 'df', 'fv', 'center'].includes(active)
  const vInvolved = !active || ['v', 'dv', 'fv', 'center'].includes(active)

  // Per-circle visual state: selected circle lights up; uninvolved circles recede
  type CS = { fill: string; stroke: string; sw: number; opacity: number }
  function circleState(involved: boolean, selected: boolean): CS {
    if (centerActive) return { fill: `${PLUM}0.04)`, stroke: `${PLUM}0.20)`, sw: 1.0, opacity: 0.22 }
    if (!active)      return { fill: `${PLUM}0.07)`, stroke: `${PLUM}0.55)`, sw: 1.4, opacity: 1.0 }
    if (selected)     return { fill: `${PLUM}0.24)`, stroke: `${PLUM}1)`,    sw: 2.5, opacity: 1.0 }
    if (involved)     return { fill: `${PLUM}0.14)`, stroke: `${PLUM}0.80)`, sw: 2.0, opacity: 1.0 }
    return              { fill: `${PLUM}0.03)`, stroke: `${PLUM}0.15)`, sw: 1.0, opacity: 0.18 }
  }

  const dCS = circleState(dInvolved, active === 'd')
  const fCS = circleState(fInvolved, active === 'f')
  const vCS = circleState(vInvolved, active === 'v')
  const centerGlow = centerActive ? 1.0 : active ? 0.18 : 0.65

  // Label opacity: full when the label's circle is involved, dim when not
  const dLabelOp = !active || dInvolved ? 1.0 : 0.20
  const fLabelOp = !active || fInvolved ? 1.0 : 0.20
  const vLabelOp = !active || vInvolved ? 1.0 : 0.20
  // BREAKTHROUGH dims when any non-center region is active
  const ctLabelOp = !active || centerActive ? 1.0 : 0.20

  const fade = prefersReduced ? { duration: 0 } : { duration: 0.22 }

  return (
    <div className="w-full space-y-6" style={{ position: 'relative' }}>
      {/* Screen-reader live region */}
      <div aria-live="polite" aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        {liveText}
      </div>

      {/* Instruction */}
      <p className="font-mono uppercase tracking-widest"
        style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.55)` }}>
        Click any zone to explore what lives there
      </p>

      {/* SVG */}
      <div className="w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', cursor: 'pointer' }}
          aria-label="Interactive DFV Venn diagram, click a zone to learn what kind of idea lives there">
          <defs>
            <filter id="bb-int-plum-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${PLUM}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="bb-int-center-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
              <feFlood floodColor={`${PLUM}0.65)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="bb-int-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${AMBER}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="bb-int-center-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`${PLUM}0.32)`} />
              <stop offset="100%" stopColor={`${PLUM}0.06)`} />
            </radialGradient>
          </defs>

          {/* D circle */}
          <motion.circle cx={D_CX} cy={D_CY} r={R}
            animate={{ fill: dCS.fill, stroke: dCS.stroke, strokeWidth: dCS.sw, opacity: dCS.opacity }}
            transition={fade}
            style={{ filter: 'url(#bb-int-plum-glow)' }}
          />
          {/* F circle */}
          <motion.circle cx={F_CX} cy={F_CY} r={R}
            animate={{ fill: fCS.fill, stroke: fCS.stroke, strokeWidth: fCS.sw, opacity: fCS.opacity }}
            transition={fade}
            style={{ filter: 'url(#bb-int-plum-glow)' }}
          />
          {/* V circle */}
          <motion.circle cx={V_CX} cy={V_CY} r={R}
            animate={{ fill: vCS.fill, stroke: vCS.stroke, strokeWidth: vCS.sw, opacity: vCS.opacity }}
            transition={fade}
            style={{ filter: 'url(#bb-int-plum-glow)' }}
          />

          {/* Center glow */}
          <motion.circle
            cx={CTR_X} cy={CTR_Y}
            fill="url(#bb-int-center-fill)"
            stroke={`${PLUM}0.45)`}
            strokeWidth={0.8}
            animate={{ opacity: centerGlow, r: centerActive ? 42 : 34 }}
            transition={fade}
            style={{ filter: 'url(#bb-int-center-glow)' }}
          />

          {/* Circle labels - animate opacity with their circle's involvement */}
          {([
            { x: D_CX, y: D_CY - 48, main: 'DESIRABILITY', sub: 'do people want it?', anchor: 'middle' as const, op: dLabelOp },
            { x: F_CX - 58, y: F_CY + 5, main: 'FEASIBILITY', sub: 'can we build it?', anchor: 'end' as const, op: fLabelOp },
            { x: V_CX + 58, y: V_CY + 5, main: 'VIABILITY', sub: 'does it sustain us?', anchor: 'start' as const, op: vLabelOp },
          ]).map(({ x, y, main, sub, anchor, op }) => (
            <motion.g key={main} animate={{ opacity: op }} transition={fade}>
              <text x={x} y={y} textAnchor={anchor}
                fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.13em"
                fill={`${PLUM_TEXT}0.99)`} style={{ userSelect: 'none' }}>{main}</text>
              <text x={x} y={y + 14} textAnchor={anchor}
                fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${PLUM_TEXT}0.926)`} style={{ userSelect: 'none' }}>{sub}</text>
            </motion.g>
          ))}

          {/* BREAKTHROUGH label - dims when a non-center region is active */}
          <motion.g animate={{ opacity: ctLabelOp }} transition={fade}>
            <text x={CTR_X} y={CTR_Y - 4} textAnchor="middle"
              fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.13em" fontWeight="600"
              fill="rgba(255,255,255,0.95)"
              style={{ userSelect: 'none', filter: `drop-shadow(0 0 8px ${PLUM_TEXT}0.948))` }}>
              BREAK
            </text>
            <text x={CTR_X} y={CTR_Y + 8} textAnchor="middle"
              fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.13em" fontWeight="600"
              fill="rgba(255,255,255,0.95)"
              style={{ userSelect: 'none', filter: `drop-shadow(0 0 8px ${PLUM_TEXT}0.948))` }}>
              THROUGH
            </text>
          </motion.g>

          {/* Focus ring - keyboard-visible indicator drawn under hit areas */}
          {focused && (() => {
            const reg = REGIONS.find(r => r.id === focused)!
            return (
              <circle
                cx={reg.hitX} cy={reg.hitY} r={reg.hitR + 6}
                fill="none"
                stroke={reg.zone === 'trap' ? `${AMBER}0.80)` : reg.zone === 'good' ? `${PLUM}0.90)` : `${PLUM}0.70)`}
                strokeWidth={2}
                strokeDasharray="5 3"
                style={{ pointerEvents: 'none' }}
              />
            )
          })()}

          {/* Hit areas - single circles + center first, pairwise overlaps on top */}
          {(['d', 'f', 'v', 'center', 'df', 'dv', 'fv'] as RegionId[]).map(id => {
            const region = REGIONS.find(r => r.id === id)!
            return (
              <circle
                key={id}
                cx={region.hitX}
                cy={region.hitY}
                r={region.hitR}
                fill="transparent"
                stroke="none"
                tabIndex={0}
                role="button"
                aria-pressed={active === id}
                aria-label={`${region.label}: ${region.sublabel}`}
                style={{ cursor: 'pointer' }}
                onClick={() => select(id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(id) } }}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
              />
            )
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeRegion && (
          <motion.div
            key={activeRegion.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.20 }}
            className="rounded-xl p-5 space-y-3"
            style={{
              background: activeRegion.zone === 'good'
                ? `${PLUM}0.08)`
                : activeRegion.zone === 'trap'
                  ? `${AMBER}0.06)`
                  : 'rgba(255,255,255,0.04)',
              border: `1px solid ${
                activeRegion.zone === 'good' ? `${PLUM}0.28)` :
                activeRegion.zone === 'trap' ? `${AMBER}0.25)` :
                'rgba(255,255,255,0.10)'
              }`,
              borderLeft: `3px solid ${
                activeRegion.zone === 'good' ? `${PLUM}0.65)` :
                activeRegion.zone === 'trap' ? `${AMBER}0.55)` :
                'rgba(255,255,255,0.20)'
              }`,
            }}>
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="font-mono uppercase tracking-widest font-semibold"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: activeRegion.zone === 'good' ? `${PLUM}1)` :
                         activeRegion.zone === 'trap' ? `${AMBER}0.85)` :
                         'rgba(255,255,255,0.55)',
                }}>
                {activeRegion.label}
              </p>
              <span className="font-mono uppercase tracking-widest"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.30)' }}>
                {activeRegion.sublabel}
              </span>
              {activeRegion.zone === 'trap' && (
                <span className="font-mono uppercase tracking-widest rounded-full px-2 py-0.5"
                  style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)`, background: `${AMBER}0.10)`, border: `1px solid ${AMBER}0.22)` }}>
                  FAILURE MODE
                </span>
              )}
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.72)', lineHeight: 'var(--leading-relaxed)', fontWeight: 600 }}>
              {activeRegion.headline}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.52)', lineHeight: 'var(--leading-relaxed)' }}>
              {activeRegion.body}
            </p>
            <div className="rounded-lg p-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.28)' }}>
                Example
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                {activeRegion.example}
              </p>
            </div>
          </motion.div>
        )}
        {!activeRegion && (
          <motion.div
            key="idle"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="rounded-xl p-5 text-center"
            style={{ border: '1px dashed rgba(255,255,255,0.10)' }}>
            <p className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.22)' }}>
              Select a zone above: centre, overlap, or single circle
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
