import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChasePay — Automated Debt Recovery',
  description: 'Automated debt collection for Nigerian businesses',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
