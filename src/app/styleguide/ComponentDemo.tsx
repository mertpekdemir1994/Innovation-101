'use client'

import Accordion from '@/components/ui/Accordion'
import Card from '@/components/ui/Card'
import Expandable from '@/components/ui/Expandable'
import Eyebrow from '@/components/ui/Eyebrow'
import { CTAPrimary, CTASecondary, CTAText } from '@/components/ui/CTA'

const expandableItems = [
  {
    id: 'discover',
    title: 'Discover — diverge to understand the problem space',
    content: 'Broad research into the user, market, and context. The goal is not to confirm assumptions but to challenge them.',
  },
  {
    id: 'define',
    title: 'Define — converge to frame the right problem',
    content: 'Synthesise research into a clear, actionable problem statement. The frame you choose determines everything that follows.',
  },
  {
    id: 'develop',
    title: 'Develop — diverge to explore potential solutions',
    content: 'Generate a wide range of concepts, prototypes, and experiments. Diverge first, then filter.',
  },
  {
    id: 'deliver',
    title: 'Deliver — converge to ship the right solution',
    content: 'Test, iterate, and ship. Define what success looks like before you start.',
  },
]

export default function ComponentDemo() {
  return (
    <div className="space-y-space-12">

      {/* Eyebrow */}
      <div>
        <p className="text-sm font-semibold text-neutral-600 mb-space-4">Eyebrow</p>
        <p className="text-xs text-neutral-500 mb-space-4">
          JetBrains Mono · text-xs · uppercase · tracking-widest · text-section
        </p>
        <div className="flex flex-col gap-space-3">
          <div style={{ '--color-section': 'var(--color-framework)' } as React.CSSProperties}>
            <Eyebrow>Framework · Design Council</Eyebrow>
          </div>
          <div style={{ '--color-section': 'var(--color-process)' } as React.CSSProperties}>
            <Eyebrow>Process · 4 stages</Eyebrow>
          </div>
          <div style={{ '--color-section': 'var(--color-methods)' } as React.CSSProperties}>
            <Eyebrow>Methods · Discovery phase</Eyebrow>
          </div>
        </div>
      </div>

      {/* Card */}
      <div>
        <p className="text-sm font-semibold text-neutral-600 mb-space-4">Card</p>
        <p className="text-xs text-neutral-500 mb-space-4">
          shadow-card at rest · shadow-float + y:-2 on hover (spring.gentle)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
          <Card>
            <Eyebrow className="mb-space-2">Framework</Eyebrow>
            <p className="text-base font-semibold text-neutral-900 mb-space-2">Double Diamond</p>
            <p className="text-sm text-neutral-600">Separate the problem from the solution.</p>
          </Card>
          <Card padding="sm">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-1">Small padding</p>
            <p className="text-sm font-semibold text-neutral-900">Compact card</p>
          </Card>
          <Card href="#" padding="lg">
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-2">Link card</p>
            <p className="text-base font-semibold text-neutral-900">Hover me →</p>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div>
        <p className="text-sm font-semibold text-neutral-600 mb-space-4">CTA — live components</p>
        <p className="text-xs text-neutral-500 mb-space-4">
          Framer Motion whileHover (scale 1.02) + whileTap (scale 0.97) via spring.snappy
        </p>
        <div
          className="flex flex-wrap gap-space-4 items-center"
          style={{ '--color-section': 'var(--color-framework)' } as React.CSSProperties}
        >
          <CTAPrimary>Explore Framework</CTAPrimary>
          <CTASecondary>Learn More</CTASecondary>
          <CTAText>View case study →</CTAText>
          <CTAPrimary disabled>Disabled</CTAPrimary>
        </div>
      </div>

      {/* Accordion */}
      <div>
        <p className="text-sm font-semibold text-neutral-600 mb-space-4">Accordion</p>
        <p className="text-xs text-neutral-500 mb-space-4">
          AnimatePresence · height: 0 → auto · spring.snappy · chevron rotate
        </p>
        <div className="max-w-prose">
          <Accordion title="What is the Double Diamond?" defaultOpen>
            The Double Diamond is a structured innovation process framework developed by the Design
            Council in 2005. It separates the work of finding the right problem from the work of
            finding the right solution.
          </Accordion>
        </div>
      </div>

      {/* Expandable */}
      <div>
        <p className="text-sm font-semibold text-neutral-600 mb-space-4">Expandable (accordion group)</p>
        <p className="text-xs text-neutral-500 mb-space-4">
          Controlled multi-item group. Default: single open at a time.
        </p>
        <div className="max-w-prose">
          <Expandable items={expandableItems} />
        </div>
      </div>

    </div>
  )
}
