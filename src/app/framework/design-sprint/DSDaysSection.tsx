'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(180,83,9,'

type DayId = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

type Day = {
  id: DayId
  n: string
  label: string
  mode: string
  tagline: string
  objective: string
  description: string[]
  activities: Array<{ title: string; detail: string }>
  keyQuestion: string
}

const DAYS: Day[] = [
  {
    id: 'monday',
    n: '01',
    label: 'Monday',
    mode: 'Understand',
    tagline: 'Map everything you know. Identify where you want to be.',
    objective:
      'Monday makes existing knowledge explicit and shared. The team maps the problem, sets a long-term goal, surfaces Sprint Questions (the things that make everyone nervous) and chooses a specific target: one person, one moment. Monday ends with clarity about what the sprint is trying to achieve.',
    description: [
      'The long-term goal is ambitious and directional: why are we doing this, where do we want to be in two to five years? It is not a sprint deliverable, but the context that makes the target meaningful.',
      'Sprint Questions surface what the team does not know and what could go wrong. These become the hypotheses that Friday\'s user testing will answer; the clearer the questions, the more useful the results.',
    ],
    activities: [
      {
        title: 'How Might We notes',
        detail: 'Throughout Monday\'s expert talks, every team member writes How Might We notes, reframing every problem or risk as a design opportunity. These are clustered by theme and voted on to surface the most important areas, which inform the target selection and Tuesday\'s ideation direction.',
      },
      {
        title: 'Map the challenge',
        detail: 'Draw a simple map of the actors (customers, employees, systems, partners) and the key steps in their journey. The map surfaces disagreements about what the problem is and forces the team to agree on scope before solving anything.',
      },
      {
        title: 'Choose a target',
        detail: 'One actor, one moment. The Decider\'s call. This constraint (one specific person at one specific point in the journey) makes the sprint achievable in five days. A target too broad produces a prototype too diffuse to test.',
      },
    ],
    keyQuestion:
      '"We are designing for [person] at the moment when [specific situation]." Write your target in this format before moving to Tuesday. If you cannot fill in both blanks precisely, Monday is not done.',
  },
  {
    id: 'tuesday',
    n: '02',
    label: 'Tuesday',
    mode: 'Sketch',
    tagline: 'Individual ideation. No group brainstorming.',
    objective:
      'Tuesday is creative, but not the way most people expect. No whiteboard session, no group brainstorming, no building on each other\'s ideas in real time. Each person works alone. The Design Sprint\'s research showed that individual ideation consistently outperforms group brainstorming for both quantity and quality of ideas.',
    description: [
      'Tuesday begins with Lightning Demos: a survey of existing solutions, not just in your industry but in analogous ones. Each team member researches how other organisations have solved similar problems and presents a three-minute demo of the most interesting examples. These are raw material and inspiration, not ideas to copy.',
      'The goal is to find the structural principle behind someone else\'s solution, the underlying idea that can be abstracted and adapted, rather than to replicate its surface form.',
    ],
    activities: [
      {
        title: 'Lightning Demos',
        detail: 'Each team member presents one compelling example of how another company has solved a similar structural challenge. Three minutes each. Look outside your industry: the most valuable insights often come from domains where the same human problem has already been solved in a completely different context.',
      },
      {
        title: 'Notes and Ideas (Four-Step Sketch, Steps 1–2)',
        detail: 'Review the long-term goal, Sprint Questions, and the challenge map. Jot raw ideas without structure or evaluation. Then explore multiple rough solution directions, one per page, going for quantity and variety before any kind of judgment.',
      },
      {
        title: 'Crazy 8s and Solution Sketch (Four-Step Sketch, Steps 3–4)',
        detail: 'Crazy 8s: fold a sheet of paper into eight panels, set a timer for eight minutes, and sketch eight variations of your strongest idea, one per panel. Then produce a detailed three-panel solution sketch: a comic-strip-style sequence that shows the user\'s experience, self-explanatory without the creator presenting it.',
      },
    ],
    keyQuestion:
      'What is the core structural challenge in your sprint: trust, complexity, anxiety, handoffs? Name two companies outside your industry that have solved that challenge beautifully. What specific element of their solution could you adapt?',
  },
  {
    id: 'wednesday',
    n: '03',
    label: 'Wednesday',
    mode: 'Decide',
    tagline: 'Choose one direction. Make one storyboard.',
    objective:
      'Wednesday is the hardest day. After Tuesday\'s output (often six or seven distinct concepts) the team must choose one direction. Not a hybrid. One clear direction. Wednesday\'s structured process is designed to make that choice quickly, rigorously, and without the politics that usually derail group decisions.',
    description: [
      'The Art Museum: all solution sketches are posted on the wall, still anonymous. Team members walk through them silently, placing sticky dots on the parts they find interesting. No pitching, no explaining, no defending. Silence is enforced.',
      'The Storyboard: after the decision, the team creates a 10 to 15 panel comic strip showing the user\'s complete experience with the chosen solution. Everything in Thursday\'s prototype must appear in the storyboard, and everything in the storyboard must be achievable in one day of prototyping.',
    ],
    activities: [
      {
        title: 'Art Museum and Speed Critique',
        detail: 'Sketch deciders walk silently through posted sketches and place heatmap dots on interesting elements. Then each sketch is discussed for three minutes: a note-taker captures the interesting elements, and the creator reveals themselves only after the critique. No defending before it.',
      },
      {
        title: 'Supervote',
        detail: 'The Decider gets three large dot stickers and places them wherever they choose. The Supervote decides. The group\'s dots inform but do not constrain. When two strong concepts have different strengths, the team can run a Battle Royale: prototyping both on Thursday and testing head-to-head on Friday.',
      },
      {
        title: 'Storyboard',
        detail: 'A 10 to 15 panel comic strip showing the user\'s complete experience with the chosen solution. The storyboard is the prototype specification: every panel that appears in it must be achievable in one day of prototyping, and every panel in the prototype must trace back to the storyboard.',
      },
    ],
    keyQuestion:
      'If you had to choose one direction right now, what would it be? What is the riskiest assumption in that direction? That assumption is what Friday\'s testing must answer.',
  },
  {
    id: 'thursday',
    n: '04',
    label: 'Thursday',
    mode: 'Prototype',
    tagline: 'Build just enough to learn. Nothing more.',
    objective:
      'Build something realistic enough that users react to it as if it were real, and nothing more. A Design Sprint prototype is not an MVP. It is not a proof of concept. It is a facade: the minimum artifact needed to generate real reactions from real people. Most sprint prototypes are built in Keynote, Figma, or physical materials. No code, no production assets.',
    description: [
      'The golden rule is "fake it." A mobile app? Build slides that look like screens. A physical product? Build a cardboard model. A service conversation? Write a script and role-play it.',
      'Sprint prototypes must be neither too rough nor too polished. Too rough, and users spend their cognitive energy interpreting the prototype rather than reacting to the concept. Too polished, and users are reluctant to criticise, assuming the concept is more fixed than it is.',
    ],
    activities: [
      {
        title: 'Divide and build',
        detail: 'The storyboard is divided into components and assigned to different team members. A designer handles the key screens; others handle copy, assets, or supporting flows. Everyone works in parallel against a shared style guide agreed on at the start of the day.',
      },
      {
        title: 'Stitch',
        detail: 'A dedicated stitcher assembles all components into a single testable artifact at the end of the day. The stitcher\'s job is to make the prototype feel like one coherent experience rather than a collection of pieces.',
      },
      {
        title: 'Trial run',
        detail: 'In the last hour of Thursday, the team runs through the complete prototype as if they were a test user. Everything that confuses the team will confuse users even more. Fix what you find; it will be faster to fix now than to watch five users hit the same wall on Friday.',
      },
    ],
    keyQuestion:
      'What are the three to five screens or moments your prototype must include to test Friday\'s key questions? What can you explicitly leave out, because it is too complex to build in a day, or because it is not what is being tested?',
  },
  {
    id: 'friday',
    n: '05',
    label: 'Friday',
    mode: 'Test',
    tagline: 'Learn from five real users. In one day.',
    objective:
      'Friday is the most important day, and the one teams most frequently rush or skip. Five real users, recruited to match the sprint\'s target, each interact with the prototype one at a time in a 60-minute interview. The rest of the team watches via video feed from a separate room. By 5pm, the team knows whether their riskiest assumptions held.',
    description: [
      'Nielsen Norman Group research shows that five users in qualitative testing surface approximately 85% of the usability issues a much larger sample would find. Beyond five, each additional user produces diminishing returns in new insight.',
      'Synthesising results: after five interviews, the observation team spends thirty minutes identifying three to five significant patterns: moments that appeared consistently across multiple users. These patterns answer the Sprint Questions from Monday. The Decider then makes one of three calls: proceed to development, run another sprint to resolve remaining uncertainty, or abandon this direction.',
    ],
    activities: [
      {
        title: 'Interview structure',
        detail: 'A warm-up (five to ten minutes), a prototype introduction (two minutes, without revealing the team\'s hopes), a task-based interaction (thirty to forty minutes, the user thinking aloud), and a debrief (ten minutes of follow-up). The interviewer does not explain, guide, or react to confusion or delight.',
      },
      {
        title: 'Observation room protocol',
        detail: 'While one user is in the interview room, the rest of the team watches from a separate room. Each observer has a grid divided into the sprint\'s key questions. They place sticky notes as they observe: green for positive, red for negative, yellow for neutral. By the end of five interviews, the pattern map is visible without a separate synthesis session.',
      },
      {
        title: 'Pattern synthesis and the Decider\'s call',
        detail: 'After five interviews, identify the three to five moments that appeared consistently across multiple users. These patterns answer the Sprint Questions. The Decider then makes one of three calls: proceed to development, run another sprint, or abandon this direction. The call must happen on Friday, not deferred.',
      },
    ],
    keyQuestion:
      'Before testing, write down the three things you most need to learn from users. Which questions did the prototype answer clearly? Which requires another sprint?',
  },
]

export default function DSDaysSection() {
  const [activeDay, setActiveDay] = useState<DayId>('monday')
  const [openActivity, setOpenActivity] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReduced) return
    const observers: IntersectionObserver[] = []
    DAYS.forEach((day, i) => {
      const el = sectionRefs.current[i]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveDay(day.id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [prefersReduced])

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-space-10 relative">
      {/* Left: sticky day nav */}
      <div className="hidden md:block">
        <div className="sticky top-24 space-y-space-2">
          {DAYS.map((day) => (
            <button
              key={day.id}
              type="button"
              onClick={() => {
                setActiveDay(day.id)
                sectionRefs.current[DAYS.findIndex((d) => d.id === day.id)]?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }}
              className="w-full text-left flex items-center gap-space-4 rounded-lg px-space-4 py-space-3 transition-all duration-200"
              style={{
                background: activeDay === day.id ? `${CLAY}0.06)` : 'transparent',
                borderLeft: `3px solid ${activeDay === day.id ? `${CLAY}0.65)` : 'transparent'}`,
              }}
            >
              <span className="font-mono text-xs font-semibold" style={{ color: `${CLAY}0.40)` }}>
                {day.n}
              </span>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: activeDay === day.id ? `${CLAY}0.90)` : 'var(--color-neutral-600)' }}
                >
                  {day.label}
                </p>
                <p className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${CLAY}0.40)` }}>
                  {day.mode}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: day content */}
      <div className="space-y-space-12 md:space-y-space-13">
        {DAYS.map((day, i) => (
          <div key={day.id} ref={(el) => { sectionRefs.current[i] = el }}>
            <div className="md:hidden mb-space-4 flex items-center gap-space-3">
              <span className="font-mono text-xs font-semibold" style={{ color: `${CLAY}0.55)` }}>{day.n}</span>
              <span className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${CLAY}0.55)` }}>{day.mode}</span>
            </div>

            <h3
              className="font-display font-semibold mb-space-3"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.15, color: 'var(--color-neutral-900)', letterSpacing: '-0.01em' }}
            >
              {day.tagline}
            </h3>
            <p className="text-base text-neutral-700 leading-relaxed mb-space-4">{day.objective}</p>
            {day.description.map((para, j) => (
              <p key={j} className="text-base text-neutral-600 leading-relaxed mb-space-4">{para}</p>
            ))}

            <div className="mt-space-6 space-y-space-2">
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-3">Key activities</p>
              {day.activities.map((act, j) => {
                const key = i * 10 + j
                const isOpen = openActivity === key
                return (
                  <div key={j} className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-neutral-200)' }}>
                    <button
                      type="button"
                      onClick={() => setOpenActivity(isOpen ? null : key)}
                      className="w-full text-left flex items-center justify-between px-space-5 py-space-4 transition-colors duration-200"
                      style={{ background: isOpen ? `${CLAY}0.04)` : '#FFFFFF' }}
                    >
                      <span className="font-semibold text-sm text-neutral-900">{act.title}</span>
                      <span
                        className="text-base shrink-0 ml-space-3 transition-transform duration-200"
                        style={{ color: `${CLAY}0.60)`, transform: isOpen ? 'rotate(45deg)' : 'none' }}
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
              style={{ background: `${CLAY}0.04)`, border: `1px solid ${CLAY}0.12)` }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${CLAY}0.65)` }}>
                The key question
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed italic">{day.keyQuestion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
