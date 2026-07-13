import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        graphite: "#171717",
        muted: "#A7A7A7",
        brand: "#FF1515",
        deep: "#8A0D0D",
      },
      borderRadius: { card: "8px" },
      fontFamily: {
        sans: [
          "Sora",
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      transitionTimingFunction: { tmg: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        shimmer: { "0%,100%": { opacity: "0.55" }, "50%": { opacity: "0.85" } },
        pulseDot: {
          "0%": { transform: "scale(0.9)", opacity: "0.9" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 9s ease-in-out infinite",
        pulseDot: "pulseDot 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
