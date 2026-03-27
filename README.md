# MockForge Salesforce Lab

MockForge Salesforce Lab is a free public integration testing site for Salesforce-style inbound and outbound workflows.

It is designed for:

- CRM object API testing
- middleware and webhook demos
- QA flows around lead, account, contact, opportunity, case, task, campaign, product, and ownership syncs
- outbound event delivery tests to public HTTPS callback URLs

## What It Includes

- Salesforce-style mock datasets for `Lead`, `Account`, `Contact`, `Opportunity`, `Case`, `User`, `Campaign`, `Task`, and `Product`
- Public read APIs for object lists, detail routes, search, and summary
- An inbound echo receiver for webhook validation
- An outbound mock-event sender for Salesforce-style delivery testing
- A browser playground and webhook lab UI
- Cloudflare Pages + Functions deployment shape for long-term free hosting

## Main Endpoints

```text
GET  /api/v1/health
GET  /api/v1/salesforce/summary
GET  /api/v1/salesforce/leads
GET  /api/v1/salesforce/leads/{id}
GET  /api/v1/salesforce/accounts
GET  /api/v1/salesforce/accounts/{id}
GET  /api/v1/salesforce/contacts
GET  /api/v1/salesforce/contacts/{id}
GET  /api/v1/salesforce/opportunities
GET  /api/v1/salesforce/opportunities/{id}
GET  /api/v1/salesforce/cases
GET  /api/v1/salesforce/cases/{id}
GET  /api/v1/salesforce/users
GET  /api/v1/salesforce/users/{id}
GET  /api/v1/salesforce/campaigns
GET  /api/v1/salesforce/campaigns/{id}
GET  /api/v1/salesforce/tasks
GET  /api/v1/salesforce/tasks/{id}
GET  /api/v1/salesforce/products
GET  /api/v1/salesforce/products/{id}
GET  /api/v1/salesforce/search?type=contacts&q=avery
POST /api/v1/webhooks/echo
POST /api/v1/salesforce/events/mock
```

## Outbound Event Presets

```text
lead.created
lead.converted
account.updated
contact.synced
opportunity.closed_won
case.escalated
task.completed
campaign.launched
product.updated
```

## Cloudflare Deployment

This project is intended to run on Cloudflare Pages + Pages Functions.

Recommended Pages settings:

- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `public`

## Security Notes

- Public read routes allow `GET`, `HEAD`, and `OPTIONS`
- Webhook routes allow `POST` and `OPTIONS`
- Outbound event delivery only allows public HTTPS destinations
- Obvious localhost and private-network destinations are blocked
- Optional HMAC signing is supported via `X-MockForge-Signature`

## Example Filters

- `GET /api/v1/salesforce/opportunities?minAmount=50000&sort=amount_desc`
- `GET /api/v1/salesforce/accounts?minAnnualRevenue=1000000&sort=revenue_desc`
- `GET /api/v1/salesforce/campaigns?region=Global&sort=budget_desc`
- `GET /api/v1/salesforce/tasks?owner=Priya&sort=duedate_asc`
- `GET /api/v1/salesforce/products?family=Integration&isActive=true&sort=price_desc`

## Project Structure

```text
functions/api/v1/_lib/salesforce.js
functions/api/v1/health.js
functions/api/v1/salesforce/summary.js
functions/api/v1/salesforce/search.js
functions/api/v1/salesforce/leads.js
functions/api/v1/salesforce/leads/[id].js
functions/api/v1/salesforce/accounts.js
functions/api/v1/salesforce/accounts/[id].js
functions/api/v1/salesforce/contacts.js
functions/api/v1/salesforce/contacts/[id].js
functions/api/v1/salesforce/opportunities.js
functions/api/v1/salesforce/opportunities/[id].js
functions/api/v1/salesforce/cases.js
functions/api/v1/salesforce/cases/[id].js
functions/api/v1/salesforce/users.js
functions/api/v1/salesforce/users/[id].js
functions/api/v1/salesforce/campaigns.js
functions/api/v1/salesforce/campaigns/[id].js
functions/api/v1/salesforce/tasks.js
functions/api/v1/salesforce/tasks/[id].js
functions/api/v1/salesforce/products.js
functions/api/v1/salesforce/products/[id].js
functions/api/v1/salesforce/events/mock.js
functions/api/v1/webhooks/echo.js
public/index.html
public/styles.css
public/app.js
```
