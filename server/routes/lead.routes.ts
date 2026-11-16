import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import { createLead } from '../controllers/lead.controller.js'

export const leadRouter = Router()

leadRouter.post(
  '/',
  rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 3,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Забагато спроб. Будь ласка, зачекайте 10 хвилин або зателефонуйте нам.' },
  }),
  createLead,
)
