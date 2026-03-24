import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MobileHamburger from './MobileHamburger'

interface TopbarProps {
  title: string
  backHref?: string
  action?: React.ReactNode
}

export default function Topbar({ title, backHref, action }: TopbarProps) {
  return (
    <header className="h-16 bg-surface border-b border-stroke flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shrink-0">
      <div className="flex items-center gap-2">
        <MobileHamburger />
        {backHref && (
          <Link href={backHref} className="p-1.5 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        )}
        <h1 className="font-syne font-bold text-lg text-ink leading-tight truncate">{title}</h1>
      </div>
      {action && <div className="flex items-center gap-2 shrink-0 ml-3">{action}</div>}
    </header>
  )
}
