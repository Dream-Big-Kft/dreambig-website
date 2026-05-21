"use client";

import { Button } from "@/components/ui/button";
import type { ComponentProps, ReactNode } from "react";

type CookieSettingsButtonProps = {
    className?: string;
    variant?: ComponentProps<typeof Button>["variant"];
    size?: ComponentProps<typeof Button>["size"];
    children?: ReactNode;
};

export function CookieSettingsButton({
  className,
  variant,
  size,
  children = "Cookie settings",
}: CookieSettingsButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => window.Cookiebot?.renew?.()}
    >
      {children}
    </Button>
  );
}
