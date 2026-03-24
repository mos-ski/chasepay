import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
  color?: 'orange' | 'green' | 'red' | 'blue'
}

const COLOR_MAP = {
  orange: { bar: 'from-primary to-warning', value: 'text-primary' },
  green:  { bar: 'from-success to-emerald-400', value: 'text-success' },
  red:    { bar: 'from-danger to-red-400', value: 'text-danger' },
  blue:   { bar: 'from-blue to-blue-400', value: 'text-blue' },
}

export default function StatCard({ label, value, sub, color = 'orange' }: StatCardProps) {
  const { bar, value: valueColor } = COLOR_MAP[color]
  return (
    <div className="bg-surface border border-stroke rounded-xl p-5 relative overflow-hidden">
      {/* Top accent bar */}
      <div className={cn('absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r', bar)} />
      <p className="text-[11px] font-semibold text-ink-subtle uppercase tracking-[1.5px] mb-2">{label}</p>
      <p className={cn('font-syne font-bold text-[28px] leading-none', valueColor)}>{value}</p>
      {sub && <p className="text-[11px] text-ink-subtle mt-1">{sub}</p>}
    </div>
  )
}
