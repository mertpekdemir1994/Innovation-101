'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A company wants to enter the wine market. Every competitor positions on the same conventional axis: price tied to prestige and expertise (cheap-and-basic up to expensive-and-sophisticated) with all the associated language of regions, vintages, and connoisseurship. The team runs a competitive landscape analysis to find an opening. This is the terrain the approachable-wine disruptors like Yellow Tail famously exploited. Both versions map the same market; only the method differs.'

export default function CLAExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${SAGE}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? (t === 'ai' ? `${INDIGO}0.35)` : `${SAGE}0.35)`)
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${SAGE}1)`
                : 'var(--color-neutral-600)',
            }}
          >
            {t === 'traditional' ? 'Human-led analysis' : 'With AI (hypothetical)'}
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
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* Step 1 */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>Step 1: Map the field on the conventional axis</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The team first mapped the wine market on its conventional axis: price and prestige. Every
                competitor in the category sat somewhere along the same line, from budget entry-level to
                ultra-premium, all speaking the same language of expertise, region, and vintage. The map
                was complete and accurate.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                And it showed exactly what you would expect: a dense, crowded market with every position
                on the line already taken. Entering on the conventional axis meant competing in a space
                where the only moves were incremental: slightly better quality at the same price, or
                slightly lower price at the same quality.
              </p>
              <div className="mt-4 rounded p-3"
                style={{ background: `${SAGE}0.06)`, borderLeft: `2px solid ${SAGE}0.30)` }}>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  <span className="font-semibold" style={{ color: `${SAGE}0.80)` }}>The honest finding on conventional axes: </span>
                  the market is saturated. Every price-and-prestige position is occupied. Conventional analysis
                  stops here and implies there is no room. The real move is to ask: what other axis exists?
                </p>
              </div>
            </div>

            {/* Step 2: The reframe */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>Step 2: Reframe the axes, find a dimension the industry ignores</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Instead of price-and-prestige, the team tried a different dimension: <strong>approachability</strong>,
                how easy or hard the wine (and its marketing) made a non-expert feel. How much expertise
                did a customer need to choose a bottle and feel confident about it?
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                On that fresh axis, the crowded market suddenly revealed a wide white space. Almost every
                competitor sat at the &ldquo;expert, sophisticated, faintly intimidating&rdquo; end. Even the budget
                entry-level brands used the same expert-oriented language and visual conventions as the
                premium ones. Virtually no competitor occupied the &ldquo;approachable, unpretentious, fun,
                no connoisseurship required&rdquo; end.
              </p>
              <div className="rounded p-3"
                style={{ background: `${SAGE}0.08)`, borderLeft: `2px solid ${SAGE}0.40)` }}>
                <p className="text-xs font-semibold mb-1" style={{ color: `${SAGE}0.80)` }}>
                  The white space on the reframed axis
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  A huge population of casual wine buyers, alienated by the expertise-heavy conventions
                  of the entire category, had no option designed for them. Every bottle on the shelf spoke
                  to someone who already knew about wine. The reframe revealed a gap no conventional map had shown.
                </p>
              </div>
            </div>

            {/* Step 3: Validate */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>Step 3: Interrogate the white space before committing</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The map showed a gap. The team then asked the critical question: is this empty because it is
                an un-served opportunity, or because no viable business can survive there?
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Customer research confirmed the gap was real. Casual wine buyers were underserved, felt
                excluded by the category&rsquo;s conventions, and actively wanted the unintimidating
                experience no one was offering. The empty space on the approachability axis was an opportunity,
                not a graveyard.
              </p>
              <p className="text-sm font-semibold" style={{ color: `${SAGE}0.88)` }}>
                Occupying that reframed white space (approachable wine with friendly, jargon-free branding
                and accessible pricing) opened an enormous market the conventional map had rendered entirely invisible.
                The breakthrough came from reframing the axis to one the industry was not competing on,
                and validating the gap it revealed.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* Hypothetical framing notice */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The real disruption was human-led. This tab imagines the team had instead opened with an AI
                competitive analysis of the wine market, to make visible what that approach reveals and what it misses.
              </p>
            </div>

            {/* What AI produced */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>What AI produced: a fast, accurate conventional map</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  conventional axes only
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The AI produced a thorough, well-organized competitive analysis, and it mapped the field on
                the conventional axis. Reasoning from everything written about wine, it inherited the industry&rsquo;s
                own framing: it plotted competitors by price and prestige, summarized their positioning in the
                standard language of region, vintage, and quality tier, and identified the crowded center accurately.
              </p>
              <div className="space-y-2">
                {[
                  {
                    label: 'Market structure',
                    ai: '"The wine market segments by price and quality tier, from entry-level to ultra-premium. The mid-market is highly competitive; the premium segment is consolidated around heritage brands with strong category credentials."',
                    note: 'Accurate description of the crowded conventional map.',
                  },
                  {
                    label: 'Competitive positioning',
                    ai: '"Differentiation centers on provenance, production method, expert credentials, and quality signals. Brand strength in the premium segment depends heavily on category authority and critical recognition."',
                    note: 'The industry\'s own framing, recited back as analysis.',
                  },
                  {
                    label: 'Market opportunity',
                    ai: '"The market is highly competitive across all price segments. Sustainable differentiation requires either premium positioning with genuine quality credentials or a cost-leadership strategy in the value segment."',
                    note: 'Conventional conclusion from the conventional axes: no apparent gap.',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded p-3"
                    style={{ background: `${INDIGO}0.05)`, borderLeft: `2px solid ${INDIGO}0.28)` }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: `${INDIGO}0.65)` }}>{item.label}</p>
                    <p className="text-xs text-neutral-700 italic mb-1.5">{item.ai}</p>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">↑ {item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The missing reframe */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.80)` }}>What was missing: the axis the industry was not using</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The decisive move (reframing the map onto the &ldquo;approachable vs intimidating&rdquo; axis the
                industry was not competing on) was not something the AI proposed. That axis appears nowhere
                in the conventional wine discourse the AI learned from. The whole point of it was that the
                industry was <em>not</em> talking about it. Asked to map the landscape, the AI mapped
                the field everyone already sees and confirmed it was crowded.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Prompted specifically, &ldquo;map this market on unconventional axes the industry ignores,
                such as how approachable it feels to a non-expert,&rdquo; the AI could help explore the reframe.
                But choosing that axis (the contrarian move against the consensus framing) and validating that
                the gap was a real, underserved market were human acts.
              </p>
            </div>

            {/* Honest readout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${INDIGO}0.80)` }}>Where AI helped</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The legwork: cataloging competitors, summarizing their stated positioning, populating the
                  conventional map. Research that would have taken two days of manual work arrived in two
                  hours, and it was accurate.
                </p>
              </div>
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
                  Where it needed human judgment
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The reframe, the validation, and the decision. The axis no one was using was not in the
                  data. Whether the gap was an opportunity was not in the data either. The strategy, and the
                  billion-dollar category creation, was entirely human.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
