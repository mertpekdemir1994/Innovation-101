'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER = 'rgba(245,158,11,'

const SVG_W   = 700
const PHASE_W = 140
const PCX = [70, 210, 350, 490, 630] as const

const HDR_TOP = 8, HDR_H = 40
const CONTENT_Y = 52
const BAR_BASE  = 152
const SVG_H     = 160

const INV = [0.34, 0.54, 0.91, 0.26, 0.14] as const
const BAR_H_MAX = BAR_BASE - CONTENT_Y - 8

type PhaseId = 'entice' | 'enter' | 'engage' | 'exit' | 'extend'

const PHASES: { id: PhaseId; label: string; bookend: boolean; core: boolean }[] = [
  { id: 'entice', label: 'ENTICE', bookend: true,  core: false },
  { id: 'enter',  label: 'ENTER',  bookend: false, core: false },
  { id: 'engage', label: 'ENGAGE', bookend: false, core: true  },
  { id: 'exit',   label: 'EXIT',   bookend: true,  core: false },
  { id: 'extend', label: 'EXTEND', bookend: true,  core: false },
]

const DETAIL: Record<PhaseId, { tagline: string; what: string; goodLooks: string; whatToCheck: string }> = {
  entice: {
    tagline: 'Before arrival: commonly neglected',
    what: 'How people become aware of and motivated to begin the experience. The phase that happens before the person even arrives (the awareness, the promise, the reason to come). The question it poses: is the promise honest and compelling, and does it set up the right expectation for what follows?',
    goodLooks: 'The person understands what they are getting into before they arrive. The promise is honest, the expectation it creates is accurate, and the motivation to begin is strong. People arrive ready and oriented, not confused or already disappointed.',
    whatToCheck: 'What makes people aware of this experience? Is the promise clear and compelling? Does it create the right expectation, or does it set up disappointment? Is there friction in the decision to begin? Are the right people being attracted in the first place?',
  },
  enter: {
    tagline: 'First moments of engagement',
    what: 'The critical first moments once the person arrives and begins. Evaluate whether the opening reduces or increases anxiety. First impressions here (the first five seconds, the first gesture, the first decision point) color everything that follows. Teams often underinvest here because it feels transitional rather than central.',
    goodLooks: 'The person begins with confidence. The environment is welcoming, the path forward is clear, and the natural anxieties of starting something new are actively reduced. The transition from outside to inside feels smooth and intentional rather than abrupt or disorienting.',
    whatToCheck: 'What are the first moments like? Does the person feel welcomed or lost? Is the beginning clear or confusing? What anxieties does a newcomer bring, and how does the experience address them? What is the first impression, and does it serve what comes next?',
  },
  engage: {
    tagline: 'The core: where teams over-invest',
    what: 'The main interaction where the core value is delivered. This is the phase teams focus on almost exclusively. Evaluate whether the central value is actually being delivered well, but be aware that this is almost always the phase that has already received the most attention. The 5Es points you at what is being skipped.',
    goodLooks: 'The core value is delivered reliably and well. The person gets what they came for. The main experience meets the expectations set in Entice and Enter, without requiring workarounds or heroics on either side.',
    whatToCheck: 'Is the core value actually being delivered? What is the quality of the main interaction? Are there gaps between the promised experience and the actual one? This is the phase most teams have already analyzed well: the 5Es asks you to spend proportionally less time here and more time on the bookends.',
  },
  exit: {
    tagline: 'The conclusion: commonly neglected',
    what: 'How the experience concludes and the person leaves. Evaluate whether it ends gracefully and leaves a strong final impression. The ending disproportionately shapes what people remember (the peak-end effect), and it is routinely treated as an afterthought rather than a designed moment.',
    goodLooks: 'The experience ends with intention. There is a deliberate closing moment, a clear signal that the interaction is complete, and a final impression that is as considered as the opening. What the person leaves with, emotionally and practically, has been designed.',
    whatToCheck: 'How does the experience end? Is it graceful or abrupt, does it just stop? What is the last thing the person sees, hears, or does? Is the ending intentional, or did the team run out of budget after the Engage phase? Does the exit earn a return or leave the person flat?',
  },
  extend: {
    tagline: 'After the core: the most neglected phase',
    what: 'What happens afterward to sustain the relationship and bring the person back. Evaluate whether there is anything that earns a return, builds loyalty, or creates belonging between engagements. This is where retention is won or lost, and it is the phase most teams have never formally designed at all.',
    goodLooks: 'Something deliberate happens after the experience to sustain the relationship. The person feels a sense of belonging between engagements, receives relevant and timely follow-through, and has reasons to return that go beyond habit or inertia.',
    whatToCheck: 'What happens after the person leaves? Is there anything at all, or does the relationship go dark? Does the person feel like a member of something, or like a completed transaction? What earns a return, and what makes it less likely? Has this phase ever been designed, or only assumed?',
  },
}

function phaseOpacity(id: PhaseId, active: PhaseId | null): number {
  if (!active) return 1
  if (active === id) return 1
  return 0.22
}

function phaseBarOpacity(id: PhaseId, active: PhaseId | null): number {
  if (!active) return 1
  if (active === id) return 1
  return 0.15
}

export default function FiveEsInteractive() {
  const [active, setActive] = useState<PhaseId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const detail = active ? DETAIL[active] : null
  const activePhase = active ? PHASES.find(p => p.id === active) : null

  return (
    <div>
      {/* Phase SVG - click to select */}
      <div className="w-full select-none mb-8" aria-label="Click a phase to explore it">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxWidth: 'var(--width-illustration)', display: 'block', overflow: 'visible', cursor: 'pointer' }}>
          <defs>
            <filter id="fes-int-glow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8} fill={`${TEAL}0.04)`} />

          {/* Vertical dividers */}
          {[1, 2, 3, 4].map(i => (
            <line key={i} x1={i * PHASE_W} y1={HDR_TOP} x2={i * PHASE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1}
            />
          ))}
          <line x1={0} y1={CONTENT_Y} x2={SVG_W} y2={CONTENT_Y}
            stroke="rgba(255,255,255,0.07)" strokeWidth={1}
          />

          {PHASES.map((phase, i) => {
            const isActive = active === phase.id
            const opacity = phaseOpacity(phase.id, active)
            const barOpacity = phaseBarOpacity(phase.id, active)
            const barH = INV[i] * BAR_H_MAX
            const barX = PCX[i] - 28
            const barY = BAR_BASE - barH

            return (
              <g key={phase.id}
                onClick={() => setActive(isActive ? null : phase.id)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-pressed={isActive}
                aria-label={`${phase.label} phase`}
              >
                {/* Hit area */}
                <rect x={i * PHASE_W} y={HDR_TOP} width={PHASE_W} height={SVG_H - HDR_TOP}
                  fill="transparent"
                />

                {/* Active highlight band */}
                {isActive && (
                  <rect x={i * PHASE_W + 1} y={HDR_TOP} width={PHASE_W - 2} height={SVG_H - HDR_TOP - 2}
                    rx={4}
                    fill={phase.bookend ? `${AMBER}0.07)` : `${TEAL}0.10)`}
                    stroke={phase.bookend ? `${AMBER}0.50)` : `${TEAL}0.55)`}
                    strokeWidth={1.5}
                  />
                )}

                {/* Phase header */}
                <motion.g
                  animate={{ opacity }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.25, ease }}
                >
                  <rect
                    x={i * PHASE_W + 2} y={HDR_TOP + 1}
                    width={PHASE_W - 4} height={HDR_H - 2}
                    rx={3}
                    fill={phase.bookend
                      ? (isActive ? `${AMBER}0.15)` : `${AMBER}0.07)`)
                      : (isActive ? `${TEAL}0.22)` : `${TEAL}0.10)`)}
                    stroke={phase.bookend
                      ? (isActive ? `${AMBER}0.60)` : `${AMBER}0.28)`)
                      : (isActive ? `${TEAL}0.65)` : `${TEAL}0.32)`)}
                    strokeWidth={1}
                    style={{ transition: 'fill 0.20s, stroke 0.20s' }}
                  />
                  {phase.bookend && (
                    <rect
                      x={i * PHASE_W + 2} y={HDR_TOP + 1}
                      width={PHASE_W - 4} height={2}
                      rx={2}
                      fill={isActive ? `${AMBER}0.70)` : `${AMBER}0.40)`}
                      style={{ transition: 'fill 0.20s' }}
                    />
                  )}
                  <text
                    x={PCX[i]} y={HDR_TOP + HDR_H / 2 + 1}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                    fill={phase.bookend
                      ? (isActive ? `${AMBER}0.95)` : `${AMBER}0.78)`)
                      : (isActive ? `${TEAL_TEXT}0.996)` : `${TEAL_TEXT}0.962)`)}
                    style={{ userSelect: 'none', transition: 'fill 0.20s' }}
                  >{phase.label}</text>
                </motion.g>

                {/* Bar */}
                <motion.g
                  animate={{ opacity: barOpacity }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.25, ease }}
                >
                  <rect x={barX} y={CONTENT_Y + 8} width={56} height={BAR_H_MAX}
                    rx={2} fill="rgba(255,255,255,0.03)"
                  />
                  <rect
                    x={barX} y={barY}
                    width={56} height={barH}
                    rx={2}
                    fill={phase.core
                      ? `${TEAL}0.80)`
                      : phase.bookend ? `${AMBER}0.38)` : `${TEAL}0.42)`}
                    filter={phase.core && isActive ? 'url(#fes-int-glow)' : undefined}
                  />
                </motion.g>

                {/* Click cue - only when nothing is selected */}
                {!active && (
                  <text
                    x={PCX[i]} y={SVG_H - 6}
                    textAnchor="middle" dominantBaseline="auto"
                    fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                    fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}
                  >tap</text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {detail && activePhase && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease }}
            className="rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${activePhase.bookend ? `${AMBER}0.28)` : `${TEAL}0.28)`}`,
              background: `${activePhase.bookend ? `${AMBER}0.04)` : `${TEAL}0.06)`}`,
            }}
          >
            {/* Phase header bar */}
            <div className="px-6 pt-5 pb-4" style={{
              borderBottom: `1px solid ${activePhase.bookend ? `${AMBER}0.14)` : `${TEAL}0.14)`}`,
            }}>
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{
                  fontSize: 'var(--text-2xs)',
                  color: activePhase.bookend ? `${AMBER}0.80)` : `${TEAL}0.80)`,
                }}
              >{activePhase.label}</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.55)', lineHeight: 'var(--leading-relaxed)' }}>
                {detail.tagline}
              </p>
            </div>

            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
              style={{ '--divide-color': 'rgba(255,255,255,0.07)' } as React.CSSProperties}
            >
              {[
                { label: 'What it is', body: detail.what },
                { label: 'What good looks like', body: detail.goodLooks },
                { label: 'What to check', body: detail.whatToCheck },
              ].map(({ label, body }) => (
                <div key={label} className="p-5">
                  <p className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)' }}
                  >{label}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p className="text-center" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.28)', marginTop: '1rem' }}>
          Select a phase to see what to evaluate
        </p>
      )}
    </div>
  )
}
