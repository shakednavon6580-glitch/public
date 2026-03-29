'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

interface LightboxDialogProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: React.ReactNode
}

export function LightboxDialog({
  open,
  title,
  description,
  onClose,
  children,
}: LightboxDialogProps) {
  const reduceMotion = useReducedMotion()
  const titleId = useId()
  const descriptionId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus()
    }
  }, [open])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[120]">
          <motion.button
            type="button"
            data-testid="lightbox-backdrop"
            aria-label="Close enlarged image backdrop"
            className="absolute inset-0 h-full w-full bg-[rgba(5,14,10,0.82)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
            onClick={onClose}
          />
          <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={description ? descriptionId : undefined}
              className="relative w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-[rgba(224,239,230,0.14)] bg-[rgba(8,18,13,0.94)] shadow-[0_32px_96px_rgba(0,0,0,0.35)]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 12 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[rgba(226,239,231,0.18)] bg-[rgba(255,255,255,0.08)] text-sm font-semibold tracking-[0.06em] text-white transition hover:bg-[rgba(255,255,255,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="Close enlarged image"
              >
                Close
              </button>
              <div className="border-b border-[rgba(224,239,230,0.1)] px-5 py-4 pr-20 sm:px-6">
                <p id={titleId} className="font-serif text-lg font-semibold tracking-[0.02em] text-white">
                  {title}
                </p>
                {description ? (
                  <p id={descriptionId} className="mt-1 text-sm text-[rgba(226,239,231,0.72)]">
                    {description}
                  </p>
                ) : null}
              </div>
              <div className="px-4 py-4 sm:px-6 sm:py-6">{children}</div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
