import { MetadataRoute } from 'next'
import { getFrameworks, getMethods, getScenarios, getReadingItems } from '@/lib/content'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.innovation-101.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Dynamic content — filter out placeholder stubs
  const frameworks = getFrameworks().filter(f => f.slug !== 'placeholder')
  const methods    = getMethods().filter(m => m.slug !== 'placeholder')
  const scenarios  = getScenarios().filter(s => s.slug !== 'placeholder')
  const reading    = getReadingItems().filter(r => r.slug !== 'placeholder')

  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                      lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/frameworks`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/methods`,         lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/scenarios`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/reading`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ]

  // ── Dynamic routes ─────────────────────────────────────────────────────────
  const frameworkRoutes: MetadataRoute.Sitemap = frameworks.map(f => ({
    url:             `${BASE_URL}/framework/${f.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  const methodRoutes: MetadataRoute.Sitemap = methods.map(m => ({
    url:             `${BASE_URL}/methods/${m.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  const scenarioRoutes: MetadataRoute.Sitemap = scenarios.map(s => ({
    url:             `${BASE_URL}/scenarios/${s.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const readingRoutes: MetadataRoute.Sitemap = reading.map(r => ({
    url:             `${BASE_URL}/reading/${r.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.6,
  }))

  return [
    ...staticRoutes,
    ...frameworkRoutes,
    ...methodRoutes,
    ...scenarioRoutes,
    ...readingRoutes,
  ]
}
