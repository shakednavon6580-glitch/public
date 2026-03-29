interface ComparisonOverlayNoteProps {
  title: string
  description: string
  className?: string
}

export function ComparisonOverlayNote({ title, description, className }: ComparisonOverlayNoteProps) {
  return (
    <div
      className={`max-w-[20rem] rounded-xl border border-[rgba(226,239,230,0.28)] bg-[rgba(17,32,24,0.72)] p-3 backdrop-blur-sm ${className ?? ''}`}
      role="note"
      aria-label={`${title} annotation`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(230,241,235,0.84)]">{title}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-[rgba(228,238,231,0.9)]">{description}</p>
    </div>
  )
}
