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
			<div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to bottom right, oklch(0.16 0 0), oklch(0.12 0 0))' }} />
			<div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(600px 400px at 20% 20%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 60%), radial-gradient(500px 350px at 80% 75%, color-mix(in oklab, var(--primary) 7%, transparent), transparent 60%)' }} />
			<div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(1px_1px_at_20%_30%,rgba(255,255,255,0.4),transparent_70%),radial-gradient(1px_1px_at_70%_18%,rgba(255,255,255,0.3),transparent_70%),radial-gradient(1px_1px_at_82%_72%,rgba(255,255,255,0.25),transparent_70%),radial-gradient(1px_1px_at_32%_78%,rgba(255,255,255,0.25),transparent_70%),radial-gradient(1px_1px_at_10%_60%,rgba(255,255,255,0.2),transparent_70%),radial-gradient(1px_1px_at_90%_40%,rgba(255,255,255,0.22),transparent_70%)]" />
			{/* Subtle grid overlay */}
			<div className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
			<div className="relative w-full px-6 md:px-12 py-12 md:py-20 max-w-6xl mx-auto flex flex-col gap-12">
				<header className="text-center space-y-8">
					<h1 className="sr-only">Pricing</h1>

					{/* Hero section */}
					<div className="space-y-6">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm" style={{ background: 'color-mix(in oklab, var(--primary) 10%, transparent)', borderColor: 'color-mix(in oklab, var(--primary) 25%, transparent)', color: 'var(--primary)' }}>
							<span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--primary)' }}></span>
							<span>Choose your plan</span>
						</div>

						<div className="space-y-4">
							<h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent leading-tight" style={{ background: 'var(--gradient-primary)' }}>
								Simple, transparent pricing
							</h2>
							<p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
								Start free and scale as you grow. No hidden fees, no surprises.
								<br />
								<span className="font-medium text-[var(--primary)]">Save up to 75%</span> with annual billing.
							</p>
						</div>
					</div>

					{/* Enhanced toggle */}
					<div className="inline-flex items-center gap-1 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl ring-1 ring-white/5" style={{ background: 'oklch(0.16 0 0 / 0.80)', borderColor: 'var(--border)' }}>
						<ToggleButton rounded active={cycle === 'monthly'} onClick={() => setCycle('monthly')}>Monthly</ToggleButton>
						<ToggleButton rounded active={cycle === 'yearly'} onClick={() => setCycle('yearly')}>
							Annually
							<span className="ml-2 px-2 py-0.5 text-xs rounded-full font-medium" style={{ background: 'color-mix(in oklab, var(--primary) 85%, transparent)', color: 'black' }}>Save 75%</span>
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
					? 'shadow-lg transform scale-[1.02] text-[var(--bg)]'
					: 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5')
			}
			style={{ background: active ? 'var(--primary)' as any : 'transparent' }}
		>
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
					? 'p-[2px] lg:scale-[1.05] lg:hover:scale-[1.07]'
					: '')
			}
			style={{ background: plan.highlighted ? 'var(--gradient-primary)' : 'transparent', boxShadow: plan.highlighted ? '0 0 80px -12px color-mix(in oklab, var(--primary) 40%, transparent)' : undefined }}
		>
			{plan.highlighted && (
				<div className="absolute -top-4 left-0 right-0 z-10">
					<div className="mx-4 h-14 rounded-2xl text-white text-sm font-semibold grid place-items-center shadow-2xl ring-2 ring-white/20 backdrop-blur-sm" style={{ background: 'var(--gradient-primary)' }}>
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
					(plan.highlighted ? 'mt-16 ring-2 ring-white/10' : '')
				}
				style={{ borderColor: 'var(--border)', background: plan.highlighted ? 'oklch(0.16 0 0 / 0.95)' : 'oklch(0.16 0 0 / 0.90)' }}
			>
				{plan.saveBadge ? (
					<div className="absolute top-4 right-4 text-xs px-3 py-1.5 rounded-full border font-medium shadow-lg" style={{ background: 'color-mix(in oklab, var(--primary) 12%, transparent)', borderColor: 'color-mix(in oklab, var(--primary) 35%, transparent)', color: 'var(--primary)' }}>
						{plan.saveBadge}
					</div>
				) : null}

				<div className="flex items-start gap-4">
					<div className={
						'shrink-0 w-12 h-12 rounded-2xl grid place-items-center text-lg font-bold transition-all duration-300 border'
					}
						style={{ background: 'color-mix(in oklab, var(--primary) 8%, transparent)', color: 'var(--text-muted)', borderColor: 'color-mix(in oklab, var(--primary) 25%, transparent)' }}>
						{plan.icon ?? '●'}
					</div>
					<div className="flex flex-col gap-2 flex-1">
						<h3 className="text-xl font-bold text-[var(--text)] transition-colors">{plan.name}</h3>
						{plan.subtitle ? (
							<p className="text-[var(--text-muted)] leading-relaxed">{plan.subtitle}</p>
						) : null}
					</div>
				</div>

				<div className="space-y-3">
					{plan.billingCycle ? (
						<div className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
							{plan.billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}
						</div>
					) : null}
					<div className="space-y-2">
						<div className={"font-bold bg-clip-text text-transparent " + (plan.price.toLowerCase() === 'free' ? 'text-5xl md:text-6xl' : (plan.highlighted ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'))} style={{ background: 'var(--gradient-primary)' }}>
							{plan.price}
							{plan.periodLabel ? (
								<span className="text-lg md:text-xl font-medium text-[var(--text-muted)] ml-2">{plan.periodLabel}</span>
							) : null}
						</div>
						{plan.extraText ? (
							<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ background: 'color-mix(in oklab, var(--primary) 12%, transparent)', borderColor: 'color-mix(in oklab, var(--primary) 35%, transparent)' }}>
								<span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--primary)' }}></span>
								<span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>{plan.extraText}</span>
							</div>
						) : null}
					</div>
				</div>

				<ul className="flex-1 space-y-4 mt-2">
					{plan.features.map((f, i) => (
						<li key={i} className="flex items-start gap-3 text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
							<span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full border text-xs font-bold flex-shrink-0" style={{ background: 'color-mix(in oklab, var(--primary) 12%, transparent)', borderColor: 'color-mix(in oklab, var(--primary) 35%, transparent)', color: 'var(--primary)' }}>
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
							? 'text-black hover:scale-[1.02] shadow-xl'
							: 'border hover:shadow-lg')
					}
					onClick={() => alert(`${plan.cta}`)}
					style={{ background: plan.highlighted ? 'var(--primary)' as any : 'oklch(0.18 0 0)', borderColor: plan.highlighted ? 'var(--primary)' : 'var(--border)', color: plan.highlighted ? 'black' : 'var(--text)' }}
				>
					<span className="relative z-10 flex items-center justify-center gap-2">
						{plan.cta}
						<span className="text-lg group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
					</span>
				</button>

				<div className="pt-4 border-t text-xs flex items-center justify-center gap-2" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
					<span className="text-sm" style={{ color: 'var(--primary)' }}>🛡️</span>
					<span className="font-medium">30-day money-back guarantee</span>
				</div>
			</div>
		</div>
	)
}
