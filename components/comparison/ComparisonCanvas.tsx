'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import type { AssetRef, ComparisonMode, ComparisonScene } from '@/lib/narrative-content'
import { comparisonCopy } from '@/lib/narrative-content'
import { ComparisonHandle } from '@/components/comparison/ComparisonHandle'
import { ComparisonOverlayNote } from '@/components/comparison/ComparisonOverlayNote'

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
    )
  }

  return (
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
  )
}
