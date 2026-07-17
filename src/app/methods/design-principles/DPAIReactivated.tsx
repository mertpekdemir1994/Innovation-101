'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'

type Mode = 'human' | 'ai'

const SVG_W = 700, SVG_H = 240
const FX = 230, FY = 120
const TX = 452, TY = 54
const CX = 452, CY = 186

// AI-generated principles — beautiful, polished, closing nothing
const AI_PRINCIPLES = [
  'Balance power with simplicity',
  'Serve every user well',
  'Be flexible without becoming complex',
  'Empower users to do their best work',
]

// Human principle — specific, arguable, closes a branch
const HUMAN_PRINCIPLE = {
  text: 'We favour speed over configurability, even when power users ask for options',
  closed: 'CONFIGURABILITY',
  taken: 'SPEED · SIMPLICITY',
}

export default function DPAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

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
                ? m === 'ai' ? `${INDIGO}0.82)` : `${PLUM}0.82)`
                : 'transparent',
              color: mode === m ? '#fff'
                : m === 'ai' ? `${INDIGO}0.70)` : `${PLUM}0.70)`,
              border: `1.5px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.68)` : `${PLUM}0.68)`
                : m === 'ai' ? `${INDIGO}0.28)` : `${PLUM}0.28)`}`,
            }}>
            {m === 'human' ? 'Human-derived principle' : 'AI-generated principle'}
          </button>
        ))}
      </div>

      {/* SVG fork */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label={isAI
          ? 'Fork in AI mode. Four beautiful AI-generated principles float around the junction, but neither branch closes — the fork is undecided.'
          : 'Fork in human mode. A specific principle sits on the incoming path, the lower branch is closed with an X barrier.'}
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="dp-ai-plum-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${PLUM}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dp-ai-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dp-ai-indigo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${INDIGO}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="dp-ai-arr-plum" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${PLUM}0.70)`} />
          </marker>
          <marker id="dp-ai-arr-dim" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${INDIGO}0.32)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* AI mode: floating principles around the fork */}
        <AnimatePresence>
          {isAI && AI_PRINCIPLES.map((text, i) => {
            const positions = [
              { x: 480, y: 30 },
              { x: 500, y: 70 },
              { x: 490, y: 118 },
              { x: 480, y: 165 },
            ]
            const pos = positions[i]
            return (
              <motion.g key={text}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -8 }}
                animate={{ opacity: 0.70, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.28, delay: prefersReduced ? 0 : i * 0.06, ease }}>
                <rect x={pos.x} y={pos.y - 8} width={208} height={16} rx={3}
                  fill={`${INDIGO}0.06)`} stroke={`${INDIGO}0.20)`} strokeWidth={0.6} />
                <text x={pos.x + 6} y={pos.y + 1} textAnchor="start" dominantBaseline="middle"
                  fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.05em"
                  fill={`${INDIGO}0.65)`} style={{ userSelect: 'none' }}>
                  {text}
                </text>
              </motion.g>
            )
          })}
        </AnimatePresence>

        {/* AI mode: "CLOSES NOTHING" warning header */}
        <AnimatePresence>
          {isAI && (
            <motion.g key="closes-nothing"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}>
              <text x={SVG_W / 2} y={14} textAnchor="middle"
                fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
                fill={`${AMBER}0.72)`} style={{ userSelect: 'none' }}>
                ⚠ CLOSES NO BRANCHES — FORK UNDECIDED
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Human mode: principle badge */}
        <AnimatePresence>
          {!isAI && (
            <motion.g key="human-badge"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}>
              <rect x={26} y={98} width={196} height={30} rx={3}
                fill={`${PLUM}0.08)`} stroke={`${PLUM}0.35)`} strokeWidth={0.8} />
              <text x={124} y={108} textAnchor="middle"
                fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={`${PLUM}0.52)`} style={{ userSelect: 'none' }}>
                PRINCIPLE
              </text>
              <text x={124} y={118} textAnchor="middle"
                fontSize="4.6" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
                fill={`${PLUM}0.80)`} style={{ userSelect: 'none' }}>
                SPEED OVER CONFIGURABILITY
              </text>
              <text x={124} y={127} textAnchor="middle"
                fontSize="3.4" fontFamily="var(--font-mono)" letterSpacing="0.06em"
                fill={`${PLUM}0.42)`} style={{ userSelect: 'none' }}>
                EVEN WHEN POWER USERS ASK
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Incoming path */}
        <line x1={24} y1={FY} x2={FX} y2={FY}
          stroke={isAI ? `${INDIGO}0.25)` : `${PLUM}0.35)`} strokeWidth={1.4} />

        {/* Junction circle */}
        <circle cx={FX} cy={FY} r={5}
          fill={isAI ? `${INDIGO}0.08)` : `${PLUM}0.12)`}
          stroke={isAI ? `${INDIGO}0.40)` : `${PLUM}0.55)`}
          strokeWidth={1.2}
          filter={isAI ? 'url(#dp-ai-indigo-glow)' : 'url(#dp-ai-plum-glow)'}
        />

        {/* TAKEN BRANCH */}
        <line x1={FX} y1={FY} x2={TX} y2={TY}
          stroke={isAI ? `${INDIGO}0.42)` : `${PLUM}0.85)`}
          strokeWidth={isAI ? 1.4 : 2.0}
          markerEnd={isAI ? 'url(#dp-ai-arr-dim)' : 'url(#dp-ai-arr-plum)'}
          filter={isAI ? undefined : 'url(#dp-ai-plum-glow)'}
        />

        {/* CLOSED BRANCH */}
        <line x1={FX} y1={FY} x2={CX} y2={CY}
          stroke={isAI ? `${INDIGO}0.42)` : `${AMBER}0.22)`}
          strokeWidth={isAI ? 1.4 : 1.2}
          strokeDasharray={isAI ? '' : '5 3'}
          markerEnd={isAI ? 'url(#dp-ai-arr-dim)' : undefined}
        />

        {/* Human mode: X barrier on closed branch */}
        <AnimatePresence>
          {!isAI && (
            <motion.g key="x-human"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              filter="url(#dp-ai-amber-glow)">
              <line x1={CX - 9} y1={CY - 9} x2={CX + 9} y2={CY + 9}
                stroke={`${AMBER}0.88)`} strokeWidth={2.4} strokeLinecap="round" />
              <line x1={CX - 9} y1={CY + 9} x2={CX + 9} y2={CY - 9}
                stroke={`${AMBER}0.88)`} strokeWidth={2.4} strokeLinecap="round" />
              <circle cx={CX} cy={CY} r={13}
                fill="none" stroke={`${AMBER}0.32)`} strokeWidth={1.0} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Branch labels */}
        <AnimatePresence mode="wait">
          {isAI ? (
            <motion.g key="ai-labels"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}>
              <text x={TX + 8} y={TY + 2} textAnchor="start"
                fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${INDIGO}0.42)`} style={{ userSelect: 'none' }}>
                OPEN
              </text>
              <text x={CX + 8} y={CY + 2} textAnchor="start"
                fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${INDIGO}0.42)`} style={{ userSelect: 'none' }}>
                OPEN
              </text>
            </motion.g>
          ) : (
            <motion.g key="human-labels"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}>
              <text x={TX + 8} y={TY - 4} textAnchor="start"
                fontSize="5.0" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
                fill={`${PLUM}0.88)`} style={{ userSelect: 'none' }}>
                TAKEN
              </text>
              <text x={TX + 8} y={TY + 7} textAnchor="start"
                fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${PLUM}0.52)`} style={{ userSelect: 'none' }}>
                {HUMAN_PRINCIPLE.taken}
              </text>
              <text x={CX + 8} y={CY - 3} textAnchor="start"
                fontSize="5.0" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
                fill={`${AMBER}0.82)`} style={{ userSelect: 'none' }}>
                CLOSED
              </text>
              <text x={CX + 8} y={CY + 9} textAnchor="start"
                fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${AMBER}0.50)`} style={{ userSelect: 'none' }}>
                {HUMAN_PRINCIPLE.closed}
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Info cards */}
      <div className="grid gap-4 sm:grid-cols-2">

        {/* INDIGO: genuine AI help — sharpen the language */}
        <div className="rounded-lg p-5"
          style={{ background: `${INDIGO}0.05)`, border: `1px solid ${INDIGO}0.20)` }}>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <p className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
              Where AI genuinely helps
            </p>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
              Sharpen language
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            Once you have derived the real tradeoff from your own team&rsquo;s recurring arguments, AI is an excellent
            editor. It can tighten the language, remove ambiguity, and expose where the principle still has wiggle room
            that would let people argue past it. Bring it the hard-won substance, ask it to sharpen the words.
          </p>
        </div>

        {/* INDIGO: argue the opposite */}
        <div className="rounded-lg p-5"
          style={{ background: `${INDIGO}0.05)`, border: `1px solid ${INDIGO}0.20)` }}>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <p className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
              The arguability test
            </p>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
              Argue the opposite
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            Give AI your draft principle and ask it to argue the opposite as convincingly as possible. If it cannot
            produce a reasonable counter-argument, the principle is a platitude. If it can — and especially if the
            counter-argument surfaces a real product strategy your team has not considered — that is the arguability
            test doing its job.
          </p>
        </div>

        {/* AMBER: the fluency trap */}
        <div className="rounded-lg p-5"
          style={{ border: `1px solid ${AMBER}0.20)` }}>
          <p className="font-mono uppercase tracking-widest mb-3"
            style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.72)` }}>
            The fluency trap
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            AI produces fluent, balanced, well-structured prose by design. A principle that balances competing values
            elegantly closes nothing by construction — balance is the absence of a choice. The more polished the
            output looks, the more likely it is to be a platitude. Seductiveness and emptiness travel together here.
          </p>
        </div>

        {/* AMBER: cannot know your sacrifice */}
        <div className="rounded-lg p-5"
          style={{ border: `1px solid ${AMBER}0.20)` }}>
          <p className="font-mono uppercase tracking-widest mb-3"
            style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.72)` }}>
            Cannot know your sacrifice
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            The principle &ldquo;we favour speed over configurability even when power users ask for options&rdquo; comes from a specific
            team having a specific argument, repeatedly. That history is not in the model. AI can help you write it
            once you know what you&rsquo;re sacrificing. It cannot tell you what your sacrifice should be — that answer is
            inside the building, not inside the model.
          </p>
        </div>

        {/* PLUM: honest synthesis (full width) */}
        <div className="rounded-lg p-5 sm:col-span-2"
          style={{ background: `${PLUM}0.05)`, border: `1px solid ${PLUM}0.20)` }}>
          <p className="font-mono uppercase tracking-widest mb-2"
            style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.65)` }}>
            The honest readout
          </p>
          <p className="font-semibold"
            style={{ fontSize: 'var(--text-sm)', color: `${PLUM}0.82)` }}>
            Never ask AI to write your principles. Ask it to argue against them.
          </p>
          <p className="mt-2"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            Derive the real tradeoff in the room, from the real arguments your team keeps having. Then bring it
            to AI to sharpen the language and challenge the platitude-ness. If you skip the derivation step, no
            amount of AI refinement will produce a principle — it will produce a beautifully worded fork with
            both branches still open.
          </p>
        </div>

      </div>
    </div>
  )
}
