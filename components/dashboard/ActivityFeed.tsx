import type { ActivityEvent } from '@/lib/types'

const EVENT_DOT: Record<ActivityEvent['type'], string> = {
  debtor_added:     'bg-primary',
  message_sent:     'bg-blue',
  payment_received: 'bg-success',
  chase_stopped:    'bg-ink-subtle',
  chase_paused:     'bg-warning',
  level_escalated:  'bg-danger',
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const now = Date.now()
  const diff = now - d.getTime()
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hrs ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  if (events.length === 0) return (
    <div className="text-sm text-ink-subtle text-center py-8">
      No activity yet. Add your first debtor to get started.
    </div>
  )

  return (
    <div className="space-y-3">
      {events.map(e => (
        <div key={e.id} className="flex items-start gap-3">
          <div className={`w-2 h-2 rounded-full mt-[6px] shrink-0 ${EVENT_DOT[e.type]}`} />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-ink leading-snug">{e.description}</p>
            <p className="text-[11px] text-ink-subtle mt-0.5">{formatTime(e.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
