import { getMethods } from '@/lib/content'
import MethodsStageView from '@/components/MethodsStageView'

export const metadata = { title: 'Methods' }

export default function MethodsPage() {
  const methods = getMethods()

  return (
    <>
      {/* ── Dark section: page header + method cards ── */}
      <section className="dark-section" style={{ background: 'var(--color-dark)', position: 'relative' }} aria-labelledby="methods-page-heading">

        {/* Subtle emerald radial glow */}
        <div
          aria-hidden="true"
          style={{
            position:     'absolute',
            inset:        0,
            background:   'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(5,150,105,0.09) 0%, transparent 70%)',
            pointerEvents:'none',
          }}
        />

        <div className="max-w-content mx-auto px-6 md:px-8 py-16" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Hero ── */}
          <header className="mb-14">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'rgba(5,150,105,0.80)' }}
            >
              Methods
            </p>
            <h1
              id="methods-page-heading"
              className="font-display font-semibold text-balance mb-4"
              style={{
                fontSize:      'clamp(2.5rem, 6vw, 4rem)',
                lineHeight:    1.05,
                letterSpacing: '-0.02em',
                color:         '#FAFAFA',
              }}
            >
              The tools inside every innovation process
            </h1>
            <p className="text-lg max-w-[560px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
              Each method mapped to the stage where it does its best work. Filter by stage group or
              browse all.
            </p>
          </header>

          {/* ── Method cards with stage filter ── */}
          <MethodsStageView methods={methods} />

        </div>
      </section>
    </>
  )
}
