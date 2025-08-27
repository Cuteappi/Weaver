import { httpRouter } from "convex/server";
import { workosWebhook } from "./workosWebHook";


const http = httpRouter();


http.route({
	path: "/workos/web-hook",
	method: "POST",
	handler: workosWebhook,
});


export default http;
