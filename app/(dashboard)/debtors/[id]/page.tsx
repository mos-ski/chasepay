import { notFound } from 'next/navigation'
import { Phone, MessageSquare, Smartphone, CheckCircle, PauseCircle, StopCircle } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import ChaseTimeline from '@/components/debtors/ChaseTimeline'
import DebtorStatusBadge from '@/components/debtors/DebtorStatusBadge'
import ChaseLevelBadge from '@/components/debtors/ChaseLevelBadge'
import { DEBTORS, CHASE_MESSAGES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { ChaseMessage } from '@/lib/types'

function formatNaira(n: number) { return '₦' + n.toLocaleString('en-NG') }

function daysOverdue(dueDate: string) {
  const days = Math.floor((Date.now() - new Date(dueDate).getTime()) / 86400000)
  return days > 0 ? `${days} days overdue` : days === 0 ? 'Due today' : `Due in ${-days} days`
}

function formatDateTime(s: string) {
  return new Date(s).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const CHANNEL_ICON = { sms: MessageSquare, whatsapp: Smartphone, call: Phone }

const STATUS_STYLES: Record<string, string> = {
  sent:      'text-ink-subtle',
  delivered: 'text-blue',
  read:      'text-success',
  answered:  'text-success',
  'no-answer': 'text-warning',
  failed:    'text-danger',
}

function MessageRow({ msg }: { msg: ChaseMessage }) {
  const Icon = CHANNEL_ICON[msg.channel]
  return (
    <div className="flex items-start gap-4 py-4 border-b border-stroke/50 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-surface2 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-ink-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-ink leading-snug truncate">{msg.preview}</p>
        <p className="text-xs text-ink-subtle mt-1">{formatDateTime(msg.sentAt)} · Level {msg.level}</p>
      </div>
      <span className={cn('text-xs font-medium capitalize shrink-0', STATUS_STYLES[msg.status] ?? 'text-ink-subtle')}>
        {msg.status.replace('-', ' ')}
      </span>
    </div>
  )
}

export default function DebtorDetailPage({ params }: { params: { id: string } }) {
  const debtor = DEBTORS.find(d => d.id === params.id)
  if (!debtor) notFound()

  const messages = CHASE_MESSAGES.filter(m => m.debtorId === debtor.id)

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title={debtor.name}
        backHref="/debtors"
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stroke text-ink-muted hover:text-ink hover:bg-surface2 text-sm transition-colors">
              <PauseCircle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Pause</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-danger/30 text-danger hover:bg-danger/10 text-sm transition-colors">
              <StopCircle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Stop</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success hover:bg-emerald-500 text-white text-sm transition-colors">
              <CheckCircle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Mark Paid</span>
            </button>
          </div>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-5">
        {/* Main column */}
        <div className="space-y-5">
          {/* Chase Progress */}
          <div className="bg-surface border border-stroke rounded-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stroke">
              <h2 className="font-syne font-bold text-[15px] text-ink">Chase Progress</h2>
              <ChaseLevelBadge level={debtor.chaseLevel} />
            </div>
            <div className="px-5 py-5">
              <ChaseTimeline
                currentLevel={debtor.chaseLevel}
                nextAction="Level 4 call scheduled for tomorrow at 9:00 AM"
              />
            </div>
          </div>

          {/* Message Log */}
          <div className="bg-surface border border-stroke rounded-xl">
            <div className="px-5 py-4 border-b border-stroke">
              <h2 className="font-syne font-bold text-[15px] text-ink">Message Log</h2>
            </div>
            <div className="px-5">
              {messages.length === 0 ? (
                <p className="text-sm text-ink-subtle py-8 text-center">No messages sent yet. Chase starts on the due date.</p>
              ) : (
                messages.map(m => <MessageRow key={m.id} msg={m} />)
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-surface border border-stroke rounded-xl">
            <div className="px-5 py-4 border-b border-stroke">
              <h2 className="font-syne font-bold text-[15px] text-ink">Contact Info</h2>
            </div>
            <div className="px-5 py-4 space-y-4">
              {/* Amount highlight */}
              <div className="text-center py-3 bg-surface2 rounded-lg">
                <p className="text-[11px] text-ink-subtle uppercase tracking-[1px] mb-1">Amount Owed</p>
                <p className="font-syne font-bold text-[28px] text-primary">{formatNaira(debtor.amountOwed)}</p>
              </div>
              {[
                ['Phone', debtor.phone],
                ['WhatsApp', debtor.whatsappNumber],
                ['Due Date', new Date(debtor.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })],
                ['Overdue', daysOverdue(debtor.dueDate)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <p className="text-[12px] text-ink-subtle">{label}</p>
                  <p className="text-sm text-ink font-medium">{value}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1 border-t border-stroke">
                <p className="text-[12px] text-ink-subtle">Intensity</p>
                <span className="text-xs bg-primary/[0.12] text-primary px-2 py-0.5 rounded-full font-medium capitalize">{debtor.intensity}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-ink-subtle">Status</p>
                <DebtorStatusBadge status={debtor.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
