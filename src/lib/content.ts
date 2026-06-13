import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type {
  FrameworkFrontmatter,
  ProcessFrontmatter,
  MethodFrontmatter,
  MethodDeploymentStage,
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
    .filter((file) => file.endsWith('.mdx'))
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

export function getFrameworks(): ContentItem<FrameworkFrontmatter>[] {
  return readMdxDir<FrameworkFrontmatter>('frameworks')
}

export function getFramework(slug: string): ContentItem<FrameworkFrontmatter> | null {
  return readMdxFile<FrameworkFrontmatter>('frameworks', slug)
}

export function getProcesses(): ContentItem<ProcessFrontmatter>[] {
  return readMdxDir<ProcessFrontmatter>('processes')
}

export function getProcess(slug: string): ContentItem<ProcessFrontmatter> | null {
  return readMdxFile<ProcessFrontmatter>('processes', slug)
}

export function getMethods(): ContentItem<MethodFrontmatter>[] {
  const stages: MethodDeploymentStage[] = ['discover', 'define', 'develop', 'deliver']
  return stages.flatMap((stage) =>
    readMdxDir<MethodFrontmatter>(`methods/${stage}`)
  )
}

export function getMethodsByStage(stage: MethodDeploymentStage): ContentItem<MethodFrontmatter>[] {
  return readMdxDir<MethodFrontmatter>(`methods/${stage}`)
}

export function getMethod(slug: string): ContentItem<MethodFrontmatter> | null {
  const stages: MethodDeploymentStage[] = ['discover', 'define', 'develop', 'deliver']
  for (const stage of stages) {
    const item = readMdxFile<MethodFrontmatter>(`methods/${stage}`, slug)
    if (item) return item
  }
  return null
}

export function getScenarios(): ContentItem<ScenarioFrontmatter>[] {
  return readMdxDir<ScenarioFrontmatter>('scenarios')
}

export function getScenario(slug: string): ContentItem<ScenarioFrontmatter> | null {
  return readMdxFile<ScenarioFrontmatter>('scenarios', slug)
}

export function getReadingItems(): ContentItem<ReadingFrontmatter>[] {
  return readMdxDir<ReadingFrontmatter>('reading')
}

export function getReadingItem(slug: string): ContentItem<ReadingFrontmatter> | null {
  return readMdxFile<ReadingFrontmatter>('reading', slug)
}
