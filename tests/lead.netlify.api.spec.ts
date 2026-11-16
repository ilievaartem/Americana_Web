import { expect, test } from '@playwright/test'

async function loadHandler() {
  process.env.EMAIL_TRANSPORT = 'mock'
  delete process.env.TURNSTILE_SECRET_KEY
  const handlerModule = await import('../netlify/functions/leads')
  delete process.env.TURNSTILE_SECRET_KEY
  return handlerModule
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
      company: '',
      startedAt: String(Date.now() - 5_000),
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
    body: JSON.stringify({ studentType: 'adult', fullName: '', phone: '', startedAt: String(Date.now() - 5_000) }),
  }))
  const methodResponse = await handler(new Request('https://example.netlify.app/api/leads'))

  expect(invalidResponse.status).toBe(400)
  expect(methodResponse.status).toBe(405)
  expect(config.path).toBe('/api/leads')
})

test('Netlify function blocks non-Ukrainian phone numbers', async () => {
  const { default: handler } = await loadHandler()
  const response = await handler(new Request('https://example.netlify.app/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      studentType: 'adult',
      fullName: 'Spam Bot',
      phone: '+7 916 402 98 93',
      format: 'Групові заняття',
      startedAt: String(Date.now() - 5_000),
    }),
  }))

  expect(response.status).toBe(400)
  await expect(response.json()).resolves.toMatchObject({ message: expect.stringContaining('український номер') })
})

test('Netlify function silently ignores an automated submission', async () => {
  const { default: handler } = await loadHandler()
  const response = await handler(new Request('https://example.netlify.app/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      studentType: 'adult',
      fullName: 'Fast Bot',
      phone: '+380661112233',
      format: 'Групові заняття',
      startedAt: String(Date.now()),
    }),
  }))

  expect(response.status).toBe(201)
  await expect(response.json()).resolves.toMatchObject({ message: 'Заявку прийнято.' })
})
