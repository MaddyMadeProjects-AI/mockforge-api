import { getRandomGadget, handleApiRequest, jsonResponse } from "./_lib/catalog.js";

export function onRequest(context) {
  return handleApiRequest(context.request, () =>
    jsonResponse(context.request, {
      data: getRandomGadget()
    })
  );
}
