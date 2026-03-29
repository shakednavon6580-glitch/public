'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { LightboxDialog } from '@/components/shared/LightboxDialog'

interface ClickableImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string
  alt: string
  title: string
  description?: string
  triggerClassName?: string
  imageClassName?: string
  overlay?: React.ReactNode
  showHint?: boolean
}

export function ClickableImage({
  src,
  alt,
  title,
  description,
  triggerClassName = '',
  imageClassName = '',
  overlay,
  showHint = true,
  ...imageProps
}: ClickableImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background ${triggerClassName}`}
        aria-label={`Enlarge image: ${title}`}
      >
        <Image
          {...imageProps}
          src={src}
          alt={alt}
          className={`${imageClassName} transition duration-300 group-hover:scale-[1.015]`}
        />
        {overlay}
        {showHint ? (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-[rgba(223,238,228,0.14)] bg-[rgba(8,18,13,0.62)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.92)] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
            Enlarge
          </span>
        ) : null}
      </button>

      <LightboxDialog open={open} onClose={() => setOpen(false)} title={title} description={description ?? alt}>
        <div className="flex max-h-[78vh] items-center justify-center overflow-hidden rounded-[1.25rem] bg-[rgba(255,255,255,0.03)] p-2 sm:p-3">
          <img
            src={src}
            alt={alt}
            className="max-h-[72vh] w-auto max-w-full rounded-[1rem] object-contain"
          />
        </div>
      </LightboxDialog>
    </>
  )
}
