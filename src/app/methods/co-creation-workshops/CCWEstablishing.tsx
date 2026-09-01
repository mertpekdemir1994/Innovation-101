'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY

const SVG_W = 700
const SVG_H = 258

// Central shared canvas
const CX = 210, CY = 40, CW = 280, CH = 140
const CCX = CX + CW / 2  // 350
const CCY = CY + CH / 2  // 110

// Person node radii
const PR = 12, DR = 5

// Participant positions (four, on sides)
const P1 = { cx: 72, cy: 68 }
const P2 = { cx: 72, cy: 165 }
const P3 = { cx: 628, cy: 68 }
const P4 = { cx: 628, cy: 165 }

// Team positions (two, bottom)
const T1 = { cx: 275, cy: 232 }
const T2 = { cx: 425, cy: 232 }

// Contribution lines (person → canvas edge)
const LINES = [
  { x1: P1.cx + PR + 2, y1: P1.cy, x2: CX,      y2: 82,  clay: true  },
  { x1: P2.cx + PR + 2, y1: P2.cy, x2: CX,      y2: 150, clay: true  },
  { x1: P3.cx - PR - 2, y1: P3.cy, x2: CX + CW, y2: 82,  clay: true  },
  { x1: P4.cx - PR - 2, y1: P4.cy, x2: CX + CW, y2: 150, clay: true  },
  { x1: T1.cx, y1: T1.cy - PR - 2, x2: 290,     y2: CY + CH, clay: false },
  { x1: T2.cx, y1: T2.cy - PR - 2, x2: 410,     y2: CY + CH, clay: false },
]

// Contribution cards inside the canvas (mixed participant + team)
const CARDS = [
  { x: 222, y: 54,  w: 96,  h: 18, label: 'LIVED EXPERIENCE',  clay: true  },
  { x: 372, y: 54,  w: 104, h: 18, label: 'SPECIFIC CONTEXT',  clay: true  },
  { x: 222, y: 96,  w: 102, h: 18, label: 'DESIGN APPROACH',   clay: false },
  { x: 346, y: 96,  w: 130, h: 18, label: 'OPERATIONAL DETAIL', clay: true  },
  { x: 250, y: 148, w: 82,  h: 18, label: 'PAIN POINT',        clay: true  },
  { x: 364, y: 148, w: 112, h: 18, label: 'WORKABLE CHANGE',   clay: false },
]

export default function CCWEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  return (
    <div className="w-full"
      aria-label="Design-with collaboration space. Four participants (clay-accented) and two team members (subtle) are positioned around a central shared canvas. Contribution lines connect each person to the canvas, which is filled with a mix of participant and team contributions. This illustrates making together: all contributions woven into one shared solution.">
      <svg ref={ref} viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
        preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <defs>
          <filter id="ccw-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${CLAY}0.38)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ccw-est-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
            <feFlood floodColor={`${CLAY}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* DESIGN WITH header label */}
        <motion.text x={CCX} y={24} textAnchor="middle"
          fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.20em"
          fill={`${CLAY_TEXT}0.933)`} style={{ userSelect: 'none' }}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.40, delay: prefersReduced ? 0 : 0.08 }}>
          DESIGN WITH · EVERYONE CONTRIBUTES
        </motion.text>

        {/* Shared canvas */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.50, delay: prefersReduced ? 0 : 0.04 }}>
          <rect x={CX - 3} y={CY - 3} width={CW + 6} height={CH + 6} rx={11}
            fill="none" stroke={`${CLAY}0.10)`} strokeWidth={7}
            style={{ filter: 'url(#ccw-est-glow)' }} />
          <rect x={CX} y={CY} width={CW} height={CH} rx={8}
            fill={`${CLAY}0.05)`}
            stroke={`${CLAY}0.30)`} strokeWidth={1.2} />
          <text x={CCX} y={CCY + 4} textAnchor="middle"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.16em"
            fill={`${CLAY_TEXT}0.824)`} style={{ userSelect: 'none' }}>
            SHARED CANVAS
          </text>
        </motion.g>

        {/* Contribution lines */}
        {LINES.map((l, i) => (
          <motion.line key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={l.clay ? `${CLAY}0.38)` : 'rgba(255,255,255,0.17)'}
            strokeWidth={0.9}
            strokeDasharray="4 3"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, delay: prefersReduced ? 0 : 0.40 + i * 0.07 }}
          />
        ))}

        {/* Contribution cards inside canvas */}
        {CARDS.map((c, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.32, delay: prefersReduced ? 0 : 0.58 + i * 0.06 }}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3}
              fill={c.clay ? `${CLAY}0.10)` : 'rgba(255,255,255,0.05)'}
              stroke={c.clay ? `${CLAY}0.48)` : 'rgba(255,255,255,0.18)'}
              strokeWidth={0.8}
              style={c.clay ? { filter: 'url(#ccw-est-glow-sm)' } : undefined} />
            <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={c.clay ? `${CLAY_TEXT}0.975)` : 'rgba(255,255,255,0.69)'}
              style={{ userSelect: 'none' }}>
              {c.label}
            </text>
          </motion.g>
        ))}

        {/* Participant nodes */}
        {[
          { ...P1, anchor: 'end' as const,   lx: P1.cx - PR - 4, ly: P1.cy, delay: 0.12 },
          { ...P2, anchor: 'end' as const,   lx: P2.cx - PR - 4, ly: P2.cy, delay: 0.21 },
          { ...P3, anchor: 'start' as const, lx: P3.cx + PR + 4, ly: P3.cy, delay: 0.18 },
          { ...P4, anchor: 'start' as const, lx: P4.cx + PR + 4, ly: P4.cy, delay: 0.27 },
        ].map((p, i) => (
          <motion.g key={`p${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.38, delay: prefersReduced ? 0 : p.delay }}>
            <circle cx={p.cx} cy={p.cy} r={PR}
              fill={`${CLAY}0.10)`} stroke={`${CLAY}0.55)`} strokeWidth={1.2} />
            <circle cx={p.cx} cy={p.cy} r={DR} fill={`${CLAY}0.80)`} />
            <text x={p.lx} y={p.ly + 1}
              textAnchor={p.anchor} dominantBaseline="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={`${CLAY_TEXT}0.912)`} style={{ userSelect: 'none' }}>
              PARTICIPANT
            </text>
          </motion.g>
        ))}

        {/* Team nodes */}
        {[
          { ...T1, delay: 0.48 },
          { ...T2, delay: 0.57 },
        ].map((t, i) => (
          <motion.g key={`t${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.38, delay: prefersReduced ? 0 : t.delay }}>
            <circle cx={t.cx} cy={t.cy} r={PR}
              fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.28)" strokeWidth={1.0} />
            <circle cx={t.cx} cy={t.cy} r={DR} fill="rgba(255,255,255,0.48)" />
            <text x={t.cx} y={t.cy + PR + 10} textAnchor="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill="rgba(255,255,255,0.65)" style={{ userSelect: 'none' }}>
              TEAM
            </text>
          </motion.g>
        ))}

        {/* Caption */}
        <motion.text x={CCX} y={SVG_H - 4} textAnchor="middle"
          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.58)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: prefersReduced ? 0 : 1.10 }}
          style={{ userSelect: 'none' }}>
          MAKING TOGETHER · REAL LANGUAGE AND PRIORITIES · SOLUTIONS THAT STICK
        </motion.text>
      </svg>
    </div>
  )
}
