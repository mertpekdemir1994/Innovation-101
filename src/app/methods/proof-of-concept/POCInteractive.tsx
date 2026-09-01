'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'

const SVG_W = 700
const SVG_H = 258

// Geometry (matches POCEstablishing)
const INP_X = 30, INP_Y = 82, INP_W = 116, INP_H = 42
const INP_CY = INP_Y + INP_H / 2

const APP_X = 178, APP_Y = 46, APP_W = 266, APP_H = 114
const APP_CX = APP_X + APP_W / 2
const APP_CY = APP_Y + APP_H / 2

const BUS_X1 = APP_X + 14, BUS_X2 = APP_X + APP_W - 14
const TAP_Y1 = APP_Y + 14
const TAPS = [
  { x: 220, label: 'INGEST' },
  { x: 294, label: 'PROCESS' },
  { x: 368, label: 'EVALUATE' },
]
const COMP_W = 56, COMP_H = 20

const OUT_X = 468, OUT_Y = 60, OUT_W = 172, OUT_H = 84
const OUT_CX = OUT_X + OUT_W / 2
const IND_CX = OUT_X + 22
const PASS_CY = OUT_Y + 26
const FAIL_CY = OUT_Y + 58

const GHOSTS = [
  { x: 30,  y: 194, w: 150, h: 42, label: 'NO INTERFACE'      },
  { x: 198, y: 194, w: 196, h: 42, label: 'NO EXTRA FEATURES' },
  { x: 412, y: 194, w: 218, h: 42, label: 'NO PRODUCT SHELL'  },
]

// Zone definitions
type ZoneId = 'question' | 'apparatus' | 'absent' | 'verdict' | 'discard'

interface Zone {
  id: ZoneId
  tag: string
  headline: string
  body: string
  hitX: number
  hitY: number
  hitW: number
  hitH: number
}

const ZONES: Zone[] = [
  {
    id: 'question',
    tag: 'WHAT IT INCLUDES',
    headline: 'One critical, genuinely uncertain question, and everything in the rig serves it.',
    body: 'A PoC contains only what is needed to answer the one question the concept depends on that is genuinely in doubt. Every component in the proving rig exists only to answer that question. The discipline starts with precision: "can this technically work?" is a provable question. "Will this be a good product?" is not. If a component does not serve the question, it does not belong in the rig.',
    hitX: APP_CX, hitY: 28, hitW: 280, hitH: 28,
  },
  {
    id: 'apparatus',
    tag: 'THE RIG',
    headline: 'Bare, unpolished, internal, built only to answer, then typically discarded.',
    body: 'The apparatus is built as small and as rough as it can be while still answering the question. No interface worth speaking of, no production engineering, no completeness. It is internal: no one outside the team uses it. And it is typically thrown away the moment it has answered. The proof was the point; the artifact was not. Trying to grow the PoC into the production system carries all its shortcuts into something that must be maintained.',
    hitX: APP_CX, hitY: APP_CY, hitW: APP_W + 4, hitH: APP_H + 4,
  },
  {
    id: 'absent',
    tag: 'WHAT IT EXCLUDES',
    headline: 'Everything that doesn\'t serve the one question. Deliberately absent.',
    body: 'No interface, no extra features, no polish, no production engineering, no completeness. Each absent element would cost real time and money without buying more certainty about the one question. Scope drift begins when these elements start getting added: the moment a PoC acquires an interface, it has quietly become a half-built, unvalidated product. The ghosted outlines are everything the PoC has decided not to be.',
    hitX: APP_CX, hitY: 215, hitW: 640, hitH: 48,
  },
  {
    id: 'verdict',
    tag: 'THE DELIVERABLE',
    headline: 'The verdict is the deliverable, not the artifact. Then discard the rig.',
    body: 'The PoC produces one thing of lasting value: a clear verdict. It works. It does not work. Or: it works only under conditions you must now name: which data, which scale, which environment. That qualified verdict, especially its stated conditions, is far more valuable than the artifact. After the verdict, throw the rig away and carry the knowledge forward: to a prototype, to an MVP, or to a decision to stop before spending more.',
    hitX: OUT_CX, hitY: OUT_Y + OUT_H / 2, hitW: OUT_W + 4, hitH: OUT_H + 4,
  },
  {
    id: 'discard',
    tag: 'THE ANTI-PATTERN',
    headline: 'The moment it acquires an interface, it stops being a PoC.',
    body: 'Scope drift is the PoC\'s defining failure. It begins the moment the team adds something that does not serve the critical question: a cleaner interface, an extra feature, some polish. Each addition feels cheap at the time. But they accumulate, and suddenly the PoC has become a half-built, unvalidated product with all the shortcuts of an experiment and none of the rigour of a product. The other failure: growing the PoC into production. The artifact was built to prove, not to ship.',
    hitX: APP_CX, hitY: 175, hitW: 220, hitH: 18,
  },
]

export default function POCInteractive() {
  const [active, setActive] = useState<ZoneId | null>(null)
  const prefersReduced = useReducedMotion()

  const activeZone = ZONES.find(z => z.id === active) ?? null

  const toggle = (id: ZoneId) => setActive(prev => prev === id ? null : id)

  return (
    <div className="w-full">
      <div
        aria-label="Interactive proving rig. Click any labelled zone to explore what a PoC includes, excludes, and produces."
        style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}>
          <defs>
            <filter id="poc-int-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${BRICK}0.40)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="poc-int-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
              <feFlood floodColor={`${BRICK}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ONE CRITICAL QUESTION label / clickable zone */}
          <text x={APP_CX} y={27} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={active === 'question' ? `rgba(183,145,135,0.979)` : `rgba(183,145,135,0.895)`}
            style={{ userSelect: 'none', cursor: 'pointer',
              transition: 'fill 0.22s' }}>
            ONE CRITICAL QUESTION
          </text>
          <line x1={APP_CX} y1={31} x2={APP_CX} y2={APP_Y - 2}
            stroke={`${BRICK}0.20)`} strokeWidth={0.8} strokeDasharray="3 3" />

          {/* Input block */}
          <rect x={INP_X} y={INP_Y} width={INP_W} height={INP_H} rx={4}
            fill={`${BRICK}0.05)`} stroke={`${BRICK}0.22)`} strokeWidth={1.0} />
          <text x={INP_X + INP_W / 2} y={INP_CY}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`rgba(183,145,135,0.891)`} style={{ userSelect: 'none' }}>
            RAW INPUT
          </text>

          {/* Wire in */}
          <line x1={INP_X + INP_W} y1={INP_CY} x2={APP_X} y2={APP_CY}
            stroke={`${BRICK}0.30)`} strokeWidth={1.2} strokeDasharray="5 3" />

          {/* Apparatus box */}
          <rect x={APP_X - 3} y={APP_Y - 3} width={APP_W + 6} height={APP_H + 6} rx={9}
            fill="none" stroke={`${BRICK}0.06)`} strokeWidth={6}
            style={{ filter: 'url(#poc-int-glow)' }} />
          <rect x={APP_X} y={APP_Y} width={APP_W} height={APP_H} rx={6}
            fill={active === 'apparatus' ? `${BRICK}0.10)` : `${BRICK}0.04)`}
            stroke={active === 'apparatus' ? `${BRICK}0.55)` : `${BRICK}0.28)`}
            strokeWidth={1.2}
            style={{ transition: 'fill 0.22s, stroke 0.22s', cursor: 'pointer' }} />
          <text x={APP_CX} y={APP_Y + APP_H - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`rgba(183,145,135,0.819)`} style={{ userSelect: 'none' }}>
            PROVING RIG, INTERNAL, BARE
          </text>

          {/* Internal bus */}
          <line x1={BUS_X1} y1={APP_CY} x2={BUS_X2} y2={APP_CY}
            stroke={`${BRICK}0.20)`} strokeWidth={0.8} />

          {/* Taps + components */}
          {TAPS.map((t, i) => (
            <g key={i}>
              <line x1={t.x} y1={TAP_Y1 + 20} x2={t.x} y2={APP_Y + APP_H - 28}
                stroke={`${BRICK}0.16)`} strokeWidth={0.8} />
              <circle cx={t.x} cy={APP_CY} r={2.5} fill={`${BRICK}0.30)`} />
              <rect x={t.x - COMP_W / 2} y={TAP_Y1} width={COMP_W} height={COMP_H} rx={3}
                fill={`${BRICK}0.06)`} stroke={`${BRICK}0.28)`} strokeWidth={0.8} />
              <text x={t.x} y={TAP_Y1 + COMP_H / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={`rgba(183,145,135,0.92)`} style={{ userSelect: 'none' }}>
                {t.label}
              </text>
            </g>
          ))}

          {/* Scope drift label (clickable) */}
          <text x={APP_CX} y={174} textAnchor="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={active === 'discard' ? 'rgba(217,119,6,0.85)' : 'rgba(255,255,255,0.59)'}
            style={{ userSelect: 'none', cursor: 'pointer', transition: 'fill 0.22s' }}>
            ↓  SCOPE DRIFT ANTI-PATTERN  ↓
          </text>

          {/* Wire out */}
          <line x1={APP_X + APP_W} y1={APP_CY} x2={OUT_X} y2={APP_CY}
            stroke={`${BRICK}0.30)`} strokeWidth={1.2} strokeDasharray="5 3" />

          {/* Readout box */}
          <rect x={OUT_X} y={OUT_Y} width={OUT_W} height={OUT_H} rx={5}
            fill={active === 'verdict' ? `${BRICK}0.10)` : `${BRICK}0.04)`}
            stroke={active === 'verdict' ? `${BRICK}0.55)` : `${BRICK}0.22)`}
            strokeWidth={1.0}
            style={{ transition: 'fill 0.22s, stroke 0.22s', cursor: 'pointer' }} />
          <text x={OUT_CX} y={OUT_Y + 11}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`rgba(183,145,135,0.87)`} style={{ userSelect: 'none' }}>
            VERDICT
          </text>
          <line x1={OUT_X + 10} y1={OUT_Y + 18} x2={OUT_X + OUT_W - 10} y2={OUT_Y + 18}
            stroke={`${BRICK}0.14)`} strokeWidth={0.6} />
          {/* PASS */}
          <circle cx={IND_CX} cy={PASS_CY} r={8}
            fill={`${BRICK}0.15)`} stroke={`${BRICK}0.55)`} strokeWidth={1.2}
            style={{ filter: 'url(#poc-int-glow-sm)' }} />
          <circle cx={IND_CX} cy={PASS_CY} r={4.5} fill={`${BRICK}0.78)`} />
          <text x={IND_CX + 16} y={PASS_CY + 1}
            dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
            fill={`rgba(183,145,135,0.975)`} style={{ userSelect: 'none' }}>
            PASS
          </text>
          {/* FAIL */}
          <circle cx={IND_CX} cy={FAIL_CY} r={8}
            fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth={1.0} />
          <text x={IND_CX + 16} y={FAIL_CY + 1}
            dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
            FAIL
          </text>

          {/* Ghost absent elements (also clickable) */}
          {GHOSTS.map((g, i) => (
            <g key={i}>
              <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={4}
                fill={active === 'absent' ? `${BRICK}0.07)` : 'none'}
                stroke={active === 'absent' ? `${BRICK}0.30)` : 'rgba(255,255,255,0.10)'}
                strokeWidth={0.8} strokeDasharray="5 4"
                style={{ transition: 'fill 0.22s, stroke 0.22s', cursor: 'pointer' }} />
              <text x={g.x + g.w / 2} y={g.y + 16}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={active === 'absent' ? `rgba(183,145,135,0.905)` : 'rgba(255,255,255,0.58)'}
                style={{ userSelect: 'none', transition: 'fill 0.22s' }}>
                {g.label}
              </text>
            </g>
          ))}

          {/* Invisible hit rects (one per zone, on top) */}
          {ZONES.map(z => (
            <rect key={z.id}
              x={z.hitX - z.hitW / 2} y={z.hitY - z.hitH / 2}
              width={z.hitW} height={z.hitH}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              role="button" aria-pressed={active === z.id}
              aria-label={`Explore: ${z.tag}`}
              tabIndex={0}
              onClick={() => toggle(z.id)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle(z.id)}
            />
          ))}
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeZone && (
          <motion.div
            key={activeZone.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="mt-4 rounded-xl p-6 border"
            style={{
              background: activeZone.id === 'discard'
                ? 'rgba(217,119,6,0.04)'
                : `${BRICK}0.05)`,
              borderColor: activeZone.id === 'discard'
                ? 'rgba(217,119,6,0.22)'
                : `${BRICK}0.22)`,
            }}>
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <span className="text-[10px] font-semibold font-mono uppercase tracking-widest"
                style={{
                  color: activeZone.id === 'discard'
                    ? 'rgba(217,119,6,0.85)'
                    : `${BRICK}0.85)`,
                }}>
                {activeZone.tag}
              </span>
              <button onClick={() => setActive(null)}
                className="text-xs text-neutral-500 hover:text-neutral-600"
                aria-label="Close detail">×</button>
            </div>
            <h3 className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
              {activeZone.headline}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              {activeZone.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zone legend */}
      <div className="flex flex-wrap gap-2 mt-4">
        {ZONES.map(z => (
          <button key={z.id}
            onClick={() => toggle(z.id)}
            aria-pressed={active === z.id}
            className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-widest transition-all"
            style={{
              background: active === z.id
                ? (z.id === 'discard' ? 'rgba(217,119,6,0.10)' : `${BRICK}0.10)`)
                : 'transparent',
              border: `1px solid ${active === z.id
                ? (z.id === 'discard' ? 'rgba(217,119,6,0.35)' : `${BRICK}0.35)`)
                : 'rgba(255,255,255,0.12)'}`,
              color: active === z.id
                ? (z.id === 'discard' ? 'rgba(217,119,6,0.90)' : `${BRICK}1)`)
                : 'rgba(255,255,255,0.35)',
            }}>
            {z.tag}
          </button>
        ))}
      </div>
    </div>
  )
}
