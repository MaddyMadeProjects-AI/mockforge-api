import { getGadgetById, handleApiRequest, jsonResponse, notFoundResponse } from "../_lib/catalog.js";

export function onRequest(context) {
  return handleApiRequest(context.request, () => {
    const item = getGadgetById(context.params.id);
    if (!item) {
      return notFoundResponse(context.request, `No gadget found for id '${context.params.id}'.`);
    }

    return jsonResponse(context.request, { data: item });
  });
}
