import React from 'react'
import { axe } from 'jest-axe'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Home from '@/app/page'
import { assetRegistry, comparisonScenes, narrativeSectionOrder } from '@/lib/narrative-content'

describe('Eco Kernelios narrative page', () => {
  it('renders sections in the expected narrative order', () => {
    const { container } = render(React.createElement(Home))
    const sectionIds = Array.from(container.querySelectorAll('section[data-section-id]')).map((section) =>
      section.getAttribute('data-section-id')
    )

    expect(sectionIds).toEqual(narrativeSectionOrder)
  })

  it('renders critical narrative copy', () => {
    render(React.createElement(Home))

    expect(
      screen.getByRole('heading', { level: 1, name: 'From inherited concrete to a living campus ecosystem.' })
    ).toBeInTheDocument()
    expect(screen.getByText('Eco Kernelios')).toBeInTheDocument()
    expect(screen.getByText(/Inspect each scene/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Environmental Contribution' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Student Testimonials' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Final Takeaway' })).not.toBeInTheDocument()
  })

  it('accounts for all audited assets and renders key media references', () => {
    const expectedAssetFiles = [
      'kernelios-hero-drone-reveal.mp4',
      'kernelios-header-logo.png',
      'lecture.png',
      'new-building-above.png',
      'new-building.png',
      'new-classrom.png',
      'new-office.png',
      'new-side-building.png',
      'original-classrom.jpeg',
      'original-office.jpeg',
      'original-side-structure.jpeg',
      'original-sturcture.jpeg',
      '.DS_Store',
    ]

    expect(assetRegistry.map((asset) => asset.filename)).toEqual(expect.arrayContaining(expectedAssetFiles))
    expect(assetRegistry.find((asset) => asset.filename === '.DS_Store')?.renderable).toBe(false)

    const { container } = render(React.createElement(Home))
    const srcValues = Array.from(container.querySelectorAll('img,source')).map((node) => node.getAttribute('src') || '')
    const heroVideo = container.querySelector('video')

    expect(srcValues).toEqual(expect.arrayContaining(['/assets/kernelios-hero-drone-reveal.mp4']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/kernelios-header-logo.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/lecture.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-classrom.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-office.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-side-building.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-building-above.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/original-classrom.jpeg']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/original-office.jpeg']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/original-side-structure.jpeg']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/original-sturcture.jpeg']))
    expect(heroVideo).not.toBeNull()
    expect((heroVideo as HTMLVideoElement).autoplay).toBe(true)
    expect((heroVideo as HTMLVideoElement).muted).toBe(true)
    expect((heroVideo as HTMLVideoElement).loop).toBe(true)
    expect(heroVideo).toHaveAttribute('playsinline')
    expect(heroVideo).toHaveAttribute('poster', '/assets/lecture.png')
  })

  it('renders the premium header navigation and footer shell', () => {
    render(React.createElement(Home))

    const header = screen.getByRole('banner')
    const nav = within(header).getByRole('navigation', { name: 'Narrative anchors' })

    expect(within(header).getByRole('img', { name: /Kernelios header logo/i })).toBeInTheDocument()
    expect(within(header).getByText('Eco Kernelios')).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Compare' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Reimagine' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Experience' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Validate' })).toBeInTheDocument()
    expect(within(nav).queryByRole('link', { name: 'Observe' })).not.toBeInTheDocument()
    expect(within(nav).queryByRole('link', { name: /Conclude/i })).not.toBeInTheDocument()

    const footer = screen.getByRole('contentinfo', { name: 'Site footer' })
    const linkedInLink = within(footer).getByRole('link', { name: 'LinkedIn' })
    expect(within(footer).getByText('Shaked Navon')).toBeInTheDocument()
    expect(within(footer).getByText('© All rights reserved Shaked Navon 2026')).toBeInTheDocument()
    expect(linkedInLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/shaked-navon-801053393/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BswuM4w09RJG8viIZhj8AUw%3D%3D'
    )
    expect(linkedInLink).toHaveAttribute('target', '_blank')
    expect(linkedInLink).toHaveAttribute('rel', 'noreferrer noopener')
  })

  it('opens and closes enlarged image previews with keyboard and backdrop support', async () => {
    const user = userEvent.setup()
    render(React.createElement(Home))

    await user.click(screen.getByRole('button', { name: 'Enlarge image: Reimagine Learning ecological vision' }))
    expect(screen.getByRole('dialog', { name: 'Reimagine Learning ecological vision' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Reimagine Learning ecological vision' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Enlarge image: Environmental contribution visual' }))
    expect(screen.getByRole('dialog', { name: 'Environmental contribution visual' })).toBeInTheDocument()

    await user.click(screen.getByTestId('lightbox-backdrop'))
    expect(screen.queryByRole('dialog', { name: 'Environmental contribution visual' })).not.toBeInTheDocument()
  })

  it('wires enlargement actions across story, impact, testimonial, and comparison sections', async () => {
    const user = userEvent.setup()
    render(React.createElement(Home))

    expect(screen.getByRole('button', { name: 'Enlarge image: Reimagine Learning ecological vision' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enlarge image: Environmental contribution visual' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enlarge image: Student testimonials contextual image' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Enlarge comparison scene: /i }))
    expect(screen.getByRole('dialog', { name: comparisonScenes[0].title })).toBeInTheDocument()
    expect(screen.getAllByText(/Original|Ecological Vision/).length).toBeGreaterThanOrEqual(2)

    await user.click(screen.getByLabelText('Close enlarged image'))
    expect(screen.queryByRole('dialog', { name: comparisonScenes[0].title })).not.toBeInTheDocument()
    expect(screen.getByRole('slider', { name: /Comparison handle/i })).toBeVisible()
  })

  it('keeps comparison and testimonial controls keyboard-accessible', async () => {
    const user = userEvent.setup()
    render(React.createElement(Home))

    const comparisonHandle = screen.getByRole('slider', { name: /Comparison handle/i })
    comparisonHandle.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText(/Drag or use arrow keys/i)).toBeInTheDocument()

    const nextTestimonial = screen.getByRole('button', { name: /Next testimonial/i })
    await user.click(nextTestimonial)
    expect(screen.getByText(/Idan Katz|Lia Romano|Maya Levin/)).toBeInTheDocument()
  })

  it('switches comparison modes and preserves at least one active scene pair', async () => {
    const user = userEvent.setup()
    render(React.createElement(Home))

    expect(comparisonScenes.length).toBeGreaterThan(0)

    const sideBySideButton = screen.getByRole('button', { name: /Side-by-Side View/i })
    await user.click(sideBySideButton)
    expect(screen.getByText(/Viewing both frames in full/i)).toBeInTheDocument()

    const sceneButton = screen.getByRole('button', {
      name: new RegExp(`Show comparison scene: ${comparisonScenes[0].title}`, 'i'),
    })
    await user.click(sceneButton)

    const comparisonSection = screen.getByRole('heading', { name: /SketchUp vs Render/i }).closest('section')
    expect(comparisonSection?.querySelectorAll('img').length).toBeGreaterThanOrEqual(2)
  })

  it('keeps the comparison module stable on a mobile viewport', async () => {
    const user = userEvent.setup()
    window.innerWidth = 390
    window.dispatchEvent(new Event('resize'))

    render(React.createElement(Home))

    await user.click(screen.getByRole('button', { name: /Side-by-Side View/i }))
    await user.click(screen.getByRole('button', { name: /Interactive Comparison/i }))

    expect(screen.getByRole('heading', { name: /SketchUp vs Render/i })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: /Comparison handle/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enlarge image: Student testimonials contextual image' })).toBeVisible()
  })

  it('renders without layout breakage when reduced motion is preferred', () => {
    const originalMatchMedia = window.matchMedia

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }))

    const { container } = render(React.createElement(Home))

    expect(container.querySelectorAll('section[data-section-id]')).toHaveLength(5)
    expect(screen.getByRole('slider', { name: /Comparison handle/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /Side-by-Side View/i })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Final Takeaway' })).not.toBeInTheDocument()

    window.matchMedia = originalMatchMedia
  })

  it(
    'passes baseline accessibility checks',
    async () => {
    const { container } = render(React.createElement(Home))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
    },
    15000
  )
})
