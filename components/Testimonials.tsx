'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getAssetById, testimonialCopy, testimonials } from '@/lib/narrative-content'

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const lectureVisual = getAssetById('lecture')
  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex])

  const move = (step: number) => {
    setActiveIndex((prev) => {
      const next = prev + step
      if (next < 0) return testimonials.length - 1
      if (next >= testimonials.length) return 0
      return next
    })
  }

  return (
    <section
      id="testimonials"
      data-section-id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-background py-20 md:py-28"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 id="testimonials-title" className="text-title font-semibold tracking-tight text-text-primary">
            {testimonialCopy.heading}
          </h2>
          <p className="mt-4 text-body text-text-secondary">{testimonialCopy.intro}</p>
        </motion.div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr,1fr]">
          <div className="surface-card relative aspect-[4/3] overflow-hidden">
            <Image
              src={lectureVisual.src}
              alt={lectureVisual.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/45 to-transparent" />
          </div>
          <article
            className="surface-card p-6 md:p-8"
            aria-roledescription="carousel"
            aria-label="Student testimonial carousel"
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') move(-1)
              if (event.key === 'ArrowRight') move(1)
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-deep">Experience</p>
            <blockquote className="mt-4 text-lead font-medium text-text-primary">
              “{activeTestimonial.quote}”
            </blockquote>
            <footer className="mt-6">
              <p className="font-semibold text-text-primary">{activeTestimonial.author}</p>
              <p className="mt-1 text-sm text-text-secondary">{activeTestimonial.role}</p>
            </footer>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => move(-1)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-green-secondary hover:text-green-deep"
                aria-label="Previous testimonial"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-green-secondary hover:text-green-deep"
                aria-label="Next testimonial"
              >
                Next
              </button>
              <div className="ml-auto flex items-center gap-2" aria-label="Testimonial position">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      activeIndex === index ? 'bg-green-deep' : 'bg-[rgba(127,180,137,0.45)]'
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={activeIndex === index}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
