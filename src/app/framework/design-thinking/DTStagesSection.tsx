'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(13,148,136,'

type StageId = 'empathize' | 'define' | 'ideate' | 'prototype' | 'test'

type Stage = {
  id: StageId
  n: string
  label: string
  mode: string
  tagline: string
  objective: string
  description: string[]
  activities: Array<{ title: string; detail: string }>
  keyQuestion: string
}

const STAGES: Stage[] = [
  {
    id: 'empathize',
    n: '01',
    label: 'Empathize',
    mode: 'Understand',
    tagline: 'Understand the people you serve before you do anything else',
    objective:
      'Empathize is the foundation the whole process stands on. The goal is to set aside your assumptions and develop genuine, firsthand understanding of the people you are designing for — what they do, what they say, what they think, and crucially what they feel.',
    description: [
      'This is not market research at a distance. It is getting close enough to people\'s real lives that you notice the things they would never think to tell you, and the gap between what they say and what they actually do.',
      'The test of genuine empathy work is whether the team learned something that genuinely surprised it. If nothing surprised you, you probably confirmed your assumptions rather than challenging them.',
    ],
    activities: [
      {
        title: 'Observe',
        detail: 'Watch people in the context where the problem actually happens, paying attention to workarounds, frustrations, and moments of friction. Do not start with a structured interview; start with unstructured watching.',
      },
      {
        title: 'Engage',
        detail: 'Talk with people in open, curious conversations, asking for stories and specifics rather than opinions and generalizations. "Tell me about the last time you..." is more revealing than "What do you think about..."',
      },
      {
        title: 'Immerse',
        detail: 'Where possible, experience the situation yourself so the understanding is felt, not just recorded. Designers shadowing patients in a hospital understand fear differently from those who only read the reports.',
      },
    ],
    keyQuestion:
      'What do you know about the experience of the people you are designing for that did NOT come from a survey, a report, or your own assumptions?',
  },
  {
    id: 'define',
    n: '02',
    label: 'Define',
    mode: 'Frame',
    tagline: 'Frame the right problem before you try to solve any problem',
    objective:
      'Define is where the raw, messy understanding gathered in Empathize is synthesised into a single, sharp problem statement — a point of view. This is the hinge of the whole process. A well-framed problem makes the solution space productive; a badly framed one sends the team off solving the wrong thing beautifully.',
    description: [
      'The Define stage resists the pull toward solutions and insists on naming, precisely and in human terms, what is actually worth solving. A good problem statement names the need, not the answer.',
      'The classic Define output is a point-of-view statement: a specific user, their deep need (stated as a verb), and a non-obvious insight drawn from the empathy work that reframes the problem. The quality of everything downstream depends on the quality of this statement.',
    ],
    activities: [
      {
        title: 'Synthesise',
        detail: 'Cluster and make sense of everything learned in Empathize, looking for patterns and tensions. What kept surfacing? What contradicted your assumptions?',
      },
      {
        title: 'Frame a Point of View',
        detail: 'Write a problem statement in the form: "[specific person] needs to [verb / need] because [surprising insight]." The insight must come from the research, not from prior assumptions.',
      },
      {
        title: 'Avoid baking in the solution',
        detail: '"Users need a faster checkout button" hides a solution inside the problem. "Time-pressed parents need to feel they have not failed their family when they take a shortcut" opens a far richer solution space.',
      },
    ],
    keyQuestion:
      'Write your current challenge as a point-of-view statement. Does it name a human need, or does it secretly contain a solution? If it contains a solution, you have not finished defining.',
  },
  {
    id: 'ideate',
    n: '03',
    label: 'Ideate',
    mode: 'Generate',
    tagline: 'Generate many ideas before judging any',
    objective:
      'Ideate is the deliberate widening of the solution space. With a sharp problem statement in hand, the team generates as many possible solutions as it can, deferring judgment, welcoming wild ideas, and building on each other\'s thinking.',
    description: [
      'The goal is volume and diversity, not immediate quality. The best idea is rarely the first one; it usually emerges from a large and varied set, often by combining or building on ideas that seemed weak alone.',
      'The single most common way ideation fails is premature evaluation. The moment ideas are judged as they are spoken, people stop offering the unusual ones, and the group collapses toward safe, obvious territory.',
    ],
    activities: [
      {
        title: 'Diverge first',
        detail: 'Generate a large quantity of ideas without evaluating them. Use "How Might We..." prompts derived from the Define point of view to keep ideation anchored to the real problem.',
      },
      {
        title: 'Defer judgment',
        detail: 'Separate generating from evaluating. Wild ideas matter even when they are unworkable — they stretch the team\'s sense of what is possible and frequently contain a usable kernel.',
      },
      {
        title: 'Then converge',
        detail: 'Once a wide set exists, cluster, discuss, and select the ideas worth prototyping. The selection criteria should connect back to the point-of-view statement, not just to what is easiest to build.',
      },
    ],
    keyQuestion:
      'Write "How might we..." in front of the need in your point-of-view statement. Now generate ten answers without judging any of them. If the first three were obvious, the value is usually in numbers seven through ten.',
  },
  {
    id: 'prototype',
    n: '04',
    label: 'Prototype',
    mode: 'Make',
    tagline: 'Make ideas tangible, fast and cheap',
    objective:
      'Prototype turns promising ideas into something people can see, touch, and react to — at the lowest possible cost and effort. A Design Thinking prototype is not a polished early version of the product; it is a question made physical, built only well enough to learn something specific from a real person\'s reaction.',
    description: [
      'The discipline is to build the least you can that still generates genuine response, and to stay unattached — because the prototype exists to be tested and very possibly thrown away.',
      'The mental shift that separates good prototyping from bad is to see the prototype as a question rather than a small first draft of the solution. When the prototype is framed as a draft of the product, teams over-invest, grow attached, and start defending it instead of learning from it.',
    ],
    activities: [
      {
        title: 'Build rough and fast',
        detail: 'Paper sketches, cardboard models, clickable mockups, storyboards, role-plays, whatever makes the idea reactable at the lowest cost. Speed matters more than quality at this stage.',
      },
      {
        title: 'Match fidelity to the question',
        detail: 'Build only as much as is needed to learn the specific thing you are trying to learn. Testing whether people understand the concept needs less fidelity than testing whether they can complete a task.',
      },
      {
        title: 'Stay unattached',
        detail: 'Name the question the prototype is answering before you build it. Knowing what you are trying to learn makes it easier to discard a prototype when the answer is "no."',
      },
    ],
    keyQuestion:
      'What is the cheapest, roughest thing you could build this week that would let a real person react to your idea? What specific question would that prototype answer?',
  },
  {
    id: 'test',
    n: '05',
    label: 'Test',
    mode: 'Learn',
    tagline: 'Learn from real people, then iterate',
    objective:
      'Test puts the prototype in front of the real people you are designing for and learns from their genuine response. The goal is not to prove the idea right; it is to learn — including, and especially, learning that the idea is wrong.',
    description: [
      'Test is where the loop-back lives: what you learn here sends you forward to refine, or back to ideate, define, or even empathize. A good test is run with curiosity about what will be discovered, not anxiety about being validated.',
      'The most common failure in the Test stage is treating it as a box-ticking validation — looking for confirmation rather than genuinely trying to discover what is wrong. Ask people to do tasks rather than to give opinions, since behavior is honest where politeness is not.',
    ],
    activities: [
      {
        title: 'Test with real users',
        detail: 'Put the prototype in front of the actual people you are designing for, not colleagues. Internal testing confirms your assumptions; external testing challenges them.',
      },
      {
        title: 'Observe and listen',
        detail: 'Watch what people do, not just what they say. The gap between the two is where the learning is. Note the moments of confusion, delight, or hesitation; those are the data points that matter.',
      },
      {
        title: 'Iterate and loop back',
        detail: 'Feed what you learn back into the process. Testing that never sends you back to an earlier stage usually means you were not testing hard enough or not watching carefully enough.',
      },
    ],
    keyQuestion:
      'Before testing, write the three things you most want to learn — and be honest that "learn" includes "discover this is wrong." After testing: which stage does what you learned send you back to?',
  },
]

export default function DTStagesSection() {
  const [activeStage, setActiveStage] = useState<StageId>('empathize')
  const [openActivity, setOpenActivity] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReduced) return
    const observers: IntersectionObserver[] = []
    STAGES.forEach((stage, i) => {
      const el = sectionRefs.current[i]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStage(stage.id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [prefersReduced])

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-space-10 relative">
      {/* Left — sticky stage nav */}
      <div className="hidden md:block">
        <div className="sticky top-24 space-y-space-2">
          {STAGES.map((stage) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                setActiveStage(stage.id)
                sectionRefs.current[STAGES.findIndex((s) => s.id === stage.id)]?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }}
              className="w-full text-left flex items-center gap-space-4 rounded-lg px-space-4 py-space-3 transition-all duration-200"
              style={{
                background: activeStage === stage.id ? `${TEAL}0.06)` : 'transparent',
                borderLeft: `3px solid ${activeStage === stage.id ? `${TEAL}0.65)` : 'transparent'}`,
              }}
            >
              <span className="font-mono text-xs font-semibold" style={{ color: `${TEAL}0.40)` }}>
                {stage.n}
              </span>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: activeStage === stage.id ? `${TEAL}0.90)` : 'var(--color-neutral-600)' }}
                >
                  {stage.label}
                </p>
                <p className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${TEAL}0.40)` }}>
                  {stage.mode}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right — stage content */}
      <div className="space-y-space-12 md:space-y-space-13">
        {STAGES.map((stage, i) => (
          <div key={stage.id} ref={(el) => { sectionRefs.current[i] = el }}>
            <div className="md:hidden mb-space-4 flex items-center gap-space-3">
              <span className="font-mono text-xs font-semibold" style={{ color: `${TEAL}0.55)` }}>{stage.n}</span>
              <span className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${TEAL}0.55)` }}>{stage.mode}</span>
            </div>

            <h3
              className="font-display font-semibold mb-space-3"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)', letterSpacing: '-0.01em' }}
            >
              {stage.tagline}
            </h3>
            <p className="text-base text-neutral-700 leading-relaxed mb-space-4">{stage.objective}</p>
            {stage.description.map((para, j) => (
              <p key={j} className="text-base text-neutral-600 leading-relaxed mb-space-4">{para}</p>
            ))}

            <div className="mt-space-6 space-y-space-2">
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-3">Key activities</p>
              {stage.activities.map((act, j) => {
                const key = i * 10 + j
                const isOpen = openActivity === key
                return (
                  <div key={j} className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-neutral-200)' }}>
                    <button
                      type="button"
                      onClick={() => setOpenActivity(isOpen ? null : key)}
                      className="w-full text-left flex items-center justify-between px-space-5 py-space-4 transition-colors duration-200"
                      style={{ background: isOpen ? `${TEAL}0.04)` : '#FFFFFF' }}
                    >
                      <span className="font-semibold text-sm text-neutral-900">{act.title}</span>
                      <span
                        className="text-base shrink-0 ml-space-3 transition-transform duration-200"
                        style={{ color: `${TEAL}0.60)`, transform: isOpen ? 'rotate(45deg)' : 'none' }}
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={prefersReduced ? {} : { height: 0, opacity: 0 }}
                          animate={prefersReduced ? {} : { height: 'auto', opacity: 1 }}
                          exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className="px-space-5 pb-space-4 text-sm text-neutral-600 leading-relaxed">{act.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div
              className="mt-space-6 rounded-xl px-space-6 py-space-5"
              style={{ background: `${TEAL}0.04)`, border: `1px solid ${TEAL}0.12)` }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${TEAL}0.65)` }}>
                The key question
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed italic">{stage.keyQuestion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
