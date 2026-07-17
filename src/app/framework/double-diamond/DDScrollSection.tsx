'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import DoubleDiamondViz, { type Phase, type PhaseContent } from '@/components/viz/DoubleDiamondViz'

interface DDScrollSectionProps {
  phaseContent: Record<Phase, PhaseContent>
  theme?: 'light' | 'dark'
}

export default function DDScrollSection({ phaseContent, theme = 'dark' }: DDScrollSectionProps) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-space-8"
    >
      <DoubleDiamondViz phaseContent={phaseContent} theme={theme} />
    </motion.div>
  )
}
