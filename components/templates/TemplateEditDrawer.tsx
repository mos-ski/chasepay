'use client'
import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { MessageTemplate } from '@/lib/types'

interface Props {
  open: boolean
  onClose: () => void
  template?: MessageTemplate
}

const CHANNELS: MessageTemplate['channel'][] = ['sms', 'whatsapp', 'call']
const VARS = ['[Name]', '[Amount]', '[Business Name]', '[Date]', '[Link]', '[X]']

export default function TemplateEditDrawer({ open, onClose, template }: Props) {
  const isEdit = !!template
  const [channel, setChannel] = useState<MessageTemplate['channel']>(template?.channel ?? 'sms')
  const [tone, setTone]       = useState(template?.tone ?? '')
  const [body, setBody]       = useState(template?.body ?? '')

  useEffect(() => {
    if (open) {
      setChannel(template?.channel ?? 'sms')
      setTone(template?.tone ?? '')
      setBody(template?.body ?? '')
    }
  }, [open, template])

  const preview = body
    .replace(/\[Name\]/g, 'Chidi Okafor')
    .replace(/\[Amount\]/g, '₦145,000')
    .replace(/\[Business Name\]/g, 'Amaka Fabrics')
    .replace(/\[Date\]/g, '1 Mar 2026')
    .replace(/\[Link\]/g, 'pay.chasepay.ng/abc')
    .replace(/\[X\]/g, '7')

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[480px] sm:max-w-[480px] flex flex-col bg-surface border-stroke text-ink">
        <SheetHeader className="border-b border-stroke pb-4">
          <SheetTitle className="font-syne font-bold text-ink">{isEdit ? 'Edit Template' : 'Create Template'}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-5 py-4">
          {/* Channel */}
          <div className="space-y-2">
            <p className="text-[12px] font-semibold text-ink-muted uppercase tracking-[0.5px]">Channel</p>
            <div className="flex gap-2">
              {CHANNELS.map(c => (
                <button key={c} onClick={() => setChannel(c)}
                  className={cn('px-3 py-1.5 rounded-lg border text-sm font-medium capitalize transition-colors',
                    channel === c
                      ? 'border-primary bg-primary/[0.12] text-primary'
                      : 'border-stroke text-ink-muted hover:border-ink-subtle hover:bg-surface2')}>
                  {c === 'call' ? 'Voice Call' : c}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-1.5">
            <p className="text-[12px] font-semibold text-ink-muted uppercase tracking-[0.5px]">Tone label</p>
            <input
              value={tone} onChange={e => setTone(e.target.value)}
              placeholder="e.g. Friendly, Firm, Urgent"
              className="w-full bg-surface2 border border-stroke rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <p className="text-[12px] font-semibold text-ink-muted uppercase tracking-[0.5px]">Message</p>
            <textarea
              value={body} onChange={e => setBody(e.target.value)}
              rows={6} placeholder="Type your message here..."
              className="w-full bg-surface2 border border-stroke rounded-lg p-3 text-sm text-ink placeholder:text-ink-subtle resize-none focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Variables */}
          <div className="space-y-2">
            <p className="text-[12px] font-semibold text-ink-subtle uppercase tracking-[0.5px]">Available variables</p>
            <div className="flex flex-wrap gap-1.5">
              {VARS.map(v => (
                <button key={v} onClick={() => setBody(b => b + v)}
                  className="text-xs bg-surface2 border border-stroke text-ink-muted px-2 py-1 rounded font-mono hover:border-primary hover:text-primary transition-colors">
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {body && (
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-ink-subtle uppercase tracking-[0.5px]">Preview</p>
              <div className="bg-surface2 border border-stroke rounded-lg p-4 text-sm text-ink-muted leading-relaxed">{preview}</div>
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-stroke pt-4 gap-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-stroke text-ink-muted hover:bg-surface2 text-sm font-medium transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors">
            Save Template
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
