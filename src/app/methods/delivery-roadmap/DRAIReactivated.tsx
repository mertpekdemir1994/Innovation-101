'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700, SVG_H = 268, CY = 134

type Mode = 'human' | 'ai'

const BETS = [
  { label: 'PROOF',   sub: 'FEASIBILITY', hor: 'NOW',   x: 14,  y: 116, w: 90,  h: 36, conf: 1.00, dash: '',    sw: 2.0 },
  { label: 'RELEASE', sub: 'MVP / MLP',   hor: 'NEXT',  x: 158, y: 110, w: 92,  h: 48, conf: 0.78, dash: '',    sw: 1.8 },
  { label: 'PILOT',   sub: 'BOUNDED',     hor: 'LATER', x: 312, y: 103, w: 94,  h: 62, conf: 0.52, dash: '5 3', sw: 1.5 },
  { label: 'ROLLOUT', sub: '~STAGED',     hor: '~FAR',  x: 464, y: 94,  w: 102, h: 80, conf: 0.32, dash: '6 4', sw: 1.2 },
]

const GATES = [
  { x: 131 },
  { x: 281 },
  { x: 435 },
]

// AI: dependency arrows shown below the bets (mechanics help)
const DEP_ARROWS = [
  { x1: 104, y1: 148, x2: 158, y2: 148, label: 'DEP' },
  { x1: 250, y1: 154, x2: 312, y2: 154, label: 'DEP' },
  { x1: 406, y1: 160, x2: 464, y2: 160, label: 'DEP' },
]

const LEARN_A = 'M 514,90 C 514,42 204,42 204,108'

const AI_MECHANICS = [
  { x: 59,  y: 180, label: 'CAPACITY MODEL' },
  { x: 204, y: 180, label: 'DEPENDENCY MAP' },
  { x: 515, y: 180, label: 'MAINTENANCE LOG' },
]

const CARDS = [
  {
    color: INDIGO,
    badge: 'Genuine uplift',
    head: 'AI is excellent at roadmap mechanics.',
    body: 'Dependency detection between bets, capacity modelling against team bandwidth, sequencing option generation, and ongoing maintenance of the roadmap document itself: these are real, practical gains. AI can generate a well-structured, dependency-aware sequencing of work in minutes and flag when adding a new bet violates an existing dependency. Use it for this.',
  },
  {
    color: AMBER,
    badge: 'Cannot judge',
    head: 'AI cannot tell you which bet is existential.',
    body: 'Which assumption, if wrong, kills the entire endeavour? That judgment requires knowing the business, the competitive context, the team\'s actual capability, and the organisation\'s risk tolerance. AI cannot make this judgment. It will sequence bets in a plausible order, but plausible is not the same as right, and a confidently wrong sequence is worse than an uncertain right one.',
  },
  {
    color: AMBER,
    badge: 'False precision danger',
    head: 'AI produces uniformly confident plans.',
    body: 'Ask an AI to build a delivery roadmap and it will produce a beautiful, fully specified, uniformly confident sequence all the way to the far end. The gradient is lost. Every bet looks as firm as week two. The honest uncertainty that should characterise the far end is smoothed into equal confidence. This is the dangerous artefact: it looks better and is worse. The team treats it as a plan rather than a sequence of bets.',
  },
  {
    color: BRICK,
    badge: 'Honest synthesis',
    head: 'Use AI for mechanics. Hold the gradient yourself.',
    body: 'The right disposition: let AI handle dependency mapping, capacity modelling, and maintenance. It is genuinely better at these tasks. But the confidence gradient (which bets are firm and which are loose, which assumption is existential) must come from a human who understands the actual risk landscape. Review any AI-generated roadmap for false precision before it is shared. Reintroduce the gradient. Reintroduce the looseness at the far end.',
  },
]

export default function DRAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  // In AI mode: all bets use BET 1's visual properties
  const betConf = (conf: number) => isAI ? 1.0 : conf
  const betDash = (dash: string) => isAI ? '' : dash
  const betSW   = (sw: number)   => isAI ? 2.0 : sw
  const betHor  = (hor: string)  => isAI ? '' : hor

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
                : m === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`,
              border: `1.5px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`
                : m === 'ai' ? `${INDIGO}0.30)` : `${BRICK}0.30)`}`,
            }}>
            {m === 'human' ? 'Human' : 'With AI'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label={isAI
          ? 'AI mode: all bets are equally solid, the confidence gradient is lost, producing false precision to the far end. Mechanics assistance shown in indigo.'
          : 'Human mode: confidence gradient intact. Near bets solid, far bets loose and dashed.'}
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', display: 'block' }}
      >
        <defs>
          <filter id="dr-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${BRICK}0.32)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dr-ai-indigo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${INDIGO}0.38)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="dr-ai-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${INDIGO}0.65)`} />
          </marker>
          <marker id="dr-ai-arr-b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${AMBER}0.55)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Human mode: FIRM → LOOSE indicator */}
        {!isAI && (
          <g>
            <text x={22} y={18} fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`rgba(183,145,135,0.895)`} style={{ userSelect: 'none' }}>FIRM</text>
            <text x={564} y={18} textAnchor="end" fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`rgba(183,145,135,0.849)`} style={{ userSelect: 'none' }}>LOOSE</text>
          </g>
        )}

        {/* AI mode: false precision warning */}
        {isAI && (
          <text x={SVG_W / 2} y={20} textAnchor="middle" fontSize="5"
            fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
            fill={`${AMBER}0.78)`} style={{ userSelect: 'none' }}>
            ⚠ FALSE PRECISION: THE WRONG ROADMAP, BEAUTIFULLY MADE
          </text>
        )}

        {/* Gate markers */}
        {GATES.map((g, i) => (
          <g key={i}>
            <line x1={g.x} y1={86} x2={g.x} y2={182}
              stroke={`${BRICK}0.14)`} strokeWidth={0.9} strokeDasharray="3 3" />
            <rect x={g.x - 5} y={CY - 5} width={10} height={10}
              transform={`rotate(45 ${g.x} ${CY})`}
              fill={`${BRICK}0.06)`} stroke={`${BRICK}0.28)`} strokeWidth={0.9} />
          </g>
        ))}

        {/* Bet boxes */}
        {BETS.map((b, i) => {
          const conf = betConf(b.conf)
          const dash = betDash(b.dash)
          const sw   = betSW(b.sw)
          const hor  = betHor(b.hor)
          return (
            <g key={i}>
              <rect
                x={b.x} y={b.y} width={b.w} height={b.h}
                fill={`${BRICK}${conf * 0.12})`}
                stroke={isAI && i === BETS.length - 1
                  ? `${AMBER}0.55)` : `${BRICK}${conf * 0.72})`}
                strokeWidth={sw}
                strokeDasharray={dash}
                rx={3}
                filter={!isAI && i === 0 ? 'url(#dr-ai-glow)' : undefined}
              />
              {hor && (
                <text x={b.x + b.w / 2} y={b.y + 9} textAnchor="middle" fontSize="3.4"
                  fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${BRICK}${conf * 0.50})`} style={{ userSelect: 'none' }}>
                  {hor}
                </text>
              )}
              <text x={b.x + b.w / 2} y={CY - 2} textAnchor="middle" dominantBaseline="middle"
                fontSize="5.6" fontFamily="var(--font-mono)" letterSpacing="0.11em" fontWeight="600"
                fill={`${BRICK}${conf * 0.96})`} style={{ userSelect: 'none' }}>
                {b.label}
              </text>
              <text x={b.x + b.w / 2} y={b.y + b.h - 9} textAnchor="middle" fontSize="3.6"
                fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${BRICK}${conf * 0.45})`} style={{ userSelect: 'none' }}>
                {b.sub}
              </text>
              {/* AI mode: "EQUALLY CONFIDENT" tag on far bet */}
              {isAI && i === BETS.length - 1 && (
                <text x={b.x + b.w / 2} y={b.y - 6} textAnchor="middle" fontSize="3.6"
                  fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${AMBER}0.70)`} style={{ userSelect: 'none' }}>
                  EQUALLY CONFIDENT AS DAY ONE
                </text>
              )}
            </g>
          )
        })}

        {/* Human mode: learning arrow */}
        {!isAI && (
          <>
            <path d={LEARN_A} fill="none"
              stroke={`${AMBER}0.38)`} strokeWidth={1.2} strokeDasharray="4 3"
              markerEnd="url(#dr-ai-arr-b)" />
            <text x={360} y={36} textAnchor="middle" fontSize="3.4"
              fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={`${AMBER_TEXT}0.798)`} style={{ userSelect: 'none' }}>
              WHAT YOU LEARN RESHAPES WHAT COMES NEXT
            </text>
          </>
        )}

        {/* AI mode: mechanics overlays (INDIGO) */}
        {isAI && (
          <>
            {/* Dependency arrows below bets */}
            {DEP_ARROWS.map((a, i) => (
              <g key={i}>
                <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
                  stroke={`${INDIGO}0.52)`} strokeWidth={1.2}
                  markerEnd="url(#dr-ai-arr)"
                  filter="url(#dr-ai-indigo-glow)" />
              </g>
            ))}
            {/* Mechanics labels */}
            {AI_MECHANICS.map((m, i) => (
              <g key={i}>
                <rect x={m.x - 40} y={m.y - 7} width={80} height={16}
                  fill={`${INDIGO}0.08)`} stroke={`${INDIGO}0.28)`} strokeWidth={0.8} rx={2} />
                <text x={m.x} y={m.y + 2} textAnchor="middle" fontSize="3.8"
                  fontFamily="var(--font-mono)" letterSpacing="0.06em"
                  fill={`${INDIGO_TEXT}0.941)`} style={{ userSelect: 'none' }}>
                  {m.label}
                </text>
              </g>
            ))}
            <text x={280} y={218} textAnchor="middle" fontSize="3.6"
              fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={`${INDIGO_TEXT}0.895)`} style={{ userSelect: 'none' }}>
              AI: MECHANICS ASSISTANCE, GENUINE UPLIFT
            </text>
          </>
        )}

        {/* Caption */}
        <text x={SVG_W / 2} y={SVG_H - 7} textAnchor="middle" fontSize="4.0"
          fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>
          {isAI
            ? 'It looks better and is worse. The gradient was the honesty.'
            : 'Near bets are firm. Far bets are deliberately loose. The arrows are the honesty.'}
        </text>
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {CARDS.map((c, i) => (
            <div key={i} className="rounded-lg p-5"
              style={{
                border: `1px solid ${c.color}0.22)`,
                background: `${c.color}0.05)`,
                opacity: (i === 0 || i === 3) ? 1 : isAI ? 1 : 0.45,
              }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono tracking-widest px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: 'var(--text-2xs)',
                    background: `${c.color}0.12)`,
                    color: `${c.color}0.78)`,
                    border: `1px solid ${c.color}0.25)`,
                  }}>
                  {c.badge}
                </span>
              </div>
              <p className="font-semibold mb-2"
                style={{ fontSize: 'var(--text-sm)', color: `${c.color}0.85)` }}>
                {c.head}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                {c.body}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
