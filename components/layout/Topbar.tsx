import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface TopbarProps {
  title: string
  backHref?: string
  action?: React.ReactNode
}

export default function Topbar({ title, backHref, action }: TopbarProps) {
  return (
    <header className="h-16 bg-surface border-b border-stroke flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link href={backHref} className="p-1.5 rounded-lg hover:bg-page text-ink-muted hover:text-ink transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        )}
        <h1 className="text-base font-semibold text-ink">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </header>
  )
}
