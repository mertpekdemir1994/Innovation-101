'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const BRICK_TEXT = 'rgba(183,145,135,'  // brightened text-safe variant of BRICK
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700, SVG_H = 268
const S_W = 88, S_H = 28, CY = 113

const STAGES = [
  { id: 'signal', label: 'SIGNAL', x: 18,  y: 99 },
  { id: 'sense',  label: 'SENSE',  x: 172, y: 99 },
  { id: 'decide', label: 'DECIDE', x: 326, y: 99 },
  { id: 'ship',   label: 'SHIP',   x: 480, y: 99 },
]

const LOOP_PATH = `M 18,${CY} L 568,${CY} L 608,${CY} C 638,${CY} 644,145 644,170 L 644,196 L 56,196 C 35,196 18,180 18,158 Z`

type Mode = 'human' | 'ai'

// Amber markers for human judgment (shown in AI mode). Widened (none of the
// phrases fit their old badge at 11pt) and moved off the stage-box row / the
// return-path label so the bigger badges don't sit on top of other text:
// mk1 moved off the DECIDE-SHIP connector (y=CY) to the open space below the
// boxes; mk2 shifted down further to clear mk1; mk3 moved below the return
// path label it used to overlap.
const HUMAN_MARKERS = [
  { cx: 447, cy: 145, text: 'DECIDE: HUMAN JUDGMENT',     w: 180 },
  { cx: 524, cy: 169, text: 'SHIP: HUMANS SHIP IT',       w: 165 },
  { cx: 350, cy: 206, text: 'RETURN: HUMAN MEASURES IT',  w: 200 },
]

export default function PFLAIReactivated() {
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
                : m === 'ai' ? `${INDIGO_TEXT}0.90)` : `${BRICK_TEXT}0.90)`,
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
          ? 'AI mode: the SIGNAL-to-SENSE connector is dramatically strengthened in indigo: AI synthesizes signal at scale, repairing the volume-broken junction. DECIDE, SHIP, and the return measurement remain in brick (human), with amber markers. Three amber labels show what AI cannot do: decide, ship, or measure.'
          : 'Human mode: standard feedback loop in brick. All four stages and the return path at full visibility.'}
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', display: 'block' }}
      >
        <defs>
          <filter id="pfl-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pfl-ai-indigo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feFlood floodColor={`${INDIGO}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="pfl-ai-arr-b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${BRICK}0.58)`} />
          </marker>
          <marker id="pfl-ai-arr-i" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${INDIGO}0.80)`} />
          </marker>
        </defs>

        {/* Background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Loop circuit path */}
        <path
          d={LOOP_PATH}
          fill="none"
          stroke={`${BRICK}0.18)`}
          strokeWidth={1.2}
        />

        {/* Stage boxes: SIGNAL always BRICK, SENSE turns INDIGO in AI mode, others stay BRICK */}
        {STAGES.map((s) => {
          const isSense = s.id === 'sense'
          const useIndigo = isAI && isSense
          const c = useIndigo ? INDIGO : BRICK
          const cText = useIndigo ? INDIGO_TEXT : BRICK_TEXT
          return (
            <motion.g key={s.id}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.40 }}>
              <rect x={s.x} y={s.y} width={S_W} height={S_H}
                fill={`${c}0.10)`} stroke={`${c}0.70)`}
                strokeWidth={useIndigo ? 2 : 1.5} rx={3}
                filter={useIndigo ? 'url(#pfl-ai-indigo-glow)' : 'url(#pfl-ai-glow)'} />
              <text x={s.x + S_W / 2} y={CY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.11em" fontWeight="600"
                fill={`${cText}0.92)`} style={{ userSelect: 'none' }}>
                {s.label}
              </text>
            </motion.g>
          )
        })}

        {/* SIGNAL→SENSE connector: INDIGO + thicker in AI mode */}
        <motion.line
          x1={106} y1={CY} x2={165} y2={CY}
          strokeWidth={isAI ? 3 : 1.2}
          markerEnd={isAI ? 'url(#pfl-ai-arr-i)' : 'url(#pfl-ai-arr-b)'}
          animate={{
            stroke: isAI ? `${INDIGO}0.88)` : `${BRICK}0.45)`,
            filter: isAI ? 'url(#pfl-ai-indigo-glow)' : 'none',
          }}
          transition={{ duration: 0.40 }} />

        {/* SENSE→DECIDE connector: BRICK */}
        <motion.line
          x1={260} y1={CY} x2={319} y2={CY}
          stroke={`${BRICK}0.45)`} strokeWidth={1.2}
          markerEnd="url(#pfl-ai-arr-b)"
          animate={{ opacity: isAI ? 0.75 : 1 }}
          transition={{ duration: 0.40 }} />

        {/* DECIDE→SHIP connector: BRICK (slightly dim in AI mode, same fragility) */}
        <motion.line
          x1={414} y1={CY} x2={473} y2={CY}
          stroke={`${BRICK}0.45)`} strokeWidth={1.2}
          markerEnd="url(#pfl-ai-arr-b)"
          animate={{ opacity: isAI ? 0.75 : 1 }}
          transition={{ duration: 0.40 }} />

        {/* Return path arrow */}
        <motion.line
          x1={480} y1={196} x2={100} y2={196}
          stroke={`${BRICK}0.42)`} strokeWidth={1.0}
          markerEnd="url(#pfl-ai-arr-b)"
          animate={{ opacity: isAI ? 0.65 : 1 }}
          transition={{ duration: 0.40 }} />

        {/* AI label on SIGNAL→SENSE connector */}
        <AnimatePresence>
          {isAI && (
            <motion.g
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.30 }}>
              <text x={136} y={90}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
                fill={`${INDIGO_TEXT}0.958)`} style={{ userSelect: 'none' }}>
                AI SYNTHESIZES AT SCALE
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Return path label */}
        <motion.text x={300} y={187}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
          fill={`${BRICK_TEXT}${isAI ? '0.80)' : '0.90)'}`}
          style={{ userSelect: 'none' }}>
          ← BACK TO SIGNAL · MEASURES WHETHER THE CHANGE WORKED
        </motion.text>

        {/* Human judgment markers (AI mode only) */}
        <AnimatePresence>
          {isAI && HUMAN_MARKERS.map((mk, i) => (
            <motion.g key={mk.text}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28, delay: prefersReduced ? 0 : 0.10 + i * 0.07 }}>
              <rect
                x={mk.cx - mk.w / 2} y={mk.cy - 9}
                width={mk.w} height={18}
                fill={`${AMBER}0.07)`} stroke={`${AMBER}0.30)`}
                strokeWidth="1" rx={2} />
              <text x={mk.cx} y={mk.cy}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
                {mk.text}
              </text>
            </motion.g>
          ))}
        </AnimatePresence>

        {/* AI mode: SENSE box "averages the specific" warning */}
        <AnimatePresence>
          {isAI && (
            <motion.text x={216} y={140}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
              fill={`${AMBER_TEXT}0.876)`} style={{ userSelect: 'none' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.30, delay: prefersReduced ? 0 : 0.20 }}>
              ⚠ AVERAGES THE SPECIFIC
            </motion.text>
          )}
        </AnimatePresence>
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
              {/* Genuine uplift: SENSE */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <p className="font-mono uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO_TEXT}0.90)` }}>
                    Where AI genuinely transforms this method: SENSE
                  </p>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${INDIGO}0.12)`, color: `${INDIGO_TEXT}0.90)`, border: `1px solid ${INDIGO}0.25)` }}>
                    Largest practical AI win
                  </span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                  Post-launch signal has always had one defining problem: volume. Thousands of support tickets,
                  tens of thousands of reviews, endless session records and survey responses, far more than any
                  team can read, let alone synthesise. This is precisely why the signal-to-sense junction broke
                  most often: not because nobody cared, but because the work was genuinely impossible at scale.
                  AI changes this materially. It reads and synthesises enormous volumes of unstructured feedback,
                  clusters them into themes, surfaces patterns across channels, and does in minutes what a team
                  could not do at all. This may be the single largest practical AI improvement across this entire
                  method set: it repairs the exact junction that broke most often.
                </p>
              </div>

              {/* Limit 1: cannot DECIDE */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${AMBER}0.22)` }}>
                <p className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                  Human judgment: AI cannot DECIDE
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                  Deciding which problems matter, what to trade off, what to fix and what to live with; this is a
                  judgment with consequences, made by people accountable for the product. AI will produce a
                  confident, well-organised recommendation. A recommendation from a system bearing no consequence
                  is not a decision. The DECIDE stage remains exactly as human and exactly as fragile as before.
                  An organisation that adds AI sense-making to a loop that breaks at decision has built a faster
                  conveyor belt into the same dead end.
                </p>
              </div>

              {/* Limit 2: averages the specific */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${AMBER}0.22)` }}>
                <p className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                  Human judgment: AI averages away the specific outlier
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                  The danger of synthesis at scale is that it optimises for the average. The one strange, articulate
                  complaint that reveals a genuine, serious design failure (the outlier that a sharp human would
                  have stopped on) gets clustered into a theme and averaged into noise. AI is excellent at telling
                  you what most people said, and structurally poor at telling you which single thing said by one
                  person actually matters. Post-launch signal is full of such needles, and a synthesis that returns
                  only the haystack&rsquo;s shape has lost them. Read the outliers yourself.
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-lg p-4"
              style={{ border: `1px solid ${BRICK}0.22)`, background: `${BRICK}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK_TEXT}0.90)` }}>
                The traditional method
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                A feedback loop is run end-to-end by people. Someone owns the sense-making step, on a rhythm,
                and reads raw signal. A decision forum meets with authority to act on findings. Decisions land
                in the actual product. Someone checks whether the change worked, and that check becomes the
                next turn of signal. What makes this work is ownership and rhythm at every junction, not
                more instruments, but a human at each step who is responsible for completing it.
              </p>
            </div>
          )}

          {/* Always-visible synthesis */}
          <div className="rounded-lg p-4"
            style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.16)` }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: `${BRICK_TEXT}0.90)` }}>
              The honest synthesis
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
              Use AI at the sense stage, without hesitation: it is genuinely transformative there, and it
              repairs the junction that volume used to break. But read the outliers yourself, because synthesis
              averages away the specific complaint that matters most. And do not mistake faster sense-making
              for a closed loop: the loop closes when a human decides and someone ships, and no amount of
              synthesis substitutes for either.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
