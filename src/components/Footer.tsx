export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-8 mt-24">
      <div className="max-w-content mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
        <p>© {new Date().getFullYear()} Innovation 101</p>
        <p>
          This site participates in the Amazon Associates program. Some book links may be affiliate links.
        </p>
      </div>
    </footer>
  )
}
