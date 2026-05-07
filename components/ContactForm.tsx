"use client";

import { useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

function getFormspreeEndpoint() {
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!endpoint) {
        throw new Error("Missing NEXT_PUBLIC_FORMSPREE_ENDPOINT");
    }

    return endpoint;
}

const inputClassName =
    "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/75 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25 dark:bg-card/80";

const labelClassName = "text-sm font-medium text-foreground";

export function ContactForm() {
    const formspreeEndpoint = getFormspreeEndpoint();
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
        "idle",
    );

    const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = async (
        event,
    ) => {
        event.preventDefault();
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
                return;
            }

            form.reset();
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            action={formspreeEndpoint}
            method="POST"
            className="mx-auto mt-12 grid max-w-2xl gap-6 rounded-lg border border-border bg-card p-6 text-left shadow-sm dark:border-white/10 dark:bg-card/70 sm:p-8"
        >
            <input type="hidden" name="_subject" value="New DreamBig website inquiry" />
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
                    rows={6}
                    className={`${inputClassName} resize-y`}
                    placeholder="What are you building, improving, or trying to solve?"
                />
            </div>

            <div className="flex justify-start">
                <Button
                    type="submit"
                    size="lg"
                    className="group px-8 font-medium"
                    disabled={status === "submitting"}
                >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>

            <div aria-live="polite" className="min-h-6">
                {status === "success"
                    ? (
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            Thanks, your message was sent successfully. We&apos;ll get back to
                            you soon.
                        </p>
                    )
                    : null}
                {status === "error"
                    ? (
                        <p className="text-sm font-medium text-destructive">
                            Something went wrong while sending your message. Please try again.
                        </p>
                    ) : null}
            </div>
        </form>
    );
}
