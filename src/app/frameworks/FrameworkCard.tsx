'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export type FrameworkCardData = {
  slug: string
  title: string
  tagline: string
  bestFor: string
  timeHorizon: string
  signatureMove: string
  color: string           // rgba base, e.g. 'rgba(13,148,136,'
  illustration: React.ReactNode
}

export default function FrameworkCard({
  slug,
  title,
  tagline,
  bestFor,
  timeHorizon,
  signatureMove,
  color,
  illustration,
}: FrameworkCardData) {
  const prefersReduced = useReducedMotion()

  // Hover = subtle lift + shadow step only. No content changes, no layout reflow.
  // prefers-reduced-motion → static tile, no transform.
  const hoverProps = prefersReduced
    ? {}
    : { y: -3, boxShadow: 'var(--shadow-card)' }

  return (
    // h-full ensures this grid cell fills to the tallest card in its row.
    <div className="h-full">
      <Link href={`/framework/${slug}`} className="block h-full">
        <motion.div
          className="h-full flex flex-col bg-white rounded-xl overflow-hidden"
          style={{
            border: '1px solid var(--color-neutral-200)',
            boxShadow: 'var(--shadow-subtle)',
          }}
          whileHover={hoverProps}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* ── Identity accent bar ──────────────────────────────────────── */}
          <div style={{ height: 4, background: `${color}0.80)`, flexShrink: 0 }} />

          {/* ── Card body ────────────────────────────────────────────────── */}
          {/*    p-6 gives 24px breathing room between accent bar and visual  */}
          <div className="flex flex-col flex-1 p-6">

            {/* 1 ── Signature visual zone
                     Height-constrained (96px) and width-constrained (maxWidth 200px)
                     so illustrations never overflow into the title below.
                     overflow-hidden clips any taller SVGs cleanly.
                     mb-6 creates the clear separation from visual to title.     */}
            <div
              className="flex items-center justify-center overflow-hidden shrink-0 mb-6"
              style={{ height: 96 }}
              aria-hidden="true"
            >
              <div style={{ width: '100%', maxWidth: 200 }}>
                {illustration}
              </div>
            </div>

            {/* 2 ── Framework name */}
            <h3
              className="font-semibold text-base leading-snug shrink-0 mb-2"
              style={{ color: `${color}0.90)` }}
            >
              {title}
            </h3>

            {/* 3 ── One-line description */}
            <p
              className="text-sm leading-relaxed shrink-0 mb-5"
              style={{ color: 'var(--color-neutral-600)' }}
            >
              {tagline}
            </p>

            {/* 4 ── Hairline divider */}
            <div
              className="shrink-0 mb-4"
              style={{ height: 1, background: 'var(--color-neutral-100)' }}
            />

            {/* 5 ── Info block — always visible at rest, no hover dependency */}
            <div className="shrink-0 flex flex-col gap-3">

              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                >
                  Best for
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    lineHeight: 'var(--leading-snug)',
                    color: 'var(--color-neutral-700)',
                  }}
                >
                  {bestFor}
                </p>
              </div>

              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                >
                  Time horizon
                </p>
                <span
                  className="inline-block font-semibold rounded-full"
                  style={{
                    fontSize: 'var(--text-2xs)',
                    padding: '2px 10px',
                    background: `${color}0.10)`,
                    color: `${color}0.85)`,
                  }}
                >
                  {timeHorizon}
                </span>
              </div>

              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                >
                  Signature move
                </p>
                <p
                  className="italic"
                  style={{
                    fontSize: 'var(--text-xs)',
                    lineHeight: 'var(--leading-snug)',
                    color: 'var(--color-neutral-600)',
                  }}
                >
                  {signatureMove}
                </p>
              </div>

            </div>

            {/* Elastic spacer — ensures CTA is always flush with card bottom */}
            <div className="flex-1" style={{ minHeight: 'var(--space-4)' }} />

            {/* 6 ── CTA — pinned to bottom */}
            <p
              className="font-mono uppercase tracking-widest shrink-0"
              style={{ fontSize: 'var(--text-xs)', color: `${color}0.55)` }}
            >
              View framework →
            </p>

          </div>
        </motion.div>
      </Link>
    </div>
  )
}
