export type ClassValue =
	| string
	| number
	| null
	| undefined
	| boolean
	| ClassValue[]
	| { [k: string]: any }

export function cn(...inputs: ClassValue[]): string {
	const out: string[] = []
	const push = (v: any) => {
		if (!v) return
		if (typeof v === 'string' || typeof v === 'number') {
			out.push(String(v))
		} else if (Array.isArray(v)) {
			for (const i of v) push(i)
		} else if (typeof v === 'object') {
			for (const k in v) if (v[k]) out.push(k)
		}
	}
	for (const i of inputs) push(i)
	return out.join(' ')
}
