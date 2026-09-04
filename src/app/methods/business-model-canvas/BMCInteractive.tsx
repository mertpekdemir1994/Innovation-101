'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

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
type Scenario = 'none' | 'segment' | 'channel'

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

interface BlockDetail {
  role: string
  dependsOn: string[]
  hypothesis: string
}

const DETAILS: Record<BlockId, BlockDetail> = {
  kp: {
    role: 'Who helps you create and deliver: the external network without which the model cannot run.',
    dependsOn: ['Key Activities', 'Key Resources'],
    hypothesis: 'We assume these partners will commit to working with us on terms that make the model viable.',
  },
  ka: {
    role: 'What the business must do to deliver its value proposition: the activities it cannot outsource.',
    dependsOn: ['Value Propositions', 'Key Resources', 'Cost Structure'],
    hypothesis: 'We assume we can perform these activities at the quality and scale the value proposition requires.',
  },
  kr: {
    role: 'What the business must have to perform its key activities: assets, people, IP, capital.',
    dependsOn: ['Key Activities', 'Cost Structure'],
    hypothesis: 'We assume these resources are available and cost what we have estimated.',
  },
  vp: {
    role: 'What you offer and why a specific customer segment chooses it over alternatives.',
    dependsOn: ['Customer Segments', 'Key Activities', 'Key Resources'],
    hypothesis: 'We assume this segment will pay for this offer and will prefer it to what exists.',
  },
  cr: {
    role: 'How you acquire, retain, and deepen the relationship: the nature of the bond.',
    dependsOn: ['Customer Segments', 'Channels', 'Revenue Streams'],
    hypothesis: 'We assume customers want this type of relationship, and that we can afford it at the unit economics we have assumed.',
  },
  ch: {
    role: 'How you reach customers and deliver the value proposition: the route to market.',
    dependsOn: ['Customer Segments', 'Customer Relationships', 'Cost Structure'],
    hypothesis: 'We assume this channel reaches the segment and converts at the rate the revenue model requires.',
  },
  cs: {
    role: 'Who the business serves, and who it deliberately does not. The foundation of every other block.',
    dependsOn: ['Value Propositions', 'Customer Relationships', 'Channels'],
    hypothesis: 'We assume this segment exists, is reachable, and will behave as we have assumed.',
  },
  cost: {
    role: 'What it costs to operate the whole business model, driven by activities, resources, and channels.',
    dependsOn: ['Key Activities', 'Key Resources', 'Key Partners', 'Channels'],
    hypothesis: 'We assume total cost of delivery is lower than what the revenue streams will bring in.',
  },
  rev: {
    role: 'How and what customers pay: the mechanism by which the model captures the value it creates.',
    dependsOn: ['Customer Segments', 'Channels', 'Value Propositions'],
    hypothesis: 'We assume customers will pay this amount, via this mechanism, at sufficient volume.',
  },
}

// Blocks affected by each scenario
const SCENARIO_AFFECTED: Record<'segment' | 'channel', BlockId[]> = {
  segment: ['vp', 'cr', 'ch'],
  channel: ['cost'],
}

export default function BMCInteractive() {
  const [selected, setSelected] = useState<BlockId | null>(null)
  const [scenario, setScenario] = useState<Scenario>('none')
  const prefersReduced = useReducedMotion()
  const tr = prefersReduced ? { duration: 0 } : { duration: 0.2 }

  const SVG_H = 270

  function blockOpacity(k: BlockId): number {
    if (scenario === 'segment') {
      if (SCENARIO_AFFECTED.segment.includes(k)) return 1
      if (k === 'cs') return 1
      return 0.30
    }
    if (scenario === 'channel') {
      if (k === 'ch') return 1
      if (k === 'cost') return 1
      return 0.30
    }
    if (!selected) return 1
    if (k === selected) return 1
    if (DETAILS[selected].dependsOn.some(dep =>
      dep.toLowerCase().replace(/\s+/g, '').includes(k === 'kp' ? 'partner' : k === 'ka' ? 'activit' : k === 'kr' ? 'resource' : k === 'vp' ? 'proposition' : k === 'cr' ? 'relationship' : k === 'ch' ? 'channel' : k === 'cs' ? 'segment' : k === 'cost' ? 'cost' : 'revenue')
    )) return 0.85
    return 0.28
  }

  function blockFill(k: BlockId): string {
    if (scenario === 'channel' && k === 'cost') return `${AMBER}0.22)`
    if (scenario === 'segment' && SCENARIO_AFFECTED.segment.includes(k)) return `${AMBER}0.12)`
    if (k === selected) return `${PLUM}0.22)`
    if (k === 'vp') return `${PLUM}0.14)`
    return `${PLUM}0.06)`
  }

  function blockStroke(k: BlockId): string {
    if (scenario === 'channel' && k === 'cost') return `${AMBER}0.90)`
    if (scenario === 'segment' && SCENARIO_AFFECTED.segment.includes(k)) return `${AMBER}0.65)`
    if (k === selected) return `${PLUM}0.90)`
    if (k === 'vp') return `${PLUM}0.60)`
    return `${PLUM}0.32)`
  }

  function blockStrokeW(k: BlockId): number {
    if (scenario === 'channel' && k === 'cost') return 2.0
    if (scenario === 'segment' && SCENARIO_AFFECTED.segment.includes(k)) return 1.6
    if (k === selected) return 1.8
    if (k === 'vp') return 1.4
    return 0.9
  }

  function handleClick(k: BlockId) {
    if (scenario !== 'none') { setScenario('none'); setSelected(k); return }
    setSelected(prev => prev === k ? null : k)
  }

  function handleKey(e: React.KeyboardEvent, k: BlockId) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(k) }
  }

  const detail = selected && scenario === 'none' ? DETAILS[selected] : null

  return (
    <div className="w-full">
      {/* Scenario buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => { setScenario(s => s === 'segment' ? 'none' : 'segment'); setSelected(null) }}
          aria-pressed={scenario === 'segment'}
          className="rounded-full px-4 py-2 text-xs font-semibold transition-all"
          style={{
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            background: scenario === 'segment' ? `${AMBER}0.14)` : 'transparent',
            color: scenario === 'segment' ? `${AMBER}0.90)` : `${AMBER}0.70)`,
            border: `1px solid ${scenario === 'segment' ? `${AMBER}0.55)` : `${AMBER}0.25)`}`,
          }}>
          CHANGE SEGMENT →
        </button>
        <button
          onClick={() => { setScenario(s => s === 'channel' ? 'none' : 'channel'); setSelected(null) }}
          aria-pressed={scenario === 'channel'}
          className="rounded-full px-4 py-2 text-xs font-semibold transition-all"
          style={{
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            background: scenario === 'channel' ? `${AMBER}0.14)` : 'transparent',
            color: scenario === 'channel' ? `${AMBER}0.90)` : `${AMBER}0.70)`,
            border: `1px solid ${scenario === 'channel' ? `${AMBER}0.55)` : `${AMBER}0.25)`}`,
          }}>
          CHANGE CHANNEL (PREMIUM) →
        </button>
        {(selected || scenario !== 'none') && (
          <button
            onClick={() => { setSelected(null); setScenario('none') }}
            className="rounded-full px-4 py-2 text-xs"
            style={{
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              color: 'var(--color-dark-muted)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>
            RESET
          </button>
        )}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block' }}
        role="group"
        aria-label="Interactive Business Model Canvas. Click any block to explore what it holds and what it depends on. Use the scenario buttons to see how changing one block propagates to others, and how a premium channel change breaks the cost structure."
      >
        <defs>
          <filter id="bmc-int-plum-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${PLUM}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bmc-int-amber-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${AMBER}0.60)`} result="color" />
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
          const isBreaking = scenario === 'channel' && k === 'cost'
          const isAffected = scenario === 'segment' && SCENARIO_AFFECTED.segment.includes(k)
          const glowFilter = (isBreaking || isAffected) ? 'url(#bmc-int-amber-glow)' : k === selected ? 'url(#bmc-int-plum-glow)' : 'none'
          const textColor = isBreaking ? `${AMBER}0.95)` : isAffected ? `${AMBER}0.88)` : k === selected ? `${PLUM_TEXT}1)` : k === 'vp' ? `${PLUM_TEXT}0.88)` : 'rgba(255,255,255,0.65)'

          return (
            <motion.g
              key={k}
              animate={{ opacity: blockOpacity(k) }}
              transition={tr}
              onClick={() => handleClick(k)}
              onKeyDown={(e) => handleKey(e, k)}
              tabIndex={0}
              role="button"
              aria-pressed={selected === k}
              aria-label={`${LABELS[k].join(' ').trim()} block`}
              style={{ cursor: 'pointer' }}>
              <motion.rect
                x={b.x} y={b.y} width={b.w} height={b.h} rx={3}
                animate={{ fill: blockFill(k), stroke: blockStroke(k), strokeWidth: blockStrokeW(k) }}
                transition={tr}
                style={{ filter: glowFilter }}
              />
              <text x={b.x + b.w / 2} y={hasTwo ? midY - (isAffected || isBreaking ? 14 : 8) : midY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11"
                fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                fill={textColor} style={{ userSelect: 'none', pointerEvents: 'none' }}>
                {line1}
              </text>
              {hasTwo && (
                <text x={b.x + b.w / 2} y={midY + (isAffected || isBreaking ? 2 : 10)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                  fill={textColor} style={{ userSelect: 'none', pointerEvents: 'none' }}>
                  {line2}
                </text>
              )}
              {/* BREAK label on cost when channel scenario active */}
              {isBreaking && (
                <text x={b.x + b.w / 2} y={b.y + b.h - 10}
                  textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fontWeight="600"
                  fill={`${AMBER}0.85)`} style={{ userSelect: 'none', pointerEvents: 'none' }}>
                  ⚠ ECONOMICS BREAK
                </text>
              )}
              {/* AFFECTED label on segment-affected blocks */}
              {isAffected && (
                <text x={b.x + b.w / 2} y={b.y + b.h - 10}
                  textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                  fill={`${AMBER}0.75)`} style={{ userSelect: 'none', pointerEvents: 'none' }}>
                  MUST CHANGE
                </text>
              )}
            </motion.g>
          )
        })}

        {/* Idle hint */}
        {scenario === 'none' && !selected && (
          <text x={SVG_W / 2} y={SVG_H - 10} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>
            CLICK ANY BLOCK, OR USE A SCENARIO ABOVE
          </text>
        )}

        {/* Segment scenario annotation */}
        {scenario === 'segment' && (
          <>
            <text x={SVG_W / 2} y={SVG_H - 26} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.01em"
              fill={`${AMBER_TEXT}0.891)`} style={{ userSelect: 'none' }}>
              Teams routinely change the segment and update nothing else,
            </text>
            <text x={SVG_W / 2} y={SVG_H - 10} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.01em"
              fill={`${AMBER_TEXT}0.891)`} style={{ userSelect: 'none' }}>
              which is how a canvas becomes fiction.
            </text>
          </>
        )}

        {/* Channel break annotation */}
        {scenario === 'channel' && (
          <>
            <text x={SVG_W / 2} y={SVG_H - 26} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.01em"
              fill={`${AMBER}0.85)`} style={{ userSelect: 'none' }}>
              The cost of this channel exceeds what the revenue stream brings in.
            </text>
            <text x={SVG_W / 2} y={SVG_H - 10} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.01em"
              fill={`${AMBER}0.85)`} style={{ userSelect: 'none' }}>
              Two blocks cannot both be true.
            </text>
          </>
        )}
      </svg>

      {/* Detail panel - block click */}
      <AnimatePresence mode="wait">
        {detail && (
          <motion.div
            key={selected}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
            transition={tr}
            style={{
              marginTop: '20px',
              padding: '20px 24px',
              background: `${PLUM}0.08)`,
              border: `1px solid ${PLUM}0.28)`,
              borderRadius: '8px',
            }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '0.10em', fontWeight: 600,
              color: `${PLUM_TEXT}1)`, marginBottom: '10px',
            }}>
              {LABELS[selected!].join(' ').trim()}
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.55, marginBottom: '14px' }}>
              {detail.role}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div style={{ padding: '12px 14px', background: `${PLUM}0.08)`, borderRadius: '6px', border: `1px solid ${PLUM}0.18)` }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', color: `${PLUM_TEXT}0.90)`, marginBottom: '6px' }}>
                  DEPENDS ON
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {detail.dependsOn.map(dep => (
                    <li key={dep} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>
                      - {dep}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '12px 14px', background: `${AMBER}0.06)`, borderRadius: '6px', border: `1px solid ${AMBER}0.18)` }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', color: `${AMBER}0.75)`, marginBottom: '6px' }}>
                  UNTESTED HYPOTHESIS
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.6, margin: 0 }}>
                  {detail.hypothesis}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scenario result panels */}
        {scenario === 'segment' && (
          <motion.div
            key="scenario-segment"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            transition={tr}
            style={{
              marginTop: '20px', padding: '20px 24px',
              background: `${AMBER}0.06)`, border: `1px solid ${AMBER}0.22)`, borderRadius: '8px',
            }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.10em', color: `${AMBER}0.80)`, marginBottom: '10px' }}>
              SEGMENT CHANGE: THREE BLOCKS MUST MOVE
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.55, marginBottom: '12px' }}>
              Switching to a different customer segment is never just a segment change. The value proposition must shift
              (a different segment has different jobs and pains), the channels must shift (a different segment is found
              somewhere else), and the customer relationship must shift (a different segment expects a different bond).
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.55, fontStyle: 'italic' }}>
              Teams routinely update the segment block and leave the other three untouched. At that point the canvas
              is describing a business that does not exist.
            </p>
          </motion.div>
        )}

        {scenario === 'channel' && (
          <motion.div
            key="scenario-channel"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            transition={tr}
            style={{
              marginTop: '20px', padding: '20px 24px',
              background: `${AMBER}0.08)`, border: `2px solid ${AMBER}0.45)`, borderRadius: '8px',
            }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.10em', color: `${AMBER}0.90)`, marginBottom: '10px' }}>
              ⚠ THE BREAK: THIS IS THE METHOD
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, marginBottom: '12px' }}>
              Switching to a premium, high-touch channel changes the cost structure. The cost of serving customers
              through this channel now exceeds what the revenue stream brings in. The economics do not work. Two
              blocks cannot both be true at once.
            </p>
            <p style={{ fontSize: '13px', color: `${AMBER}0.75)`, lineHeight: 1.55, fontStyle: 'italic' }}>
              This contradiction is the single most valuable thing the canvas has produced. In a real business it
              shows up as a mysterious inability to make the numbers work. On a canvas it shows up here, on a
              whiteboard, before the P&L tells you the expensive way.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
