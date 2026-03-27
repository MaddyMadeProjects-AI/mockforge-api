import { errorResponse, getRecordById, handleGetRequest, jsonResponse } from "../../_lib/salesforce.js";

export function onRequest(context) {
  return handleGetRequest(context.request, () => {
    const item = getRecordById("tasks", context.params.id);
    if (!item) {
      return errorResponse(context.request, 404, "not_found", `No task found for id '${context.params.id}'.`);
    }

    return jsonResponse(context.request, { data: item });
  });
}
