type CalendarCTAProps = {
  title: string
}

export default function CalendarCTA({ title }: CalendarCTAProps) {
  return (
    <div className="border-t border-neutral-100 py-16 px-6 md:px-8 text-center">
      <div className="max-w-content mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
          Coffee &amp; Innovation · 30 min · Free
        </p>
        <p className="text-xl font-semibold text-neutral-900 mb-6 text-balance">
          Curious how {title} applies to your work? Let&apos;s have a coffee and think through it together.
        </p>
        {/* Replace YOUR_CAL_USERNAME with your actual Cal.com username */}
        <a
          href="https://cal.com/YOUR_CAL_USERNAME/coffee-and-innovation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: 'var(--color-section, var(--color-neutral-900))' }}
        >
          Book a coffee →
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}
