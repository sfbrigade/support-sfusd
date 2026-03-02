// eslint.config.mjs
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  // Global ignores (common Next.js patterns)
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "public/**",
      // Add any other project-specific ignores here
    ],
  },

  // Base ESLint recommended rules
  js.configs.recommended,

  // Next.js rules (native flat exports – no compat needed)
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Prettier integration – MUST be near/at the end so it overrides formatting conflicts
  // This includes eslint-config-prettier's disables + prettier plugin rules
  eslintPluginPrettierRecommended,

  // Optional: Add globals / custom overrides last
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Example tweaks – adjust as needed
      // "no-console": "warn",
      // "react/react-in-jsx-scope": "off", // If using React 17+ auto-import
    },
  },

  // Optional: TypeScript block (uncomment if your project is TS-heavy)
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: (await import("@typescript-eslint/parser")).default,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": (await import("@typescript-eslint/eslint-plugin")).default,
    },
    rules: {
      ... (await import("@typescript-eslint/eslint-plugin")).default.configs.recommended.rules,
      // Or use 'strictTypeChecked' / 'stylisticTypeChecked' for more
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];