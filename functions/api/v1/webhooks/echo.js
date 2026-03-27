import { buildHeaders, errorResponse, handlePostRequest, jsonResponse, readJsonBody } from "../_lib/salesforce.js";

export function onRequest(context) {
  return handlePostRequest(context.request, async (mode) => {
    if (mode === "GET") {
      return jsonResponse(context.request, {
        name: "MockForge Echo Receiver",
        method: "POST",
        usage: "Send a JSON payload here to inspect inbound webhook deliveries."
      });
    }

    try {
      const payload = await readJsonBody(context.request);
      const echoedHeaders = Object.fromEntries(
        Array.from(context.request.headers.entries())
          .filter(([name]) => name.startsWith("content-") || name.startsWith("x-"))
      );

      return new Response(
        context.request.method.toUpperCase() === "HEAD"
          ? null
          : JSON.stringify({
              receivedAt: new Date().toISOString(),
              receivedBy: "MockForge Echo Receiver",
              headers: echoedHeaders,
              payload
            }, null, 2),
        {
          status: 200,
          headers: buildHeaders("application/json; charset=utf-8", "no-store", {
            "X-Mockforge-Receiver": "echo"
          })
        }
      );
    } catch (error) {
      return errorResponse(context.request, 400, "invalid_json", error.message);
    }
  }, true);
}
