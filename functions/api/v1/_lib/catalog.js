export const apiVersion = "1.1.0";

export const gadgets = [
  {
    id: 101,
    slug: "nova-x1",
    name: "Nova X1",
    category: "smartphones",
    brand: "NovaTech",
    priceUsd: 699,
    rating: 4.8,
    stockStatus: "in_stock",
    releaseYear: 2025,
    image: "/assets/mockforge-mark.svg",
    tags: ["5g", "oled", "128gb"],
    summary: "Flagship smartphone with a bright OLED panel, fast charging, and all-day battery life.",
    specs: {
      display: "6.4-inch OLED",
      battery: "4700 mAh",
      connectivity: ["5G", "Wi-Fi 6E", "Bluetooth 5.4"],
      storage: "128 GB"
    }
  },
  {
    id: 102,
    slug: "nova-x1-lite",
    name: "Nova X1 Lite",
    category: "smartphones",
    brand: "NovaTech",
    priceUsd: 449,
    rating: 4.4,
    stockStatus: "in_stock",
    releaseYear: 2025,
    image: "/assets/mockforge-mark.svg",
    tags: ["budget", "5g", "dual-sim"],
    summary: "Balanced mid-range phone designed for test data around pricing, filtering, and mobile catalog flows.",
    specs: {
      display: "6.1-inch AMOLED",
      battery: "4300 mAh",
      connectivity: ["5G", "Wi-Fi 6", "Bluetooth 5.3"],
      storage: "128 GB"
    }
  },
  {
    id: 103,
    slug: "orbit-slate-11",
    name: "Orbit Slate 11",
    category: "tablets",
    brand: "Orbit Labs",
    priceUsd: 579,
    rating: 4.6,
    stockStatus: "limited",
    releaseYear: 2024,
    image: "/assets/mockforge-mark.svg",
    tags: ["tablet", "stylus", "wifi"],
    summary: "Productivity tablet with a crisp screen and optional pen support for mock productivity app scenarios.",
    specs: {
      display: "11-inch IPS",
      battery: "8200 mAh",
      connectivity: ["Wi-Fi 6", "Bluetooth 5.2", "USB-C"],
      storage: "256 GB"
    }
  },
  {
    id: 104,
    slug: "atlas-note-pro-14",
    name: "Atlas Note Pro 14",
    category: "laptops",
    brand: "Atlas Works",
    priceUsd: 1299,
    rating: 4.9,
    stockStatus: "in_stock",
    releaseYear: 2025,
    image: "/assets/mockforge-mark.svg",
    tags: ["creator", "oled", "16gb"],
    summary: "Premium laptop built for filtering by high price, featured lists, and premium inventory states.",
    specs: {
      display: "14-inch OLED",
      battery: "76 Wh",
      connectivity: ["Wi-Fi 7", "Bluetooth 5.4", "Thunderbolt 4"],
      storage: "1 TB SSD"
    }
  },
  {
    id: 105,
    slug: "ember-beat-mini",
    name: "Ember Beat Mini",
    category: "audio",
    brand: "Ember Audio",
    priceUsd: 119,
    rating: 4.3,
    stockStatus: "in_stock",
    releaseYear: 2024,
    image: "/assets/mockforge-mark.svg",
    tags: ["speaker", "portable", "bluetooth"],
    summary: "Pocket-sized speaker with a warm sound profile and compact metadata for lightweight response payloads.",
    specs: {
      display: "LED status strip",
      battery: "18 hours",
      connectivity: ["Bluetooth 5.3", "USB-C"],
      storage: "N/A"
    }
  },
  {
    id: 106,
    slug: "bluepeak-pulse-s",
    name: "BluePeak Pulse S",
    category: "wearables",
    brand: "BluePeak",
    priceUsd: 249,
    rating: 4.5,
    stockStatus: "in_stock",
    releaseYear: 2025,
    image: "/assets/mockforge-mark.svg",
    tags: ["fitness", "gps", "health"],
    summary: "Health-focused smartwatch with GPS and workout modes, ideal for testing filtering by wearables and ratings.",
    specs: {
      display: "1.9-inch AMOLED",
      battery: "9 days",
      connectivity: ["Bluetooth 5.4", "GPS", "NFC"],
      storage: "32 GB"
    }
  },
  {
    id: 107,
    slug: "drift-console-go",
    name: "Drift Console Go",
    category: "gaming",
    brand: "Drift Interactive",
    priceUsd: 399,
    rating: 4.7,
    stockStatus: "limited",
    releaseYear: 2024,
    image: "/assets/mockforge-mark.svg",
    tags: ["gaming", "handheld", "wifi"],
    summary: "Portable gaming system with a loyal fan base and enough shape in the data for search and spotlight endpoints.",
    specs: {
      display: "7-inch IPS",
      battery: "6 hours",
      connectivity: ["Wi-Fi 6", "Bluetooth 5.2", "USB-C"],
      storage: "512 GB"
    }
  },
  {
    id: 108,
    slug: "solstice-studio-15",
    name: "Solstice Studio 15",
    category: "laptops",
    brand: "Solstice Systems",
    priceUsd: 1549,
    rating: 4.8,
    stockStatus: "in_stock",
    releaseYear: 2025,
    image: "/assets/mockforge-mark.svg",
    tags: ["studio", "performance", "32gb"],
    summary: "Large-screen creator laptop with performance specs and premium pricing for enterprise-like testing data.",
    specs: {
      display: "15.6-inch Mini LED",
      battery: "86 Wh",
      connectivity: ["Wi-Fi 7", "Bluetooth 5.4", "USB4"],
      storage: "2 TB SSD"
    }
  },
  {
    id: 109,
    slug: "orbit-slate-mini",
    name: "Orbit Slate Mini",
    category: "tablets",
    brand: "Orbit Labs",
    priceUsd: 329,
    rating: 4.2,
    stockStatus: "in_stock",
    releaseYear: 2023,
    image: "/assets/mockforge-mark.svg",
    tags: ["compact", "tablet", "reading"],
    summary: "Smaller tablet that helps test older release years, lower price bands, and compact device groupings.",
    specs: {
      display: "8.7-inch LCD",
      battery: "6000 mAh",
      connectivity: ["Wi-Fi 5", "Bluetooth 5.1", "USB-C"],
      storage: "128 GB"
    }
  },
  {
    id: 110,
    slug: "atlas-pad-air",
    name: "Atlas Pad Air",
    category: "tablets",
    brand: "Atlas Works",
    priceUsd: 689,
    rating: 4.7,
    stockStatus: "in_stock",
    releaseYear: 2025,
    image: "/assets/mockforge-mark.svg",
    tags: ["tablet", "5g", "premium"],
    summary: "Premium tablet with cellular support and a bright display, useful for filter combinations across brand and category.",
    specs: {
      display: "12.4-inch OLED",
      battery: "9800 mAh",
      connectivity: ["5G", "Wi-Fi 6E", "Bluetooth 5.3"],
      storage: "512 GB"
    }
  },
  {
    id: 111,
    slug: "ember-beat-max",
    name: "Ember Beat Max",
    category: "audio",
    brand: "Ember Audio",
    priceUsd: 189,
    rating: 4.6,
    stockStatus: "in_stock",
    releaseYear: 2025,
    image: "/assets/mockforge-mark.svg",
    tags: ["speaker", "party", "water-resistant"],
    summary: "Larger wireless speaker with party mode and sturdy battery stats for audio-focused mock responses.",
    specs: {
      display: "LED matrix controls",
      battery: "24 hours",
      connectivity: ["Bluetooth 5.4", "USB-C", "AUX"],
      storage: "N/A"
    }
  },
  {
    id: 112,
    slug: "bluepeak-run-se",
    name: "BluePeak Run SE",
    category: "wearables",
    brand: "BluePeak",
    priceUsd: 179,
    rating: 4.1,
    stockStatus: "in_stock",
    releaseYear: 2024,
    image: "/assets/mockforge-mark.svg",
    tags: ["watch", "budget", "fitness"],
    summary: "Budget fitness watch that gives developers more realistic data variance in reviews, price, and specs.",
    specs: {
      display: "1.7-inch AMOLED",
      battery: "12 days",
      connectivity: ["Bluetooth 5.2", "GPS"],
      storage: "16 GB"
    }
  },
  {
    id: 113,
    slug: "drift-pulse-g7",
    name: "Drift Pulse G7",
    category: "smartphones",
    brand: "Drift Interactive",
    priceUsd: 799,
    rating: 4.7,
    stockStatus: "limited",
    releaseYear: 2025,
    image: "/assets/mockforge-mark.svg",
    tags: ["gaming-phone", "144hz", "5g"],
    summary: "Gaming-first smartphone with an aggressive cooling system and high refresh display for enthusiast use cases.",
    specs: {
      display: "6.8-inch AMOLED 144Hz",
      battery: "5200 mAh",
      connectivity: ["5G", "Wi-Fi 7", "Bluetooth 5.4"],
      storage: "256 GB"
    }
  },
  {
    id: 114,
    slug: "nova-hub-one",
    name: "Nova Hub One",
    category: "audio",
    brand: "NovaTech",
    priceUsd: 149,
    rating: 4.4,
    stockStatus: "in_stock",
    releaseYear: 2023,
    image: "/assets/mockforge-mark.svg",
    tags: ["smart-speaker", "assistant", "wifi"],
    summary: "Voice-ready smart speaker with enough product fields to test catalog pages and IoT-style classifications.",
    specs: {
      display: "Touch top panel",
      battery: "Plug-in only",
      connectivity: ["Wi-Fi 6", "Bluetooth 5.2"],
      storage: "N/A"
    }
  },
  {
    id: 115,
    slug: "bluepeak-flexbook-13",
    name: "BluePeak Flexbook 13",
    category: "laptops",
    brand: "BluePeak",
    priceUsd: 999,
    rating: 4.5,
    stockStatus: "in_stock",
    releaseYear: 2024,
    image: "/assets/mockforge-mark.svg",
    tags: ["convertible", "touch", "lightweight"],
    summary: "Convertible laptop-tablet hybrid made for mock storefronts that need richer filtering and comparison paths.",
    specs: {
      display: "13.3-inch touch IPS",
      battery: "68 Wh",
      connectivity: ["Wi-Fi 6E", "Bluetooth 5.3", "USB-C"],
      storage: "512 GB SSD"
    }
  },
  {
    id: 116,
    slug: "drift-arcade-dock",
    name: "Drift Arcade Dock",
    category: "gaming",
    brand: "Drift Interactive",
    priceUsd: 129,
    rating: 4.3,
    stockStatus: "preorder",
    releaseYear: 2026,
    image: "/assets/mockforge-mark.svg",
    tags: ["dock", "gaming", "accessory"],
    summary: "Docking accessory for handheld gaming setups, useful for testing preorder and future release data paths.",
    specs: {
      display: "Status LEDs",
      battery: "Plug-in only",
      connectivity: ["HDMI", "USB-C", "Ethernet"],
      storage: "N/A"
    }
  }
];

const securityHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Resource-Policy": "cross-origin",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
};

export function handleApiRequest(request, handler) {
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: buildHeaders("application/json; charset=utf-8", "no-store")
    });
  }

  if (method !== "GET" && method !== "HEAD") {
    return jsonResponse(
      request,
      {
        error: "method_not_allowed",
        message: "Only GET, HEAD, and OPTIONS are supported."
      },
      405
    );
  }

  try {
    return handler();
  } catch {
    return jsonResponse(
      request,
      {
        error: "internal_server_error",
        message: "The server could not process this request."
      },
      500
    );
  }
}

export function jsonResponse(request, payload, status = 200, cacheControl = "public, max-age=300") {
  const body = request.method.toUpperCase() === "HEAD" ? null : JSON.stringify(payload, null, 2);
  return new Response(body, {
    status,
    headers: buildHeaders("application/json; charset=utf-8", cacheControl)
  });
}

export function notFoundResponse(request, message = "This API route does not exist.") {
  return jsonResponse(
    request,
    {
      error: "not_found",
      message
    },
    404
  );
}

export function buildHealthPayload() {
  return {
    status: "ok",
    version: apiVersion,
    timestamp: new Date().toISOString(),
    dataset: {
      gadgets: gadgets.length,
      categories: getCountsByProperty("category").length,
      brands: getCountsByProperty("brand").length
    },
    runtime: "cloudflare-pages-functions"
  };
}

export function getFilteredGadgets(searchParams) {
  const category = normalize(searchParams.get("category"));
  const brand = normalize(searchParams.get("brand"));
  const minPrice = toNumber(searchParams.get("minPrice"));
  const maxPrice = toNumber(searchParams.get("maxPrice"));
  const sort = (searchParams.get("sort") || "name_asc").toLowerCase();
  const limit = clampInt(searchParams.get("limit"), 12, 1, 50);
  const page = clampInt(searchParams.get("page"), 1, 1, 500);

  let items = gadgets.slice();
  const filters = {};

  if (category) {
    items = items.filter((item) => normalize(item.category) === category);
    filters.category = searchParams.get("category");
  }

  if (brand) {
    items = items.filter((item) => normalize(item.brand) === brand);
    filters.brand = searchParams.get("brand");
  }

  if (minPrice !== null) {
    items = items.filter((item) => item.priceUsd >= minPrice);
    filters.minPrice = minPrice;
  }

  if (maxPrice !== null) {
    items = items.filter((item) => item.priceUsd <= maxPrice);
    filters.maxPrice = maxPrice;
  }

  const normalizedSort = applySort(items, sort);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages,
      filters,
      sort: normalizedSort
    },
    data
  };
}

export function getGadgetById(id) {
  return gadgets.find((item) => item.id === Number(id)) || null;
}

export function getGadgetBySlug(slug) {
  return gadgets.find((item) => item.slug === slug) || null;
}

export function searchGadgets(searchTerm) {
  const term = normalize(searchTerm);
  if (!term) {
    return [];
  }

  return gadgets.filter((item) => {
    const haystack = [
      item.name,
      item.brand,
      item.category,
      item.summary,
      item.tags.join(" ")
    ].join(" ");

    return normalize(haystack).includes(term);
  });
}

export function getCountsByProperty(propertyName) {
  const counts = new Map();
  for (const item of gadgets) {
    counts.set(item[propertyName], (counts.get(item[propertyName]) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function getFeaturedGadgets() {
  return gadgets
    .slice()
    .sort((left, right) => {
      if (right.rating !== left.rating) {
        return right.rating - left.rating;
      }

      return right.releaseYear - left.releaseYear;
    })
    .slice(0, 6);
}

export function getRandomGadget() {
  return gadgets[Math.floor(Math.random() * gadgets.length)];
}

function buildHeaders(contentType, cacheControl) {
  const headers = new Headers(securityHeaders);
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", cacheControl);
  return headers;
}

function applySort(items, sort) {
  switch (sort) {
    case "price_desc":
      items.sort((left, right) => right.priceUsd - left.priceUsd);
      return "price_desc";
    case "price_asc":
      items.sort((left, right) => left.priceUsd - right.priceUsd);
      return "price_asc";
    case "rating_desc":
      items.sort((left, right) => right.rating - left.rating);
      return "rating_desc";
    case "year_desc":
      items.sort((left, right) => right.releaseYear - left.releaseYear);
      return "year_desc";
    default:
      items.sort((left, right) => left.name.localeCompare(right.name));
      return "name_asc";
  }
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function clampInt(value, fallback, min, max) {
  const parsed = Number.parseInt(value || "", 10);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, parsed));
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}
