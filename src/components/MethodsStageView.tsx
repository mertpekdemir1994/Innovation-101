'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { MethodDeploymentStage, ContentItem, MethodFrontmatter } from '@/types/content'

const STAGES: { key: MethodDeploymentStage; label: string }[] = [
  { key: 'discover', label: 'Discover' },
  { key: 'define', label: 'Define' },
  { key: 'develop', label: 'Develop' },
  { key: 'deliver', label: 'Deliver' },
]

type Props = {
  methodsByStage: Record<MethodDeploymentStage, ContentItem<MethodFrontmatter>[]>
}

export default function MethodsStageView({ methodsByStage }: Props) {
  const allMethods = STAGES.flatMap(({ key }) => methodsByStage[key])
  const [activeStage, setActiveStage] = useState<MethodDeploymentStage | 'az'>('discover')

  const displayMethods =
    activeStage === 'az'
      ? [...allMethods].sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title))
      : methodsByStage[activeStage]

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-neutral-100 pb-6">
        {STAGES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveStage(key)}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{
              background: activeStage === key ? 'var(--color-methods)' : 'var(--color-neutral-100)',
              color: activeStage === key ? '#fff' : 'var(--color-neutral-600)',
              fontWeight: activeStage === key ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => setActiveStage('az')}
          className="px-4 py-2 rounded-full text-sm ml-auto transition-all"
          style={{
            background: activeStage === 'az' ? 'var(--color-neutral-900)' : 'var(--color-neutral-100)',
            color: activeStage === 'az' ? '#fff' : 'var(--color-neutral-600)',
            fontWeight: activeStage === 'az' ? 600 : 400,
          }}
        >
          A – Z
        </button>
      </div>

      {/* Method cards */}
      {displayMethods.length === 0 ? (
        <p className="text-neutral-600">No methods in this stage yet — content coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayMethods.map(({ frontmatter }) => (
            <Link
              key={frontmatter.slug}
              href={`/methods/${frontmatter.slug}`}
              className="group block p-5 border border-neutral-100 rounded-lg hover:border-transparent hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-inherit">
                {frontmatter.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{frontmatter.tagline}</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-neutral-600 border border-neutral-100 px-2 py-0.5 rounded">
                  {frontmatter.timeRequired}
                </span>
                <span className="text-xs text-neutral-600 border border-neutral-100 px-2 py-0.5 rounded">
                  {frontmatter.groupSize}
                </span>
                {frontmatter.remote && (
                  <span className="text-xs text-neutral-600 border border-neutral-100 px-2 py-0.5 rounded">
                    Remote
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
