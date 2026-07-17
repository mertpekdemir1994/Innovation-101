'use client'

import Link from 'next/link'

interface FrameworkLink {
  slug: string
  name: string
  phase: string
  note: string
}

interface Props {
  links: FrameworkLink[]
  /** 'light' = renders on a white/warm section; 'dark' = renders on the dark surface */
  variant: 'light' | 'dark'
  /** Brick accent as an RGB triplet, e.g. "138,75,60" */
  accentRgb?: string
}

const DEFAULT_ACCENT = '138,75,60'

export default function FrameworkHoverCard({ links, variant, accentRgb = DEFAULT_ACCENT }: Props) {
  const isLight = variant === 'light'

  const base = isLight
    ? { background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }
    : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }

  const hoverBg  = isLight ? `rgba(${accentRgb},0.03)` : 'rgba(255,255,255,0.06)'
  const hoverBdr = `rgba(${accentRgb},${isLight ? '0.30' : '0.35'})`
  const resetBg  = isLight ? 'var(--color-neutral-50)'  : 'rgba(255,255,255,0.03)'
  const resetBdr = isLight ? 'var(--color-neutral-100)' : 'rgba(255,255,255,0.08)'

  const nameColor  = isLight ? 'var(--color-neutral-900)' : '#FAFAFA'
  const noteColor  = isLight ? 'var(--color-neutral-600)' : 'rgba(255,255,255,0.48)'
  const badgeBg    = `rgba(${accentRgb},${isLight ? '0.08' : '0.12'})`
  const badgeBdr   = `1px solid rgba(${accentRgb},${isLight ? '0.18' : '0.22'})`

  return (
    <div className="grid md:grid-cols-2 gap-5 mt-2">
      {links.map(fw => (
        <Link
          key={fw.slug}
          href={`/framework/${fw.slug}`}
          className="block rounded-xl p-6 transition-all"
          style={{ ...base }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background   = hoverBg
            el.style.borderColor  = hoverBdr
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background   = resetBg
            el.style.borderColor  = resetBdr
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3
              className="font-semibold"
              style={{ fontSize: 'var(--text-base)', color: nameColor }}
            >
              {fw.name}
            </h3>
            <span
              className="font-mono shrink-0 rounded px-2 py-0.5"
              style={{
                fontSize: 'var(--text-2xs)',
                color: `rgb(${accentRgb})`,
                background: badgeBg,
                border: badgeBdr,
              }}
            >
              {fw.phase}
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: noteColor, lineHeight: 'var(--leading-relaxed)' }}>
            {fw.note}
          </p>
        </Link>
      ))}
    </div>
  )
}
