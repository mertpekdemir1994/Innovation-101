'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const AMBER = 'rgba(245,158,11,'

type Intervention = 'none' | 'symptom' | 'leverage'

const SVG_W = 700, SVG_H = 240
const PRESSURE_CX = 117, PRESSURE_CY = 55
const DEBT_CX = 117, DEBT_CY = 206
const DEFECT_CX = 464, DEFECT_CY = 55
const TESTING_CX = 564, TESTING_CY = 206

const R_LEFT_ARC  = `M 78,68 C 16,112 16,172 78,192`
const R_RIGHT_ARC = `M 206,192 C 264,172 264,112 206,68`
const B_RIGHT_ARC = `M 536,60 C 590,102 590,178 554,192`
const B_LEFT_ARC  = `M 506,192 C 490,175 486,95 484,60`
const CROSS_PATH  = `M 206,55 L 392,55`

export default function SMInteractive() {
  const [intervention, setIntervention] = useState<Intervention>('none')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const isSymptom  = intervention === 'symptom'
  const isLeverage = intervention === 'leverage'

  // Opacity helpers based on intervention state
  const rLoopOp = isLeverage ? 0.25 : isSymptom ? 0.30 : 0.72
  const bLoopOp = isSymptom ? 0.90 : isLeverage ? 0.22 : 0.55
  const pressureOp = isLeverage ? 0.30 : isSymptom ? 0.55 : 0.90
  const debtOp = isLeverage ? 0.20 : isSymptom ? 0.50 : 0.90
  const defectOp = isLeverage ? 0.30 : isSymptom ? 0.90 : 0.90
  const testingOp = isSymptom ? 0.90 : isLeverage ? 0.22 : 0.82
  const crossOp = isLeverage ? 0.15 : 0.42

  return (
    <div className="w-full space-y-6">

      {/* Intervention buttons */}
      <div>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.55)` }}>
          Choose where to intervene in the system
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setIntervention(intervention === 'symptom' ? 'none' : 'symptom')}
            aria-pressed={isSymptom}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: isSymptom ? `${AMBER}0.18)` : 'transparent',
              color: isSymptom ? `${AMBER}0.90)` : `${AMBER}0.58)`,
              border: `1.5px solid ${isSymptom ? `${AMBER}0.50)` : `${AMBER}0.25)`}`,
            }}>
            Fix the symptom — add more testing
          </button>
          <button
            onClick={() => setIntervention(intervention === 'leverage' ? 'none' : 'leverage')}
            aria-pressed={isLeverage}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: isLeverage ? `${TEAL}0.80)` : 'transparent',
              color: isLeverage ? '#fff' : `${TEAL}0.65)`,
              border: `1.5px solid ${isLeverage ? `${TEAL}0.70)` : `${TEAL}0.28)`}`,
            }}>
            Find the leverage point
          </button>
          {intervention !== 'none' && (
            <button
              onClick={() => setIntervention('none')}
              className="rounded-full px-4 py-2 text-sm"
              style={{
                color: 'rgba(255,255,255,0.28)',
                border: '1.5px solid rgba(255,255,255,0.12)',
              }}>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* SVG */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Interactive causal loop diagram. Select an intervention above to see what happens."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="sm-int-teal-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${TEAL}0.65)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sm-int-amber-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${AMBER}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="sm-int-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${TEAL}0.70)`} />
          </marker>
          <marker id="sm-int-arr-neg" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${AMBER}0.62)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* DELIVERY PRESSURE */}
        <motion.g animate={{ opacity: pressureOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <rect x={28} y={41} width={178} height={27} rx={3}
            fill={isLeverage ? `${TEAL}0.22)` : `${TEAL}0.10)`}
            stroke={`${TEAL}${isLeverage ? '0.90)' : '0.55)'}`}
            strokeWidth={isLeverage ? 2.0 : 1.4}
            filter={isLeverage ? 'url(#sm-int-teal-glow)' : undefined} />
          <text x={PRESSURE_CX} y={PRESSURE_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${TEAL}0.88)`} style={{ userSelect: 'none' }}>
            DELIVERY PRESSURE
          </text>
          {isLeverage && (
            <text x={PRESSURE_CX} y={PRESSURE_CY - 14} textAnchor="middle"
              fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${TEAL}0.80)`} style={{ userSelect: 'none' }}>
              ⚡ LEVERAGE POINT
            </text>
          )}
        </motion.g>

        {/* TECHNICAL DEBT */}
        <motion.g animate={{ opacity: debtOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <rect x={28} y={192} width={178} height={27} rx={3}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.55)`} strokeWidth={1.4} />
          <text x={DEBT_CX} y={DEBT_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${TEAL}0.88)`} style={{ userSelect: 'none' }}>
            TECHNICAL DEBT
          </text>
        </motion.g>

        {/* DEFECT RATE */}
        <motion.g animate={{ opacity: defectOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <rect x={390} y={41} width={148} height={27} rx={3}
            fill={isSymptom ? `${AMBER}0.14)` : `${AMBER}0.07)`}
            stroke={`${AMBER}${isSymptom ? '0.80)' : '0.55)'}`}
            strokeWidth={isSymptom ? 1.8 : 1.4}
            filter={isSymptom ? 'url(#sm-int-amber-glow)' : undefined} />
          <text x={DEFECT_CX} y={DEFECT_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${AMBER}0.85)`} style={{ userSelect: 'none' }}>
            DEFECT RATE
          </text>
          <text x={DEFECT_CX} y={DEFECT_CY + 14} textAnchor="middle"
            fontSize="3.4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${AMBER}0.50)`} style={{ userSelect: 'none' }}>
            THE SYMPTOM
          </text>
        </motion.g>

        {/* TESTING */}
        <motion.g animate={{ opacity: testingOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <rect x={500} y={192} width={148} height={27} rx={3}
            fill={isSymptom ? `${TEAL}0.20)` : `${TEAL}0.08)`}
            stroke={`${TEAL}${isSymptom ? '0.88)' : '0.42)'}`}
            strokeWidth={isSymptom ? 2.0 : 1.2}
            filter={isSymptom ? 'url(#sm-int-teal-glow)' : undefined} />
          <text x={TESTING_CX} y={TESTING_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${TEAL}0.78)`} style={{ userSelect: 'none' }}>
            TESTING
          </text>
          {isSymptom && (
            <text x={TESTING_CX} y={TESTING_CY - 14} textAnchor="middle"
              fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${TEAL}0.75)`} style={{ userSelect: 'none' }}>
              ↑ MORE TESTING
            </text>
          )}
        </motion.g>

        {/* REINFORCING LOOP arcs */}
        <motion.g animate={{ opacity: rLoopOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <path d={R_LEFT_ARC} fill="none"
            stroke={`${TEAL}0.70)`} strokeWidth={1.8} markerEnd="url(#sm-int-arr)" />
          <path d={R_RIGHT_ARC} fill="none"
            stroke={`${TEAL}0.70)`} strokeWidth={1.8} markerEnd="url(#sm-int-arr)" />
          <text x={117} y={126} textAnchor="middle"
            fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="600"
            fill={`${TEAL}0.45)`} style={{ userSelect: 'none' }}>R1</text>
          <text x={117} y={137} textAnchor="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.30)`} style={{ userSelect: 'none' }}>REINFORCING</text>
        </motion.g>

        {/* BALANCING LOOP arcs */}
        <motion.g animate={{ opacity: bLoopOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <path d={B_RIGHT_ARC} fill="none"
            stroke={`${TEAL}0.55)`} strokeWidth={1.5} markerEnd="url(#sm-int-arr)" />
          <path d={B_LEFT_ARC} fill="none"
            stroke={`${AMBER}0.50)`} strokeWidth={1.5} strokeDasharray="5 3"
            markerEnd="url(#sm-int-arr-neg)" />
          <text x={516} y={120} textAnchor="middle"
            fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="600"
            fill={`${TEAL}0.35)`} style={{ userSelect: 'none' }}>B1</text>
          <text x={516} y={131} textAnchor="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.25)`} style={{ userSelect: 'none' }}>BALANCING</text>
        </motion.g>

        {/* CROSS-ARROW with delay */}
        <motion.g animate={{ opacity: crossOp }}
          transition={{ duration: prefersReduced ? 0 : 0.40, ease }}>
          <path d={CROSS_PATH} fill="none"
            stroke={`${AMBER}0.40)`} strokeWidth={1.2} strokeDasharray="4 3"
            markerEnd="url(#sm-int-arr-neg)" />
          <text x={299} y={47} textAnchor="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`${AMBER}0.55)`} style={{ userSelect: 'none' }}>⏱ DELAY</text>
        </motion.g>

        {/* Symptom intervention: ABSORBED annotation */}
        <AnimatePresence>
          {isSymptom && (
            <motion.g
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, delay: prefersReduced ? 0 : 0.35 }}>
              <text x={516} y={160} textAnchor="middle"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
                ↺ ABSORBED
              </text>
              <text x={516} y={172} textAnchor="middle"
                fontSize="3.4" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${AMBER}0.55)`} style={{ userSelect: 'none' }}>
                B1 restores the system
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Leverage intervention: SHIFTED annotation */}
        <AnimatePresence>
          {isLeverage && (
            <motion.g
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, delay: prefersReduced ? 0 : 0.35 }}>
              <text x={117} y={160} textAnchor="middle"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                fill={`${TEAL}0.85)`} style={{ userSelect: 'none' }}>
                SYSTEM SHIFTS
              </text>
              <text x={117} y={172} textAnchor="middle"
                fontSize="3.4" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${TEAL}0.58)`} style={{ userSelect: 'none' }}>
                R1 loop weakens
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Result panel */}
      <AnimatePresence mode="wait">
        {intervention === 'none' && (
          <motion.div key="none"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.20 }}
            className="rounded-lg p-5"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
              Select an intervention above. One is what most organizations do. One is what actually changes the system.
            </p>
          </motion.div>
        )}

        {isSymptom && (
          <motion.div key="symptom"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="rounded-lg p-5 space-y-3"
            style={{ background: `${AMBER}0.05)`, border: `1px solid ${AMBER}0.22)` }}>
            <p className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.72)` }}>
              Result: the system put it back
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              More testing was added. DEFECT RATE fell. For a quarter — exactly as it had the previous
              three times, under three different leaders. Then the BALANCING LOOP (B1) absorbed the
              intervention and restored the system. The REINFORCING LOOP (R1) continued running
              underneath, accumulating technical debt via the shortcuts driven by delivery pressure.
            </p>
            <div className="rounded p-3"
              style={{ background: `${AMBER}0.06)`, borderLeft: `2px solid ${AMBER}0.40)` }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                This is <strong>policy resistance</strong>. The harder you push on the symptom, the harder
                the balancing loop pushes back. The intervention consumed time (increasing delivery pressure),
                which accelerated the reinforcing loop, which restored the defects. Pushing harder is not a
                strategy. It is a treadmill.
              </p>
            </div>
          </motion.div>
        )}

        {isLeverage && (
          <motion.div key="leverage"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="rounded-lg p-5 space-y-3"
            style={{ background: `${TEAL}0.05)`, border: `1px solid ${TEAL}0.22)` }}>
            <p className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.75)` }}>
              Result: the whole system shifted
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              The structural change was to <strong>how work was committed to</strong> — not how it was
              tested. By reducing the delivery pressure at its source, the reinforcing loop (R1)
              weakened: fewer shortcuts, less technical debt accumulation, no acceleration. DEFECT RATE
              fell and stayed down, because the mechanism generating the defects had changed, not just
              the rate at which they were caught.
            </p>
            <div className="rounded p-3"
              style={{ background: `${TEAL}0.06)`, borderLeft: `2px solid ${TEAL}0.40)` }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The leverage point was nowhere near the symptom. It looked like doing nothing about quality.
                Which is precisely why nobody had tried it for two years. The structure produces the
                behavior — change the structure, and the behavior changes with it.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
