'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { finalCopy, getAssetById } from '@/lib/narrative-content'

export function FinalTakeaway() {
  const visual = getAssetById('new-building-above')

  return (
    <section
      id="takeaway"
      data-section-id="takeaway"
      aria-labelledby="takeaway-title"
      className="bg-surface py-20 md:py-28"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card relative overflow-hidden p-8 text-center md:p-14"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={visual.src}
              alt=""
              fill
              className="object-cover opacity-10"
              sizes="100vw"
            />
          </div>
          <div className="relative mx-auto max-w-3xl">
            <h2 id="takeaway-title" className="text-title font-semibold tracking-tight text-text-primary">
              {finalCopy.heading}
            </h2>
            <p className="mt-6 text-lead text-text-secondary">{finalCopy.sentence}</p>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-green-deep">
              Eco Kernelios Presentation • 2026
            </p>
            <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-yellow-highlight" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
