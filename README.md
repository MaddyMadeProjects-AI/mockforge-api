# MockForge API

MockForge API is a free public mock-data website for developers, testers, and QA teams who need realistic API responses without auth, paid plans, or a database.

This version is structured for long-term free hosting on Cloudflare Pages + Pages Functions.

## Why This Hosting Model

The project is designed so:

- Static site files are served from `public/`
- API endpoints run from `functions/`
- The same repo can power both the website and the public JSON API
- You do not need a paid always-on server to keep it live

## What You Get

- A branded landing page and live API playground
- Public read-only JSON endpoints
- Search, filters, pagination, single-item lookups, featured data, and random data
- Security headers on both static pages and API responses
- CORS support for public API reads
- Optional PowerShell local server for simple offline preview on Windows

## Main Endpoints

```text
GET /api/v1/health
GET /api/v1/gadgets
GET /api/v1/gadgets/{id}
GET /api/v1/gadgets/slug/{slug}
GET /api/v1/search?name=drift
GET /api/v1/categories
GET /api/v1/brands
GET /api/v1/featured
GET /api/v1/random
GET /api/v1/filter?category=audio&limit=2
```

## Supported Query Params

`/api/v1/gadgets` and `/api/v1/filter` support:

- `category`
- `brand`
- `limit`
- `page`
- `sort`
- `minPrice`
- `maxPrice`

Supported `sort` values:

- `name_asc`
- `price_asc`
- `price_desc`
- `rating_desc`
- `year_desc`

## Cloudflare Deployment

This is the recommended path if you want to keep the site live without paying for hosting.

### Option A: Deploy from GitHub in the Cloudflare dashboard

1. Push this repo to GitHub.
2. In Cloudflare, create a new Pages project.
3. Connect the GitHub repo.
4. Set the build command to empty.
5. Set the output directory to `public`.
6. Deploy.

Cloudflare Pages will serve:

- Static files from `public/`
- API routes from `functions/`

### Option B: Deploy with Wrangler

If you already use Wrangler, this repo includes [wrangler.toml](./wrangler.toml).

The project is configured with:

- `pages_build_output_dir = "public"`
- `compatibility_date = "2026-03-26"`

## Local Fallback Run

If you want a quick Windows-only local preview without deploying first, use the PowerShell server:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
```

Then open:

```text
http://localhost:8080
```

## Security Model

- Only `GET`, `HEAD`, and `OPTIONS` are allowed on API routes
- Static files use security headers from [public/_headers](./public/_headers)
- API functions add CORS and browser hardening headers on every response
- The API is read-only and has no mutation routes

## Project Structure

```text
functions/api/v1/_lib/catalog.js
functions/api/v1/health.js
functions/api/v1/gadgets.js
functions/api/v1/gadgets/[id].js
functions/api/v1/gadgets/slug/[slug].js
functions/api/v1/search.js
functions/api/v1/categories.js
functions/api/v1/brands.js
functions/api/v1/featured.js
functions/api/v1/random.js
functions/api/v1/filter.js
public/index.html
public/styles.css
public/app.js
public/_headers
public/assets/mockforge-mark.svg
server.ps1
wrangler.toml
```

## Notes

- The Cloudflare deployment path is now the primary path for keeping this site live for free.
- The PowerShell server is still included as a local fallback, not the main hosting strategy.
- If you update the mock dataset, keep [data/gadgets.json](./data/gadgets.json) and [functions/api/v1/_lib/catalog.js](./functions/api/v1/_lib/catalog.js) aligned.
