'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700, SVG_H = 286

const CX = 190, CY = 40, CW = 320, CH = 142
const CCX = CX + CW / 2  // 350
const CCY = CY + CH / 2  // 111

const PR = 12, DR = 5

const P1 = { cx: 72, cy: 68 }
const P2 = { cx: 72, cy: 165 }
const P3 = { cx: 628, cy: 68 }
const P4 = { cx: 628, cy: 165 }
const T1 = { cx: 275, cy: 232 }
const T2 = { cx: 425, cy: 232 }

type Mode = 'with' | 'for'

export default function CCWInteractive() {
  const [mode, setMode] = useState<Mode>('with')
  const prefersReduced = useReducedMotion()
  const isFor = mode === 'for'
  const fade = prefersReduced ? { duration: 0 } : { duration: 0.30 }

  // Visual states per mode
  const pNodeOp  = isFor ? 0.20 : 1.0
  const pLineOp  = isFor ? 0.0  : 1.0
  const tNodeOp  = isFor ? 1.0  : 0.85
  const canvasStroke = isFor ? 'rgba(255,255,255,0.22)' : `${CLAY}0.32)`
  const canvasFill   = isFor ? 'rgba(255,255,255,0.03)' : `${CLAY}0.05)`
  const clayCardOp   = isFor ? 0.10 : 1.0
  const whiteCardOp  = isFor ? 1.0  : 1.0

  const PARTICIPANT_LINES = [
    { x1: P1.cx + PR + 2, y1: P1.cy, x2: CX,      y2: 81 },
    { x1: P2.cx + PR + 2, y1: P2.cy, x2: CX,      y2: 157 },
    { x1: P3.cx - PR - 2, y1: P3.cy, x2: CX + CW, y2: 81 },
    { x1: P4.cx - PR - 2, y1: P4.cy, x2: CX + CW, y2: 157 },
  ]
  const TEAM_LINES = [
    { x1: T1.cx, y1: T1.cy - PR - 2, x2: 284, y2: CY + CH },
    { x1: T2.cx, y1: T2.cy - PR - 2, x2: 398, y2: CY + CH },
  ]

  const CARDS = [
    { x: 218, y: 70,  w: 126, h: 22, label: 'LIVED EXPERIENCE',   clay: true  },
    { x: 356, y: 70,  w: 126, h: 22, label: 'SPECIFIC CONTEXT',   clay: true  },
    { x: 214, y: 108, w: 120, h: 22, label: 'DESIGN APPROACH',    clay: false },
    { x: 346, y: 108, w: 140, h: 22, label: 'OPERATIONAL DETAIL', clay: true  },
    { x: 241, y: 146, w: 86,  h: 22, label: 'PAIN POINT',         clay: true  },
    { x: 339, y: 146, w: 120, h: 22, label: 'WORKABLE CHANGE',    clay: false },
  ]

  const REACT_POSITIONS = [
    { cx: P1.cx, cy: P1.cy - PR - 8 },
    { cx: P2.cx, cy: P2.cy - PR - 8 },
    { cx: P3.cx, cy: P3.cy - PR - 8 },
    { cx: P4.cx, cy: P4.cy - PR - 8 },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        {(['with', 'for'] as Mode[]).map(m => (
          <button key={m}
            onClick={() => setMode(m)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'for' ? `${INDIGO}0.10)` : `${CLAY}0.10)`
                : 'transparent',
              border: `1px solid ${mode === m
                ? (m === 'for' ? `${INDIGO}0.35)` : `${CLAY}0.35)`)
                : 'rgba(255,255,255,0.12)'}`,
              color: mode === m
                ? m === 'for' ? `${INDIGO_TEXT}1)` : `${CLAY_TEXT}1)`
                : 'rgba(255,255,255,0.40)',
            }}>
            {m === 'with' ? 'Design-WITH (co-creation)' : 'Design-FOR (feedback)'}
          </button>
        ))}
      </div>

      {/* SVG scene */}
      <div className="w-full" aria-live="polite" aria-atomic="true"
        aria-label={isFor
          ? 'Design-FOR mode: participants are dimmed, contribution lines removed, REACT labels appear at participant positions. Canvas labeled TEAM\'S IDEA with only team contributions visible. A presentation arrow points from canvas toward participants.'
          : 'Design-WITH mode: all four participants and two team members are actively connected to the shared canvas by contribution lines. Canvas is full of mixed contributions from all parties.'}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}>
          <defs>
            <filter id="ccw-int-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${CLAY}0.38)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ccw-int-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
              <feFlood floodColor={`${CLAY}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Mode label */}
          <text x={CCX} y={24} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={isFor ? `${INDIGO_TEXT}0.926)` : `${CLAY_TEXT}0.933)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}>
            {isFor ? 'DESIGN FOR · TEAM PRESENTS · PARTICIPANTS REACT' : 'DESIGN WITH · EVERYONE CONTRIBUTES'}
          </text>

          {/* Canvas */}
          <g>
            <rect x={CX - 3} y={CY - 3} width={CW + 6} height={CH + 6} rx={11}
              fill="none"
              stroke={isFor ? 'rgba(255,255,255,0.07)' : `${CLAY}0.10)`}
              strokeWidth={7}
              style={{ transition: 'stroke 0.35s', filter: isFor ? 'none' : 'url(#ccw-int-glow)' }} />
            <rect x={CX} y={CY} width={CW} height={CH} rx={8}
              fill={canvasFill}
              stroke={canvasStroke} strokeWidth={1.2}
              style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
            <text x={CCX} y={CY + 16} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={isFor ? 'rgba(255,255,255,0.625)' : `${CLAY_TEXT}0.828)`}
              style={{ userSelect: 'none', transition: 'fill 0.35s' }}>
              {isFor ? "TEAM'S IDEA" : 'SHARED CANVAS'}
            </text>
          </g>

          {/* Participant contribution lines */}
          {PARTICIPANT_LINES.map((l, i) => (
            <line key={i}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={`${CLAY}0.38)`} strokeWidth={0.9} strokeDasharray="4 3"
              style={{ opacity: pLineOp, transition: 'opacity 0.35s' }} />
          ))}

          {/* Team contribution lines */}
          {TEAM_LINES.map((l, i) => (
            <line key={i}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={isFor ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.18)'}
              strokeWidth={0.9} strokeDasharray="4 3"
              style={{ transition: 'stroke 0.35s' }} />
          ))}

          {/* Contribution cards on canvas */}
          {CARDS.map((c, i) => (
            <g key={i} style={{
              opacity: c.clay ? clayCardOp : whiteCardOp,
              transition: 'opacity 0.35s',
            }}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3}
                fill={c.clay ? `${CLAY}0.10)` : 'rgba(255,255,255,0.05)'}
                stroke={c.clay ? `${CLAY}0.48)` : 'rgba(255,255,255,0.20)'}
                strokeWidth={0.8}
                style={(!isFor && c.clay) ? { filter: 'url(#ccw-int-glow-sm)' } : undefined} />
              <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
                fill={c.clay ? `${CLAY_TEXT}0.975)` : 'rgba(255,255,255,0.7)'}
                style={{ userSelect: 'none' }}>
                {c.label}
              </text>
            </g>
          ))}

          {/* Presentation arrow (design-FOR only) */}
          <AnimatePresence>
            {isFor && (
              <motion.g key="present-arrow"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={fade}>
                <line x1={CCX + 50} y1={CCY} x2={586} y2={CCY}
                  stroke={`${INDIGO}0.35)`} strokeWidth={1} />
                <path d={`M 581 ${CCY - 5} L 587 ${CCY} L 581 ${CCY + 5}`}
                  stroke={`${INDIGO}0.35)`} strokeWidth={1} fill="none"
                  strokeLinecap="round" strokeLinejoin="round" />
                <text x={(CCX + 50 + 586) / 2} y={CCY - 12} textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
                  fill={`${INDIGO_TEXT}0.891)`} style={{ userSelect: 'none' }}>
                  PRESENTS →
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Participant nodes */}
          {[P1, P2, P3, P4].map((p, i) => (
            <g key={`p${i}`} style={{ opacity: pNodeOp, transition: 'opacity 0.35s' }}>
              <circle cx={p.cx} cy={p.cy} r={PR}
                fill={`${CLAY}0.10)`} stroke={`${CLAY}0.55)`} strokeWidth={1.2} />
              <circle cx={p.cx} cy={p.cy} r={DR} fill={`${CLAY}0.80)`} />
              <text x={p.cx} y={p.cy + PR + 14}
                textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
                fill={`${CLAY_TEXT}0.912)`} style={{ userSelect: 'none' }}>
                PARTICIPANT
              </text>
            </g>
          ))}

          {/* REACT badges (design-FOR only) */}
          <AnimatePresence>
            {isFor && REACT_POSITIONS.map((p, i) => (
              <motion.g key={`react-${i}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ ...fade, delay: prefersReduced ? 0 : i * 0.06 }}>
                <text x={p.cx} y={p.cy}
                  textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
                  fill={`${INDIGO_TEXT}0.905)`} style={{ userSelect: 'none' }}>
                  REACT?
                </text>
              </motion.g>
            ))}
          </AnimatePresence>

          {/* Team nodes */}
          {[T1, T2].map((t, i) => (
            <g key={`t${i}`} style={{ opacity: tNodeOp, transition: 'opacity 0.35s' }}>
              <circle cx={t.cx} cy={t.cy} r={PR}
                fill={isFor ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)'}
                stroke={isFor ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.28)'}
                strokeWidth={isFor ? 1.5 : 1.0}
                style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
              <circle cx={t.cx} cy={t.cy} r={DR}
                fill={isFor ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.48)'}
                style={{ transition: 'fill 0.35s' }} />
              <text x={t.cx} y={t.cy + PR + 14} textAnchor="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
                fill={isFor ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.65)'}
                style={{ userSelect: 'none', transition: 'fill 0.35s' }}>
                TEAM
              </text>
            </g>
          ))}

          {/* Caption */}
          <text x={CCX} y={SVG_H - 8} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.01em"
            fill="rgba(255,255,255,0.58)" style={{ userSelect: 'none' }}>
            {isFor
              ? 'DESIGN-FOR: PARTICIPANTS REACT · IDEA STAYS THE TEAM\'S · NO OWNERSHIP BUILT'
              : 'DESIGN-WITH: PARTICIPANTS CONTRIBUTE · SOLUTION IS SHARED · OWNERSHIP IS REAL'}
          </text>
        </svg>
      </div>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {!isFor ? (
          <motion.div key="with-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'MAKING TOGETHER',
                body: 'Participants and team build around one shared canvas. Their contributions become part of the solution. The idea is genuinely co-created: no one person or group owns it alone.',
              },
              {
                label: 'GROUNDED OUTPUT',
                body: "Because participants shape the concept directly, the solution carries their real language, mental models, and priorities, not the team's assumptions about them. Ideas the team never would have had surface naturally.",
              },
              {
                label: 'SHARED OWNERSHIP',
                body: 'Having helped build the solution, participants are invested in it. They arrive at rollout as advocates, not skeptics. Ownership is a core deliverable, and it cannot be added on afterward.',
              },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${CLAY}0.22)`, background: `${CLAY}0.05)` }}>
                <p className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: `${CLAY_TEXT}0.90)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="for-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'REACTING TO A FINISHED IDEA',
                body: "Participants approve or reject the team's ready-made concept. They stay outside the solution. The idea was the team's before the session started, and it remains the team's after it.",
              },
              {
                label: "TEAM'S ASSUMPTIONS ONLY",
                body: "Without participant contributions shaping the concept, the solution reflects what the team imagined about users, not what users actually need. The grounded insight is exactly what is missing.",
              },
              {
                label: 'NO OWNERSHIP BUILT',
                body: "No one who didn't build it is invested in it. At rollout, the people affected arrive as skeptics, and adoption faces the resistance co-creation exists to dissolve. Ownership is not addable later.",
              },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
                <p className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: `${INDIGO_TEXT}0.90)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
