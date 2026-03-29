'use client'

import { useEffect, useState } from 'react'
import { anchorNavItems } from '@/lib/narrative-content'

export function NarrativeHeader() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)

      setScrolled(top > 24)
      setScrollProgress(Math.min(100, Math.max(0, (top / max) * 100)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-border bg-[rgba(248,250,247,0.85)] backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="relative h-[2px] w-full bg-transparent">
        <span
          aria-hidden="true"
          className="block h-full origin-left bg-green-primary transition-[width] duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="section-shell flex items-center justify-between gap-6 py-3">
        <a href="#hero" className="text-sm font-semibold tracking-tight text-green-deep">
          Eco Kernelios
        </a>
        <nav aria-label="Narrative anchors" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-2 md:gap-3">
            {anchorNavItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-text-secondary transition hover:bg-green-mint hover:text-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
