'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Eye, PauseCircle, CheckCircle, StopCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import DebtorStatusBadge from './DebtorStatusBadge'
import ChaseLevelBadge from './ChaseLevelBadge'
import type { Debtor } from '@/lib/types'

function formatNaira(n: number) { return '₦' + n.toLocaleString('en-NG') }
function formatDate(s: string) { return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }

const COLS = ['Name', 'Phone', 'Amount Owed', 'Due Date', 'Level', 'Status', '']

export default function DebtorTable({ debtors }: { debtors: Debtor[] }) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const PER_PAGE = 10
  const totalPages = Math.ceil(debtors.length / PER_PAGE)
  const visible = debtors.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  if (debtors.length === 0) return (
    <div className="text-center py-16 text-sm text-ink-subtle">
      No debtors yet. Click &apos;Add Debtor&apos; to start your first chase.
    </div>
  )

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-stroke">
            {COLS.map(c => <th key={c} className="text-left text-xs font-medium text-ink-subtle px-6 py-3">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {visible.map(d => (
            <tr key={d.id} className="border-b border-stroke last:border-0 hover:bg-page transition-colors">
              <td className="px-6 py-3.5 text-sm font-medium text-ink">{d.name}</td>
              <td className="px-6 py-3.5 text-sm text-ink-muted">{d.phone}</td>
              <td className="px-6 py-3.5 text-sm font-medium text-ink text-right">{formatNaira(d.amountOwed)}</td>
              <td className="px-6 py-3.5 text-sm text-ink-muted">{formatDate(d.dueDate)}</td>
              <td className="px-6 py-3.5"><ChaseLevelBadge level={d.chaseLevel} /></td>
              <td className="px-6 py-3.5"><DebtorStatusBadge status={d.status} /></td>
              <td className="px-6 py-3.5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-md p-0 text-ink-subtle hover:bg-accent focus-visible:outline-none">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => router.push(`/debtors/${d.id}`)}>
                      <Eye className="w-3.5 h-3.5" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <PauseCircle className="w-3.5 h-3.5" />
                      {d.status === 'paused' ? 'Resume' : 'Pause'}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-success focus:text-success">
                      <CheckCircle className="w-3.5 h-3.5" /> Mark Paid
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-danger focus:text-danger">
                      <StopCircle className="w-3.5 h-3.5" /> Stop Chase
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-stroke">
          <p className="text-xs text-ink-subtle">
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, debtors.length)} of {debtors.length}
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs border-stroke" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs border-stroke" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  )
}
