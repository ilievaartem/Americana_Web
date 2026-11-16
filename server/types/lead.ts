export type StudentType = 'adult' | 'child'

export interface LeadPayload {
  studentType: StudentType
  fullName?: string
  childName?: string
  childAge?: string
  contactPerson?: string
  phone: string
  format: string
  goal?: string
  website?: string
  company?: string
  startedAt?: string
  turnstileToken?: string
}
