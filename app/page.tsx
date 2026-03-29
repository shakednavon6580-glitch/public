import { Hero } from '@/components/Hero'
import { Comparison } from '@/components/Comparison'
import { StoryGallery } from '@/components/StoryGallery'
import { EnvironmentalImpact } from '@/components/EnvironmentalImpact'
import { Testimonials } from '@/components/Testimonials'
import { NarrativeHeader } from '@/components/NarrativeHeader'
import { PublicFooter } from '@/components/PublicFooter'

export default function Home() {
  return (
    <>
      <a href="#hero" className="skip-link">
        Skip to narrative content
      </a>
      <NarrativeHeader />
      <main className="min-h-screen bg-background">
        <Hero />
        <Comparison />
        <StoryGallery />
        <EnvironmentalImpact />
        <Testimonials />
      </main>
      <PublicFooter />
    </>
  )
}
