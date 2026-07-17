import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type {
  FrameworkFrontmatter,
  MethodFrontmatter,
  MethodStage,
  ScenarioFrontmatter,
  ReadingFrontmatter,
  ContentItem,
} from '@/types/content'

const contentRoot = path.join(process.cwd(), 'content')

function readMdxDir<T>(dir: string): ContentItem<T>[] {
  const fullDir = path.join(contentRoot, dir)
  if (!fs.existsSync(fullDir)) return []

  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(fullDir, file), 'utf-8')
      const { data, content } = matter(raw)
      return { frontmatter: data as T, content, slug }
    })
}

function readMdxFile<T>(dir: string, slug: string): ContentItem<T> | null {
  const filePath = path.join(contentRoot, dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as T, content, slug }
}

// ── Frameworks ────────────────────────────────────────────────────────────────
// All 5 process frameworks live in content/frameworks/*.mdx

export function getFrameworks(): ContentItem<FrameworkFrontmatter>[] {
  return readMdxDir<FrameworkFrontmatter>('frameworks')
}

export function getFramework(slug: string): ContentItem<FrameworkFrontmatter> | null {
  return readMdxFile<FrameworkFrontmatter>('frameworks', slug)
}

// ── Methods ───────────────────────────────────────────────────────────────────
// All 21 methods live flat in content/methods/*.mdx
// Relationships (frameworks[], stages[]) are carried in each method's frontmatter.

export function getMethods(): ContentItem<MethodFrontmatter>[] {
  return readMdxDir<MethodFrontmatter>('methods')
}

export function getMethodsByStage(stage: MethodStage): ContentItem<MethodFrontmatter>[] {
  return getMethods().filter(({ frontmatter }) => frontmatter.stages.includes(stage))
}

export function getMethodsForFramework(frameworkSlug: string): ContentItem<MethodFrontmatter>[] {
  return getMethods().filter(({ frontmatter }) =>
    frontmatter.frameworks.some((f) => f.slug === frameworkSlug)
  )
}

export function getMethod(slug: string): ContentItem<MethodFrontmatter> | null {
  return readMdxFile<MethodFrontmatter>('methods', slug)
}

// ── Scenarios ─────────────────────────────────────────────────────────────────

export function getScenarios(): ContentItem<ScenarioFrontmatter>[] {
  return readMdxDir<ScenarioFrontmatter>('scenarios')
}

export function getScenario(slug: string): ContentItem<ScenarioFrontmatter> | null {
  return readMdxFile<ScenarioFrontmatter>('scenarios', slug)
}

// ── Reading ───────────────────────────────────────────────────────────────────

export function getReadingItems(): ContentItem<ReadingFrontmatter>[] {
  return readMdxDir<ReadingFrontmatter>('reading')
}

export function getReadingItem(slug: string): ContentItem<ReadingFrontmatter> | null {
  return readMdxFile<ReadingFrontmatter>('reading', slug)
}
