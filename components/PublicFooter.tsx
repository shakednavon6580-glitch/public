'use client'

import { footerCopy } from '@/lib/narrative-content'

export function PublicFooter() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-[rgba(201,225,209,0.16)] bg-[linear-gradient(180deg,#123124_0%,#0d241a_100%)] text-white"
    >
      <div className="section-shell py-5">
        <div className="grid items-center gap-3 text-center md:grid-cols-[1fr_auto_1fr] md:text-left">
          <p className="font-serif text-[1.125rem] font-semibold tracking-[0.06em] text-[rgba(255,255,255,0.96)]">
            {footerCopy.designer}
          </p>
          <p className="text-sm font-medium tracking-[0.04em] text-[rgba(255,255,255,0.72)] md:justify-self-center">
            {footerCopy.rights}
          </p>
          <div className="md:justify-self-end">
            <a
              href={footerCopy.linkedInHref}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-button"
            >
              {footerCopy.linkedInLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
