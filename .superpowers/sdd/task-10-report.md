# Task 10: Dashboard visual restyle

## Status

Complete. The dashboard, monitoring, cameras, routing, and App.css leftovers now use the TORNS night tokens, 2px geometry, civic-blue accents, and no glow. JSX structure was not changed.

## Verification

- `node scripts/assert-no-legacy-brand.mjs` — PASS
- `node scripts/assert-torns-tokens.mjs` — PASS
- `cd tro-frontend && npm run build` — PASS
- CSS detector reports one intentional exception: the required 4px left filete on `.dashboard-hero`.

## Concerns

`npm install` reports 15 existing dependency vulnerabilities (1 low, 2 moderate, 12 high). No dependency upgrades were made.
