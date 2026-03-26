import { handleApiRequest, jsonResponse, searchGadgets } from "./_lib/catalog.js";

export function onRequest(context) {
  return handleApiRequest(context.request, () => {
    const url = new URL(context.request.url);
    const query = url.searchParams.get("name") || "";

    if (!query.trim()) {
      return jsonResponse(context.request, {
        error: "missing_query",
        message: "Use ?name= to search gadgets."
      }, 400);
    }

    const data = searchGadgets(query);
    return jsonResponse(context.request, {
      meta: {
        query,
        total: data.length
      },
      data
    });
  });
}
