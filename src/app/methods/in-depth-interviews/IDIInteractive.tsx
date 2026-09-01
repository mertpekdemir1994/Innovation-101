'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE

type Role = 'facilitator' | 'notetaker' | 'participant'

// Horizontal row: Note-taker (left) · Facilitator (centre) · Participant (right)
const ROLES: { id: Role; name: string; sub: string; cx: number; cy: number; headR: number; bodyW: number; bodyH: number }[] = [
  { id: 'notetaker',   name: 'Note-taker',  sub: 'The observer', cx: 130, cy: 105, headR: 15, bodyW: 26, bodyH: 28 },
  { id: 'facilitator', name: 'Facilitator',  sub: 'The guide',    cx: 320, cy: 105, headR: 18, bodyW: 30, bodyH: 32 },
  { id: 'participant', name: 'Participant',  sub: 'The source',   cx: 510, cy: 105, headR: 15, bodyW: 26, bodyH: 28 },
]

const ROLE_DETAIL: Record<Role, { heading: string; body: string }> = {
  facilitator: {
    heading: 'Facilitator',
    body: "The person who guides the conversation. Their job is not to ask questions from a list but to follow the threads that feel alive, to stay curious, and to talk as little as possible. The best facilitators speak less than 20 percent of the time. They ask for stories, not opinions; they probe with \"tell me more\" and \"what did that feel like\" rather than leading the witness. The facilitator's discipline is restraint: every sentence they speak is a sentence the participant is not speaking.",
  },
  notetaker: {
    heading: 'Note-taker',
    body: "The silent observer who captures both what is said and what is unsaid: the hesitations, the contradictions, the moment the participant's tone shifts. Freeing the facilitator from note-taking is what lets them stay fully present in the conversation. The note-taker also watches for the gap between what the participant says and what their body language suggests, because that gap is often where the most valuable insight hides. A good note-taker captures verbatim quotes, not paraphrases, because the participant's exact words carry meaning a summary loses.",
  },
  participant: {
    heading: 'Participant',
    body: "The person being interviewed, and the only true source of insight in the room. Everything depends on getting the right participant, someone who genuinely has the experience you are studying, and on creating enough trust and safety that they tell you the real story rather than the polite, presentable version. The participant is not there to validate your idea. They are there to teach you about their world. The interview succeeds when they tell you something that genuinely surprises you.",
  },
}

function dome(cx: number, cy: number, w: number, h: number) {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

function roleState(id: Role, active: Role | null, hovered: Role | null) {
  if (active === null) return hovered === id ? 'hovered' : 'default'
  if (id === active)   return 'active'
  return 'dim'
}

function avatarFill(state: string): string {
  if (state === 'active')  return `${SAGE}0.22)`
  if (state === 'hovered') return `${SAGE}0.10)`
  if (state === 'dim')     return 'rgba(255,255,255,0.02)'
  return 'rgba(255,255,255,0.08)'
}
function avatarStroke(state: string): string {
  if (state === 'active')  return `${SAGE}0.92)`
  if (state === 'hovered') return `${SAGE}0.60)`
  if (state === 'dim')     return 'rgba(255,255,255,0.14)'
  return 'rgba(255,255,255,0.58)'
}
function nameFill(state: string): string {
  if (state === 'active')  return 'rgba(255,255,255,0.94)'
  if (state === 'hovered') return 'rgba(255,255,255,0.72)'
  if (state === 'dim')     return 'rgba(255,255,255,0.60)'
  return 'rgba(255,255,255,0.78)'
}
function haloOpacity(state: string): number {
  if (state === 'active')  return 1
  if (state === 'hovered') return 0.7
  if (state === 'dim')     return 0.05
  return 0.45
}

export default function IDIInteractive() {
  const [activeRole,  setActiveRole]  = useState<Role | null>(null)
  const [hoveredRole, setHoveredRole] = useState<Role | null>(null)
  const prefersReduced = useReducedMotion()

  // Connector line opacities respond to which role is active
  const convOpacity = activeRole === null ? 0.20
    : (activeRole === 'facilitator' || activeRole === 'participant') ? 0.42 : 0.06
  const obsOpacity  = activeRole === null ? 0.14
    : (activeRole === 'facilitator' || activeRole === 'notetaker')  ? 0.42 : 0.06

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
      {/* ── SVG illustration ── */}
      <div className="w-full md:w-[54%] shrink-0">
        <svg
          viewBox="0 0 640 185"
          width="100%"
          style={{ overflow: 'visible' }}
          role="group"
          aria-label="Interview roles, click a figure to learn about its role"
        >
          <defs>
            <filter id="idi-int-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connectors */}
          <motion.line
            x1={148} y1={105} x2={302} y2={105}
            stroke={`rgba(255,255,255,${obsOpacity})`}
            strokeWidth={1} strokeDasharray="4 4"
            animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
          />
          <motion.line
            x1={338} y1={105} x2={492} y2={105}
            stroke={`rgba(255,255,255,${convOpacity})`}
            strokeWidth={1}
            animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
          />

          {/* Glow halos */}
          {ROLES.map(({ id, cx, cy, bodyW, headR, bodyH }) => {
            const st = roleState(id, activeRole, hoveredRole)
            return (
              <motion.ellipse
                key={`halo-${id}`}
                cx={cx} cy={cy + bodyH / 2}
                rx={bodyW + 20} ry={headR + bodyH + 16}
                fill={`${SAGE}0.12)`}
                animate={{ opacity: haloOpacity(st) }}
                transition={{ duration: 0.22 }}
              />
            )
          })}

          {/* Role nodes */}
          {ROLES.map(({ id, cx, cy, name, headR, bodyW, bodyH }) => {
            const st     = roleState(id, activeRole, hoveredRole)
            const fill   = avatarFill(st)
            const stroke = avatarStroke(st)
            const headCy = cy - headR - 3
            const nameY  = cy + bodyH + 18
            const strokeW = st === 'active' ? 2 : 1.5

            return (
              <g
                key={id}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveRole(activeRole === id ? null : id)}
                onMouseEnter={() => setHoveredRole(id)}
                onMouseLeave={() => setHoveredRole(null)}
                role="button"
                tabIndex={0}
                aria-label={`Learn about the ${name} role`}
                aria-pressed={activeRole === id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveRole(activeRole === id ? null : id)
                  }
                }}
              >
                {/* Head */}
                <motion.circle
                  cx={cx} cy={headCy} r={headR}
                  strokeWidth={strokeW}
                  filter={st === 'active' ? 'url(#idi-int-glow)' : undefined}
                  animate={{ fill, stroke }}
                  transition={{ duration: 0.22 }}
                />
                {/* Body dome */}
                <motion.path
                  d={dome(cx, cy, bodyW, bodyH)}
                  strokeWidth={strokeW}
                  filter={st === 'active' ? 'url(#idi-int-glow)' : undefined}
                  animate={{ fill, stroke }}
                  transition={{ duration: 0.22 }}
                />
                {/* Name */}
                <motion.text
                  x={cx} y={nameY}
                  textAnchor="middle" fontSize="13" fontWeight="600"
                  fontFamily="Inter,sans-serif"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: nameFill(st) }}
                  transition={{ duration: 0.22 }}
                >{name}</motion.text>
              </g>
            )
          })}
        </svg>

        {!activeRole && (
          <p
            className="text-center mt-4"
            style={{
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: `${SAGE_TEXT}0.895)`,
            }}
          >
            Click a role to explore
          </p>
        )}
      </div>

      {/* ── Detail panel ── */}
      <div className="w-full md:flex-1 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeRole ? (
            <motion.div
              key={activeRole}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${SAGE_TEXT}0.926)` }}
              >
                Role
              </p>
              <h3
                className="font-display font-semibold mb-5"
                style={{ fontSize: 'var(--text-2xl)', color: '#FAFAFA', lineHeight: 1.2 }}
              >
                {ROLE_DETAIL[activeRole].heading}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'rgba(255,255,255,0.62)',
                }}
              >
                {ROLE_DETAIL[activeRole].body}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-full"
              style={{ minHeight: 200 }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.625)', fontStyle: 'italic' }}>
                Select a role to read its description.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
