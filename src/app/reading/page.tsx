import Link from 'next/link'
import { getReadingItems } from '@/lib/content'

export const metadata = { title: 'Reading' }

export default function ReadingPage() {
  const items = getReadingItems()

  return (
    <div className="max-w-content mx-auto px-6 md:px-8 py-16">
      <header className="mb-16">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-reading)' }}
        >
          Reading
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-4">
          The books behind the ideas
        </h1>
        <p className="text-lg text-neutral-600 max-w-[560px] leading-relaxed">
          Key takeaways from the foundational texts on innovation — the
          frameworks, processes, and methods on this site trace back to these
          books.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-neutral-600">No reading summaries yet — content coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ frontmatter }) => (
            <Link
              key={frontmatter.slug}
              href={`/reading/${frontmatter.slug}`}
              className="group block p-6 border border-neutral-100 rounded-lg hover:border-transparent hover:shadow-md transition-all"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-2">
                {frontmatter.yearPublished}
              </p>
              <h2 className="font-semibold text-neutral-900 mb-1">{frontmatter.bookTitle}</h2>
              <p className="text-sm text-neutral-600 mb-4">{frontmatter.author}</p>
              <ul className="space-y-1 mb-6">
                {frontmatter.keyTakeaways.slice(0, 2).map((t) => (
                  <li key={t} className="text-sm text-neutral-600 flex gap-2">
                    <span style={{ color: 'var(--color-reading)' }}>—</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div
                className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{ color: 'var(--color-reading)' }}
              >
                Read summary <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
