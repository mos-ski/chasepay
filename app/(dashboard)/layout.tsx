import Sidebar from '@/components/layout/Sidebar'
import { MobileSidebarProvider } from '@/components/layout/MobileSidebarContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-page">
        <Sidebar />
        <main className="flex-1 lg:ml-60 flex flex-col min-h-screen min-w-0">
          {children}
        </main>
      </div>
    </MobileSidebarProvider>
  )
}
