'use client'
import { Menu } from 'lucide-react'
import { useMobileSidebar } from './MobileSidebarContext'

export default function MobileHamburger() {
  const { open } = useMobileSidebar()
  return (
    <button
      onClick={open}
      className="lg:hidden p-1.5 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface2 transition-colors mr-1"
      aria-label="Open menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  )
}
