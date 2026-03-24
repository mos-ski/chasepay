'use client'
import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { MessageTemplate } from '@/lib/types'

interface Props {
  open: boolean
  onClose: () => void
  template?: MessageTemplate  // undefined = create mode
}

const CHANNELS: MessageTemplate['channel'][] = ['sms', 'whatsapp', 'call']
const VARS = ['[Name]', '[Amount]', '[Business Name]', '[Date]', '[Link]', '[X]']

export default function TemplateEditDrawer({ open, onClose, template }: Props) {
  const isEdit = !!template
  const [channel, setChannel] = useState<MessageTemplate['channel']>(template?.channel ?? 'sms')
  const [tone, setTone] = useState(template?.tone ?? '')
  const [body, setBody] = useState(template?.body ?? '')

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
      <SheetContent className="w-[480px] sm:max-w-[480px] flex flex-col">
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Template' : 'Create Template'}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-5 py-4">
          {/* Channel */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-ink">Channel</Label>
            <div className="flex gap-2">
              {CHANNELS.map(c => (
                <button key={c} onClick={() => setChannel(c)}
                  className={cn('px-3 py-1.5 rounded-lg border text-sm font-medium capitalize transition-colors',
                    channel === c ? 'border-primary bg-primary-light text-primary' : 'border-stroke text-ink-muted hover:border-ink-subtle')}>
                  {c === 'call' ? 'Voice Call' : c}
                </button>
              ))}
            </div>
          </div>

          {/* Tone label */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-ink">Tone label</Label>
            <Input value={tone} onChange={e => setTone(e.target.value)} placeholder="e.g. Friendly, Firm, Urgent" className="border-stroke" />
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-ink">Message</Label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={6}
              placeholder="Type your message here..."
              className="w-full border border-stroke rounded-lg p-3 text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {/* Variable hints */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-ink-subtle">Available variables</p>
            <div className="flex flex-wrap gap-1.5">
              {VARS.map(v => (
                <button key={v} onClick={() => setBody(b => b + v)}
                  className="text-xs bg-page border border-stroke text-ink-muted px-2 py-1 rounded font-mono hover:border-primary hover:text-primary transition-colors">
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {body && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-ink-subtle">Preview</p>
              <div className="bg-page border border-stroke rounded-lg p-4 text-sm text-ink-muted leading-relaxed">{preview}</div>
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-stroke pt-4">
          <Button variant="outline" onClick={onClose} className="border-stroke">Cancel</Button>
          <Button onClick={onClose} className="bg-primary hover:bg-primary-hover text-white">Save Template</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
