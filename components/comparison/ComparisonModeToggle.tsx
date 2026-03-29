'use client'

import type { ComparisonMode } from '@/lib/narrative-content'

interface ComparisonModeToggleProps {
  mode: ComparisonMode
  onModeChange: (nextMode: ComparisonMode) => void
}

const modeOptions: Array<{ mode: ComparisonMode; label: string }> = [
  { mode: 'interactive', label: 'Interactive Comparison' },
  { mode: 'side-by-side', label: 'Side-by-Side View' },
]

export function ComparisonModeToggle({ mode, onModeChange }: ComparisonModeToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-[rgba(151,181,160,0.45)] bg-[rgba(18,30,24,0.72)] p-1">
      {modeOptions.map((option) => (
        <button
          key={option.mode}
          type="button"
          onClick={() => onModeChange(option.mode)}
          aria-pressed={mode === option.mode}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-solar focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(18,30,24,0.72)] sm:px-4 ${
            mode === option.mode
              ? 'bg-[rgba(84,139,98,0.9)] text-surface'
              : 'text-[rgba(230,239,233,0.88)] hover:bg-[rgba(84,139,98,0.22)]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
