import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthKitProvider, useAuth } from "@workos-inc/authkit-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuthKit } from "@convex-dev/workos";
import "./index.css";
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'


// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}


const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthKitProvider
			clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}
			redirectUri={import.meta.env.VITE_WORKOS_REDIRECT_URI}
		>
			<ConvexProviderWithAuthKit client={convex} useAuth={useAuth}>
				<RouterProvider router={router} />
				<TanStackRouterDevtools router={router} />
			</ConvexProviderWithAuthKit>
		</AuthKitProvider>
	</StrictMode>,
);