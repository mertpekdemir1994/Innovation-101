import Link from 'next/link'
import { getScenarios } from '@/lib/content'

export const metadata = { title: 'Scenarios' }

export default function ScenariosPage() {
  const scenarios = getScenarios()

  return (
    <div className="max-w-content mx-auto px-6 md:px-8 py-16">
      <header className="mb-16">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-scenario)' }}
        >
          Scenarios
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-4">
          Innovation in practice
        </h1>
        <p className="text-lg text-neutral-600 max-w-[560px] leading-relaxed">
          Real-world-style challenges worked through step by step. See exactly
          how processes, frameworks, and methods come together when the stakes
          are real.
        </p>
      </header>

      {scenarios.length === 0 ? (
        <p className="text-neutral-600">No scenarios yet — content coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {scenarios.map(({ frontmatter }) => (
            <Link
              key={frontmatter.slug}
              href={`/scenarios/${frontmatter.slug}`}
              className="group block p-8 border border-neutral-100 rounded-lg hover:border-transparent hover:shadow-md transition-all"
            >
              <div className="flex gap-3 mb-4">
                <span
                  className="text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded"
                  style={{
                    color: 'var(--color-scenario)',
                    background: 'rgba(217, 119, 6, 0.08)',
                  }}
                >
                  {frontmatter.industry}
                </span>
                <span className="text-xs text-neutral-600 px-2 py-1 rounded border border-neutral-100">
                  {frontmatter.challengeType}
                </span>
              </div>
              <h2 className="font-semibold text-neutral-900 text-lg mb-2">{frontmatter.title}</h2>
              <p className="text-sm text-neutral-600 mb-4">
                Process: {frontmatter.processUsed}
              </p>
              <div
                className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{ color: 'var(--color-scenario)' }}
              >
                Read scenario <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
