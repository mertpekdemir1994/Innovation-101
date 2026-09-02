'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(13,148,136,'
// Plain TEAL only clears 4.5:1 on this dark background above ~0.92 opacity
// (a narrow margin) — brightened text-safe variant (teal-400) for headroom.
const TEAL_TEXT = 'rgba(45,212,191,'

type StageKey = 'empathize' | 'define' | 'ideate' | 'prototype' | 'test'
type LensKey = 'desirability' | 'feasibility' | 'viability' | null

const STAGE_DETAIL: Record<StageKey, {
  headline: string
  description: string
  prompt: string
  example: { co: string; text: string }
}> = {
  empathize: {
    headline: 'Empathize: start with the human, not the assumption',
    description:
      'Set aside your assumptions and develop genuine, firsthand understanding of the people you are designing for. This means getting close enough to their real lives that you notice the things they would never think to tell you. The test: did you learn something that surprised you?',
    prompt: 'What do you know about the experience of the people you are designing for that did NOT come from a survey, a report, or your own assumptions? If the honest answer is thin, your first job is to get closer to them.',
    example: {
      co: 'IDEO: Shopping Cart (1999)',
      text: 'Asked to redesign the supermarket shopping cart, the team did not start by sketching carts. They went into stores and watched: shoppers, baggers, and store managers. They discovered that carts were stolen, children were unsafe in them, and most shoppers made short, targeted trips rather than the big weekly shop carts assumed. The empathy work produced the brief.',
    },
  },
  define: {
    headline: 'Define: frame the right problem, not the first one',
    description:
      'Synthesise the empathy work into a sharp, human-centered point of view. The classic form: "[specific user] needs to [verb / need] because [surprising insight from real observation]." A good POV names the need, not the answer, and opens the solution space rather than closing it.',
    prompt: 'Write your current challenge as a point-of-view statement. Does it name a human need, or does it secretly contain a solution? If it contains a solution, you have not finished defining.',
    example: {
      co: 'Children\'s MRI: GE Healthcare',
      text: 'The original problem handed to the team was "improve the scanner." Empathy work, watching terrified, sedated children, produced a completely different Define. The reframed POV: "A frightened child needs the scan to feel safe and even exciting, because it is the fear, not the machine, that is the real obstacle." That reframe in Define, not any cleverness in Ideate, was the breakthrough.',
    },
  },
  ideate: {
    headline: 'Ideate: volume before judgment',
    description:
      'With a sharp POV in hand, generate as many possible solutions as you can, deferring judgment, welcoming wild ideas, building on each other\'s thinking. The best idea is rarely the first one. Premature evaluation kills the flow that produces volume and forces a group toward safe, obvious territory.',
    prompt: 'Write "How might we..." in front of the need in your point-of-view statement. Now generate ten answers without judging any of them. If the first three were obvious, the value is usually in numbers seven through ten.',
    example: {
      co: 'IDEO: Ideation Rules',
      text: 'IDEO posts explicit rules in ideation sessions: defer judgment, encourage wild ideas, build on the ideas of others, stay focused on the topic, one conversation at a time, be visual, go for quantity. In one consumer-product session, a deliberately "wild" idea that the team nearly skipped contained the structural insight that became the shipped product\'s defining feature.',
    },
  },
  prototype: {
    headline: 'Prototype: a question made physical',
    description:
      'A Design Thinking prototype is not a polished early version of the product. It is the minimum artifact needed to learn something specific from a real person\'s reaction, built only well enough to generate genuine response. Stay unattached; the prototype is disposable; the learning is the asset.',
    prompt: 'Take your strongest idea. What is the cheapest, roughest thing you could build this week that would let a real person react to it? What specific question would that prototype answer?',
    example: {
      co: 'Children\'s MRI: Adventure Series',
      text: 'The adventure-room solution was prototyped long before any machine was painted. The team mocked up the experience, the story script, the decoration, and the way a technician would frame the scan as an adventure, in rough, cheap form, with real children and staff. These low-fidelity prototypes answered "does turning the scan into a story calm the child?" cheaply, before any full production investment.',
    },
  },
  test: {
    headline: 'Test: hunt for what is wrong, not what is right',
    description:
      'Test puts the prototype in front of real people and learns from their genuine response. The goal is not validation; it is learning, including learning that the idea is wrong. Ask people to do tasks rather than give opinions; behavior is honest where politeness is not. Expect to loop back.',
    prompt: 'Before testing, write the three things you most want to learn, and be honest that "learn" includes "discover this is wrong." After testing: which stage does what you learned send you back to?',
    example: {
      co: 'Meridian Library: Teen Space',
      text: 'Testing the pop-up teen space over two weeks revealed that teens immediately rewrote the adult-drafted rules, replacing "quiet at all times" with their own "quiet corner / talking corner" split. That insight would never have been designed without watching real teenagers in a real space. The test also surfaced the safeguarding tension early, sending the team back to Define that specific sub-problem.',
    },
  },
}

const THREE_LENSES: Record<NonNullable<LensKey>, { title: string; question: string; detail: string; color: string }> = {
  desirability: {
    title: 'Desirability',
    question: 'Do people want this?',
    detail: 'The human lens: the heart of Design Thinking. Start here. A solution nobody wants does not deserve to be built, no matter how clever or technically impressive it is. Desirability is what the Empathize and Define stages exist to ensure.',
    color: `${TEAL}`,
  },
  feasibility: {
    title: 'Feasibility',
    question: 'Can it be built?',
    detail: 'The technical lens. A deeply desirable idea that cannot be built with available capability and technology is not a solution. Asking the feasibility question early, while still leading with human need, avoids falling in love with ideas that will not survive contact with technical reality.',
    color: `rgba(5,150,105,`,
  },
  viability: {
    title: 'Viability',
    question: 'Can it sustain itself over time?',
    detail: 'The business lens. A desirable, feasible solution that cannot sustain itself as a business or service will not last. The strongest solutions live where all three lenses overlap. IDEO\'s three-lens model is the most enduring contribution of their design thinking framing.',
    color: `rgba(217,119,6,`,
  },
}

const STAGES: { id: StageKey; label: string; n: string }[] = [
  { id: 'empathize', label: 'Empathize', n: '01' },
  { id: 'define', label: 'Define', n: '02' },
  { id: 'ideate', label: 'Ideate', n: '03' },
  { id: 'prototype', label: 'Prototype', n: '04' },
  { id: 'test', label: 'Test', n: '05' },
]

function ThreeLensViz({ activeLens, setActiveLens }: { activeLens: LensKey; setActiveLens: (k: LensKey) => void }) {
  const prefersReduced = useReducedMotion()
  const lensKeys: NonNullable<LensKey>[] = ['desirability', 'feasibility', 'viability']

  return (
    <div className="mt-space-8">
      <p className="font-mono text-2xs uppercase tracking-widest mb-space-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
        IDEO three-lens model, click each to explore
      </p>
      <div className="grid grid-cols-3 gap-space-2 mb-space-4">
        {lensKeys.map((key) => {
          const lens = THREE_LENSES[key]
          const isActive = activeLens === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveLens(isActive ? null : key)}
              className="rounded-lg px-space-3 py-space-3 text-left transition-all duration-200"
              style={{
                background: isActive ? `${TEAL}0.25)` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isActive ? `${TEAL}0.50)` : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <p className="font-semibold text-xs mb-space-1" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.65)' }}>
                {lens.title}
              </p>
              <p className="text-2xs leading-snug" style={{ color: 'rgba(255,255,255,0.40)' }}>
                {lens.question}
              </p>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeLens && (
          <motion.div
            key={activeLens}
            initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg px-space-4 py-space-4"
            style={{ background: `${TEAL}0.12)`, border: `1px solid ${TEAL}0.25)` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {THREE_LENSES[activeLens].detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DTInteractiveSection() {
  const [activeStage, setActiveStage] = useState<StageKey>('empathize')
  const [activeLens, setActiveLens] = useState<LensKey>(null)
  const prefersReduced = useReducedMotion()

  const detail = STAGE_DETAIL[activeStage]

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-space-8 items-start">
      {/* Left: Stage selector */}
      <div className="flex md:flex-col gap-space-2 overflow-x-auto md:overflow-visible pb-space-2 md:pb-0">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveStage(stage.id)}
            className="flex-shrink-0 flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-all duration-200 min-w-[100px] md:min-w-[140px]"
            style={{
              background: activeStage === stage.id ? `${TEAL}0.20)` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeStage === stage.id ? `${TEAL}0.45)` : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            <span
              className="font-mono text-2xs uppercase tracking-widest mb-space-1"
              style={{ color: activeStage === stage.id ? `${TEAL_TEXT}0.85)` : 'rgba(255,255,255,0.30)' }}
            >
              {stage.n}
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: activeStage === stage.id ? '#fff' : 'rgba(255,255,255,0.55)' }}
            >
              {stage.label}
            </span>
          </button>
        ))}
      </div>

      {/* Right: detail panel */}
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h3
              className="font-semibold mb-space-4"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: '#FAFAFA', lineHeight: 1.2 }}
            >
              {detail.headline}
            </h3>
            <p className="text-sm leading-relaxed mb-space-5" style={{ color: 'rgba(255,255,255,0.60)' }}>
              {detail.description}
            </p>

            {/* Company example */}
            <div
              className="rounded-xl p-space-5 mb-space-5"
              style={{ background: `${TEAL}0.12)`, border: `1px solid ${TEAL}0.22)` }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${TEAL_TEXT}0.85)` }}>
                {detail.example.co}
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {detail.example.text}
              </p>
            </div>

            {/* Prompt */}
            <div
              className="rounded-lg px-space-5 py-space-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Your prompt
              </p>
              <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {detail.prompt}
              </p>
            </div>

            {/* Three-lens model (surfaced in the explore state as instructed) */}
            <ThreeLensViz activeLens={activeLens} setActiveLens={setActiveLens} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
