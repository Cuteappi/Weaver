import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

function sseHeaders() {
	return new Headers({
		"Content-Type": "text/event-stream",
		"Cache-Control": "no-cache, no-transform",
		Connection: "keep-alive",
	});
}

function writeEvent(ctrl: ReadableStreamDefaultController<Uint8Array>, event: string, data?: unknown) {
	const enc = new TextEncoder();
	if (event) ctrl.enqueue(enc.encode(`event: ${event}\n`));
	if (data !== undefined) ctrl.enqueue(enc.encode(`data: ${typeof data === "string" ? data : JSON.stringify(data)}\n`));
	ctrl.enqueue(enc.encode("\n"));
}

function corsHeaders(req: Request) {
	const origin = req.headers.get("origin") ?? "*";
	return new Headers({
		"Access-Control-Allow-Origin": origin,
		"Vary": "Origin",
		"Access-Control-Allow-Methods": "GET,POST,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Allow-Credentials": "true",
	});
}

function mergeHeaders(...sets: Headers[]) {
	const merged = new Headers();
	for (const h of sets) {
		h.forEach((v, k) => merged.set(k, v));
	}
	return merged;
}

export const generate = httpAction(async (_ctx, req) => {
	// TODO: Forward to Valkey gateway; for now just accept
	if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(req) });
	if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: corsHeaders(req) });
	const body = await req.json().catch(() => ({}));
	// Accept and return 202 to indicate async processing
	return new Response(JSON.stringify({ ok: true, received: body }), {
		status: 202,
		headers: mergeHeaders(new Headers({ "Content-Type": "application/json" }), corsHeaders(req)),
	});
});

export const stream = httpAction(async (_ctx, req) => {
	if (req.method !== "GET") return new Response("Method Not Allowed", { status: 405, headers: corsHeaders(req) });
	const url = new URL(req.url);
	const channel = url.searchParams.get("channel") ?? "debug";

	const stream = new ReadableStream<Uint8Array>({
		async start(controller) {
			// Simulated stream; replace with Valkey pubsub consumption
			writeEvent(controller, "message", { delta: `Connected to ${channel}` });
			const tokens = [
				"Hello",
				", ",
				"this ",
				"is ",
				"a ",
				"simulated ",
				"token ",
				"stream.",
			];
			for (const t of tokens) {
				await new Promise((r) => setTimeout(r, 120));
				writeEvent(controller, "message", { delta: t });
			}
			writeEvent(controller, "done");
			controller.close();
		},
		cancel() {
			// no-op for now
		},
	});

	return new Response(stream, { status: 200, headers: mergeHeaders(sseHeaders(), corsHeaders(req)) });
});

export const cancel = httpAction(async (_ctx, req) => {
	if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(req) });
	if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: corsHeaders(req) });
	// TODO: Cancel in Valkey/gateway
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: mergeHeaders(new Headers({ "Content-Type": "application/json" }), corsHeaders(req)),
	});
});

const http = httpRouter();
http.route({ path: "/api/generate", method: "POST", handler: generate });
http.route({ path: "/api/generate", method: "OPTIONS", handler: generate });
http.route({ path: "/api/stream", method: "GET", handler: stream });
http.route({ path: "/api/cancel", method: "POST", handler: cancel });
http.route({ path: "/api/cancel", method: "OPTIONS", handler: cancel });
export default http;
