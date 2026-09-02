import express from 'express'
import helmet from 'helmet'
import { leadRouter } from './routes/lead.routes.js'

export const app = express()

app.set('trust proxy', 1)
app.use(helmet())
app.use(express.json({ limit: '32kb' }))
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))
app.use('/api/leads', leadRouter)
app.use('/api', (_request, response) => response.status(404).json({ message: 'Not found' }))
