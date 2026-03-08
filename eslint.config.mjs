import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "public/**",
    ],
  },

  js.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {},
  },

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
      "@typescript-eslint": (await import("@typescript-eslint/eslint-plugin"))
        .default,
    },
    rules: {
      ...(await import("@typescript-eslint/eslint-plugin")).default.configs
        .recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
