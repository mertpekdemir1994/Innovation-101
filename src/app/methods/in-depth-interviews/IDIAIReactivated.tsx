'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE
const AI_C = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of AI_C/INDIGO

type Role = 'facilitator' | 'notetaker' | 'participant'

// Horizontal row: Note-taker (left) · Facilitator (centre) · Participant (right)
const ROLES: { id: Role; name: string; cx: number; cy: number; headR: number; bodyW: number; bodyH: number }[] = [
  { id: 'notetaker',   name: 'Note-taker',  cx: 130, cy: 105, headR: 15, bodyW: 26, bodyH: 28 },
  { id: 'facilitator', name: 'Facilitator',  cx: 320, cy: 105, headR: 18, bodyW: 30, bodyH: 32 },
  { id: 'participant', name: 'Participant',  cx: 510, cy: 105, headR: 15, bodyW: 26, bodyH: 28 },
]

const AI_NOTES: Record<Role, { well: string; risks: string }> = {
  facilitator: {
    well:  'AI moderators can conduct interviews with many participants at once, removing scheduling and headcount limits. They are consistent, never fatigued, and bring no interviewer bias toward a hoped-for answer.',
    risks: 'AI misses the unplanned thread a skilled human would have chased, and lacks the human presence that earns deeper trust. AI follows up on what was said; the best human facilitators follow up on what was almost said.',
  },
  notetaker: {
    well:  'AI transcription tools capture every word verbatim, generate instant transcripts, and surface candidate themes across dozens of interviews in minutes: work that used to take a researcher days. Perfect recall, real speed.',
    risks: 'A transcript records the words but can miss the hesitation, the loaded pause, the contradiction between word and tone that a human note-taker flags as the real signal. The texture gets flattened.',
  },
  participant: {
    well:  'Synthetic users answer interview questions at instant, free, infinite scale. Useful for rehearsing an interview guide or pressure-testing obvious assumptions before running a real study.',
    risks: 'A synthetic participant cannot tell you something you did not already implicitly know: it is generated from existing patterns. It will confidently confirm your assumptions and cannot surprise you with genuine new human truth. Used as a replacement for real people, it removes the entire point of the method.',
  },
}

function dome(cx: number, cy: number, w: number, h: number) {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

export default function IDIAIReactivated() {
  const [aiRoles, setAiRoles] = useState<Record<Role, boolean>>({
    facilitator: false,
    notetaker:   true,  // default: note-taker as AI, clearest value, least controversial
    participant: false,
  })
  const prefersReduced = useReducedMotion()

  function toggle(role: Role) {
    setAiRoles((prev) => ({ ...prev, [role]: !prev[role] }))
  }

  function avatarFill(id: Role)   { return aiRoles[id] ? `${AI_C}0.16)` : 'rgba(255,255,255,0.08)' }
  function avatarStroke(id: Role) { return aiRoles[id] ? `${AI_C}0.82)` : 'rgba(255,255,255,0.60)' }
  function glowFill(id: Role)     { return aiRoles[id] ? `${AI_C}0.10)` : `${SAGE}0.11)` }

  return (
    <div>
      {/* ── SVG illustration ── */}
      <div className="w-full flex justify-center mb-12 select-none" aria-hidden="true">
        <svg viewBox="0 0 640 185" width="100%" style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="idi-ai-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connectors */}
          <line x1={148} y1={105} x2={302} y2={105}
            stroke="rgba(255,255,255,0.14)" strokeWidth={1} strokeDasharray="4 4" />
          <line x1={338} y1={105} x2={492} y2={105}
            stroke="rgba(255,255,255,0.20)" strokeWidth={1} />

          {ROLES.map(({ id, cx, cy, headR, bodyW, bodyH, name }) => {
            const isAI  = aiRoles[id]
            const fill  = avatarFill(id)
            const strk  = avatarStroke(id)
            const headCy = cy - headR - 3
            const nameY  = cy + bodyH + 18
            const badgeY = cy + bodyH + 34

            return (
              <g key={id}>
                {/* Sage / indigo glow halo */}
                <motion.ellipse
                  cx={cx} cy={cy + bodyH / 2}
                  rx={bodyW + 20} ry={headR + bodyH + 16}
                  animate={{ fill: glowFill(id) }}
                  transition={{ duration: 0.3 }}
                />
                {/* Head */}
                <motion.circle
                  cx={cx} cy={headCy} r={headR}
                  strokeWidth={1.5}
                  strokeDasharray={isAI ? '5 3' : undefined}
                  filter="url(#idi-ai-glow)"
                  animate={{ fill, stroke: strk }}
                  transition={{ duration: 0.3 }}
                />
                {/* Body dome */}
                <motion.path
                  d={dome(cx, cy, bodyW, bodyH)}
                  strokeWidth={1.5}
                  strokeDasharray={isAI ? '5 3' : undefined}
                  filter="url(#idi-ai-glow)"
                  animate={{ fill, stroke: strk }}
                  transition={{ duration: 0.3 }}
                />
                {/* Name */}
                <text
                  x={cx} y={nameY}
                  textAnchor="middle" fontSize="13" fontWeight="600"
                  fontFamily="Inter,sans-serif" fill="rgba(255,255,255,0.78)"
                  style={{ userSelect: 'none' }}
                >{name}</text>
                {/* AI badge replaces sub-label when toggled on */}
                <AnimatePresence>
                  {isAI ? (
                    <motion.text
                      key="ai"
                      x={cx} y={badgeY}
                      textAnchor="middle" fontSize="11"
                      fontFamily="var(--font-mono)" letterSpacing="0.08em"
                      fill={`rgba(141,143,245,0.937)`}
                      style={{ userSelect: 'none' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >AI ACTIVE</motion.text>
                  ) : (
                    <motion.text
                      key="human"
                      x={cx} y={badgeY}
                      textAnchor="middle" fontSize="11"
                      fontFamily="var(--font-mono)" letterSpacing="0.04em"
                      fill="rgba(255,255,255,0.64)"
                      style={{ userSelect: 'none' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >HUMAN</motion.text>
                  )}
                </AnimatePresence>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Per-role toggle cards, same order as illustration: N · F · P */}
      <div className="grid md:grid-cols-3 gap-5">
        {ROLES.map(({ id, name }) => {
          const isAI = aiRoles[id]
          return (
            <div
              key={id}
              className="rounded-xl p-5"
              style={{
                background: isAI ? `${AI_C}0.06)` : `${SAGE}0.06)`,
                border: `1px solid ${isAI ? `${AI_C}0.20)` : `${SAGE}0.20)`}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ fontSize: 'var(--text-base)', color: '#FAFAFA' }}>
                  {name}
                </h3>
                {/* Human / AI pill toggle */}
                <div
                  className="flex rounded-full p-0.5"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  role="group"
                  aria-label={`${name} mode`}
                >
                  <button
                    onClick={() => isAI && toggle(id)}
                    className="rounded-full px-3 py-1 text-xs font-semibold transition-colors"
                    style={{
                      background: !isAI ? 'rgba(255,255,255,0.90)' : 'transparent',
                      color:      !isAI ? '#111' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-pressed={!isAI}
                  >Human</button>
                  <button
                    onClick={() => !isAI && toggle(id)}
                    className="rounded-full px-3 py-1 text-xs font-semibold transition-colors"
                    style={{
                      background: isAI ? `${AI_C}0.75)` : 'transparent',
                      color:      isAI ? '#fff' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-pressed={isAI}
                  >AI</button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isAI ? (
                  <motion.div
                    key="ai-detail"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pt-2">
                      <p
                        className="font-mono uppercase tracking-widest mb-1"
                        style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO_TEXT}0.90)` }}
                      >What AI does well</p>
                      <p
                        className="mb-4"
                        style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}
                      >{AI_NOTES[id].well}</p>
                      <p
                        className="font-mono uppercase tracking-widest mb-1"
                        style={{ fontSize: 'var(--text-2xs)', color: 'rgba(251,146,60,0.75)' }}
                      >What it risks</p>
                      <p
                        style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}
                      >{AI_NOTES[id].risks}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}
                  >Toggle to AI to see what changes.</motion.p>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Honest synthesis */}
      <div
        className="mt-10 rounded-xl p-6"
        style={{ background: `${SAGE}0.06)`, border: `1px solid ${SAGE}0.18)` }}
      >
        <p
          className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${SAGE_TEXT}0.90)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI&rsquo;s leverage on this method is real and growing: it removes the note-taking burden almost entirely, and it makes interviewing at scale genuinely possible for the first time. But the core of the method (a present human earning enough trust to hear an un-rationalized truth, and the judgment to chase the unexpected thread) is exactly the part AI is weakest at. The teams that get the most from AI here use it to amplify human interviewing (scale, transcription, synthesis) rather than to replace the human judgment that makes an interview worth running.
        </p>
      </div>
    </div>
  )
}
