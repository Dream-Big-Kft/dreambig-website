import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";
import {
  trackContactFormStart,
  trackContactFormSubmit,
  trackContactFormError,
} from "@/utils/analytics";

vi.mock("@/utils/analytics", () => ({
  trackContactFormStart: vi.fn(),
  trackContactFormSubmit: vi.fn(),
  trackContactFormError: vi.fn(),
}));

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Message"), "We need a React audit.");
};

afterEach(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ContactForm", () => {
  it("links to the privacy policy", () => {
    render(<ContactForm />);

    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy");
  });

  it("tracks form start only once, no matter how many fields change", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Ada");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");

    expect(trackContactFormStart).toHaveBeenCalledTimes(1);
  });

  it("shows a success message and tracks the submission on a successful send", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(
      await screen.findByText(/your message was sent successfully/i),
    ).toBeInTheDocument();
    expect(trackContactFormSubmit).toHaveBeenCalledTimes(1);
    expect(trackContactFormError).not.toHaveBeenCalled();
  });

  it("shows an error message and tracks a server_error when the API responds with a failure", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(
      await screen.findByText(/something went wrong while sending your message/i),
    ).toBeInTheDocument();
    expect(trackContactFormError).toHaveBeenCalledWith("server_error");
    expect(trackContactFormSubmit).not.toHaveBeenCalled();
  });

  it("shows an error message and tracks a network_error when the request throws", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    expect(
      await screen.findByText(/something went wrong while sending your message/i),
    ).toBeInTheDocument();
    expect(trackContactFormError).toHaveBeenCalledWith("network_error");
  });

  it("lets the user retry after an error, clearing the message on the next edit", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    await screen.findByText(/something went wrong while sending your message/i);

    await user.type(screen.getByLabelText("Message"), " Please advise.");

    expect(
      screen.queryByText(/something went wrong while sending your message/i),
    ).not.toBeInTheDocument();
  });

  it("does not submit twice while a request is already in flight", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn(() => new Promise<Response>(() => undefined));
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);
    await fillRequiredFields(user);

    const button = screen.getByRole("button", { name: /Send Message/i });
    await user.click(button);
    await user.click(button);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
