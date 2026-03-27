import { handleGetRequest, jsonResponse, listRecords } from "../_lib/salesforce.js";

export function onRequest(context) {
  return handleGetRequest(context.request, () => {
    const url = new URL(context.request.url);
    return jsonResponse(context.request, listRecords("users", url.searchParams));
  });
}
