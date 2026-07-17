'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { spring } from '@/lib/motion'

interface CardProps {
  children: React.ReactNode
  href?: string
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({ children, href, className = '', padding = 'md' }: CardProps) {
  const prefersReduced = useReducedMotion()

  const p = { sm: 'p-space-4', md: 'p-space-6', lg: 'p-space-8' }[padding]
  const base = `block rounded-lg border border-neutral-200 bg-white ${p} ${className}`
  const style = { boxShadow: 'var(--shadow-card)' }
  const hoverAnim = prefersReduced ? undefined : { y: -2, boxShadow: 'var(--shadow-float)' }
  const transition = prefersReduced ? undefined : spring.gentle

  if (href) {
    return (
      <motion.a href={href} className={base} style={style} whileHover={hoverAnim} transition={transition}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div className={base} style={style} whileHover={hoverAnim} transition={transition}>
      {children}
    </motion.div>
  )
}
