'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { spring } from '@/lib/motion'

interface AccordionProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export default function Accordion({ title, children, defaultOpen = false, className = '' }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const prefersReduced = useReducedMotion()

  return (
    <div className={`border border-neutral-200 rounded-md overflow-hidden ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-space-5 py-space-4 text-left font-semibold text-base text-neutral-900 bg-white hover:bg-neutral-50 transition-colors"
      >
        <span>{title}</span>
        <motion.span
          aria-hidden
          animate={prefersReduced ? {} : { rotate: open ? 180 : 0 }}
          transition={spring.snappy}
          className="flex-shrink-0 ml-space-4 text-neutral-400"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={prefersReduced ? false : { opacity: 0, height: 0 }}
            animate={prefersReduced ? {} : { opacity: 1, height: 'auto' }}
            exit={prefersReduced ? {} : { opacity: 0, height: 0 }}
            transition={prefersReduced ? undefined : { ...spring.snappy, opacity: { duration: 0.15 } }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-space-5 py-space-4 border-t border-neutral-200 bg-white text-base text-neutral-600 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
