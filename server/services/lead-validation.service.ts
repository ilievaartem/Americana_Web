import type { LeadPayload } from '../types/lead.js'

const clean = (value: unknown, maxLength = 500) =>
  typeof value === 'string' ? value.replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength) : ''

export function validateLead(input: unknown): { data?: LeadPayload; error?: string } {
  if (!input || typeof input !== 'object') return { error: 'Некоректні дані форми.' }
  const body = input as Record<string, unknown>
  const studentType = body.studentType === 'child' ? 'child' : body.studentType === 'adult' ? 'adult' : null
  if (!studentType) return { error: 'Оберіть, для кого тестування.' }

  const phone = clean(body.phone, 32)
  if (phone.replace(/\D/g, '').length < 10) return { error: 'Перевірте номер телефону.' }

  const data: LeadPayload = {
    studentType,
    phone,
    format: clean(body.format, 80) || 'Не вказано',
    goal: clean(body.goal, 1000),
    website: clean(body.website, 200),
  }

  if (studentType === 'adult') {
    data.fullName = clean(body.fullName, 120)
    if (data.fullName.length < 3) return { error: 'Вкажіть ім’я та прізвище.' }
  } else {
    data.childName = clean(body.childName, 120)
    data.childAge = clean(body.childAge, 3)
    data.contactPerson = clean(body.contactPerson, 120)
    const age = Number(data.childAge)
    if (data.childName.length < 3) return { error: 'Вкажіть ім’я та прізвище дитини.' }
    if (!Number.isInteger(age) || age < 1 || age > 17) return { error: 'Вкажіть коректний вік дитини.' }
    if (data.contactPerson.length < 2) return { error: 'Вкажіть, з ким зв’язатися.' }
  }

  return { data }
}
