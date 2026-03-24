import { MessageSquare, Phone, Smartphone, Pencil } from 'lucide-react'
import ChaseLevelBadge from '@/components/debtors/ChaseLevelBadge'
import type { MessageTemplate } from '@/lib/types'

const CHANNEL_ICONS = { sms: MessageSquare, whatsapp: Smartphone, call: Phone }
const CHANNEL_LABELS = { sms: 'SMS', whatsapp: 'WhatsApp', call: 'Voice Call' }

export default function TemplateCard({ template, onEdit }: { template: MessageTemplate; onEdit: () => void }) {
  const Icon = CHANNEL_ICONS[template.channel]
  return (
    <div className="bg-surface border border-stroke rounded-xl px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <ChaseLevelBadge level={template.level} />
          <span className="flex items-center gap-1 text-[10px] bg-surface2 border border-stroke text-ink-muted px-2 py-0.5 rounded-full font-semibold">
            <Icon className="w-3 h-3" />{CHANNEL_LABELS[template.channel]}
          </span>
          {template.tone && <span className="text-[11px] text-ink-subtle font-medium">{template.tone}</span>}
          {template.isCustom && <span className="text-[10px] bg-primary/[0.12] text-primary px-1.5 py-0.5 rounded-full font-semibold">Custom</span>}
        </div>
        <button
          onClick={onEdit}
          className="text-ink-subtle hover:text-ink hover:bg-surface2 p-1.5 rounded-lg transition-colors shrink-0"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-[13px] text-ink-muted mt-3 leading-relaxed line-clamp-2">
        {template.body.slice(0, 120)}{template.body.length > 120 ? '...' : ''}
      </p>
    </div>
  )
}
