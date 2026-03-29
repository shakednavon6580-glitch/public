'use client'

import type { PointerEvent } from 'react'

interface ComparisonHandleProps {
  position: number
  onPointerDown: (event: PointerEvent<HTMLButtonElement>) => void
  onKeyAdjust: (step: number) => void
}

export function ComparisonHandle({ position, onPointerDown, onKeyAdjust }: ComparisonHandleProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-[2px] bg-[rgba(255,255,255,0.92)] shadow-[0_0_32px_rgba(12,20,16,0.45)]"
        style={{ left: `${position}%` }}
      />
      <button
        type="button"
        role="slider"
        aria-label="Comparison handle"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)} percent original`}
        className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[rgba(208,233,216,0.95)] bg-[rgba(29,59,42,0.8)] text-[rgba(237,248,240,0.97)] shadow-[0_10px_24px_rgba(7,15,11,0.48)] transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-solar focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(20,34,27,0.9)]"
        style={{ left: `${position}%` }}
        onPointerDown={onPointerDown}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            onKeyAdjust(-2)
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            onKeyAdjust(2)
          }
          if (event.key === 'Home') {
            event.preventDefault()
            onKeyAdjust(-100)
          }
          if (event.key === 'End') {
            event.preventDefault()
            onKeyAdjust(100)
          }
        }}
      >
        <span aria-hidden="true" className="text-lg leading-none">
          ↔
        </span>
      </button>
    </>
  )
}
