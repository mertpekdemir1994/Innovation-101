'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const INDIGO = 'rgba(99,102,241,'
const AMBER  = 'rgba(217,119,6,'

const SVG_W = 700
const SVG_H = 536

const BOX_W = 264
const BOX_H = 50
const CX = 350
const BOX_LEFT  = CX - BOX_W / 2
const BOX_RIGHT = CX + BOX_W / 2

type Mode = 'human' | 'ai'

const HUMAN_CHOICES = [
  { id: 'aspiration',   cy: 66,  label: 'WINNING ASPIRATION',  sub: 'what does winning look like?',          heart: false, aiBadge: null },
  { id: 'where',        cy: 170, label: 'WHERE TO PLAY',       sub: 'which markets, segments, channels?',    heart: true,  aiBadge: 'AI LISTS ALL OPTIONS — WON\'T EXCLUDE' },
  { id: 'how',          cy: 274, label: 'HOW TO WIN',          sub: 'how do we create unique value there?',  heart: true,  aiBadge: 'AI OFFERS MULTIPLE WAYS — WON\'T COMMIT' },
  { id: 'capabilities', cy: 378, label: 'CAPABILITIES',        sub: 'what must we be able to do?',           heart: false, aiBadge: 'AI CAN ENUMERATE THESE' },
  { id: 'systems',      cy: 482, label: 'MANAGEMENT SYSTEMS',  sub: 'what systems and measures sustain it?', heart: false, aiBadge: 'AI CAN SUGGEST THESE' },
]

export default function SCCAIReactivated() {
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
                ? m === 'ai' ? `${INDIGO}0.10)` : `${PLUM}0.10)`
                : 'transparent',
              border: `1px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.35)` : `${PLUM}0.35)`
                : 'rgba(255,255,255,0.12)'}`,
              color: mode === m
                ? m === 'ai' ? `${INDIGO}1)` : `${PLUM}1)`
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
            ? 'AI mode: AI can enumerate options and check coherence, but Where to Play and How to Win remain human choices — AI\'s inclusive default produces plausible non-strategies that refuse to exclude.'
            : 'Human mode: five linked choices flowing top to bottom, Where to Play and How to Win highlighted as the heart that must fit together.'}>

          <defs>
            <filter id="scc-ai-plum-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
              <feFlood floodColor={`${PLUM}0.55)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="scc-ai-indigo-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${INDIGO}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="scc-ai-amber-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${AMBER}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <AnimatePresence mode="wait">
            <motion.g key={mode}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}>

              {/* Choice boxes */}
              {HUMAN_CHOICES.map((c) => {
                const isWhereOrHow = c.heart
                const isAIwarn = isAI && isWhereOrHow
                const boxColor   = isAI ? (isWhereOrHow ? AMBER : INDIGO) : PLUM
                const fillAlpha  = isAI ? (isWhereOrHow ? '0.08)' : '0.06)') : (c.heart ? '0.14)' : '0.06)')
                const strokeAlpha = isAI ? (isWhereOrHow ? '0.50)' : '0.35)') : (c.heart ? '0.70)' : '0.38)')
                const labelColor = isAI ? (isWhereOrHow ? `${AMBER}0.90)` : `${INDIGO}0.70)`) : (c.heart ? `${PLUM}1)` : 'rgba(255,255,255,0.72)')
                const subColor   = isAI ? (isWhereOrHow ? `${AMBER}0.50)` : `${INDIGO}0.40)`) : (c.heart ? `${PLUM}0.55)` : 'rgba(255,255,255,0.28)')
                const glowId = isAI ? (isWhereOrHow ? 'url(#scc-ai-amber-glow)' : 'url(#scc-ai-indigo-glow)') : (c.heart ? 'url(#scc-ai-plum-glow)' : 'none')

                return (
                  <g key={c.id}>
                    <rect
                      x={BOX_LEFT} y={c.cy - BOX_H / 2} width={BOX_W} height={BOX_H} rx={5}
                      fill={`${boxColor}${fillAlpha}`}
                      stroke={`${boxColor}${strokeAlpha}`}
                      strokeWidth={isAIwarn ? 1.5 : 1.2}
                      style={{ filter: glowId }}
                    />
                    <text x={CX} y={c.cy - 6} textAnchor="middle"
                      fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.13em" fontWeight="600"
                      fill={labelColor} style={{ userSelect: 'none' }}>
                      {c.label}
                    </text>
                    <text x={CX} y={c.cy + 9} textAnchor="middle"
                      fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                      fill={subColor} style={{ userSelect: 'none' }}>
                      {c.sub}
                    </text>

                    {/* AI badges */}
                    {isAI && c.aiBadge && (
                      <g>
                        <rect x={BOX_RIGHT + 6} y={c.cy - 9} width={160} height={14} rx={3}
                          fill={isWhereOrHow ? `${AMBER}0.10)` : `${INDIGO}0.08)`}
                          stroke={isWhereOrHow ? `${AMBER}0.25)` : `${INDIGO}0.18)`}
                          strokeWidth={0.5} />
                        <text x={BOX_RIGHT + 10} y={c.cy + 2} textAnchor="start"
                          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                          fill={isWhereOrHow ? `${AMBER}0.75)` : `${INDIGO}0.60)`}
                          style={{ userSelect: 'none' }}>
                          {c.aiBadge}
                        </text>
                      </g>
                    )}

                    {/* Human mode heart badge */}
                    {!isAI && c.heart && (
                      <text x={BOX_RIGHT + 9} y={c.cy + 3} textAnchor="start"
                        fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                        fill={`${PLUM}0.50)`} style={{ userSelect: 'none' }}>
                        ★ the heart
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Down connectors */}
              {HUMAN_CHOICES.slice(0, -1).map((c, i) => {
                const y1 = c.cy + BOX_H / 2 + 4
                const y2 = HUMAN_CHOICES[i + 1].cy - BOX_H / 2 - 10
                const connColor = isAI ? INDIGO : PLUM
                const alpha = isAI ? '0.35)' : '0.45)'
                return (
                  <g key={`conn-${i}`}>
                    <line x1={CX} y1={y1} x2={CX} y2={y2}
                      stroke={`${connColor}${alpha}`} strokeWidth={1.1} />
                    <polygon
                      points={`${CX - 5},${y2} ${CX + 5},${y2} ${CX},${y2 + 9}`}
                      fill={`${connColor}${alpha}`} />
                  </g>
                )
              })}

              {/* Right-side coherence arc */}
              <path
                d={`M ${BOX_RIGHT},${482} C 616,${482} 616,${66} ${BOX_RIGHT},${66}`}
                fill="none"
                stroke={isAI ? `${PLUM}0.35)` : `${PLUM}0.28)`}
                strokeWidth={1.0} strokeDasharray="4 3"
              />
              <polygon
                points={`${BOX_RIGHT + 1},${66} ${BOX_RIGHT + 11},${60} ${BOX_RIGHT + 11},${72}`}
                fill={isAI ? `${PLUM}0.35)` : `${PLUM}0.28)`} />
              <text x={632} y={295} textAnchor="middle"
                fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={isAI ? `${PLUM}0.35)` : `${PLUM}0.28)`} style={{ userSelect: 'none' }}>
                {isAI ? '↑ AI CAN CHECK COHERENCE ↓' : '↑ MUST COHERE ↓'}
              </text>

              {/* WHERE↔HOW arc */}
              <path
                d={`M ${BOX_LEFT},${170} C 148,${170} 148,${274} ${BOX_LEFT},${274}`}
                fill="none"
                stroke={isAI ? `${PLUM}0.55)` : `${PLUM}0.48)`}
                strokeWidth={isAI ? 1.8 : 1.2}
                style={{ filter: isAI ? 'url(#scc-ai-plum-glow)' : 'none' }}
              />
              <polygon
                points={`${BOX_LEFT - 1},${274} ${BOX_LEFT - 11},${268} ${BOX_LEFT - 11},${280}`}
                fill={isAI ? `${PLUM}0.55)` : `${PLUM}0.48)`} />
              <text x={118} y={222} textAnchor="middle"
                fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={isAI ? `${PLUM}0.70)` : `${PLUM}0.48)`} style={{ userSelect: 'none' }}>
                {isAI ? 'BET STAYS HUMAN' : 'MUST FIT'}
              </text>

              {/* AI mode: "THE CHOICE STAYS HUMAN" center overlay */}
              {isAI && (
                <g>
                  <rect x={BOX_LEFT - 20} y={212} width={BOX_W + 40} height={28} rx={4}
                    fill={`${PLUM}0.12)`} stroke={`${PLUM}0.35)`} strokeWidth={0.8} />
                  <text x={CX} y={223} textAnchor="middle"
                    fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
                    fill={`${PLUM}0.88)`}
                    style={{ userSelect: 'none', filter: `drop-shadow(0 0 8px ${PLUM}0.45))` }}>
                    THE CHOICE / EXCLUSION STAYS HUMAN
                  </text>
                  <text x={CX} y={234} textAnchor="middle"
                    fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                    fill={`${PLUM}0.50)`} style={{ userSelect: 'none' }}>
                    AI&apos;s inclusive default avoids exactly this — it will not exclude
                  </text>
                </g>
              )}
            </motion.g>
          </AnimatePresence>

          {/* Caption */}
          <text x={SVG_W / 2} y={SVG_H - 6} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill="rgba(255,255,255,0.14)" style={{ userSelect: 'none' }}>
            {isAI
              ? 'AI CAN FILL ALL FIVE BOXES — BUT STRATEGY IS DECIDING WHAT NOT TO DO, AND THAT IS WHAT AI AVOIDS'
              : 'THE HARDEST CHOICE IS WHERE NOT TO PLAY — AND THAT IS EXACTLY WHERE THE STRATEGIC VALUE LIVES'}
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
              { label: 'REAL CHOICES', body: 'The cascade forces real choices — including explicit decisions about where NOT to play and how NOT to win. Without those exclusions, the cascade is five boxes filled with aspiration, not strategy.' },
              { label: 'THE HEART MUST FIT', body: 'Where-to-play and how-to-win must fit each other tightly. The cascade is only as strong as that joint. Test the fit repeatedly, and treat any misalignment as a broken strategy, not a minor inconsistency.' },
              { label: 'TEST THE WHOLE', body: 'The five choices are not independent. Test them as a chain: does each reinforce the next? A contradiction anywhere in the cascade means the strategy fails not because a single choice is wrong, but because the choices do not cohere.' },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${PLUM}0.18)`, background: `${PLUM}0.04)` }}>
                <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: `${PLUM}0.75)` }}>{item.label}</p>
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
              {
                label: 'WHERE AI HELPS',
                color: INDIGO,
                body: 'AI can draft and sharpen a winning aspiration, enumerate where-to-play options and how-to-win approaches for consideration, list the capabilities a given how-to-win would require, and check coherence between choices already made. As a sparring partner, it adds real value.',
              },
              {
                label: 'WHERE AI STRUGGLES',
                color: AMBER,
                body: 'Asked to choose, AI will present options with pros and cons rather than commit. Its instinct to cover all the bases — offend no possibility — is the precise opposite of strategy. A where-to-play that includes everywhere is a non-choice, and AI\'s default is exactly that.',
              },
              {
                label: 'THE BET STAYS HUMAN',
                color: PLUM,
                body: 'A real strategic choice is a bet — a commitment of the organisation\'s resources and future on a particular where-and-how, made under uncertainty, owned by accountable leaders. That act of decision, and the courage to exclude, cannot be delegated to a model that bears none of the consequences.',
              },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${item.color}0.20)`, background: `${item.color}0.05)` }}>
                <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: `${item.color}0.78)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.body}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
