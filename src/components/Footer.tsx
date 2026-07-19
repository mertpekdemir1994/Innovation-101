export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-neutral-100)', padding: '1.25rem 0' }}>
      <div className="max-w-content mx-auto px-6 md:px-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-neutral-400)',
            letterSpacing: '0.04em',
          }}
        >
          © {new Date().getFullYear()} Innovation 101
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-neutral-400)',
            letterSpacing: '0.04em',
          }}
        >
          Content is not finalized. AI-assisted — may contain errors.
        </p>
      </div>
    </footer>
  )
}
