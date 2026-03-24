import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Topbar from '@/components/layout/Topbar'
import StatCard from '@/components/dashboard/StatCard'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import DebtorStatusBadge from '@/components/debtors/DebtorStatusBadge'
import ChaseLevelBadge from '@/components/debtors/ChaseLevelBadge'
import { DEBTORS, ACTIVITY_EVENTS, CURRENT_BUSINESS } from '@/lib/mock-data'

function formatNaira(n: number) {
  return '₦' + n.toLocaleString('en-NG')
}

function daysOverdue(dueDate: string) {
  const days = Math.floor((Date.now() - new Date(dueDate).getTime()) / 86400000)
  return days > 0 ? `${days}d overdue` : 'Due today'
}

export default function DashboardPage() {
  const activeDebtors = DEBTORS.filter(d => d.status === 'pending' || d.status === 'partial')
  const totalOwed = DEBTORS.filter(d => d.status !== 'paid').reduce((s, d) => s + d.amountOwed, 0)
  const recovered = DEBTORS.filter(d => d.status === 'paid').reduce((s, d) => s + d.amountOwed, 0)
  const urgent = [...DEBTORS].filter(d => d.status !== 'paid' && d.status !== 'stopped')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title={`${greeting}, ${CURRENT_BUSINESS.ownerName.split(' ')[0]}`}
        action={
          <Link href="/debtors/new">
            <Button className="bg-primary hover:bg-primary-hover text-white text-sm">+ Add Debtor</Button>
          </Link>
        }
      />
      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Owed" value={formatNaira(totalOwed)} sub="across active debtors" />
          <StatCard label="Recovered This Month" value={formatNaira(recovered)} trend="up" trendValue="↑" sub="from completed chases" />
          <StatCard label="Active Chases" value={String(activeDebtors.length)} sub="debtors being chased" />
          <StatCard label="Total Debtors" value={String(DEBTORS.length)} sub="all time" />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-[1fr_320px] gap-6">
          {/* Urgent debtors */}
          <Card className="border-stroke shadow-sm">
            <CardHeader className="pb-3 pt-5 px-6">
              <h2 className="text-sm font-semibold text-ink">Most Urgent Debtors</h2>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              {urgent.length === 0 ? (
                <p className="text-sm text-ink-subtle text-center py-8">No active chases yet. Add a debtor to get started.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stroke">
                      {['Name', 'Amount', 'Overdue', 'Level', 'Status'].map(h => (
                        <th key={h} className="text-left text-xs font-medium text-ink-subtle px-6 pb-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {urgent.map(d => (
                      <tr key={d.id} className="border-b border-stroke last:border-0 hover:bg-page transition-colors">
                        <td className="px-6 py-3 text-sm font-medium text-ink">{d.name}</td>
                        <td className="px-6 py-3 text-sm text-ink font-medium">{formatNaira(d.amountOwed)}</td>
                        <td className="px-6 py-3 text-sm text-ink-muted">{daysOverdue(d.dueDate)}</td>
                        <td className="px-6 py-3"><ChaseLevelBadge level={d.chaseLevel} /></td>
                        <td className="px-6 py-3"><DebtorStatusBadge status={d.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>

          {/* Activity feed */}
          <Card className="border-stroke shadow-sm">
            <CardHeader className="pb-3 pt-5 px-5">
              <h2 className="text-sm font-semibold text-ink">Recent Activity</h2>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <ActivityFeed events={ACTIVITY_EVENTS} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
