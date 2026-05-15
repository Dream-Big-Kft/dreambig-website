"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const getFormspreeEndpoint = () => {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  if (!endpoint) {
    throw new Error("Missing NEXT_PUBLIC_FORMSPREE_ENDPOINT");
  }

  return endpoint;
};

const inputClassName =
  "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/75 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25 dark:bg-card";

const labelClassName = "text-sm font-medium text-foreground";

type FormStatus = "idle" | "submitting" | "success" | "error";

const FormStatusMessage = ({ status }: { status: FormStatus }) => (
  <div aria-live="polite">
    {status === "success" ? (
      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
        Thanks, your message was sent successfully. We&apos;ll get back to you
        soon.
      </p>
    ) : null}
    {status === "error" ? (
      <p className="text-sm font-medium text-destructive">
        Something went wrong while sending your message. Please try again.
      </p>
    ) : null}
  </div>
);

const ContactForm = () => {
  const formspreeEndpoint = getFormspreeEndpoint();
  const [status, setStatus] = useState<FormStatus>("idle");
  const isSubmittingRef = useRef(false);

  const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = async (
    event,
  ) => {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        setStatus("error");
        isSubmittingRef.current = false;
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleChange = () => {
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      action={formspreeEndpoint}
      method="POST"
      className="mx-auto mt-12 grid max-w-2xl gap-6 rounded-lg  text-left"
    >
      <input
        type="hidden"
        name="_subject"
        value="New DreamBig website inquiry"
      />
      {/* Honeypot spam trap: real users never see this field, but many bots fill hidden inputs. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClassName}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputClassName}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClassName}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClassName}>
          Phone number <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClassName}
          placeholder="+36 30 123 4567"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className={`${inputClassName} min-h-36 resize-y`}
          placeholder="What are you building, improving, or trying to solve?"
        />
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          className="group px-8 font-medium"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
          <Send className="h-4 w-4 transition-transform" />
        </Button>

        <FormStatusMessage status={status} />
      </div>
    </form>
  );
};
export { ContactForm };
