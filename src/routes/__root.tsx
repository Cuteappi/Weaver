import {
	Outlet,
	HeadContent,
	createRootRouteWithContext,
	useRouteContext,
	Scripts,
} from '@tanstack/react-router'
import {
	createServerFn,
} from '@tanstack/react-start'
import { QueryClient } from '@tanstack/react-query'
import * as React from 'react'
import appCss from '@/styles/app.css?url'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexReactClient } from 'convex/react'
import { getCookie, getWebRequest } from '@tanstack/react-start/server'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import { fetchSession, getCookieName } from '@/lib/server-auth-utils'
import { authClient } from '@/lib/auth-client'
import { ThemeRoot } from '@/components/ThemeRoot'

// Server side session request
const fetchAuth = createServerFn({ method: 'GET' }).handler(async () => {
	const sessionCookieName = await getCookieName()
	const token = getCookie(sessionCookieName)
	const request = getWebRequest()
	const { session } = await fetchSession(request)
	return {
		userId: session?.user.id,
		token,
	}
})

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
	convexClient: ConvexReactClient
	convexQueryClient: ConvexQueryClient
}>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'icon', href: '/favicon.ico' },
		],
	}),
	beforeLoad: async (ctx) => {
		// all queries, mutations and action made with TanStack Query will be
		// authenticated by an identity token.
		const auth = await fetchAuth()
		const { userId, token } = auth

		// During SSR only (the only time serverHttpClient exists),
		// set the auth token for Convex to make HTTP queries with.
		if (token) {
			ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
		}

		return { userId, token }
	},
	component: RootComponent,
})

function RootComponent() {
	const context = useRouteContext({ from: Route.id })
	return (
		<ConvexBetterAuthProvider
			client={context.convexClient}
			authClient={authClient}
		>
			<RootDocument>
				<ThemeRoot>
					<Outlet />
				</ThemeRoot>
			</RootDocument>
		</ConvexBetterAuthProvider>
	)
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}