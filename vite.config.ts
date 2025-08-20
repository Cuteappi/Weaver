import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tailwindcss(),
		tsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		// react({
		// 	babel: {
		// 		plugins: ['babel-plugin-react-compiler'],
		// 	},
		// 	// Only run on TSX/JSX files
		// 	include: [/\.([tj]sx)$/],
		// 	// Exclude routes/server and any CSS (with or without query)
		// 	exclude: [
		// 		/src\/routes\//,
		// 		/\.server\./,
		// 		/\bapi\b/,
		// 		/\.css(\?|$)/,
		// 	],
		// }),
		tanstackStart(),
	],
})
