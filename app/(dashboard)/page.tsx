import Link from 'next/link'
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
  const urgent = [...DEBTORS]
    .filter(d => d.status !== 'paid' && d.status !== 'stopped')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title={`${greeting}, ${CURRENT_BUSINESS.ownerName.split(' ')[0]} 👋`}
        action={
          <Link href="/debtors/new">
            <button className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-[13.5px] font-semibold px-4 py-2 rounded-lg transition-colors">
              + Add Debtor
            </button>
          </Link>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Total Outstanding" value={formatNaira(totalOwed)} sub="↑ across active debtors" color="orange" />
          <StatCard label="Recovered This Month" value={formatNaira(recovered)} sub="↑ from completed chases" color="green" />
          <StatCard label="Active Chases" value={String(activeDebtors.length)} sub="sending reminders now" color="red" />
          <StatCard label="Total Debtors" value={String(DEBTORS.length)} sub="all time" color="blue" />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4 sm:gap-5">
          {/* Active chases table */}
          <div className="bg-surface border border-stroke rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stroke">
              <h2 className="font-syne font-bold text-[15px] text-ink">🔥 Active Chases</h2>
              <Link href="/debtors" className="text-xs text-ink-subtle hover:text-ink transition-colors">View all →</Link>
            </div>
            {urgent.length === 0 ? (
              <div className="text-sm text-ink-subtle text-center py-12">No active chases yet. Add a debtor to get started.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stroke">
                      {['Debtor', 'Amount', 'Level', 'Status'].map(h => (
                        <th key={h} className="text-left text-[11px] font-semibold text-ink-subtle uppercase tracking-[1px] px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {urgent.map(d => (
                      <tr key={d.id} className="border-b border-stroke/50 last:border-0 hover:bg-surface2/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-semibold text-ink">{d.name}</p>
                          <p className="text-[11px] text-ink-subtle mt-0.5">{daysOverdue(d.dueDate)}</p>
                        </td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-primary whitespace-nowrap">{formatNaira(d.amountOwed)}</td>
                        <td className="px-5 py-3.5"><ChaseLevelBadge level={d.chaseLevel} /></td>
                        <td className="px-5 py-3.5"><DebtorStatusBadge status={d.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Activity feed */}
          <div className="bg-surface border border-stroke rounded-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stroke">
              <h2 className="font-syne font-bold text-[15px] text-ink">⚡ Live Activity</h2>
              <span className="text-[11px] text-success font-semibold">● LIVE</span>
            </div>
            <div className="px-5 py-4">
              <ActivityFeed events={ACTIVITY_EVENTS} />
            </div>
          </div>
        </div>

        {/* Recovery rates */}
        <div className="bg-surface border border-stroke rounded-xl">
          <div className="px-5 py-4 border-b border-stroke">
            <h2 className="font-syne font-bold text-[15px] text-ink">📈 Recovery Rate (Last 30 days)</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            {[
              { label: 'SMS',              rate: 74, color: 'bg-blue' },
              { label: 'WhatsApp',         rate: 81, color: 'bg-success' },
              { label: 'Voice Call',       rate: 62, color: 'bg-warning' },
              { label: 'Overall Recovery', rate: 86, color: 'bg-gradient-to-r from-primary to-warning' },
            ].map(({ label, rate, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1.5 text-[13px]">
                  <span className="text-ink">{label}</span>
                  <span className={label === 'Overall Recovery' ? 'text-primary font-bold' : 'text-ink-subtle'}>{rate}% response rate</span>
                </div>
                <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
