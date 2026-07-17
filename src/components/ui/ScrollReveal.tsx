'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  /** Direction the element enters from. Default: up */
  from?: 'up' | 'left' | 'right' | 'none'
}

const DISTANCE = 40

const INITIAL: Record<string, { opacity: number; x?: number; y?: number }> = {
  up:    { opacity: 0, y: DISTANCE },
  left:  { opacity: 0, x: -DISTANCE },
  right: { opacity: 0, x: DISTANCE },
  none:  { opacity: 0 },
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  from = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const prefersReduced = useReducedMotion()

  const initial = prefersReduced ? { opacity: 0 } : INITIAL[from]
  const animate = inView ? { opacity: 1, x: 0, y: 0 } : initial

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{
        duration: prefersReduced ? 0.01 : 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: prefersReduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  )
}
