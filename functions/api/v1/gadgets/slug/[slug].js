import { getGadgetBySlug, handleApiRequest, jsonResponse, notFoundResponse } from "../../_lib/catalog.js";

export function onRequest(context) {
  return handleApiRequest(context.request, () => {
    const item = getGadgetBySlug(context.params.slug);
    if (!item) {
      return notFoundResponse(context.request, `No gadget found for slug '${context.params.slug}'.`);
    }

    return jsonResponse(context.request, { data: item });
  });
}
