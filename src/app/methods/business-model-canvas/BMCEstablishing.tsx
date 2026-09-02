'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700
const SVG_H = 290

// ── Block geometry ─────────────────────────────────────────────────────────
// All blocks sit on a dark background, canonical BMC arrangement.
// Columns: KP | KA/KR | VP | CR/CH | CS     (top 2 rows)
//          Cost Structure | Revenue Streams   (bottom row)

const BLK = {
  kp:   { x: 4,   y: 4,   w: 116, h: 168 },  // spans rows 1+2
  ka:   { x: 124, y: 4,   w: 116, h: 82  },
  kr:   { x: 124, y: 90,  w: 116, h: 82  },
  vp:   { x: 244, y: 4,   w: 156, h: 168 },  // spans rows 1+2
  cr:   { x: 404, y: 4,   w: 116, h: 82  },
  ch:   { x: 404, y: 90,  w: 116, h: 82  },
  cs:   { x: 524, y: 4,   w: 172, h: 168 },  // spans rows 1+2
  cost: { x: 4,   y: 176, w: 396, h: 68  },
  rev:  { x: 404, y: 176, w: 292, h: 68  },
} as const

type BlockKey = keyof typeof BLK

function cx(k: BlockKey) { return BLK[k].x + BLK[k].w / 2 }
function cy(k: BlockKey) { return BLK[k].y + BLK[k].h / 2 }

// ── Block labels ──────────────────────────────────────────────────────────
const LABELS: Record<BlockKey, [string, string]> = {
  kp:   ['KEY', 'PARTNERS'],
  ka:   ['KEY', 'ACTIVITIES'],
  kr:   ['KEY', 'RESOURCES'],
  vp:   ['VALUE', 'PROPOSITIONS'],
  cr:   ['CUSTOMER', 'RELATIONSHIPS'],
  ch:   ['CHANNELS', ''],
  cs:   ['CUSTOMER', 'SEGMENTS'],
  cost: ['COST STRUCTURE', ''],
  rev:  ['REVENUE STREAMS', ''],
}

// ── Dependency links ───────────────────────────────────────────────────────
// Drawn as thin lines with tiny arrowhead markers.
// Each entry: [fromX, fromY, toX, toY, strained?]
type LinkSpec = { d: string; strained?: boolean }

const LINKS: LinkSpec[] = [
  // KP → KA (horizontal bridge)
  { d: `M ${BLK.kp.x + BLK.kp.w},${cy('ka')} L ${BLK.ka.x},${cy('ka')}` },
  // KA → VP (bridge, offset down slightly)
  { d: `M ${BLK.ka.x + BLK.ka.w},${cy('ka')} L ${BLK.vp.x},${cy('ka')}` },
  // KR → VP (bridge, at KR cy)
  { d: `M ${BLK.kr.x + BLK.kr.w},${cy('kr')} L ${BLK.vp.x},${cy('kr')}` },
  // VP → CS (main horizontal)
  { d: `M ${BLK.vp.x + BLK.vp.w},${cy('vp')} L ${BLK.cs.x},${cy('vp')}` },
  // CS → CR (CS left edge to CR right edge)
  { d: `M ${BLK.cs.x},${cy('cr')} L ${BLK.cr.x + BLK.cr.w},${cy('cr')}` },
  // CS → CH (CS left edge to CH right edge)
  { d: `M ${BLK.cs.x},${cy('ch')} L ${BLK.ch.x + BLK.ch.w},${cy('ch')}` },
  // CH → REV (vertical down, at CH cx)
  { d: `M ${cx('ch')},${BLK.ch.y + BLK.ch.h} L ${cx('ch')},${BLK.rev.y}` },
  // KR → COST (vertical down)
  { d: `M ${cx('kr')},${BLK.kr.y + BLK.kr.h} L ${cx('kr')},${BLK.cost.y}` },
  // COST ←→ REV (the balance: horizontal at bottom border)
  { d: `M ${BLK.cost.x + BLK.cost.w},${cy('cost')} L ${BLK.rev.x},${cy('cost')}` },
  // STRAINED: CH → COST (channel choice affects cost structure, the tension hint)
  { d: `M ${cx('ch')},${BLK.ch.y + BLK.ch.h} Q ${430},${196} ${340},${BLK.cost.y + BLK.cost.h / 2}`, strained: true },
]

export default function BMCEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced
  const d = (base: number) => (prefersReduced ? 0 : base)

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: visible ? 1 : 0 },
    transition: { duration: 0.36, delay: d(delay) },
  })

  const drawPath = (delay: number, dur: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0 },
    transition: {
      pathLength: { duration: dur, delay: d(delay) },
      opacity: { duration: 0.18, delay: d(delay) },
    },
  })

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="The Business Model Canvas as a coherence engine. Nine blocks in the canonical arrangement: Key Partners, Key Activities, Key Resources, Value Propositions, Customer Relationships, Channels, Customer Segments, Cost Structure, and Revenue Streams. Dependency lines connect the blocks: Value Propositions connects to Customer Segments; Channels and Customer Relationships both depend on the Segment; Key Activities and Key Resources flow to Value Propositions and to Cost Structure. One link, between Channels and Cost Structure, is drawn under tension in amber, hinting that a premium channel choice could break the economics."
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block' }}
      >
        <defs>
          <filter id="bmc-est-plum-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${PLUM}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bmc-est-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${AMBER}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="bmc-est-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill={`${PLUM}0.55)`} />
          </marker>
          <marker id="bmc-est-arr-rev" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
            <path d="M6,0 L0,3 L6,6 L4.5,3 Z" fill={`${PLUM}0.55)`} />
          </marker>
          <marker id="bmc-est-arr-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill={`${AMBER}0.70)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.97)" rx={6} />

        {/* ── BLOCKS (fade in first) ── */}
        {(Object.keys(BLK) as BlockKey[]).map((k, i) => {
          const b = BLK[k]
          const [line1, line2] = LABELS[k]
          const isVP = k === 'vp'
          const fill = isVP ? `${PLUM}0.18)` : `${PLUM}0.07)`
          const stroke = isVP ? `${PLUM}0.72)` : `${PLUM}0.38)`
          const strokeW = isVP ? 1.6 : 1.0
          const glowFilter = isVP ? 'url(#bmc-est-plum-glow)' : 'none'
          const textColor = isVP ? `${PLUM_TEXT}1)` : `rgba(255,255,255,0.68)`
          const midY = b.y + b.h / 2
          const hasTwo = line2 !== ''

          return (
            <motion.g key={k} {...fade(0.05 + i * 0.04)}>
              <rect
                x={b.x} y={b.y} width={b.w} height={b.h} rx={3}
                fill={fill} stroke={stroke} strokeWidth={strokeW}
                style={{ filter: glowFilter }}
              />
              <text
                x={b.x + b.w / 2}
                y={hasTwo ? midY - 8 : midY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11"
                fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                fill={textColor} style={{ userSelect: 'none' }}>
                {line1}
              </text>
              {hasTwo && (
                <text
                  x={b.x + b.w / 2} y={midY + 10}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)" letterSpacing="0.03em" fontWeight="600"
                  fill={textColor} style={{ userSelect: 'none' }}>
                  {line2}
                </text>
              )}
            </motion.g>
          )
        })}

        {/* ── DEPENDENCY LINKS ── */}
        {LINKS.filter(l => !l.strained).map((link, i) => (
          <motion.path
            key={i}
            d={link.d}
            fill="none"
            stroke={`${PLUM}0.35)`}
            strokeWidth={0.9}
            markerEnd="url(#bmc-est-arr)"
            {...drawPath(0.55 + i * 0.08, 0.40)}
          />
        ))}

        {/* ── STRAINED LINK (hint at upcoming contradiction) ── */}
        <motion.path
          d={LINKS[LINKS.length - 1].d}
          fill="none"
          stroke={`${AMBER}0.45)`}
          strokeWidth={1.2}
          strokeDasharray="4 3"
          markerEnd="url(#bmc-est-arr-amber)"
          filter="url(#bmc-est-amber-glow)"
          {...drawPath(1.30, 0.50)}
        />

        {/* Strained label */}
        <motion.g {...fade(1.55)}>
          <text x={395} y={206} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill={`${AMBER_TEXT}0.876)`} style={{ userSelect: 'none' }}>
            UNDER TENSION
          </text>
        </motion.g>

        {/* ── CAPTION ── */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 14}
          textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.02em"
          fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }}
          {...fade(1.70)}>
          Nine blocks. One structure. Change any block and others move with it.
        </motion.text>
      </svg>
    </div>
  )
}
