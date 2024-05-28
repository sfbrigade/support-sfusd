import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/*
NOTE: if adding a new folder that will contain components, make sure to add it below in `content` so that it gets processed by Tailwind
*/
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
      /* NOTE: the code below gives us a working alternative to `h-screen`, which is broken in mobile Safari; they are implementations of `h-100?vh` and `min-h-100?vh`, which newer Tailwind supports, but does not include fallbacks to `h-100vh` and `min-h-100vh` for, respectively */
      /* NOTE: we are placing the custom styles below instead of above in `theme.extend` to avoid the build errors that occur when arrays are used for values of `theme.extend` due to typing; alternatively, this could be placed directly in our CSS file for potentially better future compatibility (see earlier commit for this approach) */
      const vh_fallback = "100vh /* fallback for Opera, IE and etc. */";

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
        ".min-h-dvh-with-fallback": {
          minHeight: [vh_fallback, "100dvh"],
        },
        ".min-h-svh-with-fallback": {
          minHeight: [vh_fallback, "100svh"],
        },
        ".min-h-lvh-with-fallback": {
          minHeight: [vh_fallback, "100lvh"],
        },
      });
    }),
  ],
};

export default config;
