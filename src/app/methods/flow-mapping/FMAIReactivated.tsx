'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL   = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700
const SVG_H = 276

// ── Node geometry (same as Establishing and Interactive) ─────────────────────
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

type Mode = 'human' | 'ai'

export default function FMAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const isAI = mode === 'ai'

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.08)' }}
          role="group" aria-label="Mode toggle"
        >
          {(['Human Research', 'With AI'] as const).map(label => {
            const ai = label === 'With AI'
            const on = ai ? isAI : !isAI
            return (
              <button key={label}
                onClick={() => setMode(ai ? 'ai' : 'human')}
                className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  background: on ? (ai ? `${INDIGO}0.80)` : 'rgba(255,255,255,0.90)') : 'transparent',
                  color: on ? (ai ? '#fff' : '#111') : 'rgba(255,255,255,0.45)',
                }}
                aria-pressed={on}
              >{label}</button>
            )
          })}
        </div>
      </div>

      {/* SVG: same topology, pathologies fade in AI mode */}
      <div className="w-full select-none mb-10" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="fm-ai-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feFlood floodColor={`${isAI ? INDIGO : TEAL}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <marker id="fmai-arrow-t" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 Z" fill={isAI ? `${INDIGO}0.55)` : `${TEAL}0.55)`} />
            </marker>
            <marker id="fmai-arrow-a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 Z" fill={`${AMBER}0.50)`} />
            </marker>
            <marker id="fmai-arrow-loop" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
              <path d="M0,0 L0,6 L6,3 Z" fill={`${AMBER}0.50)`} />
            </marker>
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8}
            fill={isAI ? `${INDIGO}0.04)` : `${TEAL}0.03)`}
            style={{ transition: 'fill 0.40s' }}
          />

          {/* ── Documented paths (stay visible / go INDIGO in AI mode) ── */}
          <motion.g animate={{ opacity: 1 }} transition={{ duration: 0.40 }}>
            {/* ENTRY → FORK */}
            <line x1={EN_CX + EN_W/2} y1={EN_CY} x2={FORK_CX} y2={FORK_CY}
              stroke={isAI ? `${INDIGO}0.45)` : `${TEAL}0.45)`} strokeWidth={1.2}
              style={{ transition: 'stroke 0.40s' }}
            />
            {/* Fork → VALIDATE */}
            <line x1={FORK_CX} y1={FORK_CY} x2={A_X} y2={A_CY}
              stroke={isAI ? `${INDIGO}0.45)` : `${TEAL}0.40)`} strokeWidth={1.2}
              markerEnd="url(#fmai-arrow-t)"
              style={{ transition: 'stroke 0.40s' }}
            />
            {/* VALIDATE → RESOLVED */}
            <line x1={A_CX + A_W/2} y1={A_CY} x2={OA_X} y2={OA_CY}
              stroke={isAI ? `${INDIGO}0.45)` : `${TEAL}0.40)`} strokeWidth={1.2}
              markerEnd="url(#fmai-arrow-t)"
              style={{ transition: 'stroke 0.40s' }}
            />
            {/* Fork → PROCESS */}
            <line x1={FORK_CX} y1={FORK_CY} x2={B_X} y2={B_CY}
              stroke={isAI ? `${INDIGO}0.45)` : `${TEAL}0.40)`} strokeWidth={1.2}
              markerEnd="url(#fmai-arrow-t)"
              style={{ transition: 'stroke 0.40s' }}
            />
            {/* PROCESS → APPROVE */}
            <line x1={B_CX + B_W/2} y1={B_CY} x2={B2_X} y2={B2_CY}
              stroke={isAI ? `${INDIGO}0.45)` : `${TEAL}0.40)`} strokeWidth={1.2}
              markerEnd="url(#fmai-arrow-t)"
              style={{ transition: 'stroke 0.40s' }}
            />
            {/* APPROVE → COMPLETE */}
            <line x1={B2_CX + B2_W/2} y1={B2_CY} x2={OB_X} y2={OB_CY}
              stroke={isAI ? `${INDIGO}0.45)` : `${TEAL}0.40)`} strokeWidth={1.2}
              markerEnd="url(#fmai-arrow-t)"
              style={{ transition: 'stroke 0.40s' }}
            />
          </motion.g>

          {/* ── PATHOLOGY paths (fade in AI mode) ─────────────────── */}
          <motion.g
            animate={{ opacity: isAI ? 0.07 : 1 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.45, ease }}
          >
            {/* VALIDATE → DEAD END */}
            <line x1={A_CX} y1={A_CY + A_H/2} x2={DE_CX} y2={DE_Y}
              stroke={`${AMBER}0.45)`} strokeWidth={1} strokeDasharray="4 3"
              markerEnd="url(#fmai-arrow-a)" />
            <rect x={DE_X} y={DE_Y} width={DE_W} height={DE_H} rx={5}
              fill={`${AMBER}0.07)`} stroke={`${AMBER}0.42)`} strokeWidth={1} />
            <text x={DE_CX} y={DE_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={`${AMBER}0.82)`} style={{ userSelect: 'none' }}>REVIEW QUEUE</text>
            <text x={DE_X + DE_W + 8} y={DE_CY + 1}
              textAnchor="start" dominantBaseline="middle"
              fontSize="6" fontFamily="var(--font-mono)"
              fill={`${AMBER}0.72)`} style={{ userSelect: 'none' }}>✕</text>

            {/* LOOP arc */}
            <path
              d={`M ${B2_CX},${B2_CY + B2_H/2} C ${B2_CX},${B2_CY + 58} ${B_CX},${B_CY + 58} ${B_CX},${B_CY + B_H/2}`}
              fill="none" stroke={`${AMBER}0.45)`} strokeWidth={1} strokeDasharray="4 3"
              markerEnd="url(#fmai-arrow-loop)"
            />
            <text x={(B_CX + B2_CX) / 2} y={B_CY + 73}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${AMBER_TEXT}0.876)`} style={{ userSelect: 'none' }}>↺ LOOP</text>

            {/* FORK → ESCALATE */}
            <line x1={FORK_CX} y1={FORK_CY} x2={C_X} y2={C_CY}
              stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
              markerEnd="url(#fmai-arrow-a)" />
            <rect x={C_X} y={C_Y} width={C_W} height={C_H} rx={5}
              fill={`${AMBER}0.07)`} stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3" />
            <text x={C_CX} y={C_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>ESCALATE</text>

            {/* ESCALATE → MANUAL STEP → COMPLETE */}
            <line x1={C_CX + C_W/2} y1={C_CY} x2={RD_X} y2={C_CY}
              stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
              markerEnd="url(#fmai-arrow-a)" />
            <rect x={RD_X} y={RD_Y} width={RD_W} height={RD_H} rx={5}
              fill={`${AMBER}0.07)`} stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3" />
            <text x={RD_CX} y={C_CY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>MANUAL STEP</text>
            <line x1={RD_CX + RD_W/2} y1={C_CY} x2={OB_X + 20} y2={OB_CY + OB_H/2}
              stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
              markerEnd="url(#fmai-arrow-a)" />
          </motion.g>

          {/* ── Documented nodes (teal → indigo in AI mode) ─────────── */}
          {/* ENTRY */}
          <rect x={EN_X} y={EN_Y} width={EN_W} height={EN_H} rx={6}
            fill={isAI ? `${INDIGO}0.14)` : `${TEAL}0.14)`}
            stroke={isAI ? `${INDIGO}0.60)` : `${TEAL}0.60)`} strokeWidth={1.5}
            filter="url(#fm-ai-glow)" style={{ transition: 'fill 0.40s, stroke 0.40s' }}
          />
          <text x={EN_CX} y={EN_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
            fill={isAI ? `${INDIGO_TEXT}0.983)` : `${TEAL_TEXT}0.983)`}
            style={{ userSelect: 'none', transition: 'fill 0.40s' }}>SUBMIT</text>

          {/* Fork dot */}
          <circle cx={FORK_CX} cy={FORK_CY} r={3.5}
            fill={isAI ? `${INDIGO}0.55)` : `${TEAL}0.55)`}
            style={{ transition: 'fill 0.40s' }}
          />

          {/* VALIDATE */}
          <rect x={A_X} y={A_Y} width={A_W} height={A_H} rx={5}
            fill={isAI ? `${INDIGO}0.10)` : `${TEAL}0.10)`}
            stroke={isAI ? `${INDIGO}0.50)` : `${TEAL}0.50)`} strokeWidth={1}
            style={{ transition: 'fill 0.40s, stroke 0.40s' }}
          />
          <text x={A_CX} y={A_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO_TEXT}0.975)` : `${TEAL_TEXT}0.975)`}
            style={{ userSelect: 'none', transition: 'fill 0.40s' }}>VALIDATE</text>

          {/* RESOLVED */}
          <rect x={OA_X} y={OA_Y} width={OA_W} height={OA_H} rx={5}
            fill={isAI ? `${INDIGO}0.14)` : `${TEAL}0.14)`}
            stroke={isAI ? `${INDIGO}0.55)` : `${TEAL}0.55)`} strokeWidth={1.2}
            style={{ transition: 'fill 0.40s, stroke 0.40s' }}
          />
          <text x={OA_CX} y={OA_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO_TEXT}0.979)` : `${TEAL_TEXT}0.979)`}
            style={{ userSelect: 'none', transition: 'fill 0.40s' }}>RESOLVED ✓</text>

          {/* PROCESS */}
          <rect x={B_X} y={B_Y} width={B_W} height={B_H} rx={5}
            fill={isAI ? `${INDIGO}0.10)` : `${TEAL}0.10)`}
            stroke={isAI ? `${INDIGO}0.50)` : `${TEAL}0.50)`} strokeWidth={1}
            style={{ transition: 'fill 0.40s, stroke 0.40s' }}
          />
          <text x={B_CX} y={B_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO_TEXT}0.975)` : `${TEAL_TEXT}0.975)`}
            style={{ userSelect: 'none', transition: 'fill 0.40s' }}>PROCESS</text>

          {/* APPROVE */}
          <rect x={B2_X} y={B2_Y} width={B2_W} height={B2_H} rx={5}
            fill={isAI ? `${INDIGO}0.10)` : `${TEAL}0.10)`}
            stroke={isAI ? `${INDIGO}0.50)` : `${TEAL}0.50)`} strokeWidth={1}
            style={{ transition: 'fill 0.40s, stroke 0.40s' }}
          />
          <text x={B2_CX} y={B2_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO_TEXT}0.975)` : `${TEAL_TEXT}0.975)`}
            style={{ userSelect: 'none', transition: 'fill 0.40s' }}>APPROVE</text>

          {/* COMPLETE */}
          <rect x={OB_X} y={OB_Y} width={OB_W} height={OB_H} rx={5}
            fill={isAI ? `${INDIGO}0.14)` : `${TEAL}0.14)`}
            stroke={isAI ? `${INDIGO}0.55)` : `${TEAL}0.55)`} strokeWidth={1.2}
            style={{ transition: 'fill 0.40s, stroke 0.40s' }}
          />
          <text x={OB_CX} y={OB_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO_TEXT}0.979)` : `${TEAL_TEXT}0.979)`}
            style={{ userSelect: 'none', transition: 'fill 0.40s' }}>COMPLETE ✓</text>

          {/* ── AI mode overlays ─────────────────────────────────────── */}
          <AnimatePresence>
            {isAI && (
              <>
                {/* "AI DRAWS THIS FAST" badge over documented flow area */}
                <motion.text key="ai-draws"
                  x={350} y={12}
                  textAnchor="middle" dominantBaseline="hanging"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`${INDIGO}0.60)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30 }}
                >AI DRAWS THIS FAST, LOOKS COMPLETE</motion.text>

                {/* "INVISIBLE TO AI" badge over pathology area */}
                <motion.text key="ai-invisible"
                  x={280} y={DE_CY + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${AMBER}0.38)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30, delay: 0.10 }}
                >INVISIBLE TO AI</motion.text>

                <motion.text key="ai-invisible2"
                  x={300} y={C_CY + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${AMBER}0.30)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30, delay: 0.15 }}
                >INVISIBLE TO AI</motion.text>

                <motion.text key="ai-invisible3"
                  x={(B_CX + B2_CX) / 2} y={B_CY + 90}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${AMBER}0.30)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30, delay: 0.12 }}
                >INVISIBLE TO AI</motion.text>
              </>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Info cards */}
      <AnimatePresence>
        {isAI && (
          <motion.div
            className="grid md:grid-cols-2 gap-5 mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="rounded-xl p-5"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}
              >Where AI is genuinely fast</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                Given a description, process documentation, or a spec, AI can generate a clean, structured
                flow diagram quickly, tracing branches, laying out decision points, producing something
                readable and professional. As a drafting aid, this is real uplift: turning a pile of
                documentation into a legible topology used to be tedious work. The diagram it produces
                looks complete. That is exactly the problem.
              </p>
            </div>
            <div className="rounded-xl p-5"
              style={{ background: `${AMBER}0.04)`, border: `1px solid ${AMBER}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}
              >Where it is structurally blind</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI maps the flow AS DESCRIBED: the documented flow, the official version, the story the
                organization tells itself. The workarounds people actually use, the undocumented branch, the
                loop that nobody documented because nobody planned it, the path that is technically deprecated
                but still carries a third of the traffic: none of this is written down anywhere. AI cannot
                see it. And the gap between its tidy diagram and the real topology is precisely what you
                were looking for.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis */}
      <div className="rounded-xl p-6" style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.20)` }}>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          Use AI to draft the documented flow fast; it is genuinely useful as a first-pass scaffold and faster
          than building from scratch. Then treat that draft as a hypothesis to be broken: go watch real people
          use the thing, find the workarounds, add the branches AI could never have known about. The gap between
          the AI&rsquo;s diagram and the real flow is, literally, the finding. The value of flow mapping is in
          what differs from the documented version, and that is exactly what AI is structurally unable to surface.
        </p>
      </div>
    </div>
  )
}
