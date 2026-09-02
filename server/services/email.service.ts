import nodemailer from 'nodemailer'
import { config } from '../config.js'
import type { LeadPayload } from '../types/lead.js'

const escapeHtml = (value = '') => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

function createTransport() {
  if (config.emailTransport === 'mock') return nodemailer.createTransport({ jsonTransport: true })
  if (!config.smtp.user || !config.smtp.pass || !config.smtp.from) {
    throw new Error('SMTP_NOT_CONFIGURED')
  }
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  })
}

export async function verifyEmailTransport() {
  const transport = createTransport()
  await transport.verify()
}

export async function sendLeadEmail(lead: LeadPayload) {
  const isChild = lead.studentType === 'child'
  const student = (isChild ? lead.childName : lead.fullName) || 'Новий студент'
  const rows: Array<[string, string]> = [
    ['Тестування для', isChild ? 'Дитини' : 'Дорослого'],
    [isChild ? 'Дитина' : 'Ім’я та прізвище', student],
    ...(isChild ? [['Вік дитини', lead.childAge || 'Не вказано'], ['З ким зв’язатися', lead.contactPerson || 'Не вказано']] as Array<[string, string]> : []),
    ['Контактний номер', lead.phone],
    ['Формат', lead.format],
    ['Мета / коментар', lead.goal || 'Не вказано'],
  ]
  const htmlRows = rows.map(([label, value]) =>
    `<tr><td style="padding:10px 14px;color:#5b6b82;border-bottom:1px solid #e8edf5">${escapeHtml(label)}</td><td style="padding:10px 14px;font-weight:700;color:#092b62;border-bottom:1px solid #e8edf5">${escapeHtml(value)}</td></tr>`,
  ).join('')

  const transport = createTransport()
  await transport.sendMail({
    from: {
      name: student,
      address: config.smtp.user || 'no-reply@localhost',
    },
    to: config.leadRecipient,
    subject: `${student} — заявка на тестування`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto"><h1 style="color:#092b62">Нова заявка на тестування</h1><table style="width:100%;border-collapse:collapse;background:#f9fbff;border-radius:16px;overflow:hidden">${htmlRows}</table><p style="color:#8a96a8;font-size:12px;margin-top:20px">Надіслано з americanaenglish.com</p></div>`,
  })
}
