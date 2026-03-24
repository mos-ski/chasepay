import { MessageSquare, Phone, Smartphone, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ChaseLevelBadge from '@/components/debtors/ChaseLevelBadge'
import type { MessageTemplate } from '@/lib/types'

const CHANNEL_ICONS = { sms: MessageSquare, whatsapp: Smartphone, call: Phone }
const CHANNEL_LABELS = { sms: 'SMS', whatsapp: 'WhatsApp', call: 'Voice Call' }

export default function TemplateCard({ template, onEdit }: { template: MessageTemplate; onEdit: () => void }) {
  const Icon = CHANNEL_ICONS[template.channel]
  return (
    <Card className="border-stroke shadow-sm">
      <CardContent className="pt-4 pb-4 px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <ChaseLevelBadge level={template.level} />
            <span className="flex items-center gap-1 text-xs bg-page border border-stroke text-ink-muted px-2 py-0.5 rounded-full font-medium">
              <Icon className="w-3 h-3" />{CHANNEL_LABELS[template.channel]}
            </span>
            <span className="text-xs text-ink-subtle font-medium">{template.tone}</span>
            {template.isCustom && <span className="text-xs bg-primary-light text-primary px-1.5 py-0.5 rounded-full font-medium">Custom</span>}
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit} className="h-7 px-2 text-ink-muted hover:text-ink shrink-0">
            <Pencil className="w-3.5 h-3.5" />
          </Button>
        </div>
        <p className="text-sm text-ink-muted mt-3 leading-relaxed line-clamp-2">
          {template.body.slice(0, 120)}{template.body.length > 120 ? '...' : ''}
        </p>
      </CardContent>
    </Card>
  )
}
