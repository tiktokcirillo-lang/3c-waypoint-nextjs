import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#070A0D",
        ink:        "#070A0D",
        graphite:   "#0E151A",
        panel:      "#111820",
        slate:      "#42515C",
        steel:      "#95A4AD",
        ice:        "#F4F7F8",
        frost:      "#DCE7EA",
        teal:       "#1A5F7A",
        "teal-mid": "#1E7090",
        cyan:       "#7ECECA",
        gold:       "#D7B56D",
        "gold-dim": "#A8895A",
        jade:       "#6EBF9C",
        soft:       "#E8F4F6",
        line:       "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body:    ["var(--font-inter)",   "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
      },
      letterSpacing: {
        "display": "0.04em",
        "caps":    "0.12em",
        "wide":    "0.2em",
      },
      animation: {
        "ticker":    "ticker 30s linear infinite",
        "fade-up":   "fadeUp 0.7s ease forwards",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1",   transform: "scale(1)" },
          "50%":      { opacity: "0.4", transform: "scale(0.85)" },
        },
      },
      backgroundImage: {
        "teal-glow": "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(26,95,122,0.25) 0%, transparent 70%)",
        "gold-line": "linear-gradient(90deg, transparent, #D7B56D, transparent)",
      },
    },
  },
  plugins: []
} satisfies Config;
