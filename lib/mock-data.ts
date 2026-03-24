// lib/mock-data.ts
import type { Business, Debtor, ChaseMessage, MessageTemplate, ActivityEvent, VirtualNumber } from './types'

export const CURRENT_BUSINESS: Business = {
  id: 'b1',
  name: 'Amaka Fabrics Ltd',
  ownerName: 'Amaka Okonkwo',
  phone: '+2348012345678',
  email: 'amaka@amakafabrics.com',
  plan: 'growth',
}

export const DEBTORS: Debtor[] = [
  { id: 'd1', businessId: 'b1', name: 'Chidi Okafor', phone: '+2348098765432', whatsappNumber: '+2348098765432', amountOwed: 145000, dueDate: '2026-03-01', status: 'pending', chaseLevel: 3, intensity: 'standard', channels: ['sms', 'whatsapp', 'call'], createdAt: '2026-02-15' },
  { id: 'd2', businessId: 'b1', name: 'Ngozi Adeyemi', phone: '+2348055443322', whatsappNumber: '+2348055443322', amountOwed: 72500, dueDate: '2026-03-10', status: 'partial', chaseLevel: 2, intensity: 'gentle', channels: ['sms', 'whatsapp'], createdAt: '2026-02-20' },
  { id: 'd3', businessId: 'b1', name: 'Emeka Nwosu', phone: '+2348033221100', whatsappNumber: '+2348033221100', amountOwed: 320000, dueDate: '2026-02-20', status: 'pending', chaseLevel: 4, intensity: 'aggressive', channels: ['sms', 'whatsapp', 'call'], createdAt: '2026-02-01' },
  { id: 'd4', businessId: 'b1', name: 'Funke Balogun', phone: '+2348077889900', whatsappNumber: '+2348077889900', amountOwed: 55000, dueDate: '2026-03-15', status: 'paused', chaseLevel: 1, intensity: 'gentle', channels: ['sms'], createdAt: '2026-03-01' },
  { id: 'd5', businessId: 'b1', name: 'Tunde Fashola', phone: '+2348011223344', whatsappNumber: '+2348011223344', amountOwed: 200000, dueDate: '2026-01-30', status: 'paid', chaseLevel: 2, intensity: 'standard', channels: ['whatsapp', 'call'], createdAt: '2026-01-15' },
  { id: 'd6', businessId: 'b1', name: 'Blessing Eze', phone: '+2348099887766', whatsappNumber: '+2348099887766', amountOwed: 88000, dueDate: '2026-02-28', status: 'stopped', chaseLevel: 3, intensity: 'standard', channels: ['sms', 'whatsapp'], createdAt: '2026-02-10' },
  { id: 'd7', businessId: 'b1', name: 'Kelechi Ibe', phone: '+2348044556677', whatsappNumber: '+2348044556677', amountOwed: 175000, dueDate: '2026-03-20', status: 'pending', chaseLevel: 1, intensity: 'standard', channels: ['sms', 'whatsapp', 'call'], createdAt: '2026-03-05' },
]

export const CHASE_MESSAGES: ChaseMessage[] = [
  { id: 'm1', debtorId: 'd1', level: 1, channel: 'whatsapp', sentAt: '2026-03-01T09:00:00Z', status: 'read', preview: 'Hi Chidi, this is a friendly reminder that your payment of ₦145,000 to Amaka Fabrics...' },
  { id: 'm2', debtorId: 'd1', level: 2, channel: 'sms', sentAt: '2026-03-04T10:00:00Z', status: 'delivered', preview: 'Amaka Fabrics: Your debt of ₦145,000 is now 3 days overdue. Please pay urgently...' },
  { id: 'm3', debtorId: 'd1', level: 3, channel: 'call', sentAt: '2026-03-08T11:00:00Z', status: 'answered', preview: 'Automated call: Outstanding ₦145,000 payment is 7 days overdue...' },
  { id: 'm4', debtorId: 'd1', level: 3, channel: 'whatsapp', sentAt: '2026-03-08T14:00:00Z', status: 'sent', preview: 'URGENT: Your payment of ₦145,000 to Amaka Fabrics is now 7 days overdue. Deadline...' },
  { id: 'm5', debtorId: 'd3', level: 1, channel: 'whatsapp', sentAt: '2026-02-20T09:00:00Z', status: 'delivered', preview: 'Hi Emeka, this is a friendly reminder that your payment of ₦320,000 is due today...' },
  { id: 'm6', debtorId: 'd3', level: 2, channel: 'sms', sentAt: '2026-02-23T10:00:00Z', status: 'failed', preview: 'Amaka Fabrics: URGENT. Your debt of ₦320,000 is now 3 days overdue...' },
  { id: 'm7', debtorId: 'd3', level: 3, channel: 'call', sentAt: '2026-02-27T11:00:00Z', status: 'no-answer', preview: 'Automated call: ₦320,000 outstanding — 7 days overdue...' },
  { id: 'm8', debtorId: 'd3', level: 4, channel: 'call', sentAt: '2026-03-05T09:00:00Z', status: 'answered', preview: 'Final warning call: Legal action may be initiated within 48 hours...' },
]

export const TEMPLATES: MessageTemplate[] = [
  { id: 't1', level: 1, channel: 'whatsapp', tone: 'Friendly', body: 'Hi [Name], this is a friendly reminder that your payment of ₦[Amount] to [Business Name] was due on [Date]. Kindly make payment at your earliest convenience. Pay here: [Link]. Thank you!', isCustom: false },
  { id: 't2', level: 2, channel: 'sms', tone: 'Firm', body: '[Business Name]: Your payment of ₦[Amount] is now [X] days overdue. Please make payment immediately to avoid further action. Pay: [Link]. Reply STOP to opt out.', isCustom: false },
  { id: 't3', level: 3, channel: 'whatsapp', tone: 'Urgent', body: 'URGENT: Your debt of ₦[Amount] to [Business Name] is now [X] days overdue. This is your final reminder before further action is taken. Pay NOW: [Link]. You have 48 hours.', isCustom: false },
  { id: 't4', level: 4, channel: 'sms', tone: 'Final Warning', body: '[Business Name]: FINAL WARNING. Your debt of ₦[Amount] is [X] days overdue. Legal action will be initiated if payment is not received within 24 hours. Pay: [Link]. Reply STOP to opt out.', isCustom: false },
  { id: 't5', level: 5, channel: 'call', tone: 'Legal', body: 'Hello, this is an automated message from [Business Name]. You have an outstanding debt of ₦[Amount] that is now [X] days overdue. Legal action may be initiated if payment is not received within 48 hours. Please call [Owner Phone] or pay at [Link]. Press 1 to be connected to the business owner.', isCustom: false },
]

export const ACTIVITY_EVENTS: ActivityEvent[] = [
  { id: 'a1', type: 'level_escalated', debtorId: 'd1', debtorName: 'Chidi Okafor', description: 'Chase escalated to Level 3 — Urgent', timestamp: '2026-03-08T14:00:00Z' },
  { id: 'a2', type: 'message_sent', debtorId: 'd3', debtorName: 'Emeka Nwosu', description: 'Level 4 call sent to Emeka Nwosu', timestamp: '2026-03-05T09:00:00Z' },
  { id: 'a3', type: 'payment_received', debtorId: 'd5', debtorName: 'Tunde Fashola', description: 'Payment of ₦200,000 received from Tunde Fashola', timestamp: '2026-03-03T16:30:00Z' },
  { id: 'a4', type: 'debtor_added', debtorId: 'd7', debtorName: 'Kelechi Ibe', description: 'New debtor added: Kelechi Ibe (₦175,000)', timestamp: '2026-03-05T10:00:00Z' },
  { id: 'a5', type: 'chase_paused', debtorId: 'd4', debtorName: 'Funke Balogun', description: 'Chase paused for Funke Balogun', timestamp: '2026-03-04T11:00:00Z' },
  { id: 'a6', type: 'chase_stopped', debtorId: 'd6', debtorName: 'Blessing Eze', description: 'Chase stopped for Blessing Eze', timestamp: '2026-03-02T09:00:00Z' },
]

export const VIRTUAL_NUMBERS: VirtualNumber[] = [
  { id: 'n1', phoneNumber: '+2348100001111', provider: 'africas_talking', lastUsedAt: '2026-03-08T11:00:00Z', blockScore: 12, status: 'active' },
  { id: 'n2', phoneNumber: '+2348100002222', provider: 'africas_talking', lastUsedAt: '2026-03-07T09:00:00Z', blockScore: 34, status: 'active' },
  { id: 'n3', phoneNumber: '+2348100003333', provider: 'twilio', lastUsedAt: '2026-02-28T14:00:00Z', blockScore: 78, status: 'retired' },
  { id: 'n4', phoneNumber: '+2348100004444', provider: 'africas_talking', lastUsedAt: null, blockScore: 0, status: 'active' },
  { id: 'n5', phoneNumber: '+2348100005555', provider: 'termii', lastUsedAt: '2026-03-01T10:00:00Z', blockScore: 55, status: 'active' },
]
