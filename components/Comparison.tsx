'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ComparisonCanvas } from '@/components/comparison/ComparisonCanvas'
import { ComparisonModeToggle } from '@/components/comparison/ComparisonModeToggle'
import { ComparisonSceneSelector } from '@/components/comparison/ComparisonSceneSelector'
import {
  comparisonCopy,
  comparisonScenes,
  getAssetById,
  type ComparisonMode,
} from '@/lib/narrative-content'

const DEFAULT_SCENE_ID = comparisonScenes[0]?.id ?? ''

export function Comparison() {
  const [mode, setMode] = useState<ComparisonMode>('interactive')
  const [activeSceneId, setActiveSceneId] = useState(DEFAULT_SCENE_ID)
  const [sliderPosition, setSliderPosition] = useState(52)

  const activeScene = useMemo(
    () => comparisonScenes.find((scene) => scene.id === activeSceneId) ?? comparisonScenes[0],
    [activeSceneId]
  )

  const beforeAsset = getAssetById(activeScene.beforeAssetId)
  const afterAsset = getAssetById(activeScene.afterAssetId)

  return (
    <section
      id="comparison"
      data-section-id="comparison"
      aria-labelledby="comparison-title"
      className="bg-surface py-20 md:py-28"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 id="comparison-title" className="text-title font-semibold tracking-tight text-text-primary">
            {comparisonCopy.heading}
          </h2>
          <p className="mt-4 text-body text-text-secondary">{comparisonCopy.framing}</p>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.2rem] border border-[rgba(86,117,100,0.5)] bg-[linear-gradient(155deg,rgba(28,46,36,0.95)_0%,rgba(18,31,24,0.96)_48%,rgba(13,23,18,0.96)_100%)] p-4 shadow-[0_28px_62px_rgba(16,28,22,0.3)] sm:p-5 md:p-7">
            <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <ComparisonSceneSelector
                scenes={comparisonScenes}
                activeSceneId={activeScene.id}
                onSelectScene={(sceneId) => {
                  setActiveSceneId(sceneId)
                  setSliderPosition(52)
                }}
              />
              <ComparisonModeToggle mode={mode} onModeChange={setMode} />
            </div>

            <ComparisonCanvas
              scene={activeScene}
              beforeAsset={beforeAsset}
              afterAsset={afterAsset}
              mode={mode}
              sliderPosition={sliderPosition}
              onSliderPositionChange={setSliderPosition}
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[rgba(210,229,217,0.9)]">
                {activeScene.title} • {activeScene.descriptor}
              </p>
              {mode === 'interactive' ? (
                <div className="flex items-center gap-2 text-[11px] text-[rgba(208,226,215,0.85)]">
                  <span>Drag or use arrow keys</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-solar" aria-hidden="true" />
                  <span>{Math.round(sliderPosition)}%</span>
                </div>
              ) : (
                <span className="text-[11px] text-[rgba(208,226,215,0.85)]">Viewing both frames in full</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
