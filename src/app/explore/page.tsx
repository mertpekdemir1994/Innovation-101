import Link from 'next/link'
import { getFrameworks } from '@/lib/content'

export const metadata = { title: 'Frameworks · Innovation 101' }

const INTERACTIVE_TYPE_LABELS: Record<string, string> = {
  'double-diamond': 'Double Diamond',
  spectrum: 'Spectrum',
  matrix: 'Matrix',
  funnel: 'Funnel',
  canvas: 'Canvas',
  timeline: 'Timeline',
}

export default function ExplorePage() {
  const frameworks = getFrameworks()

  return (
    <div className="max-w-content mx-auto px-6 md:px-8 py-16">
      <header className="mb-16">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-framework)' }}
        >
          Process Frameworks
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-4">
          End-to-end innovation frameworks
        </h1>
        <p className="text-lg text-neutral-600 max-w-[560px] leading-relaxed">
          Six frameworks, each a complete system for moving from problem to
          solution. Pick the one that fits your context.
        </p>
      </header>

      {frameworks.length === 0 ? (
        <p className="text-neutral-600">No frameworks yet: content coming soon.</p>
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
              <h2 className="font-semibold text-neutral-900 mb-2">{frontmatter.title}</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">{frontmatter.oneLiner}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
