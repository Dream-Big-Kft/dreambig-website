import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: [
        "app/**/*.ts",
        "app/**/*.tsx",
        "components/**/*.ts",
        "components/**/*.tsx",
      ],
      exclude: [
        ".next/**",
        "coverage/**",
        "node_modules/**",
        "test/**",
        "**/*.d.ts",
        "**/*.test.*",
        "components/ui/**",
      ],
    },
  },
});
