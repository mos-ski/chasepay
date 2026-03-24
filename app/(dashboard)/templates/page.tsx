'use client'
import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import TemplateCard from '@/components/templates/TemplateCard'
import TemplateEditDrawer from '@/components/templates/TemplateEditDrawer'
import { TEMPLATES } from '@/lib/mock-data'
import type { MessageTemplate } from '@/lib/types'

const LEVEL_LABELS: Record<number, string> = {
  1: 'Level 1 — Friendly Reminder',
  2: 'Level 2 — Firm Follow-up',
  3: 'Level 3 — Urgent Notice',
  4: 'Level 4 — Final Warning',
  5: 'Level 5 — Legal Notice',
}

export default function TemplatesPage() {
  const [drawerOpen, setDrawerOpen]       = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | undefined>()

  const openEdit   = (t: MessageTemplate) => { setEditingTemplate(t); setDrawerOpen(true) }
  const openCreate = () => { setEditingTemplate(undefined); setDrawerOpen(true) }

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title="Message Templates"
        action={
          <button onClick={openCreate} className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-[13.5px] font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            + Create Template
          </button>
        }
      />
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <p className="text-sm text-ink-muted">Customize the messages ChasePay sends on your behalf.</p>

        {([1, 2, 3, 4, 5] as const).map(level => {
          const levelTemplates = TEMPLATES.filter(t => t.level === level)
          return (
            <div key={level}>
              <h2 className="font-syne font-bold text-[15px] text-ink mb-3">{LEVEL_LABELS[level]}</h2>
              {levelTemplates.length === 0 ? (
                <p className="text-sm text-ink-subtle">No templates at this level.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {levelTemplates.map(t => <TemplateCard key={t.id} template={t} onEdit={() => openEdit(t)} />)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <TemplateEditDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} template={editingTemplate} />
    </div>
  )
}
