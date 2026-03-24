'use client'
import { useState } from 'react'
import { MessageSquare, Phone, Smartphone, Check } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import { CURRENT_BUSINESS, VIRTUAL_NUMBERS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const TABS = ['Profile', 'Channels', 'Number Pool', 'Billing']

const PLANS = [
  {
    key: 'starter', label: 'Starter', price: 'Free',
    features: ['10 debtors', '20 SMS/month', '1 escalation level', 'Basic dashboard'],
  },
  {
    key: 'growth', label: 'Growth', price: '₦5,000/mo',
    features: ['100 debtors', '500 SMS/month', '200 WhatsApp/month', '50 calls/month', '3 escalation levels', 'Payment links'],
  },
  {
    key: 'pro', label: 'Pro', price: '₦15,000/mo',
    features: ['Unlimited debtors', 'Unlimited messages', 'Number rotation', 'All channels', '5 escalation levels', 'Advanced analytics', '10 team members'],
  },
]

function BlockScoreBar({ score }: { score: number }) {
  const color = score < 40 ? 'bg-success' : score < 70 ? 'bg-warning' : 'bg-danger'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-surface2 rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-ink-muted w-6 text-right">{score}</span>
    </div>
  )
}

export default function SettingsPage() {
  const [tab, setTab]         = useState('Profile')
  const [channels, setChannels] = useState({ sms: true, whatsapp: false, calls: false })

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Settings" />
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-surface2 rounded-lg p-1 border border-stroke w-full sm:w-fit mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn('px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
                tab === t ? 'bg-surface text-ink' : 'text-ink-muted hover:text-ink')}>
              {t}
            </button>
          ))}
        </div>

        {/* Profile */}
        {tab === 'Profile' && (
          <div className="bg-surface border border-stroke rounded-xl max-w-lg">
            <div className="px-5 py-4 border-b border-stroke">
              <h2 className="font-syne font-bold text-[15px] text-ink">Business Profile</h2>
            </div>
            <div className="px-5 py-5 space-y-4">
              {[
                { id: 'bname', label: 'Business name', value: CURRENT_BUSINESS.name, type: 'text' },
                { id: 'oname', label: 'Owner name', value: CURRENT_BUSINESS.ownerName, type: 'text' },
                { id: 'email', label: 'Email', value: CURRENT_BUSINESS.email, type: 'email' },
                { id: 'phone', label: 'Phone', value: CURRENT_BUSINESS.phone, type: 'tel' },
              ].map(f => (
                <div key={f.id} className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-ink-muted uppercase tracking-[0.5px]">{f.label}</label>
                  <input
                    id={f.id} type={f.type} defaultValue={f.value}
                    className="w-full bg-surface2 border border-stroke rounded-lg px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              <button className="mt-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Channels */}
        {tab === 'Channels' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {[
              { key: 'sms' as const, label: 'SMS', icon: MessageSquare, desc: "Africa's Talking", status: 'Connected' },
              { key: 'whatsapp' as const, label: 'WhatsApp Business', icon: Smartphone, desc: 'Meta Cloud API', status: 'Not connected' },
              { key: 'calls' as const, label: 'Voice Calls', icon: Phone, desc: "Africa's Talking Voice", status: 'Not connected' },
            ].map(({ key, label, icon: Icon, desc, status }) => (
              <div key={key}
                className={cn('bg-surface border rounded-xl px-5 py-5 cursor-pointer transition-all', channels[key] ? 'border-primary' : 'border-stroke hover:border-ink-subtle')}
                onClick={() => setChannels(prev => ({ ...prev, [key]: !prev[key] }))}>
                <div className="flex items-start justify-between">
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', channels[key] ? 'bg-primary' : 'bg-surface2')}>
                    <Icon className={cn('w-4 h-4', channels[key] ? 'text-white' : 'text-ink-subtle')} />
                  </div>
                  {channels[key] && (
                    <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm font-semibold text-ink mt-3">{label}</p>
                <p className="text-xs text-ink-subtle mt-0.5">{desc}</p>
                <p className={cn('text-xs font-medium mt-2', channels[key] ? 'text-success' : 'text-ink-subtle')}>{status}</p>
              </div>
            ))}
          </div>
        )}

        {/* Number Pool */}
        {tab === 'Number Pool' && (
          <div className="bg-surface border border-stroke rounded-xl max-w-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-stroke">
              <h2 className="font-syne font-bold text-[15px] text-ink">Virtual Number Pool</h2>
            </div>
            {VIRTUAL_NUMBERS.length === 0 ? (
              <p className="text-sm text-ink-subtle text-center py-8">No numbers in pool yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stroke">
                      {['Number', 'Provider', 'Last Used', 'Block Score', 'Status'].map(h => (
                        <th key={h} className="text-left text-[11px] font-semibold text-ink-subtle uppercase tracking-[1px] px-5 py-3 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {VIRTUAL_NUMBERS.map(n => (
                      <tr key={n.id} className="border-b border-stroke/50 last:border-0 hover:bg-surface2/50">
                        <td className="px-5 py-3.5 text-sm font-mono text-ink">{n.phoneNumber}</td>
                        <td className="px-5 py-3.5 text-sm text-ink-muted capitalize">{n.provider.replace('_', ' ')}</td>
                        <td className="px-5 py-3.5 text-sm text-ink-muted">
                          {n.lastUsedAt ? new Date(n.lastUsedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Never'}
                        </td>
                        <td className="px-5 py-3.5 w-32"><BlockScoreBar score={n.blockScore} /></td>
                        <td className="px-5 py-3.5">
                          <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-full',
                            n.status === 'active' ? 'bg-success/[0.12] text-success' : 'bg-danger/[0.12] text-danger')}>
                            {n.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Billing */}
        {tab === 'Billing' && (
          <div className="max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PLANS.map(p => {
                const isCurrent = p.key === CURRENT_BUSINESS.plan
                return (
                  <div key={p.key} className={cn('bg-surface border rounded-xl px-5 py-5 relative', isCurrent ? 'border-primary' : 'border-stroke')}>
                    {isCurrent && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-primary text-white px-2.5 py-0.5 rounded-full font-semibold whitespace-nowrap">
                        Current Plan
                      </div>
                    )}
                    <p className="text-sm font-bold text-ink">{p.label}</p>
                    <p className={cn('font-syne font-bold text-[22px] mt-1', isCurrent ? 'text-primary' : 'text-ink')}>{p.price}</p>
                    <ul className="mt-4 space-y-2">
                      {p.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs text-ink-muted">
                          <Check className="w-3 h-3 text-success mt-0.5 shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    {!isCurrent && (
                      <button className="w-full mt-5 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors">
                        Upgrade
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
