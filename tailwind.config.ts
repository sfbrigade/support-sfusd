import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const vh_fallback = "100vh /* fallback for Opera, IE and etc. */";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["var(--font-fredoka)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      /* NOTE: we are using the below instead of `theme.extend` to avoid the build errors while of arrays for values */
      addUtilities({
        ".h-dvh-with-fallback": {
          height: [vh_fallback, "100dvh"],
        },
        ".h-svh-with-fallback": {
          height: [vh_fallback, "100svh"],
        },
        ".h-lvh-with-fallback": {
          height: [vh_fallback, "100lvh"],
        },
        ".h-min-dvh-with-fallback": {
          minHeight: [vh_fallback, "100dvh"],
        },
        ".h-min-svh-with-fallback": {
          minHeight: [vh_fallback, "100svh"],
        },
        ".h-min-lvh-with-fallback": {
          minHeight: [vh_fallback, "100lvh"],
        },
      });
    }),
  ],
};

export default config;
