import { notFound } from 'next/navigation'
import { getMethod, getMethods } from '@/lib/content'
import MDXRenderer from '@/components/MDXRenderer'
import CalendarCTA from '@/components/CalendarCTA'
import RelatedContent from '@/components/RelatedContent'

// These slugs have dedicated pages under /methods/<slug>/ and are excluded from the dynamic route
const CUSTOM_ROUTES = new Set(['in-depth-interviews', 'ambition-matrix', 'personas-archetypes', 'avatars', 'journey-mapping', 'service-blueprinting', '5es-framework', 'ecosystem-mapping', 'how-might-we', 'affinity-mapping', 'empathy-mapping', 'jobs-to-be-done', 'value-proposition-canvas', 'concept-testing', 'ten-types-innovation', 'contextual-observation', 'orthodoxies', 'analogs-precursors', 'competitive-landscape-analysis', 'stakeholder-mapping', 'diary-studies', 'crazy-8s', 'rapid-prototyping', 'balanced-breakthrough', 'strategic-choice-cascade', 'swot-analysis'])

export async function generateStaticParams() {
  return getMethods()
    .filter(({ frontmatter }) => !CUSTOM_ROUTES.has(frontmatter.slug))
    .map(({ frontmatter }) => ({ slug: frontmatter.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getMethod(params.slug)
  if (!item) return {}
  return { title: item.frontmatter.title }
}

const STAGE_LABELS: Record<string, string> = {
  discovery:   'Discovery & Research',
  synthesis:   'Synthesis & Framing',
  experience:  'Experience & Systems Mapping',
  ideation:    'Ideation & Prototyping',
  strategy:    'Strategy & Prioritization',
  validation:  'Delivery & Validation',
}

const STAGE_COLORS: Record<string, string> = {
  discovery:   'var(--stage-discovery)',
  synthesis:   'var(--stage-synthesis)',
  experience:  'var(--stage-experience)',
  ideation:    'var(--stage-ideation)',
  strategy:    'var(--stage-strategy)',
  validation:  'var(--stage-validation)',
}

export default function MethodPage({ params }: { params: { slug: string } }) {
  const item = getMethod(params.slug)
  if (!item) notFound()

  const { frontmatter, content } = item

  return (
    <div>
      <header className="border-b border-neutral-100 py-16 px-6 md:px-8">
        <div className="max-w-content mx-auto">
          {/* Stage badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.stages.map((stage) => (
              <span
                key={stage}
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  color: STAGE_COLORS[stage] ?? 'var(--color-methods)',
                  background: 'var(--color-neutral-100)',
                }}
              >
                {STAGE_LABELS[stage] ?? stage}
              </span>
            ))}
          </div>

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

      {/* Used in */}
      {frontmatter.frameworks.length > 0 && (
        <div className="border-b border-neutral-100 py-8 px-6 md:px-8">
          <div className="max-w-content mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Used in
            </p>
            <div className="flex flex-wrap gap-3">
              {frontmatter.frameworks.map(({ slug, phase }) => (
                <a
                  key={`${slug}-${phase}`}
                  href={`/framework/${slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 text-sm hover:border-transparent hover:shadow-sm transition-all"
                >
                  <span className="font-semibold text-neutral-900">
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-600">{phase}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-prose mx-auto px-6 md:px-8 py-16">
        <MDXRenderer source={content} />
      </div>

      {(frontmatter.relatedMethods.length > 0 || frontmatter.frameworks.length > 0) && (
        <RelatedContent
          frameworks={frontmatter.frameworks.map((f) => f.slug)}
          methods={frontmatter.relatedMethods}
        />
      )}

      <CalendarCTA title={frontmatter.title} />
    </div>
  )
}
