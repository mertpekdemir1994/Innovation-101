import { notFound } from 'next/navigation'
import { getProcess, getProcesses } from '@/lib/content'
import MDXRenderer from '@/components/MDXRenderer'
import SourceBlock from '@/components/SourceBlock'
import CalendarCTA from '@/components/CalendarCTA'
import RelatedContent from '@/components/RelatedContent'

export async function generateStaticParams() {
  return getProcesses().map(({ frontmatter }) => ({ slug: frontmatter.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getProcess(params.slug)
  if (!item) return {}
  return { title: item.frontmatter.title }
}

export default function ProcessPage({ params }: { params: { slug: string } }) {
  const item = getProcess(params.slug)
  if (!item) notFound()

  const { frontmatter, content } = item

  return (
    <div>
      <header className="border-b border-neutral-100 py-16 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-process)' }}
          >
            Process
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-xl text-neutral-600 max-w-[600px]">{frontmatter.tagline}</p>
        </div>
      </header>

      {/* Stage map */}
      <div className="border-b border-neutral-100 py-12 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-6">
            Stages
          </p>
          <div className="flex flex-wrap gap-3">
            {frontmatter.stages.map((stage, i) => (
              <div
                key={stage}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-neutral-100 text-sm"
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{ background: 'var(--color-process)' }}
                >
                  {i + 1}
                </span>
                {stage}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-prose mx-auto px-6 md:px-8 py-16">
        <MDXRenderer source={content} />
      </div>

      <div className="max-w-prose mx-auto px-6 md:px-8 pb-16">
        <SourceBlock
          sourceBook={frontmatter.sourceBook}
          sourceAuthor={frontmatter.sourceAuthor}
          amazonAffiliateUrl={frontmatter.amazonAffiliateUrl}
        />
      </div>

      {(frontmatter.relatedFrameworks.length > 0 || frontmatter.relatedMethods.length > 0) && (
        <RelatedContent
          frameworks={frontmatter.relatedFrameworks}
          processes={[]}
          methods={frontmatter.relatedMethods}
        />
      )}

      <CalendarCTA title={frontmatter.title} bookingType="framework" />
    </div>
  )
}
