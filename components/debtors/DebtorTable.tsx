'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Eye, PauseCircle, CheckCircle, StopCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import DebtorStatusBadge from './DebtorStatusBadge'
import ChaseLevelBadge from './ChaseLevelBadge'
import type { Debtor } from '@/lib/types'

function formatNaira(n: number) { return '₦' + n.toLocaleString('en-NG') }
function formatDate(s: string) { return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }

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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-stroke">
            {['Debtor', 'Amount Owed', 'Due Date', 'Channels', 'Level', 'Status', ''].map(c => (
              <th key={c} className="text-left text-[11px] font-semibold text-ink-subtle uppercase tracking-[1px] px-5 py-3 whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.map(d => (
            <tr
              key={d.id}
              className="border-b border-stroke/50 last:border-0 hover:bg-surface2/50 transition-colors cursor-pointer"
              onClick={() => router.push(`/debtors/${d.id}`)}
            >
              <td className="px-5 py-3.5">
                <p className="text-sm font-semibold text-ink">{d.name}</p>
                <p className="text-[12px] text-ink-subtle mt-0.5">{d.phone}</p>
              </td>
              <td className="px-5 py-3.5 text-sm font-semibold text-primary whitespace-nowrap">{formatNaira(d.amountOwed)}</td>
              <td className="px-5 py-3.5 text-sm text-ink-muted whitespace-nowrap">{formatDate(d.dueDate)}</td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1 flex-wrap">
                  {d.channels.map(ch => (
                    <span key={ch} className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      ch === 'sms'      ? 'bg-blue/[0.15] text-blue-400' :
                      ch === 'whatsapp' ? 'bg-success/[0.15] text-emerald-400' :
                                          'bg-warning/[0.15] text-yellow-400'
                    }`}>
                      {ch === 'sms' ? 'SMS' : ch === 'whatsapp' ? 'WhatsApp' : 'Call'}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-5 py-3.5"><ChaseLevelBadge level={d.chaseLevel} /></td>
              <td className="px-5 py-3.5"><DebtorStatusBadge status={d.status} /></td>
              <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-7 w-7 items-center justify-center rounded text-ink-subtle hover:bg-surface2 hover:text-ink focus-visible:outline-none">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 bg-surface border-stroke text-ink">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-surface2" onClick={() => router.push(`/debtors/${d.id}`)}>
                      <Eye className="w-3.5 h-3.5" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-surface2">
                      <PauseCircle className="w-3.5 h-3.5" />
                      {d.status === 'paused' ? 'Resume' : 'Pause'}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-success focus:text-success hover:bg-surface2">
                      <CheckCircle className="w-3.5 h-3.5" /> Mark Paid
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-danger focus:text-danger hover:bg-surface2">
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
        <div className="flex items-center justify-between px-5 py-3 border-t border-stroke">
          <p className="text-xs text-ink-subtle">
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, debtors.length)} of {debtors.length}
          </p>
          <div className="flex gap-1">
            <button
              className="px-3 py-1.5 rounded text-xs border border-stroke text-ink-muted hover:bg-surface2 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === 1} onClick={() => setPage(p => p - 1)}
            >Prev</button>
            <button
              className="px-3 py-1.5 rounded text-xs border border-stroke text-ink-muted hover:bg-surface2 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
            >Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
