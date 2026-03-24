import { notFound } from 'next/navigation'
import { Phone, MessageSquare, Smartphone, CheckCircle, PauseCircle, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
  sent: 'text-ink-subtle',
  delivered: 'text-primary',
  read: 'text-success',
  answered: 'text-success',
  'no-answer': 'text-warning',
  failed: 'text-danger',
}

function MessageRow({ msg }: { msg: ChaseMessage }) {
  const Icon = CHANNEL_ICON[msg.channel]
  return (
    <div className="flex items-start gap-4 py-4 border-b border-stroke last:border-0">
      <div className="w-8 h-8 rounded-lg bg-page flex items-center justify-center shrink-0 mt-0.5">
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
            <Button size="sm" variant="outline" className="border-stroke text-ink-muted gap-1.5">
              <PauseCircle className="w-3.5 h-3.5" /> Pause
            </Button>
            <Button size="sm" variant="outline" className="border-stroke text-danger gap-1.5">
              <StopCircle className="w-3.5 h-3.5" /> Stop Chase
            </Button>
            <Button size="sm" className="bg-success hover:bg-success/90 text-white gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Mark Paid
            </Button>
          </div>
        }
      />

      <div className="p-8 grid grid-cols-[1fr_280px] gap-6">
        {/* Main column */}
        <div className="space-y-6">
          {/* Chase Progress */}
          <Card className="border-stroke shadow-sm">
            <CardHeader className="pb-3 pt-5 px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink">Chase Progress</h2>
                <ChaseLevelBadge level={debtor.chaseLevel} />
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <ChaseTimeline
                currentLevel={debtor.chaseLevel}
                nextAction="Level 4 call scheduled for tomorrow at 9:00 AM"
              />
            </CardContent>
          </Card>

          {/* Message Log */}
          <Card className="border-stroke shadow-sm">
            <CardHeader className="pb-3 pt-5 px-6">
              <h2 className="text-sm font-semibold text-ink">Message Log</h2>
            </CardHeader>
            <CardContent className="px-6 pb-2">
              {messages.length === 0 ? (
                <p className="text-sm text-ink-subtle py-6 text-center">No messages sent yet. Chase starts on the due date.</p>
              ) : (
                messages.map(m => <MessageRow key={m.id} msg={m} />)
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="border-stroke shadow-sm">
            <CardHeader className="pb-3 pt-5 px-5">
              <h2 className="text-sm font-semibold text-ink">Contact Info</h2>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              {[
                ['Phone', debtor.phone],
                ['WhatsApp', debtor.whatsappNumber],
                ['Amount Owed', formatNaira(debtor.amountOwed)],
                ['Due Date', new Date(debtor.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })],
                ['Overdue', daysOverdue(debtor.dueDate)],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-ink-subtle font-medium">{label}</p>
                  <p className="text-sm text-ink mt-0.5">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs text-ink-subtle font-medium mb-1.5">Intensity</p>
                <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full font-medium capitalize">{debtor.intensity}</span>
              </div>
              <div>
                <p className="text-xs text-ink-subtle font-medium mb-1.5">Status</p>
                <DebtorStatusBadge status={debtor.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
