'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { comparisonCopy, getAssetById } from '@/lib/narrative-content'

export function Comparison() {
  const [sliderPosition, setSliderPosition] = useState(52)
  const [mode, setMode] = useState<'mix' | 'before' | 'after'>('mix')
  const before = getAssetById('lecture')
  const after = getAssetById('new-building')
  const reveal = mode === 'before' ? 0 : mode === 'after' ? 100 : sliderPosition

  return (
    <section
      id="comparison"
      data-section-id="comparison"
      aria-labelledby="comparison-title"
      className="bg-surface py-20 md:py-28"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 id="comparison-title" className="text-title font-semibold tracking-tight text-text-primary">
            {comparisonCopy.heading}
          </h2>
          <p className="mt-4 text-body text-text-secondary">{comparisonCopy.framing}</p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="surface-card relative aspect-[16/9] overflow-hidden">
            <Image
              src={before.src}
              alt={before.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
            >
              <Image
                src={after.src}
                alt={after.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-y-0 w-0.5 bg-[rgba(255,255,255,0.95)] shadow-[0_0_24px_rgba(18,33,23,0.4)]"
              style={{ left: `${reveal}%` }}
            >
              <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-deep bg-surface shadow-level1" />
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-[rgba(31,42,34,0.8)] px-3 py-1 text-xs font-medium text-surface">
              {comparisonCopy.labels.before}
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-[rgba(47,93,58,0.85)] px-3 py-1 text-xs font-medium text-surface">
              {comparisonCopy.labels.after}
            </div>
          </div>

          <div className="mt-6 space-y-4 rounded-large border bg-[rgba(248,250,247,0.85)] p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMode('before')}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  mode === 'before'
                    ? 'border-green-deep bg-green-deep text-surface'
                    : 'border-border bg-surface text-text-secondary hover:border-green-secondary'
                }`}
              >
                Original
              </button>
              <button
                type="button"
                onClick={() => setMode('mix')}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  mode === 'mix'
                    ? 'border-green-deep bg-green-deep text-surface'
                    : 'border-border bg-surface text-text-secondary hover:border-green-secondary'
                }`}
              >
                Compare
              </button>
              <button
                type="button"
                onClick={() => setMode('after')}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  mode === 'after'
                    ? 'border-green-deep bg-green-deep text-surface'
                    : 'border-border bg-surface text-text-secondary hover:border-green-secondary'
                }`}
              >
                Ecological Vision
              </button>
            </div>
            <div>
              <label htmlFor="comparison-slider" className="sr-only">
                Compare Original and Ecological Vision
              </label>
              <input
                id="comparison-slider"
                type="range"
                min={0}
                max={100}
                value={reveal}
                onChange={(event) => {
                  setMode('mix')
                  setSliderPosition(Number(event.target.value))
                }}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-green-mint accent-green-deep"
                aria-valuetext={`${reveal}% Ecological Vision`}
              />
            </div>
            <p className="text-xs text-text-secondary" role="status" aria-live="polite">
              Showing {reveal}% {comparisonCopy.labels.after}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
