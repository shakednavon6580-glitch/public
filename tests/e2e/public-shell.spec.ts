import { expect, test } from '@playwright/test'

test('renders the refreshed public shell', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('banner')).toBeVisible()
  await expect(page.getByRole('banner').getByRole('img', { name: /Kernelios header logo/i })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Compare' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Reimagine' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Experience' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Validate' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Observe' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Conclude/i })).toHaveCount(0)

  const heroVideo = page.locator('video')
  await expect(heroVideo).toBeVisible()
  await expect(heroVideo.locator('source')).toHaveAttribute('src', '/assets/kernelios-hero-drone-reveal.mp4')
  await expect(heroVideo).toHaveJSProperty('muted', true)
  await expect(heroVideo).toHaveJSProperty('loop', true)

  await page.getByRole('button', { name: 'Enlarge image: Reimagine Learning ecological vision' }).click()
  await expect(page.getByRole('dialog', { name: 'Reimagine Learning ecological vision' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Reimagine Learning ecological vision' })).toHaveCount(0)

  await page.getByRole('button', { name: /Enlarge comparison scene:/i }).click()
  await expect(page.getByRole('dialog', { name: /Campus Overview|Side Wing|Office Studio|Classroom Shift/ })).toBeVisible()
  await page.getByRole('button', { name: 'Close enlarged image', exact: true }).click()

  const footer = page.getByRole('contentinfo', { name: 'Site footer' })
  await expect(footer).toBeVisible()
  await expect(footer.getByText('Shaked Navon', { exact: true })).toBeVisible()
  await expect(footer.getByText('© All rights reserved Shaked Navon 2026')).toBeVisible()
  await expect(footer.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    /linkedin\.com\/in\/shaked-navon-801053393/
  )

  await expect(page.locator('#takeaway')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: /Final Takeaway/i })).toHaveCount(0)
})

test('auto-hides the fixed header on downward scroll, restores on upward scroll, and keeps the hero unobscured', async ({
  page,
}) => {
  await page.goto('/')

  const header = page.getByRole('banner')
  const hero = page.locator('#hero')

  await expect(header).toHaveAttribute('data-hidden', 'false')

  const initialHeaderBox = await header.boundingBox()
  const initialHeroBox = await hero.boundingBox()
  expect(initialHeaderBox).not.toBeNull()
  expect(initialHeroBox).not.toBeNull()
  expect(initialHeroBox!.y).toBeGreaterThanOrEqual(initialHeaderBox!.height - 1)

  await page.evaluate(() => window.scrollTo({ top: 220, behavior: 'instant' }))
  await expect(header).toHaveAttribute('data-hidden', 'true')

  await page.evaluate(() => window.scrollTo({ top: 120, behavior: 'instant' }))
  await expect(header).toHaveAttribute('data-hidden', 'false')

  await page.reload()
  await expect(header).toHaveAttribute('data-hidden', 'false')
})

test('keeps the Reimagine Campus Edges composition balanced on desktop and mobile', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Reimagine' }).click()

  const campusBlock = page.getByTestId('story-block-campus')
  const media = page.getByTestId('story-media-campus')
  const copy = page.getByTestId('story-copy-campus')
  const thumbnail = page.getByTestId('story-thumbnail-campus')

  await expect(campusBlock.getByRole('heading', { name: 'Reimagine Campus Edges' })).toBeVisible()

  const desktopMediaBox = await media.boundingBox()
  const desktopCopyBox = await copy.boundingBox()
  const desktopThumbnailBox = await thumbnail.boundingBox()

  expect(desktopMediaBox).not.toBeNull()
  expect(desktopCopyBox).not.toBeNull()
  expect(desktopThumbnailBox).not.toBeNull()
  expect(desktopMediaBox!.width).toBeGreaterThan(desktopThumbnailBox!.width * 2)
  expect(desktopCopyBox!.x).toBeGreaterThan(desktopMediaBox!.x + desktopMediaBox!.width - 40)
  expect(desktopThumbnailBox!.y).toBeGreaterThan(desktopMediaBox!.y + desktopMediaBox!.height * 0.7)

  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await page.getByRole('link', { name: 'Reimagine' }).click()

  const mobileMediaBox = await page.getByTestId('story-media-campus').boundingBox()
  const mobileCopyBox = await page.getByTestId('story-copy-campus').boundingBox()

  expect(mobileMediaBox).not.toBeNull()
  expect(mobileCopyBox).not.toBeNull()
  expect(mobileCopyBox!.y).toBeGreaterThan(mobileMediaBox!.y + mobileMediaBox!.height - 8)
})
