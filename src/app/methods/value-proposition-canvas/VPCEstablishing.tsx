'use client'
import { motion, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const AMBER = 'rgba(245,158,11,'

const SVG_W = 700
const SVG_H = 325

// Value Map (left square)
const VM_X  = 14,  VM_Y = 30,  VM_W = 252, VM_H = 260
const VM_RE = VM_X + VM_W       // 266  right edge
const VM_DY = VM_Y + 88        // 118  horizontal divider
const VM_DX = VM_X + 126       // 140  vertical divider

// Customer Profile (right circle)
const CP_CX = 540, CP_CY = 165, CP_R = 108
const CP_LE = CP_CX - CP_R     // 432  left edge

// Circle dividers — θ in SVG convention (0=right, clockwise)
const D30_X  = Math.round(CP_CX + CP_R * Math.cos(30  * Math.PI / 180))  // 634
const D30_Y  = Math.round(CP_CY + CP_R * Math.sin(30  * Math.PI / 180))  // 219
const D150_X = Math.round(CP_CX + CP_R * Math.cos(150 * Math.PI / 180))  // 447
const D150_Y = D30_Y                                                        // 219

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.05 } },
}
const leftSlide  = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } }
const rightSlide = { hidden: { opacity: 0, x:  28 }, visible: { opacity: 1, x: 0 } }
const fadeIn     = { hidden: { opacity: 0 },          visible: { opacity: 1 } }

export default function VPCEstablishing() {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className="w-full"
      variants={container}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        style={{ maxHeight: 340 }}
        aria-label="Value Proposition Canvas showing value map and customer profile with fit connections and gaps"
        role="img"
      >
        <defs>
          <filter id="vpc-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="vpc-est-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={`${PLUM}0.65)`} />
          </marker>
        </defs>

        {/* ── VALUE MAP (left square) ─────────────────────────────────── */}
        <motion.g variants={leftSlide} transition={{ duration: 0.55 }}>
          {/* Outer rect */}
          <rect x={VM_X} y={VM_Y} width={VM_W} height={VM_H} rx={5}
            fill={`${PLUM}0.14)`} stroke={`${PLUM}0.45)`} strokeWidth={1.5} />

          {/* Horizontal divider */}
          <line x1={VM_X} y1={VM_DY} x2={VM_RE} y2={VM_DY}
            stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
          {/* Vertical divider */}
          <line x1={VM_DX} y1={VM_DY} x2={VM_DX} y2={VM_Y + VM_H}
            stroke="rgba(255,255,255,0.10)" strokeWidth={1} />

          {/* Section labels */}
          <text x={VM_DX} y={VM_Y + 19} textAnchor="middle"
            fill="rgba(255,255,255,0.28)" fontSize={7} fontWeight={600}
            letterSpacing={1.4} fontFamily="monospace">PRODUCTS &amp; SERVICES</text>

          <text x={77} y={VM_DY + 17} textAnchor="middle"
            fill="rgba(255,255,255,0.28)" fontSize={7} fontWeight={600}
            letterSpacing={1.2} fontFamily="monospace">GAIN CREATORS</text>

          <text x={203} y={VM_DY + 17} textAnchor="middle"
            fill="rgba(255,255,255,0.28)" fontSize={7} fontWeight={600}
            letterSpacing={1.2} fontFamily="monospace">PAIN RELIEVERS</text>

          {/* P&S items */}
          {([
            [22,  80, 90, 10],
            [122, 80, 112, 10],
            [22,  95, 70, 10],
          ] as [number,number,number,number][]).map(([ix,iy,iw,ih], i) => (
            <rect key={i} x={ix} y={iy} width={iw} height={ih} rx={2}
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth={0.75} />
          ))}

          {/* GC items */}
          {([
            [22, 155, 95, 10],
            [22, 170, 76, 10],
          ] as [number,number,number,number][]).map(([ix,iy,iw,ih], i) => (
            <rect key={i} x={ix} y={iy} width={iw} height={ih} rx={2}
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth={0.75} />
          ))}

          {/* PR items */}
          {([
            [150, 155, 90, 10],
            [150, 170, 76, 10],
          ] as [number,number,number,number][]).map(([ix,iy,iw,ih], i) => (
            <rect key={i} x={ix} y={iy} width={iw} height={ih} rx={2}
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth={0.75} />
          ))}

          {/* "VALUE MAP" corner label */}
          <text x={VM_X + VM_W - 6} y={VM_Y + VM_H - 8} textAnchor="end"
            fill={`${PLUM}0.50)`} fontSize={7} fontWeight={600}
            letterSpacing={1.6} fontFamily="monospace">VALUE MAP</text>
        </motion.g>

        {/* ── CUSTOMER PROFILE (right circle) ───────────────────────── */}
        <motion.g variants={rightSlide} transition={{ duration: 0.55 }}>
          {/* Main circle */}
          <circle cx={CP_CX} cy={CP_CY} r={CP_R}
            fill={`${PLUM}0.12)`} stroke={`${PLUM}0.45)`} strokeWidth={1.5}
            filter="url(#vpc-est-glow)" />

          {/* Divider lines from center */}
          <line x1={CP_CX} y1={CP_CY} x2={D150_X} y2={D150_Y}
            stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
          <line x1={CP_CX} y1={CP_CY} x2={D30_X} y2={D30_Y}
            stroke="rgba(255,255,255,0.10)" strokeWidth={1} />

          {/* Section labels */}
          <text x={CP_CX} y={CP_CY - 68} textAnchor="middle"
            fill="rgba(255,255,255,0.28)" fontSize={7} fontWeight={600}
            letterSpacing={1.2} fontFamily="monospace">CUSTOMER JOBS</text>

          <text x={CP_CX - 55} y={CP_CY + 60} textAnchor="middle"
            fill="rgba(255,255,255,0.28)" fontSize={7} fontWeight={600}
            letterSpacing={1.2} fontFamily="monospace">GAINS</text>

          <text x={CP_CX + 55} y={CP_CY + 60} textAnchor="middle"
            fill="rgba(255,255,255,0.28)" fontSize={7} fontWeight={600}
            letterSpacing={1.2} fontFamily="monospace">PAINS</text>

          {/* JOBS dots */}
          {([[516,108],[552,122]] as [number,number][]).map(([dx,dy],i) => (
            <circle key={i} cx={dx} cy={dy} r={3}
              fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth={0.8} />
          ))}
          {/* GAINS dots */}
          {([[490,200],[472,218]] as [number,number][]).map(([dx,dy],i) => (
            <circle key={i} cx={dx} cy={dy} r={3}
              fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth={0.8} />
          ))}
          {/* PAINS dots */}
          {([[578,197],[598,215],[580,234]] as [number,number][]).map(([dx,dy],i) => (
            <circle key={i} cx={dx} cy={dy} r={3}
              fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth={0.8} />
          ))}

          {/* "CUSTOMER PROFILE" corner label */}
          <text x={CP_CX} y={CP_CY + CP_R - 8} textAnchor="middle"
            fill={`${PLUM}0.50)`} fontSize={7} fontWeight={600}
            letterSpacing={1.3} fontFamily="monospace">CUSTOMER PROFILE</text>
        </motion.g>

        {/* ── FIT CONNECTIONS & GAP INDICATORS ──────────────────────── */}
        <motion.g variants={fadeIn} transition={{ duration: 0.45 }}>
          {/* FIT — PR → PAINS[0] */}
          <line x1={VM_RE} y1={160} x2={CP_LE} y2={197}
            stroke={`${PLUM}0.70)`} strokeWidth={1.5}
            markerEnd="url(#vpc-est-arrow)" />
          {/* FIT — GC → GAINS[0] */}
          <line x1={VM_RE} y1={174} x2={CP_LE} y2={200}
            stroke={`${PLUM}0.55)`} strokeWidth={1.5}
            markerEnd="url(#vpc-est-arrow)" />

          {/* FIT label in gap zone */}
          <text x={349} y={172} textAnchor="middle"
            fill={`${PLUM}0.85)`} fontSize={7.5} fontWeight={600}
            letterSpacing={1.0} fontFamily="monospace">FIT ✓</text>

          {/* WASTED FEATURE — PR item with no customer pain */}
          <line x1={VM_RE} y1={148} x2={328} y2={148}
            stroke={`${AMBER}0.55)`} strokeWidth={1.2} strokeDasharray="4 3" />
          <text x={330} y={145} textAnchor="start"
            fill={`${AMBER}0.65)`} fontSize={6.5} fontWeight={600}
            letterSpacing={1.1} fontFamily="monospace">WASTED ×</text>

          {/* UNMET NEED — PAINS[1] with no reliever */}
          <line x1={CP_LE} y1={220} x2={380} y2={220}
            stroke={`${AMBER}0.50)`} strokeWidth={1.2} strokeDasharray="4 3" />
          <text x={378} y={217} textAnchor="end"
            fill={`${AMBER}0.60)`} fontSize={6.5} fontWeight={600}
            letterSpacing={1.1} fontFamily="monospace">UNMET NEED !</text>
        </motion.g>

        {/* Caption */}
        <motion.text variants={fadeIn}
          x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle"
          fill="rgba(255,255,255,0.22)" fontSize={7} fontFamily="monospace"
          letterSpacing={0.8}
        >
          solid lines = fit matches · dashed = honest gaps · the gaps are the work
        </motion.text>
      </svg>
    </motion.div>
  )
}
