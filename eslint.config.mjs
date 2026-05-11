import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// Exports the flat ESLint configuration used when running `eslint .`.
export default defineConfig(
    // First config block: tells ESLint which generated or dependency files to skip.
    {
        // Ignore paths that should not be linted because they are generated or external.
        ignores: [
            // Ignores Next.js build output.
            ".next/**",
            // Ignores static export output.
            "out/**",
            // Ignores test coverage reports.
            "coverage/**",
            // Ignores Next.js generated TypeScript environment declarations.
            "next-env.d.ts",
            // Ignores installed dependencies.
            "node_modules/**",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    // Project-specific config block for source, test, and config files.
    {
        // Applies this block to JavaScript, CommonJS, ES module, TypeScript, and TSX files.
        files: ["**/*.{js,cjs,mjs,ts,tsx}"],
        // Defines how ESLint should parse code and which global names are allowed.
        languageOptions: {
            // Allows modern JavaScript syntax without pinning to a specific ECMAScript year.
            ecmaVersion: "latest",
            // Treats files as ES modules by default, matching the project's import/export style.
            sourceType: "module",
            // Declares global variables that exist at runtime so ESLint does not flag them as undefined.
            globals: {
                // Allows browser globals like `window`, `document`, and `fetch`.
                ...globals.browser,
                // Allows Node.js globals like `process`, `Buffer`, and `__dirname`.
                ...globals.node,
            },
        },
        // Project-specific rule choices that we can tighten or relax over time.
        rules: {
            // Warns about unused variables while allowing intentionally unused names prefixed with `_`.
            "@typescript-eslint/no-unused-vars": [
                // Makes unused variables a warning instead of a commit-blocking error.
                "warn",
                // Options for the unused-vars rule.
                {
                    // Allows unused function arguments when their names start with `_`.
                    argsIgnorePattern: "^_",
                    // Allows unused variables when their names start with `_`.
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
);
