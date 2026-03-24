'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, MessageSquare, Phone, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const STEPS = ['Debtor Info', 'Debt Details', 'Chase Settings', 'Review']

type FormData = {
  name: string; phone: string; whatsapp: string; sameAsPhone: boolean
  amount: string; dueDate: string; note: string
  intensity: 'gentle' | 'standard' | 'aggressive'
  channels: { sms: boolean; whatsapp: boolean; calls: boolean }
}

const DEFAULT: FormData = {
  name: '', phone: '', whatsapp: '', sameAsPhone: true,
  amount: '', dueDate: '', note: '',
  intensity: 'standard',
  channels: { sms: true, whatsapp: true, calls: false },
}

const INTENSITY = [
  { key: 'gentle' as const, label: 'Gentle', desc: 'Polite reminders, longer intervals' },
  { key: 'standard' as const, label: 'Standard', desc: 'Balanced frequency and tone' },
  { key: 'aggressive' as const, label: 'Aggressive', desc: 'Frequent contacts, firm language' },
]

export default function AddDebtorWizard() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(DEFAULT)
  const router = useRouter()

  const set = (k: keyof FormData, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="p-8 max-w-2xl">
      {/* Progress */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0',
                i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-stroke text-ink-subtle')}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={cn('text-sm whitespace-nowrap', i === step ? 'text-ink font-medium' : 'text-ink-subtle')}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={cn('w-12 h-px mx-3', i < step ? 'bg-success' : 'bg-stroke')} />}
          </div>
        ))}
      </div>

      <Card className="border-stroke shadow-sm">
        <CardContent className="pt-6 pb-6 space-y-5">

          {step === 0 && (
            <>
              <h2 className="text-base font-semibold text-ink">Debtor Information</h2>
              <div className="space-y-1.5"><Label>Full name</Label><Input placeholder="Chidi Okafor" value={form.name} onChange={e => set('name', e.target.value)} className="border-stroke" /></div>
              <div className="space-y-1.5"><Label>Phone number</Label><Input placeholder="+234 809 876 5432" value={form.phone} onChange={e => { set('phone', e.target.value); if (form.sameAsPhone) set('whatsapp', e.target.value) }} className="border-stroke" /></div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label>WhatsApp number</Label>
                  <button onClick={() => { set('sameAsPhone', !form.sameAsPhone); if (!form.sameAsPhone) set('whatsapp', form.phone) }}
                    className="text-xs text-primary font-medium">
                    {form.sameAsPhone ? 'Use different number' : 'Same as phone'}
                  </button>
                </div>
                <Input placeholder="+234 809 876 5432" value={form.sameAsPhone ? form.phone : form.whatsapp}
                  disabled={form.sameAsPhone} onChange={e => set('whatsapp', e.target.value)} className="border-stroke disabled:opacity-60" />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-base font-semibold text-ink">Debt Details</h2>
              <div className="space-y-1.5">
                <Label>Amount owed (₦)</Label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm font-medium">₦</span>
                  <Input type="number" placeholder="145000" value={form.amount} onChange={e => set('amount', e.target.value)} className="border-stroke pl-8" /></div>
              </div>
              <div className="space-y-1.5"><Label>Due date</Label><Input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} className="border-stroke" /></div>
              <div className="space-y-1.5"><Label>Note (optional)</Label><Input placeholder="e.g. Fabric order from January" value={form.note} onChange={e => set('note', e.target.value)} className="border-stroke" /></div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-base font-semibold text-ink">Chase Settings</h2>
              <div>
                <p className="text-sm font-medium text-ink mb-2">Intensity</p>
                <div className="grid grid-cols-3 gap-2">
                  {INTENSITY.map(opt => (
                    <button key={opt.key} onClick={() => set('intensity', opt.key)}
                      className={cn('p-3 rounded-lg border text-left transition-colors',
                        form.intensity === opt.key ? 'border-primary bg-primary-light' : 'border-stroke hover:border-ink-subtle')}>
                      <p className="text-sm font-medium text-ink">{opt.label}</p>
                      <p className="text-xs text-ink-muted mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-ink mb-2">Channels</p>
                <div className="space-y-2">
                  {[
                    { key: 'sms' as const, label: 'SMS', icon: MessageSquare },
                    { key: 'whatsapp' as const, label: 'WhatsApp', icon: Smartphone },
                    { key: 'calls' as const, label: 'Voice Calls', icon: Phone },
                  ].map(({ key, label, icon: Icon }) => (
                    <button key={key} onClick={() => set('channels', { ...form.channels, [key]: !form.channels[key] })}
                      className={cn('w-full flex items-center gap-3 p-3 rounded-lg border transition-colors',
                        form.channels[key] ? 'border-primary bg-primary-light' : 'border-stroke hover:border-ink-subtle')}>
                      <Icon className="w-4 h-4 text-ink-muted" />
                      <span className="text-sm font-medium text-ink">{label}</span>
                      {form.channels[key] && <Check className="w-4 h-4 text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-base font-semibold text-ink">Review &amp; Start Chase</h2>
              <div className="bg-page rounded-lg border border-stroke p-4 space-y-3">
                {[
                  ['Debtor', form.name || '—'],
                  ['Phone', form.phone || '—'],
                  ['Amount', form.amount ? `₦${Number(form.amount).toLocaleString()}` : '—'],
                  ['Due Date', form.dueDate || '—'],
                  ['Intensity', form.intensity.charAt(0).toUpperCase() + form.intensity.slice(1)],
                  ['Channels', Object.entries(form.channels).filter(([,v]) => v).map(([k]) => k.toUpperCase()).join(', ') || 'None'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-ink-muted">{label}</span>
                    <span className="text-ink font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between pt-4 border-t border-stroke">
            <Button variant="outline" className={cn('border-stroke', step === 0 && 'invisible')} onClick={() => setStep(s => s - 1)}>Back</Button>
            <Button className="bg-primary hover:bg-primary-hover text-white"
              onClick={() => step < 3 ? setStep(s => s + 1) : router.push('/debtors')}>
              {step === 3 ? '🚀 Start Chase' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
