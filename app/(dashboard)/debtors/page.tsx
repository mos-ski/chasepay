'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Topbar from '@/components/layout/Topbar'
import DebtorTable from '@/components/debtors/DebtorTable'
import { DEBTORS } from '@/lib/mock-data'
import type { Debtor } from '@/lib/types'
import { cn } from '@/lib/utils'

const TABS: { label: string; value: Debtor['status'] | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'pending' },
  { label: 'Paused', value: 'paused' },
  { label: 'Paid', value: 'paid' },
  { label: 'Stopped', value: 'stopped' },
]

export default function DebtorsPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<Debtor['status'] | 'all'>('all')

  const filtered = useMemo(() => DEBTORS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)
    const matchTab = activeTab === 'all' || d.status === activeTab
    return matchSearch && matchTab
  }), [search, activeTab])

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title="Debtors"
        action={<Link href="/debtors/new"><Button className="bg-primary hover:bg-primary-hover text-white text-sm">+ Add Debtor</Button></Link>}
      />
      <div className="p-8 space-y-4">
        {/* Filter bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" />
            <Input placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 border-stroke text-sm" />
          </div>
          <div className="flex gap-1 bg-page rounded-lg p-1 border border-stroke">
            {TABS.map(t => (
              <button key={t.value} onClick={() => setActiveTab(t.value)}
                className={cn('px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  activeTab === t.value ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted hover:text-ink')}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <Card className="border-stroke shadow-sm overflow-hidden">
          <DebtorTable debtors={filtered} />
        </Card>
      </div>
    </div>
  )
}
