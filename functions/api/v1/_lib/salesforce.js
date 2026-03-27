export const apiVersion = "2.0.0";

export const crmData = {
  leads: [
    {
      id: "00Q900000000001AAA",
      firstName: "Avery",
      lastName: "Nguyen",
      company: "Northwind Analytics",
      email: "avery.nguyen@northwind.example",
      status: "Working - Contacted",
      leadSource: "Web",
      owner: "Priya Shah",
      rating: "Hot",
      annualRevenue: 3200000,
      country: "United States",
      website: "https://northwind.example",
      createdAt: "2026-03-02T09:10:00Z",
      updatedAt: "2026-03-24T16:45:00Z"
    },
    {
      id: "00Q900000000002AAA",
      firstName: "Liam",
      lastName: "D'Souza",
      company: "BlueHarbor Retail",
      email: "liam.dsouza@blueharbor.example",
      status: "Open - Not Contacted",
      leadSource: "Partner Referral",
      owner: "Marcus Cole",
      rating: "Warm",
      annualRevenue: 880000,
      country: "India",
      website: "https://blueharbor.example",
      createdAt: "2026-03-04T12:00:00Z",
      updatedAt: "2026-03-21T10:25:00Z"
    },
    {
      id: "00Q900000000003AAA",
      firstName: "Fatima",
      lastName: "Rahman",
      company: "OrbitEdge Logistics",
      email: "fatima.rahman@orbitedge.example",
      status: "Nurturing",
      leadSource: "Event",
      owner: "Jules Carter",
      rating: "Warm",
      annualRevenue: 5200000,
      country: "United Kingdom",
      website: "https://orbitedge.example",
      createdAt: "2026-03-06T07:35:00Z",
      updatedAt: "2026-03-20T08:20:00Z"
    },
    {
      id: "00Q900000000004AAA",
      firstName: "Mason",
      lastName: "Patel",
      company: "Summit Health Grid",
      email: "mason.patel@summithealthgrid.example",
      status: "Qualified",
      leadSource: "API Import",
      owner: "Priya Shah",
      rating: "Hot",
      annualRevenue: 12100000,
      country: "Canada",
      website: "https://summithealthgrid.example",
      createdAt: "2026-03-08T14:15:00Z",
      updatedAt: "2026-03-25T18:05:00Z"
    },
    {
      id: "00Q900000000005AAA",
      firstName: "Sofia",
      lastName: "Kim",
      company: "Cinder Cloud",
      email: "sofia.kim@cindercloud.example",
      status: "Unqualified",
      leadSource: "Ad Campaign",
      owner: "Tariq Hudson",
      rating: "Cold",
      annualRevenue: 450000,
      country: "Singapore",
      website: "https://cindercloud.example",
      createdAt: "2026-03-11T11:42:00Z",
      updatedAt: "2026-03-18T12:12:00Z"
    },
    {
      id: "00Q900000000006AAA",
      firstName: "Noah",
      lastName: "Williams",
      company: "PeakStone Capital",
      email: "noah.williams@peakstone.example",
      status: "Working - Contacted",
      leadSource: "Demo Request",
      owner: "Marcus Cole",
      rating: "Hot",
      annualRevenue: 9800000,
      country: "Australia",
      website: "https://peakstone.example",
      createdAt: "2026-03-13T10:55:00Z",
      updatedAt: "2026-03-26T09:40:00Z"
    }
  ],
  accounts: [
    {
      id: "001900000000001AAA",
      name: "Northwind Analytics",
      industry: "SaaS",
      type: "Customer - Direct",
      tier: "Enterprise",
      owner: "Priya Shah",
      annualRevenue: 3200000,
      employeeCount: 180,
      billingCountry: "United States",
      website: "https://northwind.example",
      updatedAt: "2026-03-24T16:45:00Z"
    },
    {
      id: "001900000000002AAA",
      name: "BlueHarbor Retail",
      industry: "Retail",
      type: "Prospect",
      tier: "Mid-Market",
      owner: "Marcus Cole",
      annualRevenue: 880000,
      employeeCount: 64,
      billingCountry: "India",
      website: "https://blueharbor.example",
      updatedAt: "2026-03-21T10:25:00Z"
    },
    {
      id: "001900000000003AAA",
      name: "OrbitEdge Logistics",
      industry: "Logistics",
      type: "Customer - Channel",
      tier: "Enterprise",
      owner: "Jules Carter",
      annualRevenue: 5200000,
      employeeCount: 410,
      billingCountry: "United Kingdom",
      website: "https://orbitedge.example",
      updatedAt: "2026-03-20T08:20:00Z"
    },
    {
      id: "001900000000004AAA",
      name: "Summit Health Grid",
      industry: "Healthcare",
      type: "Customer - Direct",
      tier: "Strategic",
      owner: "Priya Shah",
      annualRevenue: 12100000,
      employeeCount: 900,
      billingCountry: "Canada",
      website: "https://summithealthgrid.example",
      updatedAt: "2026-03-25T18:05:00Z"
    },
    {
      id: "001900000000005AAA",
      name: "Cinder Cloud",
      industry: "Technology",
      type: "Prospect",
      tier: "SMB",
      owner: "Tariq Hudson",
      annualRevenue: 450000,
      employeeCount: 28,
      billingCountry: "Singapore",
      website: "https://cindercloud.example",
      updatedAt: "2026-03-18T12:12:00Z"
    }
  ],
  contacts: [
    {
      id: "003900000000001AAA",
      firstName: "Avery",
      lastName: "Nguyen",
      email: "avery.nguyen@northwind.example",
      title: "Revenue Operations Director",
      accountId: "001900000000001AAA",
      accountName: "Northwind Analytics",
      owner: "Priya Shah",
      lifecycleStatus: "Active",
      country: "United States",
      lastActivityAt: "2026-03-25T09:12:00Z"
    },
    {
      id: "003900000000002AAA",
      firstName: "Karan",
      lastName: "Mehta",
      email: "karan.mehta@blueharbor.example",
      title: "CRM Manager",
      accountId: "001900000000002AAA",
      accountName: "BlueHarbor Retail",
      owner: "Marcus Cole",
      lifecycleStatus: "Prospect",
      country: "India",
      lastActivityAt: "2026-03-22T07:40:00Z"
    },
    {
      id: "003900000000003AAA",
      firstName: "Fatima",
      lastName: "Rahman",
      email: "fatima.rahman@orbitedge.example",
      title: "VP Partnerships",
      accountId: "001900000000003AAA",
      accountName: "OrbitEdge Logistics",
      owner: "Jules Carter",
      lifecycleStatus: "Active",
      country: "United Kingdom",
      lastActivityAt: "2026-03-24T13:05:00Z"
    },
    {
      id: "003900000000004AAA",
      firstName: "Mason",
      lastName: "Patel",
      email: "mason.patel@summithealthgrid.example",
      title: "Systems Integration Lead",
      accountId: "001900000000004AAA",
      accountName: "Summit Health Grid",
      owner: "Priya Shah",
      lifecycleStatus: "Customer",
      country: "Canada",
      lastActivityAt: "2026-03-26T08:55:00Z"
    },
    {
      id: "003900000000005AAA",
      firstName: "Sofia",
      lastName: "Kim",
      email: "sofia.kim@cindercloud.example",
      title: "Growth Ops Specialist",
      accountId: "001900000000005AAA",
      accountName: "Cinder Cloud",
      owner: "Tariq Hudson",
      lifecycleStatus: "Prospect",
      country: "Singapore",
      lastActivityAt: "2026-03-19T15:20:00Z"
    },
    {
      id: "003900000000006AAA",
      firstName: "Noah",
      lastName: "Williams",
      email: "noah.williams@peakstone.example",
      title: "Head of RevTech",
      accountId: "001900000000001AAA",
      accountName: "Northwind Analytics",
      owner: "Marcus Cole",
      lifecycleStatus: "Active",
      country: "Australia",
      lastActivityAt: "2026-03-26T09:40:00Z"
    }
  ],
  opportunities: [
    {
      id: "006900000000001AAA",
      name: "Northwind Analytics Platform Expansion",
      accountId: "001900000000001AAA",
      accountName: "Northwind Analytics",
      stage: "Proposal/Price Quote",
      amount: 185000,
      probability: 75,
      closeDate: "2026-04-18",
      owner: "Priya Shah",
      type: "Existing Customer - Upgrade",
      nextStep: "Finalize security review",
      region: "North America",
      updatedAt: "2026-03-26T09:10:00Z"
    },
    {
      id: "006900000000002AAA",
      name: "BlueHarbor CRM Rollout",
      accountId: "001900000000002AAA",
      accountName: "BlueHarbor Retail",
      stage: "Qualification",
      amount: 42000,
      probability: 35,
      closeDate: "2026-05-08",
      owner: "Marcus Cole",
      type: "New Customer",
      nextStep: "Schedule solution workshop",
      region: "APAC",
      updatedAt: "2026-03-22T07:40:00Z"
    },
    {
      id: "006900000000003AAA",
      name: "OrbitEdge Service Cloud Migration",
      accountId: "001900000000003AAA",
      accountName: "OrbitEdge Logistics",
      stage: "Negotiation/Review",
      amount: 210000,
      probability: 80,
      closeDate: "2026-04-05",
      owner: "Jules Carter",
      type: "Renewal",
      nextStep: "Finalize commercial terms",
      region: "EMEA",
      updatedAt: "2026-03-24T13:05:00Z"
    },
    {
      id: "006900000000004AAA",
      name: "Summit Health Grid Integration Hub",
      accountId: "001900000000004AAA",
      accountName: "Summit Health Grid",
      stage: "Closed Won",
      amount: 480000,
      probability: 100,
      closeDate: "2026-03-20",
      owner: "Priya Shah",
      type: "New Customer",
      nextStep: "Kickoff implementation",
      region: "North America",
      updatedAt: "2026-03-25T18:05:00Z"
    },
    {
      id: "006900000000005AAA",
      name: "Cinder Cloud Sales Ops Pilot",
      accountId: "001900000000005AAA",
      accountName: "Cinder Cloud",
      stage: "Needs Analysis",
      amount: 18000,
      probability: 25,
      closeDate: "2026-05-19",
      owner: "Tariq Hudson",
      type: "New Customer",
      nextStep: "Confirm integration scope",
      region: "APAC",
      updatedAt: "2026-03-19T15:20:00Z"
    }
  ],
  cases: [
    {
      id: "500900000000001AAA",
      subject: "Webhook signature mismatch on inbound lead sync",
      accountId: "001900000000001AAA",
      accountName: "Northwind Analytics",
      contactName: "Avery Nguyen",
      priority: "High",
      status: "Working",
      origin: "Web",
      owner: "Support Queue - Integrations",
      reason: "API",
      slaHours: 8,
      createdAt: "2026-03-24T05:30:00Z",
      updatedAt: "2026-03-26T08:05:00Z"
    },
    {
      id: "500900000000002AAA",
      subject: "Opportunity sync job missing account mapping",
      accountId: "001900000000002AAA",
      accountName: "BlueHarbor Retail",
      contactName: "Karan Mehta",
      priority: "Medium",
      status: "New",
      origin: "Email",
      owner: "Marcus Cole",
      reason: "Configuration",
      slaHours: 16,
      createdAt: "2026-03-22T11:22:00Z",
      updatedAt: "2026-03-22T11:22:00Z"
    },
    {
      id: "500900000000003AAA",
      subject: "Sandbox callback endpoint returning 401",
      accountId: "001900000000003AAA",
      accountName: "OrbitEdge Logistics",
      contactName: "Fatima Rahman",
      priority: "High",
      status: "Escalated",
      origin: "Phone",
      owner: "Support Queue - Integrations",
      reason: "Authentication",
      slaHours: 4,
      createdAt: "2026-03-25T10:00:00Z",
      updatedAt: "2026-03-26T04:50:00Z"
    },
    {
      id: "500900000000004AAA",
      subject: "Case event payload needs custom field sample",
      accountId: "001900000000004AAA",
      accountName: "Summit Health Grid",
      contactName: "Mason Patel",
      priority: "Low",
      status: "Waiting on Customer",
      origin: "Portal",
      owner: "Priya Shah",
      reason: "Enhancement",
      slaHours: 48,
      createdAt: "2026-03-21T09:15:00Z",
      updatedAt: "2026-03-23T12:10:00Z"
    },
    {
      id: "500900000000005AAA",
      subject: "Outbound test event timed out at destination",
      accountId: "001900000000005AAA",
      accountName: "Cinder Cloud",
      contactName: "Sofia Kim",
      priority: "Medium",
      status: "Closed",
      origin: "Chat",
      owner: "Tariq Hudson",
      reason: "Network",
      slaHours: 12,
      createdAt: "2026-03-19T15:35:00Z",
      updatedAt: "2026-03-20T06:18:00Z"
    }
  ]
};

export const eventPresets = {
  "lead.created": { recordType: "leads", title: "New lead captured from web-to-lead" },
  "lead.converted": { recordType: "leads", title: "Qualified lead converted into pipeline" },
  "account.updated": { recordType: "accounts", title: "Account profile updated in CRM" },
  "contact.synced": { recordType: "contacts", title: "Contact pushed to downstream system" },
  "opportunity.closed_won": { recordType: "opportunities", title: "Closed won opportunity sync" },
  "case.escalated": { recordType: "cases", title: "Customer support case escalation" }
};

const securityHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Resource-Policy": "cross-origin",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
};

const objectLabels = {
  leads: "Lead",
  accounts: "Account",
  contacts: "Contact",
  opportunities: "Opportunity",
  cases: "Case"
};

export function buildHeaders(contentType, cacheControl = "no-store", extraHeaders = {}) {
  const headers = new Headers(securityHeaders);
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", cacheControl);

  for (const [key, value] of Object.entries(extraHeaders)) {
    headers.set(key, value);
  }

  return headers;
}

export function optionsResponse(allowedMethods = "GET, HEAD, POST, OPTIONS") {
  return new Response(null, {
    status: 204,
    headers: buildHeaders("application/json; charset=utf-8", "no-store", {
      "Access-Control-Allow-Methods": allowedMethods
    })
  });
}

export function jsonResponse(request, payload, status = 200, cacheControl = "no-store") {
  const body = request.method.toUpperCase() === "HEAD" ? null : JSON.stringify(payload, null, 2);
  return new Response(body, {
    status,
    headers: buildHeaders("application/json; charset=utf-8", cacheControl)
  });
}

export function methodNotAllowed(request, allowedDescription) {
  return jsonResponse(request, {
    error: "method_not_allowed",
    message: `Only ${allowedDescription} requests are supported.`
  }, 405);
}

export function errorResponse(request, status, error, message) {
  return jsonResponse(request, { error, message }, status);
}

export function handleGetRequest(request, handler) {
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return optionsResponse("GET, HEAD, OPTIONS");
  }

  if (method !== "GET" && method !== "HEAD") {
    return methodNotAllowed(request, "GET, HEAD, and OPTIONS");
  }

  try {
    return handler();
  } catch {
    return errorResponse(request, 500, "internal_server_error", "The server could not process this request.");
  }
}

export function handlePostRequest(request, handler, allowGet = false) {
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return optionsResponse(allowGet ? "GET, HEAD, POST, OPTIONS" : "POST, OPTIONS");
  }

  if (allowGet && (method === "GET" || method === "HEAD")) {
    try {
      return handler("GET");
    } catch {
      return errorResponse(request, 500, "internal_server_error", "The server could not process this request.");
    }
  }

  if (method !== "POST") {
    return methodNotAllowed(request, allowGet ? "GET, HEAD, POST, and OPTIONS" : "POST and OPTIONS");
  }

  return handler("POST");
}

export function getSummaryPayload() {
  return {
    totals: {
      leads: crmData.leads.length,
      accounts: crmData.accounts.length,
      contacts: crmData.contacts.length,
      opportunities: crmData.opportunities.length,
      cases: crmData.cases.length,
      eventPresets: Object.keys(eventPresets).length
    },
    supportedEvents: Object.keys(eventPresets)
  };
}

export function getHealthPayload() {
  return {
    status: "ok",
    version: apiVersion,
    timestamp: new Date().toISOString(),
    datasets: getSummaryPayload().totals,
    runtime: "cloudflare-pages-functions",
    integrationModes: ["inbound", "outbound"]
  };
}

export function listRecords(type, searchParams) {
  const collection = getCollection(type);
  const filters = {};
  const limit = clampInt(searchParams.get("limit"), 10, 1, 50);
  const page = clampInt(searchParams.get("page"), 1, 1, 500);
  const sort = (searchParams.get("sort") || "updated_desc").toLowerCase();

  let items = collection.slice();

  for (const [key, value] of searchParams.entries()) {
    if (!value || ["limit", "page", "sort"].includes(key)) {
      continue;
    }

    filters[key] = value;
    const normalized = normalize(value);

    items = items.filter((item) => {
      if (key === "minAmount") {
        return Number(item.amount || 0) >= Number(value);
      }

      if (key === "maxAmount") {
        return Number(item.amount || 0) <= Number(value);
      }

      return normalize(item[key]).includes(normalized);
    });
  }

  const normalizedSort = applySort(items, sort);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    meta: {
      object: type,
      page,
      limit,
      total,
      totalPages,
      filters,
      sort: normalizedSort
    },
    data: items.slice(start, start + limit)
  };
}

export function getRecordById(type, id) {
  const collection = getCollection(type);
  return collection.find((item) => item.id === id) || null;
}

export function searchRecords(type, query) {
  const needle = normalize(query);
  if (!needle) {
    return [];
  }

  const collection = getCollection(type);
  return collection.filter((item) =>
    Object.values(item).some((value) => normalize(flattenValue(value)).includes(needle))
  );
}

export function getRecordTypes() {
  return Object.keys(crmData);
}

export function getObjectLabel(type) {
  return objectLabels[type] || "Record";
}

export function getCollection(type) {
  const collection = crmData[type];
  if (!collection) {
    throw new Error(`Unknown collection: ${type}`);
  }

  return collection;
}

export async function createOutboundEventPayload({ eventType, recordId, includeRecord = true }) {
  const preset = eventPresets[eventType];
  if (!preset) {
    throw new Error("Unsupported event type.");
  }

  const collection = getCollection(preset.recordType);
  const record = recordId ? collection.find((item) => item.id === recordId) : collection[0];
  if (!record) {
    throw new Error("Record not found for the selected event.");
  }

  return {
    eventId: `evt_${crypto.randomUUID()}`,
    eventType,
    title: preset.title,
    emittedAt: new Date().toISOString(),
    source: "MockForge Salesforce Lab",
    objectType: getObjectLabel(preset.recordType),
    recordId: record.id,
    data: includeRecord ? record : buildRecordSummary(record)
  };
}

export async function signPayload(payload, secret) {
  if (!secret) {
    return null;
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const signatureBytes = Array.from(new Uint8Array(signatureBuffer));
  const hex = signatureBytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `sha256=${hex}`;
}

export function validateDestinationUrl(destinationUrl) {
  let parsedUrl;

  try {
    parsedUrl = new URL(destinationUrl);
  } catch {
    return { valid: false, message: "Provide a valid absolute destination URL." };
  }

  if (parsedUrl.protocol !== "https:") {
    return { valid: false, message: "Only HTTPS destination URLs are allowed." };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const blockedHosts = ["localhost", "127.0.0.1", "::1"];

  if (blockedHosts.includes(hostname) || hostname.endsWith(".local")) {
    return { valid: false, message: "Local and private destinations are blocked for safety." };
  }

  if (/^10\./.test(hostname) || /^192\.168\./.test(hostname) || /^169\.254\./.test(hostname)) {
    return { valid: false, message: "Private destination networks are blocked for safety." };
  }

  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)) {
    return { valid: false, message: "Private destination networks are blocked for safety." };
  }

  return { valid: true, url: parsedUrl };
}

export async function readJsonBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Requests must use application/json.");
  }

  return request.json();
}

function buildRecordSummary(record) {
  return Object.fromEntries(
    Object.entries(record).slice(0, 6)
  );
}

function applySort(items, sort) {
  switch (sort) {
    case "name_asc":
      items.sort((left, right) => normalize(left.name || left.subject || left.firstName).localeCompare(normalize(right.name || right.subject || right.firstName)));
      return "name_asc";
    case "amount_desc":
      items.sort((left, right) => Number(right.amount || 0) - Number(left.amount || 0));
      return "amount_desc";
    case "closedate_asc":
      items.sort((left, right) => normalize(left.closeDate).localeCompare(normalize(right.closeDate)));
      return "closeDate_asc";
    default:
      items.sort((left, right) => normalize(right.updatedAt || right.lastActivityAt || right.createdAt).localeCompare(normalize(left.updatedAt || left.lastActivityAt || left.createdAt)));
      return "updated_desc";
  }
}

function flattenValue(value) {
  if (Array.isArray(value)) {
    return value.join(" ");
  }

  if (value && typeof value === "object") {
    return Object.values(value).join(" ");
  }

  return String(value ?? "");
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function clampInt(value, fallback, min, max) {
  const parsed = Number.parseInt(value || "", 10);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, parsed));
}
