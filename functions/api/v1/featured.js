import { getFeaturedGadgets, handleApiRequest, jsonResponse } from "./_lib/catalog.js";

export function onRequest(context) {
  return handleApiRequest(context.request, () => {
    const data = getFeaturedGadgets();
    return jsonResponse(context.request, {
      total: data.length,
      data
    });
  });
}
