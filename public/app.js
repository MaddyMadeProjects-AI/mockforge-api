const body = document.body;
const responsePanel = document.getElementById("response-panel");
const responsePath = document.getElementById("response-path");
const statusPill = document.getElementById("status-pill");
const endpointButtons = document.querySelectorAll("[data-endpoint]");
const form = document.getElementById("playground-form");
const endpointSelect = document.getElementById("endpoint-select");
const heroSnippet = document.getElementById("hero-snippet");
const curlExample = document.getElementById("curl-example");
const fetchExample = document.getElementById("fetch-example");
const webhookExample = document.getElementById("webhook-example");
const copyButtons = document.querySelectorAll("[data-copy-target]");
const webhookForm = document.getElementById("webhook-form");
const destinationUrlInput = document.getElementById("destination-url");
const useEchoButton = document.getElementById("use-echo-button");
const webhookResponsePanel = document.getElementById("webhook-response-panel");
const webhookStatusPill = document.getElementById("webhook-status-pill");
const copyBaseUrlButton = document.getElementById("copy-base-url");
const baseUrlLabel = document.getElementById("base-url-label");

const origin = window.location.origin;
const baseApiUrl = `${origin}/api/v1`;
const defaultEndpoint = "/api/v1/salesforce/summary";
const echoEndpoint = `${origin}/api/v1/webhooks/echo`;

function updateExamples() {
  heroSnippet.textContent = [
    "{",
    '  "eventId": "evt_3bafd2f3-....",',
    '  "eventType": "campaign.launched",',
    '  "source": "MockForge Salesforce Lab",',
    '  "objectType": "Campaign",',
    '  "recordId": "701900000000006AAA",',
    '  "data": {',
    '    "name": "Global RevOps Demo Series",',
    '    "status": "In Progress",',
    '    "expectedRevenue": 145000',
    "  }",
    "}"
  ].join("\n");

  curlExample.textContent = `curl "${origin}/api/v1/salesforce/products?family=Integration&sort=price_desc"`;

  fetchExample.textContent = [
    "const response = await fetch(",
    `  "${origin}/api/v1/salesforce/search?type=campaigns&q=global"`,
    ");",
    "",
    "const payload = await response.json();",
    "console.log(payload.data);"
  ].join("\n");

  webhookExample.textContent = [
    "curl -X POST \\",
    `  "${origin}/api/v1/salesforce/events/mock" \\`,
    '  -H "Content-Type: application/json" \\',
    "  -d '{",
    `    "destinationUrl": "${echoEndpoint}",`,
    '    "eventType": "campaign.launched",',
    '    "includeRecord": true',
    "  }'"
  ].join("\n");
}

function setActiveEndpoint(endpoint) {
  endpointButtons.forEach((button) => {
    const isMatch = button.getAttribute("data-endpoint") === endpoint;
    button.classList.toggle("is-active", isMatch);
  });
}

async function loadEndpoint(endpoint) {
  responsePath.textContent = endpoint;
  statusPill.textContent = "Loading";
  responsePanel.textContent = "Request in progress...";
  setActiveEndpoint(endpoint);

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json"
      }
    });

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const payload = await response.json();
      responsePanel.textContent = JSON.stringify(payload, null, 2);
    } else {
      const payload = await response.text();
      responsePanel.textContent = payload;
    }

    statusPill.textContent = `${response.status} ${response.statusText}`;
  } catch (error) {
    statusPill.textContent = "Request failed";
    responsePanel.textContent = JSON.stringify(
      {
        error: "request_failed",
        message: error.message
      },
      null,
      2
    );
  }
}

function handleEndpointButtonClick(event) {
  const button = event.currentTarget;
  const endpoint = button.getAttribute("data-endpoint");
  if (!endpoint) {
    return;
  }

  const hasMatchingOption = Array.from(endpointSelect.options).some((option) => option.value === endpoint);
  if (hasMatchingOption) {
    endpointSelect.value = endpoint;
  }

  const scrollTarget = button.getAttribute("data-scroll-target");
  if (scrollTarget) {
    const target = document.querySelector(scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  loadEndpoint(endpoint);
}

async function copySnippet(event) {
  const targetId = event.currentTarget.getAttribute("data-copy-target");
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  try {
    await navigator.clipboard.writeText(target.textContent);
    const previous = event.currentTarget.textContent;
    event.currentTarget.textContent = "Copied";
    window.setTimeout(() => {
      event.currentTarget.textContent = previous;
    }, 1200);
  } catch (error) {
    console.error(error);
  }
}

async function copyBaseUrl() {
  if (!copyBaseUrlButton) {
    return;
  }

  try {
    await navigator.clipboard.writeText(baseApiUrl);
    const previous = copyBaseUrlButton.textContent;
    copyBaseUrlButton.textContent = "Copied";
    window.setTimeout(() => {
      copyBaseUrlButton.textContent = previous;
    }, 1200);
  } catch (error) {
    console.error(error);
  }
}

async function sendWebhookTest(event) {
  event.preventDefault();

  webhookStatusPill.textContent = "Sending";
  webhookResponsePanel.textContent = "Sending mock event...";

  const formData = new FormData(webhookForm);
  const payload = {
    destinationUrl: formData.get("destinationUrl"),
    eventType: formData.get("eventType"),
    recordId: formData.get("recordId"),
    secret: formData.get("secret"),
    includeRecord: document.getElementById("include-record").checked
  };

  try {
    const response = await fetch("/api/v1/salesforce/events/mock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    webhookStatusPill.textContent = `${response.status} ${response.statusText}`;
    webhookResponsePanel.textContent = JSON.stringify(result, null, 2);
  } catch (error) {
    webhookStatusPill.textContent = "Request failed";
    webhookResponsePanel.textContent = JSON.stringify(
      {
        error: "request_failed",
        message: error.message
      },
      null,
      2
    );
  }
}

endpointButtons.forEach((button) => {
  button.addEventListener("click", handleEndpointButtonClick);
});

copyButtons.forEach((button) => {
  button.addEventListener("click", copySnippet);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadEndpoint(endpointSelect.value);
});

webhookForm.addEventListener("submit", sendWebhookTest);

useEchoButton.addEventListener("click", () => {
  destinationUrlInput.value = echoEndpoint;
});

destinationUrlInput.value = echoEndpoint;
if (baseUrlLabel) {
  baseUrlLabel.textContent = baseApiUrl;
}
if (copyBaseUrlButton) {
  copyBaseUrlButton.addEventListener("click", copyBaseUrl);
}
updateExamples();
window.setTimeout(() => {
  body.classList.add("is-ready");
}, 40);
loadEndpoint(defaultEndpoint);
webhookResponsePanel.textContent = JSON.stringify(
  {
    destinationUrl: echoEndpoint,
    note: "Use the form to send one of the Salesforce-style mock events to the default echo receiver or your own public HTTPS webhook URL."
  },
  null,
  2
);
