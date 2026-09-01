'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL   = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

type Mode = 'human' | 'ai'

const SVG_W = 700, SVG_H = 230
const PRESSURE_CX = 117, PRESSURE_CY = 52
const DEBT_CX = 117, DEBT_CY = 198
const DEFECT_CX = 464, DEFECT_CY = 52
const TESTING_CX = 564, TESTING_CY = 198

const R_LEFT_ARC  = `M 78,65 C 16,108 16,168 78,185`
const R_RIGHT_ARC = `M 206,185 C 264,168 264,108 206,65`
const B_RIGHT_ARC = `M 536,57 C 590,98 590,172 554,185`
const B_LEFT_ARC  = `M 506,185 C 490,168 486,92 484,57`
const CROSS_PATH  = `M 206,52 L 392,52`

export default function SMAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  // In AI mode: only the BALANCING loop (documented theory) is bright
  // The REINFORCING loop (the actual problem) is faint/absent
  const rLoopOp = isAI ? 0.08 : 0.72
  const bLoopOp = isAI ? 0.90 : 0.55
  const pressureOp = isAI ? 0.25 : 0.90
  const debtOp = isAI ? 0.18 : 0.90
  const crossOp = isAI ? 0.10 : 0.42
  const leverageOp = isAI ? 0 : 1

  return (
    <div className="w-full space-y-6">

      {/* Mode toggle */}
      <div className="flex gap-2 flex-wrap">
        {(['human', 'ai'] as Mode[]).map(m => (
          <button key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.82)` : `${TEAL}0.82)`
                : 'transparent',
              color: mode === m ? '#fff'
                : m === 'ai' ? `${INDIGO}0.70)` : `${TEAL}0.70)`,
              border: `1.5px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.68)` : `${TEAL}0.68)`
                : m === 'ai' ? `${INDIGO}0.28)` : `${TEAL}0.28)`}`,
            }}>
            {m === 'human' ? 'Both loops found' : 'AI-generated map'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label={isAI
          ? 'AI-generated causal loop diagram. Only the BALANCING loop B1 (defect rate → testing → defect rate) is clearly visible: this is the documented, believed causality. The REINFORCING loop R1 (delivery pressure → technical debt → more pressure) is faint or absent. A warning reads: your failed theory, elegantly drawn.'
          : 'Complete causal loop diagram showing both loops: REINFORCING R1 (delivery pressure → technical debt → delivery pressure) and BALANCING B1 (defect rate → testing → defect rate). The leverage point glows above the DELIVERY PRESSURE node.'}
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="sm-ai-teal-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${TEAL}0.60)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sm-ai-indigo-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${INDIGO}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="sm-ai-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${TEAL}0.70)`} />
          </marker>
          <marker id="sm-ai-arr-neg" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${AMBER}0.62)`} />
          </marker>
          <marker id="sm-ai-arr-indigo" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${INDIGO}0.72)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* AI mode warning header */}
        <AnimatePresence>
          {isAI && (
            <motion.g key="ai-warn"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              <text x={SVG_W / 2} y={14} textAnchor="middle"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                fill={`${AMBER}0.75)`} style={{ userSelect: 'none' }}>
                ⚠ YOUR FAILED THEORY, DRAWN ELEGANTLY
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* DELIVERY PRESSURE */}
        <motion.g animate={{ opacity: pressureOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <rect x={28} y={38} width={178} height={27} rx={3}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.55)`} strokeWidth={1.4} />
          <text x={PRESSURE_CX} y={PRESSURE_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${TEAL_TEXT}0.975)`} style={{ userSelect: 'none' }}>
            DELIVERY PRESSURE
          </text>
        </motion.g>

        {/* TECHNICAL DEBT */}
        <motion.g animate={{ opacity: debtOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <rect x={28} y={185} width={178} height={27} rx={3}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.55)`} strokeWidth={1.4} />
          <text x={DEBT_CX} y={DEBT_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${TEAL_TEXT}0.975)`} style={{ userSelect: 'none' }}>
            TECHNICAL DEBT
          </text>
        </motion.g>

        {/* DEFECT RATE: always bright in AI mode (the documented loop) */}
        <rect x={390} y={38} width={148} height={27} rx={3}
          fill={isAI ? `${INDIGO}0.12)` : `${AMBER}0.07)`}
          stroke={isAI ? `${INDIGO}0.75)` : `${AMBER}0.55)`}
          strokeWidth={isAI ? 1.8 : 1.4}
          filter={isAI ? 'url(#sm-ai-indigo-glow)' : undefined} />
        <text x={DEFECT_CX} y={DEFECT_CY} textAnchor="middle" dominantBaseline="middle"
          fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
          fill={isAI ? `${INDIGO_TEXT}0.975)` : `${AMBER}0.85)`} style={{ userSelect: 'none' }}>
          DEFECT RATE
        </text>

        {/* TESTING: always bright in AI mode */}
        <rect x={500} y={185} width={148} height={27} rx={3}
          fill={isAI ? `${INDIGO}0.10)` : `${TEAL}0.08)`}
          stroke={isAI ? `${INDIGO}0.68)` : `${TEAL}0.42)`}
          strokeWidth={isAI ? 1.6 : 1.2} />
        <text x={TESTING_CX} y={TESTING_CY} textAnchor="middle" dominantBaseline="middle"
          fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
          fill={isAI ? `${INDIGO_TEXT}0.958)` : `${TEAL_TEXT}0.954)`} style={{ userSelect: 'none' }}>
          TESTING
        </text>

        {/* REINFORCING LOOP (fades in AI mode: this is what AI misses) */}
        <motion.g animate={{ opacity: rLoopOp }}
          transition={{ duration: prefersReduced ? 0 : 0.45, ease }}>
          <path d={R_LEFT_ARC} fill="none"
            stroke={`${TEAL}0.70)`} strokeWidth={1.8} markerEnd="url(#sm-ai-arr)" />
          <path d={R_RIGHT_ARC} fill="none"
            stroke={`${TEAL}0.70)`} strokeWidth={1.8} markerEnd="url(#sm-ai-arr)" />
          <text x={117} y={118} textAnchor="middle"
            fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="600"
            fill={`${TEAL_TEXT}0.885)`} style={{ userSelect: 'none' }}>R1</text>
          <text x={117} y={130} textAnchor="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL_TEXT}0.853)`} style={{ userSelect: 'none' }}>REINFORCING</text>
        </motion.g>

        {/* BALANCING LOOP (prominent in AI mode: this is what AI draws) */}
        <motion.g
          animate={{ opacity: bLoopOp }}
          transition={{ duration: prefersReduced ? 0 : 0.45, ease }}>
          <path d={B_RIGHT_ARC} fill="none"
            stroke={isAI ? `${INDIGO}0.72)` : `${TEAL}0.55)`}
            strokeWidth={isAI ? 2.2 : 1.5}
            markerEnd={isAI ? 'url(#sm-ai-arr-indigo)' : 'url(#sm-ai-arr)'}
            filter={isAI ? 'url(#sm-ai-indigo-glow)' : undefined} />
          <path d={B_LEFT_ARC} fill="none"
            stroke={isAI ? `${INDIGO}0.60)` : `${AMBER}0.50)`}
            strokeWidth={isAI ? 2.2 : 1.5}
            strokeDasharray={isAI ? '' : '5 3'}
            markerEnd={isAI ? 'url(#sm-ai-arr-indigo)' : 'url(#sm-ai-arr-neg)'} />
          <text x={516} y={115} textAnchor="middle"
            fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="600"
            fill={isAI ? `${INDIGO_TEXT}0.912)` : `${TEAL_TEXT}0.864)`} style={{ userSelect: 'none' }}>B1</text>
          <text x={516} y={127} textAnchor="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO_TEXT}0.885)` : `${TEAL_TEXT}0.843)`} style={{ userSelect: 'none' }}>BALANCING</text>
        </motion.g>

        {/* Cross-arrow with delay (absent in AI mode) */}
        <motion.g animate={{ opacity: crossOp }}
          transition={{ duration: prefersReduced ? 0 : 0.45, ease }}>
          <path d={CROSS_PATH} fill="none"
            stroke={`${AMBER}0.40)`} strokeWidth={1.2} strokeDasharray="4 3"
            markerEnd="url(#sm-ai-arr-neg)" />
          <text x={299} y={44} textAnchor="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`${AMBER_TEXT}0.861)`} style={{ userSelect: 'none' }}>⏱ DELAY</text>
        </motion.g>

        {/* Leverage point (absent in AI mode) */}
        <motion.g animate={{ opacity: leverageOp }}
          transition={{ duration: prefersReduced ? 0 : 0.45, ease }}
          filter="url(#sm-ai-teal-glow)">
          <path d={`M ${PRESSURE_CX},5 L ${PRESSURE_CX + 10},15 L ${PRESSURE_CX},25 L ${PRESSURE_CX - 10},15 Z`}
            fill={`${TEAL}0.18)`} stroke={`${TEAL}0.88)`} strokeWidth={1.2} />
          <text x={PRESSURE_CX} y={33} textAnchor="middle"
            fontSize="3.4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL_TEXT}0.941)`} style={{ userSelect: 'none' }}>
            LEVERAGE POINT
          </text>
        </motion.g>
      </svg>

      {/* Info cards */}
      <div className="grid gap-4 sm:grid-cols-2">

        <div className="rounded-lg p-5"
          style={{ background: `${INDIGO}0.05)`, border: `1px solid ${INDIGO}0.20)` }}>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <p className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
              Where AI genuinely helps
            </p>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
              Blank-page problem
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            Systems mapping has always suffered from the blank-page problem. AI can propose variables,
            suggest causal relationships, close loops, and produce a clean readable diagram in minutes.
            It also asks good questions: what else might drive this variable? It widens the hypothesis
            space and gets the first model on the table. As a drafting tool and as a loop-proposer,
            it is genuinely useful.
          </p>
        </div>

        <div className="rounded-lg p-5"
          style={{ border: `1px solid ${AMBER}0.22)` }}>
          <p className="font-mono uppercase tracking-widest mb-3"
            style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.72)` }}>
            It renders your existing theory
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            AI models the causality it is told about, or the causality that is documented. In a
            persistent problem, the documented theory is the organization&rsquo;s existing story about
            itself, precisely the theory that has already guided the interventions that keep not
            working. So AI renders your failed theory as a clean professional diagram, with the
            authority that comes with looking complete.
          </p>
        </div>

        <div className="rounded-lg p-5"
          style={{ border: `1px solid ${AMBER}0.22)` }}>
          <p className="font-mono uppercase tracking-widest mb-3"
            style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.72)` }}>
            A confident wrong diagram is worse than no diagram
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            A fluent, coherent, professional-looking causal model of the wrong loops does not merely
            fail to help; it actively justifies the intervention that cannot work, and it does so
            with more institutional authority than the vague unease that preceded it. A map of the
            B1 loop alone points exactly where the team was already pushing. It legitimizes a fourth
            round of the failed intervention.
          </p>
        </div>

        <div className="rounded-lg p-5"
          style={{ border: `1px solid ${AMBER}0.22)` }}>
          <p className="font-mono uppercase tracking-widest mb-3"
            style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.72)` }}>
            The real loops are not written down
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            The reinforcing loop that explains a persistent problem is, by definition, the one
            nobody has articulated: undocumented, often politically uncomfortable, and not available
            in any text AI can read. It surfaces by asking the people inside the system what
            actually happens, and arguing about it in a room. The leverage point, in particular, is
            a judgment about what is actually true in your organization, not a fact about systems
            in general.
          </p>
        </div>

        <div className="rounded-lg p-5 sm:col-span-2"
          style={{ background: `${TEAL}0.05)`, border: `1px solid ${TEAL}0.20)` }}>
          <p className="font-mono uppercase tracking-widest mb-2"
            style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.65)` }}>The honest readout</p>
          <p className="font-semibold"
            style={{ fontSize: 'var(--text-sm)', color: `${TEAL}0.85)` }}>
            Use AI to draft the model and widen the hypotheses. Then treat what it produces as your own
            beliefs, drawn tidily, and go break it.
          </p>
          <p className="mt-2"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            Talk to the people inside the system. Look for the loops nobody wrote down. Name the
            uncomfortable ones. Test the model&rsquo;s predictions against history: if these loops are real,
            what should we have already seen? Confirm what you can, cheaply, before acting on a
            counterintuitive leverage point. The map&rsquo;s value is entirely in whether the loops are
            real, and reality, here, is not in the documentation.
          </p>
        </div>

      </div>
    </div>
  )
}
