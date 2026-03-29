'use client'

import Image from 'next/image'
import type { ComparisonScene } from '@/lib/narrative-content'
import { getAssetById } from '@/lib/narrative-content'

interface ComparisonSceneSelectorProps {
  scenes: ComparisonScene[]
  activeSceneId: string
  onSelectScene: (sceneId: string) => void
}

export function ComparisonSceneSelector({
  scenes,
  activeSceneId,
  onSelectScene,
}: ComparisonSceneSelectorProps) {
  return (
    <div className="w-full">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(211,227,218,0.86)]">
        Scene Selector
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {scenes.map((scene) => {
          const scenePreview = getAssetById(scene.afterAssetId)
          const isActive = scene.id === activeSceneId

          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => onSelectScene(scene.id)}
              aria-pressed={isActive}
              aria-label={`Show comparison scene: ${scene.title}`}
              className={`group min-w-[11rem] rounded-xl border p-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-solar focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(15,26,21,0.8)] ${
                isActive
                  ? 'border-[rgba(202,228,212,0.95)] bg-[rgba(73,116,89,0.55)]'
                  : 'border-[rgba(122,152,136,0.45)] bg-[rgba(15,26,21,0.6)] hover:border-[rgba(202,228,212,0.75)]'
              }`}
            >
              <div className="relative mb-2 aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={scenePreview.src}
                  alt={scenePreview.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="180px"
                />
              </div>
              <p className="text-xs font-semibold text-[rgba(233,242,237,0.96)]">{scene.title}</p>
              <p className="mt-0.5 text-[11px] text-[rgba(198,216,205,0.84)]">{scene.descriptor}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
