import Link from 'next/link'
import { getFrameworks, getProcesses } from '@/lib/content'

export const metadata = { title: 'Processes & Frameworks' }

const INTERACTIVE_TYPE_LABELS: Record<string, string> = {
  'double-diamond': 'Double Diamond',
  spectrum: 'Spectrum',
  matrix: 'Matrix',
  funnel: 'Funnel',
  canvas: 'Canvas',
}

export default function ExplorePage() {
  const frameworks = getFrameworks()
  const processes = getProcesses()

  return (
    <div className="max-w-content mx-auto px-6 md:px-8 py-16">
      <header className="mb-16">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-framework)' }}
        >
          Processes &amp; Frameworks
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-4">
          How to think about innovation
        </h1>
        <p className="text-lg text-neutral-600 max-w-[560px] leading-relaxed">
          Processes give you the end-to-end journey. Frameworks give you the
          mental model. Together they answer: how do I run this, and how do I
          think about it?
        </p>
      </header>

      {/* Tab toggle — Frameworks */}
      <section className="mb-20">
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ color: 'var(--color-framework)' }}
        >
          Frameworks
        </h2>
        {frameworks.length === 0 ? (
          <p className="text-neutral-600">No frameworks yet — content coming soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map(({ frontmatter }) => (
              <Link
                key={frontmatter.slug}
                href={`/framework/${frontmatter.slug}`}
                className="group block p-6 border border-neutral-100 rounded-lg hover:border-transparent hover:shadow-md transition-all"
              >
                <span
                  className="text-xs font-semibold uppercase tracking-widest block mb-2"
                  style={{ color: 'var(--color-framework)' }}
                >
                  {INTERACTIVE_TYPE_LABELS[frontmatter.interactiveType] ?? frontmatter.interactiveType}
                </span>
                <h3 className="font-semibold text-neutral-900 mb-2">{frontmatter.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{frontmatter.oneLiner}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Processes */}
      <section>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ color: 'var(--color-process)' }}
        >
          Processes
        </h2>
        {processes.length === 0 ? (
          <p className="text-neutral-600">No processes yet — content coming soon.</p>
        ) : (
          <div className="flex flex-col divide-y divide-neutral-100">
            {processes.map(({ frontmatter }) => (
              <Link
                key={frontmatter.slug}
                href={`/process/${frontmatter.slug}`}
                className="group flex items-start justify-between gap-8 py-6 hover:opacity-70 transition-opacity"
              >
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{frontmatter.title}</h3>
                  <p className="text-sm text-neutral-600">{frontmatter.oneLiner}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-neutral-600">
                  {frontmatter.stages.length} stages
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
