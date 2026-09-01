'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO
const AMBER  = 'rgba(245,158,11,'

const SVG_W = 700, SVG_H = 268

const ZN_X = 62, ZN_Y = 44, ZN_W = 342, ZN_H = 170
const ZN_CX = ZN_X + ZN_W / 2
const ZN_CY = ZN_Y + ZN_H / 2

const FTILES = [
  { x: 76,  y: 80,  w: 82, h: 22, label: 'ALL FEATURES' },
  { x: 170, y: 80,  w: 82, h: 22, label: 'FULL UX'      },
  { x: 264, y: 80,  w: 82, h: 22, label: 'OPERATIONS'   },
  { x: 108, y: 112, w: 82, h: 22, label: 'SUPPORT'      },
  { x: 214, y: 112, w: 82, h: 22, label: 'ECONOMICS'    },
]

const M_X1 = ZN_X + ZN_W + 14
const M_X2 = 484
const METRICS = [
  { y: 68,  label: 'ACQUISITION COST' },
  { y: 96,  label: '90-DAY RETENTION' },
  { y: 124, label: 'UNIT ECONOMICS'   },
  { y: 152, label: 'OP. LOAD'         },
]

const GATE_X = 492, GATE_Y = 50, GATE_W = 118, GATE_H = 158
const GATE_CX = GATE_X + GATE_W / 2
const GATE_CY = GATE_Y + GATE_H / 2

type Mode = 'human' | 'ai'

// Human judgment markers shown in AI mode
const HUMAN_MARKERS = [
  { x: ZN_CX, y: ZN_Y - 22, text: 'REPRESENTATIVENESS: HUMAN JUDGMENT' },
  { x: ZN_CX, y: ZN_CY + 28, text: 'UNMODELED REALITY: SURFACES IN THE PILOT' },
  { x: GATE_CX, y: GATE_CY + 30, text: 'GO / NO-GO: HUMAN DECISION' },
]

export default function PLAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const zoneColor  = isAI ? INDIGO : BRICK
  const gateBorder = isAI ? `${INDIGO}0.65)` : `${BRICK}0.65)`
  const gateGlow   = isAI ? `${INDIGO}0.30)` : `${BRICK}0.35)`
  const tileStroke = isAI ? `${INDIGO}0.45)` : `${BRICK}0.45)`
  const tileFill   = isAI ? `${INDIGO}0.10)` : `${BRICK}0.10)`

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
          ? 'AI mode: zone turns indigo showing AI design help. Three amber markers highlight the judgments AI cannot make: representativeness, unmodeled operational reality, and the go/no-go decision.'
          : 'Human mode: full pilot zone in brick, all elements visible.'}
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="pl-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feFlood floodColor={gateGlow} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="pl-ai-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill={`${zoneColor}0.55)`} />
          </marker>
        </defs>

        {/* World background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* World labels */}
        {[
          { x: 7, y: 17, text: 'UN-LAUNCHED' },
          { x: 450, y: 17, text: 'MARKETS' },
          { x: 7, y: 254, text: 'MARKETS' },
          { x: 620, y: 195, text: 'UN-LAUNCHED' },
        ].map(({ x, y, text }) => (
          <text key={text + x} x={x} y={y}
            fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill="rgba(255,255,255,0.55)" style={{ userSelect: 'none' }}>
            {text}
          </text>
        ))}

        {/* Zone glow */}
        <motion.rect x={ZN_X} y={ZN_Y} width={ZN_W} height={ZN_H}
          fill={`${zoneColor}0.07)`} rx={3}
          filter="url(#pl-ai-glow)"
          animate={{ fill: `${zoneColor}0.07)` }}
          transition={{ duration: 0.40 }} />

        {/* Zone border */}
        <motion.rect x={ZN_X} y={ZN_Y} width={ZN_W} height={ZN_H}
          fill="none" stroke={`${zoneColor}0.70)`} strokeWidth="1.5" rx={3}
          animate={{ stroke: `${zoneColor}0.70)` }}
          transition={{ duration: 0.40 }} />

        {/* Boundary labels */}
        <motion.text x={ZN_CX} y={ZN_Y - 12}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          style={{ userSelect: 'none' }}
          animate={{ fill: `${zoneColor}0.65)` }}
          transition={{ duration: 0.40 }}>
          ⊞ SEGMENT · WHO IS EXPOSED
        </motion.text>

        <motion.text
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          style={{ userSelect: 'none' }}
          transform={`rotate(-90 ${ZN_X - 10} ${ZN_CY})`}
          animate={{ fill: `${zoneColor}0.65)` }}
          transition={{ duration: 0.40 }}>
          ◈ GEOGRAPHY · WHERE
        </motion.text>

        <motion.text x={ZN_CX} y={ZN_Y + ZN_H + 14}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          style={{ userSelect: 'none' }}
          animate={{ fill: `${zoneColor}0.65)` }}
          transition={{ duration: 0.40 }}>
          ⊟ TIMEFRAME · END DATE FIXED
        </motion.text>

        {/* AI label inside zone */}
        <AnimatePresence>
          {isAI && (
            <motion.text x={ZN_CX} y={63}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
              fill={`${INDIGO}0.80)`} style={{ userSelect: 'none' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.30 }}>
              AI HELPS DESIGN THIS
            </motion.text>
          )}
        </AnimatePresence>

        {/* REAL FULL SOLUTION label (human mode) */}
        <AnimatePresence>
          {!isAI && (
            <motion.text x={ZN_CX} y={63}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
              fill={`${BRICK}0.80)`} style={{ userSelect: 'none' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.30 }}>
              REAL · FULL SOLUTION
            </motion.text>
          )}
        </AnimatePresence>

        {/* Feature tiles */}
        {FTILES.map((t) => (
          <motion.g key={t.label}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.40 }}>
            <rect x={t.x} y={t.y} width={t.w} height={t.h}
              fill={tileFill} stroke={tileStroke} strokeWidth="1" rx={2} />
            <text x={t.x + t.w / 2} y={t.y + t.h / 2}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${zoneColor}0.90)`} style={{ userSelect: 'none' }}>
              {t.label}
            </text>
          </motion.g>
        ))}

        {/* Operations annotation */}
        <text x={ZN_CX} y={148}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill={`${zoneColor}0.40)`} style={{ userSelect: 'none' }}>
          REAL OPERATIONS · REAL CUSTOMERS · REAL MONEY
        </text>

        {/* Metric lines */}
        {METRICS.map((m) => (
          <motion.g key={m.label}
            animate={{ opacity: isAI ? 0.45 : 1 }}
            transition={{ duration: 0.40 }}>
            <line x1={M_X1} y1={m.y} x2={M_X2} y2={m.y}
              stroke={isAI ? `${INDIGO}0.45)` : `${BRICK}0.55)`}
              strokeWidth="1" markerEnd="url(#pl-ai-arr)" />
            <text x={M_X1 + (M_X2 - M_X1) / 2} y={m.y - 5}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={isAI ? `${INDIGO_TEXT}0.885)` : `rgba(183,145,135,0.905)`}
              style={{ userSelect: 'none' }}>
              {m.label}
            </text>
          </motion.g>
        ))}

        {/* Gate */}
        <motion.rect x={GATE_X} y={GATE_Y} width={GATE_W} height={GATE_H}
          fill={`${zoneColor}0.07)`} stroke={gateBorder} strokeWidth="1.5" rx={3}
          filter="url(#pl-ai-glow)"
          animate={{ fill: `${zoneColor}0.07)`, stroke: gateBorder }}
          transition={{ duration: 0.40 }} />
        <text x={GATE_CX} y={GATE_CY - 14}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
          fill={`${zoneColor}0.90)`} style={{ userSelect: 'none' }}>
          GO / NO-GO
        </text>
        <text x={GATE_CX} y={GATE_CY + 2}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={`${zoneColor}0.55)`} style={{ userSelect: 'none' }}>
          PRE-COMMITTED
        </text>
        <text x={GATE_CX} y={GATE_CY + 13}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
          fill={`${zoneColor}0.55)`} style={{ userSelect: 'none' }}>
          CRITERIA
        </text>

        {/* Human judgment markers (AI mode only) */}
        <AnimatePresence>
          {isAI && HUMAN_MARKERS.map((mk, i) => (
            <motion.g key={mk.text}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28, delay: prefersReduced ? 0 : 0.08 + i * 0.06 }}>
              <rect
                x={mk.x - 95} y={mk.y - 9}
                width={190} height={18}
                fill={`${AMBER}0.06)`} stroke={`${AMBER}0.30)`}
                strokeWidth="1" rx={2} />
              <text x={mk.x} y={mk.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
                {mk.text}
              </text>
            </motion.g>
          ))}
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
              {/* Genuine uplift */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <p className="font-mono uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                    Where AI genuinely helps
                  </p>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
                    Real uplift
                  </span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  AI accelerates the design of the pilot: analyzing segment data to size and characterize potential cohorts,
                  helping construct the metrics instrumentation plan, running market-sizing models for geography selection,
                  and analyzing pilot results at the end, surfacing patterns across acquisition, retention, and operational
                  performance faster and more completely than manual review. The design work and the analysis work both
                  move faster with AI.
                </p>
              </div>

              {/* Limit 1: representativeness */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${AMBER}0.22)` }}>
                <p className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                  Human judgment: representativeness
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  AI can analyze demographic and behavioral data for a candidate segment, but whether THIS segment
                  represents the population you intend to scale to (given the specific context, the market moment,
                  the operational constraints) is a judgment call about things AI cannot access. The representativeness
                  decision is yours to make and yours to defend when the results come in.
                </p>
              </div>

              {/* Limit 2: unmodeled operational reality */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${AMBER}0.22)` }}>
                <p className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                  Human judgment: what actually breaks
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  What breaks at the boundary (the supplier who cannot actually scale, the support team that hits its
                  capacity limit, the edge case in the billing flow that only appears at real volume) surfaces in the
                  pilot&rsquo;s operational reality. AI cannot predict this from data. It appears when real systems meet real
                  customers under real conditions. That gap between the model and the reality is the whole point of
                  running the pilot.
                </p>
              </div>

              {/* Limit 3: the gate decision */}
              <div className="rounded-lg p-4"
                style={{ border: `1px solid ${AMBER}0.22)` }}>
                <p className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                  Human judgment: the go/no-go decision
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  Pre-committed criteria answer the binary question of whether results are technically good enough.
                  The actual go decision carries organizational accountability: for the investment required to scale,
                  for the people and partners who will be affected, for the timing relative to everything else the
                  business is doing. AI can tell you what the data says. A human decides what to do with it, and
                  is accountable for the consequences of that call.
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-lg p-4"
              style={{ border: `1px solid ${BRICK}0.22)`, background: `${BRICK}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.70)` }}>
                The traditional method
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                A pilot launch is a manual process end to end. The team selects the segment, defines the geography,
                sets the metrics and success criteria, runs the operational launch, and calls the gate. The pilot
                produces real operational experience (what the supply chain actually does at volume, what the support
                load actually is, what the unit economics actually look like with real customers and real money) and
                that experience is the irreplaceable input to the scale decision.
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
              AI changes the design and analysis work around pilots. It does not change what a pilot is: running
              the real thing with bounded exposure to learn from real operational conditions. The judgment calls
              that make a pilot valid (representativeness, reading what the operations actually produced, calling
              the gate honestly) remain human.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
