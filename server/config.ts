import 'dotenv/config'

export const config = {
  port: Number(process.env.PORT || 3001),
  emailTransport: process.env.EMAIL_TRANSPORT || 'smtp',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
  },
  leadRecipient: process.env.LEAD_RECIPIENT || 'aartemiliev@gmail.com',
}
