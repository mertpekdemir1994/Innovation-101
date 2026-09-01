'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO
const SLATE = 'rgba(100,116,139,'
const SLATE_TEXT = 'rgba(143,154,171,'  // brightened text-safe variant of SLATE

type Reveal = 'journey' | '5es' | 'blueprint'

const ITEMS: { id: Reveal; label: string; summary: string }[] = [
  {
    id: 'journey',
    label: 'Journey Mapping',
    summary: 'Flexible stages fitted to the real experience. Stays on the experiencer\'s side.',
  },
  {
    id: '5es',
    label: 'The 5Es Framework',
    summary: 'Five fixed phases applied to evaluate any experience consistently: Entice, Enter, Engage, Exit, Extend.',
  },
  {
    id: 'blueprint',
    label: 'Service Blueprinting',
    summary: 'Extends the journey into the backstage operations that deliver the experience, below the line of visibility.',
  },
]

const DETAIL: Record<Reveal, {
  heading: string
  description: string
  distinction: string
  link?: string
}> = {
  journey: {
    heading:     'Journey Mapping: the experiencer\'s side',
    description: 'Journey mapping uses whatever stages fit the real experience: however many, named however the person actually experiences them. It stays strictly on the experiencer\'s side (their actions, thoughts, and emotions) which keeps it legible, empathetic, and focused on the felt experience rather than the operational machinery behind it.',
    distinction: 'Use Journey Mapping to see and understand the whole felt experience. Reach for 5Es when you want a standard evaluation lens; reach for Service Blueprinting when you need to understand or redesign the backstage operations that produce the experience.',
  },
  '5es': {
    heading:     'The 5Es: five fixed phases',
    description: 'The 5Es Framework (Entice, Enter, Engage, Exit, Extend) applies a fixed, standard five-phase lens to any experience, regardless of how the specific experience actually unfolds. Its power is the evaluation it enables: once you commit to the five phases as a universal structure, you can systematically ask whether each is doing its job, especially the often-neglected bookends, Entice (before first contact) and Extend (long after the core experience).',
    distinction: 'Journey Mapping uses flexible stages fitted to the real experience. The 5Es uses fixed phases to evaluate any experience against a standard. The 5Es is not more or less advanced; it answers a different question.',
    link: '/methods/5es',
  },
  blueprint: {
    heading:     'Service Blueprinting: adding backstage',
    description: 'A service blueprint takes a journey map and adds everything below the line of visibility: the frontstage staff actions, the backstage staff actions, and the support processes (systems, tools, databases) that produce the experience. The line of visibility separates what the person can see from what happens behind the scenes. Journey Mapping stays above it, deliberately. A service blueprint crosses it.',
    distinction: 'Use Journey Mapping to understand the felt experience. Use Service Blueprinting when you need to understand, coordinate, or redesign the operational machinery that delivers it. Both are needed; they answer different questions.',
    link: '/methods/service-blueprinting',
  },
}

// ── Mini SVG diagrams for each state ─────────────────────────────────────────

const MINI_SCX = [48, 112, 176, 240, 304] as const
const MINI_W = 352, MINI_HDR_H = 28

// Mini emotion line
const miniEmotionY = { 0: 95, 1: 80, 2: 115, 3: 75, 4: 88 }
const MINI_PATH =
  `M 48,${miniEmotionY[0]} C 72,${miniEmotionY[0] - 5} 90,${miniEmotionY[1] + 3} 112,${miniEmotionY[1]} ` +
  `C 128,${miniEmotionY[1] + 5} 158,${miniEmotionY[2] - 3} 176,${miniEmotionY[2]} ` +
  `C 200,${miniEmotionY[2] + 2} 225,${miniEmotionY[3] + 3} 240,${miniEmotionY[3]} ` +
  `C 260,${miniEmotionY[3]} 284,${miniEmotionY[4] - 3} 304,${miniEmotionY[4]}`

function JourneyMiniSVG() {
  return (
    <svg viewBox={`0 0 ${MINI_W} 130`} width="100%" aria-hidden="true">
      <rect x={0} y={0} width={MINI_W} height={130} rx={6} fill={`${TEAL}0.06)`} />
      {/* Stage headers */}
      {MINI_SCX.map((cx, i) => (
        <g key={i}>
          <rect x={i * 64 + 1} y={4} width={62} height={MINI_HDR_H} rx={3}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.35)`} strokeWidth={1} />
          <text x={cx} y={18} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL_TEXT}0.962)`} style={{ userSelect: 'none' }}
          >STAGE {i + 1}</text>
        </g>
      ))}
      {/* Divider */}
      <line x1={0} y1={34} x2={MINI_W} y2={34} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* Lane labels */}
      <text x={3} y={50} textAnchor="start" dominantBaseline="middle"
        fontSize="4" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}
      >ACTIONS</text>
      <text x={3} y={70} textAnchor="start" dominantBaseline="middle"
        fontSize="4" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}
      >THOUGHTS</text>
      <line x1={0} y1={80} x2={MINI_W} y2={80} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      {/* Emotion line */}
      <path d={`${MINI_PATH} L 304,125 L 48,125 Z`} fill={`${TEAL}0.05)`} stroke="none" />
      <path d={MINI_PATH} stroke={`${TEAL}0.85)`} strokeWidth={2} strokeLinecap="round" fill="none" />
      {/* Dots */}
      {MINI_SCX.map((cx, i) => (
        <circle key={i} cx={cx} cy={miniEmotionY[i as keyof typeof miniEmotionY]} r={2.5}
          fill={`${TEAL}0.90)`} stroke="rgba(255,255,255,0.60)" strokeWidth={0.8}
        />
      ))}
      <text x={MINI_W / 2} y={126} textAnchor="middle" fontSize="4" fontFamily="var(--font-mono)"
        fill="rgba(255,255,255,0.625)" style={{ userSelect: 'none' }}
      >FLEXIBLE STAGES, EXPERIENCER&apos;S SIDE ONLY</text>
    </svg>
  )
}

function FiveEsSVG() {
  const phases = ['ENTICE', 'ENTER', 'ENGAGE', 'EXIT', 'EXTEND'] as const
  return (
    <svg viewBox={`0 0 ${MINI_W} 130`} width="100%" aria-hidden="true">
      <rect x={0} y={0} width={MINI_W} height={130} rx={6} fill={`${INDIGO}0.05)`} />
      {/* Base journey map (dimmed) */}
      <path d={MINI_PATH} stroke={`${TEAL}0.22)`} strokeWidth={1.5} strokeLinecap="round" fill="none" strokeDasharray="3 3" />
      {/* 5Es overlay boxes */}
      {phases.map((p, i) => (
        <g key={p}>
          <rect x={i * 64 + 1} y={4} width={62} height={MINI_HDR_H} rx={3}
            fill={`${INDIGO}0.18)`} stroke={`${INDIGO}0.55)`} strokeWidth={1.5} />
          <text x={MINI_SCX[i]} y={18} textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${INDIGO_TEXT}0.979)`} style={{ userSelect: 'none' }}
          >{p}</text>
        </g>
      ))}
      <line x1={0} y1={34} x2={MINI_W} y2={34} stroke={`${INDIGO}0.20)`} strokeWidth={1} />
      {/* Evaluation grid hint */}
      {[1, 2, 3, 4].map((i) => (
        <line key={i} x1={i * 64} y1={34} x2={i * 64} y2={115}
          stroke={`${INDIGO}0.12)`} strokeWidth={1}
        />
      ))}
      <text x={MINI_W / 2} y={126} textAnchor="middle" fontSize="4" fontFamily="var(--font-mono)"
        fill={`${INDIGO_TEXT}0.874)`} style={{ userSelect: 'none' }}
      >FIXED PHASES, CONSISTENT EVALUATION LENS</text>
    </svg>
  )
}

function BlueprintSVG() {
  return (
    <svg viewBox={`0 0 ${MINI_W} 200`} width="100%" aria-hidden="true">
      <rect x={0} y={0} width={MINI_W} height={200} rx={6} fill={`${TEAL}0.04)`} />
      {/* Stage headers */}
      {MINI_SCX.map((cx, i) => (
        <rect key={i} x={i * 64 + 1} y={4} width={62} height={MINI_HDR_H} rx={3}
          fill={`${TEAL}0.10)`} stroke={`${TEAL}0.35)`} strokeWidth={1} />
      ))}
      <line x1={0} y1={34} x2={MINI_W} y2={34} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* Experiencer lanes (above) */}
      <text x={3} y={50} textAnchor="start" dominantBaseline="middle"
        fontSize="4" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
      >ACTIONS</text>
      <text x={3} y={68} textAnchor="start" dominantBaseline="middle"
        fontSize="4" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
      >THOUGHTS</text>
      {/* Emotion line */}
      <path d={MINI_PATH} stroke={`${TEAL}0.75)`} strokeWidth={1.5} strokeLinecap="round" fill="none" />
      {/* LINE OF VISIBILITY */}
      <line x1={0} y1={115} x2={MINI_W} y2={115} stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={MINI_W - 4} y={112} textAnchor="end" fontSize="4" fontFamily="var(--font-mono)"
        fill="rgba(255,255,255,0.725)" style={{ userSelect: 'none' }}
      >LINE OF VISIBILITY</text>
      {/* Backstage lanes (below) */}
      {[
        { label: 'FRONTSTAGE STAFF',   y: 130 },
        { label: 'BACKSTAGE ACTIONS',  y: 155 },
        { label: 'SUPPORT PROCESSES',  y: 180 },
      ].map(({ label, y }) => (
        <g key={label}>
          <line x1={0} y1={y - 8} x2={MINI_W} y2={y - 8} stroke={`${SLATE}0.15)`} strokeWidth={1} />
          <text x={3} y={y} textAnchor="start" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" fill={`${SLATE_TEXT}0.905)`} style={{ userSelect: 'none' }}
          >{label}</text>
        </g>
      ))}
      <text x={MINI_W / 2} y={196} textAnchor="middle" fontSize="4" fontFamily="var(--font-mono)"
        fill={`${SLATE_TEXT}0.885)`} style={{ userSelect: 'none' }}
      >BACKSTAGE ADDED, OPERATIONAL MACHINERY</text>
    </svg>
  )
}

export default function JMBoundarySection() {
  const [active, setActive] = useState<Reveal>('journey')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
      {/* ── Left: selector cards ── */}
      <div className="w-full md:w-56 shrink-0 flex flex-col gap-3">
        {ITEMS.map(({ id, label, summary }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="text-left rounded-xl p-4 transition-colors"
            style={{
              background: active === id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              border:     `1px solid ${active === id ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'}`,
            }}
            aria-pressed={active === id}
          >
            <p className="font-semibold mb-1.5"
              style={{ fontSize: 'var(--text-sm)', color: active === id ? '#FAFAFA' : 'rgba(255,255,255,0.42)' }}
            >{label}</p>
            <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.30)' }}>
              {summary}
            </p>
          </button>
        ))}
      </div>

      {/* ── Right: visual + detail ── */}
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
              {active === 'journey'   && <JourneyMiniSVG />}
              {active === '5es'       && <FiveEsSVG />}
              {active === 'blueprint' && <BlueprintSVG />}
            </div>

            {/* Detail */}
            <h3 className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-xl)', color: '#FAFAFA' }}
            >{DETAIL[active].heading}</h3>
            <p className="mb-5"
              style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.62)' }}
            >{DETAIL[active].description}</p>

            <div className="rounded-lg p-4"
              style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.18)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.68)` }}
              >When to reach for this instead</p>
              <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.62)' }}>
                {DETAIL[active].distinction}
              </p>
            </div>

            {/* Cross-link */}
            {DETAIL[active].link && (
              <div className="mt-4">
                <Link
                  href={DETAIL[active].link!}
                  className="inline-flex items-center gap-1.5 font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}
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
