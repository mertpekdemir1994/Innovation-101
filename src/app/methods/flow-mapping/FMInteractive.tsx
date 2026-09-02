'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700
const SVG_H = 284

// ── Node geometry ─────────────────────────────────────────────────────────────
const EN_X=10, EN_Y=110, EN_W=76, EN_H=26
const EN_CX=EN_X+EN_W/2, EN_CY=EN_Y+EN_H/2

const FORK_CX=112, FORK_CY=123

const A_X=192, A_Y=22, A_W=90, A_H=26
const A_CX=A_X+A_W/2, A_CY=A_Y+A_H/2
const OA_X=490, OA_Y=22, OA_W=150, OA_H=26
const OA_CX=OA_X+OA_W/2, OA_CY=OA_Y+OA_H/2

const DE_X=348, DE_Y=62, DE_W=106, DE_H=26
const DE_CX=DE_X+DE_W/2, DE_CY=DE_Y+DE_H/2

const B_X=192, B_Y=110, B_W=90, B_H=26
const B_CX=B_X+B_W/2, B_CY=B_Y+B_H/2
const B2_X=352, B2_Y=110, B2_W=90, B2_H=26
const B2_CX=B2_X+B2_W/2, B2_CY=B2_Y+B2_H/2
const OB_X=490, OB_Y=110, OB_W=150, OB_H=26
const OB_CX=OB_X+OB_W/2, OB_CY=OB_Y+OB_H/2

const C_X=192, C_Y=200, C_W=90, C_H=26
const C_CX=C_X+C_W/2, C_CY=C_Y+C_H/2
const RD_X=352, RD_Y=200, RD_W=90, RD_H=26
const RD_CX=RD_X+RD_W/2

// ── Zone types ────────────────────────────────────────────────────────────────
type ZoneId = 'entry' | 'validate' | 'resolved' | 'deadEnd' | 'process' | 'approve' | 'complete' | 'loop' | 'escalate' | 'manual'

type ZoneInfo = {
  tag: string
  headline: string
  body: string
  isPathology?: boolean
}

const ZONES: Record<ZoneId, ZoneInfo> = {
  entry: {
    tag: 'ENTRY POINT',
    headline: 'Where everyone starts. Or should start.',
    body: 'The entry point is the moment a person enters the flow. In a well-designed product there should be one clear entry. In reality, flows often acquire multiple de facto entry points (one documented, several undocumented) each carrying real traffic. Mapping the entry point precisely is the first discipline: trace back until you find the actual start, not the start the spec describes.',
  },
  validate: {
    tag: 'DOCUMENTED STEP',
    headline: 'A step that appears in the official flow.',
    body: 'This step exists in the specification, in the process documentation, and on every diagram the team has ever drawn. It is the path the organization designed and believes people take. What the documented version does not show: that there is a branch off this step that leads to a dead end, and that the documented continuation assumes a clean success state that does not always hold.',
  },
  resolved: {
    tag: 'OUTCOME',
    headline: 'A successful exit from the flow.',
    body: 'The flow reaches resolution here. In a healthy flow there are a small number of distinct outcomes, clearly defined. The flow map reveals whether that is true of the real process, or whether what looks like a single outcome is in fact several undocumented variants, each reached via a different path, each behaving slightly differently, each its own maintenance burden.',
  },
  deadEnd: {
    tag: 'DEAD END: PATHOLOGY',
    headline: 'A branch that leads nowhere.',
    body: 'A person enters this branch and cannot progress. There is no next step, no fallback, no recovery path. The person stalls, abandons, or forces their way back by closing and restarting. Dead ends are invisible in the documented flow because nobody designed them: they are discovered only by tracing where each branch actually goes, not where it is supposed to go. They explain a category of abandonment that no one can point to a cause for, until the map shows the dead end.',
    isPathology: true,
  },
  process: {
    tag: 'DOCUMENTED STEP',
    headline: 'Another step in the official flow.',
    body: 'A step that appears in the documentation. What the documentation does not show: there is a loop back from a downstream step that routes people to this node again. The loop is common enough to appear on any real-world trace of this flow, and completely absent from every official description of it. People who encounter the loop appear, from the data, to be "slow", because the extra time they spend is invisible in aggregate.',
  },
  approve: {
    tag: 'DECISION POINT',
    headline: 'A fork in the official flow, with an undocumented return.',
    body: 'At this step the flow officially branches to its outcome. What the documented flow does not show: there is a path from here that feeds back to PROCESS, trapping users in a cycle. The cycle emerged because a downstream error state had no recovery path: the only available action was to route backward. Users who encounter the loop repeat work they already completed, often with no indication of why. This is not a user failure. It is a structural problem the flow creates.',
    isPathology: false,
  },
  complete: {
    tag: 'OUTCOME',
    headline: 'The main successful exit, reached via three different routes.',
    body: 'The main resolution of the flow. Three distinct routes lead here: the official documented path (PROCESS → APPROVE), the redundant accreted path (ESCALATE → MANUAL STEP), and any trace that survives the LOOP. Multiple routes to the same outcome mean multiple maintenance burdens, multiple sources of behavioral inconsistency, and multiple things that can silently break in different ways.',
  },
  loop: {
    tag: 'LOOP: PATHOLOGY',
    headline: 'A cycle that traps people without telling them why.',
    body: 'The loop is not in any documentation. It emerged because an error state at APPROVE had no forward recovery path: the only available action was to route back to PROCESS. People who encounter this loop repeat work they already did, sometimes repeatedly, with no indication of why they are being sent backward. In the analytics, their sessions appear as extended but not erroneous. In reality, the flow has trapped them. A person going round a loop is not failing to understand your product. Your product is failing to let them out.',
    isPathology: true,
  },
  escalate: {
    tag: 'UNINTENDED BRANCH: PATHOLOGY',
    headline: 'A fork nobody planned, which accreted over time.',
    body: 'This branch exists because of history, not design. An edge case surfaced. A workaround was created. The workaround became a permanent path. The workaround was never documented because it bypassed an official step that was not working correctly in that case. Nobody ever designed the fork; it accumulated. It now carries real traffic, receives its own implicit maintenance attention, behaves slightly differently from the official path, and appears on no diagram. Until this map.',
    isPathology: true,
  },
  manual: {
    tag: 'REDUNDANT PATH: PATHOLOGY',
    headline: 'A second route to the same outcome, maintained separately.',
    body: 'This step exists on a parallel path to COMPLETE: the same outcome reached by the main documented route (PROCESS → APPROVE). Nobody chose this duplication; it accumulated as the flow grew. Each redundant path is a separate maintenance burden, a separate source of inconsistency in the user experience, and a separate thing that can silently break independently of the main path. Identifying the redundant paths is what makes rationalization possible: you cannot simplify a flow whose full topology you have never seen.',
    isPathology: true,
  },
}

export default function FMInteractive() {
  const [active, setActive] = useState<ZoneId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const info = active ? ZONES[active] : null
  const isPathology = active ? ZONES[active].isPathology : false

  const nodeOpacity = (id: ZoneId) => {
    if (!active) return 1
    return active === id ? 1 : 0.25
  }

  const pathOpacity = (involved: boolean) => {
    if (!active) return 1
    return involved ? 1 : 0.15
  }

  return (
    <div>
      {/* SVG topology */}
      <div className="w-full select-none mb-8"
        aria-label="Interactive flow topology. Click any node or pathology to learn about it."
      >
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="fm-int-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feFlood floodColor={`${TEAL}0.50)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <marker id="fmi-arrow-t" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 Z" fill={`${TEAL}0.55)`} />
            </marker>
            <marker id="fmi-arrow-a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 Z" fill={`${AMBER}0.60)`} />
            </marker>
            <marker id="fmi-arrow-loop" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
              <path d="M0,0 L0,6 L6,3 Z" fill={`${AMBER}0.65)`} />
            </marker>
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8} fill={`${TEAL}0.03)`} />

          {/* ── Lines: documented paths ────────────────────────────── */}
          <motion.g animate={{ opacity: pathOpacity(active === 'entry' || active === 'validate' || active === 'resolved' || !active) }}
            transition={{ duration: 0.18 }}>
            {/* ENTRY → FORK */}
            <line x1={EN_CX + EN_W/2} y1={EN_CY} x2={FORK_CX} y2={FORK_CY}
              stroke={`${TEAL}0.45)`} strokeWidth={1.2} />
            {/* FORK → VALIDATE */}
            <line x1={FORK_CX} y1={FORK_CY} x2={A_X} y2={A_CY}
              stroke={`${TEAL}0.40)`} strokeWidth={1.2} markerEnd="url(#fmi-arrow-t)" />
            {/* VALIDATE → RESOLVED */}
            <line x1={A_CX + A_W/2} y1={A_CY} x2={OA_X} y2={OA_CY}
              stroke={`${TEAL}0.40)`} strokeWidth={1.2} markerEnd="url(#fmi-arrow-t)" />
          </motion.g>

          <motion.g animate={{ opacity: pathOpacity(active === 'entry' || active === 'process' || active === 'approve' || active === 'complete' || !active) }}
            transition={{ duration: 0.18 }}>
            {/* FORK → PROCESS */}
            <line x1={FORK_CX} y1={FORK_CY} x2={B_X} y2={B_CY}
              stroke={`${TEAL}0.40)`} strokeWidth={1.2} markerEnd="url(#fmi-arrow-t)" />
            {/* PROCESS → APPROVE */}
            <line x1={B_CX + B_W/2} y1={B_CY} x2={B2_X} y2={B2_CY}
              stroke={`${TEAL}0.40)`} strokeWidth={1.2} markerEnd="url(#fmi-arrow-t)" />
            {/* APPROVE → COMPLETE */}
            <line x1={B2_CX + B2_W/2} y1={B2_CY} x2={OB_X} y2={OB_CY}
              stroke={`${TEAL}0.40)`} strokeWidth={1.2} markerEnd="url(#fmi-arrow-t)" />
          </motion.g>

          {/* ── Lines: pathology paths ─────────────────────────────── */}
          <motion.g animate={{ opacity: pathOpacity(active === 'deadEnd' || active === 'validate' || !active) }}
            transition={{ duration: 0.18 }}>
            <line x1={A_CX} y1={A_CY + A_H/2} x2={DE_CX} y2={DE_Y}
              stroke={`${AMBER}0.45)`} strokeWidth={1} strokeDasharray="4 3"
              markerEnd="url(#fmi-arrow-a)" />
          </motion.g>

          <motion.g animate={{ opacity: pathOpacity(active === 'loop' || active === 'process' || active === 'approve' || !active) }}
            transition={{ duration: 0.18 }}>
            <path
              d={`M ${B2_CX},${B2_CY + B2_H/2} C ${B2_CX},${B2_CY + 58} ${B_CX},${B_CY + 58} ${B_CX},${B_CY + B_H/2}`}
              fill="none" stroke={`${AMBER}0.45)`} strokeWidth={1} strokeDasharray="4 3"
              markerEnd="url(#fmi-arrow-loop)"
            />
          </motion.g>

          <motion.g animate={{ opacity: pathOpacity(active === 'escalate' || active === 'entry' || !active) }}
            transition={{ duration: 0.18 }}>
            <line x1={FORK_CX} y1={FORK_CY} x2={C_X} y2={C_CY}
              stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
              markerEnd="url(#fmi-arrow-a)" />
          </motion.g>

          <motion.g animate={{ opacity: pathOpacity(active === 'escalate' || active === 'manual' || active === 'complete' || !active) }}
            transition={{ duration: 0.18 }}>
            <line x1={C_CX + C_W/2} y1={C_CY} x2={RD_X} y2={C_CY}
              stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
              markerEnd="url(#fmi-arrow-a)" />
            <line x1={RD_CX + RD_W/2} y1={C_CY} x2={OB_X + 20} y2={OB_CY + OB_H/2}
              stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
              markerEnd="url(#fmi-arrow-a)" />
          </motion.g>

          {/* ── FORK junction dot ──────────────────────────────────── */}
          <circle cx={FORK_CX} cy={FORK_CY} r={3.5} fill={`${TEAL}0.55)`} />

          {/* ── NODE: ENTRY ────────────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('entry') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'entry' ? null : 'entry')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'entry'} aria-label="SUBMIT, entry point"
          >
            <rect x={EN_X - 4} y={EN_Y - 4} width={EN_W + 8} height={EN_H + 8} rx={9} fill="transparent" />
            {active === 'entry' && (
              <rect x={EN_X - 2} y={EN_Y - 2} width={EN_W + 4} height={EN_H + 4} rx={7}
                fill="none" stroke={`${TEAL}0.60)`} strokeWidth={1.5} />
            )}
            <rect x={EN_X} y={EN_Y} width={EN_W} height={EN_H} rx={6}
              fill={active === 'entry' ? `${TEAL}0.22)` : `${TEAL}0.14)`}
              stroke={`${TEAL}${active === 'entry' ? '0.72' : '0.55'})`} strokeWidth={1.5}
              filter="url(#fm-int-glow)" style={{ transition: 'fill 0.18s, stroke 0.18s' }} />
            <text x={EN_CX} y={EN_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
              fill={`${TEAL_TEXT}0.983)`} style={{ userSelect: 'none' }}>SUBMIT</text>
          </motion.g>

          {/* ── NODE: VALIDATE ─────────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('validate') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'validate' ? null : 'validate')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'validate'} aria-label="VALIDATE step"
          >
            <rect x={A_X - 4} y={A_Y - 4} width={A_W + 8} height={A_H + 8} rx={8} fill="transparent" />
            {active === 'validate' && <rect x={A_X - 2} y={A_Y - 2} width={A_W + 4} height={A_H + 4} rx={6} fill="none" stroke={`${TEAL}0.55)`} strokeWidth={1.5} />}
            <rect x={A_X} y={A_Y} width={A_W} height={A_H} rx={5}
              fill={active === 'validate' ? `${TEAL}0.18)` : `${TEAL}0.10)`}
              stroke={`${TEAL}${active === 'validate' ? '0.65' : '0.48'})`} strokeWidth={1}
              style={{ transition: 'fill 0.18s' }} />
            <text x={A_CX} y={A_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={`${TEAL_TEXT}0.975)`} style={{ userSelect: 'none' }}>VALIDATE</text>
          </motion.g>

          {/* ── NODE: RESOLVED ─────────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('resolved') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'resolved' ? null : 'resolved')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'resolved'} aria-label="RESOLVED outcome"
          >
            <rect x={OA_X - 4} y={OA_Y - 4} width={OA_W + 8} height={OA_H + 8} rx={8} fill="transparent" />
            {active === 'resolved' && <rect x={OA_X - 2} y={OA_Y - 2} width={OA_W + 4} height={OA_H + 4} rx={6} fill="none" stroke={`${TEAL}0.55)`} strokeWidth={1.5} />}
            <rect x={OA_X} y={OA_Y} width={OA_W} height={OA_H} rx={5}
              fill={active === 'resolved' ? `${TEAL}0.22)` : `${TEAL}0.14)`}
              stroke={`${TEAL}${active === 'resolved' ? '0.68' : '0.52'})`} strokeWidth={1.2}
              style={{ transition: 'fill 0.18s' }} />
            <text x={OA_CX} y={OA_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={`${TEAL_TEXT}0.979)`} style={{ userSelect: 'none' }}>RESOLVED ✓</text>
          </motion.g>

          {/* ── NODE: DEAD END ─────────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('deadEnd') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'deadEnd' ? null : 'deadEnd')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'deadEnd'} aria-label="REVIEW QUEUE, dead end pathology"
          >
            <rect x={DE_X - 4} y={DE_Y - 4} width={DE_W + 8} height={DE_H + 8} rx={8} fill="transparent" />
            {active === 'deadEnd' && <rect x={DE_X - 2} y={DE_Y - 2} width={DE_W + 4} height={DE_H + 4} rx={6} fill="none" stroke={`${AMBER}0.55)`} strokeWidth={1.5} />}
            <rect x={DE_X} y={DE_Y} width={DE_W} height={DE_H} rx={5}
              fill={active === 'deadEnd' ? `${AMBER}0.12)` : `${AMBER}0.07)`}
              stroke={`${AMBER}${active === 'deadEnd' ? '0.65' : '0.42'})`} strokeWidth={1}
              style={{ transition: 'fill 0.18s' }} />
            <text x={DE_CX} y={DE_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
              fill={`${AMBER}0.85)`} style={{ userSelect: 'none' }}>REVIEW QUEUE</text>
            <text x={DE_X + DE_W + 10} y={DE_CY + 1}
              textAnchor="start" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" fill={`${AMBER}0.72)`}
              style={{ userSelect: 'none' }}>✕</text>
            <text x={DE_X + DE_W + 22} y={DE_CY + 1}
              textAnchor="start" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.05em"
              fill={`${AMBER_TEXT}0.861)`} style={{ userSelect: 'none' }}>DEAD END</text>
          </motion.g>

          {/* ── NODE: PROCESS ──────────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('process') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'process' ? null : 'process')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'process'} aria-label="PROCESS step"
          >
            <rect x={B_X - 4} y={B_Y - 4} width={B_W + 8} height={B_H + 8} rx={8} fill="transparent" />
            {active === 'process' && <rect x={B_X - 2} y={B_Y - 2} width={B_W + 4} height={B_H + 4} rx={6} fill="none" stroke={`${TEAL}0.55)`} strokeWidth={1.5} />}
            <rect x={B_X} y={B_Y} width={B_W} height={B_H} rx={5}
              fill={active === 'process' ? `${TEAL}0.18)` : `${TEAL}0.10)`}
              stroke={`${TEAL}${active === 'process' ? '0.65' : '0.48'})`} strokeWidth={1}
              style={{ transition: 'fill 0.18s' }} />
            <text x={B_CX} y={B_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={`${TEAL_TEXT}0.975)`} style={{ userSelect: 'none' }}>PROCESS</text>
          </motion.g>

          {/* ── NODE: APPROVE ──────────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('approve') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'approve' ? null : 'approve')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'approve'} aria-label="APPROVE decision point, also feeds a loop"
          >
            <rect x={B2_X - 4} y={B2_Y - 4} width={B2_W + 8} height={B2_H + 8} rx={8} fill="transparent" />
            {active === 'approve' && <rect x={B2_X - 2} y={B2_Y - 2} width={B2_W + 4} height={B2_H + 4} rx={6} fill="none" stroke={`${TEAL}0.55)`} strokeWidth={1.5} />}
            <rect x={B2_X} y={B2_Y} width={B2_W} height={B2_H} rx={5}
              fill={active === 'approve' ? `${TEAL}0.18)` : `${TEAL}0.10)`}
              stroke={`${TEAL}${active === 'approve' ? '0.65' : '0.48'})`} strokeWidth={1}
              style={{ transition: 'fill 0.18s' }} />
            <text x={B2_CX} y={B2_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={`${TEAL_TEXT}0.975)`} style={{ userSelect: 'none' }}>APPROVE</text>
          </motion.g>

          {/* ── NODE: COMPLETE ─────────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('complete') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'complete' ? null : 'complete')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'complete'} aria-label="COMPLETE outcome, reached via multiple routes"
          >
            <rect x={OB_X - 4} y={OB_Y - 4} width={OB_W + 8} height={OB_H + 8} rx={8} fill="transparent" />
            {active === 'complete' && <rect x={OB_X - 2} y={OB_Y - 2} width={OB_W + 4} height={OB_H + 4} rx={6} fill="none" stroke={`${TEAL}0.55)`} strokeWidth={1.5} />}
            <rect x={OB_X} y={OB_Y} width={OB_W} height={OB_H} rx={5}
              fill={active === 'complete' ? `${TEAL}0.22)` : `${TEAL}0.14)`}
              stroke={`${TEAL}${active === 'complete' ? '0.68' : '0.52'})`} strokeWidth={1.2}
              style={{ transition: 'fill 0.18s' }} />
            <text x={OB_CX} y={OB_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={`${TEAL_TEXT}0.979)`} style={{ userSelect: 'none' }}>COMPLETE ✓</text>
          </motion.g>

          {/* ── LOOP hit area + label ──────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('loop') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'loop' ? null : 'loop')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'loop'} aria-label="Loop, a cycle that traps people"
          >
            <path
              d={`M ${B2_CX},${B2_CY + B2_H/2} C ${B2_CX},${B2_CY + 58} ${B_CX},${B_CY + 58} ${B_CX},${B_CY + B_H/2}`}
              fill="none"
              stroke={active === 'loop' ? `${AMBER}0.70)` : `${AMBER}0.45)`}
              strokeWidth={active === 'loop' ? 1.5 : 1}
              strokeDasharray="4 3"
              markerEnd="url(#fmi-arrow-loop)"
              style={{ transition: 'stroke 0.18s' }}
            />
            {/* Loop label: also serves as hit target */}
            <rect x={(B_CX + B2_CX)/2 - 28} y={B_CY + 62} width={56} height={18} rx={4} fill="transparent" />
            <text x={(B_CX + B2_CX) / 2} y={B_CY + 73}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={active === 'loop' ? `${AMBER}0.88)` : `${AMBER_TEXT}0.876)`}
              style={{ userSelect: 'none', transition: 'fill 0.18s' }}>↺ LOOP</text>
          </motion.g>

          {/* ── NODE: ESCALATE ─────────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('escalate') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'escalate' ? null : 'escalate')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'escalate'} aria-label="ESCALATE, unintended branch"
          >
            <rect x={C_X - 4} y={C_Y - 4} width={C_W + 8} height={C_H + 8} rx={8} fill="transparent" />
            {active === 'escalate' && <rect x={C_X - 2} y={C_Y - 2} width={C_W + 4} height={C_H + 4} rx={6} fill="none" stroke={`${AMBER}0.55)`} strokeWidth={1.5} />}
            <rect x={C_X} y={C_Y} width={C_W} height={C_H} rx={5}
              fill={active === 'escalate' ? `${AMBER}0.12)` : `${AMBER}0.07)`}
              stroke={`${AMBER}${active === 'escalate' ? '0.62' : '0.38'})`} strokeWidth={1}
              strokeDasharray="5 3" style={{ transition: 'fill 0.18s' }} />
            <text x={C_CX} y={C_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
              fill={`${AMBER}0.82)`} style={{ userSelect: 'none' }}>ESCALATE</text>
            {/* Unintended label */}
            <text x={C_X + 4} y={C_Y - 8}
              textAnchor="start" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
              fill={`${AMBER_TEXT}0.839)`} style={{ userSelect: 'none' }}>⊘ UNINTENDED</text>
          </motion.g>

          {/* ── NODE: MANUAL STEP ──────────────────────────────────── */}
          <motion.g
            animate={{ opacity: nodeOpacity('manual') }}
            transition={{ duration: 0.18 }}
            onClick={() => setActive(active === 'manual' ? null : 'manual')}
            style={{ cursor: 'pointer' }}
            role="button" aria-pressed={active === 'manual'} aria-label="MANUAL STEP, redundant path pathology"
          >
            <rect x={RD_X - 4} y={RD_Y - 4} width={RD_W + 8} height={RD_H + 8} rx={8} fill="transparent" />
            {active === 'manual' && <rect x={RD_X - 2} y={RD_Y - 2} width={RD_W + 4} height={RD_H + 4} rx={6} fill="none" stroke={`${AMBER}0.55)`} strokeWidth={1.5} />}
            <rect x={RD_X} y={RD_Y} width={RD_W} height={RD_H} rx={5}
              fill={active === 'manual' ? `${AMBER}0.12)` : `${AMBER}0.07)`}
              stroke={`${AMBER}${active === 'manual' ? '0.62' : '0.38'})`} strokeWidth={1}
              strokeDasharray="5 3" style={{ transition: 'fill 0.18s' }} />
            <text x={RD_CX} y={C_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.01em"
              fill={`${AMBER}0.82)`} style={{ userSelect: 'none' }}>MANUAL STEP</text>
            {/* Redundant label */}
            <text x={(RD_CX + RD_W/2 + OB_X + 20) / 2 + 10} y={(C_CY + OB_CY + OB_H/2) / 2}
              textAnchor="start" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
              fill={`${AMBER_TEXT}0.83)`} style={{ userSelect: 'none' }}>≡ REDUNDANT</text>
          </motion.g>

          {/* Tap cue */}
          {!active && (
            <text x={SVG_W / 2} y={SVG_H - 7}
              textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
              fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
              tap any node or pathology
            </text>
          )}
        </svg>
      </div>

      {/* Zone legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.entries(ZONES) as [ZoneId, ZoneInfo][]).map(([id, z]) => (
          <button key={id}
            onClick={() => setActive(active === id ? null : id)}
            className="rounded-full px-3 py-1 text-xs font-semibold transition-all"
            style={{
              background: active === id
                ? (z.isPathology ? `${AMBER}0.15)` : `${TEAL}0.15)`)
                : 'transparent',
              border: `1px solid ${z.isPathology ? `${AMBER}0.35)` : `${TEAL}0.30)`}`,
              color: z.isPathology ? `${AMBER}0.85)` : `${TEAL_TEXT}0.95)`,
            }}
            aria-pressed={active === id}
          >
            {z.tag}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {info && (
          <motion.div key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease }}
            className="rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${isPathology ? `${AMBER}0.28)` : `${TEAL}0.25)`}`,
              background: `${isPathology ? `${AMBER}0.04)` : `${TEAL}0.06)`}`,
            }}
          >
            <div className="px-6 pt-5 pb-4">
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{
                  fontSize: 'var(--text-2xs)',
                  color: isPathology ? `${AMBER}0.80)` : `${TEAL_TEXT}0.90)`,
                }}
              >{info.tag}</p>
              <p className="font-semibold mb-3"
                style={{ fontSize: 'var(--text-lg)', color: '#FAFAFA', lineHeight: 1.2 }}
              >{info.headline}</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.62)', lineHeight: 'var(--leading-relaxed)' }}>
                {info.body}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p className="text-center" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', marginTop: '1rem' }}>
          Select a node, a pathology, or a loop to see what it reveals
        </p>
      )}
    </div>
  )
}
