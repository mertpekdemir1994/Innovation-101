import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Colors ────────────────────────────────────────────────────────
      colors: {
        background:     "var(--color-background)",
        foreground:     "var(--color-neutral-900)",
        // Section accents
        process:        "var(--color-process)",
        framework:      "var(--color-framework)",
        methods:        "var(--color-methods)",
        scenario:       "var(--color-scenario)",
        reading:        "var(--color-reading)",
        // Neutral scale
        "neutral-900":  "var(--color-neutral-900)",
        "neutral-700":  "var(--color-neutral-700)",
        "neutral-600":  "var(--color-neutral-600)",
        "neutral-400":  "var(--color-neutral-400)",
        "neutral-200":  "var(--color-neutral-200)",
        "neutral-100":  "var(--color-neutral-100)",
        "neutral-50":   "var(--color-neutral-50)",
        // Warm surfaces
        "warm-50":      "var(--color-warm-50)",
        // Dark surfaces
        "dark":         "var(--color-dark)",
        "dark-surface": "var(--color-dark-surface)",
        "warm-100":     "var(--color-warm-100)",
      },

      // ─── Typography ────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      fontWeight: {
        normal:   "400",
        medium:   "500",
        semibold: "600",
        bold:     "700",
      },
      fontSize: {
        "2xs": ["var(--text-2xs)", { lineHeight: "var(--leading-normal)" }],
        xs:    ["var(--text-xs)",   { lineHeight: "var(--leading-normal)" }],
        sm:    ["var(--text-sm)",   { lineHeight: "var(--leading-normal)" }],
        base:  ["var(--text-base)", { lineHeight: "var(--leading-relaxed)" }],
        lg:    ["var(--text-lg)",   { lineHeight: "var(--leading-relaxed)" }],
        xl:    ["var(--text-xl)",   { lineHeight: "var(--leading-normal)" }],
        "2xl": ["var(--text-2xl)",  { lineHeight: "var(--leading-snug)" }],
        "3xl": ["var(--text-3xl)",  { lineHeight: "var(--leading-snug)" }],
        "4xl": ["var(--text-4xl)",  { lineHeight: "var(--leading-snug)" }],
        "5xl": ["var(--text-5xl)",  { lineHeight: "var(--leading-tight)" }],
        "6xl": ["var(--text-6xl)",  { lineHeight: "var(--leading-tight)" }],
        "7xl": ["var(--text-7xl)",  { lineHeight: "var(--leading-tight)" }],
      },
      lineHeight: {
        tight:   "var(--leading-tight)",
        snug:    "var(--leading-snug)",
        normal:  "var(--leading-normal)",
        relaxed: "var(--leading-relaxed)",
        loose:   "var(--leading-loose)",
      },

      // ─── Spacing ────────────────────────────────────────────────────────
      // Extends Tailwind's default numeric scale with named semantic tokens.
      // Existing utilities (py-16, px-6, etc.) continue to work unchanged.
      spacing: {
        "space-0":  "var(--space-0)",
        "space-1":  "var(--space-1)",
        "space-2":  "var(--space-2)",
        "space-3":  "var(--space-3)",
        "space-4":  "var(--space-4)",
        "space-5":  "var(--space-5)",
        "space-6":  "var(--space-6)",
        "space-7":  "var(--space-7)",
        "space-8":  "var(--space-8)",
        "space-9":  "var(--space-9)",
        "space-10": "var(--space-10)",
        "space-11": "var(--space-11)",
        "space-12": "var(--space-12)",
        "space-13": "var(--space-13)",
        "space-14": "var(--space-14)",
      },

      // ─── Layout widths ──────────────────────────────────────────────────
      maxWidth: {
        content: "var(--width-content)",
        prose:   "var(--width-prose)",
        wide:    "var(--width-wide)",
        panel:   "var(--width-panel)",
      },

      // ─── Border radius ──────────────────────────────────────────────────
      borderRadius: {
        none: "var(--radius-none)",
        sm:   "var(--radius-sm)",
        DEFAULT: "var(--radius-base)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
      },

      // ─── Shadows ────────────────────────────────────────────────────────
      boxShadow: {
        none:   "var(--shadow-none)",
        subtle: "var(--shadow-subtle)",
        card:   "var(--shadow-card)",
        float:  "var(--shadow-float)",
        modal:  "var(--shadow-modal)",
      },

      // ─── Transitions ────────────────────────────────────────────────────
      transitionDuration: {
        instant:   "var(--duration-instant)",
        fast:      "var(--duration-fast)",
        normal:    "var(--duration-normal)",
        slow:      "var(--duration-slow)",
        reveal:    "var(--duration-reveal)",
        cinematic: "var(--duration-cinematic)",
      },
      transitionTimingFunction: {
        "ease-out":    "var(--ease-out)",
        "ease-in-out": "var(--ease-in-out)",
      },

      // ─── Screens ────────────────────────────────────────────────────────
      screens: {
        md: "768px",
      },
    },
  },
  plugins: [],
};

export default config;
