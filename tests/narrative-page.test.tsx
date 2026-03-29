import React from 'react'
import { axe } from 'jest-axe'
import { render, screen } from '@testing-library/react'
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

    expect(screen.getByRole('heading', { level: 1, name: 'Eco Kernelios' })).toBeInTheDocument()
    expect(screen.getByText(/Inspect each scene/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Environmental Contribution' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Student Testimonials' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Final Takeaway' })).toBeInTheDocument()
  })

  it('accounts for all audited assets and renders key media references', () => {
    const expectedAssetFiles = [
      'kernelios-video.mp4',
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

    expect(srcValues).toEqual(expect.arrayContaining(['/assets/kernelios-video.mp4']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/lecture.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-building.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-classrom.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-office.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-side-building.png']))
    expect(srcValues).toEqual(expect.arrayContaining(['/assets/new-building-above.png']))
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

    expect(container.querySelectorAll('section[data-section-id]')).toHaveLength(6)
    expect(screen.getByRole('slider', { name: /Comparison handle/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /Side-by-Side View/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Final Takeaway' })).toBeInTheDocument()

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
