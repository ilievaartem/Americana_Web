import { expect, test } from '@playwright/test'

test('renders the key landing content and navigates to the lead form', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Англійська, з якою ти')
  await page.getByTestId('hero-cta').click()
  await expect(page.getByTestId('lead-form')).toBeInViewport()
})

test('validates required lead fields', async ({ page }) => {
  await page.goto('/#contact')
  await page.getByTestId('lead-submit').click()
  await expect(page.getByTestId('form-error')).toContainText('ім’я')
  await page.getByTestId('lead-name').fill('Оля')
  await page.getByTestId('lead-submit').click()
  await expect(page.getByTestId('form-error')).toContainText('український номер')
})

test('shows the child-specific testing fields', async ({ page }) => {
  await page.goto('/#contact')
  await page.getByTestId('student-child').click()
  await expect(page.getByTestId('lead-child-name')).toBeVisible()
  await expect(page.getByTestId('lead-child-age')).toBeVisible()
  await expect(page.getByTestId('lead-contact-person')).toBeVisible()
  await expect(page.getByText('Контактний номер батьків')).toBeVisible()
})

test('shows schedules and all main price options', async ({ page }) => {
  await page.goto('/#schedule')
  await expect(page.getByTestId('children-schedule')).toContainText('17:30–19:00')
  await expect(page.getByTestId('children-schedule')).toContainText('Підлітки C1')
  await expect(page.getByTestId('children-schedule')).toContainText('Офлайн')
  await expect(page.getByTestId('children-schedule').getByText('Онлайн', { exact: true }).first()).toHaveCSS('background-color', 'rgb(28, 93, 206)')
  await page.getByTestId('schedule-adult-tab').click()
  await expect(page.getByTestId('adult-schedule')).toContainText('19:30–21:00')
  await expect(page.getByTestId('adult-schedule')).toContainText('Група відповідного рівня')
  await expect(page.getByTestId('adult-prices')).toContainText('14 000 грн')
  await expect(page.getByTestId('children-prices')).toContainText('10 440 грн')
  await expect(page.getByTestId('individual-prices')).toContainText('650 грн')
})

test('highlights the popular format and lets schedule slots preselect the testing audience', async ({ page }) => {
  await page.goto('/#formats')
  await expect(page.getByTestId('popular-program')).toContainText('Найчастіше обирають')
  await page.goto('/#schedule')
  await page.getByTestId('schedule-slot-child').first().click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.getByTestId('student-child')).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByTestId('lead-format')).toHaveValue('Заняття для дитини')
})

test('renders four identical marquee groups for a seamless loop on wide screens', async ({ page }) => {
  await page.goto('/')
  const groups = page.getByTestId('trust-marquee-group')
  await expect(groups).toHaveCount(4)
  const firstGroupText = await groups.nth(0).innerText()
  for (let index = 1; index < 4; index += 1) expect(await groups.nth(index).innerText()).toBe(firstGroupText)
})

test('aligns price actions and reveals the schedule action on hover', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop hover behavior')
  await page.goto('/#prices')
  await page.waitForTimeout(600)
  const adultAction = page.getByTestId('adult-prices').getByRole('link', { name: /Записатись на тестування/ })
  const childAction = page.getByTestId('children-prices').getByRole('link', { name: /Записатись на тестування/ })
  const adultBox = await adultAction.boundingBox()
  const childBox = await childAction.boundingBox()
  expect(adultBox).not.toBeNull()
  expect(childBox).not.toBeNull()
  expect(Math.abs(adultBox!.y - childBox!.y)).toBeLessThanOrEqual(1)
  for (const [adultId, childId] of [['adult-price-offer', 'child-price-offer'], ['adult-price-note', 'child-price-note']]) {
    const adultBlock = await page.getByTestId(adultId).boundingBox()
    const childBlock = await page.getByTestId(childId).boundingBox()
    expect(adultBlock).not.toBeNull()
    expect(childBlock).not.toBeNull()
    expect(Math.abs(adultBlock!.y - childBlock!.y)).toBeLessThanOrEqual(1)
    expect(Math.abs(adultBlock!.height - childBlock!.height)).toBeLessThanOrEqual(1)
  }

  await page.goto('/#schedule')
  await page.getByTestId('schedule-adult-tab').click()
  const slot = page.getByTestId('schedule-slot-adult').first()
  const action = slot.getByText('Записатися', { exact: true })
  await expect(action).toHaveCSS('opacity', '0')
  await slot.hover()
  await expect(action).toHaveCSS('opacity', '1')
  const timeBox = await slot.getByText('11:00–12:30', { exact: true }).boundingBox()
  const actionBox = await action.boundingBox()
  expect(timeBox).not.toBeNull()
  expect(actionBox).not.toBeNull()
  expect(timeBox!.x + timeBox!.width + 12).toBeLessThan(actionBox!.x)
})

test('supports keyboard navigation, descriptive images, and accessible red contrast', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByTestId('skip-link')).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()

  const imageAlternatives = await page.locator('img').evaluateAll(images => images.map(image => image.getAttribute('alt')?.trim()))
  expect(imageAlternatives.length).toBeGreaterThan(0)
  expect(imageAlternatives.every(Boolean)).toBe(true)

  await page.goto('/#schedule')
  await page.getByTestId('schedule-children-tab').focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByTestId('schedule-adult-tab')).toBeFocused()
  await expect(page.getByTestId('schedule-adult-tab')).toHaveAttribute('aria-selected', 'true')

  await page.goto('/#contact')
  const contrast = await page.locator('#contact').evaluate(section => {
    const parse = (value: string) => value.match(/[\d.]+/g)!.slice(0, 3).map(Number)
    const luminance = (rgb: number[]) => {
      const channels = rgb.map(channel => {
        const value = channel / 255
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    const foreground = luminance(parse(getComputedStyle(section.querySelector('h2')!).color))
    const background = luminance(parse(getComputedStyle(section).backgroundColor))
    return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05)
  })
  expect(contrast).toBeGreaterThanOrEqual(4.5)
})

test('opens FAQ answers', async ({ page }) => {
  await page.goto('/#faq')
  await page.getByTestId('faq-1').click()
  await expect(page.getByTestId('faq-answer-1')).toBeVisible()
  await expect(page.getByTestId('faq-answer-1')).toContainText('онлайн')
})

test('mobile navigation is accessible', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Mobile-only behavior')
  await page.goto('/')
  await page.getByTestId('mobile-menu-button').click()
  await expect(page.getByTestId('mobile-menu')).toBeVisible()
  await expect(page.getByTestId('mobile-menu-button')).toHaveAttribute('aria-expanded', 'true')
})

test('opens the public agreement from the footer', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('public-agreement-link').click()
  await expect(page).toHaveURL(/\/public-agreement$/)
  await expect(page.getByTestId('agreement-title')).toHaveText('Публічний договір')
  await expect(page.getByTestId('agreement-document')).toContainText('ТОВ «АМЕРИКАНА»')
  await expect(page.getByTestId('agreement-document')).toContainText('ЄДРПОУ 39374295')
})
