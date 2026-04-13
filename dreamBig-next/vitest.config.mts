import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: [
        "app/layout.tsx",
        "app/page.tsx",
        "components/theme-provider.tsx",
        "components/landing/header.tsx",
        "components/landing/hero.tsx",
        "components/landing/services-section.tsx",
        "components/landing/process-section.tsx",
        "components/landing/tech-stack-section.tsx",
        "components/landing/cta-section.tsx",
        "components/landing/footer.tsx",
      ],
      exclude: [
        ".next/**",
        "coverage/**",
        "node_modules/**",
        "test/**",
        "**/*.d.ts",
      ],
    },
  },
});
