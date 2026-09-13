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

  let input: unknown
  try {
    input = await request.json()
  } catch {
    return Response.json(
      { message: 'Некоректний формат даних.' },
      { status: 400, headers: jsonHeaders },
    )
  }

  const result = await submitLead(input)
  return Response.json(
    { message: result.message },
    { status: result.status, headers: jsonHeaders },
  )
}

export const config = {
  path: '/api/leads',
  method: 'POST',
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
}
