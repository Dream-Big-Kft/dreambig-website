# Vite to Vike SSG Migration Guide

Date: 2026-03-06  
Project: DreamBig company website

## Goal

Migrate the current React + Vite SPA to **true static pre-rendering (SSG)** using **Vike + vike-react**, without moving to Next.js.

## Architecture Decision

Use Option 1:

- Keep Vite as bundler.
- Add `vike` + `vike-react`.
- Replace SPA page routing with Vike filesystem routes.
- Pre-render all public pages at build time.

Why this is the right fit:

1. Your content is mostly static/config-driven.
2. Current build emits only one HTML entry (`dist/index.html`), so deep pages are not truly pre-rendered.
3. Vike provides SSG on top of Vite with lower migration cost than a full Next.js rewrite.

## Migration Plan

## 1. Baseline and guardrails (0.5 day)

Tasks:

1. Create a migration branch.
2. Capture current production build output and route behavior.
3. Record baseline Lighthouse scores for `/`, `/privacy-policy`, `/terms-of-service`.

Definition of done:

1. Baseline report stored in repo/docs.
2. Rollback path clear.

## 2. Install and wire Vike (0.5 day)

Tasks:

1. Install packages:
   - `npm install vike vike-react`
2. Update `vite.config.ts`:
   - Add `import vike from 'vike/plugin'`
   - Add `vike()` in `plugins`.
3. Update scripts in `package.json`:
   - `dev`: `vike dev`
   - `build`: `vike build`
   - `preview`: `vike preview`

Definition of done:

1. Dev server and build run using Vike CLI.

## 3. Create Vike page structure (0.5-1 day)

Tasks:

1. Add `client/pages/`.
2. Create route folders:
   - `client/pages/index/`
   - `client/pages/privacy-policy/`
   - `client/pages/terms-of-service/`
3. Move page-level rendering from `wouter` to Vike page files (`+Page.tsx`).

Definition of done:

1. Each URL resolves directly in dev mode without SPA fallback dependency.

## 4. Enable full prerender (0.25 day)

Tasks:

1. Add global config at `client/pages/+config.ts`.
2. Set:
   - `extends: vikeReact`
   - `prerender: true`

Definition of done:

1. Build emits static HTML for each route.

## 5. Remove routing overlap and keep behavior (0.5 day)

Tasks:

1. Retire `wouter` route switch from app shell.
2. Keep home section scrolling behavior for in-page navigation.
3. Preserve existing components and config model.

Definition of done:

1. No duplicate router logic remains.
2. Home scroll navigation works as before.

## 6. SEO and head tags per page (0.5-1 day)

Tasks:

1. Move page SEO from one static `index.html` setup to route-aware metadata.
2. Add per-page title/description/canonical/OG tags.
3. Keep global shared tags in a global head file.

Definition of done:

1. `View Source` on each route shows page-specific metadata.

## 7. Legal and content hardening (0.25-0.5 day)

Tasks:

1. Replace runtime `new Date()` “Last updated” with fixed versioned date string.
2. Fix jurisdiction/location text inconsistencies in legal and contact text.

Definition of done:

1. Legal content is deterministic and consistent with brand/legal scope.

## 8. Sitemap and robots alignment (0.25-0.5 day)

Tasks:

1. Ensure sitemap includes real generated routes.
2. Keep `robots.txt` sitemap URL and allow rules aligned.

Definition of done:

1. All sitemap URLs respond with 200 and valid static HTML.

## 9. QA and production release (0.5 day)

Tasks:

1. Run full build and preview.
2. Test direct URL access for all pages.
3. Validate no hydration warnings.
4. Re-run Lighthouse and compare against baseline.
5. Validate mobile breakpoints and accessibility basics.

Definition of done:

1. Release checklist passes.
2. Metrics are equal or better than baseline.

## Estimated Timeline

1. Engineering migration only: 3-4 working days.
2. With production hardening and QA buffer: 4-5 working days.

## Target Structure

```text
client/
  pages/
    +config.ts
    +Head.tsx
    index/
      +Page.tsx
      +title.ts
    privacy-policy/
      +Page.tsx
      +title.ts
    terms-of-service/
      +Page.tsx
      +title.ts
  src/
    components/
    config/
    hooks/
```

## Risks and Mitigations

1. Risk: mixed old/new routing causes subtle navigation bugs.
   Mitigation: remove `wouter` page routing in same PR as Vike route activation.
2. Risk: SEO regressions during head migration.
   Mitigation: route-by-route metadata validation with source inspection.
3. Risk: stale sitemap after route changes.
   Mitigation: generate sitemap from route list during build/CI.

## Acceptance Checklist

1. `vike build` succeeds.
2. Static HTML exists per route.
3. Direct open works for `/`, `/privacy-policy`, `/terms-of-service`.
4. Per-page SEO metadata present.
5. No critical Lighthouse regressions.
6. No hydration errors in browser console.

## Verified References

- https://vike.dev/add
- https://vike.dev/vite-plugin
- https://vike.dev/vike-react
- https://vike.dev/pre-rendering
- https://vike.dev/routing
- https://vike.dev/head-tags
- https://vike.dev/Head
- https://vike.dev/title
- https://vike.dev/static-hosts
