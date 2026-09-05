import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type {
  FrameworkFrontmatter,
  MethodFrontmatter,
  MethodStage,
  ScenarioFrontmatter,
  ReadingFrontmatter,
  ReadingBook,
  ReadingCategory,
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

// ── Reading page (books list) ───────────────────────────────────────────────
// Single source of truth: content/reading/reading.md. See the format
// documented at the top of that file. Everything the /reading page renders
// comes from parsing it here -- no book content is duplicated in components.

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function readField(block: string, field: string): string {
  const match = block.match(new RegExp(`^${field}:\\s*(.*)$`, 'm'))
  return match ? match[1].trim() : ''
}

export function getReadingCategories(): ReadingCategory[] {
  const filePath = path.join(contentRoot, 'reading', 'reading.md')
  if (!fs.existsSync(filePath)) return []

  const raw = fs.readFileSync(filePath, 'utf-8')
  // Strip the documentation comment block at the top before parsing --
  // it contains a "### Book: <title>" template example that would
  // otherwise be picked up as a fake 21st book.
  const content = raw.replace(/<!--[\s\S]*?-->/, '')

  const categoryBlocks = content.split(/^## Category: /m).slice(1)

  return categoryBlocks.map((catBlock) => {
    const [nameLine, ...rest] = catBlock.split('\n')
    const name = nameLine.trim()
    const restJoined = rest.join('\n')
    const description = readField(restJoined, 'Description')

    const bookBlocks = restJoined.split(/^### Book: /m).slice(1)
    const books: ReadingBook[] = bookBlocks.map((bookBlock) => {
      const [titleLine, ...bookRest] = bookBlock.split('\n')
      const title = titleLine.trim()
      const bookRestJoined = bookRest.join('\n')
      const amazonUrl = readField(bookRestJoined, 'AmazonUrl')

      return {
        slug: slugify(title),
        title,
        hero: readField(bookRestJoined, 'Hero').toLowerCase() === 'true',
        author: readField(bookRestJoined, 'Author'),
        year: readField(bookRestJoined, 'Year'),
        coverUrl: readField(bookRestJoined, 'CoverUrl'),
        tags: readField(bookRestJoined, 'Tags').split(',').map((t) => t.trim()).filter(Boolean),
        summary: readField(bookRestJoined, 'Summary'),
        detail: readField(bookRestJoined, 'Detail'),
        amazonUrl: amazonUrl.length > 0 ? amazonUrl : null,
      }
    })

    // Hero always first, regardless of source order in the file.
    books.sort((a, b) => Number(b.hero) - Number(a.hero))

    return { slug: slugify(name), name, description, books }
  })
}
