import { getHealthPayload, handleGetRequest, jsonResponse } from "./_lib/salesforce.js";

export function onRequest(context) {
  return handleGetRequest(context.request, () =>
    jsonResponse(context.request, getHealthPayload(), 200, "no-store")
  );
}
