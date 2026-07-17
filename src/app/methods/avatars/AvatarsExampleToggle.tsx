'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional' },
  { id: 'ai',          label: 'With AI' },
]

const CONTENT: Record<Tab, {
  context: string
  step1: string
  step2: string
  step3: string
  outcome: string
  verdict: string
  verdictLabel: string
  verdictColor: string
}> = {
  traditional: {
    context:      'A 4-person team is building scheduling software. They could serve anyone who books appointments: fitness studios, salons, medical clinics, restaurants, freelancers.',
    step1:        'Week 1: The founders spend a week interviewing 20 people who currently run appointment-based businesses. They talk to yoga studios, massage therapists, hair salons, dentists, and a handful of independent consultants.',
    step2:        'Week 2: A clear pattern emerges. Fitness studio owners — boutique yoga, pilates, cycling — have one shared, urgent, specific pain: managing class capacity and last-minute cancellations together. Everything else is secondary. Other segments have scheduling needs, but this one is burning.',
    step3:        'Week 3: The team picks boutique fitness studios as their Avatar. Not "fitness and wellness" — specifically the owner of a 15–50-person studio running multiple classes per day. They rebuild their messaging, pricing, and onboarding entirely around that operator.',
    outcome:      'Boutique fitness studios. Within 6 months, the product is the default recommendation in 3 Facebook groups for studio owners. Expansion comes later — and it comes because the beachhead is saturated, not because the team lost confidence.',
    verdict:      'Beachhead found. The narrow commitment creates the conditions for real word-of-mouth and a product that genuinely earns its reputation.',
    verdictLabel: 'Result',
    verdictColor: 'rgba(5,150,105,0.75)',
  },
  ai: {
    context:      'The same team uses an AI strategy tool to identify their target market. They upload a 50-page industry report on scheduling software, a set of 200 LinkedIn profiles of potential customers, and a competitive analysis.',
    step1:        'AI output: "The TAM for appointment scheduling software is $4.2B. Key segments include healthcare ($1.8B), fitness & wellness ($0.6B), professional services ($0.9B), and hospitality ($0.7B). Recommend targeting SMB healthcare or broad fitness & wellness given your team\'s prior domain exposure."',
    step2:        'The team is drawn to healthcare (largest segment, high switching costs) and "fitness & wellness" (personal interest). AI recommends a phased approach: launch in fitness, expand to healthcare in 18 months. The messaging is written for both.',
    step3:        'Six months in: the fitness product has 200 customers across yoga studios, salons, massage therapists, pilates studios, and a few dental practices who signed up by mistake. Marketing is expensive because the audience isn\'t self-referring. No niche owns the product.',
    outcome:      'Fragmented traction. "Fitness & wellness" is too broad to generate authentic word-of-mouth. Dentists aren\'t referring yoga studios. Every new user requires paid acquisition. The team hasn\'t dominated anything.',
    verdict:      'The AI correctly identified a large segment. It couldn\'t make the commitment: the specific boutique fitness studio owner — the one who actually has the urgent cancellation problem — never got selected.',
    verdictLabel: 'Result',
    verdictColor: 'rgba(251,146,60,0.75)',
  },
}

export default function AvatarsExampleToggle() {
  const [activeTab, setActiveTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const d = CONTENT[activeTab]

  return (
    <div>
      {/* Tab pills */}
      <div className="flex gap-2 mb-8">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
            style={{
              background: activeTab === id ? 'rgba(255,255,255,0.12)' : 'transparent',
              color:      activeTab === id ? '#FAFAFA' : 'rgba(255,255,255,0.40)',
              border:     `1px solid ${activeTab === id ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)'}`,
            }}
            aria-pressed={activeTab === id}
          >{label}</button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease }}
        >
          {/* Scenario context */}
          <p className="mb-8" style={{
            fontSize:   'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)',
            color:      'rgba(255,255,255,0.60)',
            fontStyle:  'italic',
          }}>{d.context}</p>

          {/* 3-step timeline */}
          <div className="flex flex-col gap-6 mb-8">
            {[d.step1, d.step2, d.step3].map((text, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.12)' }}
                >{i + 1}</div>
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.72)', paddingTop: 3 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Outcome + verdict */}
          <div className="rounded-xl p-5 mb-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.35)' }}
            >Avatar chosen</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.80)', fontWeight: 600 }}>
              {d.outcome}
            </p>
          </div>
          <div className="rounded-xl p-5"
            style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${d.verdictColor.replace('0.75', '0.22')}` }}
          >
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: d.verdictColor }}
            >{d.verdictLabel}</p>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.65)' }}>
              {d.verdict}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
