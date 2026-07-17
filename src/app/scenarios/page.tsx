import ComingSoon from '@/components/ComingSoon'

export const metadata = { title: 'Scenarios — Innovation 101' }

export default function ScenariosPage() {
  return (
    <ComingSoon
      accent="var(--stage-ideation)"
      glowRgb="181,97,62"
      heading="Still imagining."
      body="Scenarios are being built. Drawing a future in enough detail that it can be argued with takes longer than describing one vaguely, which is also rather the point."
      footer="Everything else on this site is finished. This is not."
    />
  )
}
