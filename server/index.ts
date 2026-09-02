import { app } from './app.js'
import { config } from './config.js'
import { verifyEmailTransport } from './services/email.service.js'

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Americana API listening on port ${config.port}`)
  console.log(`Email recipient: ${config.leadRecipient}`)
  const smtpConfigured = Boolean(config.smtp.user && config.smtp.pass && config.smtp.from)
  console.log(`SMTP configured: ${smtpConfigured}`)
  if (smtpConfigured && config.emailTransport === 'smtp') {
    void verifyEmailTransport()
      .then(() => console.log('SMTP connection verified'))
      .catch((error: unknown) => console.error('SMTP verification failed:', error instanceof Error ? error.message : 'Unknown error'))
  }
})
