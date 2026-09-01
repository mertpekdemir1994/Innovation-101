'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 700
const SVG_H = 262

const AXIS_Y  = 118
const AXIS_X1 = 54
const AXIS_X2 = 660

const NAME_Y = 76
const SUB_Y  = 92

type Mode = 'human' | 'ai'

type Rung = { id: string; x: number; low: boolean; name: string; sub: string; cost: string; aicost: string }

const RUNGS: Rung[] = [
  { id: 'paper',    x: 103, low: true,  name: 'PAPER SKETCH',       sub: 'hand-drawn · minutes · free',  cost: 'MINUTES / FREE', aicost: 'AI: INSTANT' },
  { id: 'quick',   x: 248, low: true,  name: 'CONCEPTUAL VISUAL',  sub: 'fast drawn or digital',         cost: 'UNDER AN HOUR',  aicost: 'AI: INSTANT' },
  { id: 'click',   x: 393, low: false, name: 'CLICKABLE MOCKUP',   sub: 'e.g. Figma · interactive',     cost: 'HOURS',          aicost: 'AI: INSTANT' },
  { id: 'polished', x: 558, low: false, name: 'POLISHED PROTOTYPE', sub: 'near-real · expensive',        cost: 'DAYS',           aicost: 'AI: INSTANT' },
]

const ZONE_X1  = RUNGS[0].x - 22
const ZONE_X2  = RUNGS[1].x + 22
const ZONE_MID = (ZONE_X1 + ZONE_X2) / 2

export default function RPAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const fade = prefersReduced ? { duration: 0 } : { duration: 0.28 }

  return (
    <div className="w-full space-y-5">
      {/* Toggle */}
      <div className="flex gap-2">
        {(['human', 'ai'] as Mode[]).map(m => (
          <button key={m}
            onClick={() => setMode(m)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.10)` : `${CLAY}0.10)`
                : 'transparent',
              border: `1px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.35)` : `${CLAY}0.35)`
                : 'rgba(255,255,255,0.12)'}`,
              color: mode === m
                ? m === 'ai' ? `${INDIGO}1)` : `${CLAY}1)`
                : 'rgba(255,255,255,0.40)',
            }}>
            {m === 'human' ? 'Human-led' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}
          aria-label={isAI
            ? 'AI mode: all fidelity levels marked AI: INSTANT, the cost of climbing the ladder has collapsed. The just enough to learn judgment is more important, not less.'
            : 'Human mode: fidelity spectrum from rough paper sketch to polished prototype, with cost rising from left to right. Just enough to learn zone marked low.'}>
          <defs>
            <filter id="rp-ai-clay-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feFlood floodColor={`${CLAY}0.50)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="rp-ai-indigo-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feFlood floodColor={`${INDIGO}0.50)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Axis */}
          <line x1={AXIS_X1} y1={AXIS_Y} x2={AXIS_X2} y2={AXIS_Y}
            stroke={isAI ? `${INDIGO}0.20)` : 'rgba(255,255,255,0.12)'} strokeWidth={1} />
          <path d={`M ${AXIS_X2-6} ${AXIS_Y-4} L ${AXIS_X2+2} ${AXIS_Y} L ${AXIS_X2-6} ${AXIS_Y+4}`}
            stroke={isAI ? `${INDIGO}0.25)` : 'rgba(255,255,255,0.18)'} strokeWidth={1} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />

          {/* AI: "fidelity is nearly free" banner on the axis */}
          <AnimatePresence>
            {isAI && (
              <motion.g key="ai-banner"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={fade}>
                <rect x={AXIS_X1} y={AXIS_Y - 20} width={AXIS_X2 - AXIS_X1} height={14} rx={3}
                  fill={`${INDIGO}0.08)`} stroke={`${INDIGO}0.18)`} strokeWidth={0.6} />
                <text x={(AXIS_X1 + AXIS_X2) / 2} y={AXIS_Y - 10} textAnchor="middle"
                  fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`${INDIGO}0.70)`} style={{ userSelect: 'none' }}>
                  AI COLLAPSES THE COST OF FIDELITY, ALL LEVELS NOW INSTANT
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Rungs: transition between modes */}
          <AnimatePresence mode="wait">
            <motion.g key={mode}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}>
              {RUNGS.map(r => {
                const strokeColor = isAI
                  ? `${INDIGO}0.65)` : r.low ? `${CLAY}0.80)` : 'rgba(255,255,255,0.32)'
                const fillColor = isAI
                  ? `${INDIGO}0.10)` : r.low ? `${CLAY}0.12)` : 'rgba(255,255,255,0.05)'
                const nameColor = isAI
                  ? `${INDIGO}0.80)` : r.low ? `${CLAY}0.88)` : 'rgba(255,255,255,0.58)'
                const subColor = isAI
                  ? `${INDIGO}0.42)` : r.low ? `${CLAY}0.44)` : 'rgba(255,255,255,0.26)'
                const costDisplay = isAI ? r.aicost : r.cost
                const costColor = isAI
                  ? `${INDIGO}0.60)` : r.low ? `${CLAY}0.42)` : 'rgba(255,255,255,0.25)'
                return (
                  <g key={r.id}>
                    <line x1={r.x} y1={AXIS_Y - 5} x2={r.x} y2={AXIS_Y + 5}
                      stroke={strokeColor} strokeWidth={1.2} />
                    <circle cx={r.x} cy={AXIS_Y} r={5}
                      fill={fillColor} stroke={strokeColor} strokeWidth={1.2}
                      style={{ filter: isAI ? 'url(#rp-ai-indigo-glow)' : (r.low ? 'url(#rp-ai-clay-glow)' : 'none') }} />
                    <line x1={r.x} y1={AXIS_Y - 6} x2={r.x} y2={SUB_Y}
                      stroke={isAI ? `${INDIGO}0.10)` : (r.low ? `${CLAY}0.14)` : 'rgba(255,255,255,0.08)')}
                      strokeWidth={0.8} strokeDasharray="2 2" />
                    <text x={r.x} y={NAME_Y} textAnchor="middle"
                      fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.11em"
                      fill={nameColor} style={{ userSelect: 'none' }}>{r.name}</text>
                    <text x={r.x} y={SUB_Y} textAnchor="middle"
                      fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                      fill={subColor} style={{ userSelect: 'none' }}>{r.sub}</text>
                    <text x={r.x} y={AXIS_Y + 20} textAnchor="middle"
                      fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                      fill={costColor} style={{ userSelect: 'none' }}>{costDisplay}</text>
                  </g>
                )
              })}

              {/* JUST ENOUGH TO LEARN zone: more prominent in AI mode */}
              <g>
                <line x1={ZONE_X1} y1={162} x2={ZONE_X2} y2={162}
                  stroke={`${CLAY}${isAI ? '0.55)' : '0.32)'}`} strokeWidth={isAI ? 1.2 : 0.8} />
                <line x1={ZONE_X1} y1={154} x2={ZONE_X1} y2={170}
                  stroke={`${CLAY}${isAI ? '0.55)' : '0.32)'}`} strokeWidth={isAI ? 1.2 : 0.8} />
                <line x1={ZONE_X2} y1={154} x2={ZONE_X2} y2={170}
                  stroke={`${CLAY}${isAI ? '0.55)' : '0.32)'}`} strokeWidth={isAI ? 1.2 : 0.8} />
                <text x={ZONE_MID} y={182} textAnchor="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  fill={`${CLAY}${isAI ? '0.90)' : '0.72)'}`}
                  style={{ filter: isAI ? `drop-shadow(0 0 6px ${CLAY}0.40))` : 'none', userSelect: 'none' }}>
                  {isAI ? '← THIS JUDGMENT MATTERS MORE, NOT LESS' : 'JUST ENOUGH TO LEARN'}
                </text>
                {isAI && (
                  <text x={ZONE_MID} y={194} textAnchor="middle"
                    fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                    fill={`${CLAY}0.48)`} style={{ userSelect: 'none' }}>
                    AI removed the cost that used to enforce this, the discipline must stay human
                  </text>
                )}
              </g>

              {/* Warning zone: expands in AI mode */}
              {isAI ? (
                <g>
                  <rect x={300} y={50} width={360} height={20} rx={3}
                    fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.18)" strokeWidth={0.6} />
                  <text x={480} y={63} textAnchor="middle"
                    fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                    fill="rgba(245,158,11,0.55)" style={{ userSelect: 'none' }}>
                    ⚠ AI DEFAULTS TO HIGH FIDELITY, FEEDBACK DRIFTS TO POLISH BY DEFAULT
                  </text>
                </g>
              ) : (
                <text x={558} y={56} textAnchor="middle"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                  fill="rgba(245,158,11,0.40)" style={{ userSelect: 'none' }}>
                  ⚠ FEEDBACK DRIFTS TO POLISH PAST HERE
                </text>
              )}
            </motion.g>
          </AnimatePresence>

          {/* Caption */}
          <text x={SVG_W / 2} y={SVG_H - 6} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.14)" style={{ userSelect: 'none' }}>
            {isAI
              ? 'AI COLLAPSES THE COST OF FIDELITY, THE JUDGMENT ABOUT WHAT TO BUILD IS MORE IMPORTANT THAN EVER'
              : 'THE RIGHT FIDELITY IS NOT THE HIGHEST YOU CAN BUILD, IT IS THE LOWEST THAT ANSWERS YOUR QUESTION'}
          </text>
        </svg>
      </div>

      {/* Explanation cards */}
      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'START LOW', body: 'Default to the lowest fidelity that could answer your question. For concept questions, that is usually paper. Only climb when the question shifts.' },
              { label: 'CLIMB DELIBERATELY', body: 'Each rung up costs more time and pulls feedback toward polish. Climb only when the question genuinely requires higher fidelity, never for polish\'s own sake.' },
              { label: 'MATCH THE QUESTION', body: 'The right fidelity follows from the question, not the habit. A clickable mock earns its place the moment the question becomes about flow and interaction, not before.' },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${CLAY}0.18)`, background: `${CLAY}0.04)` }}>
                <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: `${CLAY}0.75)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.body}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'FIDELITY IS FREE NOW', body: 'AI can generate a refined, clickable, near-real prototype in minutes. The entire cost curve of the ladder has collapsed. That is a genuine superpower when fidelity is what the question needs.' },
              { label: 'FEEDBACK STILL DRIFTS', body: 'An AI mock looks finished, so users critique polish (color, copy, layout) instead of the concept. The fundamental problem that low fidelity solved is now the default state.' },
              { label: 'JUDGMENT MATTERS MORE', body: 'AI removes the cost that used to enforce low fidelity. The discipline (what am I trying to learn, and what is the least that answers it?) must now be actively maintained, not built in.' },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${INDIGO}0.18)`, background: `${INDIGO}0.04)` }}>
                <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: `${INDIGO}0.75)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.body}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
