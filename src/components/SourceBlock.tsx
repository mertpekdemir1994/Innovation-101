type SourceBlockProps = {
  sourceBook: string
  sourceAuthor: string
  amazonAffiliateUrl: string
}

export default function SourceBlock({ sourceBook, sourceAuthor, amazonAffiliateUrl }: SourceBlockProps) {
  return (
    <div className="border border-neutral-200 rounded-lg p-space-6 mt-space-10">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-space-4">
        Source &amp; Further Reading
      </p>
      <p className="text-neutral-900 font-semibold mb-space-1">{sourceBook}</p>
      <p className="text-sm text-neutral-600 mb-space-4">{sourceAuthor}</p>
      <a
        href={amazonAffiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-space-2 text-sm font-semibold text-section hover:opacity-70 transition-opacity"
      >
        Buy on Amazon →
      </a>
    </div>
  )
}
