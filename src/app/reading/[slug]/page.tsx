import { notFound } from 'next/navigation'
import { getReadingItem, getReadingItems } from '@/lib/content'
import MDXRenderer from '@/components/MDXRenderer'
import SourceBlock from '@/components/SourceBlock'
import RelatedContent from '@/components/RelatedContent'

export async function generateStaticParams() {
  return getReadingItems().map(({ frontmatter }) => ({ slug: frontmatter.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getReadingItem(params.slug)
  if (!item) return {}
  return { title: `${item.frontmatter.bookTitle} — Summary` }
}

export default function ReadingItemPage({ params }: { params: { slug: string } }) {
  const item = getReadingItem(params.slug)
  if (!item) notFound()

  const { frontmatter, content } = item

  return (
    <div>
      <header className="border-b border-neutral-100 py-16 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-reading)' }}
          >
            Reading — {frontmatter.yearPublished}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-3">
            {frontmatter.bookTitle}
          </h1>
          <p className="text-xl text-neutral-600">{frontmatter.author}</p>
        </div>
      </header>

      {/* Key takeaways */}
      <div className="border-b border-neutral-100 py-12 px-6 md:px-8">
        <div className="max-w-prose mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-6">
            Key takeaways
          </p>
          <ul className="space-y-4">
            {frontmatter.keyTakeaways.map((t) => (
              <li key={t} className="flex gap-4">
                <span
                  className="mt-1 flex-shrink-0 w-1 h-4 rounded"
                  style={{ background: 'var(--color-reading)' }}
                />
                <p className="text-neutral-900">{t}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-prose mx-auto px-6 md:px-8 py-16">
        <MDXRenderer source={content} />
      </div>

      <div className="max-w-prose mx-auto px-6 md:px-8 pb-16">
        <SourceBlock
          sourceBook={frontmatter.bookTitle}
          sourceAuthor={frontmatter.author}
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
    </div>
  )
}
