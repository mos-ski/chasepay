'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, MessageSquare, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const STEPS = ['Business Info', 'Channels', 'Choose Plan']

const PLANS = [
  { key: 'starter', label: 'Starter', price: 'Free', features: ['10 debtors', '20 SMS/month', 'Basic dashboard'] },
  { key: 'growth',  label: 'Growth',  price: '₦5,000/mo', features: ['100 debtors', '500 SMS/month', 'WhatsApp messages', 'Payment links'] },
  { key: 'pro',     label: 'Pro',     price: '₦15,000/mo', features: ['Unlimited debtors', 'Unlimited messages', 'Number rotation', 'All channels', 'Advanced analytics'] },
]

export default function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState('growth')
  const [channels, setChannels] = useState({ sms: true, whatsapp: false, calls: false })
  const router = useRouter()

  const toggleChannel = (ch: keyof typeof channels) =>
    setChannels(prev => ({ ...prev, [ch]: !prev[ch] }))

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold',
                i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-stroke text-ink-subtle'
              )}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={cn('text-sm', i === step ? 'text-ink font-medium' : 'text-ink-subtle')}>{s}</span>
              {i < STEPS.length - 1 && <div className={cn('w-12 h-px', i < step ? 'bg-success' : 'bg-stroke')} />}
            </div>
          ))}
        </div>

        <Card className="border-stroke shadow-sm">
          <CardContent className="pt-6 pb-6">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-ink mb-4">Tell us about your business</h2>
                <div className="space-y-1.5"><Label>Business name</Label><Input placeholder="e.g. Amaka Fabrics Ltd" className="border-stroke" /></div>
                <div className="space-y-1.5"><Label>Your name</Label><Input placeholder="e.g. Amaka Okonkwo" className="border-stroke" /></div>
                <div className="space-y-1.5"><Label>Phone number</Label><Input placeholder="+234 801 234 5678" className="border-stroke" /></div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-ink mb-4">How should we contact debtors?</h2>
                {[
                  { key: 'sms' as const, label: 'SMS', icon: MessageSquare, desc: 'Text message reminders' },
                  { key: 'whatsapp' as const, label: 'WhatsApp', icon: Phone, desc: 'WhatsApp Business messages' },
                  { key: 'calls' as const, label: 'Voice Calls', icon: Phone, desc: 'Automated TTS phone calls' },
                ].map(({ key, label, icon: Icon, desc }) => (
                  <button key={key} onClick={() => toggleChannel(key)}
                    className={cn('w-full flex items-center gap-4 p-4 rounded-lg border transition-colors text-left',
                      channels[key] ? 'border-primary bg-primary-light' : 'border-stroke hover:border-ink-subtle'
                    )}>
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', channels[key] ? 'bg-primary' : 'bg-page')}>
                      <Icon className={cn('w-4 h-4', channels[key] ? 'text-white' : 'text-ink-subtle')} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{label}</p>
                      <p className="text-xs text-ink-muted">{desc}</p>
                    </div>
                    {channels[key] && <Check className="w-4 h-4 text-primary ml-auto" />}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-ink mb-4">Choose your plan</h2>
                <div className="grid grid-cols-3 gap-3">
                  {PLANS.map(p => (
                    <button key={p.key} onClick={() => setSelectedPlan(p.key)}
                      className={cn('p-4 rounded-lg border text-left transition-colors relative',
                        selectedPlan === p.key ? 'border-primary bg-primary-light' : 'border-stroke hover:border-ink-subtle'
                      )}>
                      {p.key === 'pro' && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-medium">Recommended</span>}
                      <p className="text-sm font-semibold text-ink">{p.label}</p>
                      <p className="text-base font-bold text-primary mt-1">{p.price}</p>
                      <ul className="mt-3 space-y-1">
                        {p.features.map(f => <li key={f} className="text-xs text-ink-muted flex gap-1.5"><Check className="w-3 h-3 text-success mt-0.5 shrink-0" />{f}</li>)}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 pt-6 border-t border-stroke">
              <Button variant="outline" onClick={() => step > 0 ? setStep(s => s - 1) : undefined}
                className={cn('border-stroke', step === 0 && 'invisible')}>Back</Button>
              <Button className="bg-primary hover:bg-primary-hover text-white"
                onClick={() => step < 2 ? setStep(s => s + 1) : router.push('/')}>
                {step === 2 ? 'Complete Setup' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
