import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { CompanyEmailLink } from "@/components/CompanyEmailLink";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: May 2026</p>

        <Section title="1. Data Controller">
          <p>
            Dream Big Kft. ("we", "us") is the data controller for personal data
            collected through this website (<strong>dreambig.hu</strong>).
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Full name: Dream Big Korlátolt Felelősségű Társaság</li>
            <li>Registered office: 9021 Győr, Sarkantyú köz 5., Hungary</li>
            <li>Company registration number: 08-09-032977</li>
            <li>Tax number: 29177532-2-08</li>
          </ul>
          <p className="mt-2">
            Contact for privacy requests:{" "}
            <CompanyEmailLink className="underline underline-offset-4" />
          </p>
        </Section>

        <Section title="2. Contact Form">
          <p>
            When you submit the contact form, the following data is sent to{" "}
            <strong>Formspree Inc.</strong> (our form processor, acting as data
            processor under GDPR Article 28):
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (optional)</li>
            <li>Message content</li>
          </ul>
          <p className="mt-2">
            Legal basis: <strong>Legitimate interest</strong> (responding to your
            inquiry, Article 6(1)(f) GDPR). We retain contact inquiries for up to
            12 months after the last meaningful communication, unless a longer
            period is required for a contract, accounting obligation, legal claim,
            or dispute.
          </p>
          <p className="mt-2">
            Please do not include special category data or unnecessary confidential
            information in the message field.
          </p>
        </Section>

        <Section title="3. Analytics &amp; Cookies">
          <p>
            With your consent, we use the following analytics tools to understand
            how visitors use our website:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-2">
            <li>
              <strong>Segment</strong> — analytics routing layer. Collects page
              views and interaction events and forwards them to the destinations
              below. No form field values are included in events.
            </li>
            <li>
              <strong>Google Analytics 4</strong> — website usage statistics.
              Google may process data in the EEA and the United States.
            </li>
            <li>
              <strong>Hotjar</strong> — session recordings and heatmaps. All
              form inputs are suppressed (<code>data-hj-suppress</code>) so no
              personal data is recorded in session replays.
            </li>
            <li>
              <strong>Cookiebot by Usercentrics</strong> — consent banner,
              consent storage, cookie declaration, and consent records.
            </li>
          </ul>
          <p className="mt-2">
            Legal basis: <strong>Consent</strong> (Article 6(1)(a) GDPR). Analytics
            are only activated after you accept statistics cookies via the consent
            banner. Analytics data is retained according to the configured
            retention settings in Segment, Google Analytics 4, and Hotjar; these
            settings must be reviewed and documented before launch.
          </p>
          <p className="mt-4">
            You can withdraw or change your consent at any time:
          </p>
          <CookieSettingsButton
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Manage cookie preferences
          </CookieSettingsButton>
        </Section>

        <Section title="4. Recipients &amp; International Transfers">
          <p>
            We use service providers as processors for hosting, consent management,
            analytics, and form handling. Current processors include Segment,
            Google Analytics 4, Hotjar, Formspree, and Cookiebot by Usercentrics.
            Their processing locations, subprocessors, transfer mechanisms, and
            data processing agreements must be reviewed before launch.
          </p>
          <p className="mt-2">
            Where personal data is transferred outside the EEA, we rely on an
            adequacy decision where available, or Standard Contractual Clauses and
            supplementary measures where required.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>Under GDPR you have the right to:</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Request a copy of data you provided in a portable format</li>
            <li>Object to or restrict processing</li>
            <li>Withdraw consent at any time where processing is based on consent</li>
            <li>
              Lodge a complaint with the Hungarian National Authority for Data
              Protection and Freedom of Information (NAIH), 1055 Budapest, Falk
              Miksa utca 9-11., Hungary, email{" "}
              <a href="mailto:ugyfelszolgalat@naih.hu" className="underline underline-offset-4">
                ugyfelszolgalat@naih.hu
              </a>
              , website{" "}
              <a href="https://www.naih.hu" className="underline underline-offset-4">
                naih.hu
              </a>
            </li>
          </ul>
          <p className="mt-2">
            To exercise your rights, contact us at{" "}
            <CompanyEmailLink className="underline underline-offset-4" />
            .
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            This website uses cookies solely for analytics purposes (when consented).
            No advertising or tracking cookies are set without your explicit consent.
            The full cookie declaration is managed by Cookiebot and must be made
            available from the consent banner and this page before launch.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
