import { getFilteredGadgets, handleApiRequest, jsonResponse } from "./_lib/catalog.js";

export function onRequest(context) {
  return handleApiRequest(context.request, () => {
    const url = new URL(context.request.url);
    return jsonResponse(context.request, getFilteredGadgets(url.searchParams));
  });
}
