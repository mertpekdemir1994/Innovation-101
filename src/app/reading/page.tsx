import { getReadingCategories } from '../../lib/content'
import { DarkSection } from '../../components/method/Primitives'
import ReadingExplorer from './ReadingExplorer'

export const metadata = { title: 'Reading' }

const READING = 'rgba(220,38,38,'

export default function ReadingPage() {
  const categories = getReadingCategories()

  return (
    <DarkSection className="relative" ariaLabelledBy="reading-hero-heading">
      {/* Hero: same structure as the /methods and /frameworks index pages
          (eyebrow, h1, one-line intro, inside max-w-content ... py-16) so
          the top padding matches exactly instead of the bespoke spacing
          this page used before. */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(220,38,38,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="max-w-content mx-auto px-6 md:px-8 py-16" style={{ position: 'relative', zIndex: 1 }}>
        <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: `${READING}0.80)` }}>
          Reading
        </p>
        <h1
          id="reading-hero-heading"
          className="font-display font-semibold text-balance mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
        >
          The reading behind this site
        </h1>
        <p className="text-lg max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(255,255,255,0.50)' }}>
          Twenty books grouped by the question each one answers. Pick a category, then a book.
        </p>

        <ReadingExplorer categories={categories} />
      </div>
    </DarkSection>
  )
}
