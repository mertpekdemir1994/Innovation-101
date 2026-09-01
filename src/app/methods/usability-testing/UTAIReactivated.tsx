'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700, SVG_H = 268
const N_W = 78, N_H = 30, N_CY = 124

const NODES = [
  { id: 'n1', x: 20,  label: 'START'   },
  { id: 'n2', x: 148, label: 'ACCOUNT' },
  { id: 'n3', x: 282, label: 'BILLING' },
  { id: 'n4', x: 416, label: 'CANCEL'  },
  { id: 'n5', x: 548, label: 'DONE ✓' },
]
const NODE_CX = NODES.map(n => n.x + N_W / 2)

const WN_X = 234, WN_Y = 48, WN_W = 78, WN_H = 28
const WN_CX = WN_X + WN_W / 2
const WN_CY = WN_Y + WN_H / 2

const INT_ARROWS = [
  { x1: 102, x2: 144 },
  { x1: 230, x2: 278 },
  { x1: 364, x2: 412 },
  { x1: 498, x2: 544 },
]

const ACTUAL_PATH = [
  'M 59 124',
  'C 95 124 150 128 167 128',
  'L 187 124',
  'C 212 108 248 82 273 62',
  'L 273 62',
  'C 255 84 218 108 187 124',
  'C 222 128 280 130 321 124',
  'C 360 120 385 118 400 119',
].join(' ')

// AI heuristic flags shown on the intended path (AI mode only)
const AI_FLAGS = [
  { x: 187, y: 148, text: 'AI: AMBIGUOUS LABEL', w: 120 },
  { x: 321, y: 148, text: 'AI: MISSING FEEDBACK', w: 126 },
  { x: 455, y: 148, text: 'AI: LOW VISIBILITY', w: 108 },
]

// Friction points (same positions as other components)
const FRICTION_POS = [
  { cx: 187, cy: 124, label: 'HESITATION', lx: 187, ly: 90  },
  { cx: 273, cy: 62,  label: 'WRONG TURN', lx: 338, ly: 46  },
  { cx: 234, cy: 95,  label: 'BACKTRACK',  lx: 160, ly: 78  },
  { cx: 400, cy: 119, label: 'STUCK',      lx: 400, ly: 90  },
]

type Mode = 'human' | 'ai'

export default function UTAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div className="w-full">
      {/* Toggle */}
      <div className="flex gap-2 mb-6">
        {(['human', 'ai'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.85)` : `${BRICK}0.85)`
                : 'transparent',
              color: mode === m ? '#fff'
                : m === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`,
              border: `1.5px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`
                : m === 'ai' ? `${INDIGO}0.30)` : `${BRICK}0.30)`}`,
            }}
          >
            {m === 'human' ? 'Without AI' : 'With AI'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label={isAI
          ? 'AI mode: the intended path turns indigo and three heuristic flags appear showing what AI can review. The actual path (the real person\'s wandering route and friction points) fades to nearly invisible, with a label stating it is not accessible to AI.'
          : 'Human mode: both paths visible, the intended straight white path and the actual brick-colored wandering path with four friction points marked.'}
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', display: 'block' }}
      >
        <defs>
          <filter id="ut-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={isAI ? `${INDIGO}0.30)` : `${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="ut-ai-iarr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z"
              fill={isAI ? `${INDIGO}0.70)` : 'rgba(255,255,255,0.50)'} />
          </marker>
        </defs>

        {/* Background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Legend */}
        <motion.g
          animate={{ opacity: 1 }}
          transition={{ duration: 0.30 }}>
          <line x1={22} y1={22} x2={46} y2={22}
            stroke={isAI ? `${INDIGO}0.75)` : 'rgba(255,255,255,0.45)'} strokeWidth="1.5" />
          <text x={50} y={22} dominantBaseline="middle" fontSize="4.0"
            fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={isAI ? `${INDIGO_TEXT}0.948)` : 'rgba(255,255,255,0.725)'}
            style={{ userSelect: 'none' }}>
            {isAI ? 'AI REVIEWS THIS PATH' : 'INTENDED PATH'}
          </text>
          <line x1={22} y1={34} x2={46} y2={34}
            stroke={isAI ? 'rgba(138,75,60,0.20)' : `${BRICK}0.85)`} strokeWidth="1.5" />
          <text x={50} y={34} dominantBaseline="middle" fontSize="4.0"
            fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={isAI ? 'rgba(183,145,135,0.832)' : `rgba(183,145,135,0.969)`}
            style={{ userSelect: 'none' }}>
            {isAI ? 'NOT ACCESSIBLE TO AI' : 'ACTUAL PATH'}
          </text>
        </motion.g>

        {/* Main nodes */}
        {NODES.map((n, i) => {
          const isUnreached = i >= 3
          return (
            <g key={n.id}>
              <rect x={n.x} y={N_CY - N_H / 2} width={N_W} height={N_H}
                fill={isUnreached ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'}
                stroke={isUnreached ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.28)'}
                strokeWidth="1" rx={3} />
              <text x={NODE_CX[i]} y={N_CY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={isUnreached ? 'rgba(255,255,255,0.61)' : 'rgba(255,255,255,0.80)'}
                style={{ userSelect: 'none' }}>
                {n.label}
              </text>
            </g>
          )
        })}

        {/* NOT REACHED */}
        <text x={521} y={103} textAnchor="middle" dominantBaseline="middle"
          fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
          fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
          NOT REACHED
        </text>

        {/* Wrong-turn node */}
        <motion.g animate={{ opacity: isAI ? 0.10 : 1 }} transition={{ duration: 0.35 }}>
          <rect x={WN_X} y={WN_Y} width={WN_W} height={WN_H}
            fill={`${AMBER}0.07)`} stroke={`${AMBER}0.35)`} strokeWidth="1" rx={3} />
          <text x={WN_CX} y={WN_CY}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
            PLAN DETAILS
          </text>
        </motion.g>

        {/* Intended path arrows: turn INDIGO in AI mode */}
        <motion.g
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}>
          {INT_ARROWS.map((a, i) => (
            <motion.line key={i}
              x1={a.x1} y1={N_CY} x2={a.x2} y2={N_CY}
              strokeWidth="1.5"
              markerEnd="url(#ut-ai-iarr)"
              animate={{ stroke: isAI ? `${INDIGO}0.70)` : 'rgba(255,255,255,0.42)' }}
              transition={{ duration: 0.35 }} />
          ))}
        </motion.g>

        {/* Actual path: fades to near-invisible in AI mode */}
        <motion.path
          d={ACTUAL_PATH}
          fill="none"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ stroke: isAI ? `${BRICK}0.10)` : `${BRICK}0.88)` }}
          transition={{ duration: 0.40 }} />

        {/* Friction point markers: fade in AI mode */}
        <motion.g animate={{ opacity: isAI ? 0.07 : 1 }} transition={{ duration: 0.35 }}>
          {FRICTION_POS.map((f) => (
            <g key={f.label}>
              <circle cx={f.cx} cy={f.cy} r={5}
                fill={f.label === 'WRONG TURN' ? `${AMBER}0.90)` : `${BRICK}0.90)`}
                stroke="rgba(10,10,18,0.80)" strokeWidth="1.5" />
              <text x={f.lx} y={f.ly}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
                fill={f.label === 'WRONG TURN' ? `${AMBER}0.85)` : `rgba(183,145,135,0.969)`}
                style={{ userSelect: 'none' }}>
                {f.label}
              </text>
            </g>
          ))}
        </motion.g>

        {/* AI heuristic flags (AI mode only) */}
        <AnimatePresence>
          {isAI && AI_FLAGS.map((flag, i) => (
            <motion.g key={flag.text}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28, delay: prefersReduced ? 0 : 0.08 + i * 0.07 }}>
              <rect x={flag.x - flag.w / 2} y={flag.y - 9}
                width={flag.w} height={18}
                fill={`${INDIGO}0.08)`} stroke={`${INDIGO}0.30)`} strokeWidth="1" rx={2} />
              <text x={flag.x} y={flag.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${INDIGO_TEXT}0.958)`} style={{ userSelect: 'none' }}>
                {flag.text}
              </text>
            </motion.g>
          ))}
        </AnimatePresence>

        {/* "NOT ACCESSIBLE TO AI" overlay on actual path area (AI mode) */}
        <AnimatePresence>
          {isAI && (
            <motion.text x={230} y={168}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={`rgba(183,145,135,0.864)`} style={{ userSelect: 'none' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.30, delay: prefersReduced ? 0 : 0.25 }}>
              ← ACTUAL PATH NOT ACCESSIBLE TO AI →
            </motion.text>
          )}
        </AnimatePresence>

        {/* Divergence annotation (dims in AI mode) */}
        <motion.g animate={{ opacity: isAI ? 0.15 : 1 }} transition={{ duration: 0.30 }}>
          <text x={510} y={72} textAnchor="middle" dominantBaseline="middle"
            fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`rgba(183,145,135,0.878)`} style={{ userSelect: 'none' }}>
            THE DIVERGENCE
          </text>
          <text x={510} y={83} textAnchor="middle" dominantBaseline="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`rgba(183,145,135,0.853)`} style={{ userSelect: 'none' }}>
            IS THE FINDING
          </text>
        </motion.g>
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease }}
          className="mt-6 space-y-3"
        >
          {isAI ? (
            <>
              {/* Genuine uplift */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <p className="font-mono uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                    Where AI genuinely helps: heuristic review
                  </p>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
                    Real uplift
                  </span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  AI knows the established usability principles (clarity of labels, visibility of system status,
                  consistency, error prevention, recognition over recall) and can review an interface against them
                  quickly, flagging obvious violations: ambiguous labels, missing feedback, inconsistent patterns,
                  unclear affordances. This is a real, low-cost contribution. An expert-review pass that used to
                  require a specialist&rsquo;s time can now be run early and often. Use it: it makes the cheap fixes
                  cheaper, and it means your real tests are spent on the problems that actually need a human.
                </p>
              </div>

              {/* The structural limit */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${AMBER}0.22)` }}>
                <p className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.80)` }}>
                  What AI cannot do: watch a real person get confused
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                  The actual path, the wandering, hesitant, wrong-turn-taking route a real person takes, is
                  invisible to AI. AI reasons from documented principles and patterns. The entire value of a
                  usability test is that real human confusion is not derivable from principles: it is specific,
                  surprising, and grounded in a person&rsquo;s own mental model. A model can tell you that a label is
                  ambiguous in the abstract; it cannot tell you that THIS particular person will read &ldquo;Continue&rdquo;
                  as &ldquo;cancel and start over&rdquo;, because that fact did not exist until a human did it.
                </p>
                <div className="rounded p-3"
                  style={{ background: `${AMBER}0.06)`, borderLeft: `2px solid ${AMBER}0.35)` }}>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    And a simulated user walkthrough is not a substitute: it produces a plausible narrative of
                    a &ldquo;typical user&rdquo; navigating the interface, which sounds reasonable and is, in effect, a
                    restatement of what the team already assumed. The gap between assumption and reality is the
                    entire product of a usability test, and it cannot be generated by a system whose knowledge
                    IS a body of assumptions.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-lg p-4"
              style={{ border: `1px solid ${BRICK}0.22)`, background: `${BRICK}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
                The traditional method: watch the person, not the screen
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                A usability test is five people, five tasks, one facilitator who says nothing. The intended path
                is what you assumed would happen. The actual path is what a stranger does. The gap between them
                (the hesitations, the wrong turns, the backtracks, the places where the person simply stops)
                is the finding. You cannot reason your way to it in advance, and you cannot simulate it. It
                requires a real mind meeting your specific interface.
              </p>
            </div>
          )}

          {/* Always-visible synthesis */}
          <div className="rounded-lg p-4"
            style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.16)` }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.60)` }}>
              The honest synthesis
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              Use AI for heuristic review; it genuinely catches obvious violations fast, and that raises the
              floor. But the method&rsquo;s core act is watching a real, specific human struggle in ways nobody
              predicted. That is not reviewable, derivable, or simulatable. Let AI clear the obvious problems.
              Spend your five participants on the ones only reality can reveal.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
