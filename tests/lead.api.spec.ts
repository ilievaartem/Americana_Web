import { expect, test } from '@playwright/test'

test('accepts a valid adult testing request', async ({ request }) => {
  const response = await request.post('/api/leads', {
    data: {
      studentType: 'adult',
      fullName: 'Тестова Людина',
      phone: '+38 066 111 22 33',
      format: 'Групові заняття',
      goal: 'Вільніше говорити',
      website: '',
    },
  })
  expect(response.status()).toBe(201)
  await expect(response.json()).resolves.toMatchObject({ message: expect.stringContaining('Заявку') })
})

test('validates all child contact fields', async ({ request }) => {
  const response = await request.post('/api/leads', {
    data: {
      studentType: 'child',
      childName: 'Марко Коваль',
      childAge: '10',
      contactPerson: '',
      phone: '+38 066 111 22 33',
      format: 'Заняття для дитини',
    },
  })
  expect(response.status()).toBe(400)
  await expect(response.json()).resolves.toMatchObject({ message: expect.stringContaining('ким зв’язатися') })
})
