import type { Debtor } from '@/lib/types'
import { cn } from '@/lib/utils'
const STATUS_STYLES: Record<Debtor['status'], string> = {
  pending: 'bg-warning/10 text-warning', partial: 'bg-warning/10 text-warning',
  paused: 'bg-ink-subtle/15 text-ink-subtle', paid: 'bg-success/10 text-success', stopped: 'bg-danger/10 text-danger',
}
const LABELS: Record<Debtor['status'], string> = { pending: 'Pending', partial: 'Partial', paused: 'Paused', paid: 'Paid', stopped: 'Stopped' }
export default function DebtorStatusBadge({ status }: { status: Debtor['status'] }) {
  return <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', STATUS_STYLES[status])}>{LABELS[status]}</span>
}
