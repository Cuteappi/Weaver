import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
})

function PricingPage() {
  const [cycle, setCycle] = React.useState<'monthly' | 'yearly'>('yearly')

  const plans = getPlans(cycle)

  return (
    <main className="relative min-h-[100dvh] w-full grid place-items-center overflow-hidden">
      {/* Enhanced background with depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(1px_1px_at_20%_30%,rgba(255,255,255,0.4),transparent_70%),radial-gradient(1px_1px_at_70%_18%,rgba(255,255,255,0.3),transparent_70%),radial-gradient(1px_1px_at_82%_72%,rgba(255,255,255,0.25),transparent_70%),radial-gradient(1px_1px_at_32%_78%,rgba(255,255,255,0.25),transparent_70%),radial-gradient(1px_1px_at_10%_60%,rgba(255,255,255,0.2),transparent_70%),radial-gradient(1px_1px_at_90%_40%,rgba(255,255,255,0.22),transparent_70%)]" />
      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="relative w-full px-6 md:px-12 py-12 md:py-20 max-w-6xl mx-auto flex flex-col gap-12">
        <header className="text-center space-y-8">
          <h1 className="sr-only">Pricing</h1>
          
          {/* Hero section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-sm text-indigo-300">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Choose your plan</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
                Simple, transparent pricing
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Start free and scale as you grow. No hidden fees, no surprises.
                <br />
                <span className="text-cyan-300 font-medium">Save up to 75%</span> with annual billing.
              </p>
            </div>
          </div>
          
          {/* Enhanced toggle */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl ring-1 ring-white/5">
            <ToggleButton rounded active={cycle === 'monthly'} onClick={() => setCycle('monthly')}>Monthly</ToggleButton>
            <ToggleButton rounded active={cycle === 'yearly'} onClick={() => setCycle('yearly')}>
              Annually
              <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-green-400 to-emerald-400 text-slate-900 rounded-full font-medium">Save 75%</span>
            </ToggleButton>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-5xl mx-auto">
          {plans.map((p) => (
            <PlanCard key={p.id} {...p} billingCycle={cycle} />
          ))}
        </section>
      </div>
    </main>
  )
}

function ToggleButton({ children, active, onClick, rounded }: { children: React.ReactNode; active?: boolean; onClick?: () => void; rounded?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={
        (rounded ? 'rounded-full ' : 'rounded-md ') +
        'px-5 py-2.5 text-sm font-medium transition-all duration-300 relative overflow-hidden ' + 
        (active 
          ? 'bg-white text-slate-900 shadow-lg transform scale-[1.02]' 
          : 'text-slate-300 hover:text-white hover:bg-slate-800/50')
      }
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-white to-slate-50 rounded-full" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}

type Plan = {
  id: string
  name: string
  subtitle?: string
  price: string
  periodLabel?: string
  features: string[]
  cta: string
  highlighted?: boolean
  saveBadge?: string
  extraText?: string
  devicesText?: string
  icon?: string
  accent?: 'slate' | 'blue' | 'purple'
}

function getPlans(cycle: 'monthly' | 'yearly'): Plan[] {
  const annual = cycle === 'yearly'
  return [
    {
      id: 'personal',
      name: 'Personal',
      subtitle: 'For individuals who want to securely connect personal devices, for free.',
      price: 'Free',
      periodLabel: '',
      cta: 'Try Now',
      features: ['1 device'],
      devicesText: '1 device',
      icon: '◌',
      accent: 'slate',
    },
    {
      id: 'starter',
      name: 'Starter',
      subtitle: 'For teams looking for an easy-to-use chat copilot.',
      price: annual ? '$2.99' : '$3.99',
      periodLabel: '/month',
      cta: 'Subscribe Now',
      highlighted: true,
      saveBadge: annual ? 'Save 65%' : undefined,
      extraText: annual ? '+3 EXTRA months' : undefined,
      features: ['Covers 5 devices'],
      devicesText: 'Covers 5 devices',
      icon: '⬚',
      accent: 'purple',
    },
    {
      id: 'premium',
      name: 'Premium',
      subtitle: 'For companies needing service and access control.',
      price: annual ? '$6.99' : '$9.99',
      periodLabel: '/month',
      cta: 'Subscribe Now',
      saveBadge: annual ? 'Save 75%' : undefined,
      extraText: annual ? '+3 EXTRA months' : undefined,
      features: ['Covers 10 devices'],
      devicesText: 'Covers 10 devices',
      icon: '◆',
      accent: 'blue',
    },
  ]
}

function PlanCard(plan: Plan & { billingCycle?: 'monthly' | 'yearly' }) {
  return (
    <div
      className={
        'relative rounded-3xl h-full flex flex-col transition-all duration-500 hover:scale-[1.02] group ' +
        (plan.highlighted
          ? 'p-[2px] bg-gradient-to-b from-purple-500/60 to-blue-500/50 shadow-[0_0_80px_-12px_rgba(99,102,241,0.6)] lg:scale-[1.05] lg:hover:scale-[1.07]'
          : 'hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.3)]')
      }
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-0 right-0 z-10">
          <div className="mx-4 h-14 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white text-sm font-semibold grid place-items-center shadow-2xl ring-2 ring-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-300">⭐</span>
              <span>Most Popular</span>
              <span className="text-yellow-300">⭐</span>
            </div>
          </div>
        </div>
      )}
      <div
        className={
          'relative rounded-3xl overflow-hidden border p-8 flex flex-col gap-6 backdrop-blur-xl h-full min-h-[480px] transition-all duration-300 ' + 
          (plan.highlighted 
            ? 'bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 mt-16 ring-2 ring-white/20 border-white/30' 
            : 'bg-slate-900/90 hover:bg-slate-900/95 group-hover:border-slate-600/50 ' + 
              (plan.accent === 'blue' ? 'border-indigo-500/30' : 'border-slate-700/50'))
        }
      >
        {plan.saveBadge ? (
          <div className="absolute top-4 right-4 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 font-medium shadow-lg">
            {plan.saveBadge}
          </div>
        ) : null}

        <div className="flex items-start gap-4">
          <div className={
            'shrink-0 w-12 h-12 rounded-2xl grid place-items-center text-lg font-bold transition-all duration-300 ' +
            (plan.accent === 'blue' 
              ? 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-300 ring-2 ring-blue-500/30 group-hover:ring-blue-400/50' 
              : plan.accent === 'purple' 
              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300 ring-2 ring-purple-500/30 group-hover:ring-purple-400/50' 
              : 'bg-gradient-to-br from-slate-700/40 to-slate-600/40 text-slate-300 ring-2 ring-slate-600/40 group-hover:ring-slate-500/60')
          }>
            {plan.icon ?? '●'}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-slate-50 transition-colors">{plan.name}</h3>
            {plan.subtitle ? (
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{plan.subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          {plan.billingCycle ? (
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              {plan.billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}
            </div>
          ) : null}
          <div className="space-y-2">
            <div className={"font-bold bg-gradient-to-br from-white to-slate-200 bg-clip-text text-transparent " + (plan.price.toLowerCase() === 'free' ? 'text-5xl md:text-6xl' : (plan.highlighted ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'))}>
              {plan.price}
              {plan.periodLabel ? (
                <span className="text-lg md:text-xl font-medium text-slate-400 ml-2">{plan.periodLabel}</span>
              ) : null}
            </div>
            {plan.extraText ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-cyan-300">{plan.extraText}</span>
              </div>
            ) : null}
          </div>
        </div>

        <ul className="flex-1 space-y-4 mt-2">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300 group-hover:text-slate-200 transition-colors">
              <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/40 text-green-400 text-xs font-bold flex-shrink-0">
                ✓
              </span>
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        <button
          className={
            'w-full h-14 rounded-2xl px-6 font-semibold transition-all duration-300 relative overflow-hidden group/btn ' +
            (plan.highlighted
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-[1.02] shadow-xl'
              : 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-600/50 hover:border-slate-500 hover:shadow-lg')
          }
          onClick={() => alert(`${plan.cta}`)}
        >
          {plan.highlighted && (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {plan.cta}
            <span className="text-lg group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </button>

        <div className="pt-4 border-t border-slate-700/40 text-xs text-slate-400 flex items-center justify-center gap-2 group-hover:text-slate-300 transition-colors">
          <span className="text-green-400 text-sm">🛡️</span>
          <span className="font-medium">30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  )
}
