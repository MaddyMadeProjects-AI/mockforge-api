import {
  createOutboundEventPayload,
  errorResponse,
  eventPresets,
  handlePostRequest,
  jsonResponse,
  readJsonBody,
  signPayload,
  validateDestinationUrl
} from "../../_lib/salesforce.js";

export function onRequest(context) {
  return handlePostRequest(context.request, async () => {
    let payload;

    try {
      payload = await readJsonBody(context.request);
    } catch (error) {
      return errorResponse(context.request, 400, "invalid_json", error.message);
    }

    const eventType = payload.eventType || "";
    const destinationUrl = payload.destinationUrl || "";
    const includeRecord = payload.includeRecord !== false;
    const secret = payload.secret || "";

    if (!eventPresets[eventType]) {
      return errorResponse(context.request, 400, "invalid_event_type", "Choose a supported Salesforce mock event.");
    }

    const destinationCheck = validateDestinationUrl(destinationUrl);
    if (!destinationCheck.valid) {
      return errorResponse(context.request, 400, "invalid_destination", destinationCheck.message);
    }

    let eventPayload;
    try {
      eventPayload = await createOutboundEventPayload({
        eventType,
        recordId: payload.recordId || "",
        includeRecord
      });
    } catch (error) {
      return errorResponse(context.request, 400, "invalid_record", error.message);
    }

    const serializedPayload = JSON.stringify(eventPayload);
    const signature = await signPayload(serializedPayload, secret);

    let deliveryResponse;
    try {
      deliveryResponse = await fetch(destinationCheck.url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "MockForge-Salesforce-Lab",
          "X-MockForge-Event": eventType,
          "X-MockForge-Record-Type": eventPresets[eventType].recordType,
          ...(signature ? { "X-MockForge-Signature": signature } : {})
        },
        body: serializedPayload,
        redirect: "manual"
      });
    } catch (error) {
      return jsonResponse(context.request, {
        delivered: false,
        destinationUrl: destinationCheck.url.toString(),
        deliveryError: error.message,
        event: eventPayload
      }, 502);
    }

    const responseText = await deliveryResponse.text();

    return jsonResponse(context.request, {
      delivered: deliveryResponse.ok,
      destinationUrl: destinationCheck.url.toString(),
      destinationStatus: deliveryResponse.status,
      destinationStatusText: deliveryResponse.statusText,
      signature,
      event: eventPayload,
      responsePreview: responseText.slice(0, 1200)
    });
  });
}
