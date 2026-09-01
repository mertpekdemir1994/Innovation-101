import Link from 'next/link'
import styles from './methods-bands.module.css'

interface Method {
  name: string
  slug: string
}

interface StageGroup {
  key: string
  label: string
  color: string
  rgb: string
  count: number
  problem: string
  description: string
  methods: Method[]
}

const STAGES: StageGroup[] = [
  {
    key: 'discovery',
    label: 'Discovery',
    color: 'var(--stage-discovery)',
    rgb: '61, 107, 90',
    count: 6,
    problem: "You don't yet know what you don't know.",
    description:
      'The goal is to observe people in their actual context without an agenda: letting real behavior, hidden workarounds, and unspoken constraints surface before any solution is considered.',
    methods: [
      { name: 'Contextual Observation',          slug: 'contextual-observation' },
      { name: 'In-Depth Interviews',             slug: 'in-depth-interviews' },
      { name: 'Diary Studies',                   slug: 'diary-studies' },
      { name: 'Ecosystem Mapping',               slug: 'ecosystem-mapping' },
      { name: 'Stakeholder Mapping',             slug: 'stakeholder-mapping' },
      { name: 'Competitive Landscape Analysis',  slug: 'competitive-landscape-analysis' },
    ],
  },
  {
    key: 'synthesis',
    label: 'Synthesis',
    color: 'var(--stage-synthesis)',
    rgb: '31, 58, 95',
    count: 6,
    problem: 'You have observations. You need insight.',
    description:
      'Raw observations only become actionable when forced into structure: synthesis methods make patterns visible and reveal what the data is actually saying beneath the surface.',
    methods: [
      { name: 'Affinity Mapping',        slug: 'affinity-mapping' },
      { name: 'Empathy Mapping',         slug: 'empathy-mapping' },
      { name: 'How Might We?',           slug: 'how-might-we' },
      { name: 'Jobs to Be Done',         slug: 'jobs-to-be-done' },
      { name: 'Personas & Archetypes',   slug: 'personas-archetypes' },
      { name: 'Concept Testing',         slug: 'concept-testing' },
    ],
  },
  {
    key: 'experience',
    label: 'Experience',
    color: 'var(--stage-experience)',
    rgb: '42, 111, 122',
    count: 6,
    problem: 'You need to see the system, not just the problem.',
    description:
      'Most friction isn\'t a single broken touchpoint but the accumulated cost of how a system adds up over time: these methods map the full arc so you can intervene where it actually matters.',
    methods: [
      { name: "The 5 E's Framework",  slug: '5es-framework' },
      { name: 'Flow Mapping',         slug: 'flow-mapping' },
      { name: 'Journey Mapping',      slug: 'journey-mapping' },
      { name: 'Service Blueprinting', slug: 'service-blueprinting' },
      { name: 'Systems Mapping',      slug: 'systems-mapping' },
      { name: 'Orthodoxies',          slug: 'orthodoxies' },
    ],
  },
  {
    key: 'ideation',
    label: 'Ideation',
    color: 'var(--stage-ideation)',
    rgb: '181, 97, 62',
    count: 6,
    problem: "You know what's needed. Now generate what's possible.",
    description:
      'A well-framed problem generates better options than open brainstorming: these methods suspend judgment long enough to reach possibilities you wouldn\'t find by reasoning from the obvious.',
    methods: [
      { name: 'Crazy 8s',              slug: 'crazy-8s' },
      { name: 'Co-Creation Workshops', slug: 'co-creation-workshops' },
      { name: 'Storyboarding',         slug: 'storyboarding' },
      { name: 'Rapid Prototyping',     slug: 'rapid-prototyping' },
      { name: 'Analogs & Precursors',  slug: 'analogs-precursors' },
      { name: 'Assumption Mapping',    slug: 'assumption-mapping' },
    ],
  },
  {
    key: 'strategy',
    label: 'Strategy',
    color: 'var(--stage-strategy)',
    rgb: '107, 74, 119',
    count: 9,
    problem: 'You have options. You need to make choices.',
    description:
      'Good options don\'t simplify decisions. They make them harder. Strategy tools force explicit criteria about which bets to place, which directions to walk away from, and why.',
    methods: [
      { name: 'Ambition Matrix',            slug: 'ambition-matrix' },
      { name: 'Avatars',                    slug: 'avatars' },
      { name: 'Balanced Breakthrough',      slug: 'balanced-breakthrough' },
      { name: 'Business Model Canvas',      slug: 'business-model-canvas' },
      { name: 'Design Principles',          slug: 'design-principles' },
      { name: 'Strategic Choice Cascade',   slug: 'strategic-choice-cascade' },
      { name: 'Ten Types of Innovation',    slug: 'ten-types-innovation' },
      { name: 'SWOT Analysis',               slug: 'swot-analysis' },
      { name: 'Value Proposition Canvas',   slug: 'value-proposition-canvas' },
    ],
  },
  {
    key: 'validation',
    label: 'Validation',
    color: 'var(--stage-validation)',
    rgb: '138, 75, 60',
    count: 7,
    problem: 'You have a solution. Now test it against reality.',
    description:
      'Every solution is a hypothesis about what the world will accept: these methods put it in front of real users, real conditions, and real constraints before committing the investment to build it at scale.',
    methods: [
      { name: 'MVP / MLP',                   slug: 'mvp-mlp' },
      { name: 'Usability Testing',           slug: 'usability-testing' },
      { name: 'Pilot Launches',              slug: 'pilot-launches' },
      { name: 'Proof of Concept',            slug: 'proof-of-concept' },
      { name: 'Post-Launch Feedback Loops',  slug: 'post-launch-feedback-loops' },
      { name: 'Delivery Roadmap',            slug: 'delivery-roadmap' },
      { name: 'Capability Mapping',          slug: 'capability-mapping' },
    ],
  },
]

export default function MethodsBands() {
  return (
    <>
      <div className={styles.grid}>
        {STAGES.map(stage => (
          <div
            key={stage.key}
            className={styles.tile}
            style={{
              '--band-color': stage.color,
              '--band-rgb': stage.rgb,
            } as React.CSSProperties}
          >
            {/* Stage header */}
            <div className={styles.tileHeader}>
              <span className={styles.stageName}>{stage.label}</span>
              <span className={styles.stageCount}>×{stage.count}</span>
            </div>

            {/* Problem one-liner */}
            <p className={styles.problem}>{stage.problem}</p>

            {/* Full description sentence */}
            <p className={styles.description}>{stage.description}</p>

            {/* Method links */}
            <div className={styles.methods}>
              {stage.methods.map(m => (
                <Link key={m.slug} href={`/methods/${m.slug}`} className={styles.chip}>
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link href="/methods" className={styles.cta}>
        Explore all methods <span aria-hidden="true">→</span>
      </Link>
    </>
  )
}
