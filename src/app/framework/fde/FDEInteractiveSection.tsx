'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(185,28,28,'

type VariantKey = 'palantir' | 'distyl' | 'embedded' | 'commitment'

const SPECTRUM: {
  key: VariantKey
  label: string
  commitment: string
  cost: string
}[] = [
  { key: 'palantir',   label: 'Palantir FDE',            commitment: 'Highest', cost: 'Very high'  },
  { key: 'distyl',     label: 'Distyl Model',            commitment: 'High',    cost: 'High'       },
  { key: 'embedded',   label: 'Embedded Product Team',   commitment: 'Medium',  cost: 'Moderate'   },
  { key: 'commitment', label: 'Commitment Engineering',  commitment: 'Lower',   cost: 'Lower'      },
]

const VARIANT_DETAIL: Record<VariantKey, {
  headline: string
  description: string
  when: string
  prompt: string
  example: { co: string; text: string }
}> = {
  palantir: {
    headline: 'Full FDE: Radical autonomy, field as R&D, long-term embeds',
    description:
      'Engineers embedded with specific customers for months or years. Custom solutions built directly in the customer\'s environment with no central approval process. Customer deployments treated as R&D, not delivery. Successful field innovations extracted and migrated to the core platform. The most extreme version, requiring engineers who simultaneously combine world-class technical skill with customer-facing capability and independent product judgment. Real only if all three of McCardel\'s conditions are met: premium enterprise pricing, complex non-standardizable problems, and authentic field autonomy.',
    when: 'Your customers are Fortune 500 or government, problems are un-standardizable, and you can hire engineers who are simultaneously world-class builders and effective field operators.',
    prompt: 'Are you interested in FDE because it genuinely fits your context, or because it sounds cool and Palantir is successful? These are different reasons and lead to different outcomes.',
    example: {
      co: 'Palantir Technologies: Foundry Origin',
      text: 'Foundry\'s core capabilities (graph analysis, data transformation, and pipeline infrastructure) were not built by a central product team from a roadmap. They were built by FDE teams in the field, working with customers whose data problems no off-the-shelf product could handle. The Embed-Build-Extract-Migrate cycle described in this framework is the literal history of how Foundry came to exist.',
    },
  },
  distyl: {
    headline: 'Intentional FDE: Designed from day one, not discovered through iteration',
    description:
      'The key difference from Palantir\'s model: FDE was chosen as a deliberate founding strategy at Distyl, not discovered as an emergent practice after years of iteration. The business model, pricing, hiring profile, and organizational culture were designed from the start to support forward-deployed work. This intentional version may be more replicable than Palantir\'s model because the tradeoffs are understood in advance. Distyl deploys engineers directly with enterprise AI customers, treating each deployment as both a revenue event and a product discovery mechanism.',
    when: 'You are founding a startup and are willing to design your entire business model, pricing structure, and hiring profile around forward-deployed work from day one, before you have customers or revenue.',
    prompt: 'If you were designing your company from scratch to support FDE, what would your pricing model look like? Your hiring profile? Your organizational structure? The delta between your current company and that hypothetical company is the gap you\'d need to close.',
    example: {
      co: 'Distyl AI (cited by McCardel)',
      text: 'McCardel cites Distyl as the only company he is aware of that has replicated the Palantir model as a startup strategy: intentionally metabolizing all the pain and tradeoffs of true forward-deployed culture, rather than adopting the language of FDE while running a standard product business.',
    },
  },
  embedded: {
    headline: 'Time-bounded embed: Understand and prototype, then return',
    description:
      'A small cross-functional team spends four to twelve weeks embedded with a specific customer or customer segment. Not to implement: to understand and prototype. The team develops firsthand knowledge of the customer\'s workflows, pain points, and working environment, then returns to the standard product development process with dramatically better product instincts. More accessible than full FDE because it is time-bounded, does not require building custom production systems, and feeds back into a standard product process rather than requiring a new organizational model.',
    when: 'You have a well-staffed product team, a specific customer segment you need to understand much more deeply, and the organizational will to commit a small cross-functional team to four to twelve weeks of intensive customer presence.',
    prompt: 'For your most important unsolved customer problem: what would a four-week embedded team learn that your current research process cannot? What specifically would they need to observe directly that your current methods would not surface?',
    example: {
      co: 'Enterprise software companies during new product development',
      text: 'Enterprise software companies have long used embedded product teams as a discovery methodology during major new product development cycles, embedding with a small set of key customers before committing to a feature direction. The innovation is treating this as a standard phase of the product development process rather than an occasional special engagement.',
    },
  },
  commitment: {
    headline: 'High-trust customer relationships: FDE\'s core benefit without FDE\'s cost',
    description:
      'Product and engineering leads establish close, ongoing relationships with a small number of high-trust customers who share unfiltered feedback, participate in early-stage testing, and co-develop features. The company builds one product, not custom solutions, but the customers shaping that product are closer, more involved, and more trusted than standard enterprise relationships. Commitment Engineering delivers the most important benefit of FDE (deeply grounded product decisions) without the cost structure, organizational chaos, or rare engineer requirement. The right default for almost everyone who is not Palantir or Distyl.',
    when: 'Almost always. Almost every company can benefit from deeper, higher-trust customer relationships that provide unfiltered ongoing input into product direction. The question is not whether to do this but who to do it with and how to structure the relationship.',
    prompt: 'Name three customers or users you could develop a Commitment Engineering relationship with. What would it look like to give them access to your early-stage product thinking in exchange for unfiltered, ongoing feedback that actually changes your decisions?',
    example: {
      co: 'Hex (Barry McCardel): after Palantir',
      text: 'After leaving Palantir, McCardel deliberately chose not to replicate FDE at Hex, but did not abandon the core insight. Commitment Engineering (deep, high-trust customer relationships rather than field deployments) delivers the grounded product direction that FDE produces at a fraction of the cost and organizational complexity.',
    },
  },
}

export default function FDEInteractiveSection() {
  const [active, setActive] = useState<VariantKey | null>(null)
  const prefersReduced = useReducedMotion()
  const detail = active ? VARIANT_DETAIL[active] : null

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-space-8 items-start">
      {/* Left: Commitment spectrum */}
      <div>
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Commitment spectrum
        </p>

        {/* Vertical spectrum line */}
        <div className="relative flex md:flex-col gap-space-2 overflow-x-auto md:overflow-visible pb-space-2 md:pb-0">
          {/* Vertical line on desktop */}
          <div
            className="hidden md:block absolute left-4 top-4 bottom-4 w-px"
            style={{ background: `${BRICK}0.20)` }}
          />

          {SPECTRUM.map((variant, i) => {
            const isActive = active === variant.key
            const opacity = 1 - i * 0.08
            return (
              <button
                key={variant.key}
                type="button"
                onClick={() => setActive(active === variant.key ? null : variant.key)}
                className="flex-shrink-0 flex items-center gap-space-4 rounded-lg pl-space-3 pr-space-5 py-space-3 transition-all duration-200 relative md:min-w-[200px]"
                style={{
                  background: isActive ? `${BRICK}0.20)` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? `${BRICK}0.45)` : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {/* Spectrum dot */}
                <div
                  className="w-3 h-3 rounded-full shrink-0 z-10 relative"
                  style={{
                    background: isActive ? `${BRICK}1)` : `${BRICK}${(opacity * 0.4).toFixed(2)})`,
                    border: `2px solid ${isActive ? `${BRICK}1)` : `${BRICK}0.30)`}`,
                  }}
                />
                <div className="text-left">
                  <p className="font-semibold text-xs" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                    {variant.label}
                  </p>
                  <div className="flex gap-space-3 mt-space-1">
                    <span className="font-mono text-2xs" style={{ color: isActive ? `${BRICK}0.70)` : 'rgba(255,255,255,0.25)' }}>
                      {variant.commitment}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}

          {/* Spectrum labels */}
          <div className="hidden md:flex flex-col justify-between mt-space-2 ml-1">
            <span className="font-mono text-2xs uppercase tracking-widest" style={{ color: `${BRICK}0.45)` }}>
              ↑ Most radical
            </span>
            <span className="font-mono text-2xs uppercase tracking-widest mt-space-2" style={{ color: 'rgba(255,255,255,0.20)' }}>
              ↓ Most accessible
            </span>
          </div>
        </div>
      </div>

      {/* Right: Detail panel or prompt */}
      <div>
        <AnimatePresence mode="wait">
          {active && detail ? (
            <motion.div
              key={active}
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

              {/* When to use */}
              <div
                className="rounded-lg px-space-5 py-space-4 mb-space-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  When to use this variant
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {detail.when}
                </p>
              </div>

              {/* Example */}
              <div
                className="rounded-xl p-space-5 mb-space-5"
                style={{ background: `${BRICK}0.12)`, border: `1px solid ${BRICK}0.22)` }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${BRICK}0.65)` }}>
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
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3
                className="font-semibold mb-space-4"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: '#FAFAFA', lineHeight: 1.2 }}
              >
                FDE is a spectrum, not a binary
              </h3>
              <p className="text-sm leading-relaxed mb-space-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                The question is not &ldquo;should we do FDE?&rdquo; but &ldquo;how much of FDE&rsquo;s core insight
                (that proximity to real customer context produces better products) can we practically embed
                in our operating model?&rdquo;
              </p>
              <p className="text-sm leading-relaxed mb-space-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Most organizations are not Palantir and should not try to be. But most organizations can
                move further toward the customer than they currently are, without the cost structure,
                engineer profile, or organizational chaos of true FDE. Select a variant to see what
                that looks like in practice.
              </p>
              <div
                className="rounded-xl px-space-5 py-space-4"
                style={{ background: `${BRICK}0.08)`, border: `1px solid ${BRICK}0.18)` }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: `${BRICK}0.65)` }}>
                  Where to start
                </p>
                <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Start from the bottom of the spectrum, Commitment Engineering, and ask whether you are
                  actually doing it. If not, that is the first gap to close. If yes, consider whether a
                  time-bounded embedded engagement would accelerate the next product decision you are stuck on.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
