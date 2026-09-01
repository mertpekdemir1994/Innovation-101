'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700, SVG_H = 258

const CX = 210, CY = 40, CW = 280, CH = 140
const CCX = CX + CW / 2  // 350

const PR = 12, DR = 5

const P1 = { cx: 72, cy: 68 }
const P2 = { cx: 72, cy: 165 }
const P3 = { cx: 628, cy: 68 }
const P4 = { cx: 628, cy: 165 }
const T1 = { cx: 275, cy: 232 }
const T2 = { cx: 425, cy: 232 }

type Mode = 'human' | 'ai'

// AI support badges - shown at periphery in AI mode
const AI_BADGES = [
  { x: 130, y: 12, w: 96,  label: 'AI: AGENDA',    id: 'agenda'   },
  { x: 480, y: 12, w: 106, label: 'AI: STIMULUS',  id: 'stimulus' },
  { x: 255, y: 215, w: 104, label: 'AI: SYNTHESIS', id: 'synthesis'},
]

export default function CCWAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  return (
    <div className="w-full space-y-5">
      {/* Toggle */}
      <div className="flex justify-center">
        <div className="flex rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {(['human', 'ai'] as Mode[]).map(m => (
            <button key={m}
              onClick={() => setMode(m)}
              className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
              aria-pressed={mode === m}
              style={{
                background: mode === m
                  ? m === 'ai' ? `${INDIGO}0.25)` : `${CLAY}0.22)`
                  : 'transparent',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.38)',
                border: `1px solid ${mode === m
                  ? (m === 'ai' ? `${INDIGO}0.55)` : `${CLAY}0.55)`)
                  : 'transparent'}`,
              }}>
              {m === 'human' ? 'Human Co-Creation' : 'With AI (hypothetical)'}
            </button>
          ))}
        </div>
      </div>

      {/* SVG */}
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
        style={{ overflow: 'visible' }}
        aria-label={isAI
          ? 'AI mode: AI support badges (agenda, stimulus, synthesis) appear around the periphery in indigo. A simulated-participant node appears crossed out in indigo. Real participant nodes remain in clay and are annotated: REAL PARTICIPANTS, CANNOT BE SIMULATED. The core human collaboration stays highlighted.'
          : 'Human co-creation mode: four participants and two team members contribute actively to the shared canvas. All contribution lines active in clay. The collaboration is fully human.'}>
        <defs>
          <filter id="ccw-ai-clay-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${CLAY}0.38)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ccw-ai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
            <feFlood floodColor={`${CLAY}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Mode label */}
        <text x={CCX} y={24} textAnchor="middle"
          fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.18em"
          fill={isAI ? `${INDIGO_TEXT}0.916)` : `${CLAY_TEXT}0.933)`}
          style={{ userSelect: 'none', transition: 'fill 0.35s' }}>
          {isAI ? 'AI ASSISTS AT THE EDGES · REAL PARTICIPANTS STAY AT THE CENTER' : 'DESIGN WITH · REAL PEOPLE CO-CREATING'}
        </text>

        {/* Canvas */}
        <g>
          <rect x={CX - 3} y={CY - 3} width={CW + 6} height={CH + 6} rx={11}
            fill="none" stroke={`${CLAY}0.10)`} strokeWidth={7}
            style={{ filter: isAI ? 'none' : 'url(#ccw-ai-clay-glow)' }} />
          <rect x={CX} y={CY} width={CW} height={CH} rx={8}
            fill={`${CLAY}0.05)`}
            stroke={isAI ? `${CLAY}0.22)` : `${CLAY}0.30)`}
            strokeWidth={1.2}
            style={{ transition: 'stroke 0.35s' }} />
          <text x={CCX} y={CX + CH / 2 - 4} textAnchor="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.16em"
            fill={`${CLAY_TEXT}0.828)`} style={{ userSelect: 'none' }}>
            SHARED CANVAS
          </text>
          {/* Contribution cards */}
          {[
            { x: 222, y: 54,  w: 96,  h: 18, label: 'LIVED EXPERIENCE',  clay: true  },
            { x: 372, y: 54,  w: 104, h: 18, label: 'SPECIFIC CONTEXT',  clay: true  },
            { x: 222, y: 96,  w: 102, h: 18, label: 'DESIGN APPROACH',   clay: false },
            { x: 346, y: 96,  w: 130, h: 18, label: 'OPERATIONAL DETAIL', clay: true  },
            { x: 250, y: 148, w: 82,  h: 18, label: 'PAIN POINT',        clay: true  },
            { x: 364, y: 148, w: 112, h: 18, label: 'WORKABLE CHANGE',   clay: false },
          ].map((c, i) => (
            <g key={i}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3}
                fill={c.clay ? `${CLAY}0.10)` : 'rgba(255,255,255,0.05)'}
                stroke={c.clay ? `${CLAY}0.48)` : 'rgba(255,255,255,0.18)'}
                strokeWidth={0.8} />
              <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={c.clay ? `${CLAY_TEXT}0.975)` : 'rgba(255,255,255,0.69)'}
                style={{ userSelect: 'none' }}>
                {c.label}
              </text>
            </g>
          ))}
        </g>

        {/* Contribution lines */}
        {[
          { x1: P1.cx + PR + 2, y1: P1.cy, x2: CX,      y2: 82,      clay: true  },
          { x1: P2.cx + PR + 2, y1: P2.cy, x2: CX,      y2: 150,     clay: true  },
          { x1: P3.cx - PR - 2, y1: P3.cy, x2: CX + CW, y2: 82,      clay: true  },
          { x1: P4.cx - PR - 2, y1: P4.cy, x2: CX + CW, y2: 150,     clay: true  },
          { x1: T1.cx, y1: T1.cy - PR - 2, x2: 290,     y2: CY + CH, clay: false },
          { x1: T2.cx, y1: T2.cy - PR - 2, x2: 410,     y2: CY + CH, clay: false },
        ].map((l, i) => (
          <line key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={l.clay ? `${CLAY}0.38)` : 'rgba(255,255,255,0.18)'}
            strokeWidth={0.9} strokeDasharray="4 3" />
        ))}

        {/* Participant nodes - remain clay and active even in AI mode */}
        {[
          { ...P1, anchor: 'end' as const,   lx: P1.cx - PR - 4, ly: P1.cy },
          { ...P2, anchor: 'end' as const,   lx: P2.cx - PR - 4, ly: P2.cy },
          { ...P3, anchor: 'start' as const, lx: P3.cx + PR + 4, ly: P3.cy },
          { ...P4, anchor: 'start' as const, lx: P4.cx + PR + 4, ly: P4.cy },
        ].map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={p.cx} cy={p.cy} r={PR}
              fill={`${CLAY}0.10)`} stroke={`${CLAY}0.55)`} strokeWidth={1.2} />
            <circle cx={p.cx} cy={p.cy} r={DR} fill={`${CLAY}0.80)`} />
            <text x={p.lx} y={p.ly + 1}
              textAnchor={p.anchor} dominantBaseline="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={`${CLAY_TEXT}0.912)`} style={{ userSelect: 'none' }}>
              PARTICIPANT
            </text>
          </g>
        ))}

        {/* Team nodes */}
        {[T1, T2].map((t, i) => (
          <g key={`t${i}`}>
            <circle cx={t.cx} cy={t.cy} r={PR}
              fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.28)" strokeWidth={1.0} />
            <circle cx={t.cx} cy={t.cy} r={DR} fill="rgba(255,255,255,0.48)" />
            <text x={t.cx} y={t.cy + PR + 10} textAnchor="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill="rgba(255,255,255,0.65)" style={{ userSelect: 'none' }}>
              TEAM
            </text>
          </g>
        ))}

        {/* AI support badges + "CANNOT SIMULATE" node - AI mode only */}
        <AnimatePresence>
          {isAI && (
            <motion.g key="ai-elements"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.35 }}>
              {/* AI support badges */}
              {AI_BADGES.map(b => (
                <g key={b.id}>
                  <rect x={b.x} y={b.y} width={b.w} height={16} rx={3}
                    fill={`${INDIGO}0.12)`} stroke={`${INDIGO}0.40)`} strokeWidth={0.8} />
                  <text x={b.x + b.w / 2} y={b.y + 10}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                    fill={`${INDIGO_TEXT}0.958)`} style={{ userSelect: 'none' }}>
                    {b.label}
                  </text>
                </g>
              ))}

              {/* Simulated-participant node (crossed out) */}
              <g>
                <circle cx={350} cy={25} r={PR}
                  fill={`${INDIGO}0.08)`} stroke={`${INDIGO}0.45)`}
                  strokeWidth={1.2} strokeDasharray="3 2" />
                <line x1={350 - PR + 2} y1={25 - PR + 2}
                      x2={350 + PR - 2} y2={25 + PR - 2}
                  stroke={`${INDIGO}0.55)`} strokeWidth={1} />
                <text x={350} y={25 + PR + 10} textAnchor="middle"
                  fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                  fill={`${INDIGO_TEXT}0.905)`} style={{ userSelect: 'none' }}>
                  AI SIM ≠ REAL
                </text>
              </g>

              {/* "REAL PARTICIPANTS: CANNOT BE REPLACED" annotation */}
              <text x={CCX} y={SVG_H - 4} textAnchor="middle"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill={`${CLAY_TEXT}0.895)`} style={{ userSelect: 'none' }}>
                REAL PARTICIPANTS · LIVED EXPERIENCE · CANNOT BE SIMULATED OR REPLACED
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Caption (human mode) */}
        {!isAI && (
          <text x={CCX} y={SVG_H - 4} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.58)" style={{ userSelect: 'none' }}>
            REAL PARTICIPATION · GROUNDED INSIGHT · SHARED OWNERSHIP
          </text>
        )}
      </svg>

      {/* Explanation cards */}
      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                h: 'Importance is specific to your model',
                b: 'The value of co-creation comes from the actual participation of the people it serves: their specific lived experience, their real mental models, their actual priorities. That cannot be generated from what has been written about "users in general."',
              },
              {
                h: 'Ownership is a human relationship',
                b: "The investment and buy-in that come from having built something yourself is a relationship between people and what they made. It exists because real people participated and see their contribution in the result. AI cannot manufacture it.",
              },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${CLAY}0.06)`, borderColor: `${CLAY}0.22)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${CLAY}0.90)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                h: 'AI can help prepare and facilitate',
                b: 'AI can draft the workshop agenda and generative activities, produce stimulus material (prompts, provocations, rough concepts, analogous examples) for participants to build on, and tailor warm-ups. Genuine support that reduces preparation burden.',
              },
              {
                h: 'AI can help synthesize outputs',
                b: "After a workshop, AI can help cluster ideas, surface themes, and summarize. Useful for pattern-finding across many participant contributions, watch that it doesn't flatten participants' real, specific language into generic summary.",
              },
              {
                h: 'AI cannot be the participants',
                b: "A simulated participant has no lived experience to contribute, only a generic average of what has been written. Using AI to stand in for participants replaces real co-creation with a guess about users, forfeiting both the grounded insight and any ownership.",
              },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${INDIGO}0.07)`, borderColor: `${INDIGO}0.22)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${INDIGO}0.80)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis */}
      <div className="mt-4 rounded-lg p-4 border border-white/8"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/28 mb-1">Synthesis</p>
        <p className="text-xs text-white/42 leading-relaxed">
          Use AI to support the workshop: preparing it, supplying stimulus, and synthesizing its output. But keep real people at the center of the making: the grounded insight from real co-creation and the ownership that eases adoption both require actual participation, which AI can neither be nor manufacture.
        </p>
      </div>
    </div>
  )
}
