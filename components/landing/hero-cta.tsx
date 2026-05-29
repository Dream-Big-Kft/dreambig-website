"use client";

import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/utils/analytics";

export function HeroCta() {
  return (
    <Button asChild size="lg" className="px-8 font-medium">
      <a
        href="#contact"
        onClick={() => trackCtaClick("Start a Project", "hero")}
      >
                Start a Project
      </a>
    </Button>
  );
}
