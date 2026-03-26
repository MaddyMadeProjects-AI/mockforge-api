import { getCountsByProperty, handleApiRequest, jsonResponse } from "./_lib/catalog.js";

export function onRequest(context) {
  return handleApiRequest(context.request, () => {
    const rows = getCountsByProperty("brand");
    return jsonResponse(context.request, {
      total: rows.length,
      data: rows
    });
  });
}
