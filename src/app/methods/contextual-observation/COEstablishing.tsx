'use client'
import { motion, useReducedMotion } from 'framer-motion'

const SAGE  = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE
const AMBER = 'rgba(245,158,11,'

function dome(cx: number, cy: number, w: number, h: number): string {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

const SVG_W = 700
const SVG_H = 268

export default function COEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const fade    = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const scaleIn = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } }

  const container = {
    hidden: {},
    visible: {
      transition: prefersReduced ? {} : { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  }

  const envT  = prefersReduced ? { duration: 0 } : { duration: 0.55, ease }
  const elemT = prefersReduced ? { duration: 0 } : { duration: 0.45, ease }
  const annT  = prefersReduced ? { duration: 0 } : { duration: 0.38, ease }

  return (
    <motion.div
      className="w-full flex justify-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
      aria-label="In-context observation scene: a person at a desk with a computer on the left (the stated tool) and sticky notes, a paper pile, and a receipts shoebox on the right (the real system), with an observer watching from the side"
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', overflow: 'visible' }}
      >
        <defs>
          <filter id="co-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="co-est-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Room background */}
        <motion.rect
          x={14} y={14} width={672} height={238}
          rx={8}
          fill={`${SAGE}0.05)`}
          stroke={`${SAGE}0.14)`}
          strokeWidth={1}
          variants={fade} transition={envT}
        />

        {/* Ambient wash over real-behavior area */}
        <motion.ellipse
          cx={465} cy={162} rx={165} ry={42}
          fill={`${SAGE}0.05)`}
          variants={fade} transition={envT}
        />

        {/* Desk surface */}
        <motion.rect
          x={115} y={172} width={470} height={14}
          rx={3}
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
          variants={fade} transition={envT}
        />

        {/* ── SCREEN / STATED TOOL ── */}
        <motion.g
          variants={scaleIn}
          transition={elemT}
          style={{ transformOrigin: '213px 135px' } as React.CSSProperties}
        >
          {/* Monitor bezel */}
          <rect
            x={168} y={102} width={90} height={68} rx={5}
            fill="rgba(255,255,255,0.03)"
            stroke={`${AMBER}0.48)`}
            strokeWidth={1.5}
            filter="url(#co-est-glow-sm)"
          />
          {/* Screen face */}
          <rect x={176} y={109} width={74} height={52} rx={2}
            fill="rgba(255,255,255,0.03)"
          />
          {/* UI lines suggesting software */}
          <line x1={182} y1={119} x2={244} y2={119} stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
          <line x1={182} y1={128} x2={238} y2={128} stroke="rgba(255,255,255,0.11)" strokeWidth={1} />
          <line x1={182} y1={137} x2={226} y2={137} stroke="rgba(255,255,255,0.09)" strokeWidth={1} />
          <rect x={182} y={146} width={42} height={8} rx={2}
            fill={`${AMBER}0.07)`} stroke={`${AMBER}0.18)`} strokeWidth={1} />
          {/* Monitor stand */}
          <rect x={206} y={170} width={14} height={4} rx={1}
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1}
          />
        </motion.g>

        {/* ── PERSON (seated at desk) ── */}
        <motion.g
          variants={scaleIn}
          transition={elemT}
          style={{ transformOrigin: '285px 148px' } as React.CSSProperties}
        >
          {/* Head */}
          <circle cx={285} cy={118} r={17}
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.58)"
            strokeWidth={1.5}
            filter="url(#co-est-glow)"
          />
          {/* Torso dome */}
          <path d={dome(285, 135, 21, 30)}
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.50)"
            strokeWidth={1.5}
            filter="url(#co-est-glow)"
          />
          {/* Arms resting on desk */}
          <line x1={264} y1={164} x2={224} y2={172}
            stroke="rgba(255,255,255,0.32)" strokeWidth={2} strokeLinecap="round" />
          <line x1={306} y1={164} x2={348} y2={172}
            stroke="rgba(255,255,255,0.32)" strokeWidth={2} strokeLinecap="round" />
        </motion.g>

        {/* ── STICKY NOTE (WORKAROUND) ── */}
        <motion.g
          variants={scaleIn}
          transition={elemT}
          style={{ transformOrigin: '392px 156px' } as React.CSSProperties}
        >
          <rect x={370} y={143} width={44} height={28} rx={3}
            fill={`${SAGE}0.22)`}
            stroke={`${SAGE}0.72)`}
            strokeWidth={1.5}
            filter="url(#co-est-glow)"
          />
          <text
            x={392} y={154}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.05em"
            fill={`${SAGE_TEXT}0.983)`}
            style={{ userSelect: 'none' }}
          >CAN I</text>
          <text
            x={392} y={164}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.05em"
            fill={`${SAGE_TEXT}0.983)`}
            style={{ userSelect: 'none' }}
          >MAKE PAYROLL?</text>
        </motion.g>

        {/* ── PAPER PILE ── */}
        <motion.g variants={fade} transition={elemT}>
          <rect x={426} y={152} width={48} height={8} rx={2}
            fill="rgba(255,255,255,0.03)"
            stroke={`${SAGE}0.24)`}
            strokeWidth={1}
          />
          <rect x={422} y={158} width={58} height={13} rx={2}
            fill="rgba(255,255,255,0.03)"
            stroke={`${SAGE}0.32)`}
            strokeWidth={1}
          />
          <text
            x={451} y={165}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)"
            fill={`${SAGE_TEXT}0.899)`}
            style={{ userSelect: 'none' }}
          >INVOICES</text>
        </motion.g>

        {/* ── SHOEBOX / RECEIPTS ── */}
        <motion.g variants={fade} transition={elemT}>
          <rect x={492} y={160} width={72} height={12} rx={2}
            fill={`${SAGE}0.10)`}
            stroke={`${SAGE}0.40)`}
            strokeWidth={1}
          />
          <text
            x={528} y={166}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${SAGE_TEXT}0.933)`}
            style={{ userSelect: 'none' }}
          >RECEIPTS</text>
        </motion.g>

        {/* ── OBSERVER (far right) ── */}
        <motion.g
          variants={scaleIn}
          transition={elemT}
          style={{ transformOrigin: '644px 160px' } as React.CSSProperties}
        >
          <circle cx={644} cy={142} r={11}
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth={1.5}
            filter="url(#co-est-glow-sm)"
          />
          <path d={dome(644, 153, 14, 22)}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.36)"
            strokeWidth={1.5}
          />
          {/* Sightline to scene */}
          <line x1={630} y1={148} x2={582} y2={154}
            stroke="rgba(255,255,255,0.09)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <text
            x={644} y={180}
            textAnchor="middle"
            fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.64)"
            style={{ userSelect: 'none' }}
          >OBSERVER</text>
        </motion.g>

        {/* ── ANNOTATIONS ── */}
        {/* STATED label + underline (amber - screen/official side) */}
        <motion.g variants={fade} transition={annT}>
          <text
            x={213} y={90}
            textAnchor="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.16em"
            fill={`${AMBER}0.75)`}
            style={{ userSelect: 'none' }}
          >STATED</text>
          <line x1={168} y1={95} x2={258} y2={95}
            stroke={`${AMBER}0.28)`} strokeWidth={1} strokeDasharray="4 3" />
        </motion.g>

        {/* REAL label + underline (sage - papers/workaround side) */}
        <motion.g variants={fade} transition={annT}>
          <text
            x={468} y={90}
            textAnchor="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.16em"
            fill={`${SAGE_TEXT}0.962)`}
            style={{ userSelect: 'none' }}
          >REAL</text>
          <line x1={370} y1={95} x2={570} y2={95}
            stroke={`${SAGE}0.28)`} strokeWidth={1} strokeDasharray="4 3" />
        </motion.g>

        {/* Gap divider (vertical dashed line between stated and real) */}
        <motion.g variants={fade} transition={{ ...annT, delay: prefersReduced ? 0 : 0.4 }}>
          <line x1={326} y1={82} x2={326} y2={168}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={1}
            strokeDasharray="5 4"
          />
          <text
            x={326} y={74}
            textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.6)"
            style={{ userSelect: 'none' }}
          >THE GAP</text>
        </motion.g>

        {/* Caption */}
        <motion.text
          x={SVG_W / 2} y={256}
          textAnchor="middle"
          fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.59)"
          style={{ userSelect: 'none' }}
          variants={fade}
          transition={{ ...annT, delay: prefersReduced ? 0 : 0.6 }}
        >
          the real environment shows what no interview would surface · workarounds are failures of the current system made visible
        </motion.text>
      </svg>
    </motion.div>
  )
}
