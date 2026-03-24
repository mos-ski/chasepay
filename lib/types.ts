// lib/types.ts

export interface Business {
  id: string
  name: string
  ownerName: string
  phone: string
  email: string
  plan: 'starter' | 'growth' | 'pro'
}

export interface Debtor {
  id: string
  businessId: string
  name: string
  phone: string
  whatsappNumber: string
  amountOwed: number
  dueDate: string        // ISO date string
  status: 'pending' | 'partial' | 'paid' | 'stopped' | 'paused'
  chaseLevel: 1 | 2 | 3 | 4 | 5
  intensity: 'gentle' | 'standard' | 'aggressive'
  channels: ('sms' | 'whatsapp' | 'call')[]
  createdAt: string
}

type ChaseMessageBase = {
  id: string
  debtorId: string
  level: 1 | 2 | 3 | 4 | 5
  sentAt: string
  preview: string
}
export type SmsMessage  = ChaseMessageBase & { channel: 'sms' | 'whatsapp'; status: 'sent' | 'delivered' | 'read' | 'failed' }
export type CallMessage = ChaseMessageBase & { channel: 'call'; status: 'answered' | 'no-answer' | 'failed' }
export type ChaseMessage = SmsMessage | CallMessage

export interface MessageTemplate {
  id: string
  level: 1 | 2 | 3 | 4 | 5
  channel: 'sms' | 'whatsapp' | 'call'
  tone: string
  body: string
  isCustom: boolean
}

export interface ActivityEvent {
  id: string
  type: 'debtor_added' | 'message_sent' | 'payment_received' | 'chase_stopped' | 'chase_paused' | 'level_escalated'
  debtorId: string
  debtorName: string
  description: string
  timestamp: string
}

export interface VirtualNumber {
  id: string
  phoneNumber: string
  provider: 'africas_talking' | 'twilio' | 'termii'
  lastUsedAt: string | null
  blockScore: number
  status: 'active' | 'retired'
}
