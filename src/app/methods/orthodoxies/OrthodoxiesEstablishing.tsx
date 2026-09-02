'use client'
import { motion, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE

// ── Shared geometry (same across all three orthodoxies visual components) ─────
const SVG_W = 700, SVG_H = 258

// Central constrained space
const SX = 152, SY = 74, SW = 268, SH = 116
const SCX = SX + SW / 2  // 286
const SCY = SY + SH / 2  // 132

// Wall overrun past the corners
const WE = 20

// TOP wall
const TY = SY           // 74
const TX1 = SX - WE     // 132
const TX2 = SX + SW + WE // 440

// BOTTOM wall
const BY = SY + SH      // 190

// LEFT wall
const LX = SX           // 152
const LY1 = SY - WE     // 54
const LY2 = SY + SH + WE // 210

// RIGHT wall: has a pre-existing break
const RX = SX + SW      // 420
const BRK_Y1 = SCY - 22 // 110
const BRK_Y2 = SCY + 22 // 154

// Opportunity territory center-x (right of RX)
const OPP_CX = Math.round((RX + SVG_W - 14) / 2) // ~553

export default function OrthodoxiesEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  // Walls animate from faint (0.08) to visible (1): that is how orthodoxies operate
  const wallAnim = {
    hidden:  { opacity: 0.08 },
    visible: { opacity: 1 },
  }
  const fade = { hidden: { opacity: 0 }, visible: { opacity: 1 } }

  const container = {
    hidden: {},
    visible: {
      transition: prefersReduced ? {} : { staggerChildren: 0.10, delayChildren: 0.05 },
    },
  }

  const envT  = prefersReduced ? { duration: 0 } : { duration: 0.55, ease }
  const wallT = prefersReduced ? { duration: 0 } : { duration: 0.65, ease }
  const lblT  = prefersReduced ? { duration: 0 } : { duration: 0.40, ease }
  const brkT  = prefersReduced ? { duration: 0 } : { duration: 0.45, ease }

  const WALL_STROKE = 'rgba(255,255,255,0.65)'
  const WALL_W = 2

  return (
    <motion.div
      className="w-full flex justify-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
      aria-label="Constraint-space illustration: a central possibility space is boxed in by four labeled walls, each an unquestioned industry orthodoxy. The right wall is broken open, revealing opportunity territory beyond it."
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="ortho-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ortho-est-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="ortho-opp-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={`${SAGE}0.20)`} />
            <stop offset="100%" stopColor={`${SAGE}0.0)`} />
          </radialGradient>
        </defs>

        {/* Central constrained space fill */}
        <motion.rect
          x={SX} y={SY} width={SW} height={SH}
          rx={2}
          fill="rgba(255,255,255,0.025)"
          stroke="none"
          variants={fade} transition={envT}
        />

        {/* Small idea markers: clustered inside the constraint box */}
        {([
          [SCX - 62, SCY - 24],
          [SCX + 44, SCY - 18],
          [SCX - 18, SCY + 28],
          [SCX + 68, SCY + 18],
          [SCX - 72, SCY + 12],
        ] as [number, number][]).map(([cx, cy], i) => (
          <motion.g key={i} variants={fade}
            transition={{ ...envT, delay: prefersReduced ? 0 : i * 0.07 }}>
            <circle cx={cx} cy={cy} r={3.5}
              fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.22)" strokeWidth={1} />
          </motion.g>
        ))}

        {/* Central space label */}
        <motion.g variants={fade} transition={lblT}>
          <text x={SCX} y={SCY + 3} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.20em"
            fill="rgba(255,255,255,0.55)" style={{ userSelect: 'none' }}>
            IDEA SPACE
          </text>
        </motion.g>

        {/* ── WALLS ── */}

        {/* TOP wall (faint → solid) */}
        <motion.g variants={wallAnim} transition={wallT}>
          <line x1={TX1} y1={TY} x2={TX2} y2={TY}
            stroke={WALL_STROKE} strokeWidth={WALL_W}
            filter="url(#ortho-est-glow-sm)" />
        </motion.g>

        {/* BOTTOM wall */}
        <motion.g variants={wallAnim} transition={wallT}>
          <line x1={TX1} y1={BY} x2={TX2} y2={BY}
            stroke={WALL_STROKE} strokeWidth={WALL_W}
            filter="url(#ortho-est-glow-sm)" />
        </motion.g>

        {/* LEFT wall */}
        <motion.g variants={wallAnim} transition={wallT}>
          <line x1={LX} y1={LY1} x2={LX} y2={LY2}
            stroke={WALL_STROKE} strokeWidth={WALL_W}
            filter="url(#ortho-est-glow-sm)" />
        </motion.g>

        {/* RIGHT wall: two segments with the break */}
        <motion.g variants={wallAnim} transition={wallT}>
          <line x1={RX} y1={LY1} x2={RX} y2={BRK_Y1}
            stroke={WALL_STROKE} strokeWidth={WALL_W}
            filter="url(#ortho-est-glow-sm)" />
          <line x1={RX} y1={BRK_Y2} x2={RX} y2={LY2}
            stroke={WALL_STROKE} strokeWidth={WALL_W}
            filter="url(#ortho-est-glow-sm)" />
        </motion.g>

        {/* ── WALL LABELS ── */}

        {/* TOP label */}
        <motion.g variants={fade} transition={lblT}>
          <text x={SCX} y={TY - 14} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.50)" style={{ userSelect: 'none' }}>
            CUSTOMERS MUST OWN THE PRODUCT
          </text>
        </motion.g>

        {/* BOTTOM label */}
        <motion.g variants={fade} transition={lblT}>
          <text x={SCX} y={BY + 16} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.50)" style={{ userSelect: 'none' }}>
            IN-PERSON DELIVERY REQUIRED
          </text>
        </motion.g>

        {/* LEFT label (rotated to read bottom-to-top) */}
        <motion.g variants={fade} transition={lblT}>
          <text
            transform={`rotate(-90, ${LX - 28}, ${SCY})`}
            x={LX - 28} y={SCY}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.50)"
            style={{ userSelect: 'none' }}
          >PREMIUM PRICING = CREDIBILITY</text>
        </motion.g>

        {/* RIGHT wall label: sage, above the top segment */}
        <motion.g variants={fade} transition={lblT}>
          <text x={RX} y={LY1 - 10} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${SAGE_TEXT}0.937)`} style={{ userSelect: 'none' }}>
            SOLD THROUGH DEALERS ONLY
          </text>
        </motion.g>

        {/* ── BREAK DETAILS ── */}
        {/* Torn-edge marks at break points */}
        <motion.g variants={fade} transition={brkT}>
          <path
            d={`M ${RX - 5} ${BRK_Y1} L ${RX + 5} ${BRK_Y1 + 4} L ${RX - 5} ${BRK_Y1 + 8}`}
            stroke={`${SAGE}0.80)`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={`M ${RX - 5} ${BRK_Y2 - 8} L ${RX + 5} ${BRK_Y2 - 4} L ${RX - 5} ${BRK_Y2}`}
            stroke={`${SAGE}0.80)`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* Arrow through the break */}
        <motion.g variants={fade} transition={{ ...brkT, delay: prefersReduced ? 0 : 0.15 }}
          filter="url(#ortho-est-glow)">
          <line x1={RX - 6} y1={SCY} x2={RX + 22} y2={SCY}
            stroke={`${SAGE}0.85)`} strokeWidth={2} strokeLinecap="round" />
          <path
            d={`M ${RX + 14} ${SCY - 5} L ${RX + 22} ${SCY} L ${RX + 14} ${SCY + 5}`}
            stroke={`${SAGE}0.85)`} strokeWidth={2} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* ── OPPORTUNITY TERRITORY ── */}
        <motion.ellipse
          cx={OPP_CX} cy={SCY} rx={110} ry={58}
          fill="url(#ortho-opp-grad)"
          variants={fade}
          transition={{ ...brkT, delay: prefersReduced ? 0 : 0.20 }}
        />

        <motion.g
          variants={fade}
          transition={{ ...brkT, delay: prefersReduced ? 0 : 0.30 }}
          filter="url(#ortho-est-glow-sm)"
        >
          <text x={OPP_CX} y={SCY - 9} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={`${SAGE_TEXT}0.937)`} style={{ userSelect: 'none' }}>OPPORTUNITY</text>
          <text x={OPP_CX} y={SCY + 9} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={`${SAGE_TEXT}0.937)`} style={{ userSelect: 'none' }}>SPACE</text>
        </motion.g>

        {/* Caption: split across two lines — the single-line sentence no
            longer fits SVG_W at 11pt */}
        <motion.g variants={fade}
          transition={{ ...lblT, delay: prefersReduced ? 0 : 0.60 }}>
          <text x={SVG_W / 2} y={SVG_H - 23} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
            every industry is governed by rules nobody wrote ·
          </text>
          <text x={SVG_W / 2} y={SVG_H - 7} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
            the breakthrough lives on the other side of one of them
          </text>
        </motion.g>
      </svg>
    </motion.div>
  )
}
