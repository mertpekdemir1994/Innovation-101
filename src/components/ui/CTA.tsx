'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { spring } from '@/lib/motion'

interface CTAProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}

const motionProps = (prefersReduced: boolean | null) =>
  prefersReduced
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: spring.snappy,
      }

export function CTAPrimary({ children, href, onClick, disabled, className = '', type = 'button' }: CTAProps) {
  const prefersReduced = useReducedMotion()
  const base = `inline-flex items-center justify-center px-space-6 py-space-3 rounded-md font-semibold text-sm bg-section text-white disabled:opacity-40 disabled:pointer-events-none ${className}`

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps(prefersReduced)}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} className={base} {...motionProps(prefersReduced)}>
      {children}
    </motion.button>
  )
}

export function CTASecondary({ children, href, onClick, disabled, className = '', type = 'button' }: CTAProps) {
  const prefersReduced = useReducedMotion()
  const base = `inline-flex items-center justify-center px-space-6 py-space-3 rounded-md font-semibold text-sm border border-section text-section bg-transparent disabled:opacity-40 disabled:pointer-events-none ${className}`

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps(prefersReduced)}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} className={base} {...motionProps(prefersReduced)}>
      {children}
    </motion.button>
  )
}

export function CTAText({ children, href, onClick, disabled, className = '', type = 'button' }: CTAProps) {
  const prefersReduced = useReducedMotion()
  const base = `inline-flex items-center gap-1 font-semibold text-sm text-section underline underline-offset-2 decoration-transparent hover:decoration-current disabled:opacity-40 disabled:pointer-events-none transition-colors ${className}`

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps(prefersReduced)}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} className={base} {...motionProps(prefersReduced)}>
      {children}
    </motion.button>
  )
}
