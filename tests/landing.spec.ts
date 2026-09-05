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
  await expect(page.getByTestId('form-error')).toContainText('номер телефону')
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
  await expect(page.getByTestId('adult-schedule')).toContainText('19:30–21:00')
  await expect(page.getByTestId('adult-prices')).toContainText('14 000 грн')
  await expect(page.getByTestId('children-prices')).toContainText('10 440 грн')
  await expect(page.getByTestId('individual-prices')).toContainText('650 грн')
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
