'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PURPLE = 'rgba(124,58,237,'
const PURPLE_TEXT = 'rgba(173,132,244,'  // brightened text-safe variant of PURPLE

type NodeKey = 'build' | 'measure' | 'learn' | 'pivot'

const MVP_TYPES = [
  { label: 'Video MVP', example: 'Dropbox: a 3-min demo video grew the waitlist from 5,000 to 75,000 overnight.' },
  { label: 'Landing Page', example: 'Buffer: a landing page with pricing described a product that did not exist. Sign-ups validated willingness to pay before a line of code was written.' },
  { label: 'Concierge MVP', example: 'Food on the Table: a founder personally shopped for one family, then expanded only after validating the model manually.' },
  { label: 'Wizard of Oz', example: 'Zappos: Nick Swinmurn photographed shoes in local stores and manually fulfilled orders to test whether people would buy shoes online.' },
  { label: 'Piecemeal MVP', example: 'Groupon: used WordPress, Apple Mail, and a PDF coupon generator to deliver deals before building any custom software.' },
  { label: 'Single-Feature MVP', example: 'Instagram: launched with photo sharing only, cutting the location check-ins and gaming elements of the original Burbn app.' },
]

const PIVOT_TYPES = [
  { name: 'Zoom-in', def: 'A single feature becomes the whole product. Instagram pivoting from Burbn to photo-only.' },
  { name: 'Zoom-out', def: 'The whole product becomes one feature of something larger. A widget becomes part of a platform.' },
  { name: 'Customer Segment', def: 'The product stays similar but the target customer changes. Same solution, different buyer.' },
  { name: 'Customer Need', def: 'The problem being solved changes because research revealed a more important one. Tempo\'s Loop 2 pivot.' },
  { name: 'Platform', def: 'A product becomes a platform, or a platform becomes a product. The relationship between the offering and the customer changes.' },
  { name: 'Business Model', def: 'The revenue model changes while the product stays similar. Freemium to enterprise, subscription to transactional.' },
  { name: 'Channel', def: 'The route to the customer changes. Direct-to-consumer to marketplace, or vice versa.' },
  { name: 'Technology', def: 'The same solution is rebuilt on a different technology, often to improve speed, cost, or scalability.' },
]

const PHASE_DETAIL: Record<'build' | 'measure' | 'learn', {
  headline: string
  description: string
  prompt: string
  example: { co: string; text: string }
}> = {
  build: {
    headline: 'Build: Minimize the test, maximize the learning',
    description:
      'Before building anything, write a falsifiable hypothesis. The MVP is the minimum artifact that tests that hypothesis: not a smaller version of the product. The form follows from the question: what is the cheapest and fastest way to answer whether this specific assumption is true?',
    prompt: 'What is the one assumption your first experiment must test? What is the cheapest, fastest way to test it: not by building the product, but by creating evidence about whether the assumption is true?',
    example: {
      co: 'Zappos',
      text: 'Nick Swinmurn\'s first MVP tested one assumption: will people buy shoes online without trying them on? He photographed shoes in local stores, posted them on a simple site, and manually fulfilled orders. He lost money on every sale, but he validated the riskiest assumption in days, not months.',
    },
  },
  measure: {
    headline: 'Measure: Actionable, not vanity',
    description:
      'Define the success metric and the threshold before the experiment runs. Use cohort analysis (groups of users who experienced the product at the same time) rather than aggregate totals. Aggregates hide the signal. Cohort retention surfaces it.',
    prompt: 'For your current experiment, what is the one number that will tell you definitively whether your hypothesis was true or false? Set it before running the experiment, not after.',
    example: {
      co: 'Groove',
      text: 'Groove\'s dashboard showed healthy user numbers and feature engagement. But when they switched to cohort-based retention analysis, they found 95% of users churned within ninety days. Every metric they had been celebrating measured acquisition and early engagement: not the retention that actually determined viability.',
    },
  },
  learn: {
    headline: 'Learn: Genuine, not false',
    description:
      'Learning is genuine only when it changes what the team does next. If the evidence is reviewed and the team proceeds exactly as planned, the learning was post-hoc rationalization. Pre-commit the pivot-or-persevere criteria before the experiment starts: this is what prevents rationalization from killing the loop.',
    prompt: 'Look at your most recent experiment. What did the evidence actually show, separate from what you hoped it would show? What would you do differently if you fully trusted what the evidence told you?',
    example: {
      co: 'Instagram',
      text: 'Instagram began as Burbn, a location-based check-in app. Founders Kevin Systrom and Mike Krieger measured carefully and learned that users were ignoring check-ins while using photo sharing obsessively. The data pointed to a zoom-in pivot: cut everything except photos. That honest analysis produced one of the most successful consumer products in history.',
    },
  },
}

function NodeButton({
  label,
  active,
  onClick,
  cx,
  cy,
}: {
  label: string
  active: boolean
  onClick: () => void
  cx: number
  cy: number
}) {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }} role="button" aria-pressed={active}>
      <circle
        cx={cx}
        cy={cy}
        r={32}
        fill={active ? `${PURPLE}1)` : `${PURPLE}0.10)`}
        stroke={active ? `${PURPLE}1)` : `${PURPLE}0.30)`}
        strokeWidth={1.5}
        style={{ transition: 'fill 0.2s, stroke 0.2s' }}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={active ? '#fff' : `${PURPLE_TEXT}0.972)`}
        fontSize="9"
        fontWeight="600"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.08em"
        style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
      >
        {label}
      </text>
    </g>
  )
}

export default function LSInteractiveSection() {
  const [activeNode, setActiveNode] = useState<NodeKey>('build')
  const [activeMvp, setActiveMvp] = useState(0)
  const prefersReduced = useReducedMotion()

  const cx = 180
  const cy = 160
  const r = 95

  const nodes = [
    { id: 'build' as const, label: 'Build', angle: -90 },
    { id: 'measure' as const, label: 'Measure', angle: 30 },
    { id: 'learn' as const, label: 'Learn', angle: 150 },
  ]

  function polarToXY(angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  const nodePositions = nodes.map((n) => ({ ...n, ...polarToXY(n.angle) }))

  const isPivotActive = activeNode === 'pivot'
  const phaseActive = activeNode !== 'pivot' ? PHASE_DETAIL[activeNode] : null

  return (
    <div className="grid md:grid-cols-[340px_1fr] gap-space-8 items-start">
      {/* Left: SVG loop diagram */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 360 340" width="100%" style={{ maxWidth: 340 }} aria-label="Build-Measure-Learn loop diagram">
          {/* Glow ring */}
          <circle cx={cx} cy={cy} r={r + 24} fill="none" stroke={`${PURPLE}0.06)`} strokeWidth={24} />
          {/* Dashed ring */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={`${PURPLE}0.20)`}
            strokeWidth={2}
            strokeDasharray="5 4"
          />

          {/* Node circles */}
          {nodePositions.map((node) => (
            <NodeButton
              key={node.id}
              label={node.label}
              active={activeNode === node.id}
              onClick={() => setActiveNode(node.id)}
              cx={node.x}
              cy={node.y}
            />
          ))}

          {/* Center label */}
          <text x={cx} y={cy - 8} textAnchor="middle" fill={`${PURPLE_TEXT}0.867)`} fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>Click a phase</text>
          <text x={cx} y={cy + 6} textAnchor="middle" fill={`${PURPLE_TEXT}0.848)`} fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>to explore</text>

          {/* Pivot fork */}
          {(() => {
            const forkY = cy + r + 40
            const leftX = cx - 44
            const rightX = cx + 44
            return (
              <g>
                <line x1={cx} y1={cy + r + 2} x2={cx} y2={forkY - 10} stroke={`${PURPLE}0.15)`} strokeWidth={1.5} strokeDasharray="3 3" />
                <line x1={cx} y1={forkY - 10} x2={leftX} y2={forkY} stroke={`${PURPLE}0.15)`} strokeWidth={1.5} />
                <line x1={cx} y1={forkY - 10} x2={rightX} y2={forkY} stroke={`${PURPLE}0.15)`} strokeWidth={1.5} />

                {/* Pivot button */}
                <g onClick={() => setActiveNode('pivot')} style={{ cursor: 'pointer' }} role="button" aria-pressed={isPivotActive}>
                  <rect x={leftX - 20} y={forkY} width={48} height={22} rx={4}
                    fill={isPivotActive ? `${PURPLE}1)` : `${PURPLE}0.08)`}
                    stroke={isPivotActive ? `${PURPLE}1)` : `${PURPLE}0.20)`}
                    strokeWidth={1}
                    style={{ transition: 'fill 0.2s' }}
                  />
                  <text x={leftX + 4} y={forkY + 12} textAnchor="middle" fill={isPivotActive ? '#fff' : `${PURPLE_TEXT}0.943)`} fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="0.08em" style={{ textTransform: 'uppercase', pointerEvents: 'none' }}>
                    Pivot ↓
                  </text>
                </g>

                {/* Persevere label */}
                <text x={rightX} y={forkY + 14} textAnchor="middle" fill={`${PURPLE_TEXT}0.867)`} fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>
                  Persevere
                </text>
              </g>
            )
          })()}
        </svg>

        {/* MVP Type Switcher (always visible below diagram) */}
        <div className="w-full mt-space-4">
          <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-3 text-center">
            MVP types: click to explore
          </p>
          <div className="flex flex-wrap gap-space-2 justify-center">
            {MVP_TYPES.map((mvp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveMvp(i)}
                className="px-space-3 py-space-1 rounded-full text-xs transition-colors duration-200"
                style={{
                  background: activeMvp === i ? `${PURPLE}1)` : `${PURPLE}0.07)`,
                  color: activeMvp === i ? '#fff' : `${PURPLE}0.75)`,
                  fontWeight: activeMvp === i ? 600 : 400,
                }}
              >
                {mvp.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMvp}
              initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-space-3 rounded-lg p-space-4"
              style={{ background: `${PURPLE}0.04)`, border: `1px solid ${PURPLE}0.10)` }}
            >
              <p className="font-semibold text-xs text-neutral-900 mb-space-1">{MVP_TYPES[activeMvp].label}</p>
              <p className="text-xs text-neutral-600 leading-relaxed">{MVP_TYPES[activeMvp].example}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: detail panel */}
      <div>
        <AnimatePresence mode="wait">
          {!isPivotActive && phaseActive ? (
            <motion.div
              key={activeNode}
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3
                className="font-semibold mb-space-4"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: '#FAFAFA', lineHeight: 1.2 }}
              >
                {phaseActive.headline}
              </h3>
              <p className="text-sm leading-relaxed mb-space-5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                {phaseActive.description}
              </p>

              {/* Company example */}
              <div
                className="rounded-xl p-space-5 mb-space-5"
                style={{ background: `${PURPLE}0.12)`, border: `1px solid ${PURPLE}0.20)` }}
              >
                <p
                  className="font-mono text-2xs uppercase tracking-widest mb-space-3"
                  style={{ color: `${PURPLE}0.65)` }}
                >
                  {phaseActive.example.co}
                </p>
                <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {phaseActive.example.text}
                </p>
              </div>

              {/* Interactive prompt */}
              <div
                className="rounded-lg px-space-5 py-space-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Your prompt
                </p>
                <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {phaseActive.prompt}
                </p>
              </div>
            </motion.div>
          ) : isPivotActive ? (
            <motion.div
              key="pivot"
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3
                className="font-semibold mb-space-2"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: '#FAFAFA', lineHeight: 1.2 }}
              >
                The eight types of pivot
              </h3>
              <p className="text-sm mb-space-5" style={{ color: 'rgba(255,255,255,0.50)' }}>
                Naming the pivot type matters: it forces honesty about what exactly is changing and why. A vague &ldquo;let&rsquo;s try something different&rdquo; is not a pivot.
              </p>
              <div className="space-y-space-2">
                {PIVOT_TYPES.map((pt, i) => (
                  <div
                    key={i}
                    className="rounded-lg px-space-4 py-space-3 flex gap-space-4"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <span
                      className="font-mono text-xs font-semibold shrink-0 mt-0.5"
                      style={{ color: `${PURPLE}0.65)` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-semibold text-sm mb-space-1" style={{ color: '#FAFAFA' }}>
                        {pt.name}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
                        {pt.def}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
