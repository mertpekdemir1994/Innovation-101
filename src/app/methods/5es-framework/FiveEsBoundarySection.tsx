'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER = 'rgba(245,158,11,'

// Mini SVG shared dimensions
const MW    = 360
const MPW   = 72   // mini phase width (360 / 5)
const MPCX  = [36, 108, 180, 252, 324] as const
const MHDR_H = 28
const MBAR_BASE  = 116
const MBAR_H_MAX = 72  // 116 - 36 - 8
const MINV  = [0.34, 0.54, 0.91, 0.26, 0.14] as const
const MH_5ES = 126

// JM mini - variable-width stages and emotion curve
const MH_JM  = 118
const JM_STAGE_WS = [60, 72, 84, 72, 72] as const  // not equal - shows contrast with 5Es
const JM_STAGE_XS = [0, 60, 132, 216, 288] as const
const JM_STAGE_CX = [30, 96, 174, 252, 324] as const

// SB mini
const MH_SB  = 136
const MSB_CA_Y = 30, MSB_CA_H = 20
const MSB_FS_Y = 52, MSB_FS_H = 20
const MSB_LOV_Y = 76
const MSB_BS_Y  = 82, MSB_BS_H = 20
const MSB_SP_Y  = 104, MSB_SP_H = 20

type StateId = '5es' | 'journey-mapping' | 'service-blueprinting'

function FiveEsMiniSVG() {
  const PHASE_LABELS = ['E', 'EN', 'EG', 'EX', 'EXT']
  const BOOKENDS = [true, false, false, true, true]
  return (
    <svg viewBox={`0 0 ${MW} ${MH_5ES}`} width="100%" style={{ display: 'block' }}>
      <rect x={0} y={0} width={MW} height={MH_5ES} rx={6} fill={`${TEAL}0.06)`} />
      {[1,2,3,4].map(i => (
        <line key={i} x1={i*MPW} y1={0} x2={i*MPW} y2={MH_5ES}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1}
        />
      ))}
      {PHASE_LABELS.map((label, i) => (
        <g key={label}>
          <rect x={i*MPW+1} y={4} width={MPW-2} height={MHDR_H} rx={3}
            fill={BOOKENDS[i] ? `${AMBER}0.10)` : `${TEAL}0.14)`}
            stroke={BOOKENDS[i] ? `${AMBER}0.30)` : `${TEAL}0.35)`}
            strokeWidth={1}
          />
          {BOOKENDS[i] && (
            <rect x={i*MPW+1} y={4} width={MPW-2} height={2} rx={2} fill={`${AMBER}0.45)`} />
          )}
          <text x={MPCX[i]} y={4 + MHDR_H/2 + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={BOOKENDS[i] ? `${AMBER}0.80)` : `${TEAL_TEXT}0.969)`}
            style={{ userSelect: 'none' }}
          >{label}</text>
        </g>
      ))}
      <line x1={0} y1={36} x2={MW} y2={36} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
      {PHASE_LABELS.map((_, i) => {
        const barH = MINV[i] * MBAR_H_MAX
        const barX = MPCX[i] - 18
        const barY = MBAR_BASE - barH
        return (
          <g key={i}>
            <rect x={barX} y={38} width={36} height={MBAR_H_MAX} rx={2} fill="rgba(255,255,255,0.03)" />
            <rect x={barX} y={barY} width={36} height={barH} rx={2}
              fill={i === 2 ? `${TEAL}0.75)` : BOOKENDS[i] ? `${AMBER}0.35)` : `${TEAL}0.38)`}
            />
          </g>
        )
      })}
    </svg>
  )
}

function JourneyMappingMiniSVG() {
  // Show flexible-width stages (not equal) + emotion curve to contrast with 5Es
  const JM_LABELS = ['DISCOVER', 'CONSIDER', 'START', 'USE', 'REFLECT']
  const JM_COLORS = [
    `${TEAL}0.12)`, `${TEAL}0.10)`, `${TEAL}0.14)`, `${TEAL}0.16)`, `${TEAL}0.10)`,
  ]
  // Emotion line points (y values in a SVG space where top=good, bottom=poor)
  // The curve shows a typical journey: low → medium → high → high → medium
  const EMO_Y = [82, 68, 52, 50, 72] as const

  // Build a smooth path through the points
  const points = JM_STAGE_CX.map((cx, i) => ({ x: cx, y: EMO_Y[i] }))
  const d = points.reduce((acc, pt, i) => {
    if (i === 0) return `M${pt.x},${pt.y}`
    const prev = points[i - 1]
    const cp1x = prev.x + (pt.x - prev.x) / 3
    const cp2x = prev.x + (2 * (pt.x - prev.x)) / 3
    return `${acc} C${cp1x},${prev.y} ${cp2x},${pt.y} ${pt.x},${pt.y}`
  }, '')

  return (
    <svg viewBox={`0 0 ${MW} ${MH_JM}`} width="100%" style={{ display: 'block' }}>
      <rect x={0} y={0} width={MW} height={MH_JM} rx={6} fill={`${TEAL}0.05)`} />

      {/* Variable-width stage headers */}
      {JM_LABELS.map((label, i) => (
        <g key={label}>
          <rect
            x={JM_STAGE_XS[i] + 1} y={4}
            width={JM_STAGE_WS[i] - 2} height={MHDR_H}
            rx={3}
            fill={JM_COLORS[i]}
            stroke={`${TEAL}0.32)`}
            strokeWidth={1}
          />
          <text x={JM_STAGE_CX[i]} y={4 + MHDR_H/2 + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`${TEAL_TEXT}0.958)`} style={{ userSelect: 'none' }}
          >{label.slice(0, 4)}</text>
        </g>
      ))}

      {/* Stage dividers */}
      {[1,2,3,4].map(i => (
        <line key={i}
          x1={JM_STAGE_XS[i]} y1={32}
          x2={JM_STAGE_XS[i]} y2={MH_JM - 10}
          stroke="rgba(255,255,255,0.05)" strokeWidth={1}
        />
      ))}

      {/* Actions row */}
      <line x1={0} y1={34} x2={MW} y2={34} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      <text x={4} y={38} textAnchor="start" dominantBaseline="hanging"
        fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${TEAL_TEXT}0.885)`} style={{ userSelect: 'none' }}
      >ACTIONS</text>
      {JM_STAGE_CX.map((cx, i) => (
        <rect key={i} x={cx-18} y={38} width={36} height={10} rx={2}
          fill={`${TEAL}0.08)`} stroke={`${TEAL}0.20)`} strokeWidth={0.5}
        />
      ))}

      {/* Emotion curve */}
      <path d={d} fill="none" stroke={`${TEAL}0.65)`} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={3}
          fill={`${TEAL}0.90)`} stroke="rgba(0,0,0,0.3)" strokeWidth={0.5}
        />
      ))}
      <text x={4} y={MH_JM - 6} textAnchor="start" dominantBaseline="auto"
        fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${TEAL_TEXT}0.874)`} style={{ userSelect: 'none' }}
      >EMOTION</text>
    </svg>
  )
}

function ServiceBlueprintingMiniSVG() {
  const STAGES = ['D', 'C', 'S', 'U', 'R']
  return (
    <svg viewBox={`0 0 ${MW} ${MH_SB}`} width="100%" style={{ display: 'block' }}>
      <rect x={0} y={0} width={MW} height={MH_SB} rx={6} fill={`${TEAL}0.04)`} />

      {/* Stage headers */}
      {STAGES.map((s, i) => (
        <g key={s}>
          <rect x={i*MPW+1} y={4} width={MPW-2} height={MHDR_H} rx={3}
            fill={`${TEAL}0.12)`} stroke={`${TEAL}0.35)`} strokeWidth={1}
          />
          <text x={MPCX[i]} y={4+MHDR_H/2+1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontFamily="var(--font-mono)" fill={`${TEAL_TEXT}0.962)`}
            style={{ userSelect: 'none' }}
          >{s}</text>
        </g>
      ))}

      {/* Customer Actions */}
      <rect x={0} y={MSB_CA_Y} width={MW} height={MSB_CA_H} fill={`${TEAL}0.07)`} />
      <text x={4} y={MSB_CA_Y+5} textAnchor="start" dominantBaseline="hanging"
        fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${TEAL_TEXT}0.895)`} style={{ userSelect: 'none' }}
      >CUSTOMER ACTIONS</text>

      {/* Frontstage */}
      <rect x={0} y={MSB_FS_Y} width={MW} height={MSB_FS_H} fill={`${TEAL}0.04)`} />
      <line x1={0} y1={MSB_FS_Y+MSB_FS_H} x2={MW} y2={MSB_FS_Y+MSB_FS_H}
        stroke="rgba(255,255,255,0.05)" strokeWidth={1}
      />
      <text x={4} y={MSB_FS_Y+5} textAnchor="start" dominantBaseline="hanging"
        fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill={`${TEAL_TEXT}0.874)`} style={{ userSelect: 'none' }}
      >FRONTSTAGE</text>

      {/* Line of Visibility */}
      <line x1={0} y1={MSB_LOV_Y} x2={MW} y2={MSB_LOV_Y}
        stroke="rgba(255,255,255,0.58)" strokeWidth={1.5} strokeDasharray="6 4"
      />
      <text x={MW-4} y={MSB_LOV_Y-4}
        textAnchor="end" dominantBaseline="auto"
        fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.09em"
        fill="rgba(255,255,255,0.50)" style={{ userSelect: 'none' }}
      >LINE OF VISIBILITY</text>

      {/* Backstage */}
      <rect x={0} y={MSB_BS_Y} width={MW} height={MSB_BS_H} fill="rgba(100,116,139,0.06)" />
      <text x={4} y={MSB_BS_Y+5} textAnchor="start" dominantBaseline="hanging"
        fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill="rgba(143,154,171,0.905)" style={{ userSelect: 'none' }}
      >BACKSTAGE</text>

      {/* Support Processes */}
      <rect x={0} y={MSB_SP_Y} width={MW} height={MSB_SP_H} fill="rgba(100,116,139,0.09)" />
      <text x={4} y={MSB_SP_Y+5} textAnchor="start" dominantBaseline="hanging"
        fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill="rgba(143,154,171,0.885)" style={{ userSelect: 'none' }}
      >SUPPORT PROCESSES</text>
    </svg>
  )
}

const STATES: {
  id: StateId
  label: string
  href: string
  tagline: string
  body: string
}[] = [
  {
    id: '5es',
    label: 'The 5Es Framework',
    href: '/methods/5es-framework',
    tagline: 'Fixed five-phase evaluation lens: the current method',
    body: 'The 5Es applies five fixed, evenly-weighted phases to any experience: Entice, Enter, Engage, Exit, Extend. The phases are always the same; what changes is what you find in each one. The framework&rsquo;s purpose is to force attention onto the bookends that teams routinely skip.',
  },
  {
    id: 'journey-mapping',
    label: 'Journey Mapping',
    href: '/methods/journey-mapping',
    tagline: 'Flexible-path narrative, one person at a time',
    body: 'Journey Mapping traces a specific person through a specific experience with flexible, experience-shaped stages and an emotion line tracking how they feel at each moment. Where 5Es gives you a fixed lens to apply broadly, Journey Mapping gives you a deep narrative of one experience. They work together: run 5Es to find which bookend to focus on, then map that zone in detail.',
  },
  {
    id: 'service-blueprinting',
    label: 'Service Blueprinting',
    href: '/methods/service-blueprinting',
    tagline: 'Adds the operational machine behind the experience',
    body: 'Service Blueprinting adds the organizational dimension: the full service stack (customer actions, frontstage, backstage, systems) separated by the Line of Visibility. The 5Es evaluates what the customer experiences; a Service Blueprint maps the machine that produces it. Run both when a bookend problem turns out to be an operational problem: the 5Es names the symptom, the Blueprint finds the cause.',
  },
]

export default function FiveEsBoundarySection() {
  const [active, setActive] = useState<StateId>('5es')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const current = STATES.find(s => s.id === active)!

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {/* Selector cards */}
      <div className="md:col-span-2 flex flex-col gap-3">
        {STATES.map(state => {
          const isActive = active === state.id
          return (
            <button key={state.id}
              onClick={() => setActive(state.id)}
              className="rounded-xl p-4 text-left transition-colors"
              style={{
                background: isActive ? `${TEAL}0.12)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? `${TEAL}0.40)` : 'rgba(255,255,255,0.08)'}`,
              }}
              aria-pressed={isActive}
            >
              <p className="font-semibold mb-0.5"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: isActive ? `${TEAL}0.95)` : 'rgba(255,255,255,0.60)',
                }}
              >{state.label}</p>
              <p style={{
                fontSize: 'var(--text-2xs, 10px)',
                color: isActive ? `${TEAL}0.65)` : 'rgba(255,255,255,0.28)',
                lineHeight: '1.4',
              }}>{state.tagline}</p>
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      <div className="md:col-span-3">
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
          >
            {/* Mini SVG */}
            <div className="rounded-xl overflow-hidden mb-5"
              style={{ background: `${TEAL}0.04)`, border: `1px solid ${TEAL}0.15)` }}
            >
              {active === '5es' && <FiveEsMiniSVG />}
              {active === 'journey-mapping' && <JourneyMappingMiniSVG />}
              {active === 'service-blueprinting' && <ServiceBlueprintingMiniSVG />}
            </div>

            {/* Description */}
            <p className="mb-4"
              style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}
              dangerouslySetInnerHTML={{ __html: current.body }}
            />

            {active !== '5es' && (
              <Link href={current.href}
                className="inline-flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-75"
                style={{ fontSize: 'var(--text-xs)', color: `${TEAL}0.85)` }}
              >
                Go to {current.label}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
