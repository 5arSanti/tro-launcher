# Task 10 Report: Product and design truth

## Status

Complete. `PRODUCT.md` and `DESIGN.md` now record the lifted TORNS chapter-film palette, page spine, and interaction rules already shipped in `lirn-web-main`. No new product claims. `tro-frontend` untouched.

## Pre-edit site tests

```
cd lirn-web-main && npm test
```

Result: **PASS** — 19 test files, 38 tests passed.

## Doc changes

### PRODUCT.md

Replaced the Brand Commitments visual-direction bullet with the chapter-film spine and lifted grounds (`#0a3a5c`, `#135a84`, `#1c7aad`, `#e8f4fb`, white).

### DESIGN.md

- Frontmatter: updated `torns-deep`, `torns-mid`, `torns-panel`; added `torns-air`.
- Direction: `/torns` described as chapter film (product → system → Transmilenio case → close).
- Color: TORNS deep / mid / panel / air bullet with hex values.
- Layout: staged evidence (one interview turn, one survey question, morphing chart; pipeline track with one active step).
- Interaction: chart interpolation (400–700 ms), photo cuts via `--cut`, pipeline ignition chain; reduced-motion respected.
- Rules: rule 2 updated to lifted deep / mid / panel / air / white.

## Token asserts

```
node scripts/assert-lirn-tokens.mjs
```

Result: **PASS** — `PASS: LIRN tokens are black/white with activity blue`

```
node scripts/assert-torns-tokens.mjs
```

Result: **PASS** — `PASS: TRO cyan removed; civic blue present`

## Commits

- Parent (`tro-launcher`): `9e3b313` — Record the TORNS chapter-film palette and page spine.

## Concerns

None. Docs align with shipped tokens and page structure; asserts and pre-edit site tests pass.
