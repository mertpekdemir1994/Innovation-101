'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { spring } from '@/lib/motion'

// ─── Types ───────────────────────────────────────────────────────────────────

export type Phase = 'discover' | 'define' | 'develop' | 'deliver'
export type VizState = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface PhaseConfig {
  id: Phase
  label: string
  tagline: string
  type: 'diverge' | 'converge'
  diamond: 'left' | 'right'
}

export interface ActivityItem {
  id: string
  title: string
  summary: string
  prompt?: string
  methodSlug?: string
}

export interface PhaseContent {
  phase: Phase
  headline: string
  activities: ActivityItem[]
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const PHASES: PhaseConfig[] = [
  { id: 'discover', label: 'Discover',  tagline: 'Diverge to understand the problem space', type: 'diverge',  diamond: 'left' },
  { id: 'define',   label: 'Define',    tagline: 'Converge to frame the right problem',     type: 'converge', diamond: 'left' },
  { id: 'develop',  label: 'Develop',   tagline: 'Diverge to explore potential solutions',  type: 'diverge',  diamond: 'right' },
  { id: 'deliver',  label: 'Deliver',   tagline: 'Converge to ship the right solution',     type: 'converge', diamond: 'right' },
]

// ─── SVG Geometry ─────────────────────────────────────────────────────────────
// ViewBox: 0 0 800 240
// Left diamond:  apex-left (0,120), top (200,0), mid (400,120), bot (200,240)
// Right diamond: mid (400,120), top (600,0), apex-right (800,120), bot (600,240)
//
// Vertical split: each diamond is divided along its widest vertical axis.
//   Discover = left-pointing triangle  (diverges as you move right)
//   Define   = right-pointing triangle (converges to the center point)

const PHASE_PATHS: Record<Phase, string> = {
  discover: 'M 0 120 L 200 0 L 200 240 Z',    // left half of left diamond
  define:   'M 200 0 L 400 120 L 200 240 Z',  // right half of left diamond
  develop:  'M 400 120 L 600 0 L 600 240 Z',  // left half of right diamond
  deliver:  'M 600 0 L 800 120 L 600 240 Z',  // right half of right diamond
}

const PHASE_LABEL_POS: Record<Phase, { x: number; y: number }> = {
  discover: { x: 133, y: 120 },
  define:   { x: 267, y: 120 },
  develop:  { x: 533, y: 120 },
  deliver:  { x: 667, y: 120 },
}

// ─── SVG Diagram ─────────────────────────────────────────────────────────────

interface DiagramProps {
  activePhase: Phase | null
  hoveredPhase: Phase | null
  theme: 'light' | 'dark'
  onPhaseClick: (p: Phase) => void
  onPhaseHover: (p: Phase | null) => void
}

function DiamondSVG({ activePhase, hoveredPhase, theme, onPhaseClick, onPhaseHover }: DiagramProps) {
  const prefersReduced = useReducedMotion()
  const isDark = theme === 'dark'

  // Color palette adapts to background theme
  const FILL_DEFAULT  = isDark ? 'rgba(124,58,237,0.10)' : 'rgba(124,58,237,0.06)'
  const FILL_HOVER    = isDark ? 'rgba(124,58,237,0.22)' : 'rgba(124,58,237,0.14)'
  const FILL_ACTIVE   = isDark ? 'rgba(124,58,237,0.32)' : 'rgba(124,58,237,0.20)'
  const STROKE_DEFAULT = isDark ? 'rgba(124,58,237,0.40)' : 'rgba(124,58,237,0.25)'
  const STROKE_ACTIVE  = isDark ? 'rgba(124,58,237,0.90)' : 'rgba(124,58,237,0.70)'
  const LABEL_DEFAULT  = isDark ? 'rgba(255,255,255,0.50)' : 'rgba(17,24,39,0.45)'
  const LABEL_ACTIVE   = isDark ? '#FFFFFF' : 'var(--color-framework)'
  const AXIS_COLOR     = isDark ? 'rgba(255,255,255,0.20)' : 'rgba(17,24,39,0.25)'

  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full"
      style={{ maxHeight: 340, overflow: 'visible' }}
      role="img"
      aria-label="Double Diamond framework, four phases: Discover, Define, Develop, Deliver"
    >
      <defs>
        <filter id="viz-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>


      {/* Phase triangles */}
      {PHASES.map((phase) => {
        const isActive  = activePhase  === phase.id
        const isHovered = hoveredPhase === phase.id

        const fill   = isActive ? FILL_ACTIVE : isHovered ? FILL_HOVER : FILL_DEFAULT
        const stroke = isActive ? STROKE_ACTIVE : STROKE_DEFAULT
        const label  = isActive ? LABEL_ACTIVE : isHovered ? (isDark ? 'rgba(255,255,255,0.80)' : 'rgba(17,24,39,0.75)') : LABEL_DEFAULT

        return (
          <g key={phase.id}>
            <motion.path
              id={`dd-phase-${phase.id}`}
              d={PHASE_PATHS[phase.id]}
              fill={fill}
              stroke={stroke}
              strokeWidth={isActive ? 1.5 : 1}
              style={{ cursor: 'pointer' }}
              animate={prefersReduced ? {} : { fill, stroke }}
              transition={spring.snappy}
              onClick={() => onPhaseClick(phase.id)}
              onMouseEnter={() => onPhaseHover(phase.id)}
              onMouseLeave={() => onPhaseHover(null)}
              tabIndex={0}
              role="button"
              aria-label={`${phase.label}: ${phase.tagline}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPhaseClick(phase.id) }}
              filter={isActive ? 'url(#viz-glow)' : undefined}
            />
            <motion.text
              x={PHASE_LABEL_POS[phase.id].x}
              y={PHASE_LABEL_POS[phase.id].y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fontWeight="500"
              letterSpacing="0.08em"
              fill={label}
              style={{ pointerEvents: 'none', userSelect: 'none', textTransform: 'uppercase' }}
              animate={prefersReduced ? {} : { fill: label }}
              transition={spring.snappy}
            >
              {phase.label}
            </motion.text>
          </g>
        )
      })}

      {/* Diamond outlines on top */}
      <path d="M 0 120 L 200 0 L 400 120 L 200 240 Z" fill="none" stroke={STROKE_DEFAULT} strokeWidth="1" />
      <path d="M 400 120 L 600 0 L 800 120 L 600 240 Z" fill="none" stroke={STROKE_DEFAULT} strokeWidth="1" />

      {/* Vertical dividers — peak-to-valley lines marking the phase split */}
      <line x1="200" y1="0" x2="200" y2="240" stroke={STROKE_DEFAULT} strokeWidth="1" />
      <line x1="600" y1="0" x2="600" y2="240" stroke={STROKE_DEFAULT} strokeWidth="1" />

      {/* Convergence point dots */}
      {[0, 400, 800].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy={120}
          r={cx === 400 ? 4 : 3}
          fill="rgba(124,58,237,0.75)"
          filter="url(#viz-glow)"
        />
      ))}

      {/* Axis labels */}
      {[
        { x: 8,   anchor: 'start',  label: 'Problem' },
        { x: 400, anchor: 'middle', label: 'Insight' },
        { x: 792, anchor: 'end',    label: 'Solution' },
      ].map(({ x, anchor, label }) => (
        <text
          key={label}
          x={x}
          y={234}
          textAnchor={anchor as 'start' | 'middle' | 'end'}
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="0.10em"
          fill={AXIS_COLOR}
          style={{ userSelect: 'none', textTransform: 'uppercase' }}
        >
          {label}
        </text>
      ))}

    </svg>
  )
}

// ─── Phase Panel ──────────────────────────────────────────────────────────────

interface PhasePanelProps {
  phase: Phase
  content: PhaseContent
  onClose: () => void
  onOpenMethod: (slug: string, trigger: HTMLElement) => void
}

function PhasePanel({ phase, content, onClose, onOpenMethod }: PhasePanelProps) {
  const prefersReduced = useReducedMotion()
  const [openActivity, setOpenActivity] = useState<string | null>(null)

  const config = PHASES.find((p) => p.id === phase)!

  // Panel renders on dark background — use dark-surface styling
  const panelBg    = 'rgba(17,17,24,0.95)'
  const panelBorder = 'rgba(255,255,255,0.10)'
  const itemBorder  = 'rgba(255,255,255,0.08)'
  const textPrimary = 'rgba(255,255,255,0.90)'
  const textMuted   = 'rgba(255,255,255,0.50)'
  const hoverBg     = 'rgba(255,255,255,0.04)'

  return (
    <motion.div
      key={phase}
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
      exit={prefersReduced ? {} : { opacity: 0, y: 16 }}
      transition={spring.gentle}
      role="region"
      aria-label={`${config.label} phase panel`}
      style={{
        background: panelBg,
        border: `1px solid ${panelBorder}`,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-start justify-between gap-space-4 mb-space-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest mb-space-2" style={{ color: 'rgba(124,58,237,0.85)' }}>
            {config.type === 'diverge' ? '↗ Diverge' : '↘ Converge'}
          </p>
          <h3 className="text-2xl font-semibold" style={{ color: textPrimary }}>{content.headline}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close phase panel"
          className="shrink-0 p-space-2 rounded transition-colors"
          style={{ color: textMuted }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="space-y-space-2">
        {content.activities.map((activity) => {
          const isOpen = openActivity === activity.id

          return (
            <div key={activity.id} style={{ border: `1px solid ${itemBorder}`, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenActivity(isOpen ? null : activity.id)}
                className="w-full flex items-center justify-between px-space-5 py-space-4 text-left transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div className="flex items-center gap-space-3">
                  <span className="font-semibold text-sm" style={{ color: textPrimary }}>{activity.title}</span>
                </div>
                <motion.span
                  aria-hidden
                  animate={prefersReduced ? {} : { rotate: isOpen ? 180 : 0 }}
                  transition={spring.snappy}
                  className="shrink-0 ml-space-3"
                  style={{ color: textMuted }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={prefersReduced ? false : { opacity: 0, height: 0 }}
                    animate={prefersReduced ? {} : { opacity: 1, height: 'auto' }}
                    exit={prefersReduced ? {} : { opacity: 0, height: 0 }}
                    transition={prefersReduced ? undefined : { ...spring.snappy, opacity: { duration: 0.15 } }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-space-5 py-space-4 space-y-space-4" style={{ borderTop: `1px solid ${itemBorder}` }}>
                      <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{activity.summary}</p>

                      {activity.prompt && (
                        <div
                          className="rounded-md px-space-4 py-space-3"
                          style={{ background: 'rgba(124,58,237,0.08)', borderLeft: '2px solid rgba(124,58,237,0.50)' }}
                        >
                          <p className="text-xs font-semibold mb-space-1 font-mono uppercase tracking-widest" style={{ color: 'rgba(124,58,237,0.70)' }}>
                            Key question
                          </p>
                          <p className="text-sm italic leading-relaxed" style={{ color: textPrimary }}>{activity.prompt}</p>
                        </div>
                      )}

                      {activity.methodSlug && (
                        <button
                          type="button"
                          onClick={(e) => onOpenMethod(activity.methodSlug!, e.currentTarget)}
                          className="font-mono text-xs uppercase tracking-widest underline"
                          style={{ color: 'rgba(124,58,237,0.85)' }}
                        >
                          See method: {activity.methodSlug.replace(/-/g, ' ')} →
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Method Drawer ────────────────────────────────────────────────────────────

function MethodDrawer({ slug, onClose }: { slug: string; onClose: () => void }) {
  const prefersReduced = useReducedMotion()
  const label = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const drawerRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Move focus into the drawer on open, and trap Tab within it while open.
  useEffect(() => {
    closeButtonRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const drawer = drawerRef.current
      if (!drawer) return
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {slug && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-neutral-900/30 z-40"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={prefersReduced ? {} : { opacity: 1 }}
            exit={prefersReduced ? {} : { opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Method: ${label}`}
            className="fixed right-0 top-0 h-full w-full max-w-panel bg-white shadow-modal z-50 overflow-y-auto p-space-8"
            initial={prefersReduced ? {} : { x: '100%' }}
            animate={prefersReduced ? {} : { x: 0 }}
            exit={prefersReduced ? {} : { x: '100%' }}
            transition={spring.gentle}
          >
            <div className="flex items-start justify-between mb-space-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-space-2" style={{ color: 'var(--color-framework)' }}>
                  Method
                </p>
                <h2 className="text-2xl font-semibold text-neutral-900">{label}</h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close method drawer"
                className="p-space-2 rounded hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-900"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-space-6">
              Full details about this method are available on its dedicated page.
            </p>
            <a
              href={`/methods/${slug}`}
              className="inline-flex items-center gap-space-2 px-space-5 py-space-3 rounded-md font-semibold text-sm text-white"
              style={{ background: 'var(--color-framework)' }}
            >
              Open full method page →
            </a>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface DoubleDiamondVizProps {
  phaseContent: Record<Phase, PhaseContent>
  theme?: 'light' | 'dark'
}

export default function DoubleDiamondViz({ phaseContent, theme = 'light' }: DoubleDiamondVizProps) {
  const prefersReduced = useReducedMotion()
  const [activePhase, setActivePhase]   = useState<Phase | null>(null)
  const [hoveredPhase, setHoveredPhase] = useState<Phase | null>(null)
  const [openMethod, setOpenMethod]     = useState<string | null>(null)
  const drawerTriggerRef = useRef<HTMLElement | null>(null)

  const handlePhaseClick = useCallback((phase: Phase) => {
    setActivePhase((prev) => (prev === phase ? null : phase))
  }, [])

  const handleClose = useCallback(() => {
    setActivePhase((prev) => {
      if (prev) document.getElementById(`dd-phase-${prev}`)?.focus()
      return null
    })
  }, [])

  const handleOpenMethod = useCallback((slug: string, trigger: HTMLElement) => {
    drawerTriggerRef.current = trigger
    setOpenMethod(slug)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setOpenMethod(null)
    drawerTriggerRef.current?.focus()
  }, [])

  // Escape closes whichever is open: the method drawer takes priority since
  // it renders on top of the phase panel.
  useEffect(() => {
    if (!openMethod && !activePhase) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (openMethod) handleCloseDrawer()
      else if (activePhase) handleClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openMethod, activePhase, handleClose, handleCloseDrawer])

  return (
    <div>
      <p className="sr-only focus:not-sr-only text-xs text-neutral-400 mb-space-4">
        Tab to navigate phases, Enter or Space to expand, Escape to close.
      </p>

      {/* Vertical split: SVG left, panel right when a phase is active */}
      <div className={activePhase ? 'grid grid-cols-1 md:grid-cols-2 gap-space-8 items-start' : ''}>

        {/* Left column: SVG + hover hint */}
        <div>
          <AnimatePresence mode="wait">
            {hoveredPhase && !activePhase ? (
              <motion.p
                key={hoveredPhase}
                initial={prefersReduced ? {} : { opacity: 0, y: 4 }}
                animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
                exit={prefersReduced ? {} : { opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-xs uppercase tracking-widest mb-space-2 min-h-[1.25rem]"
                style={{ color: 'rgba(124,58,237,0.80)' }}
              >
                {PHASES.find((p) => p.id === hoveredPhase)?.tagline}
              </motion.p>
            ) : (
              <p key="empty" className="min-h-[1.25rem]" />
            )}
          </AnimatePresence>

          <DiamondSVG
            activePhase={activePhase}
            hoveredPhase={hoveredPhase}
            theme={theme}
            onPhaseClick={handlePhaseClick}
            onPhaseHover={setHoveredPhase}
          />
        </div>

        {/* Right column: phase panel */}
        <AnimatePresence mode="wait">
          {activePhase && (
            <PhasePanel
              key={activePhase}
              phase={activePhase}
              content={phaseContent[activePhase]}
              onClose={handleClose}
              onOpenMethod={handleOpenMethod}
            />
          )}
        </AnimatePresence>
      </div>

      {openMethod && (
        <MethodDrawer slug={openMethod} onClose={handleCloseDrawer} />
      )}
    </div>
  )
}
