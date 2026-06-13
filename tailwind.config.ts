import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-neutral-900)",
        process: "var(--color-process)",
        framework: "var(--color-framework)",
        methods: "var(--color-methods)",
        scenario: "var(--color-scenario)",
        reading: "var(--color-reading)",
        "neutral-600": "var(--color-neutral-600)",
        "neutral-100": "var(--color-neutral-100)",
        "neutral-900": "var(--color-neutral-900)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        semibold: "600",
      },
      maxWidth: {
        content: "1200px",
        prose: "720px",
        panel: "320px",
      },
      spacing: {
        // base-8 scale extensions beyond Tailwind defaults
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      screens: {
        md: "768px",
      },
    },
  },
  plugins: [],
};
export default config;
