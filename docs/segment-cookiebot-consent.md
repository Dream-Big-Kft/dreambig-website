# Segment and Cookiebot Consent

Segment is loaded from our bundled Next.js client code, not from a static HTML
script tag. Cookiebot can store the user's consent choice, but it cannot
automatically inspect our React lifecycle code or stop `analytics.load()` for us.
Our app must translate Cookiebot consent into Segment behavior.

Cookiebot developer docs:
https://www.cookiebot.com/us/developer/

## Consent model

- No Statistics consent: Segment is not loaded.
- Statistics consent only: Segment may send analytics events, but client
  persistence is disabled with `disableClientPersistence: true`.
- Marketing consent: Segment may use normal client persistence.

The statistics-only mode is important because Segment's browser SDK normally
persists browser identity values such as `ajs_anonymous_id`. When marketing is
not accepted, we still allow statistics events, but we avoid Segment cookies and
localStorage persistence.

## Implementation

`lib/segment.ts` reads `window.Cookiebot.consent` through `getAnalyticsConsent()`.
`initSegment()` only loads Segment after Statistics consent exists. It passes:

```ts
disableClientPersistence: !consent.marketing
```

So Marketing disabled means Segment uses non-persistent client state.

`components/Analytics.tsx` listens to Cookiebot events:

- `CookiebotOnConsentReady`: consent is ready or was just submitted.
- `CookiebotOnLoad`: consent loaded on page load.
- `CookiebotOnAccept`: user accepted, or a returning user had accepted before.
- `CookiebotOnDecline`: user declined, or a returning user had declined before.

When Statistics is allowed, the app loads Segment and sends one initial page
view. When Statistics is removed while Segment is loaded, the app resets Segment
and reloads the page.

`lib/analytics.ts` gates every event behind Statistics consent and `isLoaded()`.
Events do not send per-event `integrations` options because GA4 is currently the
only active Segment destination. If another destination is enabled in Segment,
add explicit consent handling before sending traffic to it. Hotjar is left as a
commented placeholder in the analytics module.
