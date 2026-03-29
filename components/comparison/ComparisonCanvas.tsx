'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import type { AssetRef, ComparisonMode, ComparisonScene } from '@/lib/narrative-content'
import { comparisonCopy } from '@/lib/narrative-content'
import { ComparisonHandle } from '@/components/comparison/ComparisonHandle'
import { ComparisonOverlayNote } from '@/components/comparison/ComparisonOverlayNote'
import { LightboxDialog } from '@/components/shared/LightboxDialog'

interface ComparisonCanvasProps {
  scene: ComparisonScene
  beforeAsset: AssetRef
  afterAsset: AssetRef
  mode: ComparisonMode
  sliderPosition: number
  onSliderPositionChange: (value: number) => void
}

function clampSliderPosition(value: number): number {
  return Math.max(5, Math.min(95, value))
}

export function ComparisonCanvas({
  scene,
  beforeAsset,
  afterAsset,
  mode,
  sliderPosition,
  onSliderPositionChange,
}: ComparisonCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const modeStatus = useMemo(
    () => (mode === 'interactive' ? 'Interactive comparison mode' : 'Side-by-side mode'),
    [mode]
  )

  const updatePositionFromClientX = (clientX: number) => {
    if (!canvasRef.current) return

    const bounds = canvasRef.current.getBoundingClientRect()
    const ratio = ((clientX - bounds.left) / bounds.width) * 100
    onSliderPositionChange(clampSliderPosition(ratio))
  }

  useEffect(() => {
    const stopDragging = () => setIsDragging(false)
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [])

  if (mode === 'side-by-side') {
    return (
      <>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="absolute right-4 top-4 z-10 rounded-full border border-[rgba(223,238,228,0.14)] bg-[rgba(8,18,13,0.72)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.92)] transition hover:bg-[rgba(8,18,13,0.84)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label={`Enlarge comparison scene: ${scene.title}`}
          >
            Expand scene
          </button>
          <div
            ref={canvasRef}
            className="grid min-h-[22rem] grid-cols-1 gap-2 rounded-[1.5rem] bg-[rgba(13,22,18,0.9)] p-2 md:grid-cols-2"
          >
            <div className="relative min-h-[16rem] overflow-hidden rounded-[1rem] border border-[rgba(214,232,222,0.26)]">
              <Image src={beforeAsset.src} alt={beforeAsset.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute left-3 top-3 rounded-full bg-[rgba(17,31,24,0.82)] px-3 py-1 text-xs font-semibold text-[rgba(239,248,242,0.95)]">
                {comparisonCopy.labels.before}
              </div>
            </div>
            <div className="relative min-h-[16rem] overflow-hidden rounded-[1rem] border border-[rgba(214,232,222,0.26)]">
              <Image src={afterAsset.src} alt={afterAsset.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute right-3 top-3 rounded-full bg-[rgba(24,69,45,0.86)] px-3 py-1 text-xs font-semibold text-[rgba(241,250,244,0.95)]">
                {comparisonCopy.labels.after}
              </div>
            </div>
          </div>
        </div>
        <ComparisonLightbox
          open={isExpanded}
          onClose={() => setIsExpanded(false)}
          scene={scene}
          beforeAsset={beforeAsset}
          afterAsset={afterAsset}
        />
      </>
    )
  }

  return (
    <>
      <div
        ref={canvasRef}
        className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-[rgba(214,232,222,0.34)] bg-[rgba(14,23,19,0.88)]"
      >
        <Image
          src={afterAsset.src}
          alt={afterAsset.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 74vw"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <Image
            src={beforeAsset.src}
            alt={beforeAsset.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 74vw"
          />
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-[rgba(17,31,24,0.8)] px-3 py-1 text-xs font-semibold text-[rgba(239,248,242,0.95)]">
          {comparisonCopy.labels.before}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-[rgba(24,69,45,0.88)] px-3 py-1 text-xs font-semibold text-[rgba(241,250,244,0.95)]">
          {comparisonCopy.labels.after}
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="absolute bottom-4 right-4 z-10 rounded-full border border-[rgba(223,238,228,0.14)] bg-[rgba(8,18,13,0.72)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.92)] transition hover:bg-[rgba(8,18,13,0.84)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label={`Enlarge comparison scene: ${scene.title}`}
        >
          Expand scene
        </button>
        <ComparisonOverlayNote
          title={scene.descriptor}
          description={scene.note}
          className="absolute bottom-4 left-4 hidden md:block"
        />
        <div
          className="absolute inset-0 cursor-col-resize touch-none"
          onPointerDown={(event) => {
            setIsDragging(true)
            updatePositionFromClientX(event.clientX)
          }}
          onPointerMove={(event) => {
            if (isDragging) {
              updatePositionFromClientX(event.clientX)
            }
          }}
          onPointerUp={() => setIsDragging(false)}
        />
        <ComparisonHandle
          position={sliderPosition}
          onPointerDown={(event) => {
            event.preventDefault()
            setIsDragging(true)
            updatePositionFromClientX(event.clientX)
          }}
          onKeyAdjust={(step) => onSliderPositionChange(clampSliderPosition(sliderPosition + step))}
        />
        <p className="sr-only" role="status" aria-live="polite">
          {modeStatus}. Showing {Math.round(sliderPosition)} percent original.
        </p>
      </div>
      <ComparisonLightbox
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
        scene={scene}
        beforeAsset={beforeAsset}
        afterAsset={afterAsset}
      />
    </>
  )
}

interface ComparisonLightboxProps {
  open: boolean
  onClose: () => void
  scene: ComparisonScene
  beforeAsset: AssetRef
  afterAsset: AssetRef
}

function ComparisonLightbox({
  open,
  onClose,
  scene,
  beforeAsset,
  afterAsset,
}: ComparisonLightboxProps) {
  return (
    <LightboxDialog open={open} onClose={onClose} title={scene.title} description={scene.note}>
      <div className="grid gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-[1.2rem] bg-[rgba(255,255,255,0.03)] p-2 sm:p-3">
          <img
            src={beforeAsset.src}
            alt={beforeAsset.alt}
            className="max-h-[60vh] w-full rounded-[1rem] object-contain"
          />
          <figcaption className="px-1 pt-3 text-sm font-semibold tracking-[0.04em] text-[rgba(226,239,231,0.84)]">
            {comparisonCopy.labels.before}
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-[1.2rem] bg-[rgba(255,255,255,0.03)] p-2 sm:p-3">
          <img
            src={afterAsset.src}
            alt={afterAsset.alt}
            className="max-h-[60vh] w-full rounded-[1rem] object-contain"
          />
          <figcaption className="px-1 pt-3 text-sm font-semibold tracking-[0.04em] text-[rgba(226,239,231,0.84)]">
            {comparisonCopy.labels.after}
          </figcaption>
        </figure>
      </div>
    </LightboxDialog>
  )
}
