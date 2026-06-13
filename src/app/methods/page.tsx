import { getMethodsByStage } from '@/lib/content'
import type { MethodDeploymentStage } from '@/types/content'
import MethodsStageView from '@/components/MethodsStageView'

export const metadata = { title: 'Methods' }

const STAGES: MethodDeploymentStage[] = ['discover', 'define', 'develop', 'deliver']

export default function MethodsPage() {
  const methodsByStage = Object.fromEntries(
    STAGES.map((stage) => [stage, getMethodsByStage(stage)])
  ) as Record<MethodDeploymentStage, ReturnType<typeof getMethodsByStage>>

  return (
    <div className="max-w-content mx-auto px-6 md:px-8 py-16">
      <header className="mb-16">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-methods)' }}
        >
          Methods
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-4">
          What to do in your session
        </h1>
        <p className="text-lg text-neutral-600 max-w-[560px] leading-relaxed">
          Specific tools and techniques, organized by where they belong in the
          innovation process. Find what you need for today.
        </p>
      </header>

      <MethodsStageView methodsByStage={methodsByStage} />
    </div>
  )
}
