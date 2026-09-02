import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import { createLead } from '../controllers/lead.controller.js'

export const leadRouter = Router()

leadRouter.post(
  '/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Забагато спроб. Будь ласка, зачекайте 15 хвилин або зателефонуйте нам.' },
  }),
  createLead,
)
