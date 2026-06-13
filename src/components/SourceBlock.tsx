type SourceBlockProps = {
  sourceBook: string
  sourceAuthor: string
  amazonAffiliateUrl: string
}

export default function SourceBlock({ sourceBook, sourceAuthor, amazonAffiliateUrl }: SourceBlockProps) {
  return (
    <div className="border border-neutral-100 rounded-lg p-6 mt-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
        Source &amp; Further Reading
      </p>
      <p className="text-neutral-900 font-semibold mb-1">{sourceBook}</p>
      <p className="text-sm text-neutral-600 mb-4">{sourceAuthor}</p>
      <a
        href={amazonAffiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
        style={{ color: 'var(--color-section)' }}
      >
        Buy on Amazon →
      </a>
    </div>
  )
}
