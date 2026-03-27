import { errorResponse, getRecordTypes, handleGetRequest, jsonResponse, searchRecords } from "../_lib/salesforce.js";

export function onRequest(context) {
  return handleGetRequest(context.request, () => {
    const url = new URL(context.request.url);
    const type = (url.searchParams.get("type") || "").toLowerCase();
    const query = url.searchParams.get("q") || "";
    const supportedTypes = getRecordTypes();

    if (!type || !supportedTypes.includes(type)) {
      return errorResponse(
        context.request,
        400,
        "invalid_type",
        `Use a valid object type such as ${supportedTypes.join(", ")}.`
      );
    }

    if (!query.trim()) {
      return errorResponse(context.request, 400, "missing_query", "Use ?q= to search Salesforce-style records.");
    }

    const data = searchRecords(type, query);
    return jsonResponse(context.request, {
      meta: {
        type,
        query,
        total: data.length
      },
      data
    });
  });
}
