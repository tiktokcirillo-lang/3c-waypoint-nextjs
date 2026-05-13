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
        ink: "#070A0D",
        graphite: "#0E151A",
        slate: "#42515C",
        steel: "#95A4AD",
        ice: "#F4F7F8",
        frost: "#DCE7EA",
        teal: "#1A5F7A",
        cyan: "#7ECECA",
        gold: "#D7B56D",
        jade: "#6EBF9C",
        soft: "#E8F4F6"
      }
    }
  },
  plugins: []
} satisfies Config;
