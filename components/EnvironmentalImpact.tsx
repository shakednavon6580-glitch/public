'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getAssetById, impactCopy, impactPoints } from '@/lib/narrative-content'

export function EnvironmentalImpact() {
  const impactVisual = getAssetById('new-building-above')

  return (
    <section
      id="impact"
      data-section-id="impact"
      aria-labelledby="impact-title"
      className="bg-surface py-20 md:py-28"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 id="impact-title" className="text-title font-semibold tracking-tight text-text-primary">
            {impactCopy.heading}
          </h2>
          <p className="mt-4 text-body text-text-secondary">{impactCopy.intro}</p>
        </motion.div>
        <div className="grid gap-8 lg:grid-cols-[1.25fr,1fr]">
          <div className="surface-card relative aspect-[4/3] overflow-hidden">
            <Image
              src={impactVisual.src}
              alt={impactVisual.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-text-primary/70 to-transparent p-5 text-sm text-surface">
              Atmospheric overview from the ecological massing study.
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {impactPoints.map((impact, index) => (
              <motion.article
                key={impact.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="surface-card p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-deep">{impact.title}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">{impact.value}</p>
                <p className="mt-2 text-sm text-text-secondary">{impact.sentence}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
