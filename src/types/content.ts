// All 5 process frameworks (Double Diamond, Design Sprint, Lean Startup,
// Agile Innovation, Forward Deployed Engineering) share this type.
// There is no separate "Process" type — they are all frameworks.
export type FrameworkFrontmatter = {
  title: string
  slug: string
  tagline: string
  oneLiner: string
  origin: string
  originYear: number
  whenToUse: string[]
  whenNotToUse: string[]
  relatedMethods: string[]
  relatedFrameworks: string[]
  sourceBook: string
  sourceAuthor: string
  amazonAffiliateUrl: string
  interactiveType: 'double-diamond' | 'spectrum' | 'matrix' | 'funnel' | 'canvas' | 'timeline'
  phases?: string[]
}

// Canonical stage groups — six groups, one per cluster of methods.
// A method belongs to exactly one primary group (frontmatter: stages[0]).
export type MethodStage =
  | 'discovery'    // Discovery & Research
  | 'synthesis'    // Synthesis & Framing
  | 'experience'   // Experience & Systems Mapping
  | 'ideation'     // Ideation & Prototyping
  | 'strategy'     // Strategy & Prioritization
  | 'validation'   // Delivery & Validation

export type MethodFrameworkLink = {
  slug: string   // framework slug, e.g. "double-diamond"
  phase: string  // phase name within that framework, e.g. "Discover"
}

// Tools & methods — the 21 tools deployed within the 5 frameworks.
// Files live flat in content/methods/*.mdx with no subdirectory grouping.
export type MethodFrontmatter = {
  title: string
  slug: string
  tagline: string
  // Which stages this method belongs to (can be several)
  stages: MethodStage[]
  // Which frameworks/phases this method is used in (many-to-many)
  frameworks: MethodFrameworkLink[]
  timeRequired: string
  groupSize: string
  remote: boolean
  inPerson: boolean
  relatedMethods: string[]
}

export type ScenarioFrontmatter = {
  title: string
  slug: string
  industry: string
  challengeType: string
  frameworks: string[]
  methods: string[]
  duration: string
}

export type ReadingFrontmatter = {
  title: string
  slug: string
  bookTitle: string
  author: string
  yearPublished: number
  amazonAffiliateUrl: string
  keyTakeaways: string[]
  relatedFrameworks: string[]
  relatedMethods: string[]
}

export type ContentItem<T> = {
  frontmatter: T
  content: string
  slug: string
}

// The /reading page's book list. Parsed from the single source-of-truth
// file content/reading/reading.md (see the format documented at the top
// of that file) by getReadingCategories() in src/lib/content.ts. Not a
// per-item MDX type like the others above -- one file holds all 20 books.
export type ReadingBook = {
  slug: string
  title: string
  hero: boolean
  author: string
  tags: string[]
  summary: string
  detail: string
  amazonUrl: string | null
}

export type ReadingCategory = {
  slug: string
  name: string
  description: string
  books: ReadingBook[]
}
