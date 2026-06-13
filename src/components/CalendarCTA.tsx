type CalendarCTAProps = {
  title: string
  bookingType: 'framework' | 'challenge'
}

const CTA_CONFIG = {
  framework: {
    duration: '30 min',
    prompt: (title: string) =>
      `Want to explore how ${title} applies to your context? Book 30 minutes.`,
    calLink: 'framework-deep-dive-30',
  },
  challenge: {
    duration: '45 min',
    prompt: () => 'Facing a similar challenge? Let’s think through it together.',
    calLink: 'innovation-challenge-45',
  },
}

export default function CalendarCTA({ title, bookingType }: CalendarCTAProps) {
  const config = CTA_CONFIG[bookingType]

  return (
    <div className="border-t border-neutral-100 py-16 px-6 md:px-8 text-center">
      <div className="max-w-prose mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
          {config.duration} · Free
        </p>
        <p className="text-xl font-semibold text-neutral-900 mb-6 text-balance">
          {config.prompt(title)}
        </p>
        {/* Replace YOUR_CAL_USERNAME with your actual Cal.com username */}
        <a
          href={`https://cal.com/YOUR_CAL_USERNAME/${config.calLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: 'var(--color-section, var(--color-neutral-900))' }}
        >
          Book a time →
        </a>
      </div>
    </div>
  )
}
