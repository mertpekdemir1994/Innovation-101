'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY  = 'rgba(31,58,95,'
const AMBER = 'rgba(245,158,11,'

type View   = 'wrong' | 'right'
type SlotId = 'when' | 'motivation' | 'outcome' | null

const SVG_W  = 700
const SVG_H  = 200
const SLOT_Y = 12
const SLOT_H = 158
const MID_Y  = SLOT_Y + SLOT_H / 2   // 91
const HIT_P  = 6

const S1 = { x: 10,  w: 185 }
const S2 = { x: 222, w: 210 }
const S3 = { x: 459, w: 231 }

const S1_CX = S1.x + S1.w / 2
const S2_CX = S2.x + S2.w / 2
const S3_CX = S3.x + S3.w / 2

type SlotDef = {
  id: SlotId & string
  s: typeof S1
  cx: number
  label: string
  sublabel: string
  lines: string[]
}

const SLOTS: SlotDef[] = [
  { id: 'when',       s: S1, cx: S1_CX, label: 'WHEN',      sublabel: 'SITUATION',  lines: ['commuting alone,', 'bored and', 'hungry'] },
  { id: 'motivation', s: S2, cx: S2_CX, label: 'I WANT TO', sublabel: 'MOTIVATION', lines: ['stay engaged', 'and satisfied,', 'one-handed'] },
  { id: 'outcome',    s: S3, cx: S3_CX, label: 'SO I CAN',  sublabel: 'OUTCOME',    lines: ['arrive at work', 'ready —', 'not depleted'] },
]

const SLOT_DETAILS: Record<string, { heading: string; body: string; tip: string; extra?: string }> = {
  when: {
    heading: 'WHEN — The situation',
    body: 'The circumstance that triggers the job — not who the person is, but the moment they are in. "When I am commuting alone and my mind is drained" predicts behavior; "35-year-old suburban professional" does not. The situation is what creates the need for progress, and it is the whole job\'s foundation. If a demographic appears here, replace it with a circumstance.',
    tip: 'Test: could someone from a completely different demographic face this same situation and hire the same solution? If yes, you have a circumstance. If no, a demographic crept in.',
  },
  motivation: {
    heading: 'I WANT TO — The motivation (the progress)',
    body: 'The progress the person is trying to make, expressed without any product or solution inside the statement. "Stay engaged and stave off boredom and hunger" is a motivation. "Drink a milkshake" is a solution. Keep rewriting until no product or feature name remains. This slot is the demand itself — the gap between the person\'s current situation and where they want to be.',
    tip: 'Remove your product name. If the motivation still reads as a coherent need that another product could also serve, you have a job. If not, a solution crept in.',
  },
  outcome: {
    heading: 'SO I CAN — The outcome',
    body: 'The deeper result the person is ultimately after — what making that progress gives them. This is where the emotional and social dimensions of the job usually surface: the feeling of readiness, the relief from boredom, the absence of guilt. "Arrive at work feeling ready, not depleted" carries both functional and emotional weight. Stopping at the functional layer misses most of the job.',
    tip: 'Ask "so I can what?" one more time. The first answer is usually functional. The second is usually emotional or social. Both belong here.',
    extra: 'FUNCTIONAL: the practical result — EMOTIONAL: how they want to feel — SOCIAL: how they want to be perceived',
  },
}

export default function JTBDInteractive() {
  const [view,   setView]   = useState<View>('right')
  const [active, setActive] = useState<SlotId>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  function toggleSlot(id: string) {
    setActive(prev => (prev === id ? null : id as SlotId))
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex gap-2 mb-8 flex-wrap" role="group" aria-label="Framing view">
        {([
          { id: 'wrong', label: '× Wrong Framing' },
          { id: 'right', label: '✓ Job Statement' },
        ] as { id: View; label: string }[]).map(v => {
          const active_v = view === v.id
          const isWrong  = v.id === 'wrong'
          return (
            <button
              key={v.id}
              onClick={() => { setView(v.id); if (v.id === 'wrong') setActive(null) }}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
              style={{
                background: active_v
                  ? (isWrong ? `${AMBER}0.82)` : `${NAVY}0.80)`)
                  : 'transparent',
                color: active_v ? '#fff' : 'rgba(255,255,255,0.50)',
                border: `1.5px solid ${active_v
                  ? (isWrong ? `${AMBER}0.65)` : 'rgba(255,255,255,0.30)')
                  : 'rgba(255,255,255,0.16)'}`,
              }}
              aria-pressed={active_v}
            >{v.label}</button>
          )
        })}
        {view === 'right' && (
          <span className="self-center" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.30)', marginLeft: 4 }}>
            Click a slot to explore it
          </span>
        )}
      </div>

      {/* SVG */}
      <div className="w-full select-none mb-6" aria-hidden="true">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="jtbd-int-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background — tints amber in wrong view */}
          <rect
            x={0} y={0} width={SVG_W} height={SVG_H} rx={10}
            fill={view === 'wrong' ? `${AMBER}0.04)` : `${NAVY}0.06)`}
            style={{ transition: 'fill 0.35s' }}
          />

          <AnimatePresence mode="wait">
            {view === 'wrong' ? (
              /* ── WRONG FRAMING PANEL ── */
              <motion.g
                key="wrong"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.22 }}
              >
                <rect
                  x={10} y={SLOT_Y} width={680} height={SLOT_H} rx={8}
                  fill={`${AMBER}0.06)`}
                  stroke={`${AMBER}0.30)`}
                  strokeDasharray="5 3"
                  strokeWidth={1.5}
                />
                <text
                  x={350} y={SLOT_Y + 18}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  fill={`${AMBER}0.55)`} style={{ userSelect: 'none' }}
                >{'× WRONG — FEATURE / DEMOGRAPHIC'}</text>
                <line
                  x1={24} y1={SLOT_Y + 28} x2={676} y2={SLOT_Y + 28}
                  stroke={`${AMBER}0.14)`}
                />
                <text
                  x={350} y={SLOT_Y + 65}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="14" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                  fill="rgba(255,255,255,0.85)" style={{ userSelect: 'none' }}
                >a thicker milkshake</text>
                <text
                  x={350} y={SLOT_Y + 85}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="14" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                  fill="rgba(255,255,255,0.85)" style={{ userSelect: 'none' }}
                >for suburban commuters</text>
                <text
                  x={350} y={SLOT_Y + 120}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${AMBER}0.42)`} style={{ userSelect: 'none' }}
                >{'a product · a demographic — hidden: the job · the circumstance · the real competition'}</text>
              </motion.g>
            ) : (
              /* ── JOB STATEMENT (three slots) ── */
              <motion.g
                key="right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.22 }}
              >
                {/* Slot rects, labels, content */}
                {SLOTS.map(s => {
                  const isActive = active === s.id
                  const hasActive = active !== null
                  const dimmed   = hasActive && !isActive
                  return (
                    <g key={s.id}>
                      <rect
                        x={s.s.x} y={SLOT_Y} width={s.s.w} height={SLOT_H} rx={8}
                        fill={`${NAVY}0.62)`}
                        stroke={isActive ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.22)'}
                        strokeWidth={isActive ? 2 : 1.5}
                        filter="url(#jtbd-int-glow)"
                        opacity={dimmed ? 0.35 : 1}
                        style={{ transition: 'opacity 0.28s, stroke 0.28s, stroke-width 0.28s' }}
                      />
                      <text
                        x={s.cx} y={SLOT_Y + 16}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
                        fill={isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.40)'}
                        opacity={dimmed ? 0.35 : 1}
                        style={{ userSelect: 'none', transition: 'opacity 0.28s' }}
                      >{s.label}</text>
                      <line
                        x1={s.s.x + 14} y1={SLOT_Y + 26}
                        x2={s.s.x + s.s.w - 14} y2={SLOT_Y + 26}
                        stroke="rgba(255,255,255,0.08)"
                        opacity={dimmed ? 0.35 : 1}
                        style={{ transition: 'opacity 0.28s' }}
                      />
                      {s.lines.map((ln, li) => (
                        <text
                          key={li} x={s.cx} y={SLOT_Y + 60 + li * 17}
                          textAnchor="middle" dominantBaseline="middle"
                          fontSize="8" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                          fill="rgba(255,255,255,0.90)"
                          opacity={dimmed ? 0.35 : 1}
                          style={{ userSelect: 'none', transition: 'opacity 0.28s' }}
                        >{ln}</text>
                      ))}
                      <text
                        x={s.cx} y={SLOT_Y + 138}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                        fill="rgba(255,255,255,0.25)"
                        opacity={dimmed ? 0.35 : 1}
                        style={{ userSelect: 'none', transition: 'opacity 0.28s' }}
                      >{s.sublabel}</text>
                    </g>
                  )
                })}

                {/* Arrows */}
                <line
                  x1={S1.x + S1.w} y1={MID_Y} x2={S2.x} y2={MID_Y}
                  stroke="rgba(255,255,255,0.20)" strokeWidth={1.2} strokeDasharray="3 2"
                />
                <polygon points={`${S2.x},${MID_Y - 4} ${S2.x + 8},${MID_Y} ${S2.x},${MID_Y + 4}`} fill="rgba(255,255,255,0.20)" />
                <line
                  x1={S2.x + S2.w} y1={MID_Y} x2={S3.x} y2={MID_Y}
                  stroke="rgba(255,255,255,0.20)" strokeWidth={1.2} strokeDasharray="3 2"
                />
                <polygon points={`${S3.x},${MID_Y - 4} ${S3.x + 8},${MID_Y} ${S3.x},${MID_Y + 4}`} fill="rgba(255,255,255,0.20)" />

                {/* Active outline ring */}
                <AnimatePresence>
                  {active && SLOTS.filter(s => s.id === active).map(s => (
                    <motion.rect
                      key={`ring-${s.id}`}
                      x={s.s.x - 4} y={SLOT_Y - 4}
                      width={s.s.w + 8} height={SLOT_H + 8} rx={11}
                      fill="none"
                      stroke="rgba(255,255,255,0.28)"
                      strokeWidth={1}
                      strokeDasharray="5 3"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    />
                  ))}
                </AnimatePresence>

                {/* Hit areas */}
                {SLOTS.map(s => (
                  <rect
                    key={`hit-${s.id}`}
                    x={s.s.x - HIT_P} y={SLOT_Y - HIT_P}
                    width={s.s.w + HIT_P * 2} height={SLOT_H + HIT_P * 2}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleSlot(s.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Explore ${s.label} slot`}
                    aria-pressed={active === s.id}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSlot(s.id) } }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Caption */}
          <text
            x={SVG_W / 2} y={SVG_H - 6}
            textAnchor="middle" dominantBaseline="auto"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={view === 'wrong' ? `${AMBER}0.30)` : 'rgba(255,255,255,0.16)'}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}
          >
            {view === 'wrong'
              ? 'product and segment — hides the job and hides the competition'
              : 'when — motivation — outcome — the job expressed as progress in a circumstance'}
          </text>
        </svg>
      </div>

      {/* Slot detail panel */}
      <AnimatePresence mode="wait">
        {active && view === 'right' && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.24, ease }}
            className="rounded-xl p-6 mb-6"
            style={{ background: `${NAVY}0.12)`, border: `1px solid rgba(255,255,255,0.12)` }}
          >
            {(() => {
              const d = SLOT_DETAILS[active]
              if (!d) return null
              return (
                <>
                  <p
                    className="font-mono uppercase tracking-widest mb-3"
                    style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.50)' }}
                  >{d.heading}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.72)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                    {d.body}
                  </p>
                  {d.extra && (
                    <p
                      className="font-mono mb-3"
                      style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em' }}
                    >{d.extra}</p>
                  )}
                  <p
                    className="rounded-lg px-4 py-3 italic"
                    style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.50)', background: 'rgba(255,255,255,0.04)', lineHeight: 'var(--leading-relaxed)' }}
                  >{d.tip}</p>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reframe note — always visible */}
      <div
        className="rounded-xl p-5"
        style={{ background: `${NAVY}0.10)`, border: `1px solid ${NAVY}0.25)` }}
      >
        <p
          className="font-mono uppercase tracking-widest mb-2"
          style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.80)` }}
        >The reframe</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          Toggle between views. The wrong framing looks like market analysis — a product and a segment.
          The job statement looks like a sentence of progress. They describe the same underlying need, but only
          the job statement makes the circumstances, the motivation, and the real competition visible.
          That is the whole method.
        </p>
      </div>

      {/* Three-dimension reminder */}
      <div className="grid md:grid-cols-3 gap-4 mt-5">
        {[
          { label: 'Functional', body: 'The practical task the person is accomplishing — the thing you can observe and measure. The most visible dimension; the easiest to capture; and the least sufficient on its own.' },
          { label: 'Emotional',  body: 'How the person wants to feel as a result of making this progress. The relief, the readiness, the confidence. Usually un-stated; requires careful inference from the research.' },
          { label: 'Social',     body: 'How the person wants to be perceived by others, or how they want to perceive themselves. Often the deepest driver of hiring and firing decisions, and the most frequently missed.' },
        ].map(({ label, body }) => (
          <div key={label} className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.38)' }}>{label}</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.58)', lineHeight: 'var(--leading-relaxed)' }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
