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
const playwrightExample = document.getElementById("playwright-example");
const copyButtons = document.querySelectorAll("[data-copy-target]");

const origin = window.location.origin;
const defaultEndpoint = "/api/v1/featured";

function updateExamples() {
  heroSnippet.textContent = [
    "GET " + origin + "/api/v1/gadgets?limit=3&sort=rating_desc",
    "",
    "{",
    '  "meta": {',
    '    "page": 1,',
    '    "limit": 3,',
    '    "total": 16,',
    '    "sort": "rating_desc"',
    "  },",
    '  "data": [',
    '    { "id": 104, "name": "Atlas Note Pro 14", "rating": 4.9 },',
    '    { "id": 101, "name": "Nova X1", "rating": 4.8 },',
    '    { "id": 108, "name": "Solstice Studio 15", "rating": 4.8 }',
    "  ]",
    "}"
  ].join("\n");

  curlExample.textContent = `curl "${origin}/api/v1/search?name=tablet"`;

  fetchExample.textContent = [
    "const response = await fetch(",
    `  "${origin}/api/v1/gadgets?brand=BluePeak&limit=2"`,
    ");",
    "",
    "const payload = await response.json();",
    "console.log(payload.data);"
  ].join("\n");

  playwrightExample.textContent = [
    "import { test, expect } from '@playwright/test';",
    "",
    "test('featured endpoint returns records', async ({ request }) => {",
    `  const response = await request.get('${origin}/api/v1/featured');`,
    "  expect(response.ok()).toBeTruthy();",
    "",
    "  const payload = await response.json();",
    "  expect(payload.data.length).toBeGreaterThan(0);",
    "});"
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
  const endpoint = event.currentTarget.getAttribute("data-endpoint");
  if (!endpoint) {
    return;
  }

  const hasMatchingOption = Array.from(endpointSelect.options).some((option) => option.value === endpoint);
  if (hasMatchingOption) {
    endpointSelect.value = endpoint;
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

updateExamples();
window.setTimeout(() => {
  body.classList.add("is-ready");
}, 40);
loadEndpoint(defaultEndpoint);
