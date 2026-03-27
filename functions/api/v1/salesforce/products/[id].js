import { errorResponse, getRecordById, handleGetRequest, jsonResponse } from "../../_lib/salesforce.js";

export function onRequest(context) {
  return handleGetRequest(context.request, () => {
    const item = getRecordById("products", context.params.id);
    if (!item) {
      return errorResponse(context.request, 404, "not_found", `No product found for id '${context.params.id}'.`);
    }

    return jsonResponse(context.request, { data: item });
  });
}
