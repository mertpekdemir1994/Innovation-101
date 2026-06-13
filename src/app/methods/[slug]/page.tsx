import { notFound } from 'next/navigation'
import { getMethod, getMethods } from '@/lib/content'
import MDXRenderer from '@/components/MDXRenderer'
import CalendarCTA from '@/components/CalendarCTA'
import RelatedContent from '@/components/RelatedContent'

export async function generateStaticParams() {
  return getMethods().map(({ frontmatter }) => ({ slug: frontmatter.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getMethod(params.slug)
  if (!item) return {}
  return { title: item.frontmatter.title }
}

const STAGE_LABELS: Record<string, string> = {
  discover: 'Discover & Research',
  define: 'Synthesize & Define',
  develop: 'Ideate & Develop',
  deliver: 'Prototype, Test & Scale',
}

export default function MethodPage({ params }: { params: { slug: string } }) {
  const item = getMethod(params.slug)
  if (!item) notFound()

  const { frontmatter, content } = item

  return (
    <div>
      <header className="border-b border-neutral-100 py-16 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-methods)' }}
          >
            {STAGE_LABELS[frontmatter.deploymentStage] ?? 'Method'}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-xl text-neutral-600 max-w-[600px] mb-8">{frontmatter.tagline}</p>

          {/* Quick facts */}
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full border border-neutral-100 text-sm text-neutral-600">
              ⏱ {frontmatter.timeRequired}
            </span>
            <span className="px-3 py-1 rounded-full border border-neutral-100 text-sm text-neutral-600">
              👥 {frontmatter.groupSize}
            </span>
            {frontmatter.remote && (
              <span className="px-3 py-1 rounded-full border border-neutral-100 text-sm text-neutral-600">
                Remote
              </span>
            )}
            {frontmatter.inPerson && (
              <span className="px-3 py-1 rounded-full border border-neutral-100 text-sm text-neutral-600">
                In-person
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-prose mx-auto px-6 md:px-8 py-16">
        <MDXRenderer source={content} />
      </div>

      {(frontmatter.relatedMethods.length > 0 || frontmatter.relatedFrameworks.length > 0) && (
        <RelatedContent
          frameworks={frontmatter.relatedFrameworks}
          processes={[]}
          methods={frontmatter.relatedMethods}
        />
      )}

      <CalendarCTA title={frontmatter.title} bookingType="challenge" />
    </div>
  )
}
