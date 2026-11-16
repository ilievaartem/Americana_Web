import type { LeadPayload } from '../types/lead.js'
import { isSupportedCountry, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'

const clean = (value: unknown, maxLength = 500) =>
  typeof value === 'string' ? value.replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength) : ''

export function validateLead(input: unknown): { data?: LeadPayload; error?: string } {
  if (!input || typeof input !== 'object') return { error: 'Некоректні дані форми.' }
  const body = input as Record<string, unknown>
  const studentType = body.studentType === 'child' ? 'child' : body.studentType === 'adult' ? 'adult' : null
  if (!studentType) return { error: 'Оберіть, для кого тестування.' }

  const rawPhoneCountry = clean(body.phoneCountry, 2).toUpperCase()
  if (!isSupportedCountry(rawPhoneCountry) || rawPhoneCountry === 'RU') {
    return { error: rawPhoneCountry === 'RU' ? 'Номери Росії не підтримуються.' : 'Оберіть країну номера телефону.' }
  }
  const phoneCountry = rawPhoneCountry as CountryCode
  const rawPhone = clean(body.phone, 32)
  const parsedPhone = rawPhone.startsWith('+')
    ? parsePhoneNumberFromString(rawPhone)
    : parsePhoneNumberFromString(rawPhone, phoneCountry)
  if (parsedPhone?.country === 'RU') return { error: 'Номери Росії не підтримуються.' }
  if (!parsedPhone?.isValid() || parsedPhone.country !== phoneCountry) {
    return { error: 'Вкажіть коректний номер для вибраної країни.' }
  }

  const data: LeadPayload = {
    studentType,
    phoneCountry,
    phone: parsedPhone.number,
    format: clean(body.format, 80) || 'Не вказано',
    goal: clean(body.goal, 1000),
    website: clean(body.website, 200),
    company: clean(body.company, 200),
    startedAt: clean(body.startedAt, 32),
    turnstileToken: clean(body.turnstileToken, 2048),
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
