import { sendLeadEmail } from './email.service.js'
import { validateLead } from './lead-validation.service.js'

export type LeadSubmissionResult = {
  status: 201 | 400 | 502 | 503
  message: string
}

export async function submitLead(input: unknown): Promise<LeadSubmissionResult> {
  const result = validateLead(input)
  if (!result.data) return { status: 400, message: result.error || 'Некоректні дані форми.' }

  // Honeypot: bots receive a normal response, but no email is sent.
  if (result.data.website) return { status: 201, message: 'Заявку прийнято.' }

  try {
    await sendLeadEmail(result.data)
    console.info('Lead email delivered')
    return { status: 201, message: 'Заявку надіслано. Скоро ми зв’яжемося з вами.' }
  } catch (error) {
    if (error instanceof Error && error.message === 'SMTP_NOT_CONFIGURED') {
      console.warn('Lead email skipped: SMTP credentials are not configured')
      return { status: 503, message: 'Відправлення ще налаштовується. Будь ласка, зателефонуйте нам.' }
    }

    console.error('Lead email delivery failed:', error instanceof Error ? error.message : 'Unknown error')
    return { status: 502, message: 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.' }
  }
}
