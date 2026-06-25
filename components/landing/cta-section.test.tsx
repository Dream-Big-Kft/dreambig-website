import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CTASection } from "./cta-section";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CTASection", () => {
  it("renders the closing call to action", () => {
    render(<CTASection />);

    expect(
      screen.getByRole("heading", {
        name: "Get in touch",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Every great product begins with a simple discussion/i),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText(/Phone number/i)).not.toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();
    expect(
      screen.getByRole("button", { name: /Send Message/i }),
    ).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<CTASection />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("submits without leaving the page and resets the form", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<CTASection />);

    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText(/Phone number/i), "+36 30 123 4567");
    await user.type(screen.getByLabelText("Message"), "We need a React audit.");
    await user.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          headers: { Accept: "application/json" },
        }),
      );
    });

    expect(
      await screen.findByText(/your message was sent successfully/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText(/Phone number/i)).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");

    await user.type(screen.getByLabelText("Message"), "One more thing.");
    expect(
      screen.queryByText(/your message was sent successfully/i),
    ).not.toBeInTheDocument();
  });

  it("does not submit twice while a request is already in progress", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn(() => new Promise<Response>(() => undefined));
    vi.stubGlobal("fetch", fetchMock);

    render(<CTASection />);

    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "We need a React audit.");

    const form = screen
      .getByRole("button", { name: /Send Message/i })
      .closest("form");

    act(() => {
      form?.requestSubmit();
    });
    act(() => {
      form?.requestSubmit();
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
