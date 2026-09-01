'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,77,122,'

type StageId = 'discovery' | 'backlog' | 'sprint' | 'review' | 'retro'

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
  special?: boolean
}

const STAGES: Stage[] = [
  {
    id: 'discovery',
    n: '01',
    label: 'Discovery Sprint',
    mode: 'Discover',
    tagline: 'Go back to users before committing to the next delivery sprint.',
    objective:
      'The Discovery Sprint is the innovation layer that standard Agile lacks. It is a focused period of user research, assumption testing, and insight generation that continuously refreshes the team\'s understanding of the problem space. It is what keeps the delivery engine pointed at the right target.',
    description: [
      'A Discovery Sprint runs at the start of every initiative (mandatory), at the beginning of each new phase or major feature set, and when user research signals the team may be building the wrong thing. Quarterly as a standing practice in ongoing programs.',
      'The test of a good Discovery Sprint: it produces evidence that actually changes the backlog, sometimes uncomfortably. If the backlog never reprioritizes after a discovery sprint, the sprint was ritual, not research.',
    ],
    activities: [
      {
        title: 'User interviews (three to five per sprint)',
        detail: 'Focused conversations testing specific assumptions, not general satisfaction surveys. Each interview should have a clear hypothesis it is trying to validate or invalidate. Three to five users is enough to surface major patterns; more is rarely necessary before reprioritizing.',
      },
      {
        title: 'Assumption mapping',
        detail: 'Review the backlog with fresh eyes. For each item, identify the assumptions it rests on and assess how uncertain and consequential each assumption is. Items with highly uncertain, highly consequential assumptions are the most dangerous to build without first testing.',
      },
      {
        title: 'Insight clustering and backlog reprioritization',
        detail: 'Synthesise learning from the sprint into two or three key insights, then bring those insights directly to backlog refinement. If the discovery work does not produce backlog changes, the loop is broken.',
      },
    ],
    keyQuestion:
      'When did your team last talk directly to users? If it has been more than two weeks, what assumptions are you currently building on that have not been tested since then?',
    special: true,
  },
  {
    id: 'backlog',
    n: '02',
    label: 'Backlog Management',
    mode: 'Prioritize',
    tagline: 'The backlog is a prioritized hypothesis list, not a feature wish list.',
    objective:
      'In standard Agile, the backlog is a prioritized list of features to build. In Agile Innovation, it is a prioritized list of hypotheses to test and features to build, with the distinction clearly marked. This reframing is what keeps the team honest about how much it actually knows versus how much it is assuming.',
    description: [
      'Each backlog item in an innovation context should specify what is being built or tested, the hypothesis it is testing or the user need it addresses, the success metric, and the risk level.',
      'A three-tier structure makes the backlog\'s risk profile visible: validated items (strong user evidence, ready to build), testing items (promising signals needing a small test before full build), and exploring items (hypotheses requiring a discovery sprint first). Treating all items as equivalent hides the uncertainty that most of them contain.',
    ],
    activities: [
      {
        title: 'Rewrite items as hypotheses',
        detail: 'Each backlog item should name what is being built, the hypothesis it tests, and the metric that will confirm or deny it. If you cannot write a hypothesis for an item, the item may not be ready for a delivery sprint; it may need a discovery sprint first.',
      },
      {
        title: 'Three-tier triage',
        detail: 'Tag each item: Validated (strong evidence, build confidently), Testing (some signal, run a small experiment), Exploring (hypothesis only, discovery first). Work through Validated items in delivery sprints; move Testing and Exploring items through discovery before they reach the build queue.',
      },
      {
        title: 'Ruthless prioritization',
        detail: 'A backlog that grows indefinitely is not a prioritized list; it is a wishlist with order. Regularly remove items that have not been prioritized in two or more planning cycles. If work is important enough, it will be repitched after the next discovery sprint.',
      },
    ],
    keyQuestion:
      'Take the top three items on your current backlog. For each, write the specific hypothesis it is testing and the metric that will tell you if the hypothesis was validated. If you cannot write these for an item, the item may not be ready for a delivery sprint.',
  },
  {
    id: 'sprint',
    n: '03',
    label: 'Sprint Execution',
    mode: 'Build',
    tagline: 'Build in two-week cycles. Ship something real at the end of every sprint.',
    objective:
      'The delivery sprint is the heartbeat of Agile Innovation: a focused, time-boxed cycle in which a cross-functional team builds and tests a prioritized set of backlog items. Every sprint ends with a working, demonstrable output: not a plan, not a design, but something that can be shown to users or stakeholders and generates real feedback.',
    description: [
      'Sprint planning sets the sprint commitment. The key discipline is not over-committing: consistently over-committing and under-delivering is more damaging than consistently choosing smaller scope and delivering it reliably. A team that ships what it commits to, every sprint, builds the trust that gives it latitude.',
      'Cross-functional team composition is non-negotiable for Agile Innovation. A sprint team that must wait for a designer, engineer, or researcher from outside the team cannot deliver in two weeks. The dependencies are the constraint, not the work.',
    ],
    activities: [
      {
        title: 'Sprint planning',
        detail: 'Select items from the top of the backlog that the team can realistically complete in two weeks. Write the sprint goal in one sentence: the single most important thing the sprint is trying to achieve. If the team cannot write this, the sprint lacks a focus point.',
      },
      {
        title: 'Daily standup (15 minutes)',
        detail: 'Three questions: What did I complete yesterday? What will I complete today? Is anything blocking me? The standup is for coordination and blocker surfacing, not status reporting. If it is being used for status, it is serving the wrong purpose.',
      },
      {
        title: 'Working output by the end',
        detail: 'Every sprint ends with something demonstrable, not a plan, not a design deck, but something a user or stakeholder can interact with or observe. This constraint forces the team to decompose work into units that are genuinely completable in two weeks and meaningful enough to generate real reaction.',
      },
    ],
    keyQuestion:
      'What is the single most important thing your team needs to deliver in the next two weeks? What does "done" look like? If you had to ship one thing (not plan or design, but actually ship) what would it be?',
  },
  {
    id: 'review',
    n: '04',
    label: 'Sprint Review',
    mode: 'Demo',
    tagline: 'Show real work to real stakeholders. Gather real feedback.',
    objective:
      'The Sprint Review demonstrates what the team built during the sprint, presented to stakeholders and, where possible, real users. It is not a status meeting or a slide deck. It is a live demonstration of working output designed to generate concrete feedback that informs the next sprint.',
    description: [
      'What makes a great Sprint Review: the team demonstrates working output, not plans. Stakeholders interact with or observe the output directly. Feedback is specific and actionable. The feedback directly informs backlog reprioritization.',
      'The most common Sprint Review failure is reviewing with slides rather than working software or output. Slides produce approval and comment. Working output produces real feedback, including negative feedback that the team needs but stakeholders might hesitate to give about a polished-looking deck.',
    ],
    activities: [
      {
        title: 'Live demonstration',
        detail: 'Show what was built working, in context. If it is a feature, demonstrate it in the product. If it is a service, role-play it. If it is a physical prototype, bring it. The goal is to generate genuine reaction, not to present progress.',
      },
      {
        title: 'Invite real users where possible',
        detail: 'Internal stakeholders provide organizational context. Real users provide behavioral truth. If the goal is to learn whether the team is building the right thing, the feedback has to come from the people who will actually use it.',
      },
      {
        title: 'Convert feedback to backlog changes',
        detail: 'A review that produces feedback but does not change the backlog is a ceremony without a function. Every sprint review should end with at least one concrete backlog change, reprioritization, or new item: the direct result of what was heard.',
      },
    ],
    keyQuestion:
      'Who should be in the room for your next Sprint Review that is not currently invited? What specific question do you most need answered by real users at the end of this sprint?',
  },
  {
    id: 'retro',
    n: '05',
    label: 'Retrospective',
    mode: 'Improve',
    tagline: 'Improve the way you work, not just what you build.',
    objective:
      'The Retrospective is the sprint\'s learning session, focused not on the product but on the process. Every two weeks, the team asks: what worked well, what did not work, and what will we change in the next sprint? It is the stage that turns a team from one that repeats its mistakes into one that compounds its improvements.',
    description: [
      'The three questions: What went well? What did not go well? What will we try differently next sprint? The critical discipline is the third question: it must produce at least one concrete, owned process change before the meeting closes. A retrospective that does not produce a change is a complaint session.',
      'The most common failure: identifying the same problems sprint after sprint without acting on them. Track whether process changes from previous retrospectives actually stuck. Longitudinal tracking turns a bi-weekly habit into a genuine improvement engine.',
    ],
    activities: [
      {
        title: 'Structured reflection (What went well / What did not / What changes)',
        detail: 'Give each question its own time, in order. Do not skip to "what changes" without spending real time on "what went well"; acknowledging what works is what keeps teams from overcorrecting, and it surfaces practices worth protecting.',
      },
      {
        title: 'Own the actions',
        detail: 'Each process change must have a named owner and a specific definition of what "changed" looks like. An action that says "we should communicate better" is not an action. An action that says "Sara will send a daily update to the design lead before standup starting next sprint" is one.',
      },
      {
        title: 'Track continuity',
        detail: 'Begin each retrospective by reviewing the actions from the previous one. Did the change happen? Did it help? This five-minute check prevents the failure mode of endlessly agreeing to change and never measuring whether the change stuck.',
      },
    ],
    keyQuestion:
      'On your most recent project, what is one thing that slowed the team down that a simple process change could have prevented? What specifically would that change look like, and who would own making it?',
  },
]

export default function AIRhythmSection() {
  const [activeStage, setActiveStage] = useState<StageId>('discovery')
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
      {/* Left: sticky stage nav */}
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
                background: activeStage === stage.id ? `${PLUM}0.06)` : 'transparent',
                borderLeft: `3px solid ${activeStage === stage.id ? `${PLUM}0.65)` : 'transparent'}`,
              }}
            >
              <span className="font-mono text-xs font-semibold" style={{ color: `${PLUM}0.40)` }}>
                {stage.n}
              </span>
              <div>
                <p className="font-semibold text-sm flex items-center gap-space-2"
                  style={{ color: activeStage === stage.id ? `${PLUM}0.90)` : 'var(--color-neutral-600)' }}>
                  {stage.label}
                  {stage.special && (
                    <span className="font-mono text-2xs px-space-1 rounded"
                      style={{ background: `${PLUM}0.10)`, color: `${PLUM}0.70)`, fontSize: '0.55rem', letterSpacing: '0.05em' }}>
                      DISCOVER
                    </span>
                  )}
                </p>
                <p className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${PLUM}0.40)` }}>
                  {stage.mode}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: stage content */}
      <div className="space-y-space-12 md:space-y-space-13">
        {STAGES.map((stage, i) => (
          <div key={stage.id} ref={(el) => { sectionRefs.current[i] = el }}>
            {/* Mobile header */}
            <div className="md:hidden mb-space-4 flex items-center gap-space-3">
              <span className="font-mono text-xs font-semibold" style={{ color: `${PLUM}0.55)` }}>{stage.n}</span>
              <span className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${PLUM}0.55)` }}>{stage.mode}</span>
            </div>

            {/* Discovery Sprint distinction callout */}
            {stage.special && (
              <div
                className="mb-space-5 rounded-lg px-space-4 py-space-3 flex items-center gap-space-3"
                style={{ background: `${PLUM}0.06)`, border: `1px solid ${PLUM}0.14)` }}
              >
                <span className="font-mono text-2xs uppercase tracking-widest shrink-0"
                  style={{ color: `${PLUM}0.70)` }}>
                  The discovery layer
                </span>
                <span className="text-sm text-neutral-600 leading-relaxed">
                  This is the stage standard Agile development omits. Without it, teams risk building
                  the wrong thing efficiently.
                </span>
              </div>
            )}

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
                      style={{ background: isOpen ? `${PLUM}0.04)` : '#FFFFFF' }}
                    >
                      <span className="font-semibold text-sm text-neutral-900">{act.title}</span>
                      <span
                        className="text-base shrink-0 ml-space-3 transition-transform duration-200"
                        style={{ color: `${PLUM}0.60)`, transform: isOpen ? 'rotate(45deg)' : 'none' }}
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
              style={{ background: `${PLUM}0.04)`, border: `1px solid ${PLUM}0.12)` }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${PLUM}0.65)` }}>
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
