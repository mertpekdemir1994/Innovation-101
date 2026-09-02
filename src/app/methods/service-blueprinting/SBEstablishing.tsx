'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const SLATE = 'rgba(100,116,139,'
const SLATE_TEXT = 'rgba(143,154,171,'  // brightened text-safe variant of SLATE

const SVG_W = 700
const STAGE_W = 140
const SCX = [70, 210, 350, 490, 630] as const

const HDR_TOP = 8, HDR_H = 36
const DIV_Y   = 48

const CA_Y = 50,  CA_H = 48   // Customer Actions: 50..98
const FS_Y = 98,  FS_H = 48   // Frontstage:       98..146
const LOV_LINE_Y = 166         // Line of Visibility
const BS_Y = 174, BS_H = 48   // Backstage:        174..222
const SP_Y = 222, SP_H = 48   // Support Processes: 222..270
const SVG_H = 270

// Vertical offsets shared by every band: label sits near the band top
// (hanging baseline), the row of items sits well below it so an 11pt
// label and an 11pt item line never touch.
const LABEL_DY = 6
const ITEM_DY  = 32

const STAGE_NAMES = ['DISCOVER', 'CONSIDER', 'START', 'USE', 'RESOLVE'] as const

const CA_ITEMS = ['Searches online',   'Compares plans',  'Signs up',        'Uses the service', 'Reports an issue'] as const
const FS_ITEMS = ['Ads/Landing page',  'Pricing / Sales', 'Onboarding flow', 'App / Dashboard',  'Support chat'] as const
const BS_ITEMS = ['Lead enrichment',    'CRM operations',  'Account setup',   'Usage tracking',   'Ticket routing'] as const
const SP_ITEMS = ['Analytics CRM',      'Billing system',  'Auth service',    'Usage database',   'Helpdesk platform'] as const

export default function SBEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const riseIn = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }
  const fadeIn = { hidden: { opacity: 0 },        visible: { opacity: 1 } }
  const lovIn  = { hidden: { opacity: 0, scaleX: 0.6 }, visible: { opacity: 1, scaleX: 1 } }
  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.11, delayChildren: 0.05 } },
  }
  const rT = prefersReduced ? { duration: 0 } : { duration: 0.38, ease }
  const fT = prefersReduced ? { duration: 0 } : { duration: 0.30, ease }

  return (
    <motion.div
      className="w-full select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxWidth: 'var(--width-illustration)', display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="sb-est-glow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background wash */}
        <motion.rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8}
          fill={`${TEAL}0.05)`}
          variants={fadeIn} transition={{ ...fT, duration: 0.5 }}
        />

        {/* Stage headers */}
        {STAGE_NAMES.map((name, i) => (
          <motion.g key={name} variants={riseIn} transition={rT}>
            <rect x={i * STAGE_W + 1} y={HDR_TOP} width={STAGE_W - 2} height={HDR_H}
              rx={4} fill={`${TEAL}0.12)`} stroke={`${TEAL}0.40)`} strokeWidth={1}
            />
            <text x={SCX[i]} y={HDR_TOP + HDR_H / 2 + 2}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={`${TEAL_TEXT}0.979)`} style={{ userSelect: 'none' }}
            >{name}</text>
          </motion.g>
        ))}

        {/* Structural lines */}
        <motion.g variants={fadeIn} transition={fT}>
          <line x1={0} y1={DIV_Y} x2={SVG_W} y2={DIV_Y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          {[1, 2, 3, 4].map(i => (
            <line key={i} x1={i * STAGE_W} y1={DIV_Y} x2={i * STAGE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.05)" strokeWidth={1}
            />
          ))}
        </motion.g>

        {/* Customer Actions */}
        <motion.g variants={riseIn} transition={rT}>
          <rect x={0} y={CA_Y} width={SVG_W} height={CA_H} fill={`${TEAL}0.07)`} />
          <line x1={0} y1={CA_Y + CA_H} x2={SVG_W} y2={CA_Y + CA_H} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
          <text x={4} y={CA_Y + LABEL_DY} textAnchor="start" dominantBaseline="hanging"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL_TEXT}0.905)`} style={{ userSelect: 'none' }}
          >CUSTOMER ACTIONS</text>
          {CA_ITEMS.map((text, i) => (
            <text key={i} x={SCX[i]} y={CA_Y + ITEM_DY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-body, Inter, sans-serif)"
              fill="rgba(255,255,255,0.70)" style={{ userSelect: 'none' }}
            >{text}</text>
          ))}
        </motion.g>

        {/* Frontstage */}
        <motion.g variants={riseIn} transition={rT}>
          <rect x={0} y={FS_Y} width={SVG_W} height={FS_H} fill={`${TEAL}0.04)`} />
          <line x1={0} y1={FS_Y + FS_H} x2={SVG_W} y2={FS_Y + FS_H} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          <text x={4} y={FS_Y + LABEL_DY} textAnchor="start" dominantBaseline="hanging"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL_TEXT}0.885)`} style={{ userSelect: 'none' }}
          >FRONTSTAGE</text>
          {FS_ITEMS.map((text, i) => (
            <text key={i} x={SCX[i]} y={FS_Y + ITEM_DY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-body, Inter, sans-serif)"
              fill="rgba(255,255,255,0.58)" style={{ userSelect: 'none' }}
            >{text}</text>
          ))}
        </motion.g>

        {/* LINE OF VISIBILITY: signature element */}
        <motion.g
          variants={lovIn}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.55, ease, delay: 0.08 }}
          style={{ transformOrigin: `${SVG_W / 2}px ${LOV_LINE_Y}px` }}
        >
          <rect x={0} y={FS_Y + FS_H} width={SVG_W} height={BS_Y - (FS_Y + FS_H)}
            fill="rgba(255,255,255,0.025)"
          />
          <line
            x1={0} y1={LOV_LINE_Y} x2={SVG_W} y2={LOV_LINE_Y}
            stroke="rgba(255,255,255,0.65)" strokeWidth={1.5} strokeDasharray="9 5"
            filter="url(#sb-est-glow)"
          />
          <text x={SVG_W - 6} y={LOV_LINE_Y - 8}
            textAnchor="end" dominantBaseline="auto"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill="rgba(255,255,255,0.60)" style={{ userSelect: 'none' }}
          >LINE OF VISIBILITY</text>
        </motion.g>

        {/* Backstage */}
        <motion.g variants={riseIn} transition={rT}>
          <rect x={0} y={BS_Y} width={SVG_W} height={BS_H} fill={`${SLATE}0.05)`} />
          <line x1={0} y1={BS_Y + BS_H} x2={SVG_W} y2={BS_Y + BS_H} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <text x={4} y={BS_Y + LABEL_DY} textAnchor="start" dominantBaseline="hanging"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${SLATE_TEXT}0.912)`} style={{ userSelect: 'none' }}
          >BACKSTAGE</text>
          {BS_ITEMS.map((text, i) => (
            <text key={i} x={SCX[i]} y={BS_Y + ITEM_DY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-body, Inter, sans-serif)"
              fill={`${SLATE_TEXT}0.941)`} style={{ userSelect: 'none' }}
            >{text}</text>
          ))}
        </motion.g>

        {/* Support Processes */}
        <motion.g variants={riseIn} transition={rT}>
          <rect x={0} y={SP_Y} width={SVG_W} height={SP_H} fill={`${SLATE}0.08)`} />
          <text x={4} y={SP_Y + LABEL_DY} textAnchor="start" dominantBaseline="hanging"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${SLATE_TEXT}0.891)`} style={{ userSelect: 'none' }}
          >SUPPORT PROCESSES / SYSTEMS</text>
          {SP_ITEMS.map((text, i) => (
            <text key={i} x={SCX[i]} y={SP_Y + ITEM_DY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-body, Inter, sans-serif)"
              fill={`${SLATE_TEXT}0.92)`} style={{ userSelect: 'none' }}
            >{text}</text>
          ))}
        </motion.g>
      </svg>
    </motion.div>
  )
}
