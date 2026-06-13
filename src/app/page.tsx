import Link from 'next/link'

const ENTRY_POINTS = [
  {
    label: 'Processes & Frameworks',
    href: '/explore',
    color: 'var(--color-framework)',
    description:
      'End-to-end innovation journeys and the mental models that power them. From Design Thinking to Blue Ocean Strategy.',
    question: 'How do I think about this problem?',
  },
  {
    label: 'Methods',
    href: '/methods',
    color: 'var(--color-methods)',
    description:
      'Specific tools and techniques for every stage of the innovation process — from discovery to scale.',
    question: 'What do I do in my session today?',
  },
  {
    label: 'Scenarios',
    href: '/scenarios',
    color: 'var(--color-scenario)',
    description:
      'Real-world-style challenges worked through step by step — see exactly how frameworks and methods come together in practice.',
    question: 'What does this actually look like in practice?',
  },
]

const WHAT_IS_NEW = [
  { type: 'Framework', label: 'Double Diamond', href: '/framework/double-diamond' },
  { type: 'Framework', label: '10 Types of Innovation', href: '/framework/10-types' },
  { type: 'Process', label: 'Design Thinking', href: '/process/design-thinking' },
]

const TYPE_COLORS: Record<string, string> = {
  Framework: 'var(--color-framework)',
  Process: 'var(--color-process)',
  Method: 'var(--color-methods)',
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-8 max-w-content mx-auto py-24">
        <p className="text-sm font-semibold text-neutral-600 uppercase tracking-widest mb-6">
          Innovation 101
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 leading-[1.1] text-balance mb-8 max-w-[800px]">
          Innovation is a learnable skill.
          <br />
          <span className="text-neutral-600">Here&apos;s how it works.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-[560px] leading-relaxed mb-12">
          An interactive guide to the processes, frameworks, and methods that
          drive real innovation — not theory, not buzzwords. Explorable, not
          just readable.
        </p>

        {/* Entry point cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {ENTRY_POINTS.map(({ label, href, color, description, question }) => (
            <Link
              key={href}
              href={href}
              className="group block p-8 border border-neutral-100 rounded-lg hover:border-transparent hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color }}
              >
                {label}
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                {description}
              </p>
              <p className="text-sm font-semibold italic" style={{ color }}>
                &ldquo;{question}&rdquo;
              </p>
              <div
                className="mt-6 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{ color }}
              >
                Explore
                <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-neutral-100 py-24 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
            Featured
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold text-neutral-900 mb-4 text-balance">
                The Double Diamond
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                The most widely used innovation framework in the world — and the
                most misunderstood. Explore it interactively: zoom into each
                phase, see what happens inside, understand when to diverge and
                when to converge.
              </p>
              <Link
                href="/framework/double-diamond"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                style={{ color: 'var(--color-framework)' }}
              >
                Explore the Double Diamond <span aria-hidden>→</span>
              </Link>
            </div>
            <div
              className="aspect-video rounded-lg flex items-center justify-center text-neutral-600 text-sm"
              style={{ background: 'var(--color-neutral-100)' }}
            >
              Double Diamond visualization coming in Step 10
            </div>
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-24 px-6 md:px-8 border-t border-neutral-100">
        <div className="max-w-prose mx-auto text-center">
          <p className="text-neutral-600 text-lg leading-relaxed mb-6">
            This site is a personal project — a practical, interactive reference
            for anyone serious about learning how innovation actually works.
            Every framework is explorable. Every method is actionable.
          </p>
          <Link
            href="/about"
            className="text-sm font-semibold text-neutral-900 hover:opacity-70 transition-opacity"
          >
            About this site →
          </Link>
        </div>
      </section>

      {/* What&apos;s new */}
      <section className="py-24 px-6 md:px-8 border-t border-neutral-100">
        <div className="max-w-content mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-8">
            Recently added
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {WHAT_IS_NEW.map(({ type, label, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between p-6 border border-neutral-100 rounded-lg hover:border-transparent hover:shadow-md transition-all"
              >
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest block mb-1"
                    style={{ color: TYPE_COLORS[type] ?? 'var(--color-neutral-600)' }}
                  >
                    {type}
                  </span>
                  <span className="font-semibold text-neutral-900">{label}</span>
                </div>
                <span
                  className="text-neutral-600 group-hover:translate-x-1 transition-transform"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
