'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, X } from 'lucide-react'
import { CURRENT_BUSINESS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useMobileSidebar } from './MobileSidebarContext'

const NAV = [
  { href: '/',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/debtors',   label: 'Debtors',   icon: Users },
  { href: '/templates', label: 'Templates', icon: MessageSquare },
  { href: '/settings',  label: 'Settings',  icon: Settings },
]

const PLAN_COLORS = {
  starter: 'bg-ink-subtle/20 text-ink-muted',
  growth:  'bg-primary/20 text-primary',
  pro:     'bg-success/20 text-success',
}

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, close } = useMobileSidebar()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={close}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 w-60 bg-surface border-r border-stroke flex flex-col z-50 transition-transform duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-stroke flex items-start justify-between">
          <div>
            <div className="font-syne font-extrabold text-[22px] tracking-tight leading-none">
              Chase<span className="text-primary">Pay</span>
            </div>
            <p className="text-[10px] text-ink-subtle uppercase tracking-[2px] mt-1">Debt Recovery</p>
          </div>
          <button
            onClick={close}
            className="lg:hidden text-ink-subtle hover:text-ink p-1 -mr-1 -mt-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all',
                  active
                    ? 'bg-primary/[0.12] text-primary'
                    : 'text-ink-muted hover:bg-surface2 hover:text-ink'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User footer */}
        <div className="px-4 py-4 border-t border-stroke">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-primary to-warning flex items-center justify-center text-white font-bold text-sm shrink-0">
              {CURRENT_BUSINESS.ownerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-ink truncate">{CURRENT_BUSINESS.ownerName}</p>
              <span className={cn('text-[11px] px-1.5 py-0.5 rounded-full font-medium capitalize', PLAN_COLORS[CURRENT_BUSINESS.plan])}>
                {CURRENT_BUSINESS.plan} Plan
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2.5 px-3 py-2 w-full text-[13px] text-ink-subtle hover:text-danger transition-colors rounded-lg hover:bg-surface2 mt-1">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
