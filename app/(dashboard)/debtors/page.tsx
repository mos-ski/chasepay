'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import DebtorTable from '@/components/debtors/DebtorTable'
import { DEBTORS } from '@/lib/mock-data'
import type { Debtor } from '@/lib/types'
import { cn } from '@/lib/utils'

const TABS: { label: string; value: Debtor['status'] | 'all' }[] = [
  { label: 'All',     value: 'all' },
  { label: 'Active',  value: 'pending' },
  { label: 'Paused',  value: 'paused' },
  { label: 'Paid',    value: 'paid' },
  { label: 'Stopped', value: 'stopped' },
]

export default function DebtorsPage() {
  const [search, setSearch]       = useState('')
  const [activeTab, setActiveTab] = useState<Debtor['status'] | 'all'>('all')

  const filtered = useMemo(() => DEBTORS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search)
    const matchTab    = activeTab === 'all' || d.status === activeTab
    return matchSearch && matchTab
  }), [search, activeTab])

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title="Debtors"
        action={
          <Link href="/debtors/new">
            <button className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-[13.5px] font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
              + Add Debtor
            </button>
          </Link>
        }
      />
      <div className="p-4 sm:p-6 lg:p-8 space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" />
            <input
              placeholder="Search debtors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface2 border border-stroke rounded-lg text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex gap-1 bg-surface2 rounded-lg p-1 border border-stroke overflow-x-auto">
            {TABS.map(t => (
              <button key={t.value} onClick={() => setActiveTab(t.value)}
                className={cn('px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap',
                  activeTab === t.value ? 'bg-surface text-ink' : 'text-ink-muted hover:text-ink')}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-stroke rounded-xl overflow-hidden">
          <DebtorTable debtors={filtered} />
        </div>
      </div>
    </div>
  )
}
