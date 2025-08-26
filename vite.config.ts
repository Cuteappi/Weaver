import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: false,
		}),
		react({
			babel: {
				plugins: ['babel-plugin-react-compiler'],
			},
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"$": path.resolve(__dirname, "./src/components"),
			"@@": path.resolve(__dirname, "./convex"),
		},
	},
});
