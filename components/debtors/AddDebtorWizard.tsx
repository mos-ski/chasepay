'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, MessageSquare, Phone, Smartphone } from 'lucide-react'
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
  { key: 'gentle' as const,     label: 'Gentle',     icon: '🕊️', desc: 'Polite reminders, longer intervals',  color: 'border-success bg-success/[0.08]',  active: 'text-success' },
  { key: 'standard' as const,   label: 'Standard',   icon: '⚖️', desc: 'Balanced frequency and tone',          color: 'border-warning bg-warning/[0.08]',  active: 'text-warning' },
  { key: 'aggressive' as const, label: 'Aggressive', icon: '🔥', desc: 'Frequent contacts, firm language',      color: 'border-danger bg-danger/[0.08]',    active: 'text-danger' },
]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-semibold text-ink-muted uppercase tracking-[0.5px]">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full bg-surface2 border border-stroke rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary transition-colors"

export default function AddDebtorWizard() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(DEFAULT)
  const router = useRouter()

  const set = (k: keyof FormData, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
      {/* Progress indicator */}
      <div className="flex items-center mb-8 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-surface2 text-ink-subtle border border-stroke')}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={cn('text-[13px] whitespace-nowrap', i === step ? 'text-ink font-medium' : 'text-ink-subtle')}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={cn('w-10 h-px mx-3', i < step ? 'bg-success' : 'bg-stroke')} />}
          </div>
        ))}
      </div>

      <div className="bg-surface border border-stroke rounded-xl px-5 sm:px-6 py-6 space-y-5">
        {step === 0 && (
          <>
            <h2 className="font-syne font-bold text-[17px] text-ink">Debtor Information</h2>
            <Field label="Full name">
              <input className={inputCls} placeholder="Chidi Okafor" value={form.name} onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Phone number">
              <input className={inputCls} placeholder="+234 809 876 5432" value={form.phone}
                onChange={e => { set('phone', e.target.value); if (form.sameAsPhone) set('whatsapp', e.target.value) }} />
            </Field>
            <Field label="WhatsApp number">
              <div className="flex items-center justify-between mb-1">
                <span />
                <button onClick={() => { set('sameAsPhone', !form.sameAsPhone); if (!form.sameAsPhone) set('whatsapp', form.phone) }}
                  className="text-xs text-primary font-medium">
                  {form.sameAsPhone ? 'Use different number' : 'Same as phone'}
                </button>
              </div>
              <input className={cn(inputCls, form.sameAsPhone && 'opacity-60')}
                placeholder="+234 809 876 5432"
                value={form.sameAsPhone ? form.phone : form.whatsapp}
                disabled={form.sameAsPhone}
                onChange={e => set('whatsapp', e.target.value)} />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="font-syne font-bold text-[17px] text-ink">Debt Details</h2>
            <Field label="Amount owed (₦)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm font-medium">₦</span>
                <input type="number" className={cn(inputCls, 'pl-8')} placeholder="145000" value={form.amount} onChange={e => set('amount', e.target.value)} />
              </div>
            </Field>
            <Field label="Due date">
              <input type="date" className={inputCls} value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
            </Field>
            <Field label="Note (optional)">
              <input className={inputCls} placeholder="e.g. Fabric order from January" value={form.note} onChange={e => set('note', e.target.value)} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-syne font-bold text-[17px] text-ink">Chase Settings</h2>
            <div>
              <p className="text-[12px] font-semibold text-ink-muted uppercase tracking-[0.5px] mb-3">Intensity</p>
              <div className="grid grid-cols-3 gap-2">
                {INTENSITY.map(opt => (
                  <button key={opt.key} onClick={() => set('intensity', opt.key)}
                    className={cn('p-3 rounded-lg border-[1.5px] text-center transition-all',
                      form.intensity === opt.key ? opt.color : 'border-stroke hover:border-ink-subtle bg-surface2')}>
                    <div className="text-xl mb-1">{opt.icon}</div>
                    <p className={cn('text-sm font-bold', form.intensity === opt.key ? opt.active : 'text-ink')}>{opt.label}</p>
                    <p className="text-[10px] text-ink-subtle mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-ink-muted uppercase tracking-[0.5px] mb-3">Channels</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'sms' as const, label: 'SMS', icon: MessageSquare },
                  { key: 'whatsapp' as const, label: 'WhatsApp', icon: Smartphone },
                  { key: 'calls' as const, label: 'Calls', icon: Phone },
                ].map(({ key, label, icon: Icon }) => (
                  <button key={key} onClick={() => set('channels', { ...form.channels, [key]: !form.channels[key] })}
                    className={cn('flex flex-col items-center gap-2 p-3 rounded-lg border-[1.5px] transition-all',
                      form.channels[key] ? 'border-primary bg-primary/[0.08]' : 'border-stroke hover:border-ink-subtle bg-surface2')}>
                    <Icon className={cn('w-5 h-5', form.channels[key] ? 'text-primary' : 'text-ink-subtle')} />
                    <span className={cn('text-[12px] font-semibold', form.channels[key] ? 'text-primary' : 'text-ink-muted')}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-syne font-bold text-[17px] text-ink">Review &amp; Start Chase</h2>
            <div className="bg-surface2 rounded-lg border border-stroke p-4 space-y-3">
              {[
                ['Debtor',    form.name || '—'],
                ['Phone',     form.phone || '—'],
                ['Amount',    form.amount ? `₦${Number(form.amount).toLocaleString()}` : '—'],
                ['Due Date',  form.dueDate || '—'],
                ['Intensity', form.intensity.charAt(0).toUpperCase() + form.intensity.slice(1)],
                ['Channels',  Object.entries(form.channels).filter(([,v]) => v).map(([k]) => k.toUpperCase()).join(', ') || 'None'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-ink-muted">{label}</span>
                  <span className="text-ink font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-between pt-4 border-t border-stroke">
          <button
            className={cn('px-4 py-2 rounded-lg border border-stroke text-ink-muted hover:bg-surface2 text-sm font-medium transition-colors', step === 0 && 'invisible')}
            onClick={() => setStep(s => s - 1)}
          >Back</button>
          <button
            className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-px"
            onClick={() => step < 3 ? setStep(s => s + 1) : router.push('/debtors')}
          >
            {step === 3 ? '🚀 Start Chase' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  )
}
