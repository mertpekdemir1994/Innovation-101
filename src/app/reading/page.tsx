import ComingSoon from '@/components/ComingSoon'

export const metadata = { title: 'Reading' }

export default function ReadingPage() {
  return (
    <ComingSoon
      accent="var(--stage-discovery)"
      glowRgb="61,107,90"
      heading="Still reading."
      body="A collection of things worth your time is being assembled. It turns out that curating is slower than accumulating, which is rather the point."
      footer="Everything else on this site is finished. This is not."
    />
  )
}
