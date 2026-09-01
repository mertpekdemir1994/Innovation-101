'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { MethodStage, ContentItem, MethodFrontmatter } from '@/types/content'

// ── Stage metadata ─────────────────────────────────────────────────────────────

const STAGES: { key: MethodStage; label: string; color: string }[] = [
  { key: 'discovery',  label: 'Discovery & Research',         color: 'rgba(61,107,90,'   },
  { key: 'synthesis',  label: 'Synthesis & Framing',          color: 'rgba(31,58,95,'    },
  { key: 'experience', label: 'Experience & Systems Mapping', color: 'rgba(42,111,122,'  },
  { key: 'ideation',   label: 'Ideation & Prototyping',       color: 'rgba(181,97,62,'   },
  { key: 'strategy',   label: 'Strategy & Prioritization',    color: 'rgba(107,74,119,'  },
  { key: 'validation', label: 'Delivery & Validation',        color: 'rgba(138,75,60,'   },
]

function stageColor(stage: MethodStage): string {
  return STAGES.find((s) => s.key === stage)?.color ?? 'rgba(156,163,175,'
}

function stageLabel(stage: MethodStage): string {
  return STAGES.find((s) => s.key === stage)?.label ?? stage
}

// ── Method card ───────────────────────────────────────────────────────────────

function MethodCard({ frontmatter }: { frontmatter: MethodFrontmatter }) {
  const prefersReduced = useReducedMotion()
  const primaryStage   = frontmatter.stages[0]
  const color          = stageColor(primaryStage)
  const label          = stageLabel(primaryStage)

  const hoverProps = prefersReduced ? {} : { y: -3, boxShadow: 'var(--shadow-card)' }

  return (
    <div className="h-full">
      <Link href={`/methods/${frontmatter.slug}`} className="block h-full">
        <motion.div
          className="h-full flex flex-col bg-white rounded-xl overflow-hidden"
          style={{
            border:     '1px solid var(--color-neutral-200)',
            boxShadow:  'var(--shadow-subtle)',
          }}
          whileHover={hoverProps}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── Accent bar ── */}
          <div style={{ height: 4, background: `${color}0.80)`, flexShrink: 0 }} />

          {/* ── Card body ── */}
          <div className="flex flex-col flex-1 p-6">

            {/* Stage badge */}
            <span
              className="inline-block self-start font-mono uppercase tracking-widest rounded-full mb-4 px-2 py-0.5"
              style={{
                fontSize:   'var(--text-2xs)',
                background: `${color}0.09)`,
                color:      `${color}0.80)`,
              }}
            >
              {label}
            </span>

            {/* Method name */}
            <h2
              className="font-semibold text-base leading-snug shrink-0 mb-2"
              style={{ color: `${color}0.90)` }}
            >
              {frontmatter.title}
            </h2>

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed shrink-0 mb-5"
              style={{ color: 'var(--color-neutral-600)' }}
            >
              {frontmatter.tagline}
            </p>

            {/* Divider */}
            <div className="shrink-0 mb-4" style={{ height: 1, background: 'var(--color-neutral-100)' }} />

            {/* Info blocks */}
            <div className="shrink-0 flex flex-col gap-3">

              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                >
                  Time required
                </p>
                <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-snug)', color: 'var(--color-neutral-700)' }}>
                  {frontmatter.timeRequired}
                </p>
              </div>

              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                >
                  Group size
                </p>
                <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-snug)', color: 'var(--color-neutral-700)' }}>
                  {frontmatter.groupSize}
                </p>
              </div>

              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                >
                  Format
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {frontmatter.remote && (
                    <span
                      className="inline-block font-semibold rounded-full"
                      style={{ fontSize: 'var(--text-2xs)', padding: '2px 10px', background: `${color}0.09)`, color: `${color}0.80)` }}
                    >
                      Remote
                    </span>
                  )}
                  {frontmatter.inPerson && (
                    <span
                      className="inline-block font-semibold rounded-full"
                      style={{ fontSize: 'var(--text-2xs)', padding: '2px 10px', background: `${color}0.09)`, color: `${color}0.80)` }}
                    >
                      In person
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Elastic spacer */}
            <div className="flex-1" style={{ minHeight: 'var(--space-4)' }} />

            {/* CTA */}
            <p
              className="font-mono uppercase tracking-widest shrink-0"
              style={{ fontSize: 'var(--text-xs)', color: `${color}0.55)` }}
            >
              View method →
            </p>

          </div>
        </motion.div>
      </Link>
    </div>
  )
}

// ── Main view ─────────────────────────────────────────────────────────────────

type Props = {
  methods: ContentItem<MethodFrontmatter>[]
}

export default function MethodsStageView({ methods }: Props) {
  const [activeStage, setActiveStage] = useState<MethodStage | 'az'>('az')

  // Filter out development placeholder
  const real = methods.filter(({ frontmatter }) => frontmatter.slug !== 'placeholder')

  const displayMethods =
    activeStage === 'az'
      ? [...real].sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title))
      : real.filter(({ frontmatter }) => frontmatter.stages.includes(activeStage))

  return (
    <div>
      {/* ── Stage filter pills: styled for dark background ── */}
      <div
        className="flex flex-wrap gap-2 mb-10 pb-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        role="group"
        aria-label="Filter methods by stage"
      >
        {STAGES.map(({ key, label, color }) => {
          const active = activeStage === key
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveStage(key)}
              className="px-4 py-2 rounded-full text-sm transition-colors"
              style={{
                background: active ? `${color}0.90)` : 'rgba(255,255,255,0.07)',
                color:      active ? '#fff' : 'rgba(255,255,255,0.52)',
                fontWeight: active ? 600 : 400,
                border:     active ? 'none' : '1px solid rgba(255,255,255,0.10)',
              }}
            >
              {label}
            </button>
          )
        })}

        <button
          type="button"
          aria-pressed={activeStage === 'az'}
          onClick={() => setActiveStage('az')}
          className="px-4 py-2 rounded-full text-sm ml-auto transition-colors"
          style={{
            background: activeStage === 'az' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
            color:      activeStage === 'az' ? '#fff' : 'rgba(255,255,255,0.52)',
            fontWeight: activeStage === 'az' ? 600 : 400,
            border:     activeStage === 'az' ? 'none' : '1px solid rgba(255,255,255,0.10)',
          }}
        >
          A – Z
        </button>
      </div>

      {/* ── Method cards ── */}
      {displayMethods.length === 0 ? (
        <p
          className="py-12 text-center"
          style={{ color: 'var(--color-dark-muted)', fontStyle: 'italic', fontSize: 'var(--text-sm)' }}
        >
          No methods in this stage yet: content coming soon.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pb-4">
          {displayMethods.map(({ frontmatter }) => (
            <MethodCard key={frontmatter.slug} frontmatter={frontmatter} />
          ))}
        </div>
      )}
    </div>
  )
}
