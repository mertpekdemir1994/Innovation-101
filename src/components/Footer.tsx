export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-neutral-100)', padding: '1.25rem 0' }}>
      <div className="max-w-content mx-auto px-6 md:px-8">
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
      </div>
    </footer>
  )
}
