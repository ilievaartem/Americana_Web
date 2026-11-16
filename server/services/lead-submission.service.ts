import { sendLeadEmail } from './email.service.js'
import { validateLead } from './lead-validation.service.js'
import { verifyTurnstile } from './turnstile.service.js'

export type LeadSubmissionResult = {
  status: 201 | 400 | 502 | 503
  message: string
}

function looksAutomated(input: unknown) {
  if (!input || typeof input !== 'object') return false
  const body = input as Record<string, unknown>
  if (typeof body.website === 'string' && body.website.trim()) return true
  if (typeof body.company === 'string' && body.company.trim()) return true

  const startedAt = Number(body.startedAt)
  const elapsed = Date.now() - startedAt
  return !Number.isFinite(startedAt) || elapsed < 2_000 || elapsed > 24 * 60 * 60 * 1_000
}

export async function submitLead(input: unknown, options: { clientIp?: string } = {}): Promise<LeadSubmissionResult> {
  // Return a believable success to bots without sending an email.
  if (looksAutomated(input)) {
    console.info('Lead ignored by anti-spam checks')
    return { status: 201, message: 'Заявку прийнято.' }
  }

  const result = validateLead(input)
  if (!result.data) return { status: 400, message: result.error || 'Некоректні дані форми.' }

  const humanCheck = await verifyTurnstile(result.data.turnstileToken, options.clientIp)
  if (humanCheck === 'unavailable') return { status: 503, message: 'Перевірка захисту тимчасово недоступна. Спробуйте ще раз.' }
  if (humanCheck === 'rejected') return { status: 400, message: 'Не вдалося підтвердити, що форму заповнила людина. Оновіть сторінку й спробуйте ще раз.' }

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
