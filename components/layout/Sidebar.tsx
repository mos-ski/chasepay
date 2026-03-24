'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, Zap } from 'lucide-react'
import { CURRENT_BUSINESS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/',            label: 'Dashboard', icon: LayoutDashboard },
  { href: '/debtors',     label: 'Debtors',   icon: Users },
  { href: '/templates',   label: 'Templates', icon: MessageSquare },
  { href: '/settings',    label: 'Settings',  icon: Settings },
]

const PLAN_COLORS = {
  starter: 'bg-ink-subtle/20 text-ink-muted',
  growth:  'bg-primary-light text-primary',
  pro:     'bg-success/10 text-success',
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-surface border-r border-stroke flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-stroke">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-ink">
            Chase<span className="text-primary">Pay</span>
          </span>
        </div>
        <p className="text-[10px] text-ink-subtle uppercase tracking-widest mt-1">Debt Recovery</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-primary-light text-primary border-l-2 border-primary -ml-px'
                  : 'text-ink-muted hover:bg-page hover:text-ink'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-stroke">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-bold">
            {CURRENT_BUSINESS.ownerName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink truncate">{CURRENT_BUSINESS.ownerName}</p>
            <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium capitalize', PLAN_COLORS[CURRENT_BUSINESS.plan])}>
              {CURRENT_BUSINESS.plan}
            </span>
          </div>
        </div>
        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm text-ink-muted hover:text-danger transition-colors rounded-lg hover:bg-page mt-1">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
