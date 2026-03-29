'use client'

import { motion } from 'framer-motion'
import { ClickableImage } from '@/components/shared/ClickableImage'
import { getAssetById, storyBlocks } from '@/lib/narrative-content'

export function StoryGallery() {
  return (
    <section
      id="story"
      data-section-id="story"
      aria-labelledby="story-title"
      className="bg-background py-20 md:py-28"
    >
      <div className="section-shell">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 id="story-title" className="text-title font-semibold tracking-tight text-text-primary">
            Reimagine
          </h2>
          <p className="mt-4 text-body text-text-secondary">
            A clear before-and-after narrative through classroom, office, and campus edge transformations.
          </p>
        </div>
        {storyBlocks.map((item, index) => {
          const beforeAsset = getAssetById(item.beforeAssetId)
          const afterAsset = getAssetById(item.afterAssetId)

          return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-16 grid items-center gap-8 last:mb-0 lg:mb-20 lg:grid-cols-2 lg:gap-14 ${
              index % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2'
            }`}
          >
            <div className="relative">
              <ClickableImage
                title={`${item.title} ecological vision`}
                description={item.sentence}
                triggerClassName="surface-card relative aspect-[16/10] overflow-hidden"
                imageClassName="object-cover"
                src={afterAsset.src}
                alt={afterAsset.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
              <ClickableImage
                title={`${item.title} original`}
                description={`Original reference for ${item.title.toLowerCase()}.`}
                triggerClassName="surface-card absolute -bottom-6 right-5 hidden aspect-[4/3] w-44 overflow-hidden md:block lg:w-48"
                imageClassName="object-cover"
                src={beforeAsset.src}
                alt={beforeAsset.alt}
                fill
                sizes="192px"
                overlay={
                  <span className="absolute left-2 top-2 rounded-full bg-[rgba(31,42,34,0.8)] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-surface">
                    Original
                  </span>
                }
              />
            </div>
            <div>
              <h3 className="text-title font-semibold tracking-tight text-text-primary">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xl text-body text-text-secondary">{item.sentence}</p>
            </div>
          </motion.div>
          )
        })}
      </div>
    </section>
  )
}
