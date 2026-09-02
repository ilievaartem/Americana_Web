import type { Request, Response } from 'express'
import { sendLeadEmail } from '../services/email.service.js'
import { validateLead } from '../services/lead-validation.service.js'

export async function createLead(request: Request, response: Response) {
  const result = validateLead(request.body)
  if (!result.data) return response.status(400).json({ message: result.error })

  // Honeypot: bots receive a normal response, but no email is sent.
  if (result.data.website) return response.status(201).json({ message: 'Заявку прийнято.' })

  try {
    await sendLeadEmail(result.data)
    console.info('Lead email delivered')
    return response.status(201).json({ message: 'Заявку надіслано. Скоро ми зв’яжемося з вами.' })
  } catch (error) {
    if (error instanceof Error && error.message === 'SMTP_NOT_CONFIGURED') {
      console.warn('Lead email skipped: SMTP credentials are not configured')
      return response.status(503).json({ message: 'Відправлення ще налаштовується. Будь ласка, зателефонуйте нам.' })
    }
    console.error('Lead email delivery failed:', error instanceof Error ? error.message : 'Unknown error')
    return response.status(502).json({ message: 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.' })
  }
}
