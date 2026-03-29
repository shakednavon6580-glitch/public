'use client'

import { motion } from 'framer-motion'
import { getAssetById, heroCopy } from '@/lib/narrative-content'

export function Hero() {
  const heroVideo = getAssetById('kernelios-video')
  const heroPoster = getAssetById('lecture')

  return (
    <section
      id="hero"
      data-section-id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster.src}
        aria-label={heroVideo.alt}
      >
        <source src={heroVideo.src} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,13,0.54)_0%,rgba(7,18,13,0.22)_20%,rgba(7,18,13,0.42)_56%,rgba(7,18,13,0.74)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(210,240,218,0.16),transparent_34%),linear-gradient(110deg,rgba(239,211,102,0.14),transparent_24%)]"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="section-shell relative z-10 flex min-h-screen items-center py-28 pt-36 text-white md:pt-40"
      >
        <div className="mx-auto w-full max-w-5xl text-center md:mx-0 md:text-left">
          <p className="editorial-kicker text-[rgba(255,255,255,0.76)]">{heroCopy.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-6 max-w-5xl font-serif text-display font-semibold tracking-tight text-white"
          >
            {heroCopy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lead text-[rgba(255,255,255,0.84)] md:text-[1.18rem]">
            {heroCopy.subtitle}
          </p>
          <div className="mt-10 flex justify-center md:justify-start" aria-hidden="true">
            <span className="h-px w-24 bg-[linear-gradient(90deg,rgba(242,201,76,0.95),rgba(242,201,76,0))]" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
