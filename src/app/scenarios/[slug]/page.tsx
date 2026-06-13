import { notFound } from 'next/navigation'
import { getScenario, getScenarios } from '@/lib/content'
import MDXRenderer from '@/components/MDXRenderer'
import CalendarCTA from '@/components/CalendarCTA'

export async function generateStaticParams() {
  return getScenarios().map(({ frontmatter }) => ({ slug: frontmatter.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getScenario(params.slug)
  if (!item) return {}
  return { title: item.frontmatter.title }
}

export default function ScenarioPage({ params }: { params: { slug: string } }) {
  const item = getScenario(params.slug)
  if (!item) notFound()

  const { frontmatter, content } = item

  return (
    <div>
      <header className="border-b border-neutral-100 py-16 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <div className="flex flex-wrap gap-3 mb-6">
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
            <span className="text-xs text-neutral-600 px-2 py-1 rounded border border-neutral-100">
              {frontmatter.duration}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance">
            {frontmatter.title}
          </h1>
        </div>
      </header>

      {/* Concepts used */}
      <div className="border-b border-neutral-100 py-10 px-6 md:px-8">
        <div className="max-w-content mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-3">
              Process
            </p>
            <p className="text-neutral-900">{frontmatter.processUsed}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-3">
              Frameworks
            </p>
            <div className="flex flex-wrap gap-2">
              {frontmatter.frameworks.map((f) => (
                <span key={f} className="text-sm text-neutral-600 border border-neutral-100 px-2 py-1 rounded">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-3">
              Methods
            </p>
            <div className="flex flex-wrap gap-2">
              {frontmatter.methods.map((m) => (
                <span key={m} className="text-sm text-neutral-600 border border-neutral-100 px-2 py-1 rounded">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-prose mx-auto px-6 md:px-8 py-16">
        <MDXRenderer source={content} />
      </div>

      <CalendarCTA title={frontmatter.title} bookingType="challenge" />
    </div>
  )
}
