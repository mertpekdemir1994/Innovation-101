'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { spring } from '@/lib/motion'

type SpringName = keyof typeof spring

const presets: { name: SpringName; label: string; desc: string }[] = [
  { name: 'snappy', label: 'Snappy', desc: 'Menus, accordions, toggles' },
  { name: 'gentle', label: 'Gentle', desc: 'Cards, panels, drawers' },
  { name: 'reveal', label: 'Reveal', desc: 'Page entrances, content reveals' },
  { name: 'cinematic', label: 'Cinematic', desc: 'Scroll-pinned viz animation' },
]

function SpringCard({ name, label, desc }: { name: SpringName; label: string; desc: string }) {
  const [toggled, setToggled] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <div className="border border-neutral-200 rounded-md p-6 space-y-4">
      <div>
        <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-1">
          spring.{name}
        </p>
        <p className="text-base font-semibold text-neutral-900">{label}</p>
        <p className="text-sm text-neutral-600">{desc}</p>
      </div>
      <button
        onClick={() => setToggled((t) => !t)}
        className="px-4 py-2 rounded border border-neutral-200 text-sm font-semibold text-neutral-700 hover:border-neutral-900 transition-colors"
      >
        Trigger
      </button>
      <div className="h-12 flex items-center">
        <motion.div
          animate={prefersReduced ? {} : { x: toggled ? 120 : 0 }}
          transition={spring[name]}
          className="w-10 h-10 rounded-md bg-neutral-900"
        />
      </div>
    </div>
  )
}

export default function MotionDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {presets.map((p) => (
        <SpringCard key={p.name} {...p} />
      ))}
    </div>
  )
}
