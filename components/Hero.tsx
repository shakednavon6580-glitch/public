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
        className="absolute inset-0 bg-[linear-gradient(130deg,rgba(13,30,18,0.62)_8%,rgba(13,30,18,0.12)_58%,rgba(13,30,18,0.5)_100%)]"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="section-shell relative z-10 text-center text-white"
      >
        <h1 id="hero-title" className="mx-auto max-w-4xl text-display font-semibold tracking-tight">
          {heroCopy.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lead text-white/90">{heroCopy.subtitle}</p>
        <div className="mt-10 flex justify-center" aria-hidden="true">
          <span className="h-10 w-px bg-white/45" />
        </div>
      </motion.div>
    </section>
  )
}
