import type { Config } from "tailwindcss";

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
      /*
      fix for browsers like mobile Safari not
      playing well with `vh`
      (see: https://stackoverflow.com/questions/75079019/tailwind-css-fallback-for-new-screen-length-types-such-as-lvh-svh, https://dev.to/frehner/css-vh-dvh-lvh-svh-and-vw-units-27k4, https://github.com/tailwindlabs/tailwindcss/discussions/8216, https://github.com/tailwindlabs/tailwindcss/pull/11317)
      */
      height: {
        "dvh-with-fallback": [
          "100vh /* fallback for Opera, IE and etc. */",
          "100dvh",
        ],
        "svh-with-fallback": [
          "100vh /* fallback for Opera, IE and etc. */",
          "100svh",
        ],
        "lvh-with-fallback": [
          "100vh /* fallback for Opera, IE and etc. */",
          "100lvh",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
