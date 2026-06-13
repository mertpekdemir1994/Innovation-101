import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SectionProvider from '@/components/SectionProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Innovation 101',
    template: '%s | Innovation 101',
  },
  description:
    'An interactive learning platform for the innovation mindset — Processes, Frameworks, and Methods.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-background text-foreground">
        {/* Replace YOUR_DOMAIN with your actual domain, e.g. innovation101.com */}
        <Script
          defer
          data-domain="YOUR_DOMAIN"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <SectionProvider>
          <Nav />
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
        </SectionProvider>
      </body>
    </html>
  )
}
