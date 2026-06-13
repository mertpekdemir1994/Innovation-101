import CalendarCTA from '@/components/CalendarCTA'

export const metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <div>
      <header className="border-b border-neutral-100 py-16 px-6 md:px-8">
        <div className="max-w-prose mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 text-balance mb-6">
            About this site
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Innovation 101 is a personal project — a practical, interactive
            reference for the processes, frameworks, and methods that drive real
            innovation.
          </p>
        </div>
      </header>

      <div className="max-w-prose mx-auto px-6 md:px-8 py-16 space-y-8">
        {/* Author bio — placeholder until content is provided */}
        <p className="text-neutral-600 leading-relaxed">
          [Author bio and philosophy to be provided.]
        </p>

        {/* Calendar embed */}
        <section className="border-t border-neutral-100 pt-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Work with me
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-8">
            Curious how any of this applies to your work? Let&apos;s think
            through it together.
          </p>

          {/* Cal.com embed — placeholder until Cal.com is configured */}
          <div
            className="rounded-lg border border-neutral-100 py-16 flex items-center justify-center text-neutral-600 text-sm"
            style={{ background: 'var(--color-neutral-100)' }}
          >
            Cal.com embed will go here — configure your Cal.com username in
            src/components/CalendarCTA.tsx
          </div>
        </section>
      </div>

      <CalendarCTA title="Innovation Challenge" bookingType="challenge" />
    </div>
  )
}
