import type { ActivityEvent } from '@/lib/types'
import { UserPlus, MessageSquare, DollarSign, StopCircle, PauseCircle, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const EVENT_ICONS = {
  debtor_added:      { icon: UserPlus,      color: 'text-primary bg-primary-light' },
  message_sent:      { icon: MessageSquare, color: 'text-ink-muted bg-page' },
  payment_received:  { icon: DollarSign,    color: 'text-success bg-success/10' },
  chase_stopped:     { icon: StopCircle,    color: 'text-danger bg-danger/10' },
  chase_paused:      { icon: PauseCircle,   color: 'text-warning bg-warning/10' },
  level_escalated:   { icon: TrendingUp,    color: 'text-danger-light bg-danger-light/10' },
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' · ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export default function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  if (events.length === 0) return (
    <div className="flex items-center justify-center h-32 text-sm text-ink-subtle">
      No activity yet. Add your first debtor to get started.
    </div>
  )

  return (
    <div className="space-y-3">
      {events.map(e => {
        const { icon: Icon, color } = EVENT_ICONS[e.type]
        return (
          <div key={e.id} className="flex items-start gap-3">
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0', color)}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink leading-snug">{e.description}</p>
              <p className="text-xs text-ink-subtle mt-0.5">{formatTime(e.timestamp)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
