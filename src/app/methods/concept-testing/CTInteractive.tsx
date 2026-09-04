'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700
const SVG_H = 280
const BAR_W  = 90
const BASE_Y = 240

const S_CX  = 195
const S_L   = 150
const S_H   = 152
const S_TOP = 88

const R_CX  = 435
const R_L   = 390
const TH_Y  = 162   // threshold line

// Two scenarios for revealed bar
const SCENARIOS = {
  below: { h: 58, pct: '28%', label: '× BELOW THRESHOLD', labelColor: `rgba(245,158,11,0.80)` },
  above: { h: 96, pct: '45%', label: '✓ CLEARS THRESHOLD', labelColor: `${PLUM_TEXT}0.95)` },
}

type El = 'stated' | 'revealed' | 'threshold' | null
type Scenario = 'below' | 'above'

const DETAILS: Record<NonNullable<El>, { heading: string; body: string; key: string }> = {
  stated: {
    heading: 'Stated Preference: What People Say',
    body: 'When you ask people whether they would be interested in a concept, the answer is almost always warm and encouraging, because agreeing is free, polite, and costs nothing. Stated preference is the signal that feels like validation and means very little. A concept test that measures only this learns almost nothing about real demand.',
    key: 'High stated interest is the default. It is not evidence of demand.',
  },
  revealed: {
    heading: 'Revealed Preference: What People Do',
    body: 'When you ask people to actually commit (sign up, provide payment details, pre-order, or try to use the concept) the warm agreement collapses into a much smaller, more honest number. Revealed preference is what people do when something real is on the line. It is the only honest signal of demand, and it is almost always far lower than the stated level.',
    key: 'Revealed commitment is the truth. Everything else is politeness.',
  },
  threshold: {
    heading: 'The Pre-Set Success Threshold: The Line Drawn First',
    body: 'Before testing, you define the specific level of revealed commitment the concept must reach to proceed. This is what makes the test honest. Set afterward, any warm result can be spun as success; set in advance, the threshold turns the result into a verdict the team cannot rationalize. The act of pre-committing the criterion, and sharing it with stakeholders before the test runs, is the discipline that separates a concept test from a confirmation exercise.',
    key: 'Set the threshold before you see the results, or the test has no power.',
  },
}

export default function CTInteractive() {
  const [active, setActive] = useState<El>(null)
  const [scenario, setScenario] = useState<Scenario>('below')
  const prefersReduced = useReducedMotion()

  const sc = SCENARIOS[scenario]
  const R_TOP = BASE_Y - sc.h

  const hitStyle = { cursor: 'pointer' } as const

  return (
    <div className="w-full">
      {/* Scenario toggle */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-[10px] font-semibold uppercase tracking-[1.8px]"
          style={{ color: `${PLUM_TEXT}0.95)` }}>Revealed outcome:</span>
        {(['below', 'above'] as Scenario[]).map(s => (
          <button key={s} onClick={() => setScenario(s)}
            className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-all"
            style={{
              background: scenario === s ? (s === 'below' ? 'rgba(245,158,11,0.14)' : `${PLUM}0.18)`) : 'rgba(255,255,255,0.05)',
              border: `1px solid ${scenario === s ? (s === 'below' ? 'rgba(245,158,11,0.38)' : `${PLUM}0.42)`) : 'rgba(255,255,255,0.12)'}`,
              color: scenario === s ? '#fff' : 'rgba(255,255,255,0.55)',
            }}
          >{s === 'below' ? '× Falls Below Threshold' : '✓ Clears Threshold'}</button>
        ))}
        <span className="text-[10px] text-white/55 ml-2">→ click bars and threshold to explore</span>
      </div>

      {/* SVG */}
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', maxHeight: 290 }}
        aria-label="Interactive stated-vs-revealed comparison with threshold" role="group">
        <defs>
          <filter id="ct-int-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Base axis */}
        <line x1={100} y1={BASE_Y} x2={580} y2={BASE_Y}
          stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

        {/* ── STATED BAR ───────────────────────────────────── */}
        {/* Track */}
        <rect x={S_L} y={S_TOP} width={BAR_W} height={S_H} rx={4}
          fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        {/* Active highlight ring */}
        {active === 'stated' && (
          <rect x={S_L - 3} y={S_TOP - 3} width={BAR_W + 6} height={S_H + 3} rx={6}
            fill="none" stroke={`${AMBER}0.60)`} strokeWidth={1.5} strokeDasharray="5 3" />
        )}
        {/* Bar */}
        <rect x={S_L} y={S_TOP} width={BAR_W} height={S_H} rx={4}
          fill={`${AMBER}${active === 'stated' ? '0.32)' : active !== null ? '0.12)' : '0.22)'}`}
          stroke={`${AMBER}${active === 'stated' ? '0.75)' : '0.50)'}`}
          strokeWidth={1.5}
          style={{ transition: 'fill 0.22s, stroke 0.22s' }}
          filter="url(#ct-int-glow)" />
        {/* Percentage */}
        <text x={S_CX} y={S_TOP - 10} textAnchor="middle"
          fill={`${AMBER}${active === 'stated' ? '1.0)' : '0.75)'}`}
          fontSize={13} fontWeight={600} fontFamily="monospace"
          style={{ transition: 'fill 0.22s' }}>76%</text>
        {/* Top label */}
        <text x={S_CX} y={36} textAnchor="middle"
          fill="rgba(255,255,255,0.60)" fontSize={11} fontWeight={600}
          letterSpacing={1.4} fontFamily="monospace">STATED</text>
        <text x={S_CX} y={54} textAnchor="middle"
          fill="rgba(255,255,255,0.64)" fontSize={11} fontFamily="monospace">What people say</text>
        {/* Bottom label */}
        <text x={S_CX} y={BASE_Y + 16} textAnchor="middle"
          fill={`${AMBER_TEXT}0.83)`} fontSize={11} fontFamily="monospace">Stated preference</text>
        {/* Hit area */}
        <rect x={S_L - 6} y={S_TOP - 16} width={BAR_W + 12} height={S_H + 30}
          fill="transparent" role="button" tabIndex={0} aria-label="Stated preference, click to learn more"
          style={hitStyle}
          onClick={() => setActive(a => a === 'stated' ? null : 'stated')}
          onKeyDown={e => e.key === 'Enter' && setActive(a => a === 'stated' ? null : 'stated')} />

        {/* ── REVEALED BAR ─────────────────────────────────── */}
        {/* Track */}
        <rect x={R_L} y={S_TOP} width={BAR_W} height={S_H} rx={4}
          fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        {/* Active highlight ring */}
        {active === 'revealed' && (
          <rect x={R_L - 3} y={R_TOP - 3} width={BAR_W + 6} height={sc.h + 3} rx={6}
            fill="none" stroke={`${PLUM}0.72)`} strokeWidth={1.5} strokeDasharray="5 3" />
        )}
        {/* Animated bar (changes with scenario) */}
        <motion.rect
          x={R_L} width={BAR_W} rx={4}
          fill={`${PLUM}${active === 'revealed' ? '0.42)' : active !== null ? '0.18)' : '0.30)'}`}
          stroke={`${PLUM}${active === 'revealed' ? '0.85)' : '0.60)'}`}
          strokeWidth={1.5}
          style={{ transition: 'fill 0.22s, stroke 0.22s' }}
          filter="url(#ct-int-glow)"
          animate={{ height: sc.h, y: R_TOP }}
          transition={{ duration: prefersReduced ? 0 : 0.42 }}
        />
        {/* Percentage - changes with scenario */}
        <motion.text
          x={R_CX} textAnchor="middle"
          fill={`${PLUM}${active === 'revealed' ? '1.0)' : '0.82)'}`}
          fontSize={13} fontWeight={600} fontFamily="monospace"
          style={{ transition: 'fill 0.22s' }}
          animate={{ y: R_TOP - 10 }}
          transition={{ duration: prefersReduced ? 0 : 0.42 }}
        >{sc.pct}</motion.text>
        {/* Verdict badge */}
        <motion.text
          x={R_CX} textAnchor="middle"
          fontSize={11} fontWeight={600} letterSpacing={0.3} fontFamily="monospace"
          fill={sc.labelColor}
          animate={{ y: R_TOP - 30 }}
          transition={{ duration: prefersReduced ? 0 : 0.42 }}
        >{sc.label}</motion.text>
        {/* Top label */}
        <text x={R_CX} y={36} textAnchor="middle"
          fill="rgba(255,255,255,0.60)" fontSize={11} fontWeight={600}
          letterSpacing={1.4} fontFamily="monospace">REVEALED</text>
        <text x={R_CX} y={54} textAnchor="middle"
          fill="rgba(255,255,255,0.64)" fontSize={11} fontFamily="monospace">What people do</text>
        {/* Bottom label */}
        <text x={R_CX} y={BASE_Y + 16} textAnchor="middle"
          fill={`${PLUM_TEXT}0.885)`} fontSize={11} fontFamily="monospace">Revealed commitment</text>
        {/* Hit area (full track height) */}
        <rect x={R_L - 6} y={S_TOP - 16} width={BAR_W + 12} height={S_H + 30}
          fill="transparent" role="button" tabIndex={0} aria-label="Revealed preference, click to learn more"
          style={hitStyle}
          onClick={() => setActive(a => a === 'revealed' ? null : 'revealed')}
          onKeyDown={e => e.key === 'Enter' && setActive(a => a === 'revealed' ? null : 'revealed')} />

        {/* ── THRESHOLD LINE ─────────────────────────────────── */}
        {/* Extended line */}
        <line x1={105} y1={TH_Y} x2={540} y2={TH_Y}
          stroke={`rgba(255,255,255,${active === 'threshold' ? '0.72' : '0.48'})`}
          strokeWidth={active === 'threshold' ? 2 : 1.5}
          strokeDasharray="6 4"
          style={{ transition: 'stroke 0.22s, stroke-width 0.22s' }} />
        {/* Threshold label */}
        <text x={530} y={TH_Y - 10}
          fill={`rgba(255,255,255,${active === 'threshold' ? '0.85' : '0.60'})`}
          fontSize={11} fontWeight={600} letterSpacing={0.6} fontFamily="monospace"
          style={{ transition: 'fill 0.22s' }}>SUCCESS THRESHOLD</text>
        <text x={530} y={TH_Y + 12}
          fill="rgba(255,255,255,0.65)" fontSize={11} fontFamily="monospace"
          letterSpacing={0.1}>SET IN ADVANCE · 40%</text>
        {/* Hit area for threshold */}
        <rect x={105} y={TH_Y - 8} width={435} height={16}
          fill="transparent" role="button" tabIndex={0} aria-label="Success threshold, click to learn more"
          style={hitStyle}
          onClick={() => setActive(a => a === 'threshold' ? null : 'threshold')}
          onKeyDown={e => e.key === 'Enter' && setActive(a => a === 'threshold' ? null : 'threshold')} />
      </svg>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="mt-4 rounded-lg p-5 border"
            style={{
              background: active === 'stated' ? 'rgba(245,158,11,0.07)'
                : active === 'revealed' ? `${PLUM}0.12)`
                : 'rgba(255,255,255,0.05)',
              borderColor: active === 'stated' ? 'rgba(245,158,11,0.25)'
                : active === 'revealed' ? `${PLUM}0.32)`
                : 'rgba(255,255,255,0.15)',
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[1.6px] mb-2"
              style={{
                color: active === 'stated' ? 'rgba(245,158,11,0.88)'
                  : active === 'revealed' ? `${PLUM_TEXT}0.95)`
                  : 'rgba(255,255,255,0.65)',
              }}>
              {DETAILS[active].heading}
            </p>
            <p className="text-sm leading-relaxed text-white/65 mb-3">
              {DETAILS[active].body}
            </p>
            <div className="flex items-start gap-2 rounded p-3"
              style={{
                background: active === 'stated' ? 'rgba(245,158,11,0.08)'
                  : active === 'revealed' ? `${PLUM}0.10)`
                  : 'rgba(255,255,255,0.05)',
              }}>
              <span className="text-[10px] font-semibold shrink-0 mt-0.5"
                style={{
                  color: active === 'stated' ? 'rgba(245,158,11,0.80)'
                    : active === 'revealed' ? `${PLUM_TEXT}0.90)`
                    : 'rgba(255,255,255,0.50)',
                }}>KEY</span>
              <p className="text-xs text-white/50 leading-relaxed">{DETAILS[active].key}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
