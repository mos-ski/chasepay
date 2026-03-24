import type { Debtor } from '@/lib/types'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<Debtor['status'], string> = {
  pending: 'bg-warning/[0.12] text-warning',
  partial: 'bg-warning/[0.12] text-warning',
  paused:  'bg-ink-subtle/[0.12] text-ink-subtle',
  paid:    'bg-success/[0.12] text-success',
  stopped: 'bg-danger/[0.12] text-danger',
}

const STATUS_DOT: Record<Debtor['status'], string> = {
  pending: 'bg-warning',
  partial: 'bg-warning',
  paused:  'bg-ink-subtle',
  paid:    'bg-success',
  stopped: 'bg-danger',
}

const LABELS: Record<Debtor['status'], string> = {
  pending: 'Pending', partial: 'Partial', paused: 'Paused', paid: 'Paid', stopped: 'Stopped',
}

export default function DebtorStatusBadge({ status }: { status: Debtor['status'] }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[0.5px]', STATUS_STYLES[status])}>
      <span className={cn('w-[5px] h-[5px] rounded-full', STATUS_DOT[status])} />
      {LABELS[status]}
    </span>
  )
}
