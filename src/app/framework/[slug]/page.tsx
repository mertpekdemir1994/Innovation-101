import { notFound } from 'next/navigation'
import { getFramework, getFrameworks } from '@/lib/content'
import MDXRenderer from '@/components/MDXRenderer'
import SourceBlock from '@/components/SourceBlock'
import CalendarCTA from '@/components/CalendarCTA'
import RelatedContent from '@/components/RelatedContent'

export async function generateStaticParams() {
  return getFrameworks().map(({ frontmatter }) => ({ slug: frontmatter.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getFramework(params.slug)
  if (!item) return {}
  return { title: item.frontmatter.title }
}

export default function FrameworkPage({ params }: { params: { slug: string } }) {
  const item = getFramework(params.slug)
  if (!item) notFound()

  const { frontmatter, content } = item

  return (
    <div>
      {/* Hero header */}
      <header
        className="border-b border-neutral-100 py-16 px-6 md:px-8"
        style={{ borderTopColor: 'var(--color-framework)' }}
      >
        <div className="max-w-content mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-framework)' }}
          >
            Framework
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-xl text-neutral-600 max-w-[600px]">{frontmatter.tagline}</p>
        </div>
      </header>

      {/* Interactive visualization placeholder */}
      <div
        className="w-full py-24 flex items-center justify-center border-b border-neutral-100 text-neutral-600 text-sm"
        style={{ background: 'var(--color-neutral-100)' }}
      >
        Interactive {frontmatter.interactiveType} visualization — coming in Step 10
      </div>

      {/* Content */}
      <div className="max-w-prose mx-auto px-6 md:px-8 py-16">
        <MDXRenderer source={content} />
      </div>

      {/* Source & Further Reading */}
      <div className="max-w-prose mx-auto px-6 md:px-8 pb-16">
        <SourceBlock
          sourceBook={frontmatter.sourceBook}
          sourceAuthor={frontmatter.sourceAuthor}
          amazonAffiliateUrl={frontmatter.amazonAffiliateUrl}
        />
      </div>

      {/* Related content */}
      {(frontmatter.relatedFrameworks.length > 0 ||
        frontmatter.relatedProcesses.length > 0 ||
        frontmatter.relatedMethods.length > 0) && (
        <RelatedContent
          frameworks={frontmatter.relatedFrameworks}
          processes={frontmatter.relatedProcesses}
          methods={frontmatter.relatedMethods}
        />
      )}

      {/* Calendar CTA */}
      <CalendarCTA title={frontmatter.title} bookingType="framework" />
    </div>
  )
}
