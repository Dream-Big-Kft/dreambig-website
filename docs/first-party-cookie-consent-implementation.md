# First-Party Cookie Consent Implementation Guide

This guide captures the agreed plan for replacing Cookiebot with a first-party
cookie consent flow. Build it in small milestones and stop after each milestone
for review.

## Principles

- Keep it KISS/YAGNI.
- Do not build the whole consent system in one pass.
- Keep responsibilities separate:
  - storage module reads and saves consent only
  - banner component handles UI and visibility
  - Segment integration decides what consent means for analytics
- Treat cookie data as untrusted runtime data and validate before using it.

## Current Storage Direction

The storage module lives in `utils/cookie-consent.ts`.

Use `universal-cookie` for cookie access instead of manual `document.cookie`
parsing.

The consent shape is:

```ts
export type CookieConsent = {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};
```

Cookie settings:

```ts
{
  path: "/",
  maxAge: 365 * 24 * 60 * 60,
  sameSite: "strict",
  secure: window.location.protocol === "https:",
}
```

Storage rules:

- Cookie name is private to the module: `dreambig_CC`.
- Store only the four consent booleans.
- Do not store `version` unless the cookie shape actually changes.
- Do not store `createdAt`; `maxAge` handles expiry.
- Always force `necessary: true` when saving.
- Missing, malformed, or partial consent returns no consent.
- Keep `clearConsent()` out of production API unless a real reset feature needs it.

Recommended public API after cleanup:

```ts
export type CookieConsent;
export function getCookieConsent(): CookieConsent | undefined;
export function saveConsent(consent: CookieConsent): void;
export function hasConsent(): boolean;
```

If keeping a generic reader, keep it private unless another module truly needs
it:

```ts
function readCookie<TShape>(
  cookieName: string,
  validator: (value: unknown) => value is TShape,
): TShape | undefined
```

The important part is `cookies.get<unknown>() + validator`, not
`cookies.get<CookieConsent>()`, because generic type arguments do not validate
runtime cookie data.

## Milestones

### Milestone 1: Storage Module

Goal: first-party consent storage with tests.

Implementation:

- Install `universal-cookie`.
- Add or finish `utils/cookie-consent.ts`.
- Export only the consent type and small storage API.
- Validate cookie shape with a type guard.
- Save consent with `necessary: true` forced last.
- Use `maxAge` for the 12-month lifetime.

Tests:

- no cookie returns no consent
- saving then reading returns consent
- saving with `necessary: false` reads back `necessary: true`
- malformed cookie is ignored
- partial cookie is ignored

Run:

```bash
pnpm vitest run utils/cookie-consent.test.ts
pnpm lint
```

### Milestone 2: Segment Consent Wiring

Goal: make analytics read from first-party consent, not Cookiebot.

Implementation:

- Update `utils/segment.ts` to read the first-party consent store.
- Keep existing semantics:
  - no statistics consent means Segment does not load
  - statistics consent loads Segment
  - marketing consent controls Segment client persistence
- Replace Cookiebot event listeners in `SegmentInitializer` with a first-party
  consent-change event when the banner is added.

Tests:

- statistics off does not initialize Segment
- statistics on initializes Segment
- marketing off keeps persistence disabled

### Milestone 3: Initial Banner UI

Goal: show a first-party banner when no saved consent exists.

Implementation:

- Add a client `CookieConsentBanner` component.
- Mount it from `app/layout.tsx`.
- On mount:
  - if no consent exists, show banner
  - if consent exists, stay hidden
- Add four independent controls:
  - Necessary locked on
  - Preferences default off
  - Statistics default off
  - Marketing default off
- Add buttons:
  - Allow selection
  - Allow all
  - Show details
- `Allow selection` saves current choices.
- `Allow all` saves every category as true.
- `Show details` switches to an internal placeholder/details view for the next
  milestone.

Styling:

- Reuse existing design tokens and Cookiebot-inspired variables/colors.
- Keep the banner compact and consistent with the current site style.

Tests:

- banner renders when no consent exists
- banner does not render when consent exists
- Allow selection saves selected consent
- Allow all saves all categories
- necessary control stays locked on

### Milestone 4: Settings Reopen Flow

Goal: footer/privacy "Cookie settings" button opens the first-party banner.

Implementation:

- Update `CookieSettingsButton`.
- Dispatch a first-party event such as `dreambig:open-cookie-settings`.
- Banner listens for that event and opens with current stored choices.
- Saving updated settings overwrites the stored consent.

Tests:

- clicking Cookie settings reopens banner
- existing consent values are shown
- updated choices are saved

### Milestone 5: Remove Cookiebot

Goal: remove paid Cookiebot dependency fully.

Implementation:

- Remove Cookiebot `<Script>` from `app/layout.tsx`.
- Remove Cookiebot config from `config/index.ts`.
- Remove old `window.Cookiebot` typings.
- Remove or replace `app/cookiebot.css`.
- Update docs and privacy copy so the site no longer says Cookiebot manages
  consent.

Tests:

- layout snapshot updated
- footer/privacy snapshots updated if needed
- full test suite passes

Run:

```bash
pnpm test
pnpm lint
```

## Notes For Future Chats

- Do not reintroduce Cookiebot.
- Do not add legal/compliance complexity unless explicitly requested.
- Do not build the details/cookie declaration view before the initial banner is
  reviewed.
- Milestone 1 decisions:
  - keep `readCookie<TShape>` as the generic validated cookie reader
  - keep `DEFAULT_CONSENT` exported for the banner's initial UI state
  - use `getCookieConsent` as the public consent reader name
