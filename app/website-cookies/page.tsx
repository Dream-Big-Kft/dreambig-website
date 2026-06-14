import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { cookieCategories, CookieCategory, CookieCategoryKey } from "@/utils/cookie-categories";
import { ManageCookiePreferencesButton } from "./manage-cookie-preferences-button";

type CookieDetails = {
  name: string;
  provider: string;
  purpose: string;
  maximumStorageDuration: string;
  type: string;
};

const cookieCategoryDescriptions: Record<CookieCategoryKey, string> = {
  necessary:
    "Essential cookies ensure the website functions correctly by enabling core features like page navigation and access to secure areas. The site cannot operate properly without these cookies.",
  preferences:
    "Preference cookies allow the website to remember your personal choices, adapting its appearance or behavior to suit you—such as your selected language or geographic region.",
  statistics:
    "Analytics cookies help us understand how visitors engage with our platform by gathering and reporting data completely anonymously.",
  marketing:
    "Marketing cookies follow users across different websites to deliver advertisements that are tailored and relevant to your interests, making them more effective for publishers and third-party advertisers.",
};

const cookiesByCategory: Record<CookieCategoryKey, CookieDetails[]> = {
  necessary: [
    {
      name: "CookieConsent",
      provider: "dreambig.hu",
      purpose: "Stores the user's cookie consent state for the current domain.",
      maximumStorageDuration: "1 year",
      type: "HTTP Cookie",
    },
  ],
  preferences: [],
  statistics: [
    {
      name: "_ga",
      provider: "dreambig.hu",
      purpose:
        "Registers a unique ID used to generate statistical data on how the visitor uses the website.",
      maximumStorageDuration: "400 days",
      type: "HTTP Cookie",
    },
    {
      name: "_ga_*",
      provider: "dreambig.hu",
      purpose:
        "Used by Google Analytics to maintain session state and track unique page views across a user session.",
      maximumStorageDuration: "1 year",
      type: "HTTP Cookie",
    },
  ],
  marketing: [
    {
      name: "ajs_user_id",
      provider: "Segment",
      purpose:
        "Third-party cookie used by Segment.io to establish a unique user identity string for cross-site behavioral targeting and analytics synchronization.",
      maximumStorageDuration: "1 year",
      type: "HTTP Cookie",
    },
    {
      name: "timezone",
      provider: "Segment",
      purpose:
        "Third-party cookie used by Segment.io to detect and store the visitor's local timezone for behavioral data segmentation and regional reporting.",
      maximumStorageDuration: "1 year",
      type: "HTTP Cookie",
    },
    {
      name: "ajs_anonymous_id [x2]",
      provider: "dreambig.hu / segment.com",
      purpose:
        "Third-party cookie set by Segment.io to track and analyze user engagement journeys across multiple domains.",
      maximumStorageDuration: "1 year",
      type: "HTTP Cookie",
    },
  ],
};

function CookieDetailsList({ cookies }: { cookies: CookieDetails[]; }) {
  if (cookies.length === 0) {
    return (
      <div className="mt-4 rounded-md border border-foreground/18 p-4 dark:border-foreground/24">
        <p className="font-semibold text-foreground">
          We do not use cookies of this type.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {cookies.map((cookie) => (
        <article
          key={`${cookie.provider}-${cookie.name}`}
          className="rounded-md border border-foreground/18 p-4 dark:border-foreground/24"
        >
          <h4 className="text-base font-semibold text-foreground">
            {cookie.name}
          </h4>
          <p className="mt-2">{cookie.purpose}</p>
          <dl className="mt-4 grid gap-3 border-t border-foreground/16 pt-4 text-sm dark:border-foreground/22 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-foreground">Provider</dt>
              <dd className="mt-1">{cookie.provider}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Type</dt>
              <dd className="mt-1">{cookie.type}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                Maximum storage duration
              </dt>
              <dd className="mt-1">{cookie.maximumStorageDuration}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

function CookieCategorySection({ category }: { category: CookieCategory; }) {
  const cookies = cookiesByCategory[category.key];

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-foreground">
        {category.label} cookies
      </h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          {cookieCategoryDescriptions[category.key]}
        </p>
        <div className="border-l border-foreground/18 pl-4 dark:border-foreground/24">
          <h3 className="text-sm font-semibold uppercase tracking-normal text-foreground">
            Cookies in this category
          </h3>
          <CookieDetailsList cookies={cookies} />
        </div>
      </div>
    </section>
  );
}

export default function WebsiteCookiesPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Website Cookies
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          We use cookies to keep the website working correctly and, when you allow
          them, to understand how visitors use our website.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">
            Manage your cookie preferences
          </h2>
          <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              You can review or change your cookie preferences at any time. The
              exact behavior for reopening the banner is still to be decided.
            </p>
            <ManageCookiePreferencesButton />
          </div>
        </section>

        {cookieCategories.map((category) => (
          <CookieCategorySection category={category} key={`${category.key}-${category.label}`} />
        ))}
      </main>
      <Footer />
    </>
  );
}
