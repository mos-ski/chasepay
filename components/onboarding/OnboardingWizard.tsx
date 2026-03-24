'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, MessageSquare, Phone, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = ['Business Info', 'Channels', 'Choose Plan']

const PLANS = [
  { key: 'starter', label: 'Starter',  price: 'Free',        features: ['10 debtors', '20 SMS/month', 'Basic dashboard'] },
  { key: 'growth',  label: 'Growth',   price: '₦5,000/mo',   features: ['100 debtors', '500 SMS/month', 'WhatsApp messages', 'Payment links'] },
  { key: 'pro',     label: 'Pro',      price: '₦15,000/mo',  features: ['Unlimited debtors', 'Unlimited messages', 'Number rotation', 'All channels', 'Advanced analytics'] },
]

const inputCls = "w-full bg-surface2 border border-stroke rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary transition-colors"

export default function OnboardingWizard() {
  const [step, setStep]             = useState(0)
  const [selectedPlan, setSelectedPlan] = useState('growth')
  const [channels, setChannels]     = useState({ sms: true, whatsapp: false, calls: false })
  const router = useRouter()

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-syne font-extrabold text-3xl tracking-tight">
            Chase<span className="text-primary">Pay</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-surface2 text-ink-subtle border border-stroke')}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={cn('text-[13px]', i === step ? 'text-ink font-medium' : 'text-ink-subtle')}>{s}</span>
              {i < STEPS.length - 1 && <div className={cn('w-10 h-px', i < step ? 'bg-success' : 'bg-stroke')} />}
            </div>
          ))}
        </div>

        <div className="bg-surface border border-stroke rounded-xl px-6 py-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-syne font-bold text-[19px] text-ink mb-4">Tell us about your business</h2>
              {[
                { label: 'Business name', placeholder: 'e.g. Amaka Fabrics Ltd' },
                { label: 'Your name',     placeholder: 'e.g. Amaka Okonkwo' },
                { label: 'Phone number',  placeholder: '+234 801 234 5678' },
              ].map(f => (
                <div key={f.label} className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-ink-muted uppercase tracking-[0.5px]">{f.label}</label>
                  <input className={inputCls} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-syne font-bold text-[19px] text-ink mb-4">How should we contact debtors?</h2>
              {[
                { key: 'sms' as const,      label: 'SMS',          icon: MessageSquare, desc: 'Text message reminders' },
                { key: 'whatsapp' as const, label: 'WhatsApp',     icon: Smartphone,    desc: 'WhatsApp Business messages' },
                { key: 'calls' as const,    label: 'Voice Calls',  icon: Phone,         desc: 'Automated TTS phone calls' },
              ].map(({ key, label, icon: Icon, desc }) => (
                <button key={key} onClick={() => setChannels(prev => ({ ...prev, [key]: !prev[key] }))}
                  className={cn('w-full flex items-center gap-4 p-4 rounded-lg border-[1.5px] transition-all text-left',
                    channels[key] ? 'border-primary bg-primary/[0.08]' : 'border-stroke hover:border-ink-subtle bg-surface2')}>
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', channels[key] ? 'bg-primary' : 'bg-surface')}>
                    <Icon className={cn('w-4 h-4', channels[key] ? 'text-white' : 'text-ink-subtle')} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="text-xs text-ink-muted">{desc}</p>
                  </div>
                  {channels[key] && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-syne font-bold text-[19px] text-ink mb-4">Choose your plan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PLANS.map(p => (
                  <button key={p.key} onClick={() => setSelectedPlan(p.key)}
                    className={cn('p-4 rounded-lg border-[1.5px] text-left transition-all relative',
                      selectedPlan === p.key ? 'border-primary bg-primary/[0.08]' : 'border-stroke hover:border-ink-subtle bg-surface2')}>
                    {p.key === 'pro' && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-primary text-white px-2.5 py-0.5 rounded-full font-semibold whitespace-nowrap">
                        Recommended
                      </span>
                    )}
                    <p className="text-sm font-bold text-ink">{p.label}</p>
                    <p className="font-syne font-bold text-[18px] text-primary mt-1">{p.price}</p>
                    <ul className="mt-3 space-y-1">
                      {p.features.map(f => (
                        <li key={f} className="text-xs text-ink-muted flex gap-1.5">
                          <Check className="w-3 h-3 text-success mt-0.5 shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6 pt-5 border-t border-stroke">
            <button
              onClick={() => step > 0 && setStep(s => s - 1)}
              className={cn('px-4 py-2 rounded-lg border border-stroke text-ink-muted hover:bg-surface2 text-sm font-medium transition-colors', step === 0 && 'invisible')}
            >Back</button>
            <button
              onClick={() => step < 2 ? setStep(s => s + 1) : router.push('/')}
              className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-px"
            >
              {step === 2 ? 'Complete Setup' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
