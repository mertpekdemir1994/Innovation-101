'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const BRICK_TEXT = 'rgba(183,145,135,'  // brightened text-safe variant of BRICK
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

function textSafe(c: string) { return c === INDIGO ? INDIGO_TEXT : c === BRICK ? BRICK_TEXT : c }

const SVG_W = 700, SVG_H = 290
const FE_X = 92, BE_X = 400, CELL_W = 288
const FE_CX = FE_X + CELL_W / 2
const BE_CX = BE_X + CELL_W / 2

// Extra top padding accommodates the two-line AI-mode header annotation
const L = {
  1: { y: 196, h: 56, cy: 224 },
  2: { y: 124, h: 56, cy: 152 },
  3: { y: 54,  h: 56, cy: 82  },
}

type Mode = 'human' | 'ai'
type LayerId = 1 | 2 | 3

// AI mode state for each cell
// Human mode (today): fe-l1=partial, be-l1=gap, fe-l2=partial, be-l2=partial, fe-l3=have, be-l3=have
// AI mode: fe-l2 GENUINELY CLOSES (indigo), be-l1 DECEPTIVE FILL (looks closed, hollow inside)

interface CellDef {
  id: string
  layer: LayerId
  seg: 'fe' | 'be'
  x: number; cy: number; cx: number
  label: string
  humanState: 'have' | 'partial' | 'gap'
  aiState: 'have' | 'partial' | 'gap' | 'deceptive' | 'indigo'
}

const CELLS: CellDef[] = [
  { id: 'fe-l1', layer: 1, seg: 'fe', x: FE_X, cy: 224, cx: FE_CX, label: 'DATA QUALITY',        humanState: 'partial',   aiState: 'partial'   },
  { id: 'be-l1', layer: 1, seg: 'be', x: BE_X, cy: 224, cx: BE_CX, label: 'PIPELINE RELIABILITY', humanState: 'gap',       aiState: 'deceptive' },
  { id: 'fe-l2', layer: 2, seg: 'fe', x: FE_X, cy: 152, cx: FE_CX, label: 'REAL-TIME SERVING',   humanState: 'partial',   aiState: 'indigo'    },
  { id: 'be-l2', layer: 2, seg: 'be', x: BE_X, cy: 152, cx: BE_CX, label: 'LIVE SYSTEM OPS',     humanState: 'partial',   aiState: 'partial'   },
  { id: 'fe-l3', layer: 3, seg: 'fe', x: FE_X, cy: 82,  cx: FE_CX, label: 'PERSONALISATION',     humanState: 'have',      aiState: 'have'      },
  { id: 'be-l3', layer: 3, seg: 'be', x: BE_X, cy: 82,  cx: BE_CX, label: 'REAL-TIME RECS',      humanState: 'have',      aiState: 'have'      },
]

const CARDS = [
  {
    color: INDIGO,
    badge: 'Genuine closure',
    head: 'AI genuinely closes some capability gaps, and this is real.',
    body: 'Capabilities that once required a specialist (analytical work, prototyping, a range of technical production tasks) are now substantially accessible to a small team with AI tools. An honest capability map today will find that several gaps that would have been red three years ago are now amber or green. Take the win. Refusing to update the map would be its own dishonesty.',
  },
  {
    color: AMBER,
    badge: 'Deceptive fill',
    head: 'AI produces a convincing imitation of a capability it has not closed.',
    body: 'Pipeline reliability appeared to close: code was being generated, quickly, and it looked competent. The honest question: could anyone in the building JUDGE that work: tell good from bad, catch a silent error, notice when the tool was confidently wrong? Nobody could. That is not a capability. It is access to an output. The difference is invisible until the output is wrong, at which point there is nobody who can tell, or fix it.',
  },
  {
    color: AMBER,
    badge: 'Cannot map you',
    head: 'AI cannot map your organization\'s actual capability.',
    body: 'Real capability is tacit, political, and largely undocumented: who can actually do the thing, what happens when they are away, which process only works because someone quietly compensates for it. None of that is written down, and AI has no access to it. It can offer a generic capability taxonomy to start from. It cannot tell you the truth about your own building.',
  },
  {
    color: BRICK,
    badge: 'Honest synthesis',
    head: 'Update the map honestly. Hold "CAN WE JUDGE THIS?" as the test.',
    body: 'For every gap that AI appears to close, ask: can we judge this work? Can we tell good from bad, catch the error, and take responsibility for the result? If the answer is no, the honest state is PARTIAL at best, and at the FOUNDATIONAL layer, an un-judgeable dependency is silently carrying everything above it. That is the most dangerous capability map: one whose foundation is a tool nobody in the organization can evaluate.',
  },
]

export default function CMAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  function cellFill(cell: CellDef): string {
    const s = isAI ? cell.aiState : cell.humanState
    if (s === 'indigo')    return `${INDIGO}0.14)`
    if (s === 'deceptive') return `${BRICK}0.13)`   // looks like HAVE IT on surface
    if (s === 'have')      return `${BRICK}0.13)`
    if (s === 'partial')   return `${AMBER}0.07)`
    return 'rgba(10,5,4,0.72)'
  }
  function cellStroke(cell: CellDef): string {
    const s = isAI ? cell.aiState : cell.humanState
    if (s === 'indigo')    return `${INDIGO}0.70)`
    if (s === 'deceptive') return `${BRICK}0.68)`   // same as HAVE IT - the deception
    if (s === 'have')      return `${BRICK}0.70)`
    if (s === 'partial')   return `${AMBER}0.58)`
    return `${AMBER}0.42)`
  }
  function cellDash(cell: CellDef): string {
    const s = isAI ? cell.aiState : cell.humanState
    if (s === 'have' || s === 'indigo' || s === 'deceptive') return ''
    if (s === 'partial') return '6 3'
    return '4 4'
  }
  function cellLabel(cell: CellDef): string {
    const s = isAI ? cell.aiState : cell.humanState
    if (s === 'indigo')    return `${INDIGO}0.82)`
    if (s === 'deceptive') return `${BRICK}0.80)`   // looks like HAVE IT
    if (s === 'have')      return `${BRICK}0.82)`
    return `${AMBER}0.76)`
  }
  function stateText(cell: CellDef): string {
    const s = isAI ? cell.aiState : cell.humanState
    if (s === 'indigo')    return 'AI CLOSED ↑'
    if (s === 'deceptive') return 'HAVE IT'          // the lie
    if (s === 'have')      return 'HAVE IT'
    if (s === 'partial')   return 'PARTIAL'
    return 'GAP'
  }
  function stateTagColor(cell: CellDef): string {
    const s = isAI ? cell.aiState : cell.humanState
    if (s === 'indigo') return `${INDIGO}0.70)`
    if (s === 'deceptive') return `${BRICK}0.55)`
    if (s === 'have') return `${BRICK}0.52)`
    return `${AMBER}0.55)`
  }
  function glowFilter(cell: CellDef): string | undefined {
    const s = isAI ? cell.aiState : cell.humanState
    if (s === 'indigo')    return 'url(#cm-ai-indigo-glow)'
    if (s === 'gap')       return 'url(#cm-ai-amber-glow)'
    if (s === 'deceptive' && isAI) return 'url(#cm-ai-glow)'
    return undefined
  }

  return (
    <div className="w-full space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-2 flex-wrap">
        {(['human', 'ai'] as Mode[]).map(m => (
          <button key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.85)` : `${BRICK}0.85)`
                : 'transparent',
              color: mode === m ? '#fff'
                : m === 'ai' ? `${INDIGO_TEXT}0.90)` : `${BRICK_TEXT}0.90)`,
              border: `1.5px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`
                : m === 'ai' ? `${INDIGO}0.30)` : `${BRICK}0.30)`}`,
            }}>
            {m === 'human' ? 'Human' : 'With AI'}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label={isAI
          ? 'AI mode: REAL-TIME SERVING genuinely closes (indigo). PIPELINE RELIABILITY shows as HAVE IT, but this is a deceptive fill: the surface appears solid, but the underlying capability is still absent. Nobody in the organization can judge the AI output.'
          : 'Human mode: the capability map in its actual state. DATA QUALITY partial, PIPELINE RELIABILITY a genuine gap.'}
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block' }}
      >
        <defs>
          <filter id="cm-ai-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${BRICK}0.30)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cm-ai-indigo-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${INDIGO}0.40)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cm-ai-amber-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="cm-ai-up" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,6 L3,0 L6,6 Z" fill={`${BRICK}0.30)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Header annotation */}
        {isAI && (
          <text x={SVG_W / 2} y={16} textAnchor="middle" fontSize="11"
            fontFamily="var(--font-mono)" letterSpacing="0.02em" fontWeight="600"
            fill={`${AMBER}0.72)`} style={{ userSelect: 'none' }}>
            ⚠ PIPELINE RELIABILITY: SOLID ON THE SURFACE, HOLLOW UNDERNEATH
          </text>
        )}

        {/* Segment labels */}
        <text x={FE_CX} y={isAI ? 32 : 16} textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
          fill={`rgba(183,145,135,0.885)`} style={{ userSelect: 'none' }}>FRONT-END</text>
        <text x={BE_CX} y={isAI ? 32 : 16} textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
          fill={`rgba(183,145,135,0.885)`} style={{ userSelect: 'none' }}>BACK-END</text>
        <line x1={390} y1={isAI ? 38 : 22} x2={390} y2={254} stroke={`${BRICK}0.10)`} strokeWidth={0.8} />

        {/* Layer labels */}
        {([1, 2, 3] as LayerId[]).map(ln => (
          <text key={ln} x={4} y={L[ln].y + 15} textAnchor="start"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="-0.01em" fontWeight="600"
            fill={`rgba(183,145,135,0.866)`} style={{ userSelect: 'none' }}>
            {ln === 1 ? 'FOUNDATIONAL' : ln === 2 ? 'OPERATIONAL' : 'EPIC-LEVEL'}
          </text>
        ))}

        {/* Upward arrows */}
        <line x1={FE_CX} y1={190} x2={FE_CX} y2={132} stroke={`${BRICK}0.25)`} strokeWidth={0.9} markerEnd="url(#cm-ai-up)" />
        <line x1={BE_CX} y1={190} x2={BE_CX} y2={132}
          stroke={isAI ? `${AMBER}0.38)` : `${AMBER}0.28)`} strokeWidth={0.9} markerEnd="url(#cm-ai-up)" />
        <line x1={FE_CX} y1={118} x2={FE_CX} y2={62} stroke={`${BRICK}0.22)`} strokeWidth={0.9} markerEnd="url(#cm-ai-up)" />
        <line x1={BE_CX} y1={118} x2={BE_CX} y2={62}
          stroke={isAI ? `${AMBER}0.35)` : `${AMBER}0.25)`} strokeWidth={0.9} markerEnd="url(#cm-ai-up)" />

        {/* Cells */}
        {CELLS.map(cell => {
          const s = isAI ? cell.aiState : cell.humanState
          const isDeceptive = isAI && s === 'deceptive'
          return (
            <g key={cell.id}>
              <rect
                x={cell.x} y={L[cell.layer].y} width={CELL_W} height={L[cell.layer].h}
                fill={cellFill(cell)}
                stroke={cellStroke(cell)}
                strokeWidth={1.6}
                strokeDasharray={cellDash(cell)}
                rx={3}
                filter={glowFilter(cell)}
              />
              {/* Deceptive fill: hollow inner rect showing the void beneath */}
              {isDeceptive && (
                <>
                  <rect
                    x={cell.x + 12} y={L[cell.layer].y + 14}
                    width={CELL_W - 24} height={L[cell.layer].h - 28}
                    fill="rgba(4,2,1,0.80)"
                    stroke={`${AMBER}0.35)`}
                    strokeWidth={0.8}
                    strokeDasharray="3 3"
                    rx={2}
                  />
                  <text x={cell.cx} y={cell.cy + 2} textAnchor="middle" dominantBaseline="middle"
                    fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
                    fill={`${AMBER_TEXT}0.861)`} style={{ userSelect: 'none' }}>
                    OUTPUT, NOT CAPABILITY
                  </text>
                </>
              )}
              {/* Capability label (not shown when deceptive fill takes over) */}
              {!isDeceptive && (
                <>
                  <text x={cell.cx} y={cell.cy - 6} textAnchor="middle" dominantBaseline="middle"
                    fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                    fill={cellLabel(cell)} style={{ userSelect: 'none' }}>
                    {cell.label}
                  </text>
                  <text x={cell.cx} y={cell.cy + 11} textAnchor="middle" dominantBaseline="middle"
                    fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
                    fill={stateTagColor(cell)} style={{ userSelect: 'none' }}>
                    {stateText(cell)}
                  </text>
                </>
              )}
              {/* Deceptive cell: show label above, with state appearing solid */}
              {isDeceptive && (
                <text x={cell.cx} y={L[cell.layer].y + 10} textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                  fill={`rgba(183,145,135,0.926)`} style={{ userSelect: 'none' }}>
                  {cell.label}
                </text>
              )}
            </g>
          )
        })}

        {/* Caption */}
        <text x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.02em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>
          {isAI
            ? 'Can we judge this work? If not, the honest state is PARTIAL, not HAVE IT.'
            : 'Human view: the map as it honestly is.'}
        </text>
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        <motion.div key={mode}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <div key={i} className="rounded-lg p-5"
              style={{
                border: `1px solid ${c.color}0.22)`,
                background: `${c.color}0.05)`,
                opacity: isAI ? 1 : (i === 0 ? 0.45 : 1),
              }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono tracking-widest px-2 py-0.5 rounded-full"
                  style={{ fontSize: 'var(--text-2xs)', background: `${c.color}0.12)`, color: `${textSafe(c.color)}0.85)`, border: `1px solid ${c.color}0.25)` }}>
                  {c.badge}
                </span>
              </div>
              <p className="font-semibold mb-2"
                style={{ fontSize: 'var(--text-sm)', color: `${textSafe(c.color)}0.90)` }}>
                {c.head}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.70)', lineHeight: 'var(--leading-relaxed)' }}>
                {c.body}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
