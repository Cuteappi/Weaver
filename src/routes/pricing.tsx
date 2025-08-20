import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
})

function PricingPage() {
  const [cycle, setCycle] = React.useState<'monthly' | 'yearly'>('monthly')

  const plans = getPlans(cycle)

  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto flex flex-col gap-8">
      <header className="text-center flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-bold">Pricing</h1>
        <p className="opacity-80">Simple pricing for builders. No surprises.</p>

        <div className="inline-flex self-center items-center gap-2 text-sm border rounded-md p-1"
          style={{ borderColor: 'var(--border)' }}
        >
          <ToggleButton active={cycle === 'monthly'} onClick={() => setCycle('monthly')}>Monthly</ToggleButton>
          <ToggleButton active={cycle === 'yearly'} onClick={() => setCycle('yearly')}>Yearly <span className="ml-1 opacity-80">(save 20%)</span></ToggleButton>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <PlanCard key={p.id} {...p} />
        ))}
      </section>

      <footer className="text-center opacity-80 text-sm">
        Prices are placeholders for demo purposes.
      </footer>
    </main>
  )
}

function ToggleButton({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        'px-3 py-1 rounded-md border text-sm ' + (active ? '' : 'opacity-70 hover:opacity-100')
      }
      style={{
        backgroundColor: active ? 'var(--primary)' : 'transparent',
        color: active ? 'var(--primary-foreground)' : 'inherit',
        borderColor: 'var(--border)'
      }}
    >
      {children}
    </button>
  )
}

type Plan = {
  id: string
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  highlighted?: boolean
}

function getPlans(cycle: 'monthly' | 'yearly'): Plan[] {
  const mult = cycle === 'yearly' ? 0.8 : 1
  const fmt = (base: number) => `$${(base * mult).toFixed(0)}`

  return [
    {
      id: 'starter',
      name: 'Starter',
      price: fmt(0),
      period: cycle,
      cta: 'Get started',
      features: [
        '100 messages / month',
        'Community support',
        'Basic rate limits',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: fmt(19),
      period: cycle,
      cta: 'Upgrade to Pro',
      highlighted: true,
      features: [
        '10k messages / month',
        'Priority support',
        'Custom prompts',
        'Team seats (up to 3)'
      ],
    },
    {
      id: 'team',
      name: 'Team',
      price: fmt(49),
      period: cycle,
      cta: 'Contact sales',
      features: [
        'Unlimited messages',
        'SLA & SSO',
        'Advanced analytics',
        'Team seats (10+)'
      ],
    },
  ]
}

function PlanCard(plan: Plan) {
  return (
    <div
      className={
        'rounded-xl border p-5 flex flex-col gap-4 ' + (plan.highlighted ? 'ring-2' : '')
      }
      style={{
        backgroundColor: 'var(--card)',
        color: 'var(--card-foreground)',
        borderColor: 'var(--border)',
        boxShadow: plan.highlighted ? '0 0 0 2px var(--primary) inset' : undefined,
      }}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        <div className="text-2xl font-bold">{plan.price}<span className="text-sm font-normal opacity-70">/{plan.period}</span></div>
      </div>

      <ul className="flex-1 space-y-2 text-sm">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: 'var(--primary)' }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        className="rounded-md border px-4 py-2 text-sm"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          borderColor: 'var(--border)'
        }}
        onClick={() => alert(`${plan.cta}`)}
      >
        {plan.cta}
      </button>
    </div>
  )
}
