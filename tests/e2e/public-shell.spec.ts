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
  await page.getByLabel('Close enlarged image').click()

  const footer = page.getByRole('contentinfo', { name: 'Site footer' })
  await expect(footer).toBeVisible()
  await expect(footer.getByText('Shaked Navon')).toBeVisible()
  await expect(footer.getByText('© All rights reserved Shaked Navon 2026')).toBeVisible()
  await expect(footer.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    /linkedin\.com\/in\/shaked-navon-801053393/
  )

  await expect(page.locator('#takeaway')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: /Final Takeaway/i })).toHaveCount(0)
})
