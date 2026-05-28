import { analytics, getAnalyticsConsent, isLoaded } from "./segment";

function isTrackingAllowed(): boolean {
  return getAnalyticsConsent().statistics && isLoaded();
}

// Active Segment destination: Google Analytics 4 Web.
// Future statistics destination placeholder: "Hotjar".

export function trackPageView(): void {
  if (!isTrackingAllowed()) return;
  analytics.page();
}

export function trackContactNavClick(): void {
  if (!isTrackingAllowed()) return;
  analytics.track("Contact Nav Clicked");
}

export function trackCtaClick(label: string, section: string): void {
  if (!isTrackingAllowed()) return;
  analytics.track("CTA Clicked", { label, section });
}

export function trackContactFormStart(): void {
  if (!isTrackingAllowed()) return;
  analytics.track("Contact Form Started");
}

export function trackContactFormSubmit(): void {
  if (!isTrackingAllowed()) return;
  analytics.track("Contact Form Submitted");
}

export function trackContactFormError(error: string): void {
  if (!isTrackingAllowed()) return;
  analytics.track("Contact Form Error", { error });
}
