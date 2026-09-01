'use client'

import DDScrollSection from './DDScrollSection'
import type { Phase, PhaseContent } from '@/components/viz/DoubleDiamondViz'

const phaseContent: Record<Phase, PhaseContent> = {
  discover: {
    phase: 'discover',
    headline: 'Discover: diverge to understand the problem space',
    activities: [
      {
        id: 'discover-user-research',
        title: 'User Research',
        summary: 'Ethnographic and contextual research into how people experience the problem space. The goal is not to confirm assumptions but to challenge them: observe what people do, not just what they say.',
        prompt: 'What would you need to see, hear, or learn to be surprised about this problem?',
        methodSlug: 'user-interviews',
      },
      {
        id: 'discover-market-scan',
        title: 'Market & Business Model Scan',
        summary: 'Map the market landscape, benchmark adjacent business models, and analyse margin structures in related categories. Understand what viable solutions look like commercially before you define the problem.',
        prompt: 'What business models already exist in adjacent spaces? What does sustainable look like here?',
      },
      {
        id: 'discover-capability-map',
        title: 'Capability & Technology Scan',
        summary: 'Audit existing organisational capabilities, manufacturing assets, distribution relationships, and technology. Map what is newly possible. Understand the boundaries of what is buildable.',
        prompt: 'What does your organisation do well that could be relevant here?',
      },
    ],
  },
  define: {
    phase: 'define',
    headline: 'Define: converge to frame the right problem',
    activities: [
      {
        id: 'define-synthesis',
        title: 'Synthesis & Insight Generation',
        summary: 'Synthesise everything learned in Discover into insights: patterns of need, behaviour, or tension that reveal what is going on. An insight is not a finding; it is an interpretation of a finding that points toward opportunity.',
        prompt: 'What did you learn that surprised you? What assumption did the research overturn?',
        methodSlug: 'how-might-we',
      },
      {
        id: 'define-pov',
        title: 'Point of View Statement',
        summary: 'Write a clear, specific problem statement: [User] needs [need] because [insight]. This becomes the frame for everything in Diamond 2. A good POV is specific enough to act on but broad enough to allow creative exploration.',
        prompt: 'Write your Point of View statement here. What will you and will you NOT be solving?',
      },
    ],
  },
  develop: {
    phase: 'develop',
    headline: 'Develop: diverge to explore potential solutions',
    activities: [
      {
        id: 'develop-ideation',
        title: 'Concept Generation',
        summary: 'Generate a wide range of concepts before evaluating any of them. Diverge first. Volume before quality. The best ideas rarely come first. Use How Might We questions from Define to open up the solution space.',
        prompt: 'List ten different types of solutions to your POV, not ten variations of the same solution.',
        methodSlug: 'how-might-we',
      },
      {
        id: 'develop-prototype',
        title: 'Rapid Prototyping',
        summary: 'Build rough, fast representations of your top concepts (paper, sketches, role-play, or digital mocks) and expose them to people. The goal is to learn, not to impress. Fail fast and learn faster.',
        prompt: 'What is the cheapest and fastest way to test whether people want this?',
      },
    ],
  },
  deliver: {
    phase: 'deliver',
    headline: 'Deliver: converge to ship the right solution',
    activities: [
      {
        id: 'deliver-validation',
        title: 'Validation',
        summary: 'User research confirms people want, understand, and will use the solution. Not just that they say they like it in a test; evidence they will adopt it in their real context.',
        prompt: 'What is the evidence that people will use this in their real lives, not just in a test environment?',
      },
      {
        id: 'deliver-launch',
        title: 'Feasibility & Launch',
        summary: 'Operations and technology teams confirm delivery is achievable. What needs to be built, hired, or partnered for? What is the minimum viable launch configuration? Then ship.',
        prompt: 'What is the one thing that most threatens delivery feasibility? How will you address it?',
      },
    ],
  },
}

export default function DDInteractiveSection() {
  return <DDScrollSection phaseContent={phaseContent} theme="dark" />
}
