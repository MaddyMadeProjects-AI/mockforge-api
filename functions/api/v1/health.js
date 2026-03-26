import { buildHealthPayload, handleApiRequest, jsonResponse } from "./_lib/catalog.js";

export function onRequest(context) {
  return handleApiRequest(context.request, () =>
    jsonResponse(context.request, buildHealthPayload(), 200, "no-store")
  );
}
