'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SECTION_COLORS: Record<string, string> = {
  '/explore': 'var(--color-framework)',
  '/framework': 'var(--color-framework)',
  '/process': 'var(--color-process)',
  '/methods': 'var(--color-methods)',
  '/scenarios': 'var(--color-scenario)',
  '/reading': 'var(--color-reading)',
}

function getSectionColor(pathname: string): string {
  for (const [prefix, color] of Object.entries(SECTION_COLORS)) {
    if (pathname.startsWith(prefix)) return color
  }
  return 'var(--color-neutral-900)'
}

export default function SectionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--color-section',
      getSectionColor(pathname)
    )
  }, [pathname])

  return <>{children}</>
}
