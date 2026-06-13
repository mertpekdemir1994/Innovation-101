'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Explore', href: '/explore', color: 'var(--color-framework)' },
  { label: 'Methods', href: '/methods', color: 'var(--color-methods)' },
  { label: 'Scenarios', href: '/scenarios', color: 'var(--color-scenario)' },
  { label: 'Reading', href: '/reading', color: 'var(--color-reading)' },
  { label: 'About', href: '/about', color: 'var(--color-neutral-900)' },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
      <div className="max-w-content mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-neutral-900 font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity"
        >
          Innovation 101
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, href, color }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-normal transition-colors"
              style={{
                color: isActive(pathname, href) ? color : 'var(--color-neutral-600)',
                fontWeight: isActive(pathname, href) ? 600 : 400,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className="block w-5 h-px bg-neutral-900 transition-transform duration-200"
            style={{ transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-px bg-neutral-900 transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-neutral-900 transition-transform duration-200"
            style={{ transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 flex flex-col px-6 pt-12 gap-8">
          <Link
            href="/"
            className="text-2xl font-semibold text-neutral-900"
          >
            Home
          </Link>
          {NAV_ITEMS.map(({ label, href, color }) => (
            <Link
              key={href}
              href={href}
              className="text-2xl font-semibold"
              style={{ color: isActive(pathname, href) ? color : 'var(--color-neutral-900)' }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
