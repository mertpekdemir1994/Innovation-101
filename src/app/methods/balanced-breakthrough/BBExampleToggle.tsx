'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A founding team is developing an on-demand premium home cleaning service targeting professional households who are time-poor but highly quality-conscious. The idea tests well in concept — customers articulate clear willingness to use it. The question before investing further is whether the idea is actually a Balanced Breakthrough or whether it sits in one of the failure-mode zones.'

export default function BBExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${PLUM}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.35)` : `${PLUM}0.35)`
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${PLUM}1)`
                : 'var(--color-neutral-600)',
            }}>
            {t === 'traditional' ? 'DFV analysis (human-led)' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Scenario */}
      <div className="rounded-lg px-4 py-3 mb-6" style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mr-2">Shared scenario</span>
        <span className="text-sm text-neutral-600">{SCENARIO}</span>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* Three-lens check */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${PLUM}1)` }}>Checking each lens explicitly</p>
              <div className="space-y-4">
                {[
                  {
                    lens: 'DESIRABILITY',
                    verdict: 'Strong ✓',
                    color: `${PLUM}1)`,
                    body: 'Research with fifteen professional households confirmed genuine unmet need. Participants described the pain clearly: existing cleaning services were inconsistent on quality, required micromanagement, and created friction rather than relieving it. Willingness to pay at the proposed price point was high, and the concept of a reliably premium service with no supervisory overhead resonated strongly.',
                  },
                  {
                    lens: 'FEASIBILITY',
                    verdict: 'Conditional ✓',
                    color: `${PLUM}0.80)`,
                    body: 'The team could recruit and train cleaning professionals to the required quality standard. The logistics and scheduling systems were buildable. The conditional: sustaining quality at scale would require robust QA processes and low staff turnover — both achievable but demanding ongoing investment. Feasibility held, but only with operational discipline.',
                  },
                  {
                    lens: 'VIABILITY',
                    verdict: 'FATAL ✗',
                    color: 'var(--color-reading)',
                    body: 'This is where the idea broke. At the price point customers would pay — even the premium end — the labour cost to deliver a high-quality clean at premium service levels exceeded revenue per visit. Labour is the dominant cost, and the unit economics were structurally negative. Volume did not fix it; it amplified the loss. The team modelled every pricing and cost scenario and could not find a path to positive unit economics.',
                  },
                ].map(({ lens, verdict, color, body }) => (
                  <div key={lens} className="rounded-lg p-4"
                    style={{ background: `${PLUM}0.04)`, borderLeft: `3px solid ${color}` }}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <p className="text-[10px] font-semibold uppercase tracking-widest"
                        style={{ color }}>
                        {lens}
                      </p>
                      <p className="text-[10px] font-semibold" style={{ color }}>
                        {verdict}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-700 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnosis and outcome */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${PLUM}1)` }}>Where this idea lives — and what the team did</p>
              <div className="rounded-lg p-4 mb-4"
                style={{ background: 'rgba(220,38,38,0.05)', borderLeft: '3px solid rgba(220,38,38,0.35)' }}>
                <p className="text-xs font-semibold mb-1 text-red-700">
                  Desirability + Feasibility, not Viability — Love Without Sustainability
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The idea sits in the D+F overlap, not the centre. People love it and the team can deliver it, but the economics are fatal. A year of building this would have created something beloved and unsustainable — the most common and most expensive trap in the DFV model.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: 'The team stopped before building',
                    detail: 'Because the DFV check surfaced the viability gap before significant investment, the team paused. This was not a comfortable conversation — the concept was genuinely exciting and the team was attached to it. But the discipline of checking all three lenses before committing prevented a much larger loss.',
                  },
                  {
                    label: 'Reframing, not abandoning',
                    detail: 'The team explored whether the viability gap could be bridged by changing the model — higher-tier positioning with fewer clients, B2B rather than B2C, or a technology-mediated quality layer that reduced the labour cost per visit. Each variant required re-checking all three lenses. The desirability and feasibility findings remained useful inputs to any reformulation.',
                  },
                  {
                    label: 'What the analysis gave them',
                    detail: 'A clear diagnosis rather than a vague sense that something was wrong. Knowing the idea sat in D+F rather than centre pointed precisely to what needed to change: the economic model, not the concept itself. That specificity made the conversation about next steps much more productive than a general "the numbers don\'t work" conclusion.',
                  },
                ].map(item => (
                  <div key={item.label} className="rounded p-4"
                    style={{ background: `${PLUM}0.04)`, borderLeft: `2px solid ${PLUM}0.20)` }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: `${PLUM}0.88)` }}>
                      {item.label}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* Hypothetical framing */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical.</span>{' '}
                This tab imagines what might happen if the team asked an AI to run the DFV analysis rather than conducting their own research and financial modelling. It illustrates a specific failure mode — AI-produced false balance — not a claim about what any particular tool would produce.
              </p>
            </div>

            {/* What AI produces */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>The AI analysis: fluent and balanced</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Asked to assess the on-demand premium cleaning concept through a DFV lens, the AI produces a structured, confident output. It identifies the strong desirability signal from professional households, notes that the operational model is feasible with appropriate staffing and QA, and describes a path to viability through premium positioning and platform efficiency gains.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The output is well-structured, covers all three lenses, and reads like a balanced assessment. Each section has a verdict. The overall conclusion is cautiously positive.
              </p>
              <div className="rounded-lg p-4" style={{ background: `${INDIGO}0.05)`, border: `1px solid ${INDIGO}0.15)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: `${INDIGO}0.70)` }}>The problem</p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  The viability section is built on a generic model of premium service economics, not the actual unit economics of this specific labour market, this quality level, and this price ceiling. The AI has no access to real labour cost data for the target market, no knowledge of what quality-level staff cost to recruit and retain in this geography, and no way to verify what the upper bound of consumer willingness to pay actually is in practice. The numbers are plausible-looking because they are drawn from analogous service models. They are not the numbers that would emerge from actual financial modelling with real inputs.
                </p>
              </div>
            </div>

            {/* The specific trap */}
            <div className="border rounded-lg p-5" style={{ borderColor: 'rgba(245,158,11,0.25)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4 text-amber-700">
                The false balance trap
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    label: 'Three lenses with one empty',
                    detail: 'The AI assessment covers all three lenses, which creates the appearance of a complete DFV check. But the viability lens is effectively empty — populated with analogous data rather than real modelling. A three-section output with one hollow section can still pass a cursory review, particularly if the other two sections are strong.',
                  },
                  {
                    label: 'The team felt validated, not analysed',
                    detail: 'Because the AI produced a balanced assessment across all three lenses, the team experienced the output as validation rather than analysis. The framing of each section — "strong desirability signal," "operationally feasible," "viable with appropriate positioning" — matched what they hoped to hear. The absence of real unit economics went unnoticed.',
                  },
                  {
                    label: 'The fatal gap was papered over',
                    detail: 'The specific viability conclusion that the human analysis would have reached — that the unit economics are structurally negative at any realistic price point in this labour market — never surfaced. The AI produced a conclusion consistent with the inputs it had, which were too general to reveal the specific flaw. The team moved forward into operational planning with the wrong picture of where their idea sat.',
                  },
                ].map(item => (
                  <div key={item.label} className="rounded p-3"
                    style={{ background: 'rgba(245,158,11,0.05)', borderLeft: '2px solid rgba(245,158,11,0.22)' }}>
                    <p className="text-[9px] font-semibold uppercase tracking-widest mb-1 text-amber-700">{item.label}</p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Synthesis */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>What the DFV model requires that AI cannot substitute</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The DFV model is only as strong as the inputs to each lens. The desirability lens requires real research with real users. The feasibility lens requires grounded organisational self-knowledge. The viability lens requires actual financial modelling with real cost and revenue data. AI can help structure the analysis and identify what questions to ask, but it cannot substitute for the human work of gathering genuine inputs to each lens.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4" style={{ borderColor: `${INDIGO}0.18)` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: `${INDIGO}0.80)` }}>Where AI genuinely helps</p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Structuring the analysis. Identifying which questions each lens requires. Pressure-testing assumptions once real numbers are in place. Generating scenarios around a known baseline. Benchmarking unit economics against real analogues once the right comparators are identified.
                  </p>
                </div>
                <div className="rounded-lg border p-4 border-amber-200 bg-amber-50">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-2">
                    What must stay human
                  </p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    The actual research that fills each lens. Direct conversations with real users. Honest assessment of the organisation&apos;s real capabilities. Financial modelling with real cost and revenue data. The integrating judgment that weighs all three lenses together and decides what the picture means.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
