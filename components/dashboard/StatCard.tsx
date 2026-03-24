import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export default function StatCard({ label, value, sub, trend, trendValue }: StatCardProps) {
  return (
    <Card className="border-stroke shadow-sm">
      <CardContent className="pt-5 pb-5">
        <p className="text-xs font-medium text-ink-subtle uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-bold text-ink mt-2 tracking-tight">{value}</p>
        {(sub || trendValue) && (
          <p className={cn('text-xs mt-1.5', trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-ink-subtle')}>
            {trendValue && <span className="font-medium">{trendValue} </span>}{sub}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
