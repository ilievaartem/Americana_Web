import type { Request, Response } from 'express'
import { submitLead } from '../services/lead-submission.service.js'

export async function createLead(request: Request, response: Response) {
  const result = await submitLead(request.body)
  return response.status(result.status).json({ message: result.message })
}
