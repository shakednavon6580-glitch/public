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
          const isCampusEdges = item.id === 'campus'
          const blockClasses = isCampusEdges
            ? `mb-16 grid items-center gap-7 last:mb-0 md:gap-8 lg:mb-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.88fr)] lg:gap-16 ${
                index % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2'
              }`
            : `mb-16 grid items-center gap-8 last:mb-0 lg:mb-20 lg:grid-cols-2 lg:gap-14 ${
                index % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2'
              }`
          const mediaFrameClasses = isCampusEdges
            ? 'mx-auto w-full max-w-[34rem] lg:max-w-[36rem] xl:max-w-[37rem]'
            : 'mx-auto w-full max-w-[40rem]'
          const mainImageClasses = isCampusEdges
            ? 'surface-card relative aspect-[5/4] overflow-hidden sm:aspect-[16/11] lg:aspect-[1.16/1]'
            : 'surface-card relative aspect-[16/10] overflow-hidden'
          const textClasses = isCampusEdges
            ? 'mx-auto w-full max-w-[34rem] lg:max-w-[30rem] lg:pl-2'
            : 'mx-auto w-full max-w-[34rem] lg:max-w-[30rem]'

          return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={blockClasses}
            data-testid={`story-block-${item.id}`}
          >
            <div className={mediaFrameClasses} data-testid={`story-media-${item.id}`}>
              <ClickableImage
                title={`${item.title} ecological vision`}
                description={item.sentence}
                triggerClassName={mainImageClasses}
                imageClassName="object-cover"
                src={afterAsset.src}
                alt={afterAsset.alt}
                fill
                sizes={isCampusEdges ? '(max-width: 768px) 100vw, (max-width: 1280px) 52vw, 36rem' : '(max-width: 1024px) 100vw, 52vw'}
              />
              <div
                className={`mt-4 flex items-start ${isCampusEdges ? 'justify-start' : 'justify-start md:pl-6 lg:pl-8'}`}
                data-testid={`story-thumbnail-wrap-${item.id}`}
              >
                <div className="w-32 sm:w-36 lg:w-40" data-testid={`story-thumbnail-${item.id}`}>
                  <ClickableImage
                    title={`${item.title} original`}
                    description={`Original reference for ${item.title.toLowerCase()}.`}
                    triggerClassName="surface-card relative aspect-[4/3] overflow-hidden shadow-[0_18px_34px_rgba(19,34,26,0.12)]"
                    imageClassName="object-cover"
                    src={beforeAsset.src}
                    alt={beforeAsset.alt}
                    fill
                    sizes="160px"
                    overlay={
                      <span className="absolute left-2 top-2 rounded-full bg-[rgba(31,42,34,0.8)] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-surface">
                        Original
                      </span>
                    }
                  />
                </div>
              </div>
            </div>
            <div className={textClasses} data-testid={`story-copy-${item.id}`}>
              <h3 className="text-title font-semibold tracking-tight text-text-primary">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[32rem] text-body leading-8 text-text-secondary">{item.sentence}</p>
            </div>
          </motion.div>
          )
        })}
      </div>
    </section>
  )
}
