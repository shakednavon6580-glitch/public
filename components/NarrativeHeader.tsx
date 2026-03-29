'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { anchorNavItems, brandCopy, getAssetById } from '@/lib/narrative-content'

export function NarrativeHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<string>(anchorNavItems[0]?.id ?? '')
  const brandLogo = getAssetById('kernelios-header-logo')

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY
      setScrolled(top > 24)

      const marker = window.innerHeight * 0.32
      let currentSectionId: string = anchorNavItems[0]?.id ?? ''

      for (const item of anchorNavItems) {
        const section = document.getElementById(item.id)
        if (!section) continue

        const rect = section.getBoundingClientRect()
        if (rect.top <= marker) {
          currentSectionId = item.id
        }
      }

      setActiveSectionId(currentSectionId)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell pt-4">
        <div
          className={`glass-shell flex flex-col gap-4 rounded-[1.85rem] px-4 py-3 transition-all duration-300 md:flex-row md:items-center md:justify-between md:px-5 ${
            scrolled
              ? 'border-[rgba(255,255,255,0.12)] bg-[rgba(9,20,15,0.72)] shadow-[0_18px_44px_rgba(7,18,13,0.3)]'
              : 'border-[rgba(255,255,255,0.1)] bg-[rgba(9,20,15,0.26)]'
          }`}
        >
          <a
            href="#hero"
            className="flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <Image
              src={brandLogo.src}
              alt={brandLogo.alt}
              width={92}
              height={92}
              className="h-11 w-auto shrink-0 rounded-xl object-contain md:h-12"
              priority
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[0.08em] text-white md:text-base">
                {brandCopy.title}
              </span>
              <span className="mt-0.5 hidden max-w-[19rem] text-[0.72rem] leading-relaxed tracking-[0.04em] text-[rgba(255,255,255,0.7)] sm:block">
                {brandCopy.subtitle}
              </span>
            </span>
          </a>
          <nav aria-label="Narrative anchors" className="overflow-x-auto">
            <ul className="flex min-w-max items-center gap-2 md:gap-2.5">
            {anchorNavItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeSectionId === item.id ? 'page' : undefined}
                  className={`nav-link-premium ${
                    activeSectionId === item.id
                      ? 'bg-[rgba(255,255,255,0.18)] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                      : 'text-[rgba(255,255,255,0.78)]'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
