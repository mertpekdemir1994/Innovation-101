'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL   = 'rgba(42,111,122,'
const SLATE  = 'rgba(100,116,139,'
const INDIGO = 'rgba(99,102,241,'

type Reveal = 'blueprint' | 'journey-mapping' | '5es'

const ITEMS: { id: Reveal; label: string; summary: string }[] = [
  {
    id: 'blueprint',
    label: 'Service Blueprint',
    summary: 'Above AND below the line of visibility. The full delivery system: what the customer sees and the operational machine that produces it.',
  },
  {
    id: 'journey-mapping',
    label: 'Journey Mapping',
    summary: 'Above the line only. The customer\'s felt experience: what they do, think, and feel. The top spine of the blueprint.',
  },
  {
    id: '5es',
    label: 'The 5Es Framework',
    summary: 'A fixed five-phase lens applied to the experience: Entice, Enter, Engage, Exit, Extend.',
  },
]

const DETAIL: Record<Reveal, { heading: string; description: string; distinction: string; link?: string }> = {
  blueprint: {
    heading: 'Service Blueprinting: above and below the line',
    description: 'A service blueprint maps the full delivery system: the customer\'s experience across the top (everything above the line of visibility), and the frontstage, backstage, and support processes below it. Its power is connecting the felt experience to the operational machine that produces it, and finding where that machine breaks in ways the customer feels but cannot name.',
    distinction: 'Use Service Blueprinting when the problem lives in the operations beneath the experience: in the handoffs, the backstage, the systems. Reach for Journey Mapping when you need the felt experience alone; reach for the 5Es when you need a fixed evaluation lens applied to the experience phases.',
  },
  'journey-mapping': {
    heading: 'Journey Mapping: the top spine',
    description: 'Journey Mapping is a deliberate counterpart that stays strictly above the line of visibility: what the customer does, thinks, and feels at each stage. It is the top spine that a service blueprint keeps (the customer experience layer) but without the frontstage, backstage, or systems below it. Its signature element is the emotion line: the rising and falling arc of how the customer feels across the whole experience.',
    distinction: 'A journey map shows the felt experience. A service blueprint keeps that top spine and adds the operational machine beneath it. The two are complementary halves: understand the experience first, then blueprint the system that delivers it.',
    link: '/methods/journey-mapping',
  },
  '5es': {
    heading: 'The 5Es Framework: fixed evaluation phases',
    description: 'The 5Es (Entice, Enter, Engage, Exit, Extend) applies a fixed, standard five-phase lens to any experience, regardless of how the specific experience unfolds. Its power is the consistent evaluation it enables: once you commit to the five phases as a universal structure, you can systematically ask whether each is doing its job, especially the often-neglected bookends (Entice before first contact, Extend long after the core experience).',
    distinction: 'The 5Es evaluates the quality of the experience phases. Service Blueprinting designs the operational system that delivers them. Use the 5Es to evaluate; use the blueprint to redesign. They are complementary: the 5Es tells you which phases need work; the blueprint tells you what in the operations is causing it.',
    link: '/methods/5es',
  },
}

// ── Mini SVG dimensions ────────────────────────────────────────────────────────

const MW = 350, MSW = 70
const MSCX = [35, 105, 175, 245, 315] as const
const MHDR_H = 22
const MDIV_Y = 24
const MCA_Y = 26, MCA_H = 24
const MFS_Y = 52, MFS_H = 24
const MLOV_Y = 80
const MBS_Y  = 86, MBS_H = 24
const MSP_Y  = 112, MSP_H = 22
const MH_FULL = 142  // full blueprint height
const MH_JM   = 92   // journey-map height (above LOV only, with emotion line)

// Abbreviated emotion line for the Journey Mapping mini SVG
// Points track through the CA lane (mid = MCA_Y + MCA_H/2 = 38)
const MEM_PATH =
  `M 35,44 C 60,38 80,34 105,33 C 120,36 148,52 175,54 C 198,52 225,36 245,32 C 270,30 295,38 315,40`

function BlueprintMiniSVG() {
  return (
    <svg viewBox={`0 0 ${MW} ${MH_FULL}`} width="100%" aria-hidden="true">
      <rect x={0} y={0} width={MW} height={MH_FULL} rx={6} fill={`${TEAL}0.06)`} />
      {/* Stage headers */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={i * MSW + 1} y={2} width={MSW - 2} height={MHDR_H}
            rx={3} fill={`${TEAL}0.12)`} stroke={`${TEAL}0.38)`} strokeWidth={1}
          />
          <text x={MSCX[i]} y={2 + MHDR_H / 2 + 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.82)`} style={{ userSelect: 'none' }}
          >S{i + 1}</text>
        </g>
      ))}
      <line x1={0} y1={MDIV_Y} x2={MW} y2={MDIV_Y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* CA */}
      <rect x={0} y={MCA_Y} width={MW} height={MCA_H} fill={`${TEAL}0.07)`} />
      <line x1={0} y1={MCA_Y + MCA_H} x2={MW} y2={MCA_Y + MCA_H} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
      <text x={3} y={MCA_Y + 7} textAnchor="start" dominantBaseline="hanging"
        fontSize="3.5" fontFamily="var(--font-mono)" fill={`${TEAL}0.52)`} style={{ userSelect: 'none' }}
      >CUSTOMER ACTIONS</text>
      {/* FS */}
      <rect x={0} y={MFS_Y} width={MW} height={MFS_H} fill={`${TEAL}0.04)`} />
      <line x1={0} y1={MFS_Y + MFS_H} x2={MW} y2={MFS_Y + MFS_H} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      <text x={3} y={MFS_Y + 7} textAnchor="start" dominantBaseline="hanging"
        fontSize="3.5" fontFamily="var(--font-mono)" fill={`${TEAL}0.42)`} style={{ userSelect: 'none' }}
      >FRONTSTAGE</text>
      {/* LOV */}
      <line x1={0} y1={MLOV_Y} x2={MW} y2={MLOV_Y}
        stroke="rgba(255,255,255,0.60)" strokeWidth={1.5} strokeDasharray="6 4"
      />
      <text x={MW - 3} y={MLOV_Y - 4}
        textAnchor="end" dominantBaseline="auto"
        fontSize="3.5" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.55)" style={{ userSelect: 'none' }}
      >LINE OF VISIBILITY</text>
      {/* BS */}
      <rect x={0} y={MBS_Y} width={MW} height={MBS_H} fill={`${SLATE}0.05)`} />
      <line x1={0} y1={MBS_Y + MBS_H} x2={MW} y2={MBS_Y + MBS_H} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      <text x={3} y={MBS_Y + 7} textAnchor="start" dominantBaseline="hanging"
        fontSize="3.5" fontFamily="var(--font-mono)" fill={`${SLATE}0.55)`} style={{ userSelect: 'none' }}
      >BACKSTAGE</text>
      {/* SP */}
      <rect x={0} y={MSP_Y} width={MW} height={MSP_H} fill={`${SLATE}0.08)`} />
      <text x={3} y={MSP_Y + 7} textAnchor="start" dominantBaseline="hanging"
        fontSize="3.5" fontFamily="var(--font-mono)" fill={`${SLATE}0.45)`} style={{ userSelect: 'none' }}
      >SUPPORT PROCESSES / SYSTEMS</text>
      {/* Column dividers */}
      {[1,2,3,4].map(i => (
        <line key={i} x1={i * MSW} y1={MDIV_Y} x2={i * MSW} y2={MH_FULL}
          stroke="rgba(255,255,255,0.05)" strokeWidth={1}
        />
      ))}
      <text x={MW / 2} y={MH_FULL - 2} textAnchor="middle" dominantBaseline="auto"
        fontSize="3.5" fontFamily="var(--font-mono)" fill={`${TEAL}0.35)`} style={{ userSelect: 'none' }}
      >ABOVE + BELOW THE LINE, FULL DELIVERY SYSTEM</text>
    </svg>
  )
}

function JourneyMappingMiniSVG() {
  return (
    <svg viewBox={`0 0 ${MW} ${MH_JM}`} width="100%" aria-hidden="true">
      <rect x={0} y={0} width={MW} height={MH_JM} rx={6} fill={`${TEAL}0.06)`} />
      {/* Stage headers */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={i * MSW + 1} y={2} width={MSW - 2} height={MHDR_H}
            rx={3} fill={`${TEAL}0.12)`} stroke={`${TEAL}0.38)`} strokeWidth={1}
          />
          <text x={MSCX[i]} y={2 + MHDR_H / 2 + 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.82)`} style={{ userSelect: 'none' }}
          >S{i + 1}</text>
        </g>
      ))}
      <line x1={0} y1={MDIV_Y} x2={MW} y2={MDIV_Y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* CA: customer actions + emotion line */}
      <rect x={0} y={MCA_Y} width={MW} height={MCA_H} fill={`${TEAL}0.07)`} />
      <text x={3} y={MCA_Y + 7} textAnchor="start" dominantBaseline="hanging"
        fontSize="3.5" fontFamily="var(--font-mono)" fill={`${TEAL}0.52)`} style={{ userSelect: 'none' }}
      >CUSTOMER ACTIONS</text>
      <line x1={0} y1={MCA_Y + MCA_H} x2={MW} y2={MCA_Y + MCA_H} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
      {/* FS */}
      <rect x={0} y={MFS_Y} width={MW} height={MFS_H} fill={`${TEAL}0.04)`} />
      <text x={3} y={MFS_Y + 7} textAnchor="start" dominantBaseline="hanging"
        fontSize="3.5" fontFamily="var(--font-mono)" fill={`${TEAL}0.42)`} style={{ userSelect: 'none' }}
      >FRONTSTAGE</text>
      {/* Emotion line in the CA area */}
      <path d={MEM_PATH}
        stroke={`${TEAL}0.85)`} strokeWidth={2} strokeLinecap="round" fill="none"
      />
      {MSCX.map((cx, i) => {
        const eys = [44, 33, 54, 32, 40]
        return <circle key={i} cx={cx} cy={eys[i]} r={2}
          fill={`${TEAL}0.90)`} stroke="rgba(255,255,255,0.60)" strokeWidth={0.8}
        />
      })}
      {/* LOV line: dimmed */}
      <line x1={0} y1={MLOV_Y} x2={MW} y2={MLOV_Y}
        stroke="rgba(255,255,255,0.20)" strokeWidth={1.5} strokeDasharray="6 4"
      />
      <text x={MW - 3} y={MLOV_Y - 4}
        textAnchor="end" dominantBaseline="auto"
        fontSize="3.5" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.20)" style={{ userSelect: 'none' }}
      >LINE OF VISIBILITY</text>
      {/* Below LOV: dimmed hint only */}
      <rect x={0} y={MLOV_Y} width={MW} height={MH_JM - MLOV_Y}
        fill="rgba(0,0,0,0.20)"
      />
      <text x={MW / 2} y={MLOV_Y + (MH_JM - MLOV_Y) / 2}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="4" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.15)" style={{ userSelect: 'none' }}
      >NOT IN SCOPE, STAYS ABOVE THE LINE</text>
      {/* Column dividers */}
      {[1,2,3,4].map(i => (
        <line key={i} x1={i * MSW} y1={MDIV_Y} x2={i * MSW} y2={MH_JM}
          stroke="rgba(255,255,255,0.05)" strokeWidth={1}
        />
      ))}
    </svg>
  )
}

const FIVE_E_LABELS = ['ENTICE', 'ENTER', 'ENGAGE', 'EXIT', 'EXTEND'] as const

function FiveEsMiniSVG() {
  return (
    <svg viewBox={`0 0 ${MW} ${MH_FULL}`} width="100%" aria-hidden="true">
      {/* Dimmed blueprint behind */}
      <rect x={0} y={0} width={MW} height={MH_FULL} rx={6} fill={`${TEAL}0.03)`} />
      {/* Blueprint structure dimmed */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={i * MSW + 1} y={2} width={MSW - 2} height={MHDR_H}
          rx={3} fill={`${TEAL}0.05)`} stroke={`${TEAL}0.12)`} strokeWidth={1}
        />
      ))}
      <line x1={0} y1={MLOV_Y} x2={MW} y2={MLOV_Y}
        stroke="rgba(255,255,255,0.20)" strokeWidth={1} strokeDasharray="6 4"
      />
      {[MCA_Y, MFS_Y, MBS_Y, MSP_Y].map((y, i) => (
        <rect key={i} x={0} y={y} width={MW} height={i < 2 ? MCA_H : MBS_H}
          fill={i < 2 ? `${TEAL}0.02)` : `${SLATE}0.03)`}
        />
      ))}
      {/* 5Es overlay */}
      {FIVE_E_LABELS.map((label, i) => (
        <g key={label}>
          <rect x={i * MSW + 1} y={2} width={MSW - 2} height={MHDR_H}
            rx={3} fill={`${INDIGO}0.20)`} stroke={`${INDIGO}0.58)`} strokeWidth={1.5}
          />
          <text x={MSCX[i]} y={2 + MHDR_H / 2 + 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`${INDIGO}0.90)`} style={{ userSelect: 'none' }}
          >{label}</text>
        </g>
      ))}
      {[1,2,3,4].map(i => (
        <line key={i} x1={i * MSW} y1={MDIV_Y} x2={i * MSW} y2={MH_FULL}
          stroke={`${INDIGO}0.10)`} strokeWidth={1}
        />
      ))}
      <text x={MW / 2} y={MH_FULL - 2} textAnchor="middle" dominantBaseline="auto"
        fontSize="3.5" fontFamily="var(--font-mono)" fill={`${INDIGO}0.40)`} style={{ userSelect: 'none' }}
      >FIXED FIVE-PHASE EVALUATION LENS</text>
    </svg>
  )
}

export default function SBBoundarySection() {
  const [active, setActive] = useState<Reveal>('blueprint')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const accentColor = (id: Reveal) =>
    id === '5es' ? `${INDIGO}` : `${TEAL}`

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
      {/* Selector cards */}
      <div className="w-full md:w-60 shrink-0 flex flex-col gap-3">
        {ITEMS.map(({ id, label, summary }) => (
          <button key={id}
            onClick={() => setActive(id)}
            className="text-left rounded-xl p-4 transition-colors"
            style={{
              background: active === id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              border:     `1px solid ${active === id ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'}`,
              outline:    'none',
            }}
            aria-pressed={active === id}
          >
            <p className="font-semibold mb-1.5"
              style={{ fontSize: 'var(--text-sm)', color: active === id ? '#FAFAFA' : 'rgba(255,255,255,0.40)' }}
            >{label}</p>
            <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.28)' }}>
              {summary}
            </p>
          </button>
        ))}
      </div>

      {/* Visual + detail */}
      <div className="w-full md:flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease }}
          >
            {/* Mini diagram */}
            <div className="mb-6 rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(0,0,0,0.20)' }}
            >
              {active === 'blueprint'       && <BlueprintMiniSVG />}
              {active === 'journey-mapping' && <JourneyMappingMiniSVG />}
              {active === '5es'             && <FiveEsMiniSVG />}
            </div>

            {/* Detail */}
            <h3 className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-xl)', color: '#FAFAFA' }}
            >{DETAIL[active].heading}</h3>
            <p className="mb-5"
              style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.62)' }}
            >{DETAIL[active].description}</p>

            <div className="rounded-lg p-4"
              style={{ background: `${accentColor(active)}0.08)`, border: `1px solid ${accentColor(active)}0.18)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${accentColor(active)}0.65)` }}
              >When to reach for this instead</p>
              <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.62)' }}>
                {DETAIL[active].distinction}
              </p>
            </div>

            {DETAIL[active].link && (
              <div className="mt-4">
                <Link href={DETAIL[active].link!}
                  className="inline-flex items-center gap-1.5 font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${accentColor(active)}0.70)` }}
                >
                  Go to {ITEMS.find(i => i.id === active)?.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
