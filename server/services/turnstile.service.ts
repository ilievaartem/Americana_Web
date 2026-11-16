type TurnstileResponse = {
  success?: boolean
  action?: string
}

export async function verifyTurnstile(token = '', remoteIp = ''): Promise<'accepted' | 'rejected' | 'unavailable'> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim()
  if (!secret) return 'accepted'
  if (!token) return 'rejected'

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, ...(remoteIp ? { remoteip: remoteIp } : {}) }),
    })
    if (!response.ok) return 'unavailable'
    const result = await response.json() as TurnstileResponse
    return result.success && (!result.action || result.action === 'lead_form') ? 'accepted' : 'rejected'
  } catch (error) {
    console.error('Turnstile verification failed:', error instanceof Error ? error.message : 'Unknown error')
    return 'unavailable'
  }
}
