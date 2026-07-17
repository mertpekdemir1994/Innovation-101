import ComponentDemo from './ComponentDemo'
import MotionDemo from './MotionDemo'

export const metadata = { title: 'Design System Styleguide' }

// ─── Token data ─────────────────────────────────────────────────────────────

const sectionColors = [
  { name: 'process',   value: '#2563EB', token: '--color-process' },
  { name: 'framework', value: '#7C3AED', token: '--color-framework' },
  { name: 'methods',   value: '#059669', token: '--color-methods' },
  { name: 'scenario',  value: '#D97706', token: '--color-scenario' },
  { name: 'reading',   value: '#DC2626', token: '--color-reading' },
]

const neutralColors = [
  { name: 'neutral-900', value: '#111827', token: '--color-neutral-900' },
  { name: 'neutral-700', value: '#374151', token: '--color-neutral-700' },
  { name: 'neutral-600', value: '#4B5563', token: '--color-neutral-600' },
  { name: 'neutral-400', value: '#9CA3AF', token: '--color-neutral-400' },
  { name: 'neutral-200', value: '#E5E7EB', token: '--color-neutral-200' },
  { name: 'neutral-100', value: '#F3F4F6', token: '--color-neutral-100' },
  { name: 'neutral-50',  value: '#F9FAFB', token: '--color-neutral-50' },
]

const surfaceColors = [
  { name: 'background', value: '#FFFFFF',  token: '--color-background' },
  { name: 'warm-50',    value: '#FAFAF7',  token: '--color-warm-50' },
  { name: 'warm-100',   value: '#F5F5F0',  token: '--color-warm-100' },
]

const typeScale = [
  { step: '2xs', size: '11px', role: 'JetBrains Mono micro-labels only', mono: true },
  { step: 'xs',  size: '12px', role: 'Captions, stage badges', mono: false },
  { step: 'sm',  size: '14px', role: 'Small UI text, meta', mono: false },
  { step: 'base', size: '16px', role: 'Body copy default', mono: false },
  { step: 'lg',  size: '18px', role: 'Body large, intro paragraphs', mono: false },
  { step: 'xl',  size: '20px', role: 'Lead text, card summaries', mono: false },
  { step: '2xl', size: '24px', role: 'Subsection h3', mono: false },
  { step: '3xl', size: '30px', role: 'Section h2 (small)', mono: false },
  { step: '4xl', size: '36px', role: 'Section h2 (large)', mono: false },
  { step: '5xl', size: '48px', role: 'Page h1 — Fraunces begins here', display: true },
  { step: '6xl', size: '60px', role: 'Hero display — Fraunces', display: true },
  { step: '7xl', size: '72px', role: 'Large hero — Fraunces', display: true },
]

const spacingScale = [
  { token: 'space-1',  value: '4px',  tailwind: 'p-1' },
  { token: 'space-2',  value: '8px',  tailwind: 'p-2' },
  { token: 'space-3',  value: '12px', tailwind: 'p-3' },
  { token: 'space-4',  value: '16px', tailwind: 'p-4' },
  { token: 'space-5',  value: '20px', tailwind: 'p-5' },
  { token: 'space-6',  value: '24px', tailwind: 'p-6' },
  { token: 'space-7',  value: '32px', tailwind: 'p-8' },
  { token: 'space-8',  value: '40px', tailwind: 'p-10' },
  { token: 'space-9',  value: '48px', tailwind: 'p-12' },
  { token: 'space-10', value: '64px', tailwind: 'p-16' },
  { token: 'space-11', value: '80px', tailwind: 'p-20' },
  { token: 'space-12', value: '96px', tailwind: 'p-24' },
]

const shadows = [
  { name: 'none',   className: 'shadow-none',   desc: 'Flat — borders only' },
  { name: 'subtle', className: 'shadow-subtle',  desc: 'Subtle lift — metadata, captions' },
  { name: 'card',   className: 'shadow-card',    desc: 'Card default' },
  { name: 'float',  className: 'shadow-float',   desc: 'Card hover, tooltips' },
  { name: 'modal',  className: 'shadow-modal',   desc: 'Modals, drawers' },
]

const radii = [
  { name: 'none', className: 'rounded-none', value: '0' },
  { name: 'sm',   className: 'rounded-sm',   value: '2px' },
  { name: 'base', className: 'rounded',      value: '4px' },
  { name: 'md',   className: 'rounded-md',   value: '8px' },
  { name: 'lg',   className: 'rounded-lg',   value: '12px' },
  { name: 'xl',   className: 'rounded-xl',   value: '24px' },
  { name: 'full', className: 'rounded-full', value: '9999px' },
]

// ─── Section component ───────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-neutral-200 py-16">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
          Design Token
        </p>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-10">{title}</h2>
        {children}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  return (
    <div className="bg-background min-h-screen">

      {/* Header */}
      <div className="border-b border-neutral-200 py-16" style={{ background: 'var(--color-warm-50)' }}>
        <div className="max-w-content mx-auto px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
            Innovation 101
          </p>
          <h1 className="font-display text-5xl font-bold text-neutral-900 mb-4">
            Design System
          </h1>
          <p className="text-xl text-neutral-600 max-w-prose">
            Visual reference for all design tokens. Every color, size, spacing value, and shadow
            on this site derives from these tokens — defined once in{' '}
            <code className="font-mono text-sm bg-neutral-100 px-1.5 py-0.5 rounded">
              src/app/styles/tokens.css
            </code>.
          </p>
        </div>
      </div>

      {/* ── Color Palette ─────────────────────────────────────────────────── */}
      <Section title="Color Palette">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-4">Section Accents</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {sectionColors.map((c) => (
                <div key={c.name}>
                  <div
                    className="h-16 rounded-md mb-2"
                    style={{ background: c.value }}
                  />
                  <p className="text-sm font-semibold text-neutral-900">{c.name}</p>
                  <p className="font-mono text-2xs text-neutral-400">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-4">Neutral Scale</p>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              {neutralColors.map((c) => (
                <div key={c.name}>
                  <div
                    className="h-16 rounded-md border border-neutral-200 mb-2"
                    style={{ background: c.value }}
                  />
                  <p className="text-xs font-semibold text-neutral-900">{c.name}</p>
                  <p className="font-mono text-2xs text-neutral-400">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-4">Surface Colors</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {surfaceColors.map((c) => (
                <div key={c.name}>
                  <div
                    className="h-16 rounded-md border border-neutral-200 mb-2"
                    style={{ background: c.value }}
                  />
                  <p className="text-sm font-semibold text-neutral-900">{c.name}</p>
                  <p className="font-mono text-2xs text-neutral-400">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Font Roles ────────────────────────────────────────────────────── */}
      <Section title="Font Roles">
        <div className="space-y-10">
          <div className="border border-neutral-200 rounded-md p-8">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-3">
              Fraunces (display) — hero headings, text-5xl and above only
            </p>
            <p className="font-display text-6xl font-bold text-neutral-900 leading-tight">
              Design is never neutral.
            </p>
          </div>
          <div className="border border-neutral-200 rounded-md p-8">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-3">
              Inter (sans) — all body, UI, h2-h6
            </p>
            <p className="text-4xl font-semibold text-neutral-900 mb-3">
              The Double Diamond
            </p>
            <p className="text-base text-neutral-600 leading-relaxed max-w-prose">
              The Double Diamond is a structured innovation process framework that separates the
              work of finding the right problem from the work of finding the right solution —
              ensuring teams never solve the wrong problem brilliantly.
            </p>
          </div>
          <div className="border border-neutral-200 rounded-md p-8">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-3">
              JetBrains Mono — badges, overlines, labels, code
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="font-mono text-2xs uppercase tracking-widest px-2 py-1 rounded-sm bg-neutral-100 text-neutral-600">
                Discovery
              </span>
              <span className="font-mono text-2xs uppercase tracking-widest px-2 py-1 rounded-sm bg-neutral-100 text-neutral-600">
                Synthesis
              </span>
              <span className="font-mono text-2xs uppercase tracking-widest px-2 py-1 rounded-sm" style={{ background: 'rgba(124,58,237,0.08)', color: 'var(--color-framework)' }}>
                Framework
              </span>
            </div>
            <code className="font-mono text-sm text-neutral-700 bg-neutral-100 px-3 py-2 rounded block">
              import {'{ spring }'} from &apos;@/lib/motion&apos;
            </code>
          </div>
        </div>
      </Section>

      {/* ── Type Scale ────────────────────────────────────────────────────── */}
      <Section title="Type Scale">
        <div className="space-y-6">
          {typeScale.map((t) => (
            <div key={t.step} className="flex items-baseline gap-6 border-b border-neutral-100 pb-4">
              <div className="w-24 shrink-0">
                <p className="font-mono text-2xs text-neutral-400 uppercase tracking-widest">
                  text-{t.step}
                </p>
                <p className="text-xs text-neutral-400">{t.size}</p>
              </div>
              <div className="min-w-0">
                <p
                  className={`text-neutral-900 ${t.display ? 'font-display font-bold' : 'font-semibold'} ${t.mono ? 'font-mono uppercase tracking-widest' : ''} text-${t.step}`}
                  style={{ lineHeight: t.display ? 'var(--leading-tight)' : undefined }}
                >
                  {t.display
                    ? 'Innovation starts with a question.'
                    : t.mono
                    ? 'Discovery · Method · Framework'
                    : 'The quick fox jumps over the lazy dog.'}
                </p>
                <p className="text-xs text-neutral-400 mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Spacing Scale ─────────────────────────────────────────────────── */}
      <Section title="Spacing Scale">
        <div className="space-y-3">
          {spacingScale.map((s) => (
            <div key={s.token} className="flex items-center gap-4">
              <div className="w-28 shrink-0">
                <p className="font-mono text-2xs text-neutral-400 uppercase tracking-widest">
                  {s.token}
                </p>
                <p className="text-xs text-neutral-400">{s.value}</p>
              </div>
              <div
                className="h-5 rounded-sm bg-neutral-900"
                style={{ width: s.value }}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Border Radius ─────────────────────────────────────────────────── */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-6">
          {radii.map((r) => (
            <div key={r.name} className="text-center">
              <div
                className={`w-16 h-16 bg-neutral-900 ${r.className} mb-2`}
              />
              <p className="text-xs font-semibold text-neutral-900">radius-{r.name}</p>
              <p className="font-mono text-2xs text-neutral-400">{r.value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Shadows ───────────────────────────────────────────────────────── */}
      <Section title="Shadows">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {shadows.map((s) => (
            <div key={s.name}>
              <div
                className={`h-20 rounded-md bg-background border border-neutral-100 ${s.className} mb-3`}
              />
              <p className="text-sm font-semibold text-neutral-900">shadow-{s.name}</p>
              <p className="text-xs text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA Variants ──────────────────────────────────────────────────── */}
      <Section title="CTA Variants">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-4">Primary — filled, section color</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="px-6 py-3 rounded-md font-semibold text-white text-sm transition-opacity hover:opacity-90 active:opacity-75"
                style={{ background: 'var(--color-framework)' }}
              >
                Explore Framework
              </button>
              <button
                className="px-6 py-3 rounded-md font-semibold text-white text-sm"
                style={{ background: 'var(--color-process)' }}
              >
                Start Process
              </button>
              <button
                className="px-6 py-3 rounded-md font-semibold text-white text-sm"
                style={{ background: 'var(--color-methods)' }}
              >
                View Methods
              </button>
              <button
                disabled
                className="px-6 py-3 rounded-md font-semibold text-white text-sm opacity-35 cursor-not-allowed bg-neutral-400"
              >
                Disabled
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-4">Secondary — bordered, transparent</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="px-6 py-3 rounded-md font-semibold text-sm border-2 transition-colors hover:bg-neutral-50"
                style={{ borderColor: 'var(--color-framework)', color: 'var(--color-framework)' }}
              >
                Learn More
              </button>
              <button
                className="px-6 py-3 rounded-md font-semibold text-sm border-2 transition-colors hover:bg-neutral-50"
                style={{ borderColor: 'var(--color-neutral-900)', color: 'var(--color-neutral-900)' }}
              >
                See All Frameworks
              </button>
              <button
                disabled
                className="px-6 py-3 rounded-md font-semibold text-sm border-2 border-neutral-200 text-neutral-400 cursor-not-allowed"
              >
                Disabled
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-4">Text — inline, underline on hover</p>
            <div className="flex flex-wrap gap-6 items-center">
              <button
                className="font-semibold text-sm underline decoration-1 underline-offset-2 hover:decoration-2 transition-all"
                style={{ color: 'var(--color-framework)' }}
              >
                Read the case study →
              </button>
              <button
                className="font-semibold text-sm text-neutral-900 underline decoration-1 underline-offset-2 hover:decoration-2 transition-all"
              >
                View all methods →
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Components ────────────────────────────────────────────────────── */}
      <Section title="Components">
        <ComponentDemo />
      </Section>

      {/* ── Motion ────────────────────────────────────────────────────────── */}
      <Section title="Motion — Spring Presets">
        <p className="text-sm text-neutral-600 mb-6">
          Click &ldquo;Trigger&rdquo; to see each spring preset animate. Import from{' '}
          <code className="font-mono text-xs bg-neutral-100 px-1.5 py-0.5 rounded">
            @/lib/motion
          </code>.
        </p>
        <MotionDemo />
      </Section>

      {/* ── Layout Widths ─────────────────────────────────────────────────── */}
      <Section title="Layout Widths">
        <div className="space-y-4 overflow-x-auto">
          {[
            { name: 'prose',   value: '720px',  token: '--width-prose',   tw: 'max-w-prose' },
            { name: 'content', value: '1200px', token: '--width-content', tw: 'max-w-content' },
            { name: 'wide',    value: '1400px', token: '--width-wide',    tw: 'max-w-wide' },
          ].map((w) => (
            <div key={w.name}>
              <div className="flex items-center gap-4 mb-1">
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 w-24 shrink-0">
                  {w.name}
                </p>
                <p className="text-xs text-neutral-600">{w.value} · {w.tw}</p>
              </div>
              <div
                className="h-4 rounded-sm bg-neutral-200"
                style={{ maxWidth: w.value, width: '100%' }}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Footer note */}
      <div className="py-12 text-center">
        <p className="text-sm text-neutral-400">
          This page is a development tool only — not part of the public site.
        </p>
      </div>
    </div>
  )
}
