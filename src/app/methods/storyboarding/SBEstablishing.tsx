'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const CLAY  = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700
const SVG_H = 228

// Five frames left to right. Frame 3 (index 3) is THE GAP.
const FRAME_W = 116
const FRAME_H = 118
const FRAME_Y = 14

const FRAME_X = [
  (SVG_W - 5 * FRAME_W - 4 * 14) / 2,
].concat([]).reduce<number[]>((acc, x) => {
  for (let i = 0; i < 5; i++) acc.push(Math.round(x + i * (FRAME_W + 14)))
  return acc
}, [])

const FRAME_LABELS = [
  '1: BEFORE',
  '2: OPENS APP',
  '3: SEES SUGGESTION',
  '?: THE GAP',
  '5: OUTCOME',
]

// ── Rough sketch content per frame ─────────────────────────────────────────
// Coordinates relative to each frame's top-left corner

function SketchFrame0({ x, y }: { x: number; y: number }) {
  // Person (left) + fridge outline (right): no product
  const px = x + 28, py = y + 26  // person center
  const fx = x + 68, fy = y + 18  // fridge top-left
  return (
    <g fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.0" strokeLinecap="round">
      <circle cx={px} cy={py} r={7} />
      <line x1={px} y1={py + 7} x2={px} y2={py + 36} />
      <line x1={px - 10} y1={py + 18} x2={px + 10} y2={py + 18} />
      <line x1={px} y1={py + 36} x2={px - 9} y2={py + 54} />
      <line x1={px} y1={py + 36} x2={px + 9} y2={py + 54} />
      {/* Fridge */}
      <rect x={fx} y={fy} width={30} height={44} rx={1} />
      <line x1={fx} y1={fy + 20} x2={fx + 30} y2={fy + 20} />
      <line x1={fx + 5} y1={fy + 8} x2={fx + 24} y2={fy + 8} />
      <line x1={fx + 5} y1={fy + 30} x2={fx + 24} y2={fy + 30} />
      <line x1={fx + 5} y1={fy + 38} x2={fx + 18} y2={fy + 38} />
    </g>
  )
}

function SketchFrame1({ x, y }: { x: number; y: number }) {
  // Person looking at phone
  const px = x + 36, py = y + 26
  const phX = x + 66, phY = y + 38
  return (
    <g fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.0" strokeLinecap="round">
      <circle cx={px} cy={py} r={7} />
      <line x1={px} y1={py + 7} x2={px} y2={py + 38} />
      <line x1={px} y1={py + 38} x2={px - 9} y2={py + 56} />
      <line x1={px} y1={py + 38} x2={px + 9} y2={py + 56} />
      {/* Arm reaching to phone */}
      <line x1={px} y1={py + 18} x2={phX} y2={py + 22} />
      {/* Phone */}
      <rect x={phX} y={phY} width={22} height={34} rx={2} />
      <line x1={phX + 3} y1={phY + 3} x2={phX + 19} y2={phY + 3} />
    </g>
  )
}

function SketchFrame2({ x, y }: { x: number; y: number }) {
  // Person + phone with content lines (suggestion visible)
  const px = x + 32, py = y + 26
  const phX = x + 64, phY = y + 30
  return (
    <g fill="none" strokeLinecap="round">
      <g stroke="rgba(255,255,255,0.38)" strokeWidth="1.0">
        <circle cx={px} cy={py} r={7} />
        <line x1={px} y1={py + 7} x2={px} y2={py + 38} />
        <line x1={px} y1={py + 38} x2={px - 9} y2={py + 56} />
        <line x1={px} y1={py + 38} x2={px + 9} y2={py + 56} />
        <line x1={px} y1={py + 18} x2={phX} y2={py + 22} />
        {/* Phone */}
        <rect x={phX} y={phY} width={24} height={38} rx={2} />
        <line x1={phX + 3} y1={phY + 3} x2={phX + 21} y2={phY + 3} />
      </g>
      {/* Content lines on phone: the suggestion */}
      <g stroke={`${CLAY}0.55)`} strokeWidth="1.1">
        <line x1={phX + 3} y1={phY + 12} x2={phX + 21} y2={phY + 12} />
        <line x1={phX + 3} y1={phY + 18} x2={phX + 17} y2={phY + 18} />
        <line x1={phX + 3} y1={phY + 24} x2={phX + 19} y2={phY + 24} />
      </g>
    </g>
  )
}

function SketchFrame4({ x, y }: { x: number; y: number }) {
  // Outcome: person + checkmark / positive indicator
  const px = x + 36, py = y + 28
  return (
    <g fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1.0" strokeLinecap="round">
      <circle cx={px} cy={py} r={7} />
      <line x1={px} y1={py + 7} x2={px} y2={py + 36} />
      <line x1={px - 10} y1={py + 18} x2={px + 10} y2={py + 18} />
      <line x1={px} y1={py + 36} x2={px - 9} y2={py + 54} />
      <line x1={px} y1={py + 36} x2={px + 9} y2={py + 54} />
      {/* Check to the right */}
      <polyline points={`${px + 18},${py + 28} ${px + 24},${py + 36} ${px + 38},${py + 16}`}
        stroke={`${CLAY}0.40)`} strokeWidth="1.4" />
    </g>
  )
}

export default function SBEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  function d(base: number) { return prefersReduced ? 0 : base }

  function fade(delay: number) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: visible ? 1 : 0 },
      transition: { duration: 0.32, delay: d(delay) },
    }
  }

  const LABEL_Y = FRAME_Y + FRAME_H + 12

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Five-panel storyboard sequence. Frame 1: A parent in front of an open fridge with no product present, the real situation before the concept appears. Frame 2: The parent opens the app on their phone. Frame 3: They see a suggestion on the screen. Frame 4: THE GAP, an empty fractured panel, the frame nobody could draw. The sequence halts here because nobody can say what the person sees, or why the app knows what is in their fridge. Frame 5: A positive outcome, but it cannot be reached without crossing the gap. The gap is the finding."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="sb-est-clay-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${CLAY}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sb-est-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.60)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.97)" rx={6} />

        {/* ── FRAMES 0-2 (the story builds) ── */}
        {[0, 1, 2].map(i => {
          const fx = FRAME_X[i]
          return (
            <motion.g key={i} {...fade(0.06 + i * 0.28)}>
              <rect x={fx} y={FRAME_Y} width={FRAME_W} height={FRAME_H} rx={3}
                fill={`${CLAY}0.06)`} stroke={`${CLAY}0.35)`} strokeWidth={0.9} />
              {i === 0 && <SketchFrame0 x={fx} y={FRAME_Y} />}
              {i === 1 && <SketchFrame1 x={fx} y={FRAME_Y} />}
              {i === 2 && <SketchFrame2 x={fx} y={FRAME_Y} />}
              <text x={fx + FRAME_W / 2} y={LABEL_Y}
                textAnchor="middle" fontSize="4.8"
                fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={`${CLAY_TEXT}0.912)`} style={{ userSelect: 'none' }}>
                {FRAME_LABELS[i]}
              </text>
            </motion.g>
          )
        })}

        {/* FRAME 3: THE GAP (sequence halts here) */}
        <motion.g {...fade(0.90)}>
          {/* Glow halo */}
          <rect x={FRAME_X[3] - 2} y={FRAME_Y - 2} width={FRAME_W + 4} height={FRAME_H + 4} rx={4}
            fill="none" stroke={`${AMBER}0.18)`} strokeWidth={5}
            style={{ filter: 'url(#sb-est-amber-glow)' }} />
          {/* Frame border: dashed, amber */}
          <rect x={FRAME_X[3]} y={FRAME_Y} width={FRAME_W} height={FRAME_H} rx={3}
            fill={`${AMBER}0.04)`} stroke={`${AMBER}0.62)`} strokeWidth={1.4}
            strokeDasharray="6 4" />
          {/* Fracture lines: visual "broken panel" */}
          <line x1={FRAME_X[3] + 30} y1={FRAME_Y} x2={FRAME_X[3] + 45} y2={FRAME_Y + 40}
            stroke={`${AMBER}0.20)`} strokeWidth={0.6} />
          <line x1={FRAME_X[3] + 45} y1={FRAME_Y + 40} x2={FRAME_X[3] + 20} y2={FRAME_Y + FRAME_H}
            stroke={`${AMBER}0.20)`} strokeWidth={0.6} />
          {/* Large "?" */}
          <text x={FRAME_X[3] + FRAME_W / 2} y={FRAME_Y + 58}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="36" fontFamily="var(--font-mono)" fontWeight="600"
            fill={`${AMBER_TEXT}0.891)`} style={{ userSelect: 'none' }}
            filter="url(#sb-est-amber-glow)">
            ?
          </text>
          {/* "THE FRAME NOBODY COULD DRAW" */}
          <text x={FRAME_X[3] + FRAME_W / 2} y={FRAME_Y + 88}
            textAnchor="middle" fontSize="3.8"
            fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER_TEXT}0.861)`} style={{ userSelect: 'none' }}>
            THE FRAME
          </text>
          <text x={FRAME_X[3] + FRAME_W / 2} y={FRAME_Y + 97}
            textAnchor="middle" fontSize="3.8"
            fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER_TEXT}0.861)`} style={{ userSelect: 'none' }}>
            NOBODY COULD DRAW
          </text>
          {/* Label below */}
          <text x={FRAME_X[3] + FRAME_W / 2} y={LABEL_Y}
            textAnchor="middle" fontSize="4.8"
            fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
            fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
            {FRAME_LABELS[3]}
          </text>
        </motion.g>

        {/* FRAME 4: OUTCOME (dimmed, unreachable across the gap) */}
        <motion.g {...fade(1.22)} style={{ opacity: 0.38 }}>
          <rect x={FRAME_X[4]} y={FRAME_Y} width={FRAME_W} height={FRAME_H} rx={3}
            fill={`${CLAY}0.04)`} stroke={`${CLAY}0.22)`} strokeWidth={0.7} />
          <SketchFrame4 x={FRAME_X[4]} y={FRAME_Y} />
          <text x={FRAME_X[4] + FRAME_W / 2} y={LABEL_Y}
            textAnchor="middle" fontSize="4.8"
            fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`${CLAY_TEXT}0.874)`} style={{ userSelect: 'none' }}>
            {FRAME_LABELS[4]}
          </text>
        </motion.g>

        {/* ── Caption ── */}
        <motion.text x={SVG_W / 2} y={SVG_H - 7}
          textAnchor="middle" fontSize="3.8"
          fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}
          {...fade(1.40)}>
          The story cannot get from frame three to frame five. The gap is the finding.
        </motion.text>
      </svg>
    </div>
  )
}
