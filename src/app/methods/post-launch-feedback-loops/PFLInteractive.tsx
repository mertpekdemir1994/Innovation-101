'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const AMBER  = 'rgba(245,158,11,'

const SVG_W = 700, SVG_H = 268
const S_W = 88, S_H = 28, CY = 113

type StageId = 'signal' | 'sense' | 'decide' | 'ship'
type ActiveId = StageId | 'b1' | 'b2' | 'b3' | 'b4' | null

const STAGES: { id: StageId; label: string; x: number; y: number }[] = [
  { id: 'signal', label: 'SIGNAL', x: 18,  y: 99 },
  { id: 'sense',  label: 'SENSE',  x: 172, y: 99 },
  { id: 'decide', label: 'DECIDE', x: 326, y: 99 },
  { id: 'ship',   label: 'SHIP',   x: 480, y: 99 },
]

// Connectors: index matches connector between stages[i] and stages[i+1]
const CONNECTORS = [
  { x1: 106, x2: 172, cx: 139 }, // C0: SIGNAL→SENSE
  { x1: 260, x2: 326, cx: 293 }, // C1: SENSE→DECIDE
  { x1: 414, x2: 480, cx: 447 }, // C2: DECIDE→SHIP
]

const LOOP_PATH = `M 18,${CY} L 568,${CY} L 608,${CY} C 638,${CY} 644,145 644,170 L 644,196 L 56,196 C 35,196 18,180 18,158 Z`

interface StageInfo { type: 'stage'; tag: string; headline: string; body: string }
interface BreakInfo { type: 'break'; tag: string; headline: string; body: string; severs: number }
type ZoneInfo = StageInfo | BreakInfo

const ZONE_INFO: Record<Exclude<ActiveId, null>, ZoneInfo> = {
  signal: {
    type: 'stage',
    tag: 'STAGE 1 — SIGNAL',
    headline: 'What the live product and its users are telling you.',
    body: 'Behavioral data (what people do, where they abandon), direct feedback (support tickets, reviews, in-product feedback), and deliberate experiments on live traffic (A/B tests, which belong here, on a real product with real traffic, not before you have built anything). Signal is abundant; abundance is not the problem. The discipline is choosing what to attend to.',
  },
  sense: {
    type: 'stage',
    tag: 'STAGE 2 — SENSE',
    headline: 'Making meaning of the signal.',
    body: 'Aggregating, finding patterns, separating noise from the real thing, and — hardest of all — noticing the specific complaint that reveals a genuine defect rather than averaging it away. Someone must own this step, on a rhythm, and be responsible for surfacing the particular and surprising rather than only the average. This is the stage AI is most transformative at, and the stage volume most often breaks.',
  },
  decide: {
    type: 'stage',
    tag: 'STAGE 3 — DECIDE',
    headline: 'Choosing what actually matters and what to do about it.',
    body: 'A judgment with consequences: which problems to fix, what to trade off, what to leave alone. Signal does not decide; people do. This requires a real decision forum with real authority to change the roadmap — and the discipline to produce an explicit outcome (fix, defer, or accept) rather than an agreement-in-the-room that dissolves by Monday. Without this, sense-making produces decks and nothing else.',
  },
  ship: {
    type: 'stage',
    tag: 'STAGE 4 — SHIP',
    headline: 'Actually changing the product.',
    body: 'A decision that does not result in a shipped change has closed nothing. This is where most loops quietly die — in a backlog full of agreed-but-unbuilt improvements. Ensuring that decisions land in the actual product is a mundane-sounding discipline that is, in practice, the most common failure after decision. If your loop dies here, more research will not fix it.',
  },
  b1: {
    type: 'break',
    tag: 'BREAK POINT — SIGNAL BUT NO SENSE',
    headline: 'The data lake nobody reads. Listening theater.',
    body: 'The organisation gathers signal nobody senses. Dashboards proliferate, tickets accumulate, and no one aggregates them into meaning. The organisation is listening and hearing nothing. This is the most common break — not from lack of caring but from lack of ownership. Nobody was made responsible for the sense-making step on a rhythm, so it happens in irregular bursts, partially, or not at all. Adding more instruments makes this worse, not better.',
    severs: 0,
  },
  b2: {
    type: 'break',
    tag: 'BREAK POINT — SENSE BUT NO DECISION',
    headline: 'The insight deck that changes nothing.',
    body: 'Beautiful research, well-received, filed. Everyone agrees, nothing happens. The sense-making step worked — the researcher produced real findings — but there was no decision forum with the authority to turn insight into a roadmap change. This is the most demoralizing break, because the organization can see the problem clearly and change nothing about it. Insight must meet a decision forum with authority, or it is entertainment.',
    severs: 1,
  },
  b3: {
    type: 'break',
    tag: 'BREAK POINT — DECIDE BUT NO SHIP',
    headline: 'The roadmap item that never lands. Agreed and unbuilt.',
    body: 'The decision was made, the priority agreed, the finding acknowledged — and the change was never built. The loop dies in a backlog. This is a roadmap and capacity problem, not a research problem. More or better sense-making will not fix it. The correct intervention is at the DECIDE-to-SHIP junction: ensuring that decisions have owners, timelines, and the operational capacity to land.',
    severs: 2,
  },
  b4: {
    type: 'break',
    tag: 'BREAK POINT — SHIP BUT NOT MEASURED',
    headline: 'The change nobody checked. Acting without learning.',
    body: 'The change shipped and nobody returned to signal to measure whether it worked. The team acted, and did not learn. Next time they will guess again — and will guess based on assumptions that have not been tested. Without this return, the loop is an arc, not a circle. This is the step teams skip most often, and skipping it means the organisation can never learn whether its decisions are any good, only that it made them.',
    severs: 3,
  },
}

const STAGE_BUTTONS: { id: ActiveId; label: string }[] = [
  { id: 'signal', label: 'SIGNAL' },
  { id: 'sense',  label: 'SENSE'  },
  { id: 'decide', label: 'DECIDE' },
  { id: 'ship',   label: 'SHIP'   },
]

const BREAK_BUTTONS: { id: ActiveId; label: string }[] = [
  { id: 'b1', label: 'DATA LAKE'    },
  { id: 'b2', label: 'INSIGHT DECK' },
  { id: 'b3', label: 'ROADMAP ITEM' },
  { id: 'b4', label: 'NEVER CHECKED'},
]

export default function PFLInteractive() {
  const [active, setActive] = useState<ActiveId>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const isBreak = active !== null && active.startsWith('b')
  const info: ZoneInfo | null = active ? ZONE_INFO[active] : null

  const stageOp = (id: string): number => {
    if (active === null) return 1
    if (active === id) return 1
    if (isBreak) return 0.22
    return 0.22
  }

  const connOp = (idx: number): number => {
    if (active === null) return 1
    if (isBreak) {
      const br = ZONE_INFO[active] as BreakInfo
      if (br.severs === idx) return 0.04
      return 0.28
    }
    return 0.28
  }

  const retOp = (): number => {
    if (active === null) return 1
    if (active === 'b4') return 0.04
    return 0.28
  }

  const brMarkerAmbient = (id: string): number => {
    if (active === null) return 1
    if (active === id) return 1
    return 0.28
  }

  const toggle = (id: ActiveId) => setActive(active === id ? null : id)

  return (
    <div className="w-full">
      {/* Screen-reader live region for break state */}
      <div role="status" aria-live="polite" className="sr-only">
        {isBreak && info ? `Loop broken: ${info.headline}` : ''}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Interactive feedback loop. Click a stage to explore it. Click a break point to sever the loop at that junction and see what a broken loop produces."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block', cursor: 'default' }}
      >
        <defs>
          <filter id="pfl-int-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pfl-int-amber-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${AMBER}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="pfl-int-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${BRICK}0.58)`} />
          </marker>
        </defs>

        {/* Background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Loop circuit path (background track) */}
        <path
          d={LOOP_PATH}
          fill="none"
          stroke={`${BRICK}${active ? '0.12)' : '0.22)'}`}
          strokeWidth={1.2}
        />

        {/* Stage boxes */}
        {STAGES.map((s) => (
          <motion.g key={s.id}
            animate={{ opacity: stageOp(s.id) }}
            transition={{ duration: 0.22 }}>
            <rect x={s.x} y={s.y} width={S_W} height={S_H}
              fill={active === s.id ? `${BRICK}0.18)` : `${BRICK}0.10)`}
              stroke={active === s.id ? `${BRICK}0.85)` : `${BRICK}0.60)`}
              strokeWidth={active === s.id ? 2 : 1.5} rx={3}
              filter={active === s.id ? 'url(#pfl-int-glow)' : undefined} />
            <text x={s.x + S_W / 2} y={CY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.11em" fontWeight="600"
              fill={`${BRICK}0.92)`} style={{ userSelect: 'none' }}>
              {s.label}
            </text>
          </motion.g>
        ))}

        {/* Stage hit areas */}
        {STAGES.map((s) => (
          <rect key={`hit-${s.id}`}
            x={s.x} y={s.y} width={S_W} height={S_H}
            fill="transparent" rx={3}
            style={{ cursor: 'pointer' }}
            onClick={() => toggle(s.id)}
            role="button" aria-pressed={active === s.id}
            aria-label={`Explore the ${s.label} stage`} />
        ))}

        {/* Connectors (top flow) */}
        {CONNECTORS.map(({ x1, x2 }, i) => (
          <motion.line key={i}
            x1={x1} y1={CY} x2={x2} y2={CY}
            stroke={`${BRICK}0.45)`} strokeWidth={1.2}
            strokeDasharray={active === `b${i + 1}` ? '4 4' : '0'}
            markerEnd="url(#pfl-int-arr)"
            animate={{ opacity: connOp(i) }}
            transition={{ duration: 0.22 }} />
        ))}

        {/* Return path arrow */}
        <motion.line
          x1={480} y1={196} x2={100} y2={196}
          stroke={`${BRICK}0.42)`} strokeWidth={1.0}
          strokeDasharray={active === 'b4' ? '4 4' : '0'}
          markerEnd="url(#pfl-int-arr)"
          animate={{ opacity: retOp() }}
          transition={{ duration: 0.22 }} />

        {/* Return path label */}
        <motion.text x={300} y={187}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.07em"
          fill={`${BRICK}0.35)`} style={{ userSelect: 'none' }}
          animate={{ opacity: active === 'b4' ? 0.08 : (active ? 0.18 : 0.80) }}
          transition={{ duration: 0.22 }}>
          ← BACK TO SIGNAL · MEASURES WHETHER THE CHANGE WORKED
        </motion.text>

        {/* Break point markers */}
        {/* B1: SIGNAL→SENSE at (139, 113) */}
        <motion.g animate={{ opacity: brMarkerAmbient('b1') }} transition={{ duration: 0.22 }}>
          <motion.circle cx={139} cy={CY} r={active === 'b1' ? 7 : 5}
            fill={active === 'b1' ? `${AMBER}0.20)` : `${AMBER}0.10)`}
            stroke={`${AMBER}${active === 'b1' ? '0.90)' : '0.65)'}`}
            strokeWidth={active === 'b1' ? 1.8 : 1.2}
            filter={active === 'b1' ? 'url(#pfl-int-amber-glow)' : undefined}
            animate={{ r: active === 'b1' ? 7 : 5 }}
            transition={{ duration: 0.22 }} />
          {active === 'b1' && (
            <text x={139} y={90}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
              LOOP BREAKS HERE
            </text>
          )}
        </motion.g>
        <rect x={122} y={104} width={34} height={18} fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => toggle('b1')}
          role="button" aria-pressed={active === 'b1'}
          aria-label="Break point: signal but no sense — the data lake nobody reads" />

        {/* B2: SENSE→DECIDE at (293, 113) */}
        <motion.g animate={{ opacity: brMarkerAmbient('b2') }} transition={{ duration: 0.22 }}>
          <motion.circle cx={293} cy={CY} r={active === 'b2' ? 7 : 5}
            fill={active === 'b2' ? `${AMBER}0.20)` : `${AMBER}0.10)`}
            stroke={`${AMBER}${active === 'b2' ? '0.90)' : '0.65)'}`}
            strokeWidth={active === 'b2' ? 1.8 : 1.2}
            filter={active === 'b2' ? 'url(#pfl-int-amber-glow)' : undefined}
            animate={{ r: active === 'b2' ? 7 : 5 }}
            transition={{ duration: 0.22 }} />
          {active === 'b2' && (
            <text x={293} y={90}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
              LOOP BREAKS HERE
            </text>
          )}
        </motion.g>
        <rect x={276} y={104} width={34} height={18} fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => toggle('b2')}
          role="button" aria-pressed={active === 'b2'}
          aria-label="Break point: sense but no decision — the insight deck that changes nothing" />

        {/* B3: DECIDE→SHIP at (447, 113) */}
        <motion.g animate={{ opacity: brMarkerAmbient('b3') }} transition={{ duration: 0.22 }}>
          <motion.circle cx={447} cy={CY} r={active === 'b3' ? 7 : 5}
            fill={active === 'b3' ? `${AMBER}0.20)` : `${AMBER}0.10)`}
            stroke={`${AMBER}${active === 'b3' ? '0.90)' : '0.65)'}`}
            strokeWidth={active === 'b3' ? 1.8 : 1.2}
            filter={active === 'b3' ? 'url(#pfl-int-amber-glow)' : undefined}
            animate={{ r: active === 'b3' ? 7 : 5 }}
            transition={{ duration: 0.22 }} />
          {active === 'b3' && (
            <text x={447} y={90}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
              LOOP BREAKS HERE
            </text>
          )}
        </motion.g>
        <rect x={430} y={104} width={34} height={18} fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => toggle('b3')}
          role="button" aria-pressed={active === 'b3'}
          aria-label="Break point: decide but no ship — the roadmap item that never lands" />

        {/* B4: return path at (350, 196) */}
        <motion.g animate={{ opacity: brMarkerAmbient('b4') }} transition={{ duration: 0.22 }}>
          <motion.circle cx={350} cy={196} r={active === 'b4' ? 7 : 5}
            fill={active === 'b4' ? `${AMBER}0.20)` : `${AMBER}0.10)`}
            stroke={`${AMBER}${active === 'b4' ? '0.90)' : '0.65)'}`}
            strokeWidth={active === 'b4' ? 1.8 : 1.2}
            filter={active === 'b4' ? 'url(#pfl-int-amber-glow)' : undefined}
            animate={{ r: active === 'b4' ? 7 : 5 }}
            transition={{ duration: 0.22 }} />
          {active === 'b4' && (
            <text x={350} y={174}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
              LOOP BREAKS HERE
            </text>
          )}
        </motion.g>
        <rect x={333} y={188} width={34} height={16} fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => toggle('b4')}
          role="button" aria-pressed={active === 'b4'}
          aria-label="Break point: ship but not measured — the change nobody checks" />

        {/* Break point ambient labels (show when not active, hide when something else is active) */}
        {[
          { bId: 'b1', cx: 139, nameY: 64, tagY: 77, name: 'DATA LAKE',    tag: 'SIGNAL · NO SENSE'   },
          { bId: 'b2', cx: 293, nameY: 64, tagY: 77, name: 'INSIGHT DECK', tag: 'SENSE · NO DECISION' },
          { bId: 'b3', cx: 447, nameY: 64, tagY: 77, name: 'ROADMAP ITEM', tag: 'DECIDE · NO SHIP'    },
          { bId: 'b4', cx: 350, nameY: 232, tagY: 221, name: 'NEVER CHECKED', tag: 'SHIP · NOT MEASURED' },
        ].map(({ bId, cx, nameY, tagY, name, tag }) => (
          <motion.g key={bId}
            animate={{ opacity: active === null ? 0.85 : active === bId ? 0 : 0.18 }}
            transition={{ duration: 0.22 }}>
            <text x={cx} y={nameY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.6" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
              fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
              {name}
            </text>
            <text x={cx} y={tagY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={`${AMBER}0.46)`} style={{ userSelect: 'none' }}>
              {tag}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {STAGE_BUTTONS.map(({ id, label }) => (
            <button
              key={id!}
              onClick={() => toggle(id)}
              aria-pressed={active === id}
              className="rounded-full px-3 py-1 text-xs font-mono tracking-widest transition-all"
              style={{
                background: active === id ? `${BRICK}0.18)` : 'transparent',
                color: active === id ? `${BRICK}0.92)` : `${BRICK}0.45)`,
                border: `1px solid ${active === id ? `${BRICK}0.50)` : `${BRICK}0.20)`}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {BREAK_BUTTONS.map(({ id, label }) => (
            <button
              key={id!}
              onClick={() => toggle(id)}
              aria-pressed={active === id}
              className="rounded-full px-3 py-1 text-xs font-mono tracking-widest transition-all"
              style={{
                background: active === id ? `${AMBER}0.14)` : 'transparent',
                color: active === id ? `${AMBER}0.88)` : `${AMBER}0.40)`,
                border: `1px solid ${active === id ? `${AMBER}0.45)` : `${AMBER}0.18)`}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {active && (
          <button
            onClick={() => setActive(null)}
            className="rounded-full px-3 py-1 text-xs font-mono tracking-widest transition-all"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.30)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {info && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.20, ease }}
            className="rounded-lg p-5"
            style={{
              background: isBreak ? `${AMBER}0.05)` : `${BRICK}0.05)`,
              border: `1px solid ${isBreak ? `${AMBER}0.22)` : `${BRICK}0.18)`}`,
            }}
          >
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: isBreak ? `${AMBER}0.72)` : `${BRICK}0.70)` }}>
              {info.tag}
            </p>
            <p className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-base)', color: '#FAFAFA', lineHeight: 1.35 }}>
              {info.headline}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)' }}>
              {info.body}
            </p>
            {isBreak && (
              <div className="mt-3 rounded px-3 py-2"
                style={{ background: `${AMBER}0.07)`, borderLeft: `2px solid ${AMBER}0.35)` }}>
                <p className="font-mono" style={{ fontSize: 'var(--text-xs)', color: `${AMBER}0.65)` }}>
                  Diagnosing WHERE your loop breaks is more useful than adding more signal — which is what most organisations do instead.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p className="font-mono text-center"
          style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.09em' }}>
          CLICK A STAGE OR A BREAK POINT TO EXPLORE — BREAK POINTS SEVER THE LOOP
        </p>
      )}
    </div>
  )
}
