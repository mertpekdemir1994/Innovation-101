import Link from 'next/link'

type RelatedContentProps = {
  frameworks: string[]
  processes: string[]
  methods: string[]
}

const TYPE_CONFIG = {
  framework: { label: 'Framework', href: (slug: string) => `/framework/${slug}`, color: 'var(--color-framework)' },
  process: { label: 'Process', href: (slug: string) => `/process/${slug}`, color: 'var(--color-process)' },
  method: { label: 'Method', href: (slug: string) => `/methods/${slug}`, color: 'var(--color-methods)' },
}

type RelatedItem = { type: keyof typeof TYPE_CONFIG; slug: string }

export default function RelatedContent({ frameworks, processes, methods }: RelatedContentProps) {
  const items: RelatedItem[] = [
    ...frameworks.map((slug) => ({ type: 'framework' as const, slug })),
    ...processes.map((slug) => ({ type: 'process' as const, slug })),
    ...methods.map((slug) => ({ type: 'method' as const, slug })),
  ]

  if (items.length === 0) return null

  return (
    <div className="border-t border-neutral-100 py-16 px-6 md:px-8">
      <div className="max-w-content mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-8">
          Related
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map(({ type, slug }) => {
            const config = TYPE_CONFIG[type]
            const displaySlug = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
            return (
              <Link
                key={`${type}-${slug}`}
                href={config.href(slug)}
                className="group flex items-center justify-between p-5 border border-neutral-100 rounded-lg hover:border-transparent hover:shadow-md transition-all"
              >
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest block mb-1"
                    style={{ color: config.color }}
                  >
                    {config.label}
                  </span>
                  <span className="font-semibold text-neutral-900 text-sm">{displaySlug}</span>
                </div>
                <span
                  className="text-neutral-600 group-hover:translate-x-1 transition-transform"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
