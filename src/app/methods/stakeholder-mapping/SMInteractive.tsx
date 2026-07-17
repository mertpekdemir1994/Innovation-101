'use client'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'

type StakeholderId =
  | 'end-user' | 'decision-maker' | 'budget-holder' | 'regulator'
  | 'frontline-staff' | 'downstream-affected' | 'silent-blocker' | 'community-advocate'

type Attitude = 'supporter' | 'neutral' | 'blocker'
type Level = 'low' | 'medium' | 'high'
type SortMode = 'cast' | 'power-interest' | 'attitude' | 'influence'

type Stakeholder = {
  id: StakeholderId
  name: string
  role: string
  power: Level
  interest: Level
  attitude: Attitude
  influence: Level
  nonObvious: boolean
  detail: string
}

const STAKEHOLDERS: Stakeholder[] = [
  {
    id: 'end-user', name: 'END USER', role: 'Primary user',
    power: 'medium', interest: 'high', attitude: 'supporter', influence: 'medium',
    nonObvious: false,
    detail: 'Direct users of the product or service. Their needs are well-known to the team — sometimes too well, creating confirmation bias. Often under-researched in terms of context: when, where, and why they use it, as opposed to their stated preferences.',
  },
  {
    id: 'decision-maker', name: 'DECISION MAKER', role: 'Authority holder',
    power: 'high', interest: 'high', attitude: 'neutral', influence: 'high',
    nonObvious: false,
    detail: 'The person whose approval the solution requires. High power and high interest make them the primary target for alignment. They often have a mental model of the problem that must be surfaced and tested — not assumed to match the user research.',
  },
  {
    id: 'budget-holder', name: 'BUDGET HOLDER', role: 'Resource gatekeeper',
    power: 'high', interest: 'low', attitude: 'neutral', influence: 'low',
    nonObvious: false,
    detail: 'Controls the money but has little day-to-day interest in the problem. Their priorities are cost, risk, and timelines. They need to be kept satisfied with financial and business-case framing — not user-experience framing.',
  },
  {
    id: 'regulator', name: 'REGULATOR', role: 'Rule-setter',
    power: 'high', interest: 'low', attitude: 'neutral', influence: 'low',
    nonObvious: false,
    detail: 'Regulatory or compliance bodies governing what the solution can do. Often treated as a constraint rather than a stakeholder worth researching — but interviewing compliance officers often reveals where the actual latitude lies, and where it genuinely doesn\'t.',
  },
  {
    id: 'frontline-staff', name: 'FRONTLINE STAFF', role: 'Daily implementer',
    power: 'medium', interest: 'high', attitude: 'supporter', influence: 'medium',
    nonObvious: false,
    detail: 'People who carry out the solution in practice — service reps, technicians, nurses, teachers. High interest because the solution affects their daily work. They know failure modes that no one at the strategy level has seen, and are often the first to spot whether a designed solution is feasible.',
  },
  {
    id: 'downstream-affected', name: 'DOWNSTREAM', role: 'Indirect recipient',
    power: 'low', interest: 'medium', attitude: 'supporter', influence: 'low',
    nonObvious: true,
    detail: 'People affected by the solution\'s outputs but with no direct relationship with the team. They receive downstream effects — the patient affected by a care pathway redesign, the neighbour affected by a logistics route change. Low formal power, but often the people whose lives are most changed.',
  },
  {
    id: 'silent-blocker', name: 'SILENT BLOCKER', role: 'Hidden obstacle',
    power: 'medium', interest: 'low', attitude: 'blocker', influence: 'medium',
    nonObvious: true,
    detail: 'A stakeholder who is not outwardly opposed but has incentives or fears that will surface as resistance during implementation. Often a middle manager whose informal authority is threatened, or an IT team whose workload the solution will increase. Not identifying them early is a leading cause of late-stage stalls.',
  },
  {
    id: 'community-advocate', name: 'ADVOCATE', role: 'Community voice',
    power: 'low', interest: 'high', attitude: 'supporter', influence: 'high',
    nonObvious: true,
    detail: 'An informal leader who carries significant influence within the community the solution affects, but has no formal organisational power. Can make or break adoption. Their involvement early — as co-researchers and co-designers, not just interviewees — dramatically changes how the final solution is received.',
  },
]

type Group = { key: string; label: string; sublabel: string; ids: StakeholderId[] }

function getGroups(sort: SortMode): Group[] {
  switch (sort) {
    case 'cast':
      return [{ key: 'cast', label: '', sublabel: '', ids: STAKEHOLDERS.map(s => s.id) }]
    case 'power-interest':
      return [
        { key: 'engage',  label: 'ENGAGE CLOSELY',  sublabel: 'High power + high interest — manage these relationships most actively', ids: ['decision-maker'] },
        { key: 'satisfy', label: 'KEEP SATISFIED',   sublabel: 'High power + low interest — avoid surprises; check in without overwhelming', ids: ['budget-holder', 'regulator'] },
        { key: 'inform',  label: 'KEEP INFORMED',    sublabel: 'Lower power + high interest — involve in co-design, keep them updated', ids: ['end-user', 'frontline-staff', 'community-advocate'] },
        { key: 'monitor', label: 'MONITOR',           sublabel: 'Lower power + low interest — periodic check-ins; watch for attitude shifts', ids: ['downstream-affected', 'silent-blocker'] },
      ]
    case 'attitude':
      return [
        { key: 'mobilise',    label: 'MOBILISE',    sublabel: 'Supporters — activate, involve, amplify their voice', ids: ['end-user', 'frontline-staff', 'downstream-affected', 'community-advocate'] },
        { key: 'inform',      label: 'INFORM',      sublabel: 'Neutral — manage expectations; address concerns before they harden', ids: ['decision-maker', 'budget-holder', 'regulator'] },
        { key: 'plan-around', label: 'PLAN AROUND', sublabel: 'Blockers — surface their resistance early; design around or address it', ids: ['silent-blocker'] },
      ]
    case 'influence':
      return [
        { key: 'high-infl', label: 'HIGH INFLUENCE',   sublabel: 'Can shift others\' opinions and decisions at scale', ids: ['decision-maker', 'community-advocate'] },
        { key: 'med-infl',  label: 'MEDIUM INFLUENCE', sublabel: 'Meaningful reach within their domain', ids: ['end-user', 'frontline-staff', 'silent-blocker'] },
        { key: 'low-infl',  label: 'LOW INFLUENCE',    sublabel: 'Limited direct reach — but often first to signal emerging problems', ids: ['budget-holder', 'regulator', 'downstream-affected'] },
      ]
  }
}

const SORT_LABELS: Record<SortMode, string> = {
  'cast':           'CAST VIEW',
  'power-interest': 'POWER × INTEREST',
  'attitude':       'ATTITUDE',
  'influence':      'INFLUENCE',
}

function attitudeColor(a: Attitude): string {
  if (a === 'supporter') return `${SAGE}0.88)`
  if (a === 'blocker')   return 'rgba(245,158,11,0.85)'
  return 'rgba(255,255,255,0.45)'
}

function AttrChip({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <span
      className="text-[8px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded"
      style={{
        background: highlight ? `${SAGE}0.15)` : 'rgba(255,255,255,0.06)',
        color: highlight ? `${SAGE}0.90)` : 'rgba(255,255,255,0.42)',
        border: highlight ? `1px solid ${SAGE}0.30)` : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {label} {value.slice(0, 3).toUpperCase()}
    </span>
  )
}

export default function SMInteractive() {
  const [sort, setSort] = useState<SortMode>('cast')
  const [selected, setSelected] = useState<StakeholderId | null>(null)
  const prefersReduced = useReducedMotion()
  const groups = getGroups(sort)
  const selectedStakeholder = selected ? STAKEHOLDERS.find(s => s.id === selected) : null

  function handleCardClick(id: StakeholderId) {
    setSelected(prev => prev === id ? null : id)
  }

  return (
    <div className="w-full">
      {/* Sort controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-[9px] font-semibold uppercase tracking-widest self-center mr-1"
          style={{ color: 'rgba(255,255,255,0.30)' }}>SORT BY</span>
        {(Object.keys(SORT_LABELS) as SortMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => { setSort(mode); setSelected(null) }}
            className="px-3 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-widest transition-colors"
            style={{
              background: sort === mode ? `${SAGE}0.14)` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${sort === mode ? `${SAGE}0.38)` : 'rgba(255,255,255,0.10)'}`,
              color: sort === mode ? `${SAGE}1)` : 'rgba(255,255,255,0.45)',
            }}
          >
            {SORT_LABELS[mode]}
          </button>
        ))}
      </div>

      {/* Card groups */}
      <LayoutGroup id="sm-cast">
        <div className="space-y-5">
          {groups.map(group => (
            <div key={group.key}>
              {/* Group header */}
              <AnimatePresence initial={false}>
                {sort !== 'cast' && (
                  <motion.div
                    key={`${group.key}-header`}
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.20 }}
                    className="overflow-hidden mb-2"
                  >
                    <div className="flex items-start gap-2">
                      <div style={{ width: 2, minHeight: 20, marginTop: 2, borderRadius: 1, background: `${SAGE}0.50)`, flexShrink: 0 }} />
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest mr-2"
                          style={{ color: `${SAGE}0.85)` }}>{group.label}</span>
                        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{group.sublabel}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cards */}
              <div className="flex flex-wrap gap-2">
                {group.ids.map(id => {
                  const s = STAKEHOLDERS.find(x => x.id === id)!
                  const isSelected = selected === id
                  return (
                    <motion.div
                      key={id}
                      layoutId={`smc-${id}`}
                      layout
                      transition={prefersReduced ? { duration: 0 } : { duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      onClick={() => handleCardClick(id)}
                      className="rounded-lg border p-3 cursor-pointer"
                      style={{
                        minWidth: 148,
                        flex: '0 0 auto',
                        background: isSelected ? `${SAGE}0.12)` : 'rgba(255,255,255,0.04)',
                        borderColor: isSelected ? `${SAGE}0.42)` : 'rgba(255,255,255,0.10)',
                        transition: 'background 0.18s, border-color 0.18s',
                      }}
                    >
                      {/* Non-obvious badge */}
                      {s.nonObvious && (
                        <div className="text-[7px] font-mono uppercase tracking-widest mb-1"
                          style={{ color: `${SAGE}0.70)` }}>★ non-obvious</div>
                      )}
                      {/* Name */}
                      <p className="font-mono text-[9px] uppercase tracking-widest mb-0.5 font-semibold"
                        style={{ color: s.nonObvious ? `${SAGE}0.92)` : 'rgba(255,255,255,0.80)' }}>
                        {s.name}
                      </p>
                      {/* Role */}
                      <p className="text-[9px] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.role}</p>
                      {/* Attribute chips */}
                      <div className="flex flex-wrap gap-1">
                        <AttrChip label="PWR" value={s.power} highlight={sort === 'power-interest' && s.power === 'high'} />
                        <AttrChip label="INT" value={s.interest} highlight={sort === 'power-interest' && s.interest === 'high'} />
                        <span
                          className="text-[8px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded"
                          style={{
                            color: attitudeColor(s.attitude),
                            background: s.attitude === 'blocker' ? 'rgba(245,158,11,0.10)' : `${SAGE}0.08)`,
                            border: `1px solid ${s.attitude === 'blocker' ? 'rgba(245,158,11,0.25)' : `${SAGE}0.18)`}`,
                          }}
                        >{s.attitude}</span>
                        <AttrChip label="INFL" value={s.influence} highlight={sort === 'influence' && s.influence === 'high'} />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selectedStakeholder ? (
          <motion.div
            key={selectedStakeholder.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="mt-5 rounded-lg p-5 border"
            style={{
              background: selectedStakeholder.nonObvious ? `${SAGE}0.08)` : 'rgba(255,255,255,0.05)',
              borderColor: selectedStakeholder.nonObvious ? `${SAGE}0.30)` : 'rgba(255,255,255,0.12)',
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest mb-1"
                  style={{ color: `${SAGE}0.60)` }}>SELECTED STAKEHOLDER</p>
                <p className="font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{ color: selectedStakeholder.nonObvious ? `${SAGE}1)` : 'rgba(255,255,255,0.90)' }}>
                  {selectedStakeholder.name}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 justify-end">
                <AttrChip label="PWR" value={selectedStakeholder.power} />
                <AttrChip label="INT" value={selectedStakeholder.interest} />
                <AttrChip label="INFL" value={selectedStakeholder.influence} />
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {selectedStakeholder.detail}
            </p>
            {selectedStakeholder.nonObvious && (
              <div className="mt-3 pt-3 border-t" style={{ borderColor: `${SAGE}0.18)` }}>
                <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: `${SAGE}0.65)` }}>
                  ★ NON-OBVIOUS — teams frequently omit this stakeholder from initial research plans
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-5 rounded-lg p-4 border text-center"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="text-[9px] font-mono uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              {sort === 'cast'
                ? 'SELECT A CARD TO SEE FULL ATTRIBUTES — THEN SORT THE CAST BY POWER, ATTITUDE, OR INFLUENCE'
                : 'SELECT A CARD TO UNDERSTAND WHAT THIS STAKEHOLDER CONTRIBUTES AND WHAT THEY RISK'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
