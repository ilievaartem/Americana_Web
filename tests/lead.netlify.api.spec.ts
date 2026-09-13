import { expect, test } from '@playwright/test'

async function loadHandler() {
  process.env.EMAIL_TRANSPORT = 'mock'
  return import('../netlify/functions/leads')
}

test('Netlify function accepts a valid testing request', async () => {
  const { default: handler } = await loadHandler()
  const response = await handler(new Request('https://example.netlify.app/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      studentType: 'adult',
      fullName: 'Тестова Людина',
      phone: '+38 066 111 22 33',
      format: 'Групові заняття',
      goal: 'Вільніше говорити',
      website: '',
    }),
  }))

  expect(response.status).toBe(201)
  await expect(response.json()).resolves.toMatchObject({ message: expect.stringContaining('Заявку') })
})

test('Netlify function validates data and rejects unsupported methods', async () => {
  const { default: handler, config } = await loadHandler()
  const invalidResponse = await handler(new Request('https://example.netlify.app/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentType: 'adult', fullName: '', phone: '' }),
  }))
  const methodResponse = await handler(new Request('https://example.netlify.app/api/leads'))

  expect(invalidResponse.status).toBe(400)
  expect(methodResponse.status).toBe(405)
  expect(config.path).toBe('/api/leads')
})
