import { submitLead } from '../../server/services/lead-submission.service'

const jsonHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return Response.json(
      { message: 'Метод не підтримується.' },
      { status: 405, headers: { ...jsonHeaders, Allow: 'POST' } },
    )
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return Response.json(
      { message: 'Потрібен формат application/json.' },
      { status: 415, headers: jsonHeaders },
    )
  }
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 12_000) {
    return Response.json(
      { message: 'Запит завеликий.' },
      { status: 413, headers: jsonHeaders },
    )
  }

  let input: unknown
  try {
    input = await request.json()
  } catch {
    return Response.json(
      { message: 'Некоректний формат даних.' },
      { status: 400, headers: jsonHeaders },
    )
  }

  const clientIp = request.headers.get('x-nf-client-connection-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const result = await submitLead(input, { clientIp: clientIp || undefined })
  return Response.json(
    { message: result.message },
    { status: result.status, headers: jsonHeaders },
  )
}

export const config = {
  path: '/api/leads',
  method: 'POST',
  rateLimit: {
    windowLimit: 3,
    windowSize: 600,
    aggregateBy: ['ip', 'domain'],
  },
}
