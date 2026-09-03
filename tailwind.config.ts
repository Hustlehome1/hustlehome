import type { Config } from "tailwindcss";

/**
 * Design tokens for HustleHome — see DESIGN.md.
 * Concept: "resale, run like a drop." Pure black storefront, one earned
 * accent (Lime), sharp corners, no icon libraries.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        graphite: "#0D0D0D",
        iron: "#1A1A1A",
        white: "#FFFFFF",
        bone: "#E8E8E8",
        ash: "#8A8A8A",
        lime: "#C7FF3A",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        hero: ["var(--font-anton)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.02", fontWeight: "700", letterSpacing: "-0.02em" }], // 72
        "display-md": ["3.5rem", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.02em" }], // 56
        "display-sm": ["2.5rem", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }], // 40
        h1: ["2.5rem", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }], // 40
        h2: ["1.75rem", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }], // 28
        h3: ["1.375rem", { lineHeight: "1.25", fontWeight: "700", letterSpacing: "-0.01em" }], // 22
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }], // 16
        "body-sm": ["0.9375rem", { lineHeight: "1.55", fontWeight: "400" }], // 15
        meta: ["0.8125rem", { lineHeight: "1.4", fontWeight: "400" }], // 13, mono
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
      },
      boxShadow: {
        "lime-glow": "0 0 20px rgba(199, 255, 58, 0.3)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-dot": "pulseDot 2s cubic-bezier(0.4,0,0.2,1) infinite",
        "fade-up": "fadeUp 600ms cubic-bezier(0.4,0,0.2,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
