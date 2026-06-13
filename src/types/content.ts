export type FrameworkFrontmatter = {
  title: string
  slug: string
  tagline: string
  oneLiner: string
  origin: string
  originYear: number
  whenToUse: string[]
  whenNotToUse: string[]
  relatedFrameworks: string[]
  relatedProcesses: string[]
  relatedMethods: string[]
  sourceBook: string
  sourceAuthor: string
  amazonAffiliateUrl: string
  interactiveType: 'double-diamond' | 'spectrum' | 'matrix' | 'funnel' | 'canvas'
  phases?: string[]
}

export type ProcessFrontmatter = {
  title: string
  slug: string
  tagline: string
  oneLiner: string
  stages: string[]
  relatedFrameworks: string[]
  relatedMethods: string[]
  sourceBook: string
  sourceAuthor: string
  amazonAffiliateUrl: string
}

export type MethodDeploymentStage = 'discover' | 'define' | 'develop' | 'deliver'

export type MethodFrontmatter = {
  title: string
  slug: string
  tagline: string
  deploymentStage: MethodDeploymentStage
  timeRequired: string
  groupSize: string
  remote: boolean
  inPerson: boolean
  relatedMethods: string[]
  relatedFrameworks: string[]
}

export type ScenarioFrontmatter = {
  title: string
  slug: string
  industry: string
  challengeType: string
  processUsed: string
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
